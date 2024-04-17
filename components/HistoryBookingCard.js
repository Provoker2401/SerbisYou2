import * as React from "react";
import { Pressable, Text, StyleSheet, View, TouchableOpacity,Linking} from "react-native";
import { Image } from "expo-image";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

// Define a function to map the status to the corresponding style
const getStatusStyle = (status) => {
  switch (status) {
    case "Canceled":
      return styles.rectangleFrameShadowBox1;
    case "Completed":
      return styles.rectangleFrameShadowBox;
    default:
      return styles.defaultStatus;
  }
};

// Define a function to map the status to the corresponding card background color
const getCardBackgroundColor = (status) => {
  switch (status) {
    case "Canceled":
      return styles.cancelled;
    case "Completed":
      return styles.completed;
    default:
      return {};
  }
};

const HistoryBookingCard = ({
  status,
  date,
  time,
  location,
  serviceName,
  providerName,
  id,
  phone
}) => {
  const navigation = useNavigation();
  const statusStyle = getStatusStyle(status);
  const cardBackgroundColor = getCardBackgroundColor(status);

  const messageProvider = ()=>{
    Linking.openURL(`sms:${phone}`);


  }
  const callProvider = ()=>{
    Linking.openURL(`tel:${phone}`);

  }

  return (
    <View style={[styles.cancelledFrame, styles.frameFlexBox]}>
      <View style={[statusStyle]}>
        <View style={[styles.providerFrame, styles.providerFrameFlexBox]}>
          <View style={styles.image2378Wrapper}>
            <Image
              style={styles.image2378Icon}
              contentFit="cover"
              source={require("../assets/image-2378.png")}
            />
          </View>
          <View style={[styles.frameParent, styles.parentSpaceBlock]}>
            <View
              style={[
                styles.standardCleaningParent,
                styles.providerFrameFlexBox,
              ]}
            >
              <Text style={styles.standardCleaning}>{serviceName}</Text>
              <Text style={styles.dummyProvider1}>{providerName}</Text>
            </View>
            <View style={styles.cancelledWrapper}>
              <View style={[cardBackgroundColor, styles.rejectedFlexBox]}>
                <Text style={styles.rejected1}>{status}</Text>
              </View>
            </View>
          </View>
          <View style={[styles.callBtnParent, styles.parentSpaceBlock]}>
          <TouchableOpacity style={[styles.callBtn, styles.btnFlexBox]} onPress={callProvider}>
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
            <TouchableOpacity style={[styles.messageBtn, styles.btnFlexBox]} onPress={messageProvider}>
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
          style={[styles.rectangleFrameChild, styles.btnFlexBox]}
          contentFit="cover"
          source={require("../assets/line-83.png")}
        />
        <View style={[styles.scheduleFrame, styles.frameSpaceBlock]}>
          <View style={styles.frameGroupFlexBox}>
            <Text style={styles.dateTime}>{`Date & Time`}</Text>
            <View style={styles.aug112023Parent}>
              <Text
                style={[styles.aug112023, styles.textTypo]}
              >{date}</Text>
              <Text style={[styles.text, styles.textTypo]}>|</Text>
              <Text style={[styles.text, styles.textTypo]}>{time}</Text>
            </View>
          </View>
          <View style={[styles.frameGroup, styles.frameGroupFlexBox]}>
            <View style={styles.locationWrapper}>
              <Text style={styles.dateTime}>Location</Text>
            </View>
            <View style={styles.uscTalambanCebuCityCebuWrapper}>
              <Text
                style={[styles.uscTalambanCebu, styles.textTypo]}
              >{location}</Text>
            </View>
          </View>
        </View>
        {status === "Completed"? (
          <View style={[styles.buttonsFrame, styles.frameSpaceBlock]}>
          <Pressable
            style={[styles.btnBorder]}
            onPress={() => navigation.navigate("EReceipt", { itemID: id })}      >
            <Text style={[styles.viewDetails, styles.viewDetailsTypo]}>
              View E-Receipt
            </Text>
          </Pressable>
        </View>
        ): (
          <View style={[styles.buttonsFrame1, styles.frameSpaceBlock]}>
          <Pressable
            style={[styles.btnBorder]}
            onPress={() => navigation.navigate("EReceipt", { itemID: id })}      >
            <Text style={[styles.viewDetails, styles.viewDetailsTypo]}>
              View E-Receipt
            </Text>
          </Pressable>
        </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
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
    backgroundColor: Color.colorMistyrose,
    borderRadius: Border.br_3xs,
    alignItems: "center",
    alignSelf: "stretch",
  },
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
    backgroundColor: Color.colorMintcream,
    borderRadius: Border.br_3xs,
    alignItems: "center",
    alignSelf: "stretch",
  },
  providerFrameFlexBox: {
    alignSelf: "stretch",
    justifyContent: "center",
  },
  parentSpaceBlock: {
    marginLeft: 5,
    justifyContent: "center",
  },
  rejectedFlexBox: {
    paddingVertical: Padding.p_7xs,
    paddingHorizontal: Padding.p_3xs,
    borderRadius: Border.br_6xs,
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  btnFlexBox: {
    overflow: "hidden",
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
  viewDetailsTypo: {
    textAlign: "center",
    fontFamily: FontFamily.level2Medium12,
    fontWeight: "500",
    fontSize: FontSize.level2Medium12_size,
    lineHeight: 24,
    letterSpacing: -0.1,
  },
  btnBorder: {
    backgroundColor: Color.colorSteelblue_100,
    borderWidth: 1.6,
    borderColor: Color.colorSteelblue_100,
    borderStyle: "solid",
    borderRadius: Border.br_xs,
    overflow: "hidden",
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
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
  standardCleaning: {
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
    fontSize: FontSize.size_3xs,
    marginTop: 9,
    color: Color.colorTypographyContentIconsBlack02,
    fontFamily: FontFamily.title4Regular18,
    textAlign: "left",
    lineHeight: 24,
    letterSpacing: -0.1,
    alignSelf: "stretch",
  },
  standardCleaningParent: {
    justifyContent: "center",
  },
  rejected1: {
    textTransform: "capitalize",
    fontFamily: FontFamily.workSansSemiBold,
    color: Color.white,
    fontSize: FontSize.level2Medium12_size,
    textAlign: "left",
    fontWeight: "600",
  },
  rejected: {
    backgroundColor: Color.colorGray_100,
  },
  rejectedWrapper: {
    width: 76,
    justifyContent: "center",
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
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  messageIcon: {
    top: 10,
    left: 10,
  },
  messageBtn: {
    marginTop: 9,
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
  },
  rectangleFrameChild: {
    maxWidth: "100%",
    height: 1,
    width: "100%",
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
    borderWidth: 1.6,
    borderColor: Color.colorSteelblue_100,
    borderStyle: "solid",
    borderRadius: Border.br_xs,
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.white,
  },
  viewDetails: {
    color: Color.white,
  },
  viewDetailsBtn: {
    marginLeft: 26,
  },
  buttonsFrame: {
    paddingBottom: Padding.p_3xs,
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonsFrame1: {
    paddingBottom: Padding.p_3xs,
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    display: "none",
  },
  rectangleFrame: {
    backgroundColor: Color.colorSilver_100,
  },
  cancelled: {
    backgroundColor: Color.colorFirebrick_100,
  },
  cancelledWrapper: {
    // width: 83,
    // justifyContent: "center",
    justifyContent: "left",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
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
  rectangleFrame1: {
    backgroundColor: Color.colorMistyrose,
  },
  cancelledFrame: {
    marginTop: 14,
  },
  completed: {
    backgroundColor: Color.colorMediumseagreen_100,
  },
  completedWrapper: {
    width: 89,
    justifyContent: "center",
  },
  rectangleFrameShadowBox: {
    backgroundColor: Color.colorMintcream,
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
  historyBookings: {
    paddingHorizontal: 0,
    paddingVertical: Padding.p_xl,
    alignItems: "center",
    backgroundColor: Color.white,
    alignSelf: "stretch",
  },
});

export default HistoryBookingCard;
