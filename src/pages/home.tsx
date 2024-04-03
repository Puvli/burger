import AppHeader from "../components/AppHeader/AppHeader";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import React from "react";
import IngredientDetails from "../components/IngredientDetails/IngredientDetails";
import OrderDetails from "../components/OrderDetails/OrderDetails";
import Modal from "../components/Modal/Modal";
import { getIngredients } from "../services/actions/actions";
import { REMOVE_CURRENT_INGREDIENT } from "../services/actions/modal";
import { OPEN_MODAL_ORDER } from "../services/actions/modal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { addIngredient } from "../services/actions/addIngredient";
import { useLocation, useNavigate } from "react-router-dom";
// import { getProfileData } from "../utils/api";
import { IIngredient, IModalInHome } from "../services/types";
import { useAppDispatch, useAppSelector } from "../services/hooks/hooks";

function HomePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const clickBun = (bun: IIngredient) => {
    dispatch(addIngredient(bun));
  };

  const clickNotBun = (item: IIngredient) => {
    dispatch(addIngredient(item));
  };

  const addToOrder = (elem: IIngredient) => {
    if (elem.type === "bun") {
      clickBun(elem);
    } else if (elem.type === "sauce") {
      clickNotBun(elem);
    } else if (elem.type === "main") {
      clickNotBun(elem);
    }
    console.log(elem);
  };

  React.useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const [isOpenModalOrder, setOpenModalOrder] = React.useState(false);

  const handleModalOrder = () => {
    setOpenModalOrder(isOpenModalOrder ? false : true);
    dispatch({
      type: OPEN_MODAL_ORDER,
      payload: ""
    });
  };

  const [ingredientOpen, setOpenIngredient] = React.useState(false);
  const [ingredientInfo, setIngredientInfo] = React.useState({});

  const ingredientOpener = (info: IIngredient) => {
    setIngredientInfo(info);
    setOpenIngredient(ingredientOpen ? false : true);
    dispatch({ type: REMOVE_CURRENT_INGREDIENT, payload: "" });
    // navigate(-1);
  };

  const modalOrderOpen = useAppSelector(store => store.modal.isOpen);

  const onDropHandler = (item: IIngredient) => {
    dispatch(addIngredient(item));
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients onOpen={ingredientOpener} addToOrder={addToOrder} />
        <BurgerConstructor onDropHandler={onDropHandler} />(
        {modalOrderOpen && (
          <Modal title="" onClose={handleModalOrder}>
            <OrderDetails />
          </Modal>
        )}
        )
      </DndProvider>
    </>
  );
}

export default HomePage;
