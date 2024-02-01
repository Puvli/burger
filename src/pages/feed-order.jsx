import { useDispatch, useSelector } from "react-redux";
import styles from "./feed-order.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams, useResolvedPath } from "react-router-dom";
import { useEffect } from "react";
import { connect, disconnect } from "../services/socket/actions";
const url = "wss://norma.nomoreparties.space/orders/all";

const FeedOrder = ({ popup }) => {
  const isPopup = popup ? styles.container_popup : "";
  const isCenter = popup ? styles.paragraph_center : "";
  const { orderNumber } = useParams();
  const dispatch = useDispatch();
  const ingredientsAll = useSelector((store) => store.loadedIngredients);
  const { all } = ingredientsAll;
  useEffect(() => {
    dispatch(connect(url));
    return () => {
      dispatch(disconnect());
    };
  }, []);

  const findAndCount = (array, elem) => {
    return array.filter((e) => e === elem).length;
  };

  const makeMas = (mas1) => {
    const result = { ingredient: null };
    const resultMas = [];
    for (let i = 0; i < mas1.length; i++) {
      const current = mas1[i];
      for (let j = 0; j < all.length; j++) {
        const compare = all[j];
        if (compare._id === current) {
          result.ingredient = compare;
          resultMas.push({
            ingredient: compare,
            count: findAndCount(mas1, current),
          });
        }
      }
    }
    return resultMas;
  };

  const zakazi = useSelector((store) => store.socket.done);
  const { orders, success } = zakazi;

  const sumPrices = (arr) => {
    return arr.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.ingredient.price * currentValue.count,
      0
    );
  };

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
  
  // const time = timestap;

  // const result = formattedTime(time);

  return (
    <section className={`${styles.container} ${isPopup}`}>
      <span
        className={`${styles.span} ${isCenter} text text_type_digits-default mb-10`}
      >
        {success &&
          orders &&
          orders.map((order) => {
            if (order.number === +orderNumber) {
              return `#${order.number}`;
            }
          })}
      </span>
      <p className={`text text_type_main-medium mb-2 ${styles.paragraph}`}>
        {success &&
          orders &&
          orders.map((order) => {
            if (order.number === +orderNumber) {
              return order.name;
            }
          })}
      </p>
      <p className={`${styles.paragraph_done} text text_type_main-default`}>
        {success &&
          orders &&
          orders.map((order) => {
            if (order.number === +orderNumber) {
              return order.status;
            }
          })}
      </p>
      <ul className={`${styles.ingredients} ${styles.scroll}`}>
        {/* <p className={`text text_type_main-medium mb-2`}>Состав:</p> */}
        {success &&
          orders &&
          orders.map((order) => {
            if (order.number === +orderNumber) {
              return makeMas(order.ingredients).map((ingredient, id) => {
                return (
                  <li className={`${styles.ingredient}`} key={id}>
                    <div className={`${styles.ingredient_intro}`}>
                      <div className={`${styles.intro_sub}`}>
                        <div className={styles.image_container}><img
                          className={`${styles.image}`}
                          src={ingredient.ingredient.image}
                          alt={ingredient.ingredient.image}
                        /></div>
                        <p
                          className={`${styles.ingredient_paragraph} text text_type_main-default`}
                        >
                          {ingredient.ingredient.name}
                        </p>
                      </div>
                      <div className={`${styles.number_container}`}>
                        <p
                          className={`${styles.number} text text_type_digits-default`}
                        >
                          {`${ingredient.ingredient.price} x ${ingredient.count}`}
                        </p>
                        <CurrencyIcon />
                      </div>
                    </div>
                  </li>
                );
              });
            }
          })}
      </ul>
      <div className={`${styles.time_container}`}>
        <p className="text text_type_main-default text_color_inactive">
        {success &&
              orders &&
              orders.map((order) => {
                if (order.number === +orderNumber) {
                  return formattedTime(order.createdAt)
                }
              })}
        </p>
        <div className={`${styles.number_container}`}>
          <p className={`${styles.number} text text_type_digits-default`}>
            {success &&
              orders &&
              orders.map((order) => {
                if (order.number === +orderNumber) {
                  return sumPrices(makeMas(order.ingredients));
                }
              })}
          </p>
          <CurrencyIcon />
        </div>
      </div>
    </section>
  );
};

export default FeedOrder;
