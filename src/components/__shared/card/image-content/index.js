import React from "react";
import { View, Text,Image } from "react-native";
import placeholderImage from "../../../../../assets/placholder-image.png";

// Sub Component for Employee Card
const ImageContent = ({ styles, item }) => {
  return (
    <Image
      source={item.image ? { uri: item.image } : placeholderImage}
      style={[styles.image, !item.image && { tintColor: "#FF8362" }]}
    />
  );
};

export default ImageContent;
