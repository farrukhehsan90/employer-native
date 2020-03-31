import React, { useState, useEffect, useLayoutEffect, Fragment } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  Platform,
  Dimensions
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import placeholderImage from "../../../assets/placholder-image.png";
import {
  getEmployee,
  deleteEmployee
} from "../../redux/actions/employeeActions";
import Avatar from "../__shared/avatar/Avatar";
import {
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import SingleCommmentItem from "../__shared/single-comment-item";
import Card from "../__shared/card";
import Header from "../__shared/card/header";
import ImageContent from "../__shared/card/image-content";
import Content from "../__shared/card/content";
import CommentBox from "../__shared/card/comment-box";
import Stats from "../__shared/card/stats";
import MapContent from "../__shared/card/map-content";
import Button from "../__shared/button";

const EmployeeDetail = ({ navigation, route }) => {
  const { item } = route.params;

  const dispatch = useDispatch();

  const [showComments, setShowComments] = useState(false);

  const { comments, likes, loading } = useSelector(state => state.employees);

  //Get Fresh Employee Details whenever a new employee is clicked in the list
  useEffect(() => {
    const { id } = item;
    // getEmployee(id)(dispatch);
  }, []);

  //For Setting React Navigation Options
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() =>
            setShowComments(
              showComments ? !showComments : navigation.navigate("Employees")
            )
          }
        >
          <View style={styles.backArrowContainer}>
            {showComments ? (
              <Fragment>
                <Ionicons
                  style={{ paddingHorizontal: 5 }}
                  name="ios-arrow-back"
                  size={25}
                />
                <Text>Back</Text>
              </Fragment>
            ) : (
              <Fragment>
                <Ionicons
                  style={{ paddingHorizontal: 5 }}
                  name="ios-arrow-back"
                  size={25}
                />
                <Text>Back to Employees</Text>
              </Fragment>
            )}
          </View>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => deleteEmployee(item, navigation)(dispatch)}
        >
          <View style={{ paddingHorizontal: 10 }}>
            <Ionicons
              name={Platform.select({
                android: "ios-trash",
                ios: "md-trash"
              })}
              size={30}
              style={{ color: "red" }}
            />
          </View>
        </TouchableOpacity>
      )
    });
  });

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Fragment>
          {showComments ? (
            <FlatList
              initialNumToRender={5}
              windowSize={2}
              ListEmptyComponent={() => (
                <View style={styles.emptyComponentContainer}>
                  <Text style={{ opacity: 0.5 }}>No comments yet!</Text>
                </View>
              )}
              maxToRenderPerBatch={5}
              keyExtractor={item => item.id.toString()}
              data={comments}
              renderItem={({ item }) => <SingleCommmentItem item={item} />}
            />
          ) : (
            <Card styles={styles}>
              <Header item={item} styles={styles} />
              <MapContent item={item} styles={styles} />
              <Content item={item} styles={styles} />
              <Stats
                setShowComments={setShowComments}
                comments={comments}
                likes={likes}
                styles={styles}
              />
              <CommentBox item={item} styles={styles} />
            </Card>
          )}
        </Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingVertical: 15 },
  card: {
    backgroundColor: "#fff",
    width: "85%",
    height: "95%",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    zIndex: 3
  },
  headerContainer: {
    alignSelf: "center",
    width: "95%",
    flexDirection: "row",
    paddingVertical: 5
  },
  headerDescription: {
    width: "75%",
    minHeight: "5%",
    justifyContent: "space-between"
  },
  subHeaderAuthor: { opacity: 0.5, paddingVertical: 5 },
  subHeaderDate: { fontWeight: "600" },
  image: { width: "100%", height: "42%" },
  map: { width: "100%", height: "42%" },
  contentContainer: {
    zIndex: -2,
    width: "85%",
    alignSelf: "center",
    paddingVertical: 20,
    height: "35%"
  },
  contentScroller: { flexGrow: 1, zIndex: -2 },
  statsContainer: {
    flexDirection: "row",
    width: "85%",
    alignSelf: "center",
    marginVertical: 0,
    alignItems: "flex-end"
  },
  commentInput: {
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 1,
    width: "80%",
    paddingBottom: 5
  },
  commentAvatar: { width: 25, height: 25 },
  commentContainer: {
    width: "87%",
    height: "5%",
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: 15,
    alignItems: "center"
  },
  commentStat: {
    paddingHorizontal: 5,
    color: "#000",
    opacity: 0.6
  },
  likeStat: { paddingHorizontal: 5, color: "#000", opacity: 0.6 },
  backArrowContainer: {
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center"
  },
  emptyComponentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height / 3
  }
});

export default EmployeeDetail;
