import * as React from "react";
import { StyleProp, ViewStyle, Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const Tab22 = ({ style }) => {
  return (
    <View style={[styles.tab2, style, styles.tab2FlexBox]}>
      <View style={[styles.stateLayer, styles.tab2FlexBox]}>
        <View style={styles.tabContents}>
          <Text style={styles.label}>History</Text>
        </View>
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
    fontWeight: "500",
    fontFamily: FontFamily.m3LabelLarge,
    color: Color.colorTypographyContentIconsBlack02,
    textAlign: "center",
  },
  tabContents: {
    flexDirection: "row",
    paddingHorizontal: 0,
    paddingVertical: Padding.p_sm,
    alignItems: "flex-end",
    justifyContent: "center",
    alignSelf: "stretch",
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

export default Tab22;
