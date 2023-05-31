import Section from "@/components/common/Section";
import { toast } from "react-toastify";
import { db, storage } from "@/configFirebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from "@/components/Loader";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import {
  STORE_PUBLICATIONS,
  selectPublications,
} from "@/redux/slice/publicationSlice";
import useFetchCollection from "@/customHooks/useFetchCollection";
import { useEffect } from "react";

const GetPublications = () => {
  const { data, isLoading } = useFetchCollection("publications");
  const publications = useSelector(selectPublications);
  console.log(data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PUBLICATIONS({
        publications: data,
      })
    );
  }, [dispatch, data]);

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Eliminar Publicacion !!!",
      "Estas Segura De Eliminar Esta Publicacion",
      "Eliminar",
      "Cancelar",
      function okCb() {
        deletePublication(id, imageURL);
      },
      function cancelCb() {
        console.log("Eliminacion Cancelada");
      },
      {
        width: "320px",
        borderRadius: "4px",
        titleColor: "orangered",
        okButtonBackground: "orangeRed",
        cssAnimationStyle: "zoom",
      }
    );
  };

  const deletePublication = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "publications", id));
      const storageRef = ref(storage, imageURL);
      deleteObject(storageRef);
      toast.success("Publicacion Eliminada");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Section title="Todas Las Publicaciones">
        {publications.length === 0 ? (
          <p>No se encontraron publicaciones</p>
        ) : (
          <table className="w-full  text-sm ">
            <thead className="">
              <tr className="h-20">
                <th className="shadow-md shadow-primary rounded-xl">s/n</th>
                <th className="shadow-md shadow-primary rounded-xl">Image</th>
                <th className="shadow-md shadow-primary rounded-xl">Titulo</th>
                <th className="shadow-md shadow-primary rounded-xl">
                  Editar o Eliminar
                </th>
              </tr>
            </thead>
            <tbody className="">
              {publications.map((publication, index) => {
                const { id, title, instagram, imageURL, desc } = publication;
                return (
                  <tr key={id} className="text-center  border-b-2">
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={title}
                        className="h-[100px] w-full object-contain pt-4"
                      />
                    </td>
                    <td className="text-center">{title}</td>
                    <td>
                      <div className="flex items-center justify-center gap-6">
                        <Link to={`/add-publication/${id}`}>
                          <FaEdit className="text-2xl text-green-500 hover:scale-125 duration-300" />
                        </Link>
                        <FaTrashAlt
                          onClick={() => confirmDelete(id, imageURL)}
                          className="cursor-pointer text-2xl text-red-500 hover:scale-125 duration-300"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Section>
    </>
  );
};

export default GetPublications;
