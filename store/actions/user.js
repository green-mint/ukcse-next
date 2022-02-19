export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = ({ id, name, email, token, refreshToken, isAdmin }) => {
  // console.log("Login was caled and the id was " + id);
  return {
    type: LOGIN,
    payload: {
      id,
      name,
      email,
      token,
      refreshToken,
      isAdmin,
    },
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
}