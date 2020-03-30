import React from "react";
import { View, Image, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import placeholderImage from "../../../../assets/placholder-image.png";

// Custom Map component
const Map = ({ coordinates, style, onRegionChange }) => {
  //   const { latitude, longitude } = coordinates;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center" },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginHorizontal: 5
  },
  image: { width: 75, height: 75, borderRadius: 150 },
  map: { width: '100%', height: '100%'}
});

export default Map;
