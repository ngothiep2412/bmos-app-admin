import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Animated, View } from "react-native";
import { Dimensions } from "react-native";
import { useDispatch } from "react-redux";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRef } from "react";

import { loadUser } from "./redux/actions/userAction";
import Login from "./screens/Login";
import CameraComponent from "./components/CameraComponent";
import { colors } from "./styles/styles";
import Profile from "./screens/Profile";
import Home from "./screens/Home";
import Users from "./screens/Users";
import SplashScreen from "./screens/SplashScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Posts from "./screens/Posts";
import ChangePassword from "./screens/ChangePassword";
import NewPost from "./screens/NewPost";
import PostDetail from "./screens/PostDetail";
import UpdatePost from "./screens/UpdatePost";
import UpdateProfile from "./screens/UpdateProfile";
import Onboarding from "react-native-onboarding-swiper";
import OnboardingScreen from "./screens/OnBoarding";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function Main() {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        dispatch(loadUser());
      }
    }

    fetchToken();
  }, []);

  function TabBottom({ route }) {
    return (
      <>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            // Floating Tab Bar...
            style: {
              backgroundColor: "white",
              position: "absolute",
              bottom: 40,
              marginHorizontal: 20,
              // Max Height...
              height: 60,
              borderRadius: 10,
              // Shadow...
              shadowColor: "#000",
              shadowOpacity: 0.06,
              shadowOffset: {
                width: 10,
                height: 10,
              },
              paddingHorizontal: 20,
            },
          }}
        >
          {
            // Tab Screens....
            // Tab ICons....
          }
          <Tab.Screen
            name={"home"}
            component={Home}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    // centring Tab Button...
                    position: "absolute",
                    top: 20,
                  }}
                >
                  <FontAwesome5
                    name="home"
                    size={20}
                    color={focused ? colors.color1 : colors.color3}
                  ></FontAwesome5>
                </View>
              ),
            }}
            listeners={({ navigation, route }) => ({
              // Onpress Update....
              tabPress: (e) => {
                Animated.spring(tabOffsetValue, {
                  toValue: 0,
                  useNativeDriver: true,
                }).start();
              },
            })}
          ></Tab.Screen>

          <Tab.Screen
            name={"users"}
            component={Users}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    // centring Tab Button...
                    position: "absolute",
                    top: 20,
                  }}
                >
                  <FontAwesome5
                    name="users"
                    size={20}
                    color={focused ? colors.color1 : colors.color3}
                  ></FontAwesome5>
                </View>
              ),
            }}
            listeners={({ navigation, route }) => ({
              // Onpress Update....
              tabPress: (e) => {
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth() * 1.2,
                  useNativeDriver: true,
                }).start();
              },
            })}
          ></Tab.Screen>

          <Tab.Screen
            name={"posts"}
            component={Posts}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    // centring Tab Button...
                    position: "absolute",
                    top: 20,
                  }}
                >
                  <FontAwesome5
                    name="blog"
                    size={20}
                    color={focused ? colors.color1 : colors.color3}
                  ></FontAwesome5>
                </View>
              ),
            }}
            listeners={({ navigation, route }) => ({
              // Onpress Update....
              tabPress: (e) => {
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth() * 2.5,
                  useNativeDriver: true,
                }).start();
              },
            })}
          ></Tab.Screen>

          <Tab.Screen
            name={"profile"}
            component={Profile}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    // centring Tab Button...
                    position: "absolute",
                    top: 20,
                  }}
                >
                  <FontAwesome5
                    name="user-alt"
                    size={20}
                    color={focused ? colors.color1 : colors.color3}
                  ></FontAwesome5>
                </View>
              ),
            }}
            listeners={({ navigation, route }) => ({
              // Onpress Update....
              tabPress: (e) => {
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth() * 3.75,
                  useNativeDriver: true,
                }).start();
              },
            })}
          ></Tab.Screen>
        </Tab.Navigator>
        <Animated.View
          style={{
            width: getWidth() - 25,
            height: 2,
            backgroundColor: colors.color1,
            position: "absolute",
            bottom: 78,
            // Horizontal Padding = 20...
            left: 25,
            borderRadius: 20,
            transform: [{ translateX: tabOffsetValue }],
          }}
        ></Animated.View>
      </>
    );
  }

  const [showOnboarding, setShowOnboarding] = useState(null);
  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await AsyncStorage.getItem("onboarded");
    if (onboarded == 1) {
      // hide onboarding
      setShowOnboarding(false);
    } else {
      // show onboarding
      setShowOnboarding(true);
    }
  };

  if (showOnboarding == null) {
    return null;
  }

  if (showOnboarding) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Onboarding"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Group>
            <Stack.Screen
              name="Onboarding"
              options={{ headerShown: false }}
              component={OnboardingScreen}
            />
            <Stack.Screen name="splash" component={SplashScreen}></Stack.Screen>
            <Stack.Screen name="BottomTab" component={TabBottom} />
            <Stack.Screen name="login" component={Login}></Stack.Screen>
            <Stack.Screen
              name="camera"
              component={CameraComponent}
            ></Stack.Screen>
            <Stack.Screen
              name="changepassword"
              component={ChangePassword}
            ></Stack.Screen>

            <Stack.Screen name="newpost" component={NewPost}></Stack.Screen>
            <Stack.Screen
              name="detailpost"
              component={PostDetail}
            ></Stack.Screen>
            <Stack.Screen
              name="updatepost"
              component={UpdatePost}
            ></Stack.Screen>
            <Stack.Screen
              name="updateprofile"
              component={UpdateProfile}
            ></Stack.Screen>
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="splash"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Group>
            <Stack.Screen name="splash" component={SplashScreen}></Stack.Screen>
            <Stack.Screen name="BottomTab" component={TabBottom} />
            <Stack.Screen name="login" component={Login}></Stack.Screen>

            <Stack.Screen
              name="camera"
              component={CameraComponent}
            ></Stack.Screen>
            <Stack.Screen
              name="changepassword"
              component={ChangePassword}
            ></Stack.Screen>

            <Stack.Screen name="newpost" component={NewPost}></Stack.Screen>
            <Stack.Screen
              name="detailpost"
              component={PostDetail}
            ></Stack.Screen>
            <Stack.Screen
              name="updatepost"
              component={UpdatePost}
            ></Stack.Screen>
            <Stack.Screen
              name="updateprofile"
              component={UpdateProfile}
            ></Stack.Screen>
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

function getWidth() {
  let width = Dimensions.get("window").width;

  // Horizontal Padding = 20...
  width = width - 80;

  // Total five Tabs...
  return width / 4;
}

export default Main;
