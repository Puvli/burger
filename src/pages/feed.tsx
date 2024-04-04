import { useEffect } from "react";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import CardOrder from "../components/CardOrder/CardOrder";
import Stats from "../components/Stats/Stats";
import styles from "./feed.module.css";
import { connect, disconnect } from "../services/socket/actions";
import { getIngredients } from "../services/actions/actions";
import { Link, useLocation } from "react-router-dom";
import { IResult, ISocket, IUserOrders, LoadedIngredients, doneOrders } from "../services/types";
import { useAppDispatch, useAppSelector } from "../services/hooks/hooks";
// import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
const url = "wss://norma.nomoreparties.space/orders/all";

export default function Feed() {
  const dispatch = useAppDispatch();
  const location = useLocation();
   const ingredientsAll = useAppSelector(store => store.loadedIngredients) as LoadedIngredients;
  const { all } = ingredientsAll;
  const zakazi = useAppSelector(store => store.socket.done) as doneOrders;
  const { total, totalToday, orders, success } = zakazi;

  useEffect(() => {
    dispatch(connect(url));
    // dispatch(getIngredients());
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  const findAndCount = (array: string[], elem: string) => {
    return array.filter((e) => e === elem).length;
  };

  const makeMas = (mas1: string[]) => {
    const result: IResult = {ingredient: null};
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
    <section className={`${styles.container}`}>
      <h1 className="mt-10 text text_type_main-large mb-5">Лента заказов</h1>
      <div className={`${styles.subcontainer}`}>
        <ul className={`${styles.orders}`}>
          {success &&
            orders &&
            orders.map((order: IUserOrders, id: number) => {
              // let orderNumber = order.number;
              const itemOfIngredient = makeMas(order.ingredients);
              return (
                <li className={styles.order} key={id}>
                  <CardOrder
                    name={order.name}
                    number={order.number}
                    timestamp={order.createdAt}
                    status={""}
                    images={itemOfIngredient}
                  />
                </li>
              );
            })}
        </ul>
        <div className={`${styles.stats}`}>
          <Stats
            total={total}
            totalToday={totalToday}
            anotherOrders={orders}
          />
        </div>
      </div>
    </section>
  );
}
