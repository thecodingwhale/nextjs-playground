
import { takeEvery, put, call } from 'redux-saga/effects'
import { actionTypes, getPets, setFetching } from './actions'
import pets from '../../db/pets'

function paginate(array, pageSize, pageNumber) {
  --pageNumber;
  return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
}

const api = {
  pets: ({ page, size }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          total: pets.length,
          data: paginate(pets, size, page),
        })
      }, 500)
    })
  }
}

export default function* rootSaga () {
  yield takeEvery(actionTypes.FETCH_PETS, fetchPetsAsync);
}

export function* fetchPetsAsync(action) {
  yield put(setFetching(true))
  try {
    const { payload: { page, size } } = action;
    const { total, data } = yield call(api.pets, { page, size })
    yield put(getPets({ total, data }))
    yield put(setFetching(false))
  } catch (error) {
    yield put(setFetching(false))
  }
}