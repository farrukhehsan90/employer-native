import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  ActivityIndicator,
  AsyncStorage,
  StyleSheet
} from "react-native";
import { LOGIN } from "../../redux/actions/types";

const Auth = ({ navigation }) => {
  const dispatch = useDispatch();

  // Navigate to Employees if user exists else Navigate to Login
  useEffect(() => {
    AsyncStorage.getItem("userCredentials").then(res => {
      if (res) {
        const username = JSON.parse(res).username;

        dispatch({
          type: LOGIN,
          payload: {
            username
          }
        });

        return navigation.navigate("Employees", {
          username
        });
      }

      return navigation.navigate("Login");
    });
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" }
});

export default Auth;
