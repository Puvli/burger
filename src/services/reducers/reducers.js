import {
  ADD_INGREDIENTS_SUCCESS,
  DELETE_INGREDIENTS,
  SET_IS_AUTH_CHECKED,
} from "../actions/actions";
import {
  DRAG_INGREDIENT_TO_CONSTRUCTOR,
  DRAG_IN_CONSTRUCTOR,
} from "../actions/drag";
import { combineReducers } from "redux";
import { modalReducer } from "./modalReducer";
import { makeNewOrder } from "./makeNewOder";
import { loadIngredients } from "./loadIngredients";
import { customerReducer } from "./customerReducer";
import { socketReducer } from "../socket/reducer";
import { userSocketReducer } from "../user/reducer";
import { orderData } from "./orderData";

const initialState = {
  clickedIngredient: {
    items: [],
    bun: null,
  },
  isAuthCheked: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_AUTH_CHECKED:
      return {
        ...state,
        isAuthCheked: action.payload,
      };
    case ADD_INGREDIENTS_SUCCESS:
      if (action.payload.type === "bun") {
        return {
          ...state,
          clickedIngredient: {
            ...state.clickedIngredient,
            bun: action.payload,
          },
        };
      } else {
        return {
          ...state,
          clickedIngredient: {
            ...state.clickedIngredient,
            items: [...state.clickedIngredient.items, action.payload],
          },
        };
      }
    case DELETE_INGREDIENTS:
      return {
        ...state,
        clickedIngredient: {
          ...state.clickedIngredient,
          items: [
            ...state.clickedIngredient.items.slice(0, action.index),
            ...state.clickedIngredient.items.slice(action.index + 1),
          ],
        },
      };
    case DRAG_INGREDIENT_TO_CONSTRUCTOR:
      if (action.bun) {
        return {
          ...state,
          clickedIngredient: {
            ...state.clickedIngredient,
            bun: action.bun,
          },
        };
      } else if (action.items) {
        return {
          ...state,
          clickedIngredient: {
            ...state.clickedIngredient,
            items: [...state.clickedIngredient.items, action.items],
          },
        };
      }
      break;
    case DRAG_IN_CONSTRUCTOR: {
      // Создайли копию массива ингредиентов
      const updatedIngredients = [...state.clickedIngredient.items];

      // Удалили элемент из его текущей позиции
      const [movedIngredient] = updatedIngredients.splice(action.index, 1);

      // ставим элемент в новую позицию
      updatedIngredients.splice(action.drag, 0, movedIngredient);
      return {
        ...state,
        clickedIngredient: {
          ...state.clickedIngredient,
          items: updatedIngredients,
        },
      };
    }
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  ingredients: reducer,
  modal: modalReducer,
  number: makeNewOrder,
  loadedIngredients: loadIngredients,
  customer: customerReducer,
  socket: socketReducer,
  orderPopupData: orderData,
  // userSocket: userSocketReducer,
});
