import React, { useState, useEffect, useCallback } from "react";
import {
  StatusBar,
  StyleSheet,
  Pressable,
  View,
  Text,
  ScrollView,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, FontFamily, FontSize, Border } from "../GlobalStyles";
import * as Clipboard from 'expo-clipboard';
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore"; // Updated imports
import { getAuth, onAuthStateChanged, updateEmail } from "firebase/auth";

const BookingDetails = ({ route }) => {

  const navigation = useNavigation();
  const [viewTimelineBtnVisible, setViewTimelineBtnVisible] = useState(false);

  const {itemID, statusOrder} = route.params;
  const [bookingID, setBookingID] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingAddress, setBookingAddress] = useState("");
  const [bookingDistanceRadius, setBookingDistanceRadius] = useState("");
  const [bookingTitle, setBookingTitle] = useState("");
  const [bookingCategory, setBookingCategory] = useState("");
  const [bookingServices, setBookingServices] = useState([]);
  const [bookingSubtotal, setBookingSubtotal] = useState("");
  const [bookingDistanceFee, setBookingDistanceFee] = useState("");
  const [bookingTotalPrice, setBookingTotalPrice] = useState("");
  const [bookingPaymentMethod, setBookingPaymentMethod] = useState("");
  const [bookingProviderName, setBookingProviderName] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [bookingCoordinates, setBookingCoordinates] = useState({ latitude: null, longitude: null });
  const [providerCoordinates, setProviderCoordinates] = useState({ latitude: null, longitude: null });
  const [acceptedBy, setAcceptedBy] = useState("");

  const [materialFee, setMaterialFee] = useState("");

  const [bookingProviderNumber, setbookingbookingProviderNumber] = useState("")

  const [loading, setLoading] = useState(false); // Set to true initially, assuming you want to show the loading indicator on component mount


  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true); // Set loading to true before fetching data

        const db = getFirestore(); // Use getFirestore() to initialize Firestore

        // Get the user's UID
        const auth = getAuth();
        const userUID = auth.currentUser.uid;
        console.log("User UID: ", userUID);
        console.log("Item Id: ", itemID);

        const userBookingDocRef = doc(
          db,
          "serviceBookings",
          userUID,
          "activeBookings",
          itemID
        );
        const docSnapshot = await getDoc(userBookingDocRef);

        if (docSnapshot.exists()) {
          const booking = docSnapshot.data();
          console.log("Booking Data: ", booking);

          const servicesData = booking.service.map((doc) => doc);
          console.log("Data Services: ", servicesData);

          setBookingID(booking.bookingID);
          setBookingDate(booking.date);
          setBookingTime(booking.time);
          setBookingAddress(booking.address);
          setBookingDistanceRadius(booking.distanceRadius);
          setBookingTitle(booking.title);
          setBookingCategory(booking.category);
          setBookingServices(booking.service);
          setBookingSubtotal(booking.subTotal);
          setBookingDistanceFee(booking.feeDistance);
          setBookingTotalPrice(booking.totalPrice);
          setBookingPaymentMethod(booking.paymentMethod);
          setBookingProviderName(booking.providerName);
          setBookingStatus(booking.status);
          setBookingCoordinates({
            latitude: booking.coordinates.latitude,
            longitude: booking.coordinates.longitude,
          });
          setProviderCoordinates({
            latitude: booking.providerCoordinates.latitude,
            longitude: booking.providerCoordinates.longitude,
          });
          setbookingbookingProviderNumber(booking.providerPhone);
          setMaterialFee(booking.materialFee);
          setAcceptedBy(booking.acceptedBy);

          console.log("Coordinates: ", bookingCoordinates);
        } else {
          console.log("No such document!");
        }

        setLoading(false); // Set loading to true before fetching data
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    }

    fetchData(); // Call the fetchData function immediately
  }, []);

  const getFormattedServiceName = () => {
    if (!bookingTitle || !bookingCategory) {
      return 'Service'; // Default text or handle as needed
    }

    // Check if the title is "Pet Care" or "Gardening"
    if (bookingTitle === "Pet Care" || bookingTitle === "Gardening" || bookingTitle === "Cleaning") {
      return bookingCategory;
    } else {
      // If not, concatenate the title and category
      return `${bookingTitle} ${bookingCategory}`;
    }
  };


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

  const copyToClipboard = useCallback(() => {
    Clipboard.setString(bookingID);
    Alert.alert('Copied to clipboard', `Booking ID: ${bookingID} has been copied to clipboard.`);
  }, [bookingID]);

  const openViewTimelineBtn = useCallback(() => {
    setViewTimelineBtnVisible(true);
  }, []);

  const closeViewTimelineBtn = useCallback(() => {
    setViewTimelineBtnVisible(false);
  }, []);

    
  const statusStyle = getStatusStyle(bookingStatus);

  return (
    <>
      <View style={styles.bookingDetails}>
        <StatusBar barStyle="default" />
        <ScrollView
          style={styles.body}
          indicatorStyle="default"
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={false}
          contentContainerStyle={styles.bodyScrollViewContent}
        >
           <View style={[styles.bodyInner, styles.bodyInnerFlexBox]}>
            {loading ? (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                style={{
                  marginVertical: "75%",
                  transform: [{ scale: 2 }], // Adjust the scale factor as needed
                }}
              />
            ) : (
              <View style={styles.frameParent}>
                <View style={styles.bookingSpaceBlock}>
                  <View style={styles.bookingDetailsLabel}>
                    <View style={styles.bookingIdWrapper}>
                      <Text style={styles.bookingId}>Booking ID:</Text>
                    </View>
                    <View style={styles.ljkhParent}>
                      <Text style={styles.ljkh}>{bookingID}</Text>
                      <Pressable
                        style={[styles.copyButton, styles.bodyInnerFlexBox]}
                        onPress={copyToClipboard}
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
                    style={[
                      styles.dateAndTimeFrame,
                      styles.dateFrameSpaceBlock,
                    ]}
                  >
                    <View style={styles.dateRangeLightWrapper}>
                      <Image
                        style={styles.dateRangeLightIcon}
                        contentFit="cover"
                        source={require("../assets/date-range-light3.png")}
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
                        <Text style={[styles.august112023, styles.textTypo1]}>
                          {bookingDate} | {bookingTime}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.dateAndTimeFrame,
                      styles.dateFrameSpaceBlock,
                    ]}
                  >
                    <View style={styles.dateAndTimeFrameInnerFlexBox}>
                      <Image
                        style={styles.markersNearPinletMarker}
                        contentFit="cover"
                        source={require("../assets/markers--near-pinlet-marker5.png")}
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
                          {bookingAddress}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.dateAndTimeFrame,
                      styles.dateFrameSpaceBlock,
                    ]}
                  >
                    <View style={styles.dateRangeLightWrapper}>
                      <Image
                        style={styles.dateRangeLightIcon}
                        contentFit="cover"
                        source={require("../assets/gps.png")}
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
                          {`${bookingDistanceRadius} kilometers`}
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
                            {getFormattedServiceName()}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.subcategoriesFrame}>
                    {bookingServices.map((item, index) => (
                      <View
                        style={[
                          styles.dateAndTimeFrame3,
                          styles.dateFrameFlexBox,
                        ]}
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
                                  {item.value}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                        <View
                          style={[styles.frameGroup, styles.frameSpaceBlock]}
                        >
                          <View style={styles.frame}>
                            <Text
                              style={[styles.toiletSystem, styles.paypalTypo]}
                            >
                              {item.name}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={[styles.frameWrapper3, styles.frameSpaceBlock]}
                        >
                          <View style={styles.frame}>
                            <Text
                              style={styles.text1}
                            >{`₱${item.totalPrice}.00`}</Text>
                          </View>
                        </View>
                      </View>
                    ))}
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
                              {`₱${bookingSubtotal}.00`}
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
                            Material Fee
                          </Text>
                        </View>
                        <View style={styles.frameInner}>
                          <View style={styles.frame}>
                            <Text style={[styles.text6, styles.textLayout]}>
                              {`₱${materialFee}.00`}
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
                              {`₱${bookingDistanceFee}.00`}
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
                              {`₱${bookingTotalPrice}.00`}
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
                            {bookingPaymentMethod}
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
                    <Text style={styles.bookingId}>
                      Service Provider Details
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.dateAndTimeFrame,
                      styles.dateFrameSpaceBlock,
                    ]}
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
                              {bookingProviderName}
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
                              <Text style={[statusStyle, styles.statusTypo]}>
                                {bookingStatus}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                {statusOrder !== "Upcoming" && (
                  <View
                    style={[
                      styles.viewTimelineBtnParent,
                      styles.dateFrameSpaceBlock,
                    ]}
                  >
                    <Pressable
                      style={[styles.trackBookingBtn, styles.btnFlexBox]}
                      onPress={() =>
                        navigation.navigate("NavigationHomeService", {
                          itemID,
                          statusOrder,
                          bookingID,
                          bookingDate,
                          bookingTime,
                          bookingAddress,
                          bookingDistanceRadius,
                          bookingTitle,
                          bookingCategory,
                          bookingServices,
                          bookingSubtotal,
                          bookingDistanceFee,
                          bookingTotalPrice,
                          bookingPaymentMethod,
                          bookingProviderName,
                          bookingStatus,
                          bookingCoordinates,
                          providerCoordinates,
                          bookingProviderNumber,
                          acceptedBy
                        })
                      }
                    >
                      <Text
                        style={[
                          styles.viewAllServices,
                          styles.bookingDetails1Typo,
                        ]}
                      >
                        Track Booking
                      </Text>
                    </Pressable>
                  </View>
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </View>

      <Modal animationType="fade" transparent visible={viewTimelineBtnVisible}>
        <View style={styles.viewTimelineBtnOverlay}>
          <Pressable
            style={styles.viewTimelineBtnBg}
            onPress={closeViewTimelineBtn}
          />
          {/* <BookingTimelineModal onClose={closeViewTimelineBtn} /> */}
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
  textTypo1: {
    fontFamily: FontFamily.workSansRegular,
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
    fontSize: FontSize.body1Semibold_size,
    fontWeight: "500",
    flex: 1,
  },
  statusTypo: {
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    fontWeight: "700",
    textAlign: "left",
    flex: 1,
    fontFamily: FontFamily.bodyLgBodyLgRegular,
  },
  btnFlexBox: {
    padding: Padding.p_xs,
    borderRadius: Border.br_mini,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  bookingDetails1Typo: {
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    fontSize: FontSize.title3Bold20_size,
  },
  bookingId: {
    fontWeight: "600",
    fontFamily: FontFamily.workSansSemiBold,
    color: Color.colorDarkslateblue_100,
    display: "flex",
    textAlign: "left",
    fontSize: FontSize.title3Bold20_size,
    alignItems: "center",
    alignSelf: "stretch",
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
    color: Color.colorBlack,
    fontFamily: FontFamily.workSansRegular,
    fontSize: FontSize.title3Bold20_size,
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

    fontSize: FontSize.body1Semibold_size,
    color: Color.colorBlack,
    textAlign: "left",
    flex: 1,
  },
  frameGroup: {
    flex: 1,
  },
  dateAndTimeFrame: {
    marginTop: 5,
    paddingBottom: Padding.p_8xs,
    justifyContent: "center",
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
    alignSelf: "stretch",
    justifyContent: "center",
  },
  text: {
    textTransform: "capitalize",
    fontSize: FontSize.body1Semibold_size,
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
    color: Color.colorBlack,
    textAlign: "left",
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
    color: Color.colorBlack,
    textAlign: "left",
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
    color: Color.colorBlack,
    textAlign: "left",
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
    fontSize: FontSize.body1Semibold_size,
    color: Color.colorBlack,
    textAlign: "left",
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
  upcoming: {
    color: Color.colorTeal,
  },
  inTransit: {
    color: Color.colorOrangered,
  },
  inProgress: {
    color: Color.colorGoldenrod,
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
  bookingDetails: {
    backgroundColor: Color.colorWhitesmoke_200,
    height: 812,
    width: "100%",
    flex: 1,
  },
});

export default BookingDetails;
