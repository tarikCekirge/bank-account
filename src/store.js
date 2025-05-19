import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import accountReducer from "./features/accounts/AccountSlice";
import customerReducer from "./features/customers/customerSlice";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
