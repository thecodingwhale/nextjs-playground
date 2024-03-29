
export const actionTypes = {
  ON_LOGIN: 'ON_LOGIN',
  USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
  LOGOUT_USER: 'LOGOUT_USER',
}

export const onLogin = ({ username, password }) => {
  return {
    type: actionTypes.ON_LOGIN,
    payload: { username, password }
  }
}

export const userLoginSuccess = ({ id, email, firstName, lastName }) => {
  return {
    type: actionTypes.USER_LOGIN_SUCCESS,
    payload: { id, email, firstName, lastName }
  }
}

export const logoutUser = () => {
  return {
    type: actionTypes.LOGOUT_USER,
  }
}