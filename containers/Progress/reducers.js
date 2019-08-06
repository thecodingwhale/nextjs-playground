import { actionTypes } from './actions'

const initialState = {
  inProgress: false,
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.START_PROGRESS:
      return {
        ...state,
        ...{inProgress: true}
      }

    case actionTypes.STOP_PROGRESS:
      return {
        ...state,
        ...{inProgress: false}
      }

    default:
      return state
  }
}

export default reducer