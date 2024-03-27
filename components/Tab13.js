import * as React from "react";
import { StyleProp, ViewStyle, Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const Tab13 = ({ style }) => {
  return (
    <View style={[styles.tab1, style]}>
      <View style={[styles.stateLayer, styles.stateLayerFlexBox]}>
        <View style={[styles.tabContents, styles.stateLayerFlexBox]}>
          <Text style={styles.label}>Active</Text>
        </View>
        <View style={styles.indicator} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stateLayerFlexBox: {
    alignSelf: "stretch",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  label: {
    fontSize: FontSize.m3LabelLarge_size,
    letterSpacing: 0,
    lineHeight: 20,
    fontWeight: "800",
    fontFamily: FontFamily.robotoBlack,
    color: Color.colorSteelblue_100,
    textAlign: "center",
  },
  tabContents: {
    paddingHorizontal: 0,
    paddingVertical: Padding.p_sm,
    zIndex: 0,
  },
  indicator: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Color.colorSteelblue_100,
    height: 2,
    zIndex: 1,
  },
  stateLayer: {
    paddingHorizontal: Padding.p_base,
    paddingVertical: 0,
  },
  tab1: {
    flex: 1,
    backgroundColor: Color.white,
    overflow: "hidden",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default Tab13;
