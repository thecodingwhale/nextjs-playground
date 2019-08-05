
export const actionTypes = {
  OPEN_SUCCESS_NOTIFICATION: 'OPEN_SUCCESS_NOTIFICATION',
  CLOSE_SUCCESS_NOTIFICATION: 'CLOSE_SUCCESS_NOTIFICATION',
}

export const openSuccessNotification = () => {
  return {
    type: actionTypes.OPEN_SUCCESS_NOTIFICATION,
  }
}
export const closeSuccessNotification = () => {
  return {
    type: actionTypes.CLOSE_SUCCESS_NOTIFICATION,
  }
}