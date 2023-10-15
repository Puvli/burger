import {
  ADD_INGREDIENTS_SUCCESS,
  DELETE_INGREDIENTS,
} from "../actions/actions";
import {
  DRAG_INGREDIENT_TO_CONSTRUCTOR,
  DRAG_IN_CONSTRUCTOR,
} from "../actions/drag";
import { combineReducers } from "redux";
import { modalReducer } from "./modalReducer";
import { makeNewOrder } from "./makeNewOder";
import { loadIngredients } from "./loadIngredients";
import { v4 as uuid4 } from "uuid";
import { addIngredientReducer } from "../reducers/addIngredient";

const initialState = {
  clickedIngredient: {
    items: [],
    bun: null,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENTS_SUCCESS:
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
  // id: addIngredientReducer,
});
