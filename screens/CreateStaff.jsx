import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  colors,
  defaultImg,
  defaultProduct,
  defaultStyle,
  formStyles,
  inputOptions,
} from "../styles/styles";
import { Avatar, Button, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import {
  useMessageAndErrorOther,
  useMessageAndErrorUser,
} from "../utils/hooks";
import mime from "mime";

import Header from "../components/Header";
import { KeyboardAvoidingView } from "react-native";
import { registerStaff } from "../redux/actions/otherAction";
import DateTimePicker from "@react-native-community/datetimepicker";

const CreateStaff = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [avatar, setAvatar] = useState("");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const disableBtn =
    !fullName ||
    !password ||
    !email ||
    !password ||
    !confirmPassword ||
    !phoneNumber ||
    !identityNumber;

  const dispatch = useDispatch();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDob(currentDate);
  };

  const loading = useMessageAndErrorOther(dispatch, navigation, "users");

  function isVietnamesePhoneNumber(phoneNumber) {
    // Biểu thức chính quy kiểm tra số điện thoại Việt Nam
    const vietnamesePhoneNumberRegex =
      /^(09|03|07|08|05)\d{8}$|^(\+84|84|0)(1\d{9}|3\d{8}|5\d{8}|7\d{8}|8\d{8}|9\d{8})$/;

    return vietnamesePhoneNumberRegex.test(phoneNumber);
  }

  const submitHandler = () => {
    const dobString = dob.toISOString().split("T")[0];
    const myForm = new FormData();

    myForm.append("file", {
      uri: avatar,
      type: mime.getType(avatar),
      name: avatar.split("/").pop(),
    });

    if (isVietnamesePhoneNumber(phoneNumber)) {
      dispatch(
        registerStaff(
          fullName,
          dobString,
          phoneNumber,
          myForm,
          email,
          password,
          confirmPassword,
          identityNumber
        )
      );
    } else {
      Alert.alert(
        //title
        "Error",
        //body
        "Your phone number is not in the correct format",
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
    }
  };

  useEffect(() => {
    if (route.params?.image) {
      setAvatar(route.params.image);
      // dispatch updatePic here
    }
  }, [route.params]);

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
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
          <Text style={formStyles.headingText}>Register Staff</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            maxHeight: 660,
            padding: 20,
            borderRadius: 10,
            backgroundColor: colors.color3,
          }}
        >
          <View style={{ justifyContent: "center", minHeight: 700 }}>
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
                  uri: avatar ? avatar : defaultProduct,
                }}
              />
            </View>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("camera", {
                  addStaff: true,
                })
              }
            >
              <Text style={{ color: colors.color1, textAlign: "center" }}>
                Change Photo
              </Text>
            </TouchableOpacity>
            <Text style={{ color: "white", marginTop: 20 }}>Full Name</Text>
            <TextInput
              {...inputOptions}
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
            ></TextInput>
            <Text style={{ color: "white" }}>Email</Text>
            <TextInput
              {...inputOptions}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            ></TextInput>
            <Text style={{ color: "white" }}>Dob</Text>
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
            <Text style={{ color: "white" }}>Password</Text>
            <TextInput
              {...inputOptions}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            ></TextInput>
            <Text style={{ color: "white" }}>Confirm Password</Text>
            <TextInput
              {...inputOptions}
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            ></TextInput>
            <Text style={{ color: "white" }}>Phone Number</Text>
            <TextInput
              {...inputOptions}
              placeholder="Phone Number"
              keyboardType="number-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            ></TextInput>
            <Text style={{ color: "white" }}>Identity Number</Text>
            <TextInput
              {...inputOptions}
              placeholder="Identity Number"
              value={identityNumber}
              keyboardType="number-pad"
              onChangeText={setIdentityNumber}
            ></TextInput>
            <Button
              textColor={colors.color2}
              style={{
                backgroundColor: colors.color1,
                margin: 20,
                padding: 6,
                marginBottom: 50,
              }}
              onPress={submitHandler}
              loading={loading}
              disabled={disableBtn}
            >
              Add
            </Button>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateStaff;

const styles = StyleSheet.create({});
