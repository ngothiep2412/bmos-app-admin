import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { colors, defaultStyle } from "../styles/styles";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import Loader from "../components/Loader";
import { getPostDetails } from "../redux/actions/postAction";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = SLIDER_WIDTH;
export const iconOptions = {
  size: 25,
  style: {
    borderRadius: 5,
    backgroundColor: colors.color5,
    weight: 30,
    height: 30,
  },
};

const PostDetail = ({ route: { params } }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);

  const { post } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPostDetails(params.id));
  }, [dispatch, isFocused]);

  return loading ? (
    <Loader></Loader>
  ) : (
    <View style={{ ...defaultStyle, padding: 0, paddingTop: 0 }}>
      <Header
        back={true}
        color={colors.color3}
        visible={true}
        editMeal={true}
      ></Header>

      <View style={styles.container}>
        <Image
          source={{ uri: post[0]?.image }}
          style={styles.image}
          resizeMode="cover"
        ></Image>
      </View>
      <View
        style={{
          backgroundColor: colors.color2,
          padding: 35,
          paddingHorizontal: 25,
          flex: 1,
          marginTop: -30,
          borderTopLeftRadius: 55,
          borderTopRightRadius: 55,
          borderColor: "#EBEBEB",
          shadowColor: "black",
          shadowRadius: 5,
          shadowOffset: { width: 0, height: 2 },
          borderWidth: 0.2,
          shadowOpacity: 0.5,
        }}
      >
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              numberOfLines={2}
              style={{ fontSize: 25, fontWeight: "900", marginBottom: 10 }}
            >
              {post[0]?.title}
            </Text>
          </View>
          {/* <View
            style={{
              flexDirection: "row",
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              numberOfLines={2}
              style={{ fontSize: 25, fontWeight: "700", marginBottom: 10 }}
            >
              {post[0]?.title}
            </Text>
          </View> */}
          <View>
            <Text
              numberOfLines={8}
              style={{ letterSpacing: 1, lineHeight: 20, marginVertical: 15 }}
            >
              {post[0]?.desc}
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default PostDetail;

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    // paddingVertical: 40,

    flex: 1,
  },
  image: {
    width: ITEM_WIDTH,
    resizeMode: "contain",
    height: "100%",
    marginTop: 20,
  },
  quantity: {
    backgroundColor: colors.color4,
    padding: 6,
    // textAlignVertical: "auto",
    // alignItems: "center",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.color5,
  },

  productContainer: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderColor: "#EBEBEB",
    shadowColor: "black",
    borderRadius: 8,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 0.2,
    shadowOpacity: 0.5,
    backgroundColor: colors.color2,
    marginBottom: 30,
    // overflow: "hidden",
  },
});
