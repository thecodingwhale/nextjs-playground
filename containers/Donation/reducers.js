import { actionTypes } from './actions'

const initialState = {
  totalDonation: 0,
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_TOTAL_DONATION_BY_USER_ID:
      return {
        ...state,
        totalDonation: action.payload.totalDonation,
      }

    default:
      return state
  }
}

export default reducer