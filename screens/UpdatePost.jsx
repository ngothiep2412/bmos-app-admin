import { View, Text, ScrollView, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import {
  colors,
  defaultImgFood,
  defaultProduct,
  defaultStyle,
  formHeading,
  inputOptions,
} from "../styles/styles";
import { Avatar, Button, TextInput } from "react-native-paper";
import { useMessageAndErrorPost } from "../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import mime from "mime";
import { updatePost } from "../redux/actions/postAction";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

const UpdatePost = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imagePost, setImagePost] = useState("");
  const [statusPost, setStatusPost] = useState(false);

  const { post } = useSelector((state) => state.post);

  const submitHandler = () => {
    const myForm = new FormData();

    myForm.append("file", {
      uri: imagePost,
      type: mime.getType(imagePost),
      name: imagePost.split("/").pop(),
    });
    const id = post[0].id;
    dispatch(updatePost(id, statusPost, title, description, myForm));
  };

  const loadingOther = useMessageAndErrorPost(dispatch, navigation, "posts");

  const disableBtnCondition = !title || !description || !imagePost;

  useEffect(() => {
    setImagePost(post[0]?.image);
    setDescription(post[0]?.desc);
    setTitle(post[0]?.title);
    if (post[0]?.status === 1) {
      setStatusPost(true);
    } else {
      setStatusPost(false);
    }
  }, [post, isFocused]);

  useEffect(() => {
    if (route.params?.image) {
      setImagePost(route.params.image);
      // dispatch updatePic Here
    }
  }, [route.params, isFocused]);

  const handleRadioButtonPress = (value) => {
    setStatusPost(value);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <View
        style={{
          ...defaultStyle,
          backgroundColor: colors.color5,
        }}
      >
        <Header back={true} color={colors.color3} editMeal={false}></Header>

        {/* Heading */}
        <View style={{ marginBottom: 20, paddingTop: 70 }}>
          <Text style={formHeading}>Update New</Text>
        </View>
        <View style={{ height: 650 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              padding: 20,
              elevation: 10,
              borderRadius: 10,

              backgroundColor: colors.color3,
            }}
          >
            <View
              style={{
                justifyContent: "center",
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
                    uri: imagePost ? imagePost : defaultProduct,
                  }}
                />
              </View>

              <Button
                onPress={() =>
                  navigation.navigate("camera", {
                    updatePostImg: true,
                  })
                }
                textColor={colors.color1}
              >
                Change image
              </Button>
              <Text style={{ color: "white" }}>Title</Text>
              <TextInput
                {...inputOptions}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
              />
              <Text style={{ color: "white" }}>Description</Text>
              <TextInput
                {...inputOptions}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
              />

              <Text style={{ color: "white" }}>Status</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => handleRadioButtonPress(true)}
                  style={{ alignItems: "center" }}
                >
                  <View
                    style={[
                      styles.radioButton,
                      statusPost === true && styles.radioButtonSelected,
                    ]}
                  />
                  <Text
                    style={[
                      styles.radioButtonText,
                      {
                        color:
                          statusPost === true ? colors.color1 : colors.color2,
                      },
                    ]}
                  >
                    True
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleRadioButtonPress(false)}
                  style={{ alignItems: "center" }}
                >
                  <View
                    style={[
                      styles.radioButton,
                      statusPost === false && styles.radioButtonSelected,
                    ]}
                  />
                  <Text
                    style={[
                      styles.radioButtonText,
                      {
                        color:
                          statusPost !== true ? colors.color1 : colors.color2,
                      },
                    ]}
                  >
                    False
                  </Text>
                </TouchableOpacity>
              </View>

              <Button
                textColor={colors.color2}
                style={{
                  backgroundColor: colors.color1,
                  margin: 20,
                  padding: 6,
                  marginBottom: 50,
                }}
                onPress={submitHandler}
                loading={loadingOther}
                disabled={disableBtnCondition}
                icon={"update"}
              >
                Update
              </Button>
            </View>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default UpdatePost;

const styles = StyleSheet.create({
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    marginRight: 10,
  },
  radioButtonSelected: {
    backgroundColor: colors.color1,
  },
  radioButtonText: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
});
