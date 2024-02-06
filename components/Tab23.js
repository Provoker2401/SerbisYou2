import * as React from "react";
import { StyleProp, ViewStyle, Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const Tab23 = ({ style }) => {
  return (
    <View style={[styles.tab2, style, styles.tab2FlexBox]}>
      <View style={[styles.stateLayer, styles.tab2FlexBox]}>
        <View style={styles.tabContents}>
          <Text style={styles.label}>History</Text>
        </View>
        <View style={styles.indicator} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tab2FlexBox: {
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
    flexDirection: "row",
    paddingHorizontal: 0,
    paddingVertical: Padding.p_sm,
    alignItems: "flex-end",
    justifyContent: "center",
    zIndex: 0,
    alignSelf: "stretch",
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
    alignSelf: "stretch",
  },
  tab2: {
    flex: 1,
    backgroundColor: Color.white,
    overflow: "hidden",
  },
});

export default Tab23;
