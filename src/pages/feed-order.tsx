
import styles from "./feed-order.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams, useResolvedPath } from "react-router-dom";
import { FC, useEffect } from "react";
import { connect, disconnect } from "../services/socket/actions";
import { ICountIngredients } from "./order-in-history";
import {
  IFeedPopup,
  IIngredient,
  IResult,
  ISocket,
  LoadedIngredients,
  doneOrders,
} from "../services/types";
import { useAppDispatch, useAppSelector } from "../services/hooks/hooks";
const url = "wss://norma.nomoreparties.space/orders/all";

const FeedOrder: FC<IFeedPopup> = ({ popup }) => {
  const isPopup = popup ? styles.container_popup : "";
  const isCenter = popup ? styles.paragraph_center : "";
  const { orderNumber } = useParams();
  const dispatch = useAppDispatch();
  const ingredientsAll = useAppSelector((store) => store.loadedIngredients);
  const { all } = ingredientsAll;
  useEffect(() => {
    dispatch(connect(url));
    return () => {
      dispatch(disconnect());
    };
  }, []);

  const findAndCount = (array: string[], elem: string) => {
    return array.filter((e) => e === elem).length;
  };

  const makeMas = (mas1: string[]) => {
    const result: IResult = { ingredient: null };
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

  const zakazi = useAppSelector((store) => store.socket.done) as doneOrders;
  const { orders, success } = zakazi;

  const sumPrices = (arr: ICountIngredients[]): number => {
    return arr.reduce(
      (accumulator: number, currentValue: ICountIngredients) =>
        accumulator + currentValue.ingredient.price * currentValue.count,
      0
    );
  };

  const moment = require("moment");

  // const timestamp = "2024-01-29T18:49:03.623Z";

  const formattedTime = (timestamp: string) => {
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

  const uniqueSecond = (
    mas1: {
      ingredient: IIngredient;
      count: number;
    }[]
  ) => {
    return mas1.filter(
      (elem, index, self) =>
        self.findIndex((el) => el.ingredient._id === elem.ingredient._id) ===
        index
    );
  };

  // const uniqueOrders = success && uniqueSecond(orders.ingredients);
  // const time = timestap;

  // const result = formattedTime(time);

  return (
    <section className={`${styles.container} ${isPopup}`}>
      <span
        className={`${styles.span} ${isCenter} text text_type_digits-default mb-10`}
      >
        {success &&
          orders &&
          orderNumber &&
          orders.map((order) => {
            if (order.number === +orderNumber) {
              return `#${order.number}`;
            }
          })}
      </span>
      <p className={`text text_type_main-medium mb-2 ${styles.paragraph}`}>
        {success &&
          orders &&
          orderNumber &&
          orders.map((order) => {
            if (order.number === +orderNumber) {
              return order.name;
            }
          })}
      </p>
      <p className={`${styles.paragraph_done} text text_type_main-default`}>
        {success &&
          orders &&
          orderNumber &&
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
          orderNumber &&
          orders.map((order) => {
            if (order.number === +orderNumber) {
              return uniqueSecond(makeMas(order.ingredients)).map(
                (ingredient, id) => {
                  return (
                    <li className={`${styles.ingredient}`} key={id}>
                      <div className={`${styles.ingredient_intro}`}>
                        <div className={`${styles.intro_sub}`}>
                          <div className={styles.image_container}>
                            <img
                              className={`${styles.image}`}
                              src={ingredient.ingredient.image}
                              alt={ingredient.ingredient.image}
                            />
                          </div>
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
                            {`${ingredient.count} x ${ingredient.ingredient.price}`}
                          </p>
                          <CurrencyIcon type="primary" />
                        </div>
                      </div>
                    </li>
                  );
                }
              );
            }
          })}
      </ul>
      <div className={`${styles.time_container}`}>
        <p className="text text_type_main-default text_color_inactive">
          {success &&
            orders &&
            orderNumber &&
            orders.map((order) => {
              if (order.number === +orderNumber) {
                return formattedTime(order.createdAt);
              }
            })}
        </p>
        <div className={`${styles.number_container}`}>
          <p className={`${styles.number} text text_type_digits-default`}>
            {success &&
              orders &&
              orderNumber &&
              orders.map((order) => {
                if (order.number === +orderNumber) {
                  return sumPrices(makeMas(order.ingredients));
                }
              })}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
};

export default FeedOrder;
