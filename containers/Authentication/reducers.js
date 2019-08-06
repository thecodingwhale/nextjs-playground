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
        ...{authenticated: true}
      }

    default:
      return state
  }
}

export default reducer