import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {addProductReducer,getTotalProducts,detailProductReducer,adminProductsReducer,cartItemsReducer,ordersReducer,loginValidator,loggedSessionReducer} from './reducer'

const rootReducer = combineReducers({
  addProduct:addProductReducer,
  totalProducts:getTotalProducts,
  detailProduct:detailProductReducer,
  adminProducts:adminProductsReducer,
  cartItems:cartItemsReducer,
  orders:ordersReducer,
  login:loginValidator,
  logged:loggedSessionReducer
})

export const reduxState = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))

// reduxState.subscribe(() => {
//     console.log(reduxState);
//   });
