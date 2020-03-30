import { LOGIN, LOGOUT, ERROR, LOGIN_LOADING } from "./types";
import { AsyncStorage } from "react-native";
import bcrypt from "react-native-bcrypt";
import isaac from "isaac";

// log in user
export const login = (receivedUsername, password, navigation) => dispatch => {
  dispatch(setLoading(true));
  AsyncStorage.getItem("userCredentials")
    .then(res => {
      let errors = {};

      if (!res) {
        errors.error = "Incorrect username / password. Please try again";
        dispatch(setLoading(false));
        return dispatch({
          type: ERROR,
          payload: errors
        });
      }

      const { username, password: hashedPassword } = JSON.parse(res);

      if (receivedUsername.toString().trim() !== username.toString().trim()) {
        errors.error = "Incorrect username / password. Please try again";
        dispatch(setLoading(false));
        return dispatch({
          type: ERROR,
          payload: errors
        });
      }

      bcrypt.compare(password, hashedPassword, (err, isAMatch) => {
        if (!isAMatch) {
          errors.error = "Incorrect username / password. Please try again";
          dispatch(setLoading(false));
          return dispatch({
            type: ERROR,
            payload: errors
          });
        }

        dispatch({
          type: LOGIN,
          payload: {
            username
          }
        });

        setTimeout(() => {
          dispatch(setLoading(false));
          navigation.navigate("Employees");
        }, 3000);
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

// sign user up
export const signup = (username, password, navigation) => dispatch => {
  dispatch(setLoading(true));
  AsyncStorage.getItem("userCredentials").then(res => {
    let errors = {};
    if (res) {
      const storedUserName = JSON.parse(res).username;
      if (storedUserName.toString().trim() === username.toString().trim()) {
        errors.error = "There is already an account with this username";
        dispatch(setLoading(false));
        return dispatch({
          type: ERROR,
          payload: errors
        });
      }
    }

    bcrypt.setRandomFallback(len => {
      const buf = new Uint8Array(len);

      return buf.map(() => Math.floor(isaac.random() * 256));
    });

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        errors.error = "Oops! Something went wrong. Please try later";
        dispatch(setLoading(false));
        return dispatch({
          type: ERROR,
          payload: errors
        });
      }

      AsyncStorage.setItem(
        "userCredentials",
        JSON.stringify({
          username,
          password: hash
        })
      )
        .then(res => {
          dispatch({
            type: LOGIN,
            payload: {
              username
            }
          });

          setTimeout(() => {
            dispatch(setLoading(false));
            return navigation.navigate("Employees");
          }, 3000);
        })
        .catch(err => {
          dispatch({
            type: ERROR,
            payload: err
          });
          dispatch(setLoading(false));
        });
    });
  });
};

// log user out
export const logout = navigation => dispatch => {
  dispatch(setLoading(true));
  AsyncStorage.clear()
    .then(() => {
      dispatch({
        type: LOGOUT
      });
      dispatch(setLoading(false));
      navigation.push("Login");

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

// set / unset loading for login reducer
export const setLoading = flag => ({
  type: LOGIN_LOADING,
  payload: flag
});
