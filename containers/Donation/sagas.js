
import { takeEvery, put, call } from 'redux-saga/effects'
import { actionTypes, setDonating, getDonations, addDonation } from './actions'
import donations from '../../db/donations'

export default function* rootSaga () {
  yield takeEvery(actionTypes.MAKE_DONATION, makeDonationAsync)
  yield takeEvery(actionTypes.FETCH_DONATIONS, fetchDonationsAsync)
}

const api = {
  getDonations: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(donations)
      }, 2000)
    })
  },
  getTotalDonationByUserId: ({ userId }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const totalAmount = donations.reduce(function (acc, obj) { return acc + obj.amount }, 0)
        resolve(totalAmount)
      }, 2000)
    })
  },
  makeDonation: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, 2000)
    })
  }
}

export function* fetchDonationsAsync() {
  try {
    const response = yield call(api.getDonations)
    yield put(getDonations({ donations: response }))
  } catch (error) {

  }
}

export function* makeDonationAsync(action) {
  yield put(setDonating(true))
  try {
    yield call(api.getDonations)
    yield put(addDonation({ donation: action.payload }))
    yield put(setDonating(false))
  } catch (error) {
    yield put(setDonating(false))
  }
}