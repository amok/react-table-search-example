import { combineReducers } from 'redux'

import * as users from './users'

export const saga = users.saga
export const reducer = combineReducers({ users: users.reducer })

export { users }
