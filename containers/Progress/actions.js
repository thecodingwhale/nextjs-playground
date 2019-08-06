
export const actionTypes = {
  START_PROGRESS: 'START_PROGRESS',
  STOP_PROGRESS: 'STOP_PROGRESS',
}

export const startProgress = () => {
  return {
    type: actionTypes.START_PROGRESS,
  }
}

export const stopProgress = () => {
  return {
    type: actionTypes.STOP_PROGRESS,
  }
}