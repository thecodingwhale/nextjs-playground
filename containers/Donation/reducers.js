import { actionTypes } from './actions'

const initialState = {
  donating: false,
  donated: false,
  donations: [],
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_DONATING:
      return {
        ...state,
        donating: action.payload,
      }

    case actionTypes.SET_DONATED:
      return {
        ...state,
        donated: action.payload,
      }

    case actionTypes.GET_DONATIONS:
      return {
        ...state,
        donations: action.payload.donations,
      }

    case actionTypes.ADD_DONATION:
      return {
        ...state,
        donated: true,
        donations: [
          ...state.donations,
          action.payload.donation
        ]
      }

    default:
      return state
  }
}

export default reducer