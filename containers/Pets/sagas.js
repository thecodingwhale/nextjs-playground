import faker from 'faker'
import { takeEvery, put, call } from 'redux-saga/effects'
import { actionTypes, getPets, setFetching } from './actions'

function paginate(array, page_size, page_number) {
  return array.slice(page_number * page_size, (page_number + 1) * page_size);
}

const pets = [];
for (let i = 0; i < 35; i++) {
  pets.push({
    id: faker.random.number(),
    name: faker.name.firstName(),
    image: faker.image.cats(),
    type: 'CAT',
    date: {
      year: 2019,
      month: 8,
      day: 1,
    },
    location: faker.address.city(),
    owner: {
      name: faker.name.findName(),
      phoneNumber: faker.phone.phoneNumber(),
    }
  });
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