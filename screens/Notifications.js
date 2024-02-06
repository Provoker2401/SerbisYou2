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

const Notifications = () => {
  return (
    <View style={styles.notifications}>
      <StatusBar barStyle="default" />
      <ScrollView
        style={styles.body}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.bodyScrollViewContent}
      >
        <View style={styles.notification}>
          <View style={styles.tag} />
          <Text style={styles.notification1}>Notification</Text>
          <View style={styles.right}>
            <Pressable style={styles.recentBtn}>
              <Text style={styles.recent}>Recent</Text>
              <Image
                style={[styles.iconOutline, styles.iconLayout1]}
                contentFit="cover"
                source={require("../assets/icon-outline.png")}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.bodyInner}>
          <View style={[styles.frameParent, styles.frameParentFlexBox]}>
            <View style={styles.todayWrapper}>
              <Text style={[styles.today, styles.todayFlexBox]}>Today</Text>
            </View>
            <View style={[styles.orderAccepted, styles.orderSpaceBlock]}>
              <View style={[styles.iconWrapper, styles.frameParentFlexBox]}>
                <Image
                  style={styles.iconLayout1}
                  contentFit="cover"
                  source={require("../assets/icon13.png")}
                />
              </View>
              <View style={styles.bookingAcceptedParent}>
                <Text style={[styles.bookingAccepted, styles.todayFlexBox]}>
                  Booking Accepted
                </Text>
                <Text style={styles.yourBookingWas}>
                  Your booking was accepted
                </Text>
              </View>
              <Pressable style={[styles.tripleDotBtn, styles.tripleSpaceBlock]}>
                <View style={styles.ellipseParent}>
                  <Image
                    style={styles.frameLayout}
                    contentFit="cover"
                    source={require("../assets/ellipse-191.png")}
                  />
                  <Image
                    style={[styles.frameInner, styles.frameLayout]}
                    contentFit="cover"
                    source={require("../assets/ellipse-191.png")}
                  />
                  <Image
                    style={[styles.frameInner, styles.frameLayout]}
                    contentFit="cover"
                    source={require("../assets/ellipse-191.png")}
                  />
                </View>
              </Pressable>
            </View>
            <View style={[styles.orderAccepted, styles.orderSpaceBlock]}>
              <View style={[styles.iconWrapper, styles.frameParentFlexBox]}>
                <Image
                  style={styles.iconLayout1}
                  contentFit="cover"
                  source={require("../assets/icon13.png")}
                />
              </View>
              <View style={styles.bookingAcceptedParent}>
                <Text style={[styles.bookingAccepted, styles.todayFlexBox]}>
                  Booking Accepted
                </Text>
                <Text style={styles.yourBookingWas}>
                  Your booking was accepted
                </Text>
              </View>
              <Pressable style={[styles.tripleDotBtn, styles.tripleSpaceBlock]}>
                <View style={styles.ellipseParent}>
                  <Image
                    style={styles.frameLayout}
                    contentFit="cover"
                    source={require("../assets/ellipse-191.png")}
                  />
                  <Image
                    style={[styles.frameInner, styles.frameLayout]}
                    contentFit="cover"
                    source={require("../assets/ellipse-191.png")}
                  />
                  <Image
                    style={[styles.frameInner, styles.frameLayout]}
                    contentFit="cover"
                    source={require("../assets/ellipse-191.png")}
                  />
                </View>
              </Pressable>
            </View>
            <View style={[styles.orderAccepted, styles.orderSpaceBlock]}>
              <View style={[styles.iconWrapper, styles.frameParentFlexBox]}>
                <Image
                  style={styles.iconLayout1}
                  contentFit="cover"
                  source={require("../assets/icon13.png")}
                />
              </View>
              <View style={styles.bookingAcceptedParent}>
                <Text style={[styles.bookingAccepted, styles.todayFlexBox]}>
                  Booking Accepted
                </Text>
                <Text style={styles.yourBookingWas}>
                  Your booking was accepted
                </Text>
              </View>
              <Pressable style={[styles.tripleDotBtn, styles.tripleSpaceBlock]}>
                <View style={styles.ellipseParent}>
                  <Image
                    style={styles.frameLayout}
                    contentFit="cover"
                    source={require("../assets/ellipse-191.png")}
                  />
                  <Image
                    style={[styles.frameInner, styles.frameLayout]}
                    contentFit="cover"
                    source={require("../assets/ellipse-191.png")}
                  />
                  <Image
                    style={[styles.frameInner, styles.frameLayout]}
                    contentFit="cover"
                    source={require("../assets/ellipse-191.png")}
                  />
                </View>
              </Pressable>
            </View>
            <View style={[styles.yesterdayWrapper, styles.orderSpaceBlock]}>
              <Text style={[styles.today, styles.todayFlexBox]}>Yesterday</Text>
            </View>
            <View style={[styles.orderCanceled, styles.orderSpaceBlock]}>
              <View style={[styles.iconWrapper, styles.frameParentFlexBox]}>
                <Image
                  style={styles.iconLayout1}
                  contentFit="cover"
                  source={require("../assets/icon13.png")}
                />
              </View>
              <View style={styles.bookingAcceptedParent}>
                <Text style={[styles.bookingAccepted, styles.todayFlexBox]}>
                  Credit Card Connected
                </Text>
                <Text style={styles.yourBookingWas}>
                  Credit Card has been linked
                </Text>
              </View>
              <Pressable style={[styles.tripleDotBtn, styles.tripleSpaceBlock]}>
                <View style={styles.ellipseParent}>
                  <Image
                    style={styles.frameLayout}
                    contentFit="cover"
                    source={require("../assets/ellipse-191.png")}
                  />
                  <Image
                    style={[styles.frameInner, styles.frameLayout]}
                    contentFit="cover"
                    source={require("../assets/ellipse-191.png")}
                  />
                  <Image
                    style={[styles.frameInner, styles.frameLayout]}
                    contentFit="cover"
                    source={require("../assets/ellipse-191.png")}
                  />
                </View>
              </Pressable>
            </View>
            <View style={[styles.orderCanceled, styles.orderSpaceBlock]}>
              <View style={[styles.iconWrapper, styles.frameParentFlexBox]}>
                <Image
                  style={styles.iconLayout1}
                  contentFit="cover"
                  source={require("../assets/icon13.png")}
                />
              </View>
              <View style={styles.bookingAcceptedParent}>
                <Text style={[styles.bookingAccepted, styles.todayFlexBox]}>
                  Account Setup Successful
                </Text>
                <Text style={styles.yourBookingWas}>
                  Your account has been created
                </Text>
              </View>
              <Pressable style={[styles.tripleDotBtn, styles.tripleSpaceBlock]}>
                <View style={styles.ellipseParent}>
                  <Image
                    style={styles.frameLayout}
                    contentFit="cover"
                    source={require("../assets/ellipse-191.png")}
                  />
                  <Image
                    style={[styles.frameInner, styles.frameLayout]}
                    contentFit="cover"
                    source={require("../assets/ellipse-191.png")}
                  />
                  <Image
                    style={[styles.frameInner, styles.frameLayout]}
                    contentFit="cover"
                    source={require("../assets/ellipse-191.png")}
                  />
                </View>
              </Pressable>
            </View>
            <View style={[styles.orderCanceled, styles.orderSpaceBlock]}>
              <View style={[styles.iconWrapper, styles.frameParentFlexBox]}>
                <Image
                  style={styles.iconLayout1}
                  contentFit="cover"
                  source={require("../assets/icon13.png")}
                />
              </View>
              <View style={styles.bookingAcceptedParent}>
                <Text style={[styles.bookingAccepted, styles.todayFlexBox]}>
                  Booking Accepted
                </Text>
                <Text style={styles.yourBookingWas}>
                  Your booking was accepted
                </Text>
              </View>
              <Pressable style={styles.tripleSpaceBlock}>
                <View style={styles.ellipseParent}>
                  <Image
                    style={styles.frameLayout}
                    contentFit="cover"
                    source={require("../assets/ellipse-191.png")}
                  />
                  <Image
                    style={[styles.frameInner, styles.frameLayout]}
                    contentFit="cover"
                    source={require("../assets/ellipse-191.png")}
                  />
                  <Image
                    style={[styles.frameInner, styles.frameLayout]}
                    contentFit="cover"
                    source={require("../assets/ellipse-191.png")}
                  />
                </View>
              </Pressable>
            </View>
            <View style={[styles.orderCanceled, styles.orderSpaceBlock]}>
              <View style={[styles.iconWrapper, styles.frameParentFlexBox]}>
                <Image
                  style={styles.iconLayout1}
                  contentFit="cover"
                  source={require("../assets/icon13.png")}
                />
              </View>
              <View style={styles.bookingAcceptedParent}>
                <Text style={[styles.bookingAccepted, styles.todayFlexBox]}>
                  Booking Accepted
                </Text>
                <Text style={styles.yourBookingWas}>
                  Your booking was accepted
                </Text>
              </View>
              <Pressable style={[styles.tripleDotBtn, styles.tripleSpaceBlock]}>
                <View style={styles.ellipseParent}>
                  <Image
                    style={styles.frameLayout}
                    contentFit="cover"
                    source={require("../assets/ellipse-191.png")}
                  />
                  <Image
                    style={[styles.frameInner, styles.frameLayout]}
                    contentFit="cover"
                    source={require("../assets/ellipse-191.png")}
                  />
                  <Image
                    style={[styles.frameInner, styles.frameLayout]}
                    contentFit="cover"
                    source={require("../assets/ellipse-191.png")}
                  />
                </View>
              </Pressable>
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
  locationWrapperFlexBox: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  currentLocationFlexBox: {
    textAlign: "right",
    color: Color.white,
    flex: 1,
  },
  iconLayout1: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    alignSelf: "stretch",
    width: "100%",
    flex: 1,
  },
  frameParentFlexBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  todayFlexBox: {
    color: Color.colorGray90,
    textAlign: "left",
    alignSelf: "stretch",
  },
  orderSpaceBlock: {
    marginTop: 8,
    alignSelf: "stretch",
  },
  tripleSpaceBlock: {
    paddingVertical: Padding.p_9xs,
    paddingHorizontal: Padding.p_5xs,
    marginLeft: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  frameLayout: {
    height: 2,
    width: 2,
  },
  labelTypo: {
    marginTop: 4,
    textAlign: "center",
    fontFamily: FontFamily.m3LabelLarge,
    lineHeight: 16,
    letterSpacing: 1,
    fontSize: FontSize.level2Medium12_size,
    fontWeight: "500",
    alignSelf: "stretch",
  },
  segmentSpaceBlock: {
    opacity: 0.8,
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
    backgroundColor: Color.colorSteelblue_100,
    width: 4,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  notification1: {
    fontSize: FontSize.size_5xl,
    letterSpacing: -0.5,
    color: Color.neutral07,
    marginLeft: 10,
    textAlign: "left",
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    flex: 1,
  },
  recent: {
    letterSpacing: -0.2,
    lineHeight: 17,
    color: Color.colorSteelblue_100,
    fontSize: FontSize.level2Medium12_size,
    fontFamily: FontFamily.level2Medium12,
    fontWeight: "500",
    textAlign: "left",
  },
  iconOutline: {
    marginLeft: 4,
  },
  recentBtn: {
    paddingHorizontal: Padding.p_3xs,
    borderRadius: Border.br_81xl,
    alignItems: "flex-end",
    paddingVertical: Padding.p_5xs,
    flexDirection: "row",
    alignSelf: "stretch",
    backgroundColor: Color.white,
  },
  right: {
    width: 77,
    marginLeft: 10,
    alignItems: "flex-end",
  },
  notification: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_base,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  today: {
    fontSize: FontSize.title4Regular18_size,
    letterSpacing: 0.9,
    fontWeight: "600",
    fontFamily: FontFamily.georamaSemiBold,
  },
  todayWrapper: {
    paddingBottom: Padding.p_3xs,
    alignSelf: "stretch",
  },
  iconWrapper: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorWhitesmoke_600,
    width: 34,
    height: 34,
    padding: Padding.p_6xs,
    justifyContent: "center",
    flexDirection: "row",
  },
  bookingAccepted: {
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    fontFamily: FontFamily.typographyParagraphSmallMedium,
    fontWeight: "500",
    color: Color.colorGray90,
  },
  yourBookingWas: {
    fontFamily: FontFamily.typographyTaglineSmallRegular,
    color: Color.colorGray60,
    marginTop: 2,
    fontSize: FontSize.typographyTaglineSmallRegular_size,
    textAlign: "left",
    alignSelf: "stretch",
  },
  bookingAcceptedParent: {
    marginLeft: 16,
    justifyContent: "center",
    flex: 1,
  },
  frameInner: {
    marginTop: 2,
  },
  ellipseParent: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  tripleDotBtn: {
    overflow: "hidden",
  },
  orderAccepted: {
    padding: Padding.p_xs,
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Color.colorLightskyblue,
  },
  yesterdayWrapper: {
    paddingVertical: Padding.p_3xs,
    marginTop: 8,
    paddingHorizontal: 0,
  },
  orderCanceled: {
    padding: Padding.p_xs,
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Color.white,
  },
  frameParent: {
    justifyContent: "center",
    alignSelf: "stretch",
  },
  bodyInner: {
    marginTop: 15,
    paddingVertical: 0,
    paddingHorizontal: Padding.p_base,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  body: {
    alignSelf: "stretch",
    flex: 1,
  },
  notifications: {
    height: 812,
    width: "100%",
    flex: 1,
    backgroundColor: Color.white,
  },
});

export default Notifications;
