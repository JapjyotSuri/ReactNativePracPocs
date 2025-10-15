import GraphArrowIcon from "@/components/icons/GraphArrowIcon";
import React, { useMemo } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const { width } = Dimensions.get("window");

const BarGroupGraph = () => {
  const isTablet = useMemo(() => width >= 678, []);
  const allDummyMileageData = [
    {
      value: 15, // current_mileage
      spacing: 2,
      frontColor: "#0047AB",
    },
    {
      value: 17, // expected_mileage
      frontColor: "#A7C7E7",
      label: "PB-12-CL-8877",
      topLabelComponent: () => (
        <BarTopLabel isLow={true} labelText="15/17" isTablet={isTablet} />
      ),
    },
    {
      value: 10, // current_mileage
      spacing: 2,
      frontColor: "#0047AB",
    },
    {
      value: 12, // expected_mileage
      frontColor: "#A7C7E7",
      label: "PB-13-DL-8878",
      topLabelComponent: () => (
        <BarTopLabel isLow={true} labelText="10/12" isTablet={isTablet} />
      ),
    },
    {
      value: 15, // current_mileage
      spacing: 2,
      frontColor: "#0047AB",
      topLabelComponent: () => (
        <BarTopLabel isLow={false} labelText="15/12" isTablet={isTablet} />
      ),
    },
    {
      value: 12, // expected_mileage
      frontColor: "#A7C7E7",
      label: "CH-13-DL-0001",
    },
    {
      value: 20, // current_mileage
      spacing: 2,
      frontColor: "#0047AB",
      topLabelComponent: () => (
        <BarTopLabel isLow={false} labelText="20/15" isTablet={isTablet} />
      ),
    },
    {
      value: 15, // expected_mileage
      frontColor: "#A7C7E7",
      label: "CH-14-DL-0004",
    },
    {
      value: 25, // current_mileage
      spacing: 2,
      frontColor: "#0047AB",
      topLabelComponent: () => (
        <BarTopLabel isLow={false} labelText="25/10" isTablet={isTablet} />
      ),
    },
    {
      value: 10, // expected_mileage
      frontColor: "#A7C7E7",
      label: "DL-15-AB-1234",
    },
    {
      value: 12, // current_mileage
      spacing: 2,
      frontColor: "#0047AB",
    },
    {
      value: 17, // expected_mileage
      frontColor: "#A7C7E7",
      label: "DL-15-AB-1234",
      topLabelComponent: () => (
        <BarTopLabel isLow={true} labelText="12/17" isTablet={isTablet} />
      ),
    },
  ];

  const BarTopLabel = ({
    isLow,
    labelText,
    isTablet,
  }: {
    isLow: boolean;
    labelText: string;
    isTablet: boolean;
  }) => {
    const labelLength = labelText.length;
    const approxCharWidth = isTablet ? 8 : 6;
    const padding = 10;
    const dynamicWidth = labelLength * approxCharWidth + padding;

    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 30,
          width: dynamicWidth,
        }}
      >
        <Text
          style={{
            color: isLow ? "#CD1911" : "#262626",
            fontSize: isTablet ? 14 : 10,
          }}
        >
          {labelText}
        </Text>
      </View>
    );
  };
  const yAxisWidth = useMemo(() => {
    if (allDummyMileageData.length === 0) return wp("5%");
    //Multiplying 1.2 here to make sure the bar with max value doesn't get cut off from the top
    const maxValue =
      Math.max(...allDummyMileageData.map((item) => item.value)) * 1.2;
    // Calculate width based on number of digits
    const digitCount = Math.floor(Math.log10(maxValue)) + 1;
    // Base width + additional width for each digit
    const baseWidth = wp("5%");
    const additionalWidth = (digitCount - 1) * wp("1.25%");
    return Math.max(wp("5%"), baseWidth + additionalWidth);
  }, [allDummyMileageData]);

  const chartConfig = useMemo(() => {
    const rawMax = Math.max(...allDummyMileageData.map((b) => b.value)) || 1;
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
  }, [allDummyMileageData]);

  return (
    <View style={styles.mainChart} key="main-chart">
      {allDummyMileageData.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No data found</Text>
        </View>
      ) : (
        <>
          <View style={styles.yAxisLabelContainer}>
            <Text style={styles.yAxisLabelText}>Mileage(Kms/Ltr.)</Text>
            <GraphArrowIcon
              width={isTablet ? 64 : 32}
              height={isTablet ? 8 : 4}
            />
          </View>
          <View style={styles.chartContainer}>
            <BarChart
              data={allDummyMileageData}
              barWidth={wp("1.25%")}
              frontColor={"#6495ED"}
              height={wp("60%")}
              formatYLabel={(value) => Math.round(Number(value)).toString()}
              noOfSections={chartConfig.noOfSections}
              stepValue={chartConfig.stepValue}
              maxValue={chartConfig.maxValue}
              barBorderTopLeftRadius={wp("2.5%")}
              barBorderTopRightRadius={wp("2.5%")}
              barBorderBottomLeftRadius={wp("0.1%")}
              barBorderBottomRightRadius={wp("0.1%")}
              width={width - yAxisWidth - 80}
              spacing={isTablet ? 55 : 45}
              dashGap={0}
              xAxisLabelTextStyle={{
                textAlign: "center",
                fontSize: isTablet ? 14 : 10,
                color: "#737373",
              }}
              xAxisTextNumberOfLines={2}
              disablePress
              yAxisLabelWidth={yAxisWidth}
              yAxisTextStyle={{
                textAlign: "center",
                fontSize: isTablet ? 14 : 10,
                color: "#737373",
              }}
              endSpacing={25}
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
  mainChart: {
    width: "94%",
  },
  noDataContainer: {
    paddingVertical: 16,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  noDataText: {
    color: "#A3A3A3",
  },
  yAxisLabelContainer: {
    position: "absolute",
    left: -81,
    top: "50%",
    zIndex: 10,
    width: 155,
    transform: [{ rotate: "-90deg" }],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  yAxisLabelText: {
    color: "#A3A3A3",
    fontSize: width >= 678 ? 16 : 10,
  },
  chartContainer: {
    width: "100%",
    overflow: "hidden",
  },
});

export default BarGroupGraph;
