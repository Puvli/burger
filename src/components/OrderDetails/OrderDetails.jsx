import Modal from "../Modal/Modal";
import styles from "./OrderDetails.module.css";
import PropTypes from "prop-types";

const OrderDetails = ({ onClick }) => {
  return (
    <Modal title="" onClose={onClick}>
      <div className={`${styles.container} pt-20 pb-30`}>
        <p className="text text_type_digits-large mb-8">034536</p>
        <span className="text text_type_main-medium mb-15">
          идентификатор заказа
        </span>
        <div className={`${styles.image} mb-15`}></div>
        <div className={`${styles.spans}`}>
          <span className="text text_type_main-medium">
            Ваш заказ начали готовить
          </span>
          <span className="text text_type_main-medium text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </span>
        </div>
      </div>
    </Modal>
  );
};

//проверка типов
OrderDetails.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default OrderDetails;
