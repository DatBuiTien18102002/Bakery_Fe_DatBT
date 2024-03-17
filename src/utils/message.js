import { Bounce, toast } from "react-toastify";

const message = (type, title, autoClose = 2000, position = "top-center") => {
    toast[type](title, {
        position,
        autoClose,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
}

export default message