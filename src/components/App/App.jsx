import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import React, { useEffect } from "react";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  AUTH_SUCCESS,
  SET_IS_AUTH_CHECKED,
  getIngredients,
} from "../../services/actions/actions";
import { REMOVE_CURRENT_INGREDIENT } from "../../services/actions/modal";
import { OPEN_MODAL_ORDER } from "../../services/actions/modal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { addIngredient } from "../../services/actions/addIngredient";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Router,
  createBrowserRouter,
} from "react-router-dom";
import HomePage from "../../pages/home";
import Register from "../../pages/register";
import Login from "../../pages/login";
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";
import Profile from "../../pages/profile";
import ErrorPage from "../../pages/error";
import IngredientPage from "../IngredientPage/IngredientPage";
import { fetchGetUser, updToken } from "../../utils/api";
import { OnlyAuth, OnlyUnAuth } from "../Protected-route/Protected-route";
import Feed from "../../pages/feed";
import FeedOrder from "../../pages/feed-order";
import HistortOfOrders from "../../pages/history-of-orders";
import OrderInHistory from "../../pages/order-in-history";

export default function App() {
  let location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      fetchGetUser()
        .then((data) => {
          console.log("data", data);
          if (data.success) {
            console.log("лол робит = ", data);
            // setEmailValue(data.user.email);
            // setValue(data.user.name);
            dispatch({ type: SET_IS_AUTH_CHECKED, payload: true });
            dispatch({ type: AUTH_SUCCESS, payload: data.user });
          }
        })
        .catch((err) => {
          console.log("error ", err);
          updToken({
            token: localStorage.getItem("refreshToken"),
          })
            .then((data) => {
              localStorage.setItem("accessToken", data.accessToken);
              localStorage.setItem("refreshToken", data.refreshToken);
            })
            .catch((err) => console.log("update err", err));
          fetchGetUser().then((data) => {
            console.log("new data", data);
            if (data.success) {
              console.log("лол робит = ", data);
              // setEmailValue(data.user.email);
              // setValue(data.user.name);
              dispatch({ type: SET_IS_AUTH_CHECKED, payload: true });
              dispatch({ type: AUTH_SUCCESS, payload: data.user });
            }
          });
        });
    }
  }, []);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        {/* <Route path="/feed" element={<OnlyUnAuth component={<Feed />} />} /> */}
        <Route path="/feed" element={<Feed />} />
        <Route
          path="/feed/:orderNumber"
          element={<OnlyUnAuth component={<FeedOrder popup={true} />} />}
        />
        {/* <Route path="/feed/:orderNumber" element={<FeedOrder />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path="/forgot-password"
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path="/reset-password"
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route path="/profile" element={<OnlyAuth component={<Profile />} />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/ingredients/:ingredientId" element={<IngredientPage />} />
        <Route
          path="/profile/orders"
          element={<OnlyAuth component={<HistortOfOrders />} />}
        />
        <Route
          path="/profile/orders/:orderHistoryNumber"
          element={<OnlyAuth component={<OrderInHistory popup={true} />} />}
        />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal title="Детали ингредиента" onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}

      {background && (
        <Routes>
          <Route
            path="/feed/:orderNumber"
            element={
              <Modal title="" onClose={handleModalClose}>
                <FeedOrder popup={false} />
              </Modal>
            }
          />
        </Routes>
      )}

      {background && (
        <Routes>
          <Route
            path="/profile/orders/:orderHistoryNumber"
            element={
              <Modal title="" onClose={handleModalClose}>
                <OrderInHistory popup={false} />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}
