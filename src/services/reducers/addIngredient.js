import { ADD_INGREDIENT } from "../actions/addIngredient";

const initialState = {
  id: null,
  item: null
};

export const addIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        id: action.payload.iniqueId,
      };
    default: {
      return state;
    }
  }
};
