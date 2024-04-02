import { FC, forwardRef, useEffect, useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { CURRENT_INGREDIENT } from "../../services/actions/modal";
import { useDrag } from "react-dnd";
import { Link, useLocation, useParams } from "react-router-dom";
import { BurgerIngredientProps, BurgerIngredientsProps, IBurgerIngredientsStore, IIngredient, IngredientsMenuProps, IngredientsProps, LoadedIngredients } from "../../services/types";

const IngredientsMenu: React.FC<IngredientsMenuProps> = ({
  click,
  currentType,
  refs,
}) => {
  const handlePick = (e: string) => {
    click(e);
    refs[e].current?.scrollIntoView({ behavior: "smooth" });
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
// IngredientsMenu.propTypes = {
//   click: PropTypes.func,
//   currentType: PropTypes.string.isRequired,
//   refs: PropTypes.object.isRequired,
// };



// const IngredientsItems = {
//   bun: "Булки",
//   main: "Начинки",
//   sauce: "Соусы",
// };

const BurgerIngredient: React.FC<BurgerIngredientProps> = ({
  element,
  onOpen,
  addToOrder,
}) => {
  const { image, price, name, _id } = element;
  const dispatch = useDispatch();
  const location = useLocation();
  const ingredientId = _id;

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

  const bunCountStore = useSelector<IBurgerIngredientsStore>(
    (store) => store.ingredients.clickedIngredient.bun
  ) as IIngredient;
  const itemsFromStore = useSelector<IBurgerIngredientsStore>(
    (store) => store.ingredients.clickedIngredient.items
  ) as IIngredient[];

  const itemsCount = itemsFromStore.filter(
    (item: { image: string; price: number; name: string; _id: string }) =>
      item._id === element._id
  );
  const others = itemsCount.length;
  const handleAddToOrder = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    addToOrder(element);
    // addClick(type, _id);
  };

  return isDrag ? null : (
    <li className={`${styles.ingredient} pt-6`} ref={ingredientRef}>
      <Link
        key={ingredientId}
        // Тут мы формируем динамический путь для нашего ингредиента
        to={`/ingredients/${ingredientId}`}
        // а также сохраняем в свойство background роут,
        // на котором была открыта наша модалка
        state={{ background: location }}
        className={styles.link}
      >
        <img
          src={image}
          alt={name}
          className="pl-4 pr-4"
          onClick={handleOnOpen}
        />
      </Link>
      <div className={`${styles.currency}`}>
        <p className="text text_type_digits-default" onClick={handleAddToOrder}>
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
  );
};

//проверка типов
// BurgerIngredient.propTypes = {
//   element: PropTypes.object.isRequired,
//   addToOrder: PropTypes.func.isRequired,
//   onOpen: PropTypes.func.isRequired,
// };

const Ingredients = forwardRef<HTMLDivElement, IngredientsProps>(
  (props, ref) => {
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
  }
);



const BurgerIngredients: FC<BurgerIngredientsProps> = ({
  onOpen,
  addToOrder,
}) => {
  const bunRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const ingredientsRef = useRef<HTMLDivElement>(null);
  const [currentType, setCurrentType] = useState<string>("bun");

  const ingredients = useSelector<
    { loadedIngredients: LoadedIngredients },
    LoadedIngredients
  >((store) => store.loadedIngredients);

  const clickType = (type: string) => {
    setCurrentType(type);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Здесь предполагается, что current не будет null. Возможно, потребуется дополнительная проверка.
      const containerRect = ingredientsRef.current!.getBoundingClientRect();
      const bunsRect = bunRef.current!.getBoundingClientRect();
      const saucesRect = sauceRef.current!.getBoundingClientRect();
      const fillingsRect = mainRef.current!.getBoundingClientRect();

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

    ingredientsRef.current!.addEventListener("scroll", handleScroll);

    return () => {
      if (ingredientsRef.current!) {
        ingredientsRef.current!.removeEventListener("scroll", handleScroll);
      }
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
          title="Булки"
          onOpen={onOpen}
          addToOrder={addToOrder}
        />
        <Ingredients
          ref={sauceRef}
          ingredients={ingredients.sauces}
          title="Соусы"
          onOpen={onOpen}
          addToOrder={addToOrder}
        />
        <Ingredients
          ref={mainRef}
          ingredients={ingredients.main}
          title="Начинки"
          onOpen={onOpen}
          addToOrder={addToOrder}
        />
      </div>
    </section>
  );
};

//проверка типов
BurgerIngredients.propTypes = {
  onOpen: PropTypes.func.isRequired,
  addToOrder: PropTypes.func.isRequired,
};

export default BurgerIngredients;
