import { GET_EMPLOYEE, GET_EMPLOYEES, LOADING } from "./types";
import { API_URL } from "../../config/API";
import store from "../store/store";

// get all employees
export const getEmployees = (count, limit, setCount) => dispatch => {
  const { employees } = store.getState().employees;

  dispatch(setLoading(true));

  fetch(`${API_URL}/posts`, {
    method: "GET"
  })
    .then(res => res.json())
    .then(res => {
      dispatch(setLoading(false));

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

// get single employee along with comments for it
export const getEmployee = empId => dispatch => {
  dispatch(setLoading(true));
  Promise.all([
    fetch(`${API_URL}/posts/${empId}`, {
      method: "GET"
    }),
    fetch(`${API_URL}/posts/${empId}/comments`, {
      method: "GET"
    })
  ])
    .then(response => response.map(res => res.json()))
    .then(mixedRes => {
      Promise.all(mixedRes).then(([employee, comments]) => {
        dispatch(setLoading(false));

        return dispatch({
          type: GET_EMPLOYEE,
          payload: {
            comments,
            employee
          }
        });
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        payload: err
      });
      dispatch(setLoading(false));
    });
};

// set / unset loading for employees reducer
export const setLoading = flag => ({
  type: LOADING,
  payload: flag
});
