import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";

export default function CreatePostsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Camera style={styles.camera}>
        <TouchableOpacity style={styles.snapContainer} onPress={() => {}}>
          <Text style={styles.snap}>SNAP</Text>
        </TouchableOpacity>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    height: 300,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  snap: {
    color: "#fff",
  },
  snapContainer: {
    marginTop: 200,
    borderWidth: 1,
    borderColor: "#ff0000",
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
