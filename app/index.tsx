import BarGraph from "@/components/BarGraph";
import BarGroupGraph from "@/components/BarGroupGraph";
import React, { useMemo } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
const { width } = Dimensions.get("window");
const index = () => {
  const isTablet = useMemo(() => width >= 678, []);
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        gap: 16,
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          gap: 16,
          borderRadius: 16,
          padding: 16,
        }}
      >
        <Text style={{ fontSize: isTablet ? 18 : 14, fontWeight: "bold" }}>
          Bar Graph:
        </Text>
        <BarGraph />
      </View>
      <View
        style={{
          backgroundColor: "white",
          gap: 16,
          borderRadius: 16,
          padding: 16,
        }}
      >
        <Text style={{ fontSize: isTablet ? 18 : 14, fontWeight: "bold" }}>
          Bar Group Graph:
        </Text>
        <BarGroupGraph />
      </View>
    </ScrollView>
  );
};

export default index;
