import * as React from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Color, FontFamily, Padding, Border, FontSize } from "../GlobalStyles";

const BookingsHistory = () => {
  return (
    <View style={styles.bookingsHistory}>
      <StatusBar style={styles.barLayout} barStyle="default" />
      <ScrollView
        style={styles.body}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.bodyScrollViewContent}
      >
        <View style={styles.bookings}>
          <View style={styles.tag} />
          <Text style={[styles.bookings1, styles.serbisyouTypo]}>Bookings</Text>
          <Pressable style={[styles.searchBtn, styles.tabWrapperFlexBox]}>
            <Image
              style={styles.vectorIcon}
              contentFit="cover"
              source={require("../assets/vector7.png")}
            />
          </Pressable>
        </View>
        <View style={[styles.historyTabs, styles.historySpaceBlock]}>
          <View style={styles.tabGroup} />
          <View style={styles.divider}>
            <View style={[styles.divider1, styles.divider1Layout]} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1a244d",
  },
  bodyScrollViewContent: {
    flexDirection: "column",
    paddingHorizontal: 0,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  barLayout: {
    width: 375,
    backgroundColor: Color.white,
  },
  viewFlexBox: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  serbisyouTypo: {
    textAlign: "left",
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
  },
  tabWrapperFlexBox: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  locationBtnFlexBox: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  currentLocationFlexBox: {
    textAlign: "right",
    color: Color.white,
    flex: 1,
  },
  historySpaceBlock: {
    marginTop: 15,
    alignSelf: "stretch",
    backgroundColor: Color.white,
  },
  tabSpaceBlock: {
    paddingVertical: Padding.p_sm,
    zIndex: 0,
    paddingHorizontal: 0,
    alignSelf: "stretch",
  },
  labelTypo1: {
    textAlign: "center",
    fontWeight: "500",
  },
  indicatorPosition: {
    zIndex: 1,
    position: "absolute",
  },
  label1Clr: {
    color: Color.colorSteelblue_100,
    textAlign: "center",
  },
  divider1Layout: {
    height: 1,
    alignSelf: "stretch",
  },
  rectangleFrameShadowBox1: {
    padding: Padding.p_3xs,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: Border.br_3xs,
    alignItems: "center",
    alignSelf: "stretch",
  },
  parentSpaceBlock: {
    marginLeft: 5,
    justifyContent: "center",
  },
  messageBtnSpaceBlock: {
    marginTop: 9,
    alignSelf: "stretch",
  },
  rejectedFlexBox: {
    paddingVertical: Padding.p_7xs,
    paddingHorizontal: Padding.p_3xs,
    borderRadius: Border.br_6xs,
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  iconLayout1: {
    height: 23,
    width: 23,
    zIndex: 1,
    position: "absolute",
    overflow: "hidden",
  },
  frameSpaceBlock: {
    paddingTop: Padding.p_xl,
    alignSelf: "stretch",
  },
  dateTimeTypo: {
    fontFamily: FontFamily.title4Regular18,
    lineHeight: 24,
    letterSpacing: -0.1,
    color: Color.colorTypographyContentIconsBlack02,
    textAlign: "left",
  },
  textTypo: {
    color: Color.colorDarkslategray_400,
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
    fontSize: FontSize.typographyTaglineSmallRegular_size,
    textAlign: "right",
  },
  frameGroupFlexBox: {
    paddingHorizontal: Padding.p_8xs,
    paddingVertical: 0,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  btnBorder: {
    borderWidth: 1.6,
    borderColor: Color.colorSteelblue_100,
    borderRadius: Border.br_xs,
    borderStyle: "solid",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  textLayout: {
    lineHeight: 24,
    letterSpacing: -0.1,
  },
  labelTypo: {
    marginTop: 4,
    lineHeight: 16,
    letterSpacing: 1,
    fontSize: FontSize.level2Medium12_size,
    textAlign: "center",
    fontFamily: FontFamily.m3LabelLarge,
    fontWeight: "500",
    alignSelf: "stretch",
  },
  segmentSpaceBlock: {
    paddingBottom: Padding.p_base,
    paddingTop: Padding.p_xs,
    width: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainerFlexBox: {
    borderRadius: Border.br_base,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  iconLayout: {
    height: 30,
    width: 26,
    overflow: "hidden",
  },
  tag: {
    borderRadius: Border.br_9xs,
    width: 4,
    backgroundColor: Color.colorSteelblue_100,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  bookings1: {
    fontSize: FontSize.size_5xl,
    letterSpacing: -0.5,
    color: Color.neutral07,
    marginLeft: 10,
    flex: 1,
  },
  vectorIcon: {
    width: 20,
    height: 20,
  },
  searchBtn: {
    marginLeft: 10,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  bookings: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_base,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  tabGroup: {
    flexDirection: "row",
    alignSelf: "stretch",
  },
  divider1: {
    borderColor: Color.m3SysLightSurfaceVariant,
    borderTopWidth: 1,
    borderStyle: "solid",
    height: 1,
  },
  divider: {
    justifyContent: "center",
    alignSelf: "stretch",
  },
  historyTabs: {
    paddingVertical: 0,
    paddingHorizontal: Padding.p_base,
  },
  body: {
    alignSelf: "stretch",
    flex: 1,
    backgroundColor: Color.white,
  },
  bookingsHistory: {
    height: 812,
    width: "100%",
    flex: 1,
    backgroundColor: Color.white,
  },
});

export default BookingsHistory;
