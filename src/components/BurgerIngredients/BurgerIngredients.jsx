import { forwardRef, useEffect, useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { CURRENT_INGREDIENT } from "../../services/actions/Modal";
import { useDrag } from "react-dnd";

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

const BurgerIngredient = ({ element, onOpen, addToOrder }) => {
  const { image, price, name, _id } = element;
  console.log(_id);
  const dispatch = useDispatch();

  const [{ isDrag }, ingredientRef] = useDrag({
    type: "ingredient",
    item: element,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const handleOnOpen = () => {
    onOpen(element);
    dispatch({ type: CURRENT_INGREDIENT, current: element });
  };

  const bunCountStore = useSelector(
    (store) => store.ingredients.clickedIngredient.bun
  );
  const itemsFromStore = useSelector(
    (store) => store.ingredients.clickedIngredient.items
  );

  const itemsCount = itemsFromStore.filter((item) => item._id === element._id);
  const others = itemsCount.length;
  const handleAddToOrder = (e) => {
    e.stopPropagation();
    addToOrder(element);
    // addClick(type, _id);
  };

  return (
    !isDrag && (
      <li className={`${styles.ingredient} pt-6`} ref={ingredientRef}>
        <img
          src={image}
          alt={name}
          className="pl-4 pr-4"
          onClick={handleOnOpen}
        />
        <div className={`${styles.currency}`}>
          <p
            className="text text_type_digits-default"
            onClick={handleAddToOrder}
          >
            {price}{" "}
          </p>
          <CurrencyIcon type={"primary"} />
        </div>
        <p className={`${styles.text} text text_type_main-default`}>{name}</p>
        {bunCountStore && bunCountStore._id === _id && (
          <Counter count={1} size="default" extraClass={`${styles.counter}`} />
        )}
        {others > 0 && (
          <Counter
            count={others}
            size="default"
            extraClass={`${styles.counter}`}
          />
        )}
      </li>
    )
  );
};

//проверка типов
BurgerIngredient.propTypes = {
  element: PropTypes.object.isRequired,
  addToOrder: PropTypes.func.isRequired,
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

function BurgerIngredients({ onOpen, ingredients, addToOrder }) {
  const bunRef = useRef(null);
  const mainRef = useRef(null);
  const sauceRef = useRef(null);
  const ingredientsRef = useRef(null);
  const [currentType, setCurrentType] = useState("bun");

  const clickType = (type) => {
    setCurrentType(type);
  };

  useEffect(() => {
    const handleScroll = () => {
      const containerRect = ingredientsRef.current.getBoundingClientRect();
      const bunsRect = bunRef.current.getBoundingClientRect();
      const saucesRect = sauceRef.current.getBoundingClientRect();
      const fillingsRect = mainRef.current.getBoundingClientRect();

      if (
        bunsRect.top >= containerRect.top &&
        bunsRect.top < containerRect.bottom
      ) {
        setCurrentType("bun");
      } else if (
        saucesRect.top >= containerRect.top &&
        saucesRect.top < containerRect.bottom
      ) {
        setCurrentType("sauce");
      } else if (
        fillingsRect.top >= containerRect.top &&
        fillingsRect.top < containerRect.bottom
      ) {
        setCurrentType("main");
      }
    };

    ingredientsRef.current.addEventListener("scroll", handleScroll);

    return () => {
      ingredientsRef.current.removeEventListener("scroll", handleScroll);
    };
  }, [currentType]);

  return (
    <section className={`${styles.container} pt-10`}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <IngredientsMenu
        refs={{ bun: bunRef, main: mainRef, sauce: sauceRef }}
        click={clickType}
        currentType={currentType}
      />
      <div className={`${styles.scroll} custom-scroll`} ref={ingredientsRef}>
        <Ingredients
          ref={bunRef}
          ingredients={ingredients.buns}
          title={IngredientsItems["bun"]}
          onOpen={onOpen}
          addToOrder={addToOrder}
        />
        <Ingredients
          ref={sauceRef}
          ingredients={ingredients.sauces}
          title={IngredientsItems["sauce"]}
          onOpen={onOpen}
          addToOrder={addToOrder}
        />
        <Ingredients
          ref={mainRef}
          ingredients={ingredients.main}
          title={IngredientsItems["main"]}
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
  addToOrder: PropTypes.func.isRequired,
};

export default BurgerIngredients;
