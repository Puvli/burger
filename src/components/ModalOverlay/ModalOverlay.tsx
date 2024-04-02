import { FC, ReactNode } from "react";
import styles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";
import { ModalOverlayProps } from "../../services/types";

const ModalOverlay: FC<ModalOverlayProps> = ({ onClick, children }) => {
  return (
    <div className={styles.overlay} onClick={onClick}>
      {children}
    </div>
  );
};

//проверка типов
// ModalOverlay.propTypes = {
//   onClick: PropTypes.func.isRequired,
// };

export default ModalOverlay;
