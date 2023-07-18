import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, defaultStyle } from "../styles/styles";
import Heading from "../components/Heading";
import Chart from "../components/Chart";
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import Loader from "../components/Loader";
import { server } from "../redux/store";
import { Alert } from "react-native";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
} from "victory-native";

const Home = () => {
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  const [totalStaff, setTotalStaff] = useState(0);
  const [profit, setProfit] = useState([]);
  const [totalAccountActive, setTotalAccountActive] = useState(0);
  const [totalAccountInactive, setTotalAccountInactive] = useState(0);
  const [totalAccountUnverified, setTotalAccountUnverified] = useState(0);
  const [totalNews, setTotalNews] = useState(0);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`${server}/store/admin-dashboard`, {
          headers,
        });

        setTotalStaff(response.data.data.TotalStaff);
        setProfit(response.data.data.Profit);

        setTotalAccountActive(response.data.data.TotalAccountActive);
        setTotalAccountInactive(response.data.data.TotalAccountInactive);
        setTotalAccountUnverified(response.data.data.TotalAccountUnverified);
        setTotalNews(response.data.data.TotalNews);
        setLoading(false);
      } catch (error) {
        c;
        console.log(error);
        Alert.alert(
          //title
          "Error",
          //body
          error,
          [
            {
              text: "OK",
              onPress: () => console.log("Yes Pressed"),
            },
          ],
          { cancelable: false }
          //clicking out side of alert will not cancel
        );
        dispatch({
          type: "clearError",
        });
        setLoading(false);
      }
    };

    fetchData();
  }, [isFocused]);

  const colorScale = [
    "#FF0000", // Tháng 1 - Màu đỏ
    "#00FF00", // Tháng 2 - Màu xanh lá cây
    "#0000FF", // Tháng 3 - Màu xanh dương
    "#FF99FF", // Tháng 3 - Màu xanh dương
    "#001100", // Tháng 3 - Màu xanh dương
    "#FF9900", // Tháng 3 - Màu xanh dương
    "#CCCCCC", // Tháng 1 - Màu đỏ
    "#FF9966", // Tháng 2 - Màu xanh lá cây
    "#3399FF", // Tháng 3 - Màu xanh dương
    "#3333CC", // Tháng 3 - Màu xanh dương
    "#00EE00", // Tháng 3 - Màu xanh dương
    "#990033", // Tháng 3 - Màu xanh dương
  ];

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
          <View
            style={{
              paddingTop: 50,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            {/* Heading */}
            <Heading text1="Our" text2="Dashboard" />
          </View>
          <ScrollView
            showsVerticalScrollIndicator="false"
            // style={{ height: 400 }}
          >
            <View
              style={{
                flex: 1,
                marginTop: 20,
              }}
            >
              <View style={styles.container}>
                <View style={[styles.card, styles.card2]}>
                  <View style={styles.cardContainer}>
                    <FontAwesome5
                      name="users"
                      size={30}
                      color={colors.color1}
                    ></FontAwesome5>
                    <Text style={[styles.cardTextNumber, { color: "#0D337E" }]}>
                      {totalStaff}
                    </Text>
                    <Text style={[styles.cardText, { color: "#0D337E" }]}>
                      Total Staff
                    </Text>
                  </View>
                </View>
                <View style={[styles.card, styles.card4]}>
                  <View style={styles.cardContainer}>
                    <FontAwesome5
                      name="blog"
                      size={20}
                      color={colors.color1}
                    ></FontAwesome5>
                    <Text style={[styles.cardTextNumber, { color: "#B42A56" }]}>
                      {totalNews}
                    </Text>
                    <Text style={[styles.cardText, { color: "#B42A56" }]}>
                      Total News
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <Text
              style={[
                styles.cardText,

                {
                  fontSize: 20,
                  fontWeight: "800",
                  textAlign: "left",
                  marginTop: 10,
                  marginBottom: 30,
                },
              ]}
            >
              Analasyis
            </Text>
            <View
              style={{
                width: "100%",
                alignItems: "center",
              }}
            >
              <Chart
                totalAccountActive={totalAccountActive}
                totalAccountInactive={totalAccountInactive}
                totalAccountUnverified={totalAccountUnverified}
              />
            </View>
            <Text
              style={[
                styles.cardText,

                {
                  color: "#56348D",
                  fontSize: 20,
                  fontWeight: "800",
                  textAlign: "center",
                  marginTop: 10,
                },
              ]}
            >
              Number of type user in total user
            </Text>
            <View style={{ marginTop: 20 }}>
              <VictoryChart>
                <VictoryAxis
                  dependentAxis
                  tickFormat={(tick) => `${tick / 1000}k`}
                />
                <VictoryAxis />
                <VictoryGroup>
                  <VictoryBar
                    data={profit}
                    x="month"
                    y="total"
                    labelComponent={<VictoryLabel dy={-20} />}
                    labels={({ datum }) => `${datum.total}`}
                    style={{
                      data: {
                        fill: ({ datum }) =>
                          colorScale[parseInt(datum.month) - 1],
                      },
                    }}
                  />
                </VictoryGroup>
              </VictoryChart>
            </View>
            <Text
              style={[
                styles.cardText,

                {
                  color: "#56348D",
                  fontSize: 20,
                  fontWeight: "800",
                  textAlign: "center",
                },
              ]}
            >
              Monthly revenue chart
            </Text>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    width: Dimensions.get("window").width / 2.4,
    height: 120,
    borderRadius: 20,
    marginBottom: 20,
  },
  card1: {
    backgroundColor: "#C9FACD",
  },
  card2: {
    backgroundColor: "#D0F2FE",
  },
  card3: {
    backgroundColor: "#FFF8CE",
  },
  card4: {
    backgroundColor: "#FADFE8",
  },

  cardContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "100%",
  },

  cardTextNumber: {
    fontWeight: "900",
    fontSize: 18,
  },

  cardText: {
    fontWeight: "500",
    fontSize: 16,
  },

  chartContainer: {
    backgroundColor: colors.color2,
    height: 300,
    elevation: 5,
    borderColor: "#EBEBEB",
    shadowColor: "black",
    borderRadius: 8,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    borderWidth: 0.2,
    shadowOpacity: 0.1,
    // margin: 5,
    // padding: 15,
    // paddingHorizontal: 10,
    // flexDirection: "column",
    // justifyContent: "space-evenly",
    // alignItems: "center",
    // borderRadius: 10,
  },
});
