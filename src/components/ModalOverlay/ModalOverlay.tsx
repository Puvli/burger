import { FC, ReactNode } from "react";
import styles from "./ModalOverlay.module.css";
import { ModalOverlayProps } from "../../services/types";

const ModalOverlay: FC<ModalOverlayProps> = ({ onClick, children }) => {
  return (
    <div className={styles.overlay} onClick={onClick}>
      {children}
    </div>
  );
};

export default ModalOverlay;
