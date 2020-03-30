import React from "react";
import { View, Image, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import placeholderImage from "../../../../assets/placholder-image.png";

// Custom Map component
const Map = ({ coordinates, style, onRegionChange }) => {
  //   const { latitude, longitude } = coordinates;

  return (
    <View style={styles.container}>
      <MapView
      provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 25.197525,
          longitude: 55.274288
          // latitudeDelta: 0.0922,
          // longitudeDelta: 0.0421
        }}
      
        zoomControlEnabled
        zoomEnabled
        zoomTapEnabled
        loadingEnabled
        // minZoomLevel={4}
      >
        <Marker
          coordinate={{
            latitude: 25.197525,
            longitude: 55.274288
          }}
        />
      </MapView>
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
  map: { width: "100%", height: "100%" }
});

export default Map;
