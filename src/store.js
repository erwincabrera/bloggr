import { applyMiddleware, combineReducers, createStore } from 'redux'
import { blogs } from './reducers/blogs'
import { notification } from './reducers/notification'
import { users } from './reducers/users'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  blogs,
  notification,
  users,
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
