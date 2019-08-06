
import { combineReducers } from 'redux'
import notificationReducers from '../containers/Notification/reducers'
import petsReducers from '../containers/Pets/reducers'
import authenticationReducers from '../containers/Authentication/reducers'
import errorHandlerReducers from '../containers/ErrorHandler/reducers'
import progressReducers from '../containers/Progress/reducers'

export default combineReducers({
  notification: notificationReducers,
  pets: petsReducers,
  authentication: authenticationReducers,
  error: errorHandlerReducers,
  progress: progressReducers,
});