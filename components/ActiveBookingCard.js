import React from "react";
import { Pressable, Text, StyleSheet, View, Linking, TouchableOpacity} from "react-native";
import { Image } from "expo-image";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

// Define a function to map the status to the corresponding style
const getStatusStyle = (status) => {
  switch (status) {
    case "Upcoming":
      return styles.upcoming;
    case "In Transit":
      return styles.inTransit;
    case "In Progress":
      return styles.inProgress;
    default:
      return styles.defaultStatus;
  }
};

// Define a function to map the status to the corresponding card background color
const getCardBackgroundColor = (status) => {
  switch (status) {
    case "Upcoming":
      return styles.upcomingCardColor;
    case "In Transit":
      return styles.inTransitCardColor;
    case "In Progress":
      return styles.inProgressCardColor;
    default:
      return {};
  }
};

const ActiveBookingCard = ({
  status,
  date,
  time,
  location,
  serviceName,
  providerName,
  id,
  phone,
  onOpenCancelModal
}) => {
  const navigation = useNavigation();

  // When the 'Cancel Booking' button is pressed
  const onCancelPress = () => {
    // This will call the openCancelModal function passed as a prop from the parent component
    onOpenCancelModal();
  };

  const messageProvider = ()=>{
    Linking.openURL(`sms:${phone}`);
  }
  const callProvider = ()=>{
    Linking.openURL(`tel:${phone}`);
  }

  const statusStyle = getStatusStyle(status);
  const cardBackgroundColor = getCardBackgroundColor(status);
  let cancelBookingBtn;

  if (status === "Upcoming") {
    cancelBookingBtn = true;
  } else if (status === "Transit" || status === "In Progress") {
    cancelBookingBtn = false;
  }

  return (
    <View style={styles.frameFlexBox}>
      <View style={[cardBackgroundColor, styles.rectangleFrameShadowBox]}>
        <View style={styles.providerFrame}>
          <View style={styles.image2378Wrapper}>
            <Image
              style={styles.image2378Icon}
              contentFit="cover"
              source={require("../assets/image-2378.png")}
            />
          </View>
          <View style={[styles.frameParent, styles.parentSpaceBlock]}>
            <View style={styles.deepCleaningParent}>
              <Text style={styles.deepCleaning}>{serviceName}</Text>
              <Text
                style={[styles.dummyProvider1, styles.messageBtnSpaceBlock]}
              >
                {providerName}
              </Text>
            </View>
            <View style={styles.pendingWrapper}>
              <View style={[statusStyle, styles.pendingFlexBox]}>
                <Text style={styles.pending1}>{status}</Text>
              </View>
            </View>
          </View>
          <View style={[styles.callBtnParent, styles.parentSpaceBlock]}>
          <TouchableOpacity style={styles.callBtn} onPress={callProvider}>
              <Image
                style={styles.callBtnChild}
                contentFit="cover"
                source={require("../assets/ellipse-232.png")}
              />
              <Image
                style={[styles.callIcon, styles.iconPosition]}
                contentFit="cover"
                source={require("../assets/call.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.messageBtn, styles.messageBtnSpaceBlock]} onPress={messageProvider}>
              <Image
                style={styles.callBtnChild}
                contentFit="cover"
                source={require("../assets/ellipse-232.png")}
              />
              <Image
                style={[styles.messageIcon, styles.iconPosition]}
                contentFit="cover"
                source={require("../assets/message.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Image
          style={styles.rectangleFrameChild}
          contentFit="cover"
          source={require("../assets/line-83.png")}
        />
        <View style={[styles.scheduleFrame, styles.frameSpaceBlock]}>
          <View style={styles.frameGroupFlexBox}>
            <Text style={styles.dateTime}>{`Date & Time`}</Text>
            <View style={styles.aug112023Parent}>
              <Text style={[styles.aug112023, styles.textTypo]}>{date}</Text>
              <Text style={[styles.text, styles.textTypo]}>|</Text>
              <Text style={[styles.text, styles.textTypo]}>{time}</Text>
            </View>
          </View>
          <View style={[styles.frameGroup, styles.frameGroupFlexBox]}>
            <View style={styles.locationWrapper}>
              <Text style={styles.dateTime}>Location</Text>
            </View>
            <View style={styles.uscTalambanCebuCityCebuWrapper}>
              <Text style={[styles.uscTalambanCebu, styles.textTypo]}>
                {location}
              </Text>
            </View>
          </View>
        </View>
        {cancelBookingBtn == true ? (
          <View style={[styles.buttonsFrame, styles.frameSpaceBlock]}>
            <Pressable
              style={[styles.cancelBookingBtn, styles.btnBorder]}
              onPress={onCancelPress}
            >
              <Text style={[styles.cancelBooking, styles.viewDetailsTypo]}>
                Cancel Booking
              </Text>
            </Pressable>
            <Pressable
              style={[styles.viewDetailsBtn, styles.btnBorder]}
              onPress={() => navigation.navigate("BookingDetails", { itemID: id, statusOrder: status })}
            >
              <Text style={[styles.viewDetails, styles.viewDetailsTypo]}>
                View Details
              </Text>
            </Pressable>
          </View>
        ) : (
          <View style={[styles.buttonsFrame, styles.frameSpaceBlock]}>
            <Pressable
              style={[styles.viewDetailsBtn1, styles.btnBorder]}
              onPress={() => navigation.navigate("BookingDetails", { itemID: id })}
            >
              <Text style={[styles.viewDetails, styles.viewDetailsTypo]}>
                View Details
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  rectangleFrameShadowBox: {
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
    marginTop: 3,
    alignSelf: "stretch",
  },
  pendingFlexBox: {
    paddingVertical: Padding.p_7xs,
    paddingHorizontal: Padding.p_3xs,
    borderRadius: Border.br_6xs,
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  iconPosition: {
    zIndex: 1,
    height: 23,
    width: 23,
    position: "absolute",
    overflow: "hidden",
  },
  frameSpaceBlock: {
    paddingTop: Padding.p_xl,
    alignSelf: "stretch",
  },
  textTypo: {
    textAlign: "right",
    color: Color.colorDarkslategray_400,
    fontSize: FontSize.typographyTaglineSmallRegular_size,
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
  },
  frameGroupFlexBox: {
    paddingVertical: 0,
    paddingHorizontal: Padding.p_8xs,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
  },
  btnBorder: {
    borderWidth: 1.6,
    borderColor: Color.colorSteelblue_100,
    borderStyle: "solid",
    borderRadius: Border.br_xs,
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  viewDetailsTypo: {
    textAlign: "center",
    fontFamily: FontFamily.level2Medium12,
    fontWeight: "500",
    fontSize: FontSize.level2Medium12_size,
    lineHeight: 24,
    letterSpacing: -0.1,
  },
  frameFlexBox: {
    paddingBottom: Padding.p_7xs,
    alignItems: "center",
    backgroundColor: Color.white,
    alignSelf: "stretch",
  },
  image2378Icon: {
    width: 91,
    height: 91,
  },
  image2378Wrapper: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  deepCleaning: {
    fontSize: FontSize.body1Semibold_size,
    color: Color.colorBlack,
    textAlign: "left",
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
    lineHeight: 24,
    letterSpacing: -0.1,
    alignSelf: "stretch",
  },
  dummyProvider1: {
    fontSize: FontSize.typographyTaglineSmallRegular_size,
    color: Color.colorTypographyContentIconsBlack02,
    fontFamily: FontFamily.title4Regular18,
    marginTop: 9,
    textAlign: "left",
    lineHeight: 24,
    letterSpacing: -0.1,
  },
  deepCleaningParent: {
    justifyContent: "center",
    alignSelf: "stretch",
  },
  pending1: {
    textTransform: "capitalize",
    fontFamily: FontFamily.workSansSemiBold,
    color: Color.white,
    fontSize: FontSize.level2Medium12_size,
    textAlign: "left",
    fontWeight: "600",
  },
  pending: {
    backgroundColor: Color.colorCornflowerblue_100,
  },
  pendingWrapper: {
    // width: 73,
    // justifyContent: "center",
    justifyContent: "left",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
  },
  frameParent: {
    paddingLeft: Padding.p_8xs,
    flex: 1,
  },
  callBtnChild: {
    width: 42,
    height: 42,
    zIndex: 0,
  },
  callIcon: {
    top: 9,
    left: 9,
  },
  callBtn: {
    overflow: "hidden",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
  },
  messageIcon: {
    top: 10,
    left: 10,
  },
  messageBtn: {
    overflow: "hidden",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  callBtnParent: {
    alignItems: "center",
  },
  providerFrame: {
    paddingTop: Padding.p_3xs,
    paddingBottom: Padding.p_xl,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
  },
  rectangleFrameChild: {
    maxWidth: "100%",
    height: 1,
    width: "100%",
    overflow: "hidden",
    alignSelf: "stretch",
  },
  dateTime: {
    fontSize: FontSize.typographyTaglineSmallRegular_size,
    color: Color.colorTypographyContentIconsBlack02,
    fontFamily: FontFamily.title4Regular18,
    textAlign: "left",
    lineHeight: 24,
    letterSpacing: -0.1,
  },
  aug112023: {
    lineHeight: 24,
    letterSpacing: -0.1,
    color: Color.colorDarkslategray_400,
  },
  text: {
    marginLeft: 2,
    lineHeight: 24,
    letterSpacing: -0.1,
    color: Color.colorDarkslategray_400,
  },
  aug112023Parent: {
    justifyContent: "flex-end",
    marginLeft: 30,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  uscTalambanCebu: {
    lineHeight: 20,
    flex: 1,
  },
  uscTalambanCebuCityCebuWrapper: {
    marginLeft: 20,
    flex: 1,
    flexDirection: "row",
  },
  frameGroup: {
    marginTop: 8,
    justifyContent: "center",
  },
  scheduleFrame: {
    alignItems: "center",
  },
  cancelBookingBtnOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  cancelBookingBtnBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  cancelBooking: {
    color: Color.colorSteelblue_100,
  },
  cancelBookingBtn: {
    backgroundColor: Color.white,
  },
  viewDetails: {
    color: Color.white,
  },
  viewDetailsBtn: {
    backgroundColor: Color.colorSteelblue_100,
    marginLeft: 26,
    overflow: "hidden",
  },
  viewDetailsBtn1: {
    backgroundColor: Color.colorSteelblue_100,
    overflow: "hidden",
  },
  buttonsFrame: {
    paddingBottom: Padding.p_3xs,
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
  },
  upcomingCardColor: {
    backgroundColor: Color.colorGainsboro_200,
  },
  upcoming: {
    backgroundColor: Color.colorTeal,
  },
  upcomingWrapper: {
    width: 85,
    justifyContent: "center",
  },
  cancelBookingBtn1Overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  cancelBookingBtn1Bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  inTransitCardColor: {
    backgroundColor: Color.colorGainsboro_100,
  },
  upcomingFrame: {
    marginTop: 14,
  },
  inTransit: {
    backgroundColor: Color.colorOrangered,
  },
  callBtn2: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
  },
  cancelBookingBtn2Overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  cancelBookingBtn2Bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  inProgressCardColor: {
    backgroundColor: Color.colorGainsboro_100,
  },
  inProgress: {
    backgroundColor: Color.colorGoldenrod,
  },
  inProgressWrapper: {
    width: 93,
    justifyContent: "center",
  },
  cancelBookingBtn3Overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  cancelBookingBtn3Bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  rectangleFrame3: {
    backgroundColor: Color.colorLinen,
  },
  activeBookings: {
    paddingHorizontal: 0,
    paddingVertical: Padding.p_xl,
    alignItems: "center",
    backgroundColor: Color.white,
    alignSelf: "stretch",
  },
});

export default ActiveBookingCard;
