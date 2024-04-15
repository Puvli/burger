import styles from "./OrderDetails.module.css";
import { useAppSelector } from "../../services/hooks/hooks";

const OrderDetails = () => {
  const numberOfOrder = useAppSelector((store) => store.number.number);

  return (
    <div className={`${styles.container} pt-20 pb-30`}>
      <p className="text text_type_digits-large mb-8">{numberOfOrder}</p>
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
  );
};

export default OrderDetails;
