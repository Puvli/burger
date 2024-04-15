import { ICountIngredients } from "../../pages/order-in-history";
import { POPUP_ORDER } from "../actions/actions";
import { IIngredient, OrderState, PoupOrderAction } from "../types";

const initialState: OrderState = {
  orderData: {
    orders: [],
    success: false,
  },
  elem: {
    ingredients: [],
    name: "",
    createdAt: "",
    status: "",
  },
  popupSuccess: false,
};

export const orderData = (state = initialState, action: PoupOrderAction) => {
  switch (action.type) {
    case POPUP_ORDER: {
      return {
        orderData: action.payload,
        elem: action.payload.orders[0],
        popupSuccess: action.payload.success,
      };
    }

    default:
      return state;
  }
};
