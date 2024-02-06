import * as React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, Padding, FontSize, Border } from "../GlobalStyles";

const BookingTimelineModal = ({ onClose }) => {
  return (
    <View style={styles.bookingTimelineModal}>
      <ScrollView
        style={styles.frameParent}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.frameScrollViewContent}
      >
        <View style={styles.vectorWrapper}>
          <Image
            style={styles.frameChild}
            contentFit="cover"
            source={require("../assets/line-76.png")}
          />
        </View>
        <View style={styles.detail}>
          <View style={[styles.bookingTimelineWrapper, styles.timelineFlexBox]}>
            <Text style={styles.bookingTimeline}>Booking Timeline</Text>
          </View>
          <View style={styles.detail}>
            <View style={styles.line} />
          </View>
          <View style={styles.status}>
            <View style={[styles.timelineFrame, styles.timelineFlexBox]}>
              <View style={styles.dateAndTime}>
                <Text style={[styles.pm, styles.bookingTypo]}>1:17 PM</Text>
                <Text style={[styles.feb, styles.febTypo]}>6 Feb</Text>
              </View>
              <View style={styles.parent}>
                <Image
                  style={styles.icon}
                  contentFit="cover"
                  source={require("../assets/1.png")}
                />
                <Image
                  style={styles.frameItem}
                  contentFit="cover"
                  source={require("../assets/line-1.png")}
                />
              </View>
              <View
                style={[styles.bookingPlaced, styles.bookingPlacedSpaceBlock]}
              >
                <Text style={[styles.bookingPlaced1, styles.febTypo]}>
                  Booking Placed
                </Text>
                <Text style={[styles.bookingIsPlaced, styles.bookingTypo]}>
                  Booking is placed
                </Text>
              </View>
            </View>
            <View style={styles.timelineFrameFlexBox}>
              <View style={styles.dateAndTime}>
                <Text style={[styles.pm, styles.bookingTypo]}>1:17 PM</Text>
                <Text style={[styles.feb, styles.febTypo]}>6 Feb</Text>
              </View>
              <View style={styles.parent}>
                <Image
                  style={styles.icon}
                  contentFit="cover"
                  source={require("../assets/1.png")}
                />
                <Image
                  style={styles.frameItem}
                  contentFit="cover"
                  source={require("../assets/line-1.png")}
                />
              </View>
              <View
                style={[styles.bookingPlaced, styles.bookingPlacedSpaceBlock]}
              >
                <Text style={[styles.bookingPlaced1, styles.febTypo]}>
                  Booking Accepted
                </Text>
                <Text style={styles.bookingAcceptedByContainer}>
                  <Text style={styles.bookingTypo}>{`Booking accepted by 
`}</Text>
                  <Text style={styles.dummyProvider1}>dummy Provider #1</Text>
                </Text>
              </View>
            </View>
            <View style={styles.timelineFrameFlexBox}>
              <View style={styles.dateAndTime}>
                <Text style={[styles.pm, styles.bookingTypo]}>1:17 PM</Text>
                <Text style={[styles.feb, styles.febTypo]}>6 Feb</Text>
              </View>
              <View style={styles.parent}>
                <Image
                  style={styles.icon}
                  contentFit="cover"
                  source={require("../assets/1.png")}
                />
                <Image
                  style={styles.frameItem}
                  contentFit="cover"
                  source={require("../assets/line-1.png")}
                />
              </View>
              <View
                style={[styles.bookingPlaced, styles.bookingPlacedSpaceBlock]}
              >
                <Text style={[styles.bookingPlaced1, styles.febTypo]}>
                  Provider is Preparing
                </Text>
                <Text style={[styles.bookingIsPlaced, styles.bookingTypo]}>
                  Provider is preparing necessary materials and tools needed
                </Text>
              </View>
            </View>
            <View style={styles.timelineFrameFlexBox}>
              <View style={styles.dateAndTime}>
                <Text style={[styles.pm, styles.bookingTypo]}>1:17 PM</Text>
                <Text style={[styles.feb, styles.febTypo]}>6 Feb</Text>
              </View>
              <View style={styles.parent}>
                <Image
                  style={styles.icon}
                  contentFit="cover"
                  source={require("../assets/1.png")}
                />
                <Image
                  style={styles.frameItem}
                  contentFit="cover"
                  source={require("../assets/line-1.png")}
                />
              </View>
              <View style={styles.bookingPlacedSpaceBlock}>
                <Text style={[styles.bookingPlaced1, styles.febTypo]}>
                  Provider is In Transit
                </Text>
                <Text
                  style={[styles.bookingIsPlaced, styles.bookingTypo]}
                >{`Provider is on the way to the destination `}</Text>
              </View>
            </View>
            <View style={styles.timelineFrameFlexBox}>
              <View style={styles.dateAndTime}>
                <Text style={[styles.pm, styles.bookingTypo]}>1:17 PM</Text>
                <Text style={[styles.feb, styles.febTypo]}>6 Feb</Text>
              </View>
              <View style={styles.parent}>
                <Image
                  style={styles.icon}
                  contentFit="cover"
                  source={require("../assets/1.png")}
                />
                <Image
                  style={styles.frameItem}
                  contentFit="cover"
                  source={require("../assets/line-1.png")}
                />
              </View>
              <View style={styles.bookingPlacedSpaceBlock}>
                <Text style={[styles.bookingPlaced1, styles.febTypo]}>
                  Provider has Arrived
                </Text>
                <Text style={[styles.bookingIsPlaced, styles.bookingTypo]}>
                  Your Service Provider has arrived at your destination
                </Text>
              </View>
            </View>
            <View style={styles.timelineFrameFlexBox}>
              <View style={styles.dateAndTime}>
                <Text style={[styles.pm, styles.bookingTypo]}>1:17 PM</Text>
                <Text style={[styles.feb, styles.febTypo]}>6 Feb</Text>
              </View>
              <View style={styles.parent}>
                <Image
                  style={styles.icon}
                  contentFit="cover"
                  source={require("../assets/1.png")}
                />
                <Image
                  style={styles.frameItem}
                  contentFit="cover"
                  source={require("../assets/line-1.png")}
                />
              </View>
              <View style={styles.bookingPlacedSpaceBlock}>
                <Text style={[styles.bookingPlaced1, styles.febTypo]}>
                  Home Service In Progress
                </Text>
                <Text style={[styles.bookingIsPlaced, styles.bookingTypo]}>
                  Service Provider is currently doing the assigned services
                </Text>
              </View>
            </View>
            <View style={styles.timelineFrameFlexBox}>
              <View style={styles.dateAndTime}>
                <Text style={[styles.pm6, styles.febTypo]}>1:17 PM</Text>
                <Text style={[styles.feb, styles.febTypo]}>6 Feb</Text>
              </View>
              <View style={styles.parent}>
                <Image
                  style={styles.icon}
                  contentFit="cover"
                  source={require("../assets/11.png")}
                />
              </View>
              <View style={styles.bookingPlacedSpaceBlock}>
                <Text
                  style={[styles.homeServiceCompleted1, styles.serviceTypo1]}
                >
                  Home Service Completed
                </Text>
                <Text style={[styles.serviceProviderHas, styles.serviceTypo1]}>
                  Service Provider has completed the assigned services
                </Text>
              </View>
            </View>
            <View style={[styles.timelineFrame7, styles.timelineFrameFlexBox]}>
              <View style={styles.dateAndTime}>
                <Text style={[styles.pm7, styles.serviceTypo]}>1:17 PM</Text>
                <Text style={[styles.feb, styles.febTypo]}>6 Feb</Text>
              </View>
              <View style={styles.parent}>
                <Image
                  style={styles.icon}
                  contentFit="cover"
                  source={require("../assets/12.png")}
                />
              </View>
              <View style={styles.bookingPlacedSpaceBlock}>
                <Text
                  style={[styles.homeServiceCompleted3, styles.serviceTypo]}
                >
                  Home Service Completed
                </Text>
                <Text style={[styles.serviceProviderHas1, styles.serviceTypo]}>
                  Service Provider has completed the assigned services
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  frameScrollViewContent: {
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  timelineFlexBox: {
    flexDirection: "row",
    alignSelf: "stretch",
  },
  bookingTypo: {
    color: Color.bg,
    fontFamily: FontFamily.workSansMedium,
    fontWeight: "500",
  },
  febTypo: {
    fontFamily: FontFamily.workSansMedium,
    fontWeight: "500",
    textAlign: "left",
  },
  bookingPlacedSpaceBlock: {
    paddingLeft: Padding.p_8xs,
    marginLeft: 20,
    flex: 1,
  },
  serviceTypo1: {
    color: Color.colorMediumseagreen_100,
    textAlign: "left",
    fontFamily: FontFamily.workSansMedium,
    fontWeight: "500",
    alignSelf: "stretch",
  },
  timelineFrameFlexBox: {
    marginTop: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  serviceTypo: {
    color: Color.colorFirebrick_200,
    textAlign: "left",
    fontFamily: FontFamily.workSansMedium,
    fontWeight: "500",
  },
  frameChild: {
    width: 41,
    height: 3,
  },
  vectorWrapper: {
    paddingTop: Padding.p_3xs,
    paddingBottom: Padding.p_8xs,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  bookingTimeline: {
    fontWeight: "600",
    fontFamily: FontFamily.workSansSemiBold,
    textAlign: "center",
    color: Color.heading,
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    flex: 1,
  },
  bookingTimelineWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  line: {
    backgroundColor: Color.border,
    borderStyle: "solid",
    borderColor: Color.border,
    borderWidth: 1,
    height: 2,
    alignSelf: "stretch",
  },
  detail: {
    marginTop: 10,
    alignSelf: "stretch",
  },
  pm: {
    textAlign: "left",
    textTransform: "capitalize",
    fontSize: FontSize.bodyLgBodyLgRegular_size,
  },
  feb: {
    marginTop: 8,
    fontSize: FontSize.m3LabelLarge_size,
    textAlign: "left",
    color: Color.heading,
  },
  dateAndTime: {
    paddingRight: Padding.p_8xs,
  },
  icon: {
    width: 12,
    height: 12,
  },
  frameItem: {
    width: 2,
    height: 60,
    marginTop: 6,
  },
  parent: {
    paddingTop: Padding.p_9xs,
    marginLeft: 20,
    alignItems: "center",
  },
  bookingPlaced1: {
    textAlign: "left",
    color: Color.heading,
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    alignSelf: "stretch",
  },
  bookingIsPlaced: {
    fontSize: FontSize.m3LabelLarge_size,
    textAlign: "left",
    marginTop: 10,
    alignSelf: "stretch",
  },
  bookingPlaced: {
    alignSelf: "stretch",
  },
  timelineFrame: {
    justifyContent: "center",
  },
  dummyProvider1: {
    fontFamily: FontFamily.workSansRegular,
    color: Color.heading,
  },
  bookingAcceptedByContainer: {
    fontSize: FontSize.m3LabelLarge_size,
    textAlign: "left",
    textTransform: "capitalize",
    marginTop: 10,
    alignSelf: "stretch",
  },
  pm6: {
    color: Color.colorDarkslategray_700,
    textAlign: "left",
    textTransform: "capitalize",
    fontSize: FontSize.bodyLgBodyLgRegular_size,
  },
  homeServiceCompleted1: {
    fontSize: FontSize.bodyLgBodyLgRegular_size,
  },
  serviceProviderHas: {
    fontSize: FontSize.m3LabelLarge_size,
    marginTop: 10,
  },
  pm7: {
    textTransform: "capitalize",
    fontSize: FontSize.bodyLgBodyLgRegular_size,
  },
  homeServiceCompleted3: {
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    alignSelf: "stretch",
  },
  serviceProviderHas1: {
    fontSize: FontSize.m3LabelLarge_size,
    marginTop: 10,
    alignSelf: "stretch",
  },
  timelineFrame7: {
    display: "none",
  },
  status: {
    paddingHorizontal: Padding.p_7xs,
    paddingVertical: 0,
    marginTop: 10,
    alignItems: "center",
    alignSelf: "stretch",
  },
  frameParent: {
    borderTopLeftRadius: Border.br_5xl,
    borderTopRightRadius: Border.br_5xl,
    backgroundColor: Color.white,
    flex: 1,
    alignSelf: "stretch",
  },
  bookingTimelineModal: {
    justifyContent: "flex-end",
    maxWidth: "100%",
    maxHeight: "100%",
    alignItems: "center",
    alignSelf: "stretch",
  },
});

export default BookingTimelineModal;
