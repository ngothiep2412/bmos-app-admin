import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "../styles/styles";

const Loader = () => {
  return (
    <ActivityIndicator
      style={{ top: "50%", position: "absolute", alignSelf: "center" }}
      size={100}
      color={colors.color3}
    ></ActivityIndicator>
  );
};

export default Loader;

const styles = StyleSheet.create({});
