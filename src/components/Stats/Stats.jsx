import { useSelector } from "react-redux";
import styles from "./Stats.module.css";
import { useEffect } from "react";

export default function Stats({ total, totalToday, anotherOrders }) {
  return (
    <section className={`${styles.container}`}>
      <div className={`${styles.ordersboard}`}>
        <div className={`${styles.done}`}>
          <p className={`${styles.paragraph} text text_type_main-medium mb-4`}>
            Готовы
          </p>
          <ul className={styles.container_done}>
            {anotherOrders &&
              anotherOrders.map((anotherOrder, id) => {
                {
                  if (anotherOrder.status === "done") {
                    // console.log("anotherOrder", anotherOrder, id);
                    return (
                      <li
                        className={`${styles.span} ${styles.text_done}  text text_type_digits-default`}
                        key={id}
                      >
                        {anotherOrder.number}
                      </li>
                    );
                  }
                }
              })}
          </ul>
        </div>
        <div className={`${styles.inwork} text text_type_digits-medium`}>
          <p className={`${styles.paragraph} text text_type_main-medium mb-4`}>
            В работе:
          </p>
          <ul className={styles.container_done}>
            {anotherOrders &&
              anotherOrders.map((anotherOrder, id) => {
                {
                  if (anotherOrder.status === "pending") {
                    console.log("anotherOrder", anotherOrder, id);
                    return (
                      <li
                        className={`${styles.span} text text_type_digits-default`}
                        key={id}
                      >
                        {anotherOrder.number}
                      </li>
                    );
                  }
                }
              })}
          </ul>
        </div>
      </div>
      <div className={`${styles.completed}`}>
        <p className={`${styles.span} text text_type_main-medium`}>
          Выполнено за все время:
        </p>
        <span
          className={`${styles.span} ${styles.number} text text_type_digits-large`}
        >
          {total}
        </span>
      </div>
      <div className={`${styles.completed}`}>
        <p className={`${styles.span} text text_type_main-medium`}>
          Выполнено за сегодня:
        </p>
        <span
          className={`${styles.span} ${styles.number} text text_type_digits-large`}
        >
          {totalToday}
        </span>
      </div>
    </section>
  );
}
