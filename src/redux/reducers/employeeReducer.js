import { GET_EMPLOYEE, GET_EMPLOYEES, ADD_EMPLOYEE } from "../actions/types";

const initialState = {
  employees: [],
  employee: {},
  comments: [],
  likes: [],
  loading: false
};

const employeeReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: payload
      };
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: payload
      };
    case GET_EMPLOYEE:
      const { employee, comments } = payload;
      return {
        ...state,
        employee,
        comments
      };
    default:
      return state;
  }
};

export default employeeReducer;
