
import { takeEvery, put, call } from 'redux-saga/effects'
import { actionTypes, getTotalDonationByUserId } from './actions'
import donations from '../../db/donations'

export default function* rootSaga () {
  yield takeEvery(actionTypes.FETCH_TOTAL_DONATION_BY_USER_ID, fetchTotalDonationByUserIdAsync)
}

const api = {
  getTotalDonationByUserId: ({ userId }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const totalAmount = donations.reduce(function (acc, obj) { return acc + obj.amount }, 0)
        resolve(totalAmount)
      }, 2000)
    })
  }
}

export function* fetchTotalDonationByUserIdAsync(action) {
  try {
    const { userId } = action.payload
    const response = yield call(api.getTotalDonationByUserId, { userId })
    yield put(getTotalDonationByUserId({ totalDonation: response }))
  } catch (error) {
    console.log(error)
  }
}