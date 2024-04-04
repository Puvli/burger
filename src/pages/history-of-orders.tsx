import {
  EmailInput,
  PasswordInput,
  Input,
  Tab,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../components/AppHeader/AppHeader";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  NavLink,
  useLocation,
} from "react-router-dom";
import styles from "./history-of-orders.module.css";
import { logOut } from "../services/actions/actions";
import { connectWithToken, disconnect } from "../services/socket/actions";
import CardHistoryOrder from "../components/CardHistoryOrder/CardHistoryOrder";
import {
  IResult,
  ISocket,
  LoadedIngredients,
  doneOrders,
} from "../services/types";
import { useAppDispatch, useAppSelector } from "../services/hooks/hooks";
const url = "wss://norma.nomoreparties.space/orders/all";
const userUrl = "wss://norma.nomoreparties.space/orders";

function HistroyOfOrders() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(connectWithToken(userUrl));
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  const ingredientsAll = useAppSelector((store) => store.loadedIngredients);
  const { all } = ingredientsAll;
  const zakazi = useAppSelector((store) => store.socket.done) as doneOrders;
  const { orders, success } = zakazi;

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

  return (
    <>
      {/* <AppHeader /> */}
      <div className={styles.container}>
        <div className={styles.tabContainer}>
          <NavLink
            to={{ pathname: "/profile" }}
            className={`text text_type_main-medium  ${styles.tabParagraph}`}
          >
            Профиль
          </NavLink>
          {/* <p className={`text text_type_main-medium ${styles.tabParagraph}`}>
              Профиль
            </p> */}
          <NavLink
            to={{ pathname: "/profile/orders" }}
            className={`text text_type_main-medium text_color_inactive ${styles.tabParagraph} ${styles.tabParagraph_active}`}
          >
            История заказов
          </NavLink>
          <p
            className={`text text_type_main-medium text_color_inactive ${styles.tabParagraph}`}
            onClick={() => {
              dispatch(logOut({ token: localStorage.getItem("refreshToken") }));
            }}
          >
            Выход
          </p>
          <p
            className={`text text_type_main-default text_color_inactive mt-20 ${styles.tabSubParagraph}`}
          >
            В этом разделе вы можете просмотреть свою историю заказов
          </p>
        </div>
        <ul className={`${styles.scroll} ${styles.lists}`}>
          {success &&
            orders &&
            orders.map((order, id) => {
              // console.log("order", order);
              const itemOfIngredient = makeMas(order.ingredients);
              // console.log("itemOfIngredient", itemOfIngredient);
              return (
                <li className={styles.list} key={id}>
                  <CardHistoryOrder
                    name={order.name}
                    number={order.number}
                    timestamp={order.createdAt}
                    images={itemOfIngredient}
                    status={order.status}
                  />
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}

export default HistroyOfOrders;
