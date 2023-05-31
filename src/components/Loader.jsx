import loaderImg from "@/assets/loader.gif";
import ReactDOM from "react-dom";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="fixed w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.7)] z-[9]">
      <div className="fixed left-[50%] top-[50%] z-[999] translate-x-[-50%] translate-y-[-50%] ">
        <img src={loaderImg} alt="loading..." />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
