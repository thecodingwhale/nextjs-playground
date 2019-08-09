
export const actionTypes = {
  FETCH_DONATIONS: 'FETCH_DONATIONS',
  GET_DONATIONS: 'GET_DONATIONS',
  MAKE_DONATION: 'MAKE_DONATION',
  SET_DONATING: 'SET_DONATING',
  SET_DONATED: 'SET_DONATED',
  ADD_DONATION: 'ADD_DONATION',
}

export const fetchDonations = () => {
  return {
    type: actionTypes.FETCH_DONATIONS,
  }
}

export const getDonations = ({ donations }) => {
  return {
    type: actionTypes.GET_DONATIONS,
    payload: { donations }
  }
}

export const makeDonation = ({ idUser, idPet, amount }) => {
  return {
    type: actionTypes.MAKE_DONATION,
    payload: { idUser, idPet, amount }
  }
}

export const setDonating = (payload) => {
  return {
    type: actionTypes.SET_DONATING,
    payload,
  }
}

export const setDonated = (payload) => {
  return {
    type: actionTypes.SET_DONATED,
    payload,
  }
}

export const addDonation = ({ donation }) => {
  return {
    type: actionTypes.ADD_DONATION,
    payload: { donation }
  }
}