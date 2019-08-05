
import { combineReducers } from 'redux'
import notificationReducers from '../containers/Notification/reducers'
import petsReducers from '../containers/Pets/reducers'

export default combineReducers({
  notification: notificationReducers,
  pets: petsReducers,
});