import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Image } from "expo-image";
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import { useNavigation } from "@react-navigation/native";
import { Padding, Border, Color, FontSize, FontFamily } from "../GlobalStyles";
import HistoryBookingCard from "./HistoryBookingCard";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
  onSnapshot,
} from "firebase/firestore"; // Updated imports
import { getAuth} from "firebase/auth";

const HistoryBookings = ({ style }) => {
  const [cancelBookingBtnVisible, setCancelBookingBtnVisible] = useState(false);
  const [cancelBookingBtn1Visible, setCancelBookingBtn1Visible] =
    useState(false);

  const navigation = useNavigation();
  const [historyBookings, setHistoryBookings] = useState([]);

  const [selectedDate, setSelectedDate] = useState(moment());
  const [formattedDate, setFormattedDate] = useState(moment().format('MMMM D, YYYY'));
  const [customDatesStyles, setCustomDatesStyles] = useState([]);
  const [markedDates, setMarkedDates] = useState([]);
  const [startingDate, setStartingDate] = useState(moment());
  const [bookingStatusByDate, setBookingStatusByDate] = useState({});

    // Use useMemo to memoize the computed value for the entire lifetime of the component
    const userUID = useMemo(() => getAuth().currentUser?.uid, []);

  useEffect(() => {
    // Whenever the selectedDate changes, update the startingDate
    // to the start of the week of the new selectedDate.
    setStartingDate(selectedDate.clone().startOf('week'));
  }, [selectedDate]);

  // useEffect(() => {
  //   const loadMarkedDates = async () => {
  //     const db = getFirestore();
  //     const auth = getAuth();
  //     const userUID = auth.currentUser?.uid;
  //     if (!userUID) return;

  //     let newCustomDatesStyles = [];
  //     let newMarkedDates = [];
  //     let startDate = moment(startingDate); // Assuming startingDate is set to the start of the week

  //     for (let i = 0; i < 7; i++) {
  //       let date = startDate.clone().add(i, 'days');
  //       let formattedDate = date.format('MMMM D, YYYY');

  //       let dots = [];

  //       const q = query(
  //         collection(db, "serviceBookings", userUID, "historyBookings"),
  //         where("date", "==", formattedDate)
  //       );
  

  //       let hasCancelled = false;
  //       let hasCompleted = false;
  //       const querySnapshot = await getDocs(q);

  //       querySnapshot.forEach((doc) => {
  //         const booking = doc.data();
  //         if (booking.status === "Canceled") {
  //           hasCancelled = true;
  //         }
  //         if (booking.status === "Completed") {
  //           hasCompleted = true;
  //         }
  //       });

  //       if (hasCancelled && hasCompleted) {
  //         dots.push({
  //           color: '#3bae5c',
  //         });
  //         dots.push({
  //           color: '#b41600',
  //         });
  //       } 
  //       else if (hasCompleted) {
  //         dots.push({
  //           color: '#3bae5c',

  //         });
  //       }
  //       else if (hasCancelled) {
  //         dots.push({
  //           color: '#b41600',
  //         });
  //       }

  //       newMarkedDates.push({
  //         date,
  //         dots,
  //       });
  //     }

  //     setCustomDatesStyles(newCustomDatesStyles);
  //     setMarkedDates(newMarkedDates);
  //     }
  //   loadMarkedDates();
  // }, [startingDate]);
  useEffect(() => {
    if (!userUID) return;
    const db = getFirestore();

    // Optimize Firestore query by fetching bookings for the entire week
    let startDate = selectedDate.clone().startOf('week');
    let endDate = selectedDate.clone().endOf('week');

    const q = query(
      collection(db, "serviceBookings", userUID, "historyBookings"),
      where("date", ">=", startDate.format('MMMM D, YYYY')),
      where("date", "<=", endDate.format('MMMM D, YYYY'))
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let bookings = [];
      let dotsMap = {};
      querySnapshot.forEach((doc) => {
        const booking = doc.data();
        bookings.push({ id: doc.id, ...booking });
        // Populate dotsMap based on booking status
        const bookingDate = booking.date;
        if (!dotsMap[bookingDate]) {
          dotsMap[bookingDate] = [];
        }
        if (booking.status === "Canceled") {
          dotsMap[bookingDate].push({ color: '#b41600' });
        } else if (booking.status === "Completed") {
          dotsMap[bookingDate].push({ color: '#3bae5c' });
        }
      });

      // Convert dotsMap to markedDates array
      const newMarkedDates = Object.keys(dotsMap).map(date => ({
        date: moment(date, 'MMMM D, YYYY'),
        dots: dotsMap[date],
      }));

      setHistoryBookings(bookings);
      setMarkedDates(newMarkedDates);
    }, (error) => {
      console.log("Error fetching history bookings: ", error);
    });

    // Clean up the onSnapshot listener when the component is unmounted or userUID changes
    return () => unsubscribe();
  }, [userUID, selectedDate]);

  const datesBlacklistFunc = date => {
    // Convert moment date to start of day for accurate comparison
    return date.isAfter(moment().startOf('day'));
  };

  // const onDateSelected = date => {
  //   setSelectedDate(date);
  //   setFormattedDate(date.format('MMMM D, YYYY'));

  //   // Additionally, if CalendarStrip doesn't automatically handle week changes,
  //   // you might need to explicitly set the startingDate to the start of the week of the selectedDate
  //   setStartingDate(date.clone().startOf('week'));
  // };
  const onDateSelected = useCallback((date) => {
    setSelectedDate(date);
    setFormattedDate(date.format('MMMM D, YYYY'));
    setStartingDate(date.clone().startOf('week'));
  }, []);

  const setSelectedDateNextWeek = () => {
    const newSelectedDate = moment(selectedDate).add(1, 'week');
    setSelectedDate(newSelectedDate);
    setFormattedDate(newSelectedDate.format('MMMM D, YYYY'));
  };

  const setSelectedDatePrevWeek = () => {
    const newSelectedDate = moment(selectedDate).subtract(1, 'week');
    setSelectedDate(newSelectedDate);
    setFormattedDate(newSelectedDate.format('MMMM D, YYYY'));
  };

  // Custom Selector for Previous Week
  const CustomLeftSelector = (
    <TouchableOpacity  onPress={setSelectedDatePrevWeek} >
      <Image
        style={styles.leftArrow}
        source={require("../assets/left-arrow-black.png")}
      />
      {/* <Text style={styles.selectorText}>Prev</Text> */}
    </TouchableOpacity>
  );

  // Custom Selector for Next Week
  const CustomRightSelector = (
    <TouchableOpacity onPress={setSelectedDateNextWeek} >
      <Image
        style={styles.rightArrow}
        contentFit="cover"
        source={require("../assets/right-arrow-black.png")}
      />
      {/* <Text style={styles.selectorText}>Next</Text> */}
    </TouchableOpacity>
  );

  useEffect(() => {
    // Define the function within useEffect to avoid defining it on each render
    const loadHistoryBookings = () => {
      const db = getFirestore();
      const auth = getAuth();
      const userUID = auth.currentUser?.uid;
      if (!userUID) return;

      const formattedSelectedDate = selectedDate.format('MMMM D, YYYY');

      const q = query(
        collection(db, "serviceBookings", userUID, "historyBookings"),
        where("date", "==", formattedSelectedDate)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let bookings = [];
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            bookings.push({ id: doc.id, ...doc.data() });
          });
          setHistoryBookings(bookings);
        } else {
          setHistoryBookings([]);
          console.log("No bookings for the selected date.");
        }
      }, (error) => {
        console.log("Error fetching history bookings: ", error);
      });

      return unsubscribe;
    };

    // Call the function to set up the listener
    const unsubscribe = loadHistoryBookings();

    // Clean up function
    return () => unsubscribe && unsubscribe();
  }, [selectedDate]);

  const getFormattedServiceName = (item) => {
    // Check if the title is "Pet Care" or "Gardening"
    if (item.title === "Pet Care" || item.title === "Gardening") {
      return item.category;
    } else {
      // If not, concatenate the title and category
      return `${item.title} ${item.category}`;
    }
  };

  const openCancelBookingBtn = useCallback(() => {
    setCancelBookingBtnVisible(true);
  }, []);

  const closeCancelBookingBtn = useCallback(() => {
    setCancelBookingBtnVisible(false);
  }, []);

  const openCancelBookingBtn1 = useCallback(() => {
    setCancelBookingBtn1Visible(true);
  }, []);

  const closeCancelBookingBtn1 = useCallback(() => {
    setCancelBookingBtn1Visible(false);
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <View>
        <HistoryBookingCard
          status={item.status}
          date={item.date}
          time={item.time}
          location={item.address}
          serviceName={getFormattedServiceName(item)}
          providerName={item.providerName}
          phone={item.providerPhone}
          id={item.id}
        />
      </View> 
    );
  };

    // Render functions should be memoized with useCallback to prevent unnecessary re-renders
    // const renderItem = useCallback(({ item }) => (
    //   <HistoryBookingCard
    //     status={item.status}
    //     date={item.date}
    //     time={item.time}
    //     location={item.address}
    //     serviceName={getFormattedServiceName(item)}
    //     providerName={item.providerName}
    //     id={item.id}
    //   />
    // ), []);

  return (
    <>
      <View style={[styles.historyBookings]}>
      <View style={styles.image2531Wrapper}>
        <CalendarStrip
            // scrollable
            // calendarAnimation={{ type: 'sequence', duration: 1 }}
            daySelectionAnimation={{ type: 'background', duration: 300, highlightColor: '#007EA7' }}
            style={{ height: 100, width: '100%'}}
            calendarHeaderStyle={{ color: 'black', fontFamily: FontFamily.level2Semibold12 }}
            dateNameStyle={{ color: 'black', fontSize: 10}}
            dateNumberStyle={{ color: 'black', fontFamily: FontFamily.montserratMedium}}
            dayContainerStyle={{alignItems: 'center', justifyContent: 'center', width: 46, height: 46, paddingVertical: 10}}
            calendarColor={'white'}
            iconContainer={{ flex: 0.1 }}
            customDatesStyles={customDatesStyles}
            highlightDateNameStyle={{ color: 'white' }}
            highlightDateNumberStyle={{ color: 'white' }}
            highlightDateContainerStyle={{ backgroundColor: '#007EA7' }}
            markedDates={markedDates}
            datesBlacklist={datesBlacklistFunc}
            disabledDateNameStyle={{color: '#464646'}}
            disabledDateNumberStyle={{color: '#464646'}}
            startingDate={startingDate} // Use the startingDate state here
            selectedDate={selectedDate}
            onDateSelected={onDateSelected}
            useIsoWeekday={false}
            leftSelector={[CustomLeftSelector]}
            rightSelector={[CustomRightSelector]}
          />
            {/* <Text style={{ fontSize: 24 }}>Selected Date: {formattedDate}</Text> */}
      </View>
        {historyBookings?.length === 0 ? (
      // Display when there are no bookings
      <View style={styles.activeTabsSpaceBlock}>
        <View style={styles.componentsBookingsInner}>
          <View style={styles.frameParent1}>
            <View style={styles.componentsBookingsInner1}>
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
                <Pressable style={styles.componentsbutton} onPress={() =>navigation.navigate("BottomTabsRoot", { screen: "Homepage" })}>
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
    ) :(
        <FlatList
          scrollEnabled={true}
          showsVerticalScrollIndicator={true}
          data={historyBookings}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
      </View>
    </>
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
    borderRadius: Border.br_3xs,
    alignItems: "center",
    alignSelf: "stretch",
  },
  leftArrow: {
    width: 25,
    height: 25,
  },
  rightArrow: {
    width: 25,
    height: 25,
  },

    // Empty Bookings Styles
    activeTabsSpaceBlock: {
      // marginTop: 15,
      // paddingVertical: 0,
      // paddingHorizontal: Padding.p_base,
      alignItems: "center",
      alignSelf: "stretch",
    },
    bookingsTypo: {
      color: Color.neutral07,
      fontFamily: FontFamily.title2Bold32,
      fontWeight: "700",
    },
    componentsBookingsInner: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      alignSelf: "stretch",
    },
    componentsBookingsInner1: {
      alignItems: "center",
      alignSelf: "stretch",
    },
    frameParent1: {
      paddingVertical: Padding.p_xl,
      paddingHorizontal: Padding.p_xl,
      // borderRadius: Border.br_5xs,
      backgroundColor: Color.white,
    },
    component13Icon: {
      left: 10,
      width: 93,
      height: 90,
    },
    frameWrapperFlexBox: {
      marginTop: 32,
      alignItems: "center",
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
    viewAllServicesLayout: {
      lineHeight: 24,
      letterSpacing: -0.1,
      textAlign: "center",
    },
    frameWrapper: {
      paddingHorizontal: Padding.p_51xl,
      paddingVertical: 0,
      justifyContent: "center",
    },
    componentsbuttonWrapper: {
      justifyContent: "center",
      alignItems: "center",
    },
    componentsbutton: {
      backgroundColor: Color.colorDarkslategray_900,
      paddingHorizontal: Padding.p_3xl,
      paddingVertical: Padding.p_xs,
      borderRadius: Border.br_5xs,
      flexDirection: "row",
    },
    viewAllServices: {
      fontSize: FontSize.body1Semibold_size,
      color: Color.neutral01,
      width: 122,
      fontFamily: FontFamily.title2Bold32,
      fontWeight: "700",
      letterSpacing: -0.1,
    },


    
  image2531Wrapper: {
    justifyContent: "center",
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
  rectangleFrame: {
    backgroundColor: Color.colorSilver_100,
  },
  cancelled: {
    backgroundColor: Color.colorFirebrick_100,
  },
  cancelledWrapper: {
    width: 83,
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
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: Padding.p_xl,
    // alignItems: "center",
    backgroundColor: Color.white,
    alignSelf: "stretch",
  },
});

export default HistoryBookings;
