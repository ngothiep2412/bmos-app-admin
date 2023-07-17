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
      color: "#B42A56",
      legendFontColor: legendFontColor,
    },
    {
      name: "Inactive",
      population: totalAccountInactive,
      color: "yellow",
      legendFontColor: legendFontColor,
    },
    {
      name: "Unverified",
      population: totalAccountUnverified,
      color: colors.price,
      legendFontColor: legendFontColor,
    },
  ];

  const chartConfig = {
    color: (opacity = 1) => `rgba(26,255,146,${opacity})`,
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
