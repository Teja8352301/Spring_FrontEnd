import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {addProductReducer,getTotalProducts,detailProductReducer,adminProductsReducer,cartItemsReducer,ordersReducer} from './reducer'

const rootReducer = combineReducers({
  addProduct:addProductReducer,
  totalProducts:getTotalProducts,
  detailProduct:detailProductReducer,
  adminProducts:adminProductsReducer,
  cartItems:cartItemsReducer,
  orders:ordersReducer
})

export const reduxState = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))

// reduxState.subscribe(() => {
//     console.log(reduxState);
//   });