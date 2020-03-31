import React, { useLayoutEffect, useState, useEffect } from "react";
import Card from "../__shared/card";
import { View, Text, StyleSheet, Platform, Image, Alert } from "react-native";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { addEmployees } from "../../redux/actions/employeeActions";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import avatarImage from "../../../assets/avatar-image.png";
import TextField from "../__shared/text-field";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Button from "../__shared/button";
import { validateEmployee } from "../../util/validateEmployee";

const AddEmployee = ({ navigation }) => {
  const [image, setImage] = useState("");
  const initialState = {
    name: "",
    email: "",
    address: "",
    location: {},
    phone: ""
  };
  const [fields, setFields] = useState(initialState);
  const [error, setError] = useState({});

  const dispatch = useDispatch();

  const { name, email, address, location, phone } = fields;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Employees")}>
          <Ionicons
            name={Platform.select({
              ios: "ios-arrow-back",
              android: "md-arrow-back"
            })}
            size={30}
            style={{ paddingHorizontal: 10 }}
          />
        </TouchableOpacity>
      )
    });
  }, []);

  useEffect(() => {
    if (Constants.isDevice) {
      getPermissionsForLocation();
    }
  }, []);

  const onChange = (text, label) => {
    setFields({ ...fields, [label]: text });
  };

  const getPermissionsForLocation = () => {
    Permissions.getAsync(Permissions.LOCATION).then(res => {

      if (res.status !== "granted") {
        return Alert.alert("Permisson to access Location was denied");
      }

      onPressLocation();
    });
  };

  const onCreateProfile = () => {
    const errors = {};

    const { errors: receivedErrors, isValid } = validateEmployee(
      fields,
      errors
    );



    if (!isValid) {
      return setError(receivedErrors);
    }

    addEmployees({ ...fields, image }, navigation)(dispatch);
  };

  const onPressLocation = () => {
    Location.getCurrentPositionAsync()
      .then(res => {
        setFields({ ...fields, location: res });
      })
      .catch(err => {
        return Alert.alert(
          "Sorry! Accessing the location currently isn't possible"
        );
      });
  };

  const pickImage = () => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: false
    })
      .then(res => {
        if (res.cancelled) {
          return;
        }

        return setImage(res.uri);
      })
      .catch(err =>
        Alert.alert("Sorry couldn't capture that one! Please try again")
      );
  };

  return (
    <View style={styles.mainContainer}>
      <Card styles={styles}>
        <View
          style={styles.subContianer}
        >
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={pickImage}
          >
            <Image
              source={image ? { uri: image } : avatarImage}
              style={styles.imageProperties}
            />

            <Text style={{ fontSize: 12 }}>Click here to upload image</Text>
          </TouchableOpacity>
        </View>
        <TextField
          error={error}
          value={name}
          onChange={onChange}
          label="name"
        />
        <TextField
          error={error}
          value={email}
          onChange={onChange}
          label="email"
        />
        <TextField
          error={error}
          value={phone}
          onChange={onChange}
          label="phone"
        />
        <TextField
          error={error}
          placeholder="Press icon to retreive current location"
          icon="pin"
          value={address}
          onChange={onChange}
          onPressLocation={getPermissionsForLocation}
          label="address"
        />
        <View
          style={{ width: "100%", alignItems: "center", marginTop: "auto" }}
        >
          <Button onPress={onCreateProfile} title="Create" />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingVertical: 15 },
  card: {
    padding: 15,
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
  mainContainer: { alignItems: "center", marginTop: Constants.statusBarHeight },
  subContianer:{ width: "100%", alignItems: "center", paddingBottom: 15 },
  imageProperties:{ width: 100, height: 100 }
});

export default AddEmployee;
