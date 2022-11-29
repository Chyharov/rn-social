import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Main from "./src/components/Main";

const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("./src/assets/fonts/DMMono-Regular.ttf"),
    "Roboto-Medium": require("./src/assets/fonts/DMMono-Regular.ttf"),
    "Roboto-Bold": require("./src/assets/fonts/DMMono-Regular.ttf"),
    // "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
    // "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
    // "Roboto-Bold": require("./src/assets/fonts/Roboto-Bold.ttf"),
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

  return <Main />;
};

export default App;
