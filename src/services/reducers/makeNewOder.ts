import { MAKE_NEW_ORDER } from "../actions/actions";
import { IMakeNewOrderAction, INewOrderState } from "../types";

const initialState: INewOrderState = {
  number: null,
};

export const makeNewOrder = (
  state = initialState,
  action: IMakeNewOrderAction
): INewOrderState => {
  switch (action.type) {
    case MAKE_NEW_ORDER: {
      console.log(action.payload);
      return {
        ...state,
        number: action.payload.number,
      };
    }

    default: {
      return state;
    }
  }
};
