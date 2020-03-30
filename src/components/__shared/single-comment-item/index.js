import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Avatar from "../avatar/Avatar";
import moment from "moment";

// Reusable List Item for Individual Comments
const SingleCommentItem = ({ item }) => {
  const firstWord = item.name.substr(0, 1).toUpperCase();
  const restOfTitle = item.name.substring(1);

  const date = moment(new Date()).format("DD-MMM-YYYY");

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>{}
        // navigation.navigate("Detail", {
        //   item: {
        //     ...item,
        //     date
        //   }
        // })
      }
    >
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Avatar isAvatar source={item.image} />
          <View style={styles.textContainer}>
            <Text style={styles.textDate}>{`Date : ${date} `}</Text>
            <Text style={styles.text} numberOfLines={1}>
              {item.email}
            </Text>
            <Text numberOfLines={1}>{`${firstWord}${restOfTitle}`}</Text>
            <Text>{item.body}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    padding: 5,
    justifyContent: "space-between",
    alignItems: "center"
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    minHeight: "1%"
  },
  textContainer: {
    paddingHorizontal: 15,
    width: "85%",
    justifyContent: "space-between",
    minHeight: "1%"
  },
  textDate: { alignSelf: "flex-end" },
  text: {
    fontWeight: "700",
    paddingVertical: 5,
    color: "#4B0082"
  }
});

export default SingleCommentItem;
