
import { actionTypes } from './actions'

const initialState = {
  fetching: false,
  pets: [],
  total: 0,
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_FETCHING:
      return {
        ...state,
        fetching: action.payload,
      }

    case actionTypes.GET_PETS:
      return {
        ...state,
        pets: action.payload.data,
        total: action.payload.total,
      }

    default:
      return state
  }
}

export default reducer