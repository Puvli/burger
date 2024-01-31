import { useState } from "react";
import styles from "./CardHistoryOrder.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const IngredientImage = ({ image }) => {
  return (
    <img
      className={styles.image}
      src={image.ingredient.image}
      alt={image.ingredient.image}
    />
  );
};

const OrderStatusText = ({ status }) => {
  if (status === "done") {
    return (
      <span
        className={`${styles.status} ${styles.span_active} text text_type_main-default`}
      >
        Выполнен
      </span>
    );
  } else if (status === "pending") {
    return (
      <span className={`${styles.status} text text_type_main-default`}>
        Готовится
      </span>
    );
  } else if (status === "created") {
    return (
      <span className={`${styles.status} text text_type_main-default`}>
        Создан
      </span>
    );
  }
};

export default function CardHistoryOrder({
  name,
  number,
  timestap,
  images,
  status,
}) {
  const location = useLocation();
  const uniqueSecond = (mas1) => {
    return mas1.filter(
      (elem, index, self) =>
        self.findIndex((el) => el.ingredient._id === elem.ingredient._id) ===
        index
    );
  };
  const imagesUnique = uniqueSecond(images);

  const sumPrices = (arr) => {
    return arr.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.ingredient.price * currentValue.count,
      0
    );
  };

  let price = sumPrices(images);

  const orderNumber = number;

  let zindex = 100; //переменная для z-index'a

  const moment = require("moment");

  // const timestamp = "2024-01-29T18:49:03.623Z";

  const formattedTime = (timestamp) => {
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

  const time = timestap;

  const result = formattedTime(time);
  // console.log("time", result);

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
}
