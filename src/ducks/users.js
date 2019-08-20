import { handleActions } from 'redux-actions'
import { createRoutine } from 'redux-saga-routines'
import { all, call, put, takeLatest } from 'redux-saga/effects'

import api from '../api'

export const LIST = createRoutine('USERS/LIST')
export const UPDATE = createRoutine('USERS/UPDATE')

export const list = LIST.trigger
export const update = UPDATE.trigger

function * fetchUsersList (action) {
  try {
    yield put(LIST.request())
    const users = yield call(api.getUsers, action.payload)
    yield put(LIST.success(users))
  } catch (e) {
    yield put(LIST.failure({ message: e.message }))
  } finally {
    yield put(LIST.fulfill())
  }
}

function * updateUser (action) {
  try {
    yield put(UPDATE.request())
    const user = yield call(api.updateUser, action.payload.id, action.payload.data)
    yield put(UPDATE.success(user))
  } catch (e) {
    yield put(UPDATE.failure({ message: e.message }))
  } finally {
    yield put(UPDATE.fulfill())
  }
}

export const saga = function * () {
  yield all([
    takeLatest(LIST, fetchUsersList),
    takeLatest(UPDATE, updateUser)
  ])
}

const initialState = {
  data: [],
  error: null,
  loaded: false,
  loading: false,
  updating: false
}

export const reducer = handleActions({
  [LIST.REQUEST]: (state, action) => ({
    ...state,
    loading: true
  }),
  [LIST.SUCCESS]: (state, action) => ({
    ...state,
    data: action.payload,
    loaded: true,
    loading: false
  }),
  [LIST.FAILURE]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false
  }),
  [UPDATE.REQUEST]: (state, action) => ({
    ...state,
    updating: true
  }),
  [UPDATE.SUCCESS]: (state, action) => {
    const index = state.data.findIndex(v => v.id === action.payload.id)
    const item = state.data[index]

    const data = item ? [
      ...state.data.slice(0, index),
      Object.assign({}, item, action.payload),
      ...state.data.slice(index + 1)
    ] : state.data

    return {
      ...state,
      data,
      updating: false
    }
  }
}, initialState)
