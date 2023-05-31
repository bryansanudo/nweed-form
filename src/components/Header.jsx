import { Link, NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/configFirebase";
import { toast } from "react-toastify";
import { TbDoorExit } from "react-icons/tb";

const activeLink = ({ isActive }) =>
  isActive
    ? " relative after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[2px] after:bg-white"
    : ``;

const Header = () => {
  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Cierre de sesion exitoso");
      })
      .catch((error) => {
        toast(error.message);
      });
  };
  return (
    <>
      <header className="bg-black w-full text-white overflow-hidden fixed z-40">
        <div className="w-full h-24 max-w-[1200px] mx-auto p-4 flex  items-center ">
          <nav className="w-[80%] text-lg ">
            <div className="flex justify-between mx- gap-8">
              <ul className="flex gap-6  items-center justify-center">
                <li className="">
                  <h2>
                    <span className="text-primary">Admin</span>
                  </h2>
                </li>
                <li className="hover:text-primary hover:scale-105 duration-400">
                  <NavLink className={activeLink} to="/">
                    Publicaciones
                  </NavLink>
                </li>
                <li className="hover:text-primary hover:scale-105 duration-400">
                  <NavLink className={activeLink} to="/add-publication/ADD">
                    Crear
                  </NavLink>
                </li>

                <li
                  className="hover:text-primary hover:scale-105 duration-400"
                  onClick={logout}
                >
                  <TbDoorExit className="text-2xl hover:scale-105 duration-300" />
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
