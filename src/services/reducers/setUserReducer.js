import { LOGIN_SUCCESS, SET_IS_AUTH_CHECKED } from "../actions/actions";

const initialState = {
  user: null,
  isAuthChecked: false,
};

export const setUserReducer = (state = initialState, action) => {
  switch (action.type) {
    // case LOGIN_SUCCESS:
    //   // localStorage.setItem("accessToken", action.payload.accessToken);
    //   // localStorage.setItem("refreshToken", action.payload.refreshToken);
    //   return {
    //     ...state,
    //     user: action.payload,
    //   };
    case SET_IS_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload,
      };

    default: {
      return state;
    }
  }
};
