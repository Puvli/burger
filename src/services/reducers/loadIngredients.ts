import { GET_INGREDIENTS_SUCCESS } from "../actions/loadIngredients";
import { IGetIngredientsSuccessAction, ILoadIngredientsState } from "../types";

const initialState: ILoadIngredientsState = {
  buns: [],
  main: [],
  sauces: [],
  all: [],
};

// const initialState = {
//   buns: [],
//   main: [],
//   sauces: [],
// };

export const loadIngredients = (
  state = initialState,
  action: IGetIngredientsSuccessAction
): ILoadIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        buns: action.payload.filter((item) => item.type === "bun"),
        main: action.payload.filter((item) => item.type === "main"),
        sauces: action.payload.filter((item) => item.type === "sauce"),
        all: action.payload,
      };
    default:
      return state;
  }
};
