import * as React from "react";
import { StyleProp, ViewStyle, Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const Tab1 = ({ style }) => {
  return (
    <View style={[styles.tab1, style]}>
      <View style={[styles.stateLayer, styles.stateLayerFlexBox]}>
        <View style={[styles.tabContents, styles.stateLayerFlexBox]}>
          <Text style={styles.label}>FAQ</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stateLayerFlexBox: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    letterSpacing: 0,
    lineHeight: 20,
    fontWeight: "500",
    fontFamily: FontFamily.typographyParagraphSmallMedium,
    color: Color.colorTypographyContentIconsBlack02,
    textAlign: "center",
  },
  tabContents: {
    flexDirection: "row",
    paddingHorizontal: 0,
    paddingVertical: Padding.p_sm,
  },
  stateLayer: {
    paddingHorizontal: Padding.p_base,
    paddingVertical: 0,
  },
  tab1: {
    flex: 1,
    backgroundColor: Color.colorWhitesmoke_100,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Tab1;
