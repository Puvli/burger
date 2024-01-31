import { useEffect } from "react";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import CardOrder from "../components/CardOrder/CardOrder";
import Stats from "../components/Stats/Stats";
import styles from "./feed.module.css";
import { useDispatch, useSelector } from "react-redux";
import { connect, disconnect } from "../services/socket/actions";
import { getIngredients } from "../services/actions/actions";
import { Link, useLocation } from "react-router-dom";
// import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
const url = "wss://norma.nomoreparties.space/orders/all";

export default function Feed() {
  const dispatch = useDispatch();
  const location = useLocation();
  const ingredientsAll = useSelector((store) => store.loadedIngredients);
  const { all } = ingredientsAll;
  const zakazi = useSelector((store) => store.socket.done);
  const { total, totalToday, orders, success } = zakazi;
  const anotherOrders = useSelector((store) => store.socket.done.orders);
  console.log(anotherOrders);

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

  useEffect(() => {
    dispatch(connect(url));
    dispatch(getIngredients());
    return () => {
      dispatch(disconnect());
    };
  }, []);

  return (
    <section className={`${styles.container}`}>
      <h1 className="mt-10 text text_type_main-large mb-5">Лента заказов</h1>
      <div className={`${styles.subcontainer}`}>
        <ul className={`${styles.orders}`}>
          {success &&
            orders &&
            orders.map((order, id) => {
              // let orderNumber = order.number;
              const itemOfIngredient = makeMas(order.ingredients);
              return (
                <li className={styles.order}>
                  <CardOrder
                    name={order.name}
                    number={order.number}
                    timestap={order.createdAt}
                    status={null}
                    images={itemOfIngredient}
                    key={id}
                  />
                </li>
              );
            })}
        </ul>
        <div className={`${styles.stats}`}>
          <Stats
            total={total}
            totalToday={totalToday}
            anotherOrders={anotherOrders}
          />
        </div>
      </div>
    </section>
  );
}
