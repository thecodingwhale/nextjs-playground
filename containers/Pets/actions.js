
export const actionTypes = {
  FETCH_PETS: 'FETCH_PETS',
  GET_PETS: 'GET_PETS',
  SET_FETCHING: 'SET_FETCHING_PETS',
}

export const setFetching = (payload) => {
  return {
    type: actionTypes.SET_FETCHING,
    payload,
  }
}

export const fetchPets = ({ page, size }) => {
  return {
    type: actionTypes.FETCH_PETS,
    payload: { page, size },
  }
}

export const getPets = ({ total, data }) => {
  return {
    type: actionTypes.GET_PETS,
    payload: { total, data },
  }
}