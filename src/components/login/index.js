import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import logo from "../../../assets/logo.png";
import { Ionicons } from "@expo/vector-icons";
import { login, signup } from "../../redux/actions/loginActions";
import { ERROR } from "../../redux/actions/types";
import Button from "../__shared/button";
import ErrorText from "../__shared/error-text";

const Login = ({ navigation }) => {
  const [position, setPosition] = useState(new Animated.Value(500));
  const [isPasswordVisible, setIsPassWordVisible] = useState(false);
  const [fields, setFields] = useState({
    username: "",
    fullName: "",
    password: ""
  });

  const { errors: errorsFromRedux, loading } = useSelector(
    state => state.login
  );

  const { username, password, fullName } = fields;

  const dispatch = useDispatch();
  const initialErrors = {};
  const [textErrors, setError] = useState(initialErrors);
  const [isSignUp, setIsSignUp] = useState(false);

  //Start the animation for the text input block immediately
  useEffect(() => {
    Animated.timing(position, {
      toValue: 150,
      duration: 700
    }).start();
  }, []);

  // Clear errors for a fresh start
  const onClearErrors = () =>
    dispatch({
      type: ERROR,
      payload: {}
    });

  // Login
  const onLogin = () => {
    let errors = {};

    const { username, password } = fields;

    onClearErrors();
    setError(initialErrors);

    if (!username) {
      errors.username = "Please enter your username";

      return setError(errors);
    }

    if (!password) {
      errors.password = "Please enter your password";

      return setError(errors);
    }

    if (password.length < 8) {
      errors.password = "Password cannot be less than 8 characters";

      return setError(errors);
    }

    if (isSignUp) {
      return signup(username, password, navigation)(dispatch);
    }

    return login(username, password, navigation)(dispatch);
  };

  // Login/Signup toggle helper
  const onSwitch = () => {
    onClearErrors();

    return setIsSignUp(!isSignUp);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={0}
        style={styles.keyboardContainer}
        behavior="padding"
      >
        <View style={styles.subContainer}>
          <Image source={logo} style={styles.logo} />
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <Animated.View
              style={[
                styles.textInputContainer,
                { transform: [{ translateY: position }] }
              ]}
            >
              <ErrorText
                textErrors={errorsFromRedux}
                errorKey="error"
                styles={styles}
                style={styles.rootError}
              />
              <TextInput
                value={username}
                onChangeText={e => setFields({ ...fields, username: e })}
                keyboardType="email-address"
                placeholder="Your username"
                style={styles.textInput}
              />
              <ErrorText
                styles={styles}
                errorKey="username"
                textErrors={textErrors}
              />
              {isSignUp && (
                <TextInput
                  value={fullName}
                  onChangeText={e => setFields({ ...fields, fullName: e })}
                  keyboardType="email-address"
                  placeholder="Your Full Name (optional)"
                  style={styles.textInput}
                />
              )}
              <View style={styles.passwordInputContainer}>
                <TextInput
                  value={password}
                  onChangeText={e => setFields({ ...fields, password: e })}
                  secureTextEntry={!isPasswordVisible}
                  placeholder="Your password"
                  style={styles.passwordInput}
                />

                <TouchableOpacity
                  onPress={() => setIsPassWordVisible(!isPasswordVisible)}
                >
                  <Ionicons
                    name={
                      isPasswordVisible
                        ? Platform.select({
                            ios: "ios-eye-off",
                            android: "md-eye-off"
                          })
                        : Platform.select({ ios: "ios-eye", android: "md-eye" })
                    }
                    style={styles.maskIcon}
                    size={30}
                  />
                </TouchableOpacity>
              </View>

              <ErrorText
                styles={styles}
                textErrors={textErrors}
                errorKey="password"
              />

              <TouchableOpacity style={{ width: "100%" }} onPress={onSwitch}>
                <Text style={styles.toggleTextContainer}>
                  {`${isSignUp ? "Already" : "Don't"} have an account?`}{" "}
                  <Text style={styles.toggleText}>
                    {isSignUp ? "Login" : "Sign Up"}
                  </Text>
                </Text>
              </TouchableOpacity>
              <Button
                title={isSignUp ? "Sign Up" : "Log in"}
                onPress={onLogin}
              />
            </Animated.View>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    backgroundColor: "#FF8362",
    flexGrow: 1,
    justifyContent: "flex-end"
  },
  container: { flex: 1 },
  subContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: Dimensions.get("window").height,
    maxWidth: Dimensions.get("window").width
  },
  logo: {
    width: 150,
    height: 150,
    position: "absolute",
    top: "15%"
  },
  textInputContainer: {
    width: "60%",
    alignItems: "center"
  },
  rootError: {
    paddingVertical: 5,
    color: "red",
    width: "100%",
    textAlign: "center"
  },
  textInput: {
    backgroundColor: "#fff",
    minHeight: 50,
    width: "100%",
    borderRadius: 5,
    marginBottom: 5,
    paddingHorizontal: 5
  },
  passwordInputContainer: {
    backgroundColor: "#fff",
    minHeight: 50,
    borderRadius: 5,
    marginBottom: 5,
    paddingHorizontal: 5,
    flexDirection: "row",
    alignItems: "center"
  },
  passwordInput: { width: "90%" },
  maskIcon: { color: "#4B0082" },
  error: {
    paddingVertical: 5,
    color: "red",
    fontWeight: "600",
    width: "100%"
  },
  toggleTextContainer: {
    width: "100%",
    color: "#fff",
    fontWeight: "700",
    marginVertical: 15
  },
  toggleText: { color: "#4B0082" }
});

export default Login;
