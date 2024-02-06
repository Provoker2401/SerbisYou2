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
import { Color, Padding, FontFamily, FontSize, Border } from "../GlobalStyles";

const EmptyBookingsActive = () => {
  return (
    <View style={styles.emptyBookingsActive}>
      <StatusBar style={styles.barLayout} barStyle="default" />
      <ScrollView
        style={styles.body}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.bodyScrollViewContent}
      >
        <View style={[styles.bookings, styles.stateFlexBox1]}>
          <View style={styles.tag} />
          <Text style={[styles.bookings1, styles.bookingsTypo]}>Bookings</Text>
          <View style={styles.vectorWrapper}>
            <Image
              style={styles.vectorIcon}
              contentFit="cover"
              source={require("../assets/vector7.png")}
            />
          </View>
        </View>
        <View style={[styles.activeTabs, styles.activeTabsSpaceBlock]}>
          <View style={styles.tabGroup}>
            <View style={styles.tab1}>
              <View style={[styles.stateLayer, styles.stateFlexBox1]}>
                <View style={[styles.tabContents, styles.tabSpaceBlock]}>
                  <Text style={styles.label}>Active</Text>
                </View>
                <View style={[styles.indicator, styles.badgePosition]} />
              </View>
            </View>
            <View style={styles.tab1}>
              <View style={[styles.stateLayer1, styles.stateFlexBox1]}>
                <View style={[styles.tabContents1, styles.tabSpaceBlock]}>
                  <Text style={[styles.label1, styles.label1Typo]}>
                    History
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.divider}>
            <View style={styles.divider1} />
          </View>
        </View>
        <View style={styles.activeTabsSpaceBlock}>
          <View style={styles.componentsBookingsInner}>
            <View style={styles.frameParent}>
              <View style={styles.componentsBookingsInner}>
                <Image
                  style={styles.component13Icon}
                  contentFit="cover"
                  source={require("../assets/component-132.png")}
                />
              </View>
              <View style={styles.frameWrapperFlexBox}>
                <Text style={[styles.noUpcomingBookings, styles.bookingsTypo]}>
                  No Upcoming Bookings
                </Text>
                <Text
                  style={[
                    styles.currentlyYouDont,
                    styles.viewAllServicesLayout,
                  ]}
                >
                  Currently you don’t have any upcoming order. Place and track
                  your orders from here.
                </Text>
              </View>
              <View style={[styles.frameWrapper, styles.frameWrapperFlexBox]}>
                <View style={styles.componentsbuttonWrapper}>
                  <Pressable style={styles.componentsbutton}>
                    <Text
                      style={[
                        styles.viewAllServices,
                        styles.viewAllServicesLayout,
                      ]}
                    >
                      Make a Booking
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
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
  locationBtnFlexBox: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  currentLocationFlexBox: {
    textAlign: "right",
    color: Color.white,
    flex: 1,
  },
  stateFlexBox1: {
    paddingHorizontal: Padding.p_base,
    alignItems: "center",
    alignSelf: "stretch",
  },
  bookingsTypo: {
    color: Color.neutral07,
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
  },
  activeTabsSpaceBlock: {
    marginTop: 15,
    paddingVertical: 0,
    paddingHorizontal: Padding.p_base,
    alignItems: "center",
    alignSelf: "stretch",
  },
  tabSpaceBlock: {
    paddingVertical: Padding.p_sm,
    paddingHorizontal: 0,
    alignSelf: "stretch",
  },
  badgePosition: {
    zIndex: 1,
    position: "absolute",
  },
  label1Typo: {
    color: Color.colorTypographyContentIconsBlack02,
    fontSize: FontSize.m3LabelLarge_size,
    fontWeight: "500",
  },
  viewAllServicesLayout: {
    lineHeight: 24,
    letterSpacing: -0.1,
    textAlign: "center",
  },
  frameWrapperFlexBox: {
    marginTop: 32,
    alignItems: "center",
    alignSelf: "stretch",
  },
  segmentFlexBox: {
    paddingBottom: Padding.p_base,
    paddingTop: Padding.p_xs,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  labelTypo: {
    marginTop: 4,
    fontSize: FontSize.level2Medium12_size,
    lineHeight: 16,
    letterSpacing: 1,
    fontFamily: FontFamily.m3LabelLarge,
    textAlign: "center",
    fontWeight: "500",
    alignSelf: "stretch",
  },
  stateFlexBox: {
    paddingVertical: Padding.p_9xs,
    height: 32,
    width: 64,
    paddingHorizontal: Padding.p_xl,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  iconOutlineLayout: {
    width: 24,
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
    marginLeft: 10,
    textAlign: "left",
    flex: 1,
  },
  vectorIcon: {
    width: 20,
    height: 20,
  },
  vectorWrapper: {
    marginLeft: 10,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  bookings: {
    paddingVertical: Padding.p_3xs,
    flexDirection: "row",
  },
  label: {
    fontWeight: "800",
    fontFamily: FontFamily.robotoBlack,
    color: Color.colorSteelblue_100,
    textAlign: "center",
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: FontSize.m3LabelLarge_size,
  },
  tabContents: {
    zIndex: 0,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  indicator: {
    right: 0,
    bottom: 0,
    left: 0,
    height: 2,
    backgroundColor: Color.colorSteelblue_100,
  },
  stateLayer: {
    paddingVertical: 0,
    justifyContent: "flex-end",
  },
  tab1: {
    overflow: "hidden",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
    backgroundColor: Color.white,
  },
  label1: {
    fontFamily: FontFamily.m3LabelLarge,
    color: Color.colorTypographyContentIconsBlack02,
    textAlign: "center",
    lineHeight: 20,
    letterSpacing: 0,
  },
  tabContents1: {
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  stateLayer1: {
    paddingVertical: 0,
    justifyContent: "flex-end",
  },
  tabGroup: {
    flexDirection: "row",
    alignSelf: "stretch",
  },
  divider1: {
    borderStyle: "solid",
    borderColor: Color.m3SysLightSurfaceVariant,
    borderTopWidth: 1,
    height: 1,
    alignSelf: "stretch",
  },
  divider: {
    justifyContent: "center",
    alignSelf: "stretch",
  },
  activeTabs: {
    justifyContent: "center",
    backgroundColor: Color.white,
  },
  component13Icon: {
    width: 93,
    height: 90,
  },
  componentsBookingsInner: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  noUpcomingBookings: {
    lineHeight: 26,
    textAlign: "center",
    fontSize: FontSize.title3Bold20_size,
    color: Color.neutral07,
    alignSelf: "stretch",
  },
  currentlyYouDont: {
    marginTop: 10,
    color: Color.colorTypographyContentIconsBlack02,
    fontSize: FontSize.m3LabelLarge_size,
    fontWeight: "500",
    fontFamily: FontFamily.level2Medium12,
    alignSelf: "stretch",
  },
  viewAllServices: {
    fontSize: FontSize.body1Semibold_size,
    color: Color.neutral01,
    width: 122,
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    letterSpacing: -0.1,
  },
  componentsbutton: {
    backgroundColor: Color.colorDarkslategray_900,
    paddingHorizontal: Padding.p_3xl,
    paddingVertical: Padding.p_xs,
    borderRadius: Border.br_5xs,
    flexDirection: "row",
  },
  componentsbuttonWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  frameWrapper: {
    paddingHorizontal: Padding.p_51xl,
    paddingVertical: 0,
    justifyContent: "center",
  },
  frameParent: {
    paddingVertical: Padding.p_121xl,
    paddingHorizontal: Padding.p_xl,
    borderRadius: Border.br_5xs,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: Color.white,
  },
  body: {
    alignSelf: "stretch",
    flex: 1,
  },
  emptyBookingsActive: {
    width: "100%",
    height: 812,
    flex: 1,
    backgroundColor: Color.white,
  },
});

export default EmptyBookingsActive;
