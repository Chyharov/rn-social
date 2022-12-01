import React, { useState } from "react";
import {} from "react-native";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import LoginScreen from "./src/screens/auth/LoginScreen";
import RegistrationScreen from "./src/screens/auth/RegistrationScreen";

import Home from "./src/screens/mainScreen/Home";
import CommentsScreen from "./src/screens/mainScreen/CommentsScreen";
import ProfileScreen from "./src/screens/mainScreen/ProfileScreen";
import MapScreen from "./src/screens/mainScreen/MapScreen";
import PostsScreen from "./src/screens/mainScreen/PostsScreen";
import CreatePostsScreen from "./src/screens/mainScreen/CreatePostsScreen";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./src/assets/fonts/Roboto-Bold.ttf"),
  });
};

const App = () => {
  const [isReady, setIsReady] = useState(false);

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
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// <>
{
  /* <Home /> */
}
{
  /* <CommentsScreen /> */
}
{
  /* <ProfileScreen /> */
}
{
  /* <MapScreen /> */
}
{
  /* <PostsScreen /> */
}
{
  /* <CreatePostsScreen /> */
}
{
  /* </> */
}
