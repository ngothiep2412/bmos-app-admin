import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../styles/styles";
import { Button } from "react-native-paper";
import { Image } from "react-native";

const UserItem = ({
  id,
  fullName,
  dob,
  phoneNumber,
  email,
  updateDeleteHandler,
  updateChangeHandler,
  processOrderLoading,
  status,
  avatar,
  i = 0,
  type,
}) => {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: i % 2 === 0 ? colors.color2 : colors.color3,
        overflow: "hidden",
      }}
    >
      <Text
        numberOfLines={2}
        style={{
          ...styles.text,
          backgroundColor: i % 2 === 0 ? colors.color3 : colors.color1,
        }}
      >
        ID - #{id}
      </Text>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Image
          style={{ width: 80, height: 80, borderRadius: 100 }}
          source={{ uri: avatar }}
        ></Image>
      </View>
      <View style={{ flexDirection: "column" }}>
        <TextBox title={"Name"} value={fullName} i={i}></TextBox>
        <TextBox title={"Email"} value={email} i={i}></TextBox>
      </View>
      <TextBox title={"Dob"} value={dob} i={i}></TextBox>
      <TextBox title={"Phone Number"} value={phoneNumber} i={i}></TextBox>

      <TextBox title={"Status"} value={status} i={i}></TextBox>

      {type.customer !== undefined ? (
        <TextBox title={"Point"} value={type.customer.point} i={i}></TextBox>
      ) : (
        <>
          <TextBox
            title={"Identity Number"}
            value={type.staff.identityNumber}
            i={i}
          ></TextBox>
          <TextBox
            title={"Register Date"}
            value={type.staff.registerDate.split("T")[0]}
            i={i}
          ></TextBox>
          <TextBox
            title={"Quit Date"}
            value={type.staff.quitDate?.split("T")[0]}
            i={i}
          ></TextBox>
        </>
      )}
      <Button
        icon={"update"}
        mode={"contained"}
        textColor={i % 2 === 0 ? colors.color2 : colors.color3}
        style={{
          // width: 120,
          // alignSelf: "center",
          marginTop: 20,
          backgroundColor: i % 2 === 0 ? colors.color3 : colors.color2,
        }}
        onPress={() => updateChangeHandler(id, status)}
        loading={processOrderLoading}
      >
        Change Status
      </Button>
      {status !== "inactive" && (
        <Button
          icon={"delete"}
          mode={"contained"}
          textColor={i % 2 === 0 ? colors.color2 : colors.color3}
          style={{
            // width: 120,
            // alignSelf: "center",
            marginTop: 20,
            backgroundColor: i % 2 === 0 ? colors.color3 : colors.color2,
          }}
          onPress={() => updateDeleteHandler(id)}
          loading={processOrderLoading}
        >
          Delete
        </Button>
      )}
    </View>
  );
};

const TextBox = ({ title, value, i }) => (
  <Text
    style={{
      marginVertical: 6,
      color: i % 2 === 0 ? colors.color3 : colors.color2,
    }}
  >
    <Text style={{ fontWeight: "900" }}>{title} - </Text>
    {value}
    {title === "Price" ? "$" : ""}
  </Text>
);

export default UserItem;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 5,
  },
  text: {
    color: colors.color2,
    fontSize: 16,
    fontWeight: "900",
    marginHorizontal: -20,
    marginTop: -20,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
