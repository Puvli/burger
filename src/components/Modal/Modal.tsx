import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import React, { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import { ModalProps } from "../../services/types";

const Modal: FC<ModalProps> = ({ title, children, onClose }) => {
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keyup", handleKey);

    return () => document.removeEventListener("keyup", handleKey);
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={onClose}>
        <div
          className={`${styles.container}`}
          onClick={(evt) => evt.stopPropagation()}
        >
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
    document.getElementById("modal") as HTMLElement
  );
};

//проверка типов
Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
