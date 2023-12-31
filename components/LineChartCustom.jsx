import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";

const LineChartCustom = ({ title }) => {
  return (
    <>
      <LineChart
        data={{
          labels: ["Jan", "Feb", "March", "April", "May", "June"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get("screen").width / 1.2} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "green",
          backgroundGradientTo: "yellow",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          overflow: "hidden",
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </>
  );
};

export default LineChartCustom;

const styles = StyleSheet.create({});
