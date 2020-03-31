import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import { AsyncStorage } from "react-native";
// import AsyncStorage from '@react-native-community/async-storage';

import rootReducer from "../reducers/rootReducer";

const middlewares = [thunk]; // middlewares
const initialState = {}; // Preloaded state if needed

const persistConfig = {
  key: "root",
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  initialState,
  compose(
    applyMiddleware(...middlewares),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  // For basic redux dev-tools integration
  )
);

export const persistor = persistStore(store);
