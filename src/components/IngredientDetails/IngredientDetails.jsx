import Modal from "../Modal/Modal";
import styles from "./IngredientDetails.module.css";
import PropTypes from "prop-types";

const IngredientDetails = ({ data, onClose }) => {
  return (
    <Modal title="Детали ингредиента" onClose={onClose}>
      <div className={`${styles.container_big}`}>
        <img src={`${data.image_large}`} alt={`${data.name}`} />
        <p className="text text_type_main-medium pt-4 pb-8">{data.name}</p>
        <div className={`${styles.container}`}>
          <div className={`${styles.element}`}>
            <span className="text text_type_main-default text_color_inactive">
              Калории, ккал
            </span>
            <span className="text text_type_main-default text_color_inactive text_type_digits-default">
              {data.calories}
            </span>
          </div>
          <div className={`${styles.element}`}>
            <span className="text text_type_main-default text_color_inactive">
              Белки, г
            </span>
            <span className="text text_type_main-default text_color_inactive text_type_digits-default">
              {data.proteins}
            </span>
          </div>
          <div className={`${styles.element}`}>
            <span className="text text_type_main-default text_color_inactive">
              Жиры, г
            </span>
            <span className="text text_type_main-default text_color_inactive text_type_digits-default">
              {data.fat}
            </span>
          </div>
          <div className={`${styles.element}`}>
            <span className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </span>
            <span className="text text_type_main-default text_color_inactive text_type_digits-default">
              {data.carbohydrates}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

//проверка типов
IngredientDetails.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default IngredientDetails;
