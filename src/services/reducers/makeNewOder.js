import { MAKE_NEW_ORDER } from "../actions/actions";

const initialState = {
  number: null,
};

export const makeNewOrder = (state = initialState, action) => {
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
