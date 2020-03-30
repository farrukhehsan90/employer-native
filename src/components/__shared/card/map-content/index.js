import React from "react";
import { View, Text, Image } from "react-native";
import placeholderImage from "../../../../../assets/placholder-image.png";
import Map from "../../map/Map";

// Sub Component for Employee Card
const MapContent = ({ styles, item }) => {
  return (
    <View style={[styles.map, !item.map && { tintColor: "#FF8362" }]}>
      <Map />
    </View>
  );
};

export default MapContent;
