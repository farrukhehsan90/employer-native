import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store/store";
import Constants from "expo-constants";
import Navigator from "./Navigator";

export default function App() {
  useEffect(() => {
    //Disabled since the PRNG warning keeps coming up for Math.random() being used for encryption which isnt that secure.
    console.disableYellowBox = true;
  }, []);

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

