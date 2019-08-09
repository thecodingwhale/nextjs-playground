
export const actionTypes = {
  FETCH_TOTAL_DONATION_BY_USER_ID: 'FETCH_TOTAL_DONATION_BY_USER_ID',
  GET_TOTAL_DONATION_BY_USER_ID: 'GET_TOTAL_DONATION_BY_USER_ID',
}

export const fetchTotalDonationByUserId = ({ userId }) => {
  return {
    type: actionTypes.FETCH_TOTAL_DONATION_BY_USER_ID,
    payload: { userId }
  }
}

export const getTotalDonationByUserId = ({ totalDonation }) => {
  return {
    type: actionTypes.GET_TOTAL_DONATION_BY_USER_ID,
    payload: { totalDonation }
  }
}
