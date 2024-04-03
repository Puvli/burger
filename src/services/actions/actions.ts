import {
  fetchGetUser,
  getOrder,
  getOrderNumber,
  ingredientsApi,
  logOutApi,
  loginApi,
  registerApi as registrationApi,
  updToken,
  updateUserInformationApi,
} from "../../utils/api";
import { GET_INGREDIENTS_SUCCESS } from "./loadIngredients";
import { MakeNewOrderPayload } from "../types";
import { AppDispatch } from "../hooks/hooks";

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

export const logIn =
  (payload: { email: string; password: string }) => (dispatch: AppDispatch) => {
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
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
        } else {
          console.log(res.message);
        }
      })
      .catch((e) => console.log(e));
  };

export const logOut =
  (value: { token: string | null }) => (dispatch: AppDispatch) => {
    return logOutApi({ token: localStorage.getItem("refreshToken") }).then(
      (res) => {
        if (res.success) {
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("accessToken");
          dispatch({ type: LOGOUT_SUCCESS, payload: "" });
        }
      }
    );
  };

export const makeRegistration =
  (payload: { name: string; email: string; password: string }) =>
  (dispatch: AppDispatch) => {
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

export const updateUserInformation =
  (name: string, email: string, password: string) =>
  (dispatch: AppDispatch) => {
    return updateUserInformationApi(name, email, password)
      .then((data) => {
        console.log("data", data);
        dispatch({ type: UPDATE_SUCCESS, payload: data.user });
      })
      .catch((err) => console.log("err", err));
  };

export const getIngredients = () => (dispatch: AppDispatch) => {
  return ingredientsApi()
    .then(({ data }) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        payload: data,
      });
    })
    .catch((e) => console.log(e));
};

export const makeNewOrder =
  (id: MakeNewOrderPayload) => (dispatch: AppDispatch) => {
    return getOrderNumber(id)
      .then(({ order }) => {
        dispatch({
          type: MAKE_NEW_ORDER,
          payload: order,
        });
      })
      .catch((e) => console.log(e));
  };

export const getUser = () => (dispatch: AppDispatch) => {
  return fetchGetUser()
    .then((data) => {
      if (data.success) {
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
          dispatch({ type: SET_IS_AUTH_CHECKED, payload: true });
          dispatch({ type: AUTH_SUCCESS, payload: data.user });
        }
      });
    });
};

export const getDataOfOrder = (id: string) => (dispatch: AppDispatch) => {
  return getOrder(id)
    .then((res) => {
      if (res.success) {
        dispatch({ type: POPUP_ORDER, payload: res });
        console.log("zapros", res);
      }
      console.log("res getData", res);
    })
    .catch((err) => console.log(err));
};
