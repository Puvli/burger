import { useParams } from "react-router-dom";
import styles from "./IngredientPage.module.css";
import { FC } from "react";
import { IIngredient, State } from "../../services/types";
import { useAppSelector } from "../../services/hooks/hooks";

const IngredientPage: FC = () => {
  const { ingredientId } = useParams<{ ingredientId: string }>();

  const ingredients = useAppSelector((store) => store.loadedIngredients);
  let data: IIngredient | undefined;
  ["buns", "main", "sauces"].forEach((category) => {
    const found = ingredients[category as keyof typeof ingredients].find(
      (item) => item._id === ingredientId
    );
    if (found) data = found;
  });

  // Обработка случая, когда ингредиент не найден
  if (!data) {
    return <div>Ингредиент не найден</div>;
  }

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

export default IngredientPage;
