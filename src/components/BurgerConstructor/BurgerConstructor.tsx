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
import { OPEN_MODAL_ORDER } from "../../services/actions/modal";
import { DRAG_IN_CONSTRUCTOR } from "../../services/actions/drag";
import { useDrop, useDrag } from "react-dnd";
import { FC, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import { AppReducerState, IClickedIngredient } from "../../services/reducers/reducers";
import { AppReducerState, IBurgerComponentProps, IBurgerConstructor, IBurgerIngredientsStore, IClickedIngredient, ICustomer, ICustomerState, IIngredient, TInfo } from "../../services/types";

const BurgerComponent: React.FC<IBurgerComponentProps> = ({ item, index }) => {
  const style = {
    cursor: "move",
  };

  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement | null>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "draggedIngredient",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
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

      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

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
      return { id: item._id, index };
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
      data-handler-id={handlerId}
    >
      <ConstructorElement
        text={`${item.name}`}
        price={+`${item.price}`}
        thumbnail={`${item.image}`}
        handleClose={deleteElement}
      />
      ;
      <DragIcon type="primary" />
    </div>
  );
};

// interface IClickedIngredient {
//     items: IIngredient[];
//     bun: IIngredient;
// }

const BurgerComponents = () => {
  const clickedIngredient = useSelector<IBurgerIngredientsStore>(
    (store) => store.ingredients.clickedIngredient
  ) as IClickedIngredient;

  return (
    <>
      {clickedIngredient.bun && (
        <ConstructorElement
          text={`${clickedIngredient.bun.name} (верх)`}
          price={+`${clickedIngredient.bun.price}`}
          thumbnail={`${clickedIngredient.bun.image}`}
          type="top"
          isLocked={true}
          extraClass="mr-4"
        />
      )}

      {clickedIngredient.items &&
        clickedIngredient.items.map((item: IIngredient, index: number) => {
          return (
            <BurgerComponent item={item} key={item.uniqueId} index={index} />
          );
        })}

      {clickedIngredient.bun && (
        <ConstructorElement
          text={`${clickedIngredient.bun.name} (низ)`}
          price={+`${clickedIngredient.bun.price}`}
          thumbnail={`${clickedIngredient.bun.image}`}
          type="bottom"
          isLocked={true}
          extraClass="mr-4"
        />
      )}
    </>
  );
};

const Info: FC<TInfo> = () => {
  const dispatch = useDispatch();
  const orderList = useSelector<IBurgerIngredientsStore>(
    (store) => store.ingredients.clickedIngredient
  ) as IClickedIngredient;
  let isDisabled = orderList.bun && orderList.items.length > 0;
  const orderClick = () => {
    if (isDisabled) {
      const bunsOrder = [orderList.bun!._id, orderList.bun!._id];
      const itemsOrder = orderList.items.map((item) => item._id);
      // if (bunsOrder && itemsOrder) {
      dispatch(makeNewOrder({ ingredients: [...bunsOrder, ...itemsOrder] }));
      // }
      dispatch({
        type: OPEN_MODAL_ORDER,
      });
    }
  };
  const bunPrice = orderList.bun ? orderList.bun.price * 2 : 0;
  const itemsPrices = orderList.items
    ? orderList.items.reduce(
        (sum: number, item: { price: number }) => sum + item.price,
        0
      )
    : 0;

  const customer = useSelector<ICustomer>(
    (store) => store.customer
  ) as ICustomerState;
  const navigate = useNavigate();

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
        disabled={!isDisabled}
        onClick={() => {
          if (customer.isAuthChecked) {
            orderClick();
          } else if (orderList.items.length) {
            navigate("/login");
          }
        }}
      >
        Оформить заказ
      </Button>
    </div>
  );
};

const BurgerConstructor: FC<IBurgerConstructor> = ({
  onClick,
  onDropHandler,
}) => {
  const [, refComponent] = useDrop({
    accept: "ingredient",
    drop(item: IIngredient) {
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
// BurgerConstructor.propTypes = {
//   onClick: PropTypes.func,
//   onDropHandler: PropTypes.func,
// };

export default BurgerConstructor;
