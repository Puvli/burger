import { useParams } from "react-router-dom";
import styles from "./IngredientDetails.module.css";
// import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const IngredientDetails = () => {
  let data = {};
  const { ingredientId } = useParams();

  const ingredients = useSelector((store) => store.loadedIngredients);
  ingredients.buns.forEach((item) => {
    if (ingredientId === item._id) {
      data = item;
    }
  });

  ingredients.main.forEach((item) => {
    if (ingredientId === item._id) {
      data = item;
    }
  });

  ingredients.sauces.forEach((item) => {
    if (ingredientId === item._id) {
      data = item;
    }
  });

  return (
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
  );
};

//проверка типов
// IngredientDetails.propTypes = {
//   data: PropTypes.object.isRequired,
// };

export default IngredientDetails;
