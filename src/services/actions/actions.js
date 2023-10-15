import { getOrderNumber, ingredientsApi } from "../../utils/api";
import { GET_INGREDIENTS_SUCCESS } from "./loadIngredients";

export const ADD_INGREDIENTS_SUCCESS = "ADD_INGREDIENTS_SUCCESS";
export const DELETE_INGREDIENTS = "DELETE_INGREDIENTS";
export const MAKE_NEW_ORDER = "MAKE_NEW_ORDER";

export const getIngredients = (payload) => (dispatch) => {
  return ingredientsApi().then(({ data }) => {
    dispatch({
      type: GET_INGREDIENTS_SUCCESS,
      payload: data,
    });
  });
};

export const makeNewOrder = (id) => (dispatch) => {
  return getOrderNumber(id).then(({order}) => {
    dispatch({
      type: MAKE_NEW_ORDER,
      payload: order,
    });
  });
};
