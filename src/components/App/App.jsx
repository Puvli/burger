import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import React from "react";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/actions";
import { REMOVE_CURRENT_INGREDIENT } from "../../services/actions/modal";
import { OPEN_MODAL_ORDER } from "../../services/actions/modal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { addIngredient } from "../../services/actions/addIngredient";

function App() {
  const dispatch = useDispatch();

  const clickBun = (bun) => {
    dispatch(addIngredient(bun));
  };

  const clickNotBun = (item) => {
    dispatch(addIngredient(item));
  };

  const addToOrder = (elem) => {
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
    });
  };

  const [ingredientOpen, setOpenIngredient] = React.useState(false);
  const [ingredientInfo, setIngredientInfo] = React.useState({});

  const ingredientOpener = (info) => {
    setIngredientInfo(info);
    setOpenIngredient(ingredientOpen ? false : true);
    dispatch({ type: REMOVE_CURRENT_INGREDIENT });
  };

  const modalOrderOpen = useSelector((store) => store.modal.isOpen);

  const onDropHandler = (item) => {
    dispatch(addIngredient(item));
  };

  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients onOpen={ingredientOpener} addToOrder={addToOrder} />
        <BurgerConstructor onDropHandler={onDropHandler} />(
        {modalOrderOpen && (
          <Modal title="" onClose={handleModalOrder}>
            <OrderDetails />
          </Modal>
        )}
        ) (
        {ingredientOpen && ingredientInfo && (
          <Modal title="Детали ингредиента" onClose={ingredientOpener}>
            <IngredientDetails data={ingredientInfo} />
          </Modal>
        )}
        )
      </DndProvider>
    </>
  );
}

export default App;
