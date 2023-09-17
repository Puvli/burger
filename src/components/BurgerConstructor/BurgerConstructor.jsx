import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../../utils/data";
import styles from "./BurgerConstructor.module.css";
import PropTypes from "prop-types";

const BurgerComponent = ({ item }) => {
  return (
    <div className={`${styles.component} mr-2`}>
      <ConstructorElement
        text={`${item.name}`}
        price={`${item.price}`}
        thumbnail={`${item.image}`}
        key={`${item._id}`}
      />
      <DragIcon type="primary" />
    </div>
  );
};

//проверка типов
BurgerComponent.propTypes = {
  item: PropTypes.object,
};

const BurgerComponents = ({ data, bun }) => {
  return (
    <>
      <ConstructorElement
        text={`${bun.name}`}
        price={`${bun.price}`}
        thumbnail={`${bun.image}`}
        type="top"
        isLocked={true}
        extraClass="mr-4"
      />
      <div className={`${styles.list} custom-scroll`}>
        {data.map((item) => {
          return <BurgerComponent item={item} key={item._id} />;
        })}
      </div>
      <ConstructorElement
        text={`${bun.name}`}
        price={`${bun.price}`}
        thumbnail={`${bun.image}`}
        type="bottom"
        isLocked={true}
        extraClass="mr-4"
      />
    </>
  );
};

//проверка типов
BurgerComponents.propTypes = {
  data: PropTypes.array,
  bun: PropTypes.object,
};

const Info = ({ onClick }) => {
  return (
    <div className={`${styles.info}`}>
      <div className={`${styles.info__price}`}>
        <p className="text text_type_digits-medium">610</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button
        htmlType="button"
        type="primary"
        size="large"
        extraClass="mr-4"
        onClick={onClick}
      >
        Оформить заказ
      </Button>
    </div>
  );
};

//проверка типов
Info.propTypes = {
  onClick: PropTypes.func,
};

const BurgerConstructor = ({ onClick }) => {
  return (
    <section className={`${styles.constructor} ml-10`}>
      <div className={`${styles.list} custom-scroll`}>
        <BurgerComponents data={data} bun={data[0]} />
      </div>

      <Info onClick={onClick} />
    </section>
  );
};

//проверка типов
BurgerConstructor.propTypes = {
  onClick: PropTypes.func,
};

export default BurgerConstructor;
