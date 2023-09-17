import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import React from "react";
import PropTypes from "prop-types";

const Modal = ({ title, children, onClose }) => {
  React.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    

    document.addEventListener("keyup", handleKey);

    return () => document.removeEventListener("keyup", handleKey);
  }, []);

  // React.useEffect(() => {
  //   const handleClick = (e) => {
  //     if (!e.target.classList.contains("container")) {
  //       onClose();
  //     }
  //   };

  //   const overlay = document.querySelector("container");

  //   overlay.addEventListener("click", handleClick);

  //   return () => overlay.removeEventListener("click", handleClick);
  // }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={onClose}>
        <div className={`${styles.container}`}>
          {!(title === "") && (
            <h2 className={`${styles.header} text text_type_main-large mt-10`}>
              {title}
            </h2>
          )}
          <div className={`${styles.close__btn}`} onClick={onClose}>
            <CloseIcon type="primary" />
          </div>
          {children}
        </div>
      </ModalOverlay>
    </>,
    document.getElementById("modal")
  );
};

//проверка типов
Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
