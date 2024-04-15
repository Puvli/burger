import AppHeader from "../AppHeader/AppHeader";
import { useEffect } from "react";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import {
  AUTH_SUCCESS,
  SET_IS_AUTH_CHECKED,
  getIngredients,
  getUser,
} from "../../services/actions/actions";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
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
import { useAppDispatch } from "../../services/hooks/hooks";

export default function App() {
  let location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getIngredients());

    if (localStorage.getItem("accessToken")) {
      dispatch(getUser());
    }
  }, []);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/feed" element={<Feed />} />
        <Route
          path="/feed/:orderNumber"
          element={<OnlyUnAuth component={<FeedOrder popup={true} />} />}
        />
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
              // <OnlyAuth
              // component={
              <Modal title="" onClose={handleModalClose}>
                <OnlyAuth component={<OrderInHistory popup={false} />} />
              </Modal>
              // }
              // />
            }
          />
        </Routes>
      )}
    </>
  );
}
