import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.4220936,
          longitude: -122.083922,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker
          coordinate={{ latitude: 37.4220936, longitude: -122.083922 }}
          title="travel photo"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
