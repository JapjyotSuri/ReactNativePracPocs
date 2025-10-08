import GraphArrowIcon from "@/components/icons/GraphArrowIcon";
import React, { useMemo, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const { width } = Dimensions.get("window");

const BarGraph = ({}: {}) => {
  const isTablet = useMemo(() => width >= 678, []);
  const [maxValue, setMaxValue] = useState(0);
  const [stepValue, setStepValue] = useState(0);
  const barData = [
    {
      value: 150,
      label: "KA-51-AF-4155",
      topLabelComponent: () => (
        <Text
          className={`mb-1 text-black ${
            isTablet ? "text-[14px]" : "text-[10px]"
          }`}
        >
          150
        </Text>
      ),
    },
    {
      value: 50,
      label: "KA-51-AF-4103",
      topLabelComponent: () => (
        <Text
          className={`mb-1 text-black ${
            isTablet ? "text-[14px]" : "text-[10px]"
          }`}
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
          className={`mb-1 text-black ${
            isTablet ? "text-[14px]" : "text-[10px]"
          }`}
        >
          240
        </Text>
      ),
    },
    {
      value: 153,
      label: "KA-51-AF-4155",
      topLabelComponent: () => (
        <Text
          className={`mb-1 text-black ${
            isTablet ? "text-[14px]" : "text-[10px]"
          }`}
        >
          153
        </Text>
      ),
    },
    {
      value: 40,
      label: "KA-51-AF-4103",
      topLabelComponent: () => (
        <Text
          className={`mb-1 text-black ${
            isTablet ? "text-[14px]" : "text-[10px]"
          }`}
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
          className={`mb-1 text-black ${
            isTablet ? "text-[14px]" : "text-[10px]"
          }`}
        >
          26
        </Text>
      ),
    },
    {
      value: 15,
      label: "KA-51-AF-4155",
      topLabelComponent: () => (
        <Text
          className={`mb-1 text-black ${
            isTablet ? "text-[14px]" : "text-[10px]"
          }`}
        >
          15
        </Text>
      ),
    },
    {
      value: 40,
      label: "KA-51-AF-4103",
      topLabelComponent: () => (
        <Text
          className={`mb-1 text-black ${
            isTablet ? "text-[14px]" : "text-[10px]"
          }`}
        >
          40
        </Text>
      ),
    },
    {
      value: 260,
      label: "KA-51-AF-4111",
      topLabelComponent: () => (
        <Text
          className={`mb-1 text-black ${
            isTablet ? "text-[14px]" : "text-[10px]"
          }`}
        >
          260
        </Text>
      ),
    },
    {
      value: 140,
      label: "KA-51-AF-4122",
      topLabelComponent: () => (
        <Text
          className={`mb-1.5 text-black ${
            isTablet ? "text-[14px]" : "text-[10px]"
          }`}
        >
          140
        </Text>
      ),
    },
  ];
  const yAxisWidth = useMemo(() => {
    if (barData.length === 0) return wp("5%");

    const maxValue = Math.max(...barData.map((item) => item.value));

    // Calculate width based on number of digits
    const digitCount = Math.floor(Math.log10(maxValue)) + 1;

    // Base width + additional width for each digit
    const baseWidth = wp("5%");
    const additionalWidth = (digitCount - 1) * wp("1.25%");
    return Math.max(wp("5%"), baseWidth + additionalWidth);
  }, [barData]);
  const rawMax = Math.max(...barData.map((b) => b.value)) || 1;
  const bufferedMax = rawMax * 1.2;
  const noOfSections = 5;
  const newStepValue = Math.ceil(bufferedMax / noOfSections / 5) * 5;
  const newMaxValue = newStepValue * noOfSections;
  setStepValue(newStepValue);
  setMaxValue(newMaxValue);
  return (
    <View className="h-full w-full overflow-visible flex-row" key={`chart`}>
      {barData.length === 0 ? (
        <View className="h-full w-full items-center justify-center">
          <Text className="font-roboto text-[#A3A3A3]">No data found</Text>
        </View>
      ) : (
        <>
          <View
            className={`z-100 absolute -left-[80px] top-1/2 w-[155px] -rotate-90 flex-row items-center justify-center`}
            key="label"
          >
            <Text className="font-roboto text-[#A3A3A3] text-2xs-responsive">
              Fuel(Ltrs.)
            </Text>
            <GraphArrowIcon width={32} height={4} />
          </View>
          <View className="h-full w-full overflow-hidden">
            <BarChart
              data={barData}
              barWidth={wp("5.5%")}
              frontColor={"#7F67BE"}
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
              noOfSections={5}
              stepValue={stepValue}
              maxValue={maxValue}
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

export default BarGraph;
