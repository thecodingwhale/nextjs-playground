import { actionTypes } from './actions'

const initialState = {
  error: null,
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.DISPLAY_ERROR:
      return {
        ...state,
        ...{ error: action.payload }
      }

    default:
      return state
  }
}

export default reducer
