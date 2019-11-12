import * as actionTypes from "./action";

const initialState = {
  token: null,
  userData: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_USER_DATA:
      return {
        ...state,
        ...action.payload
      };
    case actionTypes.ADD_TOKEN:
      return {
        ...state,
        token: action.payload.token
      };
    case actionTypes.REMOVE_USER_DATA:
      return {
        ...state,
        token: null,
        userData: {}
      };
    default:
      return state;
  }
};

export default reducer;
