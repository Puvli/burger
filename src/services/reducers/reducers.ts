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
import { customerReducer } from "./customerReducer";
import { socketReducer } from "../socket/reducer";
import { orderData } from "./orderData";
import { AppActions, AppReducerState } from "../types";
import { loadIngredients } from "./loadIngredients";

// interface AddIngredientsSuccessAction {
//   type: typeof ADD_INGREDIENTS_SUCCESS;
//   payload: IIngredient; // Замените any на более конкретный тип данных
// }

// interface DeleteIngredientsAction {
//   type: typeof DELETE_INGREDIENTS;
//   index: number;
// }

// interface SetIsAuthCheckedAction {
//   type: typeof SET_IS_AUTH_CHECKED;
//   payload: boolean;
// }

// interface DragIngredientToConstructorAction {
//   type: typeof DRAG_INGREDIENT_TO_CONSTRUCTOR;
//   bun?: IIngredient; // Замените any на более конкретный тип данных
//   items?: IIngredient[]; // Замените any на более конкретный тип данных
// }

// interface DragInConstructorAction {
//   type: typeof DRAG_IN_CONSTRUCTOR;
//   index: number;
//   drag: number;
// }

// export type AppActions =
//   | AddIngredientsSuccessAction
//   | DeleteIngredientsAction
//   | SetIsAuthCheckedAction
//   | DragIngredientToConstructorAction
//   | DragInConstructorAction;

// export interface IClickedIngredient {
//   items: IIngredient[];
//   bun: IIngredient | null;
// }

// export interface AppReducerState {
//   clickedIngredient: IClickedIngredient;
//   isAuthChecked: boolean;
// }

const initialState: AppReducerState = {
  clickedIngredient: {
    items: [],
    bun: null,
  },
  isAuthChecked: false,
};

const reducer = (state: AppReducerState = initialState, action: AppActions) => {
  switch (action.type) {
    case SET_IS_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload,
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
});
