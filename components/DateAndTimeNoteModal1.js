import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FontFamily, FontSize, Border, Color, Padding } from "../GlobalStyles";

const DateAndTimeNoteModal1 = () => {
  return (
    <View style={styles.dateAndTimeNoteModal}>
      <View style={styles.dateAndTimeNoteModalChild} />
      <Text style={styles.note}>nOTE:</Text>
      <Text
        style={styles.settingATime}
      >{`Setting a time as soon as possible will not guarantee an immediate booking of a service provider `}</Text>
      <View style={styles.componentsbutton}>
        <Text style={[styles.viewAllServices, styles.okTypo]} />
      </View>
      <Text style={[styles.ok, styles.okTypo]}>OK</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  okTypo: {
    fontFamily: FontFamily.title2Bold32,
    lineHeight: 24,
    letterSpacing: -0.1,
    fontSize: FontSize.body1Semibold_size,
    textAlign: "center",
    fontWeight: "700",
  },
  dateAndTimeNoteModalChild: {
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: Border.br_5xl,
    backgroundColor: Color.white,
    position: "absolute",
  },
  note: {
    height: "10.05%",
    width: "39.14%",
    top: "11.11%",
    left: "30.89%",
    fontSize: FontSize.title3Bold20_size,
    textTransform: "capitalize",
    fontFamily: FontFamily.workSansBold,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    color: Color.colorBlack,
    fontWeight: "700",
    position: "absolute",
  },
  settingATime: {
    height: "35.98%",
    width: "87.77%",
    top: "25.93%",
    left: "5.2%",
    fontWeight: "500",
    fontFamily: FontFamily.workSansMedium,
    fontSize: FontSize.body1Semibold_size,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    color: Color.colorBlack,
    position: "absolute",
  },
  viewAllServices: {
    color: Color.neutral01,
  },
  componentsbutton: {
    height: "23.81%",
    width: "86.24%",
    top: "68.25%",
    right: "6.57%",
    bottom: "7.94%",
    left: "7.19%",
    borderRadius: Border.br_5xs,
    backgroundColor: Color.colorDarkslategray_900,
    flexDirection: "row",
    paddingHorizontal: Padding.p_3xl,
    paddingVertical: Padding.p_xs,
    position: "absolute",
  },
  ok: {
    height: "10.58%",
    width: "12.54%",
    top: "74.6%",
    left: "43.73%",
    color: Color.white,
    position: "absolute",
  },
  dateAndTimeNoteModal: {
    width: 327,
    height: 189,
  },
});

export default DateAndTimeNoteModal1;
