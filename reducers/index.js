
import { combineReducers } from 'redux'
import notificationReducers from '../containers/Notification/reducers'

export default combineReducers({
  notification: notificationReducers,
});