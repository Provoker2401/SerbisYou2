import * as React from "react";
import { StyleProp, ViewStyle, Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color, Padding, Border } from "../GlobalStyles";

const Tab11 = ({ style }) => {
  return (
    <View style={[styles.tab1, style, styles.tabFlexBox]}>
      <View style={[styles.stateLayer, styles.tabFlexBox]}>
        <View style={[styles.tabContents, styles.tabFlexBox]}>
          <Text style={styles.label}>FAQ</Text>
        </View>
        <View style={[styles.indicatorWrapper, styles.tabFlexBox]}>
          <View style={styles.indicator} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabFlexBox: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  label: {
    fontSize: FontSize.title4Regular18_size,
    lineHeight: 20,
    fontWeight: "600",
    fontFamily: FontFamily.georamaSemiBold,
    color: Color.colorDarkslateblue_100,
    textAlign: "center",
  },
  tabContents: {
    paddingHorizontal: 0,
    paddingVertical: Padding.p_sm,
    alignSelf: "stretch",
  },
  indicator: {
    borderRadius: Border.br_10xs,
    backgroundColor: Color.colorDarkslateblue_100,
    alignSelf: "stretch",
    flex: 1,
  },
  indicatorWrapper: {
    width: 200,
    height: 3,
  },
  stateLayer: {
    paddingHorizontal: Padding.p_base,
    paddingVertical: 0,
    alignSelf: "stretch",
  },
  tab1: {
    backgroundColor: Color.colorWhitesmoke_100,
    overflow: "hidden",
    flex: 1,
  },
});

export default Tab11;
