import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from 'store/reducers'

export default createStore(rootReducer, applyMiddleware(thunkMiddleware))
