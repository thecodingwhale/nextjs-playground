
import { takeEvery, put, call } from 'redux-saga/effects'
import { actionTypes, userLoginSuccess } from './actions'
import { displayError } from '../ErrorHandler/actions'
import { startProgress, stopProgress } from '../Progress/actions'
import { baseUser } from '../../db/contants'

const api = {
  auth: ({ username, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === baseUser.email && password === baseUser.password) {
          resolve({
            id: baseUser.id,
            firstName: baseUser.firstName,
            lastName: baseUser.lastName,
          })
        }
        reject({ message: "User not found." })
      }, 2000)
    })
  }
}

export default function* rootSaga () {
  yield takeEvery(actionTypes.ON_LOGIN, onLoginAsync);
}

export function* onLoginAsync(action) {
  yield put(startProgress())
  try {
    const response = yield call(api.auth, action.payload)
    yield put(stopProgress())
    yield put(userLoginSuccess(response))
  } catch (error) {
    yield put(stopProgress())
    yield put(displayError(error.message))
  }
}