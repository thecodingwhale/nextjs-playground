
export const actionTypes = {
  DISPLAY_ERROR: 'DISPLAY_ERROR',
}

export const displayError = (message) => {
  return {
    type: actionTypes.DISPLAY_ERROR,
    payload: message,
  }
}