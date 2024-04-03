import {
  OPEN_MODAL_ORDER,
  CURRENT_INGREDIENT,
  REMOVE_CURRENT_INGREDIENT,
} from "../actions/modal";
import { ModalActionTypes, ModalState } from "../types";

const initialState: ModalState = {
  isOpen: false,
};
export const modalReducer = (
  state = initialState,
  action: ModalActionTypes
) => {
  switch (action.type) {
    case OPEN_MODAL_ORDER:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case CURRENT_INGREDIENT:
      return {
        ...state,
        current: action.payload.current,
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
