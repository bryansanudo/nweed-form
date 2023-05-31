import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/configFirebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Section from "@/components/common/Section";

import Loader from "@/components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //estado para mostar dinamicamente login o reset

  const redirect = useNavigate();
  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setIsLoading(false);
        toast.success("Inicio de sesion exitoso ");
        redirect("/");
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <Section title="Administrador Need Weed">
        <section
          className={`flex flex-col w-full gap-8 lg:flex-row  md:px-20 px-4 `}
        >
          <div className="flex items-center justify-center lg:w-1/2">
            <form
              onSubmit={loginUser}
              className="flex flex-col gap-6 w-[300px] lg:w-[500px] items-center shadow-lg shadow-gray-500 rounded-xl p-8 mt-16 "
            >
              <h1 className="w-full text-center font-bold text-2xl ">
                Iniciar Sesion
              </h1>
              <input
                type="text"
                placeholder="Correo"
                className="input  input-primary  w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="input  input-primary  w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-primary w-full capitalize">
                Ingresar
              </button>
            </form>
          </div>
          <div className="divider lg:divider-horizontal" />
          <div className="flex items-center justify-center lg:w-1/2 ">
            <img src="/login.png" className="w-[300px] lg:w-[600px] " />
          </div>
        </section>
      </Section>
    </>
  );
};

export default Login;
