import React from 'react'
import { Provider } from 'react-redux'

import store from './store'
import SearchUsers from './screens/SearchUsers'

const App = () => {
  return (
    <Provider store={store}>
      <SearchUsers />
    </Provider>
  )
}

export default App
