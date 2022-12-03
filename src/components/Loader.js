import { StyleSheet } from "react-native";
import AnimatedLoader from "react-native-animated-loader";

const Loader = () => {
  return (
    <AnimatedLoader
      visible={true}
      overlayColor="rgba(255,255,255,0.5)"
      source={require("./loading.json")}
      animationStyle={styles.lottie}
      speed={1}
    ></AnimatedLoader>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: 300,
    height: 300,
  },
});

export default Loader;
