import { useDispatch, useSelector } from "react-redux";
import styles from "./order-in-history.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams, useResolvedPath } from "react-router-dom";
import { useEffect } from "react";
import { connect, disconnect } from "../services/socket/actions";
import {
  POPUP_ORDER,
  getDataOfOrder,
  getIngredients,
} from "../services/actions/actions";
import { getOrder } from "../utils/api";
const url = "wss://norma.nomoreparties.space/orders/all";

const OrderInHistory = ({ popup }) => {
  const isPopup = popup ? styles.container_popup : "";
  const isCenter = popup ? styles.paragraph_center : "";
  const { orderHistoryNumber } = useParams();
  const dispatch = useDispatch();
  const ingredientsAll = useSelector((store) => store.loadedIngredients);
  const orderPopupDataSuccess = useSelector(
    (store) => store.orderPopupData.orderData.success
  );
  const orderPopupDataElem = useSelector((store) => store.orderPopupData.elem);

  const popupStore = useSelector((store) => store.orderPopupData);
  const { popupSuccess, elem } = popupStore;
  const { all } = ingredientsAll;

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

  useEffect(() => {
    dispatch(connect(url));
    dispatch(getDataOfOrder(orderHistoryNumber));
    return () => {
      dispatch(disconnect());
    };
  }, []);

  const sumPrices = (arr) => {
    return arr.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.ingredient.price * currentValue.count,
      0
    );
  };

  const resultSum = () => {
    return (
      orderPopupDataSuccess &&
      sumPrices(makeMas(orderPopupDataElem.ingredients))
    );
  };

  const moment = require("moment");

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

  return (
    <section className={`${styles.container} ${isPopup}`}>
      <span
        className={`${styles.span} ${isCenter} text text_type_digits-default mb-10`}
      >
        {success &&
          orders &&
          orders.map((order) => {
            if (order.number === +orderHistoryNumber) {
              return `#${order.number}`;
            }
          }) &&
          orderHistoryNumber}
      </span>
      <p className={`text text_type_main-medium mb-2 ${styles.paragraph}`}>
        {success &&
          orders &&
          orders.map((order) => {
            if (order.number === +orderHistoryNumber) {
              return order.name;
            }
          }) &&
          popupSuccess &&
          elem.name}
      </p>
      <p className={`${styles.paragraph_done} text text_type_main-default`}>
        {success &&
          orders &&
          orders.map((order) => {
            if (order.number === +orderHistoryNumber) {
              return order.status;
            }
          }) &&
          popupSuccess &&
          elem.status}
      </p>
      <ul className={`${styles.ingredients} ${styles.scroll}`}>
        {success &&
          orders &&
          orders.map((order) => {
            if (order.number === +orderHistoryNumber) {
              return makeMas(order.ingredients).map((ingredient, id) => {
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
                          {`${ingredient.ingredient.price} x ${ingredient.count}`}
                        </p>
                        <CurrencyIcon />
                      </div>
                    </div>
                  </li>
                );
              });
            }
          }) &&
          popupSuccess &&
          makeMas(elem.ingredients).map((ingredient, id) => {
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
                      {`${ingredient.ingredient.price} x ${ingredient.count}`}
                    </p>
                    <CurrencyIcon />
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
      <div className={`${styles.time_container}`}>
        <p className="text text_type_main-default text_color_inactive">
          {success &&
            orders &&
            orders.map((order) => {
              if (order.number === +orderHistoryNumber) {
                return formattedTime(order.createdAt);
              }
            }) &&
            popupSuccess &&
            formattedTime(elem.createdAt)}
        </p>
        <div className={`${styles.number_container}`}>
          <p className={`${styles.number} text text_type_digits-default`}>
            {success &&
              orders &&
              orders.map((order) => {
                if (order.number === +orderHistoryNumber) {
                  return sumPrices(makeMas(order.ingredients));
                }
              }) &&
              popupSuccess &&
              resultSum()}
          </p>
          <CurrencyIcon />
        </div>
      </div>
    </section>
  );
};

export default OrderInHistory;
