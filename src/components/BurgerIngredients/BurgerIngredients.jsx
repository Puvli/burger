import { forwardRef, useEffect, useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import PropTypes from "prop-types";

const IngredientsMenu = ({ click, currentType, refs }) => {
  const handlePick = (e) => {
    click(e);
    refs[e].current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.navigation}>
      <Tab value="bun" active={currentType === "bun"} onClick={handlePick}>
        Булки
      </Tab>
      <Tab value="sauce" active={currentType === "sauce"} onClick={handlePick}>
        Соусы
      </Tab>
      <Tab value="main" active={currentType === "main"} onClick={handlePick}>
        Начинки
      </Tab>
    </div>
  );
};

//проверка типов
IngredientsMenu.propTypes = {
  click: PropTypes.func,
  currentType: PropTypes.string.isRequired,
  refs: PropTypes.object.isRequired,
};

const IngredientsItems = {
  bun: "Булки",
  main: "Начинки",
  sauce: "Соусы",
};

const BurgerIngredient = ({ element, count, addClick, onOpen, addToOrder }) => {
  const { image, price, name, _id, type } = element;

  const handleOnOpen = () => {
    onOpen(element);
  };

  const handleAddToOrder = (e) => {
    e.stopPropagation();
    addToOrder(element);
    addClick(type, _id);
  };

  return (
    <li className={`${styles.ingredient} pt-6`}>
      <img
        src={image}
        alt={name}
        className="pl-4 pr-4"
        onClick={handleOnOpen}
      />
      <div className={`${styles.currency}`}>
        <p className="text text_type_digits-default" onClick={handleAddToOrder}>
          {price}{" "}
        </p>
        <CurrencyIcon type={"primary"} />
      </div>
      <p className={`${styles.text} text text_type_main-default`}>{name}</p>
      {count && (
        <Counter
          count={count}
          size="default"
          extraClass={`${styles.counter}`}
        />
      )}
    </li>
  );
};

//проверка типов
BurgerIngredient.propTypes = {
  element: PropTypes.object.isRequired,
  count: PropTypes.string,
  addClick: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};

const Ingredients = forwardRef((props, ref) => {
  return (
    <div ref={ref} className={`${styles.ingredients} pt-10`}>
      <h2 className="text text_type_main-medium">{props.title}</h2>
      <ul className={`${styles.list}`}>
        {props.ingredients &&
          props.ingredients.map((ingredient) => (
            <BurgerIngredient
              key={ingredient._id}
              element={ingredient}
              addClick={props.addClick}
              count={props.ingredientsCount[ingredient._id]}
              onOpen={props.onOpen}
              addToOrder={props.addToOrder}
            />
          ))}
      </ul>
    </div>
  );
});

//проверка типов
Ingredients.propTypes = {
  addClick: PropTypes.func.isRequired,
  ingredientsCount: PropTypes.object.isRequired,
  onOpen: PropTypes.func.isRequired,
  ingredients: PropTypes.array.isRequired,
};

function BurgerIngredients({
  onOpen,
  ingredients,
  addToOrder,
  addClick,
  bunCounter,
  sauceCounter,
  mainCounter,
}) {
  const bunRef = useRef(null);
  const mainRef = useRef(null);
  const sauceRef = useRef(null);

  const [currentType, setCurrentType] = useState("bun");

  const clickType = (type) => {
    setCurrentType(type);
  };

  return (
    <section className={`${styles.container} pt-10`}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <IngredientsMenu
        refs={{ bun: bunRef, main: mainRef, sauce: sauceRef }}
        click={clickType}
        currentType={currentType}
      />
      <div className={`${styles.scroll} custom-scroll`}>
        <Ingredients
          ref={bunRef}
          ingredientsCount={bunCounter}
          ingredients={ingredients.buns}
          title={IngredientsItems["bun"]}
          addClick={addClick}
          onOpen={onOpen}
          addToOrder={addToOrder}
        />
        <Ingredients
          ref={sauceRef}
          ingredientsCount={sauceCounter}
          ingredients={ingredients.sauces}
          title={IngredientsItems["sauce"]}
          addClick={addClick}
          onOpen={onOpen}
          addToOrder={addToOrder}
        />
        <Ingredients
          ref={mainRef}
          ingredientsCount={mainCounter}
          ingredients={ingredients.main}
          title={IngredientsItems["main"]}
          addClick={addClick}
          onOpen={onOpen}
          addToOrder={addToOrder}
        />
      </div>
    </section>
  );
}

//проверка типов
BurgerIngredients.propTypes = {
  onOpen: PropTypes.func.isRequired,
  ingredients: PropTypes.object.isRequired,
};

export default BurgerIngredients;
