import { useNavigate } from "react-router-dom";
import {
  fetchGetUser,
  getOrder,
  getOrderNumber,
  getProfileData,
  ingredientsApi,
  loginApi,
  registerApi as registrationApi,
} from "../../utils/api";
import { GET_INGREDIENTS_SUCCESS } from "./loadIngredients";

export const ADD_INGREDIENTS_SUCCESS = "ADD_INGREDIENTS_SUCCESS";
export const DELETE_INGREDIENTS = "DELETE_INGREDIENTS";
export const MAKE_NEW_ORDER = "MAKE_NEW_ORDER";

export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const UPDATE_SUCCESS = "UPDATE_SUCCESS";
export const SET_IS_AUTH_CHECKED = "SET_IS_AUTH_CHECKED";
export const SET_USER = "SET_USER";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const POPUP_ORDER = "POPUP_ORDER";

export const logIn = (payload) => (dispatch) => {
  return loginApi(payload)
    .then((res) => {
      if (res.success) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { name: res.user.name, email: res.user.email },
        });
        dispatch({
          type: SET_IS_AUTH_CHECKED,
          payload: true,
        });
        // dispatch(setIsAuthChecked(true));
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
      } else {
        console.log(res.message);
      }
    })
    .catch((e) => console.log(e));
};

export const makeRegistration = (payload) => (dispatch) => {
  return registrationApi(payload)
    .then(({ accessToken, refreshToken, user }) => {
      dispatch({
        type: REGISTRATION_SUCCESS,
        payload: { name: user.name, email: user.email },
      });
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    })
    .catch((e) => console.log(e));
};

export const getIngredients = (payload) => (dispatch) => {
  return ingredientsApi()
    .then(({ data }) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        payload: data,
      });
    })
    .catch((e) => console.log(e));
};

export const makeNewOrder = (id) => (dispatch) => {
  return getOrderNumber(id)
    .then(({ order }) => {
      dispatch({
        type: MAKE_NEW_ORDER,
        payload: order,
      });
    })
    .catch((e) => console.log(e));
};

export const getUser = (dispatch) => {
  return fetchGetUser()
    .then((res) => {
      if (res.success) {
        dispatch({
          type: SET_IS_AUTH_CHECKED,
          payload: true,
        });
        // dispatch(setIsAuthChecked(true));
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
      } else {
        console.log(res.message);
      }
    })
    .catch((err) => console.log("err", err));
};

export const getDataOfOrder = (id) => (dispatch) => {
  getOrder(id)
    .then((res) => {
      if (res.success) {
        dispatch({ type: POPUP_ORDER, payload: res });
        console.log("zapros", res);
      }
    })
    .catch((err) => console.log(err));
};
