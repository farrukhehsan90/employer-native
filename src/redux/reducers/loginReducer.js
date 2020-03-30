import { SIGN_UP, LOGIN, LOGIN_LOADING, ERROR } from "../actions/types";

const initialState = {
  username: "",
  password: "",
  loading: false,
  errors: {}
};

const loginReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_LOADING:
      return {
        ...state,
        loading: payload
      };
    case LOGIN:
      return {
        ...state,
        username: payload.username
      };

    case SIGN_UP:
      return {
        ...state,
        username: payload.username
      };
    case ERROR:
      return {
        ...state,
        errors: payload
      };
    default:
      return state;
  }
};

export default loginReducer;
