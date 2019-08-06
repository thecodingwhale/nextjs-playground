import { actionTypes } from './actions'

const initialState = {
  authenticated: false,
  user: null,
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        user: {
          ...state.user,
          ...{...action.payload},
        }
      }

    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        authenticated: false,
        user: null,
      }

    default:
      return state
  }
}

export default reducer