import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/configFirebase";

const App = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
      } else {
        setUser(false);
      }
    });
  }, []);

  return (
    <>
      <ToastContainer position="bottom-center" />
      <BrowserRouter>{user ? <Home /> : <Login />}</BrowserRouter>
    </>
  );
};

export default App;
