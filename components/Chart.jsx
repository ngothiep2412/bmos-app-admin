import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { colors } from "../styles/styles";

const screenWidth = Dimensions.get("screen").width - 60 - 75;

const Chart = ({
  totalAccountActive,
  totalAccountInactive,
  totalAccountUnverified,
  backgroundColor = colors.color2,
  legendFontColor = colors.color3,
}) => {
  const data = [
    {
      name: "Active",
      population: totalAccountActive,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Inactive",
      population: totalAccountInactive,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Unverified",
      population: totalAccountUnverified,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <View>
      <PieChart
        data={data}
        width={screenWidth}
        height={160}
        chartConfig={chartConfig}
        accessor={"population"}
        absolute
      ></PieChart>
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({});
