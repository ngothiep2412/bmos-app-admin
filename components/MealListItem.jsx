import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { colors, defaultImgFood } from "../styles/styles";

const MealListItem = ({ navigate, title, id, name, createDate, imgSrc }) => {
  // const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        // onLongPress={() => setOpenModal((prev) => !prev)}
        onPress={() => navigate.navigate("detailpost", { id })}
      >
        <View
          style={{
            marginBottom: 20,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 140,
              height: 140,
              borderRadius: 20,

              overflow: "hidden",
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 140,
                height: 140,
                borderRadius: 20,
                overflow: "hidden",
              }}
            >
              <Image
                source={{
                  uri: imgSrc === null ? defaultImgFood : imgSrc,
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                flex: 1,
                color: colors.color3,
                alignSelf: "flex-start",
                marginTop: 20,
                marginLeft: 20,
                textTransform: "uppercase",
                fontSize: 15,
                fontWeight: "600",
              }}
              numberOfLines={2}
            >
              {title}
            </Text>
            <Text
              style={{
                flex: 1,
                color: colors.color3,
                alignSelf: "flex-start",
                marginTop: 20,
                marginLeft: 20,
                textTransform: "uppercase",
                fontSize: 15,
                fontWeight: "600",
              }}
              numberOfLines={2}
            >
              {name}
            </Text>
            <Text
              style={{
                flex: 1,
                color: colors.color3,
                alignSelf: "flex-start",
                marginTop: 20,
                marginLeft: 20,
                textTransform: "uppercase",
                fontSize: 10,
                fontWeight: "400",
              }}
              numberOfLines={1}
            >
              Created Date: {createDate.slice(0, 10)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    height: 180,

    marginRight: 20,
    marginBottom: 20,
    alignItems: "center",
    // padding: 10,
    borderRadius: 10,
    overflow: "hidden",
    // marginVertical: 10,
  },
});

export default MealListItem;
