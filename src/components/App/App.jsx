import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import React from "react";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import { Api } from "../../utils/api";
import Modal from "../Modal/Modal";
function App() {
  // const { getIngredients } = Api();

  const [ingredients, setIngredients] = React.useState({
    buns: [],
    main: [],
    sauces: [],
  });

  React.useEffect(() => {
    Api()
      .then(({ data, success }) => {
        if (success === true) {
          setIngredients({
            buns: data.filter((item) => item.type === "bun"),
            main: data.filter((item) => item.type === "main"),
            sauces: data.filter((item) => item.type === "sauce"),
          });
        } else {
          console.log("Упс, что-то сломалось");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [isOpenModalOrder, setOpenModalOrder] = React.useState(false);

  const handleModalOrder = () => {
    setOpenModalOrder(isOpenModalOrder ? false : true);
  };

  const [ingredientOpen, setOpenIngredient] = React.useState(false);
  const [ingredientInfo, setIngredientInfo] = React.useState({});

  const ingredientOpener = (info) => {
    setIngredientInfo(info);
    setOpenIngredient(ingredientOpen ? false : true);
  };

  return (
    <>
      <AppHeader />
      <BurgerIngredients onOpen={ingredientOpener} ingredients={ingredients} />
      <BurgerConstructor onClick={handleModalOrder} />(
      {isOpenModalOrder && (
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
    </>
  );
}

export default App;
