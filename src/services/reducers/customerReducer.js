import {
  AUTH_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTRATION_SUCCESS,
  SET_IS_AUTH_CHECKED,
  UPDATE_SUCCESS,
} from "../actions/actions";

const initialState = {
  name: "",
  email: "",
  isAuthChecked: false,
};

export const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
      };

      case UPDATE_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
      };

    case AUTH_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
      };

    case SET_IS_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        name: null,
        email: null,
        isAuthChecked: false,
      };

    default: {
      return state;
    }
  }
};
