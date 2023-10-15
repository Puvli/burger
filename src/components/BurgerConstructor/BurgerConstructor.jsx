import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_INGREDIENTS,
  makeNewOrder,
} from "../../services/actions/actions";
import { OPEN_MODAL_ORDER } from "../../services/actions/Modal";
import { DRAG_IN_CONSTRUCTOR } from "../../services/actions/Drag";
import { useDrop, useDrag } from "react-dnd";
import { useRef } from "react";

const BurgerComponent = ({ item, index }) => {
  const style = {
    cursor: "move",
  };

  const dispatch = useDispatch();

  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "draggedIngredient",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch({
        type: DRAG_IN_CONSTRUCTOR,
        index: hoverIndex,
        drag: dragIndex,
      });

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "draggedIngredient",
    item: () => {
      const id = item.id;
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const deleteElement = () => {
    dispatch({ type: DELETE_INGREDIENTS, index: index });
  };

  return (
    <div
      className={`${styles.component} mr-2`}
      ref={ref}
      style={{ ...style, opacity }}
      data-nabdler-id={handlerId}
    >
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
  index: PropTypes.number,
};

const BurgerComponents = () => {
  const clickedIngredient = useSelector(
    (store) => store.ingredients.clickedIngredient
  );
  // const draggedElements = useSelector(
  //   (store) => store.dragItems.clickedIngredient
  // );

  return (
    <>
      {(clickedIngredient.bun && (
        <ConstructorElement
          text={`${clickedIngredient.bun.name} (верх)`}
          price={`${clickedIngredient.bun.price}`}
          thumbnail={`${clickedIngredient.bun.image}`}
          type="top"
          isLocked={true}
          extraClass="mr-4"
        />
      )) }

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
  const dispatch = useDispatch();
  const orderList = useSelector((store) => store.ingredients.clickedIngredient);
  const orderClick = () => {
    const bunsOrder = [orderList.bun._id, orderList.bun._id];
    const itemsOrder = orderList.items.map((item) => item._id);
    dispatch(makeNewOrder({ ingredients: [...bunsOrder, ...itemsOrder] }));
    dispatch({
      type: OPEN_MODAL_ORDER,
    });
  };
  const bunPrice = orderList.bun ? orderList.bun.price * 2 : 0;
  const itemsPrices = orderList.items
    ? orderList.items.reduce((sum, item) => sum + item.price, 0)
    : 0;
  // const price = React.useMemo(() => {
  //   const bunPrice = clickedIngredient.bun
  //     ? clickedIngredient.bun.price * 2
  //     : 0;
  //   const itemsPrices = clickedIngredient.items
  //     ? clickedIngredient.items.reduce((sum, item) => sum + item.price, 0)
  //     : 0;
  //   return bunPrice + itemsPrices;
  // }, [clickedIngredient]);

  //price

  return (
    <div className={`${styles.info}`}>
      <div className={`${styles.info__price}`}>
        <p className="text text_type_digits-medium">{bunPrice + itemsPrices}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button
        htmlType="button"
        type="primary"
        size="large"
        extraClass="mr-4"
        onClick={orderClick}
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

const BurgerConstructor = ({ onClick, onDropHandler }) => {
  // let orderPrice = useSelector((store) => store);

  const [, refComponent] = useDrop({
    accept: "ingredient",
    drop(item) {
      onDropHandler(item);
    },
  });

  return (
    <section className={`${styles.constructor} ml-10`} ref={refComponent}>
      <div className={`${styles.list} custom-scroll`}>
        <BurgerComponents />
      </div>

      <Info onClick={onClick} price={0} />
    </section>
  );
};

//проверка типов
BurgerConstructor.propTypes = {
  onClick: PropTypes.func,
  onDropHandler: PropTypes.func,
};

export default BurgerConstructor;
