
import { takeEvery, put, call } from 'redux-saga/effects'
import { actionTypes, userLoginSuccess } from './actions'
import { displayError } from '../ErrorHandler/actions'
import { startProgress, stopProgress } from '../Progress/actions'

const api = {
  auth: ({ username, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "you@email.com" && password === "password") {
          resolve({
            id: 'ksaedkAkd92345mSWDlmEF906',
            email: username,
            firstName: 'alejandro',
            lastName: 'gutierrez',
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