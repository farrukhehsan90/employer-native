import React from "react";
import { View, Text } from "react-native";

// Card Component for Employee Details
const Card = ({ styles, children }) => {
  return <View style={styles.card}>{children}</View>;
};

export default Card;
