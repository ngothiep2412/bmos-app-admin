import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  colors,
  defaultStyle,
  formHeading,
  formStyles,
} from "../styles/styles";
import Loader from "../components/Loader";
import UserItem from "../components/UserItem";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { server } from "../redux/store";
import { TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const Users = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(false);

  const [staffsRender, setStaffsRender] = useState([]);
  const [customerRender, setCustomerRender] = useState([]);

  const tabs = [
    {
      dayName: "Customer",
      user: customerRender,
    },
    {
      dayName: "Staff",
      user: staffsRender,
    },
  ];
  const [selectedTab, setSelectedTab] = useState(0);
  const [saveCustomer, setSaveCustomer] = useState([]);
  const [saveStaff, setSaveStaff] = useState([]);

  useEffect(() => {
    setSelectedTab(0);
    setLoading(true);
    const fetchData1 = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`${server}/account/list/staff`, {
          headers,
        });
        setStaffsRender(response.data.data);
        setSaveStaff(response.data.data);
        setLoading(false);
      } catch (error) {
        Alert.alert(
          //title
          "Error",
          //body
          error.response.data.message,
          [
            {
              text: "OK",
              onPress: () => console.log("Yes Pressed"),
            },
          ],
          { cancelable: false }
          //clicking out side of alert will not cancel
        );
        setLoading(false);
      }
    };

    const fetchData2 = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`${server}/account/list/customer`, {
          headers,
        });
        setCustomerRender(response.data.data);
        setSaveCustomer(response.data.data);
        setLoading(false);
      } catch (error) {
        Alert.alert(
          //title
          "Error",
          //body
          error.response.data.message,
          [
            {
              text: "OK",
              onPress: () => console.log("Yes Pressed"),
            },
          ],
          { cancelable: false }
          //clicking out side of alert will not cancel
        );
        setLoading(false);
      }
    };

    fetchData1();
    fetchData2();
    setSearchText("");
  }, [isFocused]);

  useEffect(() => {
    if (selectedTab === 0) {
      const filteredList = saveCustomer.filter((item) =>
        item.fullName.toLowerCase().includes(searchText.toLowerCase())
      );
      setCustomerRender(filteredList);
    } else {
      const filteredList = saveStaff.filter((item) =>
        item.fullName.toLowerCase().includes(searchText.toLowerCase())
      );
      setStaffsRender(filteredList);
    }
  }, [selectedTab]);

  const updateDeleteHandler = async (id) => {
    Alert.alert("Confirm", "Do you want to delete this user?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          setLoading(true);
          try {
            const token = await AsyncStorage.getItem("token");

            const headers = {
              Authorization: `Bearer ${token}`,
            };

            await axios.delete(`${server}/account/${id}`, {
              headers,
            });

            const fetchData1 = async () => {
              try {
                const token = await AsyncStorage.getItem("token");

                const headers = {
                  Authorization: `Bearer ${token}`,
                };

                const response = await axios.get(
                  `${server}/account/list/staff`,
                  {
                    headers,
                  }
                );
                if (searchText !== "") {
                  const filteredList = response.data.data.filter((item) =>
                    item.fullName
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  );
                  setSaveStaff(response.data.data);
                  setStaffsRender(filteredList);
                } else {
                  setSaveStaff(response.data.data);
                  setStaffsRender(response.data.data);
                }
                setLoading(false);
              } catch (error) {
                Alert.alert(
                  //title
                  "Error",
                  //body
                  error.response.data.message,
                  [
                    {
                      text: "OK",
                      onPress: () => console.log("Yes Pressed"),
                    },
                  ],
                  { cancelable: false }
                  //clicking out side of alert will not cancel
                );
                setLoading(false);
              }
            };

            const fetchData2 = async () => {
              try {
                const token = await AsyncStorage.getItem("token");

                const headers = {
                  Authorization: `Bearer ${token}`,
                };

                const response = await axios.get(
                  `${server}/account/list/customer`,
                  {
                    headers,
                  }
                );
                if (searchText !== "") {
                  const filteredList = response.data.data.filter((item) =>
                    item.fullName
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  );
                  setCustomerRender(filteredList);
                  setSaveCustomer(response.data.data);
                } else {
                  setCustomerRender(response.data.data);
                  setSaveCustomer(response.data.data);
                }

                setLoading(false);
              } catch (error) {
                Alert.alert(
                  //title
                  "Error",
                  //body
                  error.response.data.message,
                  [
                    {
                      text: "OK",
                      onPress: () => console.log("Yes Pressed"),
                    },
                  ],
                  { cancelable: false }
                  //clicking out side of alert will not cancel
                );
                setLoading(false);
              }
            };

            fetchData1();
            fetchData2();
          } catch (error) {
            console.log(error.response.data.message);
            setLoading(false);
          }
        },
      },
    ]);
  };

  const updateChangeHandler = async (id, status) => {
    Alert.alert("Confirm", "Do you want to change status this user?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Change",
        onPress: async () => {
          setLoading(true);
          try {
            const token = await AsyncStorage.getItem("token");

            const headers = {
              Authorization: `Bearer ${token}`,
            };

            const statusUser = status === "active" ? "ban" : "active";
            await axios.put(
              `${server}/account/${id}/${statusUser}`,
              {},
              {
                headers,
              }
            );

            const fetchData1 = async () => {
              try {
                const token = await AsyncStorage.getItem("token");

                const headers = {
                  Authorization: `Bearer ${token}`,
                };

                const response = await axios.get(
                  `${server}/account/list/staff`,
                  {
                    headers,
                  }
                );
                if (searchText !== "") {
                  const filteredList = response.data.data.filter((item) =>
                    item.fullName
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  );
                  setStaffsRender(filteredList);
                  setSaveStaff(response.data.data);
                } else {
                  setStaffsRender(response.data.data);
                  setSaveStaff(response.data.data);
                }
                setLoading(false);
              } catch (error) {
                Alert.alert(
                  //title
                  "Error",
                  //body
                  error.response.data.message,
                  [
                    {
                      text: "OK",
                      onPress: () => console.log("Yes Pressed"),
                    },
                  ],
                  { cancelable: false }
                  //clicking out side of alert will not cancel
                );
                setLoading(false);
              }
            };

            const fetchData2 = async () => {
              try {
                const token = await AsyncStorage.getItem("token");

                const headers = {
                  Authorization: `Bearer ${token}`,
                };

                const response = await axios.get(
                  `${server}/account/list/customer`,
                  {
                    headers,
                  }
                );
                if (searchText !== "") {
                  const filteredList = response.data.data.filter((item) =>
                    item.fullName
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  );
                  setCustomerRender(filteredList);
                  setSaveCustomer(response.data.data);
                } else {
                  setCustomerRender(response.data.data);
                  setSaveCustomer(response.data.data);
                }
                setLoading(false);
              } catch (error) {
                Alert.alert(
                  //title
                  "Error",
                  //body
                  error.response.data.message,
                  [
                    {
                      text: "OK",
                      onPress: () => console.log("Yes Pressed"),
                    },
                  ],
                  { cancelable: false }
                  //clicking out side of alert will not cancel
                );
                setLoading(false);
              }
            };

            fetchData1();
            fetchData2();
          } catch (error) {
            Alert.alert(
              //title
              "Error",
              //body
              error.response.data.message,
              [
                {
                  text: "OK",
                  onPress: () => console.log("Yes Pressed"),
                },
              ],
              { cancelable: false }
              //clicking out side of alert will not cancel
            );
            setLoading(false);
          }
        },
      },
    ]);
  };

  const [searchText, setSearchText] = useState("");

  const handleSearch = async (text) => {
    setSearchText(text);
    if (selectedTab === 0) {
      const filteredList = saveCustomer.filter((item) =>
        item.fullName.toLowerCase().includes(text.toLowerCase())
      );
      setCustomerRender(filteredList);
    } else {
      const filteredList = saveStaff.filter((item) =>
        item.fullName.toLowerCase().includes(text.toLowerCase())
      );
      setStaffsRender(filteredList);
    }
  };

  const renderProductList = () => {
    const selectedTabData = tabs.find((tab, index) => index === selectedTab);

    if (
      selectedTabData &&
      selectedTabData.user &&
      selectedTabData.user.length > 0
    ) {
      return selectedTabData.user.map((item, index) => (
        <UserItem
          key={item.id}
          id={item.id}
          i={index}
          phoneNumber={item.phoneNumber}
          dob={item.dob}
          email={item.email}
          fullName={item.fullName}
          updateChangeHandler={updateChangeHandler}
          updateDeleteHandler={updateDeleteHandler}
          processOrderLoading={loading}
          status={item.status}
          avatar={item.avatar}
          type={item}
        ></UserItem>
      ));
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 20, fontWeight: "500" }}>
            No User in this type
          </Text>
        </View>
      );
    }
  };

  const navigateAdd = () => {
    navigation.navigate("newstaff");
  };

  return (
    <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
      {/* Heading */}
      <View style={formStyles.heading}>
        <Text style={formStyles.headingText}>All Users</Text>
      </View>

      <View style={styles.spacerStyle} />
      {loading ? (
        <Loader></Loader>
      ) : (
        <View style={{ padding: 10, flex: 1 }}>
          <View style={{}}>
            <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10 }}>
              Type Of User
            </Text>
            <TabBar
              tabs={tabs}
              selectedTab={selectedTab}
              onTabPress={setSelectedTab}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search User"
              onChangeText={handleSearch}
              activeUnderlineColor={colors.color1}
              value={searchText}
            />
            {selectedTab == 1 && (
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
                  right: -20,
                  bottom: 70,
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
            )}
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                paddingHorizontal: 2,
                height: Dimensions.get("screen").height / 1.7,
              }}
            >
              {renderProductList()}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

const TabBar = ({ tabs, selectedTab, onTabPress }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ height: 50, marginBottom: 20 }}
    >
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={{
            justifyContent: "center",
            alignItems: "center",
            // height: 50,
            width: 100,
            backgroundColor:
              selectedTab === index ? colors.color1 : colors.color2,
            borderRadius: 30,
            marginRight: 10,
            borderWidth: 1,
            borderColor: selectedTab === index ? colors.color1 : colors.color1,
          }}
          onPress={() => onTabPress(index)}
        >
          <Text
            style={{
              color: selectedTab === index ? colors.color2 : colors.color1,
              fontSize: 14,
              fontWeight: "500",
            }}
          >
            {tab.dayName}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Users;

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: "red",
  },
  pickerIcon: {
    position: "absolute",
    right: 12,
    top: "50%",
    marginTop: -6,
  },
  pickerText: {
    fontSize: 16,
    color: "#333",
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
