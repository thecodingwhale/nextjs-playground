import { actionTypes } from './actions'

const initialState = {
  open: false,
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.OPEN_SUCCESS_NOTIFICATION:
      return {
        ...state,
        ...{ open: true }
      }

    case actionTypes.CLOSE_SUCCESS_NOTIFICATION:
      return {
        ...state,
        ...{ open: false }
      }

    default:
      return state
  }
}

export default reducer
