import { FC, useState } from "react";
import styles from "./CardHistoryOrder.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import { CardHistoryOrderProps, ImageProp } from "../../services/types";

const IngredientImage: FC<{ image: ImageProp }> = ({ image }) => (
  <img
    className={styles.image}
    src={image.ingredient.image}
    alt={image.ingredient.name}
  />
);

const OrderStatusText: FC<{ status: "done" | "pending" | "created" }> = ({
  status,
}) => {
  switch (status) {
    case "done":
      return (
        <span
          className={`${styles.status} ${styles.span_active} text text_type_main-default`}
        >
          Выполнен
        </span>
      );
    case "pending":
      return (
        <span className={`${styles.status} text text_type_main-default`}>
          Готовится
        </span>
      );
    case "created":
      return (
        <span className={`${styles.status} text text_type_main-default`}>
          Создан
        </span>
      );
    default:
      return null;
  }
};

const CardHistoryOrder: React.FC<CardHistoryOrderProps> = ({
  name,
  number,
  timestamp,
  images,
  status,
}) => {
  const location = useLocation();

  const uniqueSecond = (mas1: ImageProp[]): ImageProp[] => {
    return mas1.filter(
      (elem, index, self) =>
        self.findIndex((el) => el.ingredient._id === elem.ingredient._id) ===
        index
    );
  };

  const imagesUnique = uniqueSecond(images);

  const sumPrices = (arr: ImageProp[]): number => {
    return arr.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.ingredient.price * currentValue.count,
      0
    );
  };

  let price = sumPrices(images);

  let zindex = 100; // переменная для z-index'a

  const formattedTime = (timestamp: string): string => {
    const now = moment();
    const inputDate = moment(timestamp);
    const daysAgo = now.diff(inputDate, "days");

    let formattedString = "";

    if (daysAgo > 0) {
      formattedString = `${daysAgo} дня назад`;
    } else {
      formattedString = "Сегодня";
    }

    formattedString += `, ${inputDate.format("HH:mm")} i-GMT+3`;

    return formattedString;
  };

  const result = formattedTime(timestamp);
  const orderNumber = number;

  return (
    <Link
      key={orderNumber}
      // Тут мы формируем динамический путь для нашего ингредиента
      to={`/profile/orders/${orderNumber}`}
      // а также сохраняем в свойство background роут,
      // на котором была открыта наша модалка
      state={{ background: location }}
      className={styles.link}
    >
      <div className={`${styles.container} p-6`}>
        <div className={`${styles.orderId}`}>
          <span className={`${styles.id} text text_type_digits-default`}>
            {`#${number}`}
          </span>
          <span
            className={`${styles.timestap} text text_type_main-default text_color_inactive`}
          >
            {/* {timestap} */}
            {result}
          </span>
        </div>
        <div className={styles.status_container}>
          <p className={`${styles.name} text text_type_main-medium`}>{name}</p>
          {status && <OrderStatusText status={status} />}
        </div>
        <div className={`${styles.ingredients}`}>
          <ul className={`${styles.images} ${styles.scroll}`}>
            {imagesUnique &&
              imagesUnique.map((image, id) => {
                let count;
                let visible;
                zindex--;

                if (image.count > 1 && image.ingredient.type !== "bun") {
                  count = styles.image_container_after;
                  visible = styles.visible;
                } else {
                  count = "";
                  visible = "";
                }

                return (
                  <li
                    className={`${styles.image_container} ${count}`}
                    style={{ zIndex: zindex }}
                    key={id}
                  >
                    <IngredientImage image={image} key={id} />
                    <span
                      className={`${styles.count} ${visible} text text_type_digits-default`}
                    >{`+${image.count}`}</span>
                  </li>
                );
              })}
          </ul>
          <div className={`${styles.price}`}>
            <p className="text text_type_digits-default">{price}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardHistoryOrder;
