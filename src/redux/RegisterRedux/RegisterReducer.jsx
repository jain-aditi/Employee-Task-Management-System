import * as types from "./actionTypes";

const initialState = {
  loading: false,
  user: null,
  error: null,
};

const RegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER:
    case types.LOGIN:
    case types.LOGOUT:
      return {
        ...state,
        loading: true,
      };

    case types.REGISTER_SUCCESS:
    case types.LOGIN_SUCCESS:
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case types.REGISTER_FAILURE:
    case types.LOGIN_FAILURE:
    case types.LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default RegisterReducer;
