import React, { useState } from "react";
import {} from "react-native";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { useRoute } from "./router";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const AuthStack = createStackNavigator();

import LoginScreen from "./src/Screens/Auth/LoginScreen";
import RegistrationScreen from "./src/Screens/Auth/RegistrationScreen";
import Home from "./src/components/Home";

const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./src/assets/fonts/Roboto-Bold.ttf"),
  });
};

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const routing = useRoute(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
};

export default App;
