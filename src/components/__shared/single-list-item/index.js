import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Avatar from "../avatar/Avatar";
import moment from "moment";

// Reusable List Item for Employees
const SingleListItem = ({ item, index }) => {
  const firstWord = item.name.substr(0, 1).toUpperCase();
  const restOfTitle = item.name.substring(1);
  const id = index + 1;
  const date = moment(new Date()).format("DD-MMM-YYYY");
  const comments = Math.round(Math.random() * 10);

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Detail", {
          item: {
            ...item,
            date,
            id
          }
        })
      }
    >
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Avatar source={item.image} />
          <View style={styles.textContainer}>
            <Text style={styles.textDate}>{`Date Created : ${date} `}</Text>
            <Text
              style={styles.nameText}
              numberOfLines={1}
            >{`Employee #${id}`}</Text>
            <Text numberOfLines={1}>{`${firstWord}${restOfTitle}`}</Text>
            <View style={styles.subTextContainer}>
              <View style={styles.subText}>
                <Text>{`Rank #${id}`}</Text>
              </View>
              <View style={styles.subText}>
                <Text>{`${Math.round(Math.random() * 100)} points`}</Text>
              </View>
              <View style={styles.subText}>
                <Text>{`${comments} ${
                  comments === 1 ? "comment" : "comments"
                }`}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.actionIconContainer}>
          <Ionicons
            name="ios-arrow-dropright"
            size={25}
            style={styles.callToAction}
          />
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
  nameText: {
    fontWeight: "700",
    paddingVertical: 5,
    color: "#4B0082"
  },
  subTextContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  subText: { width: "33%", paddingVertical: 5 },
  callToActionContainer: { padding: 5 },
  callToAction: { color: "#000", paddingLeft: 10 }
});

export default SingleListItem;
