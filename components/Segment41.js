import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { FontFamily, FontSize, Color, Border, Padding } from "../GlobalStyles";

const Segment41 = ({ style }) => {
  return (
    <View style={[styles.segment4, style, styles.segment4FlexBox1]}>
      <View style={[styles.iconContainer, styles.segment4FlexBox1]}>
        <View style={[styles.stateLayer, styles.segment4FlexBox1]}>
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../assets/icon4.png")}
          />
          <View style={styles.badge}>
            <Text style={[styles.badgeLabel, styles.labelTypo1]}>3</Text>
          </View>
        </View>
      </View>
      <Text style={[styles.labelText, styles.labelTypo1]}>Account</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  segment4FlexBox1: {
    justifyContent: "center",
    alignItems: "center",
  },
  labelTypo1: {
    textAlign: "center",
    fontFamily: FontFamily.m3LabelLarge,
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 1,
  },
  icon: {
    width: 26,
    height: 30,
    zIndex: 0,
    overflow: "hidden",
  },
  badgeLabel: {
    marginTop: -7,
    marginLeft: -7,
    top: "50%",
    left: "50%",
    fontSize: FontSize.size_2xs,
    color: Color.white,
    display: "flex",
    width: 14,
    height: 14,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    top: 2,
    left: 35,
    borderRadius: Border.br_81xl,
    backgroundColor: Color.colorFirebrick_100,
    width: 12,
    height: 12,
    display: "none",
    zIndex: 1,
    position: "absolute",
    overflow: "hidden",
  },
  stateLayer: {
    width: 64,
    height: 32,
    flexDirection: "row",
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_9xs,
  },
  iconContainer: {
    borderRadius: Border.br_base,
    backgroundColor: Color.colorLightblue,
    overflow: "hidden",
  },
  labelText: {
    alignSelf: "stretch",
    fontSize: FontSize.level2Medium12_size,
    color: Color.colorDarkslateblue_200,
    marginTop: 4,
  },
  segment4: {
    width: 90,
    paddingTop: Padding.p_xs,
    paddingBottom: Padding.p_base,
  },
});

export default Segment41;
