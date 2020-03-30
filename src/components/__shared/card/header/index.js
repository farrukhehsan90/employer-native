import React from "react";
import { View, Text } from "react-native";
import Avatar from "../../avatar/Avatar";


// Sub Component for Employee Card
const Header = ({styles,item}) => {
  return (
    <View style={styles.headerContainer}>
      <Avatar source={item.avatar} isAvatar />

      <View style={styles.headerDescription}>
        <Text>{item.title}</Text>
        <Text style={styles.subHeaderAuthor}>
          by <Text style={styles.subHeaderDate}>{`#${item.userId}`}</Text> on{" "}
          <Text style={styles.subHeaderDate}>{`${item.date}`}</Text>
        </Text>
      </View>
    </View>
  );
};

export default Header;
