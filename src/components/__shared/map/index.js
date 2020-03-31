import React from "react";
import { View, Image, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import placeholderImage from "../../../../assets/placholder-image.png";

// Custom Map component
const Map = ({ style, onRegionChange, item }) => {
  const { latitude, longitude } = item.location;

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={
          Object.keys(item.location).length <= 0
            ? {
                latitude: 25.197525,
                longitude: 55.274288
              }
            : {
                latitude,
                longitude
              }
        }
        zoomControlEnabled
        zoomEnabled
        zoomTapEnabled
        loadingEnabled
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
