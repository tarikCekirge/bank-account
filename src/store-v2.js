import { combineReducers, legacy_createStore as createStore } from "redux";
import accountReducer from "./features/accounts/AccountSlice";
import customerReducer from "./features/customers/customerSlice";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "./features/localStorageHelpers";

const persistedState = loadFromLocalStorage();

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
  saveToLocalStorage({
    customer: store.getState().customer,
    account: store.getState().account,
  });
});

export default store;
