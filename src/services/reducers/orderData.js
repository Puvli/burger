import { POPUP_ORDER } from "../actions/actions";

const initialState = {
  orderData: {},
  elem: null,
};

export const orderData = (state = initialState, action) => {
  switch (action.type) {
    case POPUP_ORDER: {
      return {
        orderData: action.payload,
        elem: action.payload.orders[0],
        popupSuccess: action.payload.success
      };
    }

    default:
      return state;
  }
};
