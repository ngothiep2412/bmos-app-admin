import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, defaultStyle, formStyles } from "../styles/styles";

import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import PostListItem from "../components/PostListItem";
import { useAdminPosts } from "../utils/hooks";
import Loader from "../components/Loader";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";

const Posts = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { loading, posts } = useAdminPosts(dispatch, isFocused);
  const navigateAdd = () => {
    navigation.navigate("newpost");
  };

  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    setSearchText("");
    setFilteredPosts(posts);
  }, [posts, isFocused]);

  const [searchText, setSearchText] = useState("");

  const handleSearch = async (text) => {
    setSearchText(text);

    const filteredList = posts.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    if (searchText === "") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(filteredList);
    }
  };

  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
        {/* Heading */}
        <View style={formStyles.heading}>
          <Text style={formStyles.headingText}>All News</Text>
        </View>

        {loading ? (
          <Loader />
        ) : (
          <>
            <View
              style={{
                margin: 10,
                height: 70,
                width: 70,
                borderRadius: 100,
                backgroundColor: colors.color1,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                zIndex: 9999,
                right: 20,
                bottom: 60,
                borderColor: "#EBEBEB",
                shadowColor: "red",

                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },
                borderWidth: 2,
                shadowOpacity: 0.15,
              }}
            >
              {/* Nội dung màn hình */}
              <TouchableOpacity onPress={navigateAdd}>
                <Ionicons size={35} color={"white"} name="add"></Ionicons>
              </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 20, marginTop: 10 }}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search Meal"
                onChangeText={handleSearch}
                activeUnderlineColor={colors.color1}
                value={searchText}
              />
              <Text style={{ fontSize: 20, fontWeight: "600" }}>List News</Text>
            </View>
            <View
              style={{
                width: "100%",
                height: 550,
              }}
            >
              <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredPosts}
                renderItem={({ item, index }) => (
                  <PostListItem
                    navigate={navigation}
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    title={item.title}
                    imgSrc={item.image}
                    createDate={item.createDate}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default Posts;

const styles = StyleSheet.create({
  searchInput: {
    height: 50,

    borderWidth: 1,
    borderColor: colors.color3,
    marginBottom: 16,

    paddingHorizontal: 30,

    backgroundColor: colors.color2,
    overflow: "hidden",
    shadowColor: "black",
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 0.5,
    shadowOpacity: 0.15,
  },
  searchInput: {
    height: 50,

    borderWidth: 1,
    borderColor: colors.color3,
    marginBottom: 16,

    paddingHorizontal: 30,

    backgroundColor: colors.color2,
    overflow: "hidden",
    shadowColor: "black",
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 0.5,
    shadowOpacity: 0.15,
  },
});
