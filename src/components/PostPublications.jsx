import Section from "@/components/common/Section";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPublications } from "@/redux/slice/publicationSlice";
import { useState } from "react";
import Loader from "@/components/Loader";
import { storage, db } from "@/configFirebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { AiFillFileAdd } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

const initialState = {
  title: "",
  imageURL: "",
  desc: "",
  instagram: "",
};

const PostPublications = () => {
  const { id } = useParams();

  const publications = useSelector(selectPublications);
  const publicationEdit = publications.find((item) => item.id === id);

  const [publication, setPublication] = useState(() => {
    const newState = detectForm(id, { ...initialState }, publicationEdit);
    return newState;
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    } else {
      return f2;
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPublication({ ...publication, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setPublication({ ...publication, imageURL: downloadURL });
          toast.success("Imagen Subida Con Exito");
        });
      }
    );
  };

  const addPublication = (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const docRef = addDoc(collection(db, "publications"), {
        title: publication.title,
        imageURL: publication.imageURL,
        desc: publication.desc,
        instagram: publication.instagram,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setPublication({ ...initialState });
      navigate("/");
      toast.success("Publicacion Subida a NWEED APP");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const editPublication = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (publication.imageURL !== publicationEdit.imageURL) {
      const storageRef = ref(storage, publicationEdit.imageURL);
      deleteObject(storageRef);
    }

    try {
      setDoc(doc(db, "publications", id), {
        title: publication.title,
        imageURL: publication.imageURL,
        desc: publication.desc,
        instagram: publication.instagram,
        createdAt: publicationEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Publicacin Editada");
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Section
        title={detectForm(id, "Agregar Publicacion", "Editar Publicacion")}
      >
        <form
          onSubmit={detectForm(id, addPublication, editPublication)}
          className="shadow-md shadow-black rounded-xl p-6 w-full max-w-[800px] flex flex-col gap-4 items-center justify-center"
        >
          <label className="w-full text-left">Titulo de la publicacion</label>
          <input
            required
            type="text"
            className="input input-primary text-lg input-md w-full"
            name="title"
            value={publication.title}
            onChange={(e) => handleInputChange(e)}
          />

          <label className="w-full text-left">Imagen de la publicacion</label>
          {uploadProgress === 0 ? null : (
            <div className="bg-[#aaa] border-[1px] border-[solid] rounded-[10px] w-full">
              <div
                className="bg-primary border-[1px] border-[solid] rounded-[10px] text-white text-sm font-semibold py-0 px-[1rem]"
                style={{ width: `${uploadProgress}%` }}
              >
                {uploadProgress < 100
                  ? `Subiendo ${uploadProgress}%`
                  : `Subida completada ${uploadProgress}%`}
              </div>
            </div>
          )}
          <input
            type="file"
            className="file-input file-input-primary w-full"
            name="image"
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
          />
          <label className="w-full text-left">Enlace a Instagram</label>
          <input
            required
            type="text"
            className="input input-primary text-lg input-md w-full"
            name="instagram"
            value={publication.instagram}
            onChange={(e) => handleInputChange(e)}
          />
          <label className="w-full text-left">
            Contenido de la publicacion
          </label>
          <textarea
            required
            className="textarea textarea-primary w-full"
            name="desc"
            value={publication.desc}
            onChange={(e) => handleInputChange(e)}
          />

          <button type="submit">
            {detectForm(
              id,
              <AiFillFileAdd className="text-primary text-5xl mt-2 hover:scale-150 duration-300" />,
              <FaEdit className="text-primary text-5xl mt-2 hover:scale-150 duration-300" />
            )}
          </button>
        </form>
      </Section>
    </>
  );
};

export default PostPublications;
