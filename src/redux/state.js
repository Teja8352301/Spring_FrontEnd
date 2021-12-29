import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {addProductReducer,getTotalProducts} from './reducer'

const rootReducer = combineReducers({
  addProduct:addProductReducer,
  totalProducts:getTotalProducts
})

export const reduxState = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))

// reduxState.subscribe(() => {
//     console.log(reduxState);
//   });