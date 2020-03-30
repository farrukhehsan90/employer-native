import { combineReducers } from "redux";
import employeeReducer from "./employeeReducer";
import loginReducer from "./loginReducer";

const rootReducer = combineReducers({
  employees: employeeReducer,
  login: loginReducer
});

export default rootReducer;
