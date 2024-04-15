import { LOGIN_SUCCESS, SET_IS_AUTH_CHECKED } from "../actions/actions";

interface SetIsAuthCheckedAction {
  type: typeof SET_IS_AUTH_CHECKED;
  payload: boolean;
}

interface UserState {
  user: {
    name: string;
    email: string;
  };
  isAuthChecked: boolean;
}

const initialState: UserState = {
  user: {
    name: "",
    email: "",
  },
  isAuthChecked: false,
};

export const setUserReducer = (
  state = initialState,
  action: SetIsAuthCheckedAction
) => {
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
