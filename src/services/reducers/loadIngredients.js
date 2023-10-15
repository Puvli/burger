import { GET_INGREDIENTS_SUCCESS } from "../actions/loadIngredients";

const initialState = {
    buns: [],
    main: [],
    sauces: [],
  };
  
  export const loadIngredients = (state = initialState, action) => {
    switch (action.type) {
      case GET_INGREDIENTS_SUCCESS:
        return {
          ...state,
          buns: action.payload.filter((item) => item.type === "bun"),
          main: action.payload.filter((item) => item.type === "main"),
          sauces: action.payload.filter((item) => item.type === "sauce"),
        };
      default:
        return state;
    }
  };
  