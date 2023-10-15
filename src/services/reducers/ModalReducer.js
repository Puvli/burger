import { OPEN_MODAL_ORDER, CURRENT_INGREDIENT, REMOVE_CURRENT_INGREDIENT } from "../actions/Modal";

const initialState = {
  isOpen: false,
};
export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL_ORDER:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case CURRENT_INGREDIENT:
      return {
        ...state,
        current: action.current,
      };
    case REMOVE_CURRENT_INGREDIENT:
      return {
        ...state,
        current: null,
      };
    default:
      return state;
  }
};
