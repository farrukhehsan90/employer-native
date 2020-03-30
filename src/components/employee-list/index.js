import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  FlatList,
  Dimensions,
  View,
  ActivityIndicator,
  Platform,
  StyleSheet
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../../redux/actions/employeeActions";
import SingleListItem from "../__shared/single-list-item";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { logout } from "../../redux/actions/loginActions";

const EmployeeList = ({ navigation }) => {
  const [limit, setLimit] = useState(9);
  const [count, setCount] = useState(0);

  const { employees: employeeState, login } = useSelector(state => state);

  const { username } = login;
  const { employees, loading } = employeeState;

  const dispatch = useDispatch();

  // For Setting React Navigation Options
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {},
      headerTitle: `Your Employees, ${username}!`,
      headerRight: () => (
        <TouchableOpacity onPress={() => logout(navigation)(dispatch)}>
          <View style={{ paddingHorizontal: 15 }}>
            <Ionicons
              name={Platform.select({
                ios: "ios-log-out",
                android: "md-log-out"
              })}
              size={30}
            />
          </View>
        </TouchableOpacity>
      )
    });
  });

  //Get All Employees
  useEffect(() => {
    getEmployees(count, limit, setCount)(dispatch);
  }, []);

  //Called upon reaching end threshold position in the list
  const onEndReached = () => {
    getEmployees(count, limit, setCount)(dispatch);
  };

  return (
    <View style={styles.container}>
      <FlatList
        initialNumToRender={limit}
        windowSize={2}
        maxToRenderPerBatch={limit}
        showsVerticalScrollIndicator={false}
        data={employees}
        keyExtractor={item => item.id.toString()}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.35}
        renderItem={({ item }) => <SingleListItem item={item} />}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
      {loading && <ActivityIndicator size="small" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20
  },
  itemSeparator: {
    width: Dimensions.get("window").width * 0.85,
    backgroundColor: "#d3d3d3",
    height: 2,
    alignSelf: "center",
    opacity: 0.5
  }
});

export default EmployeeList;
