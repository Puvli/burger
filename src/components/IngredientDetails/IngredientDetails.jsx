import { useLocation, useParams, useResolvedPath } from "react-router-dom";
import Modal from "../Modal/Modal";
import styles from "./IngredientDetails.module.css";
// import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../AppHeader/AppHeader";
import { useEffect, useState } from "react";
import { ingredientsApi } from "../../utils/api";
import { getIngredients } from "../../services/actions/actions";

const IngredientDetails = () => {
  let data = {};
  const { ingredientId } = useParams();
  const match = useResolvedPath("");
  const dispatch = useDispatch();

  console.log("data4", data);

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const ingredients = useSelector((store) => store.loadedIngredients);
  ingredients.buns.forEach((item) => {
    if (ingredientId === item._id) {
      console.log("bun", item);
      data = item;
    }
  });

  ingredients.main.forEach((item) => {
    if (ingredientId === item._id) {
      console.log("bun", item);
      data = item;
    }
  });

  ingredients.sauces.forEach((item) => {
    if (ingredientId === item._id) {
      console.log("bun", item);
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
