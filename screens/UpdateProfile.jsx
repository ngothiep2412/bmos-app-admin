import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  colors,
  defaultStyle,
  formStyles,
  inputOptions,
} from "../styles/styles";
import { Avatar, Button, TextInput } from "react-native-paper";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useMessageAndErrorOther } from "../utils/hooks";
import { updateProfile } from "../redux/actions/otherAction";
import DateTimePicker from "@react-native-community/datetimepicker";
import mime from "mime";
import { useIsFocused } from "@react-navigation/native";
const loading = false;

const UpdateProfile = ({ navigation, route }) => {
  const { user } = useSelector((state) => state.user);
  const isFocused = useIsFocused();

  const [fullName, setFullName] = useState(user?.fullName);
  const [dob, setDob] = useState(new Date(user?.dob));
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
  const [avatar, setAvtar] = useState(user?.avatar);

  const disableBtn = !fullName || !dob || !phoneNumber;
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDob(currentDate);
  };
  const dispatch = useDispatch();

  const loading = useMessageAndErrorOther(dispatch, navigation, "profile");

  const submitHandler = () => {
    const dobString = dob.toISOString().split("T")[0];
    const id = user.id;
    const myForm = new FormData();

    myForm.append("file", {
      uri: avatar,
      type: mime.getType(avatar),
      name: avatar.split("/").pop(),
    });

    // console.log(id);
    dispatch(updateProfile(fullName, dobString, phoneNumber, id, myForm));
  };

  useEffect(() => {
    if (route.params?.image) {
      setAvtar(route.params.image);
      // dispatch updatePic Here
    }
  }, [route.params, isFocused]);

  return (
    <View style={defaultStyle}>
      <Header back={true}></Header>
      {/* Heading */}
      <View
        style={{
          marginBottom: 20,
          height: 50,
          backgroundColor: colors.color3,
          width: "100%",
          marginTop: 60,
          justifyContent: "center",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <Text style={formStyles.headingText}>Edit Profile</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          padding: 20,
          borderRadius: 10,
          backgroundColor: colors.color3,
        }}
      >
        <View
          style={{
            width: 80,
            height: 80,
            alignSelf: "center",
            marginBottom: 20,
          }}
        >
          <Avatar.Image
            size={80}
            style={{
              backgroundColor: colors.color1,
            }}
            source={{
              uri: avatar ? avatar : defaultImgFood,
            }}
          />
        </View>

        <Button
          onPress={() =>
            navigation.navigate("camera", {
              updateProfile: true,
            })
          }
          textColor={colors.color1}
        >
          Manage Images
        </Button>
        <Text style={{ color: "white" }}>Name</Text>
        <View>
          <TextInput
            {...inputOptions}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          ></TextInput>
          <Text style={{ color: "white" }}>DOB</Text>
          <View
            style={{
              height: 50,
              backgroundColor: colors.color2,
              marginVertical: 10,
              marginHorizontal: 20,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.color2,
            }}
          >
            <DateTimePicker
              testID="dateTimePicker"
              value={dob}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            ></DateTimePicker>
          </View>
          <Text style={{ color: "white" }}>Phone Number</Text>
          <TextInput
            {...inputOptions}
            placeholder="Phone Number"
            keyboardType="number-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          ></TextInput>

          <Pressable
            style={formStyles.btn}
            disabled={disableBtn}
            onPress={submitHandler}
          >
            {loading ? (
              <ActivityIndicator color="#000000" />
            ) : (
              <Text style={{ color: colors.color2, textAlign: "center" }}>
                Udate
              </Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({});
