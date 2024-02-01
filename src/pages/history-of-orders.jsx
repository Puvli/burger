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
import {
  fetchGetUser,
  getProfileData,
  logOut,
  refreshToken,
  updToken,
  updateUserInformation,
} from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import {
  LOGOUT_SUCCESS,
  SET_IS_AUTH_CHECKED,
  UPDATE_SUCCESS,
  getIngredients,
} from "../services/actions/actions";
import CardOrder from "../components/CardOrder/CardOrder";
import {
  connect,
  connectWithToken,
  disconnect,
} from "../services/socket/actions";
import CardHistoryOrder from "../components/CardHistoryOrder/CardHistoryOrder";
const url = "wss://norma.nomoreparties.space/orders/all";
const userUrl = "wss://norma.nomoreparties.space/orders";

function HistroyOfOrders() {
  const customer = useSelector((store) => store.customer);
  const error = useSelector((store) => store.socket.done.message);

  // if (error === "Invalid or missing token") {
  //   console.log("zdes");
  //   updToken({
  //     token: localStorage.getItem("refreshToken"),
  //   })
  //     .then((data) => {
  //       localStorage.setItem("accessToken", data.accessToken);
  //       localStorage.setItem("refreshToken", data.refreshToken);
  //     })
  //     .catch((err) => console.log("update err", err));
  // }

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // const accessToken = localStorage.getItem("accessToken");
  // const token = accessToken.replace("Bearer ", "");
  // const userUrl = `${url}?token=${token}`;

  useEffect(() => {
    // dispatch(connect(url));
    dispatch(connectWithToken(userUrl));
    // dispatch(getIngredients());
    return () => {
      dispatch(disconnect());
    };
  }, []);

  const ingredientsAll = useSelector((store) => store.loadedIngredients);
  const { all } = ingredientsAll;
  const zakazi = useSelector((store) => store.socket.done);
  const { orders, success } = zakazi;
  //   const anotherOrders = useSelector((store) => store.socket.done.orders);

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
              logOut({ token: localStorage.getItem("refreshToken") }).then(
                (res) => {
                  if (res.success) {
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("accessToken");
                    dispatch({ type: LOGOUT_SUCCESS });
                    navigate("/login");
                  }
                }
              );
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
                    timestap={order.createdAt}
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
