import GraphArrowIcon from "@/components/icons/GraphArrowIcon";
import React, { useMemo } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const { width } = Dimensions.get("window");

const BarGraph = () => {
  const isTablet = width >= 678;
  const barData = [
    {
      value: 150,
      label: "PB-51-AF-4155",
      topLabelComponent: () => (
        <Text
          style={[
            styles.topLabel,
            isTablet ? styles.topLabelTablet : styles.topLabelMobile,
          ]}
        >
          150
        </Text>
      ),
    },
    {
      value: 50,
      label: "CH-51-AF-4103",
      topLabelComponent: () => (
        <Text
          style={[
            styles.topLabel,
            isTablet ? styles.topLabelTablet : styles.topLabelMobile,
          ]}
        >
          50
        </Text>
      ),
    },
    {
      value: 240,
      label: "KA-51-AF-4111",
      topLabelComponent: () => (
        <Text
          style={[
            styles.topLabel,
            isTablet ? styles.topLabelTablet : styles.topLabelMobile,
          ]}
        >
          240
        </Text>
      ),
    },
    {
      value: 153,
      label: "PB-51-AF-4155",
      topLabelComponent: () => (
        <Text
          style={[
            styles.topLabel,
            isTablet ? styles.topLabelTablet : styles.topLabelMobile,
          ]}
        >
          153
        </Text>
      ),
    },
    {
      value: 40,
      label: "CH-51-AF-4103",
      topLabelComponent: () => (
        <Text
          style={[
            styles.topLabel,
            isTablet ? styles.topLabelTablet : styles.topLabelMobile,
          ]}
        >
          40
        </Text>
      ),
    },
    {
      value: 26,
      label: "KA-51-AF-4111",
      topLabelComponent: () => (
        <Text
          style={[
            styles.topLabel,
            isTablet ? styles.topLabelTablet : styles.topLabelMobile,
          ]}
        >
          26
        </Text>
      ),
    },
    {
      value: 15,
      label: "PB-51-AF-4155",
      topLabelComponent: () => (
        <Text
          style={[
            styles.topLabel,
            isTablet ? styles.topLabelTablet : styles.topLabelMobile,
          ]}
        >
          15
        </Text>
      ),
    },
    {
      value: 40,
      label: "CH-51-AF-4103",
      topLabelComponent: () => (
        <Text
          style={[
            styles.topLabel,
            isTablet ? styles.topLabelTablet : styles.topLabelMobile,
          ]}
        >
          40
        </Text>
      ),
    },
    {
      value: 260,
      label: "PB-51-AF-4111",
      topLabelComponent: () => (
        <Text
          style={[
            styles.topLabel,
            isTablet ? styles.topLabelTablet : styles.topLabelMobile,
          ]}
        >
          260
        </Text>
      ),
    },
    {
      value: 140,
      label: "PB-51-AF-4122",
      topLabelComponent: () => (
        <Text
          style={[
            styles.topLabel,
            styles.topLabelLast,
            isTablet ? styles.topLabelTablet : styles.topLabelMobile,
          ]}
        >
          140
        </Text>
      ),
    },
  ];

  const yAxisWidth = useMemo(() => {
    if (barData.length === 0) return wp("5%");
    //Multiplying 1.2 here to make sure the bar with max value doesn't get cut off from the top
    const maxValue = Math.max(...barData.map((item) => item.value)) * 1.2;

    // Calculate width based on number of digits
    const digitCount = Math.floor(Math.log10(maxValue)) + 1;

    // Base width + additional width for each digit
    const baseWidth = wp("5%");
    const additionalWidth = (digitCount - 1) * wp("1.25%");
    return Math.max(wp("5%"), baseWidth + additionalWidth);
  }, [barData]);

  const chartConfig = useMemo(() => {
    const rawMax = Math.max(...barData.map((b) => b.value)) || 1;
    const bufferedMax = rawMax * 1.2;
    const noOfSections = 5;
    const stepValue = Math.ceil(bufferedMax / noOfSections / 5) * 5;
    const maxValue = stepValue * noOfSections;

    return {
      stepValue,
      maxValue,
      rawMax,
      bufferedMax,
      noOfSections,
    };
  }, [barData]);

  return (
    <View style={styles.container} key="chart">
      {barData.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No data found</Text>
        </View>
      ) : (
        <>
          <View style={styles.yAxisLabelContainer} key="label">
            <Text style={[styles.yAxisLabel]}>Fuel(Ltrs.)</Text>
            <GraphArrowIcon
              width={isTablet ? 64 : 32}
              height={isTablet ? 8 : 4}
            />
          </View>
          <View style={styles.chartContainer}>
            <BarChart
              data={barData}
              barWidth={wp("5.5%")}
              frontColor={"#6495ED"}
              height={wp("38%")}
              width={width - yAxisWidth - 64}
              spacing={isTablet ? 70 : 65}
              dashGap={0}
              xAxisLabelTextStyle={{
                textAlign: "center",
                fontSize: isTablet ? 14 : 10,
                color: "#737373",
              }}
              formatYLabel={(value) => Math.round(Number(value)).toString()}
              noOfSections={chartConfig.noOfSections}
              stepValue={chartConfig.stepValue}
              maxValue={chartConfig.maxValue}
              disablePress
              yAxisLabelWidth={yAxisWidth}
              yAxisTextStyle={{
                textAlign: "center",
                fontSize: isTablet ? 14 : 10,
                color: "#737373",
              }}
              endSpacing={17}
              xAxisColor="#737373"
              yAxisColor="#737373"
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: wp("45%"),
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
    flexDirection: "row",
  },
  noDataContainer: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  noDataText: {
    color: "#A3A3A3",
  },
  yAxisLabelContainer: {
    position: "absolute",
    left: -81,
    top: "50%",
    width: 155,
    transform: [{ rotate: "-90deg" }],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  yAxisLabel: {
    color: "#A3A3A3",
    fontSize: width >= 678 ? 16 : 10,
  },
  chartContainer: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  topLabel: {
    marginBottom: 4,
    color: "black",
  },
  topLabelTablet: {
    fontSize: 14,
  },
  topLabelMobile: {
    fontSize: 10,
  },
  topLabelLast: {
    marginBottom: 6,
  },
});

export default BarGraph;
