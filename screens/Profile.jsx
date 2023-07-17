import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

import { Avatar, Button } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";

import { useIsFocused } from "@react-navigation/native";
import mime from "mime";
import { colors, defaultImg, defaultStyle, formStyles } from "../styles/styles";
import {
  useMessageAndErrorOther,
  useMessageAndErrorUser,
} from "../utils/hooks";
import { loadUser, logout } from "../redux/actions/userAction";
import Loader from "../components/Loader";
import ButtonBox from "../components/ButtonBox";
// import { updatePic } from "../redux/actions/otherAction";

const Profile = ({ navigation, route }) => {
  const { user } = useSelector((state) => state.user);

  const [avatar, setAvatar] = useState(
    user?.avatar ? user.avatar.url : defaultImg
  );

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const loading = useMessageAndErrorUser(navigation, dispatch, "login");

  const logoutHandler = () => {
    dispatch(logout());
  };

  const navigateHandler = (text) => {
    switch (text) {
      case "Profile":
        navigation.navigate("updateprofile");
        break;
      case "Password":
        navigation.navigate("changepassword");
        break;
      case "Sign Out":
        logoutHandler();
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    if (user?.avatar) {
      setAvatar(user.avatar);
    }
  }, [user]);

  return (
    <>
      <View style={defaultStyle}>
        {/* Heading */}
        <View style={formStyles.heading}>
          <Text style={formStyles.headingText}>Profile</Text>
        </View>
        {/* Loading */}

        {loading ? (
          <Loader></Loader>
        ) : (
          <>
            <View style={styles.container}>
              <Avatar.Image
                source={{
                  uri: avatar,
                }}
                size={100}
                style={{ backgroundColor: colors.color1 }}
              ></Avatar.Image>

              <Text style={styles.name}>{user?.fullName}</Text>
              <Text style={{ fontWeight: "300", color: colors.color2 }}>
                {user?.email}
              </Text>
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  margin: 10,
                  justifyContent: "space-between",
                }}
              >
                <ButtonBox
                  handler={navigateHandler}
                  text={"Profile"}
                  icon={"pencil"}
                ></ButtonBox>
                <ButtonBox
                  handler={navigateHandler}
                  icon={"pencil"}
                  text={"Password"}
                ></ButtonBox>
                <ButtonBox
                  handler={navigateHandler}
                  text={"Sign Out"}
                  icon={"exit-to-app"}
                ></ButtonBox>
              </View>
            </View>
          </>
        )}
      </View>
      {/* <Footer activeRoute="adminusers"></Footer> */}
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    elevation: 7,
    backgroundColor: colors.color3,
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "500",
    marginTop: 10,
    color: colors.color2,
  },
});
