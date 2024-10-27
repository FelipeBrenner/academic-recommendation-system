import { Bounce, ToastContainer, type Theme } from "react-toastify";

import "./Toast.css";

interface IToast {
  theme: Theme;
}

export const Toast = ({ theme }: IToast) => {
  return (
    <ToastContainer
      position="top-center"
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      theme={theme}
      transition={Bounce}
      hideProgressBar
      toastStyle={{
        borderRadius: 12,
        fontSize: 14,
      }}
      closeButton={false}
    />
  );
};
