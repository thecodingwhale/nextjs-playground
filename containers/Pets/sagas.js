
import dateFns from 'date-fns'
import { takeEvery, put, call } from 'redux-saga/effects'
import { actionTypes, getPets, setFetching } from './actions'
import pets from '../../db/pets'

function paginate(array, pageSize, pageNumber) {
  --pageNumber
  return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize)
}
function compareValues(key, order='ASC') {
  return function(a, b) {
    if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0
    }

    const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key]
    const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key]

    let comparison = 0
    if (varA > varB) {
      comparison = 1
    } else if (varA < varB) {
      comparison = -1
    }
    return (
      (order == 'DESC') ? (comparison * -1) : comparison
    )
  }
}

const api = {
  pets: ({ page, size, location, orderByName, orderByDate }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let orderedPets = pets
        if (typeof orderByName !== 'undefined') {
          orderedPets = pets.sort(compareValues('name', orderByName))
        }
        if (typeof orderByDate !== 'undefined') {
          orderedPets = pets.sort((a, b) => {
            const dateA = new Date(a.date.year, a.date.month, a.date.day)
            const dateB = new Date(b.date.year, b.date.month, b.date.day)
            if (orderByDate === 'DESC') {
              return dateB - dateA;
            }
            return dateA - dateB; // ascending
          })
        }
        const filteredPets = location === null ? orderedPets : orderedPets.filter(pet => pet.location === location)
        resolve({
          total: filteredPets.length,
          data: paginate(filteredPets, size, page),
        })
      }, 500)
    })
  }
}

export default function* rootSaga () {
  yield takeEvery(actionTypes.FETCH_PETS, fetchPetsAsync)
}

export function* fetchPetsAsync(action) {
  yield put(setFetching(true))
  try {
    const { payload: { page, size, location, orderByName, orderByDate } } = action
    const { total, data } = yield call(api.pets, { page, size, location, orderByName, orderByDate })
    yield put(getPets({ total, data }))
    yield put(setFetching(false))
  } catch (error) {
    yield put(setFetching(false))
  }
}