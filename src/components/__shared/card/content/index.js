import React from "react";
import { View, Text, ScrollView } from "react-native";

// Sub Component for Employee Card
const Content = ({ styles, item }) => {
  return (
    <View style={styles.contentContainer}>
      <ScrollView contentContainerStyle={styles.contentScroller}>
        <Text>{item.body}</Text>
        <Text>{item.body}</Text>
        <Text>{item.body}</Text>
      </ScrollView>
    </View>
  );
};

export default Content;
