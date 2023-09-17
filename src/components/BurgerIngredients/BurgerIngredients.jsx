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

const BurgerIngredient = ({ element, count, addClick, onOpen }) => {
  const { image, price, name, _id, type } = element;

  const handleClick = () => {
    addClick(type, _id);
  };

  const handleOnOpen = () => {
    onOpen(element);
  };

  return (
    <li className={`${styles.ingredient} pt-6`} onClick={handleOnOpen}>
      <img src={image} alt={name} className="pl-4 pr-4" />
      <div className={`${styles.currency}`} onClick={handleClick}>
        <p className="text text_type_digits-default">{price} </p>
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

function BurgerIngredients({ onOpen, ingredients }) {
  const bunRef = useRef(null);
  const mainRef = useRef(null);
  const sauceRef = useRef(null);

  const [bunCounter, setBun] = useState({});
  const [mainCounter, setMain] = useState({});
  const [sauceCounter, setSauce] = useState({});

  const [currentType, setCurrentType] = useState("bun");

  const addClick = (type, id) => {
    if (type === "bun") {
      setBun({ ...bunCounter, [id]: bunCounter[id] ? bunCounter[id] + 1 : 1 });
    } else if (type === "main") {
      setMain({
        ...mainCounter,
        [id]: mainCounter[id] ? mainCounter[id] + 1 : 1,
      });
    } else if (type === "sauce") {
      setSauce({
        ...sauceCounter,
        [id]: sauceCounter[id] ? sauceCounter[id] + 1 : 1,
      });
    }
  };

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
        />
        <Ingredients
          ref={sauceRef}
          ingredientsCount={sauceCounter}
          ingredients={ingredients.sauces}
          title={IngredientsItems["sauce"]}
          addClick={addClick}
          onOpen={onOpen}
        />
        <Ingredients
          ref={mainRef}
          ingredientsCount={mainCounter}
          ingredients={ingredients.main}
          title={IngredientsItems["main"]}
          addClick={addClick}
          onOpen={onOpen}
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
