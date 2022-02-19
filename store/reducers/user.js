import { LOGIN, LOGOUT } from "../actions/user";

const initalState = {
  id: null,
  name: null,
  email: null,
  token: null,
  refreshToken: null,
  isAdmin: false,
};

const userReducer = (state = initalState, action) => {
  switch (action.type) {
    case LOGIN:
      console.log(action.payload)
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        isAdmin: action.payload.isAdmin,
      };
    case LOGOUT:
      return initalState;
    default:
      return state;
  }
};

export default userReducer;
