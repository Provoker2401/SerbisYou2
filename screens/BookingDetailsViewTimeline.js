import React, { useState, useCallback } from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BookingTimelineModal from "../components/BookingTimelineModal";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, FontFamily, FontSize, Border } from "../GlobalStyles";

const BookingDetailsViewTimeline = ({ onClose }) => {
  const [viewTimelineBtnVisible, setViewTimelineBtnVisible] = useState(false);
  const navigation = useNavigation();

  const openViewTimelineBtn = useCallback(() => {
    setViewTimelineBtnVisible(true);
  }, []);

  const closeViewTimelineBtn = useCallback(() => {
    setViewTimelineBtnVisible(false);
  }, []);

  return (
    <>
      <View style={styles.bookingDetailsViewTimeline}>
        <View style={styles.statusBarLight}>
          <Image
            style={styles.icons}
            contentFit="cover"
            source={require("../assets/icons.png")}
          />
          <Text style={[styles.time, styles.timeFlexBox]}>9:41</Text>
        </View>
        <ScrollView
          style={styles.body}
          indicatorStyle="default"
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={false}
          contentContainerStyle={styles.bodyScrollViewContent}
        >
          <View style={[styles.bodyInner, styles.bodyInnerFlexBox]}>
            <View style={styles.frameParent}>
              <View style={styles.bookingSpaceBlock}>
                <View style={styles.bookingDetailsLabel}>
                  <View style={styles.bookingIdWrapper}>
                    <Text style={styles.bookingId}>Booking ID:</Text>
                  </View>
                  <View style={styles.ljkhParent}>
                    <Text style={styles.ljkh}>#123456789LJKH</Text>
                    <Pressable
                      style={[styles.copyButton, styles.bodyInnerFlexBox]}
                    >
                      <Image
                        style={styles.vectorIcon}
                        contentFit="cover"
                        source={require("../assets/vector5.png")}
                      />
                    </Pressable>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.bookingDetailsLabelParent,
                  styles.bookingSpaceBlock,
                ]}
              >
                <View style={styles.bookingDetailsLabel}>
                  <Text style={styles.bookingId}>Booking details</Text>
                </View>
                <View
                  style={[styles.dateAndTimeFrame, styles.dateFrameSpaceBlock]}
                >
                  <View style={styles.dateRangeLightWrapper}>
                    <Image
                      style={styles.dateRangeLightIcon}
                      contentFit="cover"
                      source={require("../assets/date-range-light1.png")}
                    />
                  </View>
                  <View style={[styles.frameGroup, styles.frameSpaceBlock]}>
                    <View style={styles.frame}>
                      <View style={styles.dateAndTimeWrapper}>
                        <Text
                          style={[styles.dateAndTime, styles.dateAndTimeTypo]}
                        >
                          Date and Time
                        </Text>
                      </View>
                    </View>
                    <View style={styles.frame}>
                      <Text style={[styles.august112023, styles.textTypo]}>
                        August 11, 2023 | 7:30 - 10:30AM
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={[styles.dateAndTimeFrame, styles.dateFrameSpaceBlock]}
                >
                  <View style={styles.dateAndTimeFrameInnerFlexBox}>
                    <Image
                      style={styles.markersNearPinletMarker}
                      contentFit="cover"
                      source={require("../assets/markers--near-pinlet-marker2.png")}
                    />
                  </View>
                  <View style={[styles.frameGroup, styles.frameSpaceBlock]}>
                    <View style={styles.frame}>
                      <View style={styles.dateAndTimeWrapper}>
                        <Text
                          style={[styles.dateAndTime, styles.dateAndTimeTypo]}
                        >
                          Address
                        </Text>
                      </View>
                    </View>
                    <View style={styles.frame}>
                      <Text style={[styles.august112023, styles.textTypo]}>
                        Nasipit, Talamban, Cebu City
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={[styles.dateAndTimeFrame, styles.dateFrameSpaceBlock]}
                >
                  <View style={styles.dateRangeLightWrapper}>
                    <Image
                      style={styles.dateRangeLightIcon}
                      contentFit="cover"
                      source={require("../assets/gps-2.png")}
                    />
                  </View>
                  <View style={[styles.frameGroup, styles.frameSpaceBlock]}>
                    <View style={styles.frame}>
                      <View style={styles.dateAndTimeWrapper}>
                        <Text
                          style={[styles.dateAndTime, styles.dateAndTimeTypo]}
                        >
                          Distance Radius
                        </Text>
                      </View>
                    </View>
                    <View style={styles.frame}>
                      <Text style={[styles.august112023, styles.textTypo]}>
                        5 kilometers
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.bookingDetailsLabelGroup,
                  styles.dateAndTimeFrame5FlexBox,
                ]}
              >
                <View
                  style={[
                    styles.bookingDetailsLabel2,
                    styles.subtotalWrapperFlexBox,
                  ]}
                >
                  <Text style={styles.bookingId}>Service details</Text>
                </View>
                <View
                  style={[
                    styles.dateAndTimeFrame1,
                    styles.subtotalWrapperFlexBox,
                  ]}
                >
                  <View style={styles.dateRangeLightWrapper}>
                    <Image
                      style={styles.plumbingInstallationPic}
                      contentFit="cover"
                      source={require("../assets/plumbing-installation-pic1.png")}
                    />
                  </View>
                  <View style={[styles.frameGroup, styles.frameSpaceBlock]}>
                    <View style={styles.frame}>
                      <View style={styles.dateAndTimeWrapper}>
                        <Text
                          style={[styles.dateAndTime, styles.dateAndTimeTypo]}
                        >
                          Plumbing Installation
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.subcategoriesFrame}>
                  <View style={styles.dateFrameFlexBox}>
                    <View
                      style={[
                        styles.dateAndTimeFrameInner,
                        styles.dateAndTimeFrameInnerFlexBox,
                      ]}
                    >
                      <View style={styles.frameWrapper1}>
                        <View style={styles.frameWrapper2}>
                          <View style={styles.bookingDetailsLabel}>
                            <Text style={[styles.text, styles.textTypo]}>
                              2
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={[styles.frameGroup, styles.frameSpaceBlock]}>
                      <View style={styles.frame}>
                        <Text style={[styles.toiletSystem, styles.paypalTypo]}>
                          Toilet System
                        </Text>
                      </View>
                    </View>
                    <View
                      style={[styles.frameWrapper3, styles.frameSpaceBlock]}
                    >
                      <View style={styles.frame}>
                        <Text style={styles.text1}>₱2000.00</Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={[styles.dateAndTimeFrame3, styles.dateFrameFlexBox]}
                  >
                    <View
                      style={[
                        styles.dateAndTimeFrameInner,
                        styles.dateAndTimeFrameInnerFlexBox,
                      ]}
                    >
                      <View style={styles.frameWrapper1}>
                        <View style={styles.frameWrapper2}>
                          <View style={styles.bookingDetailsLabel}>
                            <Text style={[styles.text, styles.textTypo]}>
                              1
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={[styles.frameGroup, styles.frameSpaceBlock]}>
                      <View style={styles.frame}>
                        <Text style={[styles.toiletSystem, styles.paypalTypo]}>
                          Septic Tank
                        </Text>
                      </View>
                    </View>
                    <View
                      style={[styles.frameWrapper3, styles.frameSpaceBlock]}
                    >
                      <View style={styles.frame}>
                        <Text style={styles.text1}>₱1500.00</Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={[styles.dateAndTimeFrame3, styles.dateFrameFlexBox]}
                  >
                    <View
                      style={[
                        styles.dateAndTimeFrameInner,
                        styles.dateAndTimeFrameInnerFlexBox,
                      ]}
                    >
                      <View style={styles.frameWrapper1}>
                        <View style={styles.frameWrapper2}>
                          <View style={styles.bookingDetailsLabel}>
                            <Text style={[styles.text, styles.textTypo]}>
                              2
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={[styles.frameGroup, styles.frameSpaceBlock]}>
                      <View style={styles.frame}>
                        <Text style={[styles.toiletSystem, styles.paypalTypo]}>
                          Pressure Pump
                        </Text>
                      </View>
                    </View>
                    <View
                      style={[styles.frameWrapper3, styles.frameSpaceBlock]}
                    >
                      <View style={styles.frame}>
                        <Text style={styles.text1}>₱2500.00</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.vectorWrapper}>
                  <Image
                    style={[styles.frameChild, styles.iconLayout]}
                    contentFit="cover"
                    source={require("../assets/line-743.png")}
                  />
                </View>
                <View
                  style={[
                    styles.dateAndTimeFrame5,
                    styles.dateAndTimeFrame5FlexBox,
                  ]}
                >
                  <View style={styles.frameWrapper12}>
                    <View style={styles.frame}>
                      <View
                        style={[
                          styles.subtotalWrapper,
                          styles.subtotalWrapperFlexBox,
                        ]}
                      >
                        <Text style={[styles.subtotal, styles.text6Typo]}>
                          Subtotal
                        </Text>
                      </View>
                      <View style={styles.frameInner}>
                        <View style={styles.frame}>
                          <Text style={[styles.text6, styles.textLayout]}>
                            ₱6000.00
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.frameWrapper12}>
                    <View style={styles.frame}>
                      <View
                        style={[
                          styles.subtotalWrapper,
                          styles.subtotalWrapperFlexBox,
                        ]}
                      >
                        <Text style={[styles.subtotal, styles.text6Typo]}>
                          Distance Fee
                        </Text>
                      </View>
                      <View style={styles.frameInner}>
                        <View style={styles.frame}>
                          <Text style={[styles.text6, styles.textLayout]}>
                            ₱40.00
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.frameWrapper12}>
                    <View style={styles.frame}>
                      <View
                        style={[
                          styles.subtotalWrapper,
                          styles.subtotalWrapperFlexBox,
                        ]}
                      >
                        <Text style={[styles.totalInclVat, styles.text8Typo]}>
                          Total (incl. VAT)
                        </Text>
                      </View>
                      <View style={styles.frameInner}>
                        <View style={styles.frame}>
                          <Text style={[styles.text8, styles.text8Typo]}>
                            ₱6040.00
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.vectorWrapper}>
                  <Image
                    style={[styles.frameChild, styles.iconLayout]}
                    contentFit="cover"
                    source={require("../assets/line-744.png")}
                  />
                </View>
                <View style={styles.frameWrapper15}>
                  <View style={styles.frame}>
                    <View
                      style={[
                        styles.subtotalWrapper,
                        styles.subtotalWrapperFlexBox,
                      ]}
                    >
                      <Text style={[styles.paidWith, styles.paypalTypo]}>
                        Paid With
                      </Text>
                    </View>
                    <View style={styles.frameInner3}>
                      <View style={styles.frame}>
                        <Text style={[styles.paypal, styles.textLayout]}>
                          PayPal
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.bookingDetailsLabelGroup,
                  styles.dateAndTimeFrame5FlexBox,
                ]}
              >
                <View style={styles.bookingDetailsLabel}>
                  <Text style={styles.bookingId}>Service Provider Details</Text>
                </View>
                <View
                  style={[styles.dateAndTimeFrame, styles.dateFrameSpaceBlock]}
                >
                  <View style={styles.dateRangeLightWrapper}>
                    <Image
                      style={styles.image2358Icon}
                      contentFit="cover"
                      source={require("../assets/image-23582.png")}
                    />
                  </View>
                  <View style={[styles.frameParent1, styles.frameSpaceBlock]}>
                    <View style={styles.frameWrapper12}>
                      <View style={styles.frame}>
                        <View style={styles.dateAndTimeWrapper}>
                          <Text
                            style={[
                              styles.dummyProvider1,
                              styles.dateAndTimeTypo,
                            ]}
                          >
                            Dummy Provider #1
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.frameWrapper12}>
                      <View style={styles.frame}>
                        <View style={styles.dateAndTimeWrapper}>
                          <View style={styles.statusWrapper}>
                            <Text
                              style={[styles.status, styles.statusTypo]}
                            >{`Status: `}</Text>
                          </View>
                          <View style={styles.inTransitWrapper}>
                            <Text style={[styles.inTransit, styles.statusTypo]}>
                              In Transit
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.viewTimelineBtnParent}>
                <Pressable
                  style={[styles.viewTimelineBtn, styles.btnFlexBox]}
                  onPress={openViewTimelineBtn}
                >
                  <Text
                    style={[styles.viewAllServices, styles.bookingDetailsTypo]}
                  >
                    View Timeline
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.trackBookingBtn, styles.btnFlexBox]}
                  onPress={() => navigation.navigate("NavigationHomeService")}
                >
                  <Text
                    style={[styles.viewAllServices, styles.bookingDetailsTypo]}
                  >
                    Track Booking
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
        <BookingTimelineModal />
      </View>

      <Modal animationType="fade" transparent visible={viewTimelineBtnVisible}>
        <View style={styles.viewTimelineBtnOverlay}>
          <Pressable
            style={styles.viewTimelineBtnBg}
            onPress={closeViewTimelineBtn}
          />
          <BookingTimelineModal onClose={closeViewTimelineBtn} />
        </View>
      </Modal>
    </>
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
    justifyContent: "flex-end",
  },
  frameScrollViewContent: {
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  timeFlexBox: {
    textAlign: "left",
    color: Color.colorBlack,
  },
  iconLayout: {
    overflow: "hidden",
    width: "100%",
  },
  textClr: {
    color: Color.white,
    textAlign: "center",
  },
  bodyInnerFlexBox: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bookingSpaceBlock: {
    paddingVertical: Padding.p_8xs,
    paddingHorizontal: Padding.p_5xs,
    justifyContent: "center",
    alignSelf: "stretch",
    backgroundColor: Color.white,
  },
  dateFrameSpaceBlock: {
    paddingTop: Padding.p_3xs,
    marginTop: 5,
    paddingBottom: Padding.p_8xs,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  frameSpaceBlock: {
    marginLeft: 7,
    justifyContent: "center",
  },
  dateAndTimeTypo: {
    fontFamily: FontFamily.workSansMedium,
    fontWeight: "500",
    fontSize: FontSize.title4Regular18_size,
    textAlign: "left",
    flex: 1,
  },
  textTypo: {
    fontFamily: FontFamily.workSansRegular,
    textTransform: "capitalize",
    fontSize: FontSize.body1Semibold_size,
  },
  dateAndTimeFrame5FlexBox: {
    paddingTop: Padding.p_8xs,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  subtotalWrapperFlexBox: {
    paddingLeft: Padding.p_8xs,
    alignItems: "center",
    flexDirection: "row",
  },
  dateAndTimeFrameInnerFlexBox: {
    paddingHorizontal: Padding.p_9xs,
    paddingVertical: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  paypalTypo: {
    fontFamily: FontFamily.title4Regular18,
    flex: 1,
  },
  dateFrameFlexBox: {
    paddingHorizontal: 0,
    paddingVertical: Padding.p_8xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  text6Typo: {
    fontFamily: FontFamily.interLight,
    fontWeight: "300",
    fontSize: FontSize.body1Semibold_size,
    flex: 1,
  },
  textLayout: {
    lineHeight: 20,
    color: Color.neutral07,
    textAlign: "right",
  },
  text8Typo: {
    fontFamily: FontFamily.level2Medium12,
    fontWeight: "500",
    fontSize: FontSize.body1Semibold_size,
    flex: 1,
  },
  statusTypo: {
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    textAlign: "left",
    flex: 1,
  },
  btnFlexBox: {
    padding: Padding.p_xs,
    borderRadius: Border.br_mini,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  bookingDetailsTypo: {
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    fontSize: FontSize.title3Bold20_size,
  },
  icons: {
    top: 18,
    right: 14,
    width: 67,
    height: 11,
    position: "absolute",
  },
  time: {
    marginTop: -8,
    top: "50%",
    left: 32,
    letterSpacing: 0,
    lineHeight: 20,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "600",
    textAlign: "left",
    fontSize: FontSize.body1Semibold_size,
    position: "absolute",
  },
  statusBarLight: {
    width: 375,
    height: 44,
    backgroundColor: Color.white,
  },
  bookingId: {
    fontFamily: FontFamily.workSansSemiBold,
    color: Color.colorDarkslateblue_100,
    display: "flex",
    fontSize: FontSize.title3Bold20_size,
    alignItems: "center",
    alignSelf: "stretch",
    textAlign: "left",
    fontWeight: "600",
    flex: 1,
  },
  bookingIdWrapper: {
    width: 121,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  ljkh: {
    opacity: 0.89,
    textAlign: "right",
    fontFamily: FontFamily.workSansRegular,
    fontSize: FontSize.title3Bold20_size,
    color: Color.colorBlack,
    flex: 1,
  },
  vectorIcon: {
    width: 14,
    height: 16,
  },
  copyButton: {
    marginLeft: 10,
    flexDirection: "row",
  },
  ljkhParent: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  bookingDetailsLabel: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  dateRangeLightIcon: {
    height: 40,
    width: 40,
  },
  dateRangeLightWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  dateAndTime: {
    color: Color.colorBlack,
  },
  dateAndTimeWrapper: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  frame: {
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  august112023: {
    textTransform: "capitalize",
    textAlign: "left",
    color: Color.colorBlack,
    flex: 1,
  },
  frameGroup: {
    flex: 1,
  },
  dateAndTimeFrame: {
    marginTop: 5,
    paddingBottom: Padding.p_8xs,
    alignItems: "center",
    flexDirection: "row",
  },
  markersNearPinletMarker: {
    width: 32,
    height: 41,
  },
  bookingDetailsLabelParent: {
    marginTop: 10,
  },
  bookingDetailsLabel2: {
    justifyContent: "center",
    alignSelf: "stretch",
  },
  plumbingInstallationPic: {
    height: 42,
    width: 40,
  },
  dateAndTimeFrame1: {
    marginTop: 5,
    paddingBottom: Padding.p_8xs,
    paddingTop: Padding.p_3xs,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  text: {
    textTransform: "capitalize",
    textAlign: "center",
    color: Color.white,
  },
  frameWrapper2: {
    borderRadius: Border.br_5xs,
    backgroundColor: Color.colorDarkslateblue_200,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  frameWrapper1: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  dateAndTimeFrameInner: {
    width: 38,
  },
  toiletSystem: {
    fontSize: FontSize.m3LabelLarge_size,
    textTransform: "capitalize",
    textAlign: "left",
    color: Color.colorBlack,
  },
  text1: {
    fontSize: FontSize.level2Medium12_size,
    lineHeight: 16,
    color: Color.neutral07,
    fontFamily: FontFamily.title4Regular18,
    textAlign: "right",
    flex: 1,
  },
  frameWrapper3: {
    width: 68,
    alignItems: "flex-end",
  },
  dateAndTimeFrame3: {
    marginTop: 5,
  },
  subcategoriesFrame: {
    paddingLeft: Padding.p_21xl,
    marginTop: 5,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  frameChild: {
    maxWidth: "100%",
    maxHeight: "100%",
    alignSelf: "stretch",
    flex: 1,
  },
  vectorWrapper: {
    height: 1,
    marginTop: 5,
    alignItems: "center",
    alignSelf: "stretch",
  },
  subtotal: {
    textAlign: "left",
    color: Color.colorBlack,
  },
  subtotalWrapper: {
    flex: 1,
  },
  text6: {
    fontFamily: FontFamily.interLight,
    fontWeight: "300",
    fontSize: FontSize.body1Semibold_size,
    flex: 1,
  },
  frameInner: {
    width: 83,
    alignItems: "center",
  },
  frameWrapper12: {
    justifyContent: "center",
    alignSelf: "stretch",
  },
  totalInclVat: {
    textAlign: "left",
    color: Color.colorBlack,
  },
  text8: {
    lineHeight: 20,
    color: Color.neutral07,
    textAlign: "right",
  },
  dateAndTimeFrame5: {
    marginTop: 5,
    alignItems: "center",
  },
  paidWith: {
    textAlign: "left",
    color: Color.colorBlack,
    fontSize: FontSize.body1Semibold_size,
    fontFamily: FontFamily.title4Regular18,
  },
  paypal: {
    fontFamily: FontFamily.title4Regular18,
    flex: 1,
    fontSize: FontSize.body1Semibold_size,
  },
  frameInner3: {
    width: 196,
    alignItems: "center",
  },
  frameWrapper15: {
    marginTop: 5,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  bookingDetailsLabelGroup: {
    paddingLeft: Padding.p_10xs,
    paddingRight: Padding.p_5xs,
    paddingBottom: Padding.p_8xs,
    marginTop: 10,
    backgroundColor: Color.white,
  },
  image2358Icon: {
    height: 41,
    width: 40,
  },
  dummyProvider1: {
    color: Color.colorDarkslategray_900,
  },
  status: {
    fontFamily: FontFamily.bodyLgBodyLgRegular,
    color: Color.colorBlack,
  },
  statusWrapper: {
    width: 57,
    alignItems: "center",
    flexDirection: "row",
  },
  inTransit: {
    fontFamily: FontFamily.poppinsLight,
    color: Color.colorOrangered,
    fontWeight: "300",
    fontSize: FontSize.bodyLgBodyLgRegular_size,
  },
  inTransitWrapper: {
    marginLeft: 3,
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  frameParent1: {
    alignItems: "center",
    flex: 1,
  },
  viewTimelineBtnOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  viewTimelineBtnBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  viewAllServices: {
    letterSpacing: -0.2,
    lineHeight: 24,
    color: Color.neutral01,
    textAlign: "center",
    flex: 1,
  },
  viewTimelineBtn: {
    backgroundColor: Color.colorDarkslategray_900,
  },
  trackBookingBtn: {
    backgroundColor: Color.colorGoldenrod,
    marginLeft: 10,
  },
  viewTimelineBtnParent: {
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  frameParent: {
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: 0,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  bodyInner: {
    alignSelf: "stretch",
    flex: 1,
  },
  body: {
    alignSelf: "stretch",
    flex: 1,
  },
  bookingDetailsViewTimeline: {
    backgroundColor: Color.colorWhitesmoke_200,
    height: 812,
    width: "100%",
    flex: 1,
  },
});

export default BookingDetailsViewTimeline;
