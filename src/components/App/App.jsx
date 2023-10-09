import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import React from "react";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import { ingredientsApi, getOrderNumber } from "../../utils/api";
import Modal from "../Modal/Modal";
import { BurgerContext } from "../../services/BurgerContext";

function App() {
  const [bunCounter, setBun] = React.useState({});
  const [mainCounter, setMain] = React.useState({});
  const [sauceCounter, setSauce] = React.useState({});
  const [orderNumber, setOrderNumber] = React.useState();

  const addClick = (type, id) => {
    if (type === "bun") {
      setBun({ [id]: 1 });
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
    console.log(bunCounter);
  };

  const [ingredients, setIngredients] = React.useState({
    buns: [],
    main: [],
    sauces: [],
  });

  const [clickedIngredient, setClickedIngredient] = React.useState({
    bun: null,
    items: [],
  });

  const clickBun = (bun) => {
    setClickedIngredient({ ...clickedIngredient, bun: bun });
  };

  const clickNotBun = (item) => {
    setClickedIngredient({
      ...clickedIngredient,
      items: [...clickedIngredient.items, item],
    });
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
    console.log(clickedIngredient);
  };

  const deleteIngredient = (index, item) => {
    setClickedIngredient({
      ...clickedIngredient,
      items: [
        ...clickedIngredient.items.slice(0, index),
        ...clickedIngredient.items.slice(index + 1),
      ],
    });

    if (item.type === "main") {
      setMain({
        ...mainCounter,
        [item._id]:
          mainCounter[item._id] && mainCounter[item._id] > 1
            ? mainCounter[item._id] - 1
            : null,
      });
    } else if (item.type === "sauce") {
      setSauce({
        ...sauceCounter,
        [item._id]:
          sauceCounter[item._id] && sauceCounter[item._id] > 1
            ? sauceCounter[item._id] - 1
            : null,
      });
    }
  };

  React.useEffect(() => {
    ingredientsApi()
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

  const handleCloseModalOrder = () => {
    setOpenModalOrder((isOpenModalOrder = false));
  };

  const [ingredientOpen, setOpenIngredient] = React.useState(false);
  const [ingredientInfo, setIngredientInfo] = React.useState({});

  const ingredientOpener = (info) => {
    setIngredientInfo(info);
    setOpenIngredient(ingredientOpen ? false : true);
  };

  const makeOrder = () => {
    const bunOrder = clickedIngredient.bun
      ? [clickedIngredient.bun._id, clickedIngredient.bun._id]
      : [];
    const itemsOrder = clickedIngredient.items.map((item) => item._id);
    getOrderNumber({ ingredients: [...bunOrder, ...itemsOrder] })
      .then((data) => {
        setOrderNumber(data.order.number);
      })
      .then(() => {
        setOpenModalOrder(true);
      })
      .catch((err) => {
        setOrderNumber(null);
        console.log(err);
      });
  };

  return (
    <>
      <AppHeader />
      <BurgerIngredients
        onOpen={ingredientOpener}
        ingredients={ingredients}
        addToOrder={addToOrder}
        bunCounter={bunCounter}
        mainCounter={mainCounter}
        sauceCounter={sauceCounter}
        addClick={addClick}
      />
      <BurgerContext.Provider value={{ clickedIngredient, deleteIngredient }}>
        <BurgerConstructor onClick={makeOrder} />
      </BurgerContext.Provider>
      (
      {isOpenModalOrder && (
        <Modal title="" onClose={handleModalOrder}>
          <OrderDetails number={orderNumber} />
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
