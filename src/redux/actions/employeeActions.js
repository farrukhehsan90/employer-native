import {
  GET_EMPLOYEES,
  LOADING,
  ADD_EMPLOYEE,
  ERROR
} from "./types";

import { store } from "../store/store";
import { AsyncStorage } from "react-native";

// get all employees
export const getEmployees = (count, limit, setCount) => dispatch => {
  const { employees } = store.getState().employees;

  dispatch(setLoading(true));

  AsyncStorage.getItem("employees")
    .then(employeesRes => {
      dispatch(setLoading(false));
      const res = res !== null ? JSON.parse(employeesRes) : [];

      const newEmployees = [...res].slice(count, count + limit);

      const updatedEmployees = [...employees, ...newEmployees];
      setCount(count + limit);
      dispatch({ type: GET_EMPLOYEES, payload: updatedEmployees });
      return;
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        payload: err
      });
      dispatch(setLoading(false));
    });
};

// TODO: Could have comments loaded for a single user with regards to his resume or work by others employees/recruiters.

// get single employees' comments
// export const getEmployee = empId => dispatch => {
//   dispatch(setLoading(true));

//     fetch(`${API_URL}/posts/${empId}/comments`, {
//       method: "GET"
//     })
//     .then(res =>res.json()))
//     .then(mixedRes => {

//         dispatch(setLoading(false));

//         return dispatch({
//           type: GET_EMPLOYEE,
//           payload: {
//             comments,
//             employee
//           }

//       });
//     })
//     .catch(err => {
//       dispatch({
//         type: ERROR,
//         payload: err
//       });
//       dispatch(setLoading(false));
//     });
// };

// add employees
export const addEmployees = (employee, navigation) => dispatch => {
  let employees = [];

  AsyncStorage.getItem("employees").then(res => {
    if (!res) {
      employees.push(employee);
    } else {
      employees = [...JSON.parse(res)];

      employees.push(employee);
    }

    AsyncStorage.setItem("employees", JSON.stringify(employees)).then(() => {
      dispatch({
        type: ADD_EMPLOYEE,
        payload: employees
      });

      navigation.navigate("Employees");
      return;
    });
  });
};

export const deleteEmployee = (employee, navigation) => dispatch => {
  const { employees } = store.getState().employees;

  const updatedEmployees = employees.filter(
    singleEmployee => singleEmployee.phone !== employee.phone
  );

  AsyncStorage.setItem("employees", JSON.stringify(updatedEmployees)).then(
    () => {
      dispatch({
        type: GET_EMPLOYEES,
        payload: updatedEmployees
      });

      navigation.navigate("Employees");
    }
  );
};

// set / unset loading for employees reducer
export const setLoading = flag => ({
  type: LOADING,
  payload: flag
});
