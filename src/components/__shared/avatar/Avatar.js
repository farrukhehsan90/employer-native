import React from "react";
import { View, Image, StyleSheet } from "react-native";
import placeholderImage from "../../../../assets/placholder-image.png";
import avatarImage from "../../../../assets/avatar-image.png";


// Custom Avatar/Image component 
const Avatar = ({ source, style, isAvatar }) => {
  return (
    <View style={styles.container}>
      {isAvatar ? (
        <Image
          source={source ? source : avatarImage}
          style={[
            styles.avatarImage,
            !source && { tintColor: "#4B0082" },
            style
          ]}
        />
      ) : (
        <Image
          source={source ? source : placeholderImage}
          style={[styles.image, !source && { tintColor: "#FF8362" }, style]}
        />
      )}
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
  image: { width: 75, height: 75, borderRadius: 150 }
});

export default Avatar;
