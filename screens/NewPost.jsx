import { View, Text, ScrollView, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import {
  colors,
  defaultImgFood,
  defaultStyle,
  formHeading,
  inputOptions,
} from "../styles/styles";
import { Avatar, Button, TextInput } from "react-native-paper";
import { useMessageAndErrorPost } from "../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import mime from "mime";
import { addPost } from "../redux/actions/postAction";

const NewPost = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imagePost, setImagePost] = useState("");

  const submitHandler = () => {
    const myForm = new FormData();

    myForm.append("file", {
      uri: imagePost,
      type: mime.getType(imagePost),
      name: imagePost.split("/").pop(),
    });

    dispatch(addPost(name, title, description, myForm));
  };

  const loadingOther = useMessageAndErrorPost(dispatch, navigation, "posts");

  const disableBtnCondition = !name || !title || !description || !imagePost;

  useEffect(() => {
    if (route.params?.image) {
      setImagePost(route.params.image);
      // dispatch updatePic Here
    }
  }, [route.params, isFocused]);

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
          <Text style={formHeading}>Add New</Text>
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
                    uri: imagePost ? imagePost : defaultImgFood,
                  }}
                />
              </View>

              <Button
                onPress={() =>
                  navigation.navigate("camera", {
                    addPostImg: true,
                  })
                }
                textColor={colors.color1}
              >
                Manage Images
              </Button>
              <Text style={{ color: "white" }}>Name</Text>
              <TextInput
                {...inputOptions}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
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
              >
                Add
              </Button>
            </View>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default NewPost;
