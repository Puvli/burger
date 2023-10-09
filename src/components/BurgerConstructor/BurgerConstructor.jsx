import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import PropTypes from "prop-types";
import React, { useReducer } from "react";
import { BurgerContext } from "../../services/BurgerContext";

const BurgerComponent = ({ item, index }) => {
  const { deleteIngredient } = React.useContext(BurgerContext);

  const deleteElement = () => {
    deleteIngredient(index, item);
  };

  return (
    <div className={`${styles.component} mr-2`}>
      <ConstructorElement
        text={`${item.name}`}
        price={`${item.price}`}
        thumbnail={`${item.image}`}
        handleClose={deleteElement}
      />
      <DragIcon type="primary" />
    </div>
  );
};

//проверка типов
BurgerComponent.propTypes = {
  item: PropTypes.object,
};

const BurgerComponents = () => {
  const { clickedIngredient } = React.useContext(BurgerContext);

  return (
    <>
      {clickedIngredient.bun && (
        <ConstructorElement
          text={`${clickedIngredient.bun.name} (верх)`}
          price={`${clickedIngredient.bun.price}`}
          thumbnail={`${clickedIngredient.bun.image}`}
          type="top"
          isLocked={true}
          extraClass="mr-4"
        />
      )}

      {clickedIngredient.items &&
        clickedIngredient.items.map((item, index) => {
          return <BurgerComponent item={item} key={index} index={index} />;
        })}

      {clickedIngredient.bun && (
        <ConstructorElement
          text={`${clickedIngredient.bun.name} (низ)`}
          price={`${clickedIngredient.bun.price}`}
          thumbnail={`${clickedIngredient.bun.image}`}
          type="bottom"
          isLocked={true}
          extraClass="mr-4"
        />
      )}
    </>
  );
};

//проверка типов
// BurgerComponents.propTypes = {
//   data: PropTypes.array,
//   bun: PropTypes.object,
// };

const Info = ({ onClick, price }) => {
  return (
    <div className={`${styles.info}`}>
      <div className={`${styles.info__price}`}>
        <p className="text text_type_digits-medium">{price}</p>
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
  price: PropTypes.number,
};

const BurgerConstructor = ({ onClick }) => {
  const { clickedIngredient } = React.useContext(BurgerContext);

  const [price, setPrice] = React.useState(0);
  React.useEffect(() => {
    setPrice(() => {
      const bunPrice = clickedIngredient.bun
        ? clickedIngredient.bun.price * 2
        : 0;
      const itemsPrices = clickedIngredient.items
        ? clickedIngredient.items.reduce((sum, item) => sum + item.price, 0)
        : 0;
      return bunPrice + itemsPrices;
    });
  }, [clickedIngredient]);

  return (
    <section className={`${styles.constructor} ml-10`}>
      <div className={`${styles.list} custom-scroll`}>
        <BurgerComponents />
      </div>

      <Info onClick={onClick} price={price} />
    </section>
  );
};

//проверка типов
BurgerConstructor.propTypes = {
  onClick: PropTypes.func,
};

export default BurgerConstructor;
