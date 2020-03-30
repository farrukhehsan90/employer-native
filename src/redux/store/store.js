import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";

const middlewares = [thunk]; // middlewares
const initialState = {}; // Preloaded state if needed

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middlewares)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  // For basic redux dev-tools integration
  )
);

export default store;
