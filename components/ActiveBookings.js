import React, { useState, useCallback, useEffect } from "react";
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
} from "react-native";
import { Image } from "expo-image";
import CancelBookingPrompt from "./CancelBookingPrompt";
import { useNavigation } from "@react-navigation/native";
import { Padding, Border, Color, FontSize, FontFamily } from "../GlobalStyles";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  setDoc,
  where,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore"; // Updated imports
import { getAuth, onAuthStateChanged, updateEmail } from "firebase/auth";
import ActiveBookingCard from "./ActiveBookingCard";
import CancelActiveBookingPrompt from "./CancelActiveBookingPrompt";
import CancelActiveBookingSuccessful from "./CancelActiveBookingSuccessful";

const ActiveBookings = ({ style }) => {
  const [cancelBookingBtnVisible, setCancelBookingBtnVisible] = useState(false);
  const [cancelBookingBtn1Visible, setCancelBookingBtn1Visible] =
    useState(false);
  const [cancelBookingBtn2Visible, setCancelBookingBtn2Visible] =
    useState(false);
  const [cancelBookingBtn3Visible, setCancelBookingBtn3Visible] =
    useState(false);
  const navigation = useNavigation();
  const [activeBookings, setActiveBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null); // State to hold the selected booking ID for cancellation
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State to control visibility of the success modal

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

  const openCancelBookingBtn2 = useCallback(() => {
    setCancelBookingBtn2Visible(true);
  }, []);

  const closeCancelBookingBtn2 = useCallback(() => {
    setCancelBookingBtn2Visible(false);
  }, []);

  const openCancelBookingBtn3 = useCallback(() => {
    setCancelBookingBtn3Visible(true);
  }, []);

  const closeCancelBookingBtn3 = useCallback(() => {
    setCancelBookingBtn3Visible(false);
  }, []);

  const fetchActiveBookings = () => {
    const db = getFirestore();
    const auth = getAuth();
    const userUID = auth.currentUser.uid;

    const docRef = query(collection(db, "serviceBookings", userUID, "activeBookings"), orderBy("createdAt", "desc"));
    
    // Set up the listener with onSnapshot
    onSnapshot(docRef, (documentSnapshot) => {
      let bookings = [];
      if (!documentSnapshot.empty) {
        documentSnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          bookings.push({ id: doc.id, ...doc.data() });
          setActiveBookings(bookings);
        });
        console.log("Updated Active Bookings: " , bookings);

        // const data = documentSnapshot.data();
        // const bookings = data.bookings || []; // Access the bookings array field
        // setActiveBookings(bookings);
        // console.log("Bookings: ", bookings);
        // Here you can set bookings to state or process them as needed
      } else {
        setActiveBookings([]);
        console.log("The 'activeBookings' collection is empty.");
      }
    }, (error) => {
      // Handle errors, e.g., permission issues
      console.log("Error fetching active bookings: ", error);
    });
  };

  const getFormattedServiceName = (item) => {
    // Check if the title is "Pet Care" or "Gardening"
    if (item.title === "Pet Care" || item.title === "Gardening") {
      return item.category;
    } else {
      // If not, concatenate the title and category
      return `${item.title} ${item.category}`;
    }
  };

  useEffect(() => {
    const loadActiveBookings =  () => {
      const bookings = fetchActiveBookings();
      setActiveBookings(bookings);
      console.log("Active Bookings: " , activeBookings);
    };

    loadActiveBookings();
  }, []);

  // Define the function to delete a booking
  const deleteBooking = async (id) => {
    const db = getFirestore();
    const auth = getAuth();
    const userUID = auth.currentUser.uid;
    const bookingRef = doc(db, "serviceBookings", userUID, "activeBookings", id);

    try {
      await deleteDoc(bookingRef);
      console.log("Booking deleted: ", id);
      // Update the active bookings state to reflect the deletion
      setActiveBookings(currentBookings => currentBookings.filter(booking => booking.id !== id));
    } catch (error) {
      console.error("Error deleting booking: ", error);
    }
  };

    // Callback to open the cancellation prompt
    const openCancelModal = (bookingId) => {
      setSelectedBookingId(bookingId); // Set the selected booking ID
      // Logic to show the CancelBookingPrompt modal
      // ...
    };
  
    // Callback to close the cancellation prompt
    const closeCancelModal = () => {
      setSelectedBookingId(null); // Clear the selected booking ID
      // Logic to hide the CancelBookingPrompt modal
      // ...
    };
  
    // Callback for when the cancellation is confirmed
    const handleCancelConfirm = async () => {
      if (selectedBookingId) {
        await deleteBooking(selectedBookingId);
        closeCancelModal();
        setShowSuccessModal(true); 
      }
    };

    const closeSuccessModal = () => {
      setShowSuccessModal(false); // Hide the success modal
      // Optionally, navigate back to the ActiveBookingsScreen or refresh the bookings list
    };

  const renderItem = ({ item, index }) => {
    return (
      <View>
        <ActiveBookingCard
        status={item.status}
        date={item.date}
        time={item.time}
        location={item.address}
        serviceName={getFormattedServiceName(item)}
        providerName={item.providerName}
        id={item.id}
        phone={item.providerPhone}
        onOpenCancelModal={() => openCancelModal(item.id)}
      />
      
      {selectedBookingId && (
        <Modal
          animationType="fade"
          transparent
          visible={selectedBookingId !== null}
          // onRequestClose={closeCancelModal}
        >
          <View style={styles.logoutButtonOverlay}>
          <Pressable
            style={styles.logoutButtonBg}
            onPress={closeCancelModal}
          />
            <CancelActiveBookingPrompt
              onClose={closeCancelModal}
              onConfirm={handleCancelConfirm}
            />
          </View>
        </Modal>
      )}

      <Modal
        animationType="fade"
        transparent
        visible={showSuccessModal}
        // onRequestClose={closeSuccessModal}
      >
          <View style={styles.logoutButtonOverlay}>
          <Pressable
            style={styles.logoutButtonBg}
            onPress={closeCancelModal}
          />
            <CancelActiveBookingSuccessful onClose={closeSuccessModal} />
          </View>
      </Modal>
    </View> 
    );
  };

  return (
    <>
      {activeBookings?.length === 0 ? (
      // Display when there are no bookings
      <View style={styles.activeTabsSpaceBlock}>
        <View style={styles.componentsBookingsInner}>
          <View style={styles.frameParent1}>
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
    ) :(<View style={[styles.activeBookings, style]}>
        <FlatList
          scrollEnabled={true}
          showsVerticalScrollIndicator={true}
          data={activeBookings}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        {/* <View style={styles.frameFlexBox}>
          <View style={[styles.rectangleFrame, styles.rectangleFrameShadowBox]}>
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
                  <Text style={styles.deepCleaning}>Deep Cleaning</Text>
                  <Text
                    style={[styles.dummyProvider1, styles.messageBtnSpaceBlock]}
                  >
                    Dummy Provider #1
                  </Text>
                </View>
                <View style={styles.pendingWrapper}>
                  <View style={[styles.pending, styles.pendingFlexBox]}>
                    <Text style={styles.pending1}>Pending</Text>
                  </View>
                </View>
              </View>
              <View style={[styles.callBtnParent, styles.parentSpaceBlock]}>
                <Pressable style={styles.callBtn}>
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
                </Pressable>
                <Pressable
                  style={[styles.messageBtn, styles.messageBtnSpaceBlock]}
                >
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
                </Pressable>
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
                  <Text
                    style={[styles.aug112023, styles.textTypo]}
                  >{`Aug 11, 2023 `}</Text>
                  <Text style={[styles.text, styles.textTypo]}>|</Text>
                  <Text style={[styles.text, styles.textTypo]}> 8:00 AM</Text>
                </View>
              </View>
              <View style={[styles.frameGroup, styles.frameGroupFlexBox]}>
                <View style={styles.locationWrapper}>
                  <Text style={styles.dateTime}>Location</Text>
                </View>
                <View style={styles.uscTalambanCebuCityCebuWrapper}>
                  <Text
                    style={[styles.uscTalambanCebu, styles.textTypo]}
                  >{`USC Talamban, Cebu City, Cebu, Region 7, Philippines `}</Text>
                </View>
              </View>
            </View>
            <View style={[styles.buttonsFrame, styles.frameSpaceBlock]}>
              <Pressable
                style={[styles.cancelBookingBtn, styles.btnBorder]}
                onPress={openCancelBookingBtn}
              >
                <Text style={[styles.cancelBooking, styles.viewDetailsTypo]}>
                  Cancel Booking
                </Text>
              </Pressable>
              <Pressable
                style={[styles.viewDetailsBtn, styles.btnBorder]}
                onPress={() => navigation.navigate("BookingDetails")}
              >
                <Text style={[styles.viewDetails, styles.viewDetailsTypo]}>
                  View Details
                </Text>
              </Pressable>
            </View>
          </View>
        </View> */}
        {/* <ActiveBookingCard>

        </ActiveBookingCard> */}
        {/* <View style={[styles.upcomingFrame, styles.frameFlexBox]}>
          <View
            style={[styles.rectangleFrame1, styles.rectangleFrameShadowBox]}
          >
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
                  <Text style={styles.deepCleaning}>Dog Training</Text>
                  <Text
                    style={[styles.dummyProvider1, styles.messageBtnSpaceBlock]}
                  >
                    Dummy Provider #1
                  </Text>
                </View>
                <View style={styles.upcomingWrapper}>
                  <View style={[styles.upcoming, styles.pendingFlexBox]}>
                    <Text style={styles.pending1}>Upcoming</Text>
                  </View>
                </View>
              </View>
              <View style={[styles.callBtnParent, styles.parentSpaceBlock]}>
                <Pressable style={styles.callBtn}>
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
                </Pressable>
                <Pressable
                  style={[styles.messageBtn, styles.messageBtnSpaceBlock]}
                >
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
                </Pressable>
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
                  <Text
                    style={[styles.aug112023, styles.textTypo]}
                  >{`Aug 11, 2023 `}</Text>
                  <Text style={[styles.text, styles.textTypo]}>|</Text>
                  <Text style={[styles.text, styles.textTypo]}> 8:00 AM</Text>
                </View>
              </View>
              <View style={[styles.frameGroup, styles.frameGroupFlexBox]}>
                <View style={styles.locationWrapper}>
                  <Text style={styles.dateTime}>Location</Text>
                </View>
                <View style={styles.uscTalambanCebuCityCebuWrapper}>
                  <Text
                    style={[styles.uscTalambanCebu, styles.textTypo]}
                  >{`USC Talamban, Cebu City, Cebu, Region 7, Philippines `}</Text>
                </View>
              </View>
            </View>
            <View style={[styles.buttonsFrame, styles.frameSpaceBlock]}>
              <Pressable
                style={[styles.cancelBookingBtn, styles.btnBorder]}
                onPress={openCancelBookingBtn1}
              >
                <Text style={[styles.cancelBooking, styles.viewDetailsTypo]}>
                  Cancel Booking
                </Text>
              </Pressable>
              <Pressable
                style={[styles.viewDetailsBtn, styles.btnBorder]}
                onPress={() => navigation.navigate("BookingDetails")}
              >
                <Text style={[styles.viewDetails, styles.viewDetailsTypo]}>
                  View Details
                </Text>
              </Pressable>
            </View>
          </View>
        </View> */}
        {/* <View style={[styles.upcomingFrame, styles.frameFlexBox]}>
          <View
            style={[styles.rectangleFrame2, styles.rectangleFrameShadowBox]}
          >
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
                  <Text style={styles.deepCleaning}>Pest Control</Text>
                  <Text
                    style={[styles.dummyProvider1, styles.messageBtnSpaceBlock]}
                  >
                    Dummy Provider #1
                  </Text>
                </View>
                <View style={styles.upcomingWrapper}>
                  <View style={[styles.inTransit, styles.pendingFlexBox]}>
                    <Text style={styles.pending1}>In Transit</Text>
                  </View>
                </View>
              </View>
              <View style={[styles.callBtnParent, styles.parentSpaceBlock]}>
                <Pressable style={styles.callBtn2}>
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
                </Pressable>
                <Pressable
                  style={[styles.messageBtn, styles.messageBtnSpaceBlock]}
                >
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
                </Pressable>
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
                  <Text
                    style={[styles.aug112023, styles.textTypo]}
                  >{`Aug 11, 2023 `}</Text>
                  <Text style={[styles.text, styles.textTypo]}>|</Text>
                  <Text style={[styles.text, styles.textTypo]}> 8:00 AM</Text>
                </View>
              </View>
              <View style={[styles.frameGroup, styles.frameGroupFlexBox]}>
                <View style={styles.locationWrapper}>
                  <Text style={styles.dateTime}>Location</Text>
                </View>
                <View style={styles.uscTalambanCebuCityCebuWrapper}>
                  <Text
                    style={[styles.uscTalambanCebu, styles.textTypo]}
                  >{`USC Talamban, Cebu City `}</Text>
                </View>
              </View>
            </View>
            <View style={[styles.buttonsFrame, styles.frameSpaceBlock]}>
              <Pressable
                style={[styles.cancelBookingBtn, styles.btnBorder]}
                onPress={openCancelBookingBtn2}
              >
                <Text style={[styles.cancelBooking, styles.viewDetailsTypo]}>
                  Cancel Booking
                </Text>
              </Pressable>
              <Pressable
                style={[styles.viewDetailsBtn, styles.btnBorder]}
                onPress={() => navigation.navigate("BookingDetails")}
              >
                <Text style={[styles.viewDetails, styles.viewDetailsTypo]}>
                  View Details
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={[styles.upcomingFrame, styles.frameFlexBox]}>
          <View
            style={[styles.rectangleFrame3, styles.rectangleFrameShadowBox]}
          >
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
                  <Text style={styles.deepCleaning}>
                    Electrical Installation
                  </Text>
                  <Text
                    style={[styles.dummyProvider1, styles.messageBtnSpaceBlock]}
                  >
                    Dummy Provider #1
                  </Text>
                </View>
                <View style={styles.inProgressWrapper}>
                  <View style={[styles.inProgress, styles.pendingFlexBox]}>
                    <Text style={styles.pending1}>In Progress</Text>
                  </View>
                </View>
              </View>
              <View style={[styles.callBtnParent, styles.parentSpaceBlock]}>
                <Pressable style={styles.callBtn}>
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
                </Pressable>
                <Pressable
                  style={[styles.messageBtn, styles.messageBtnSpaceBlock]}
                >
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
                </Pressable>
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
                  <Text
                    style={[styles.aug112023, styles.textTypo]}
                  >{`Aug 11, 2023 `}</Text>
                  <Text style={[styles.text, styles.textTypo]}>|</Text>
                  <Text style={[styles.text, styles.textTypo]}> 8:00 AM</Text>
                </View>
              </View>
              <View style={[styles.frameGroup, styles.frameGroupFlexBox]}>
                <View style={styles.locationWrapper}>
                  <Text style={styles.dateTime}>Location</Text>
                </View>
                <View style={styles.uscTalambanCebuCityCebuWrapper}>
                  <Text style={[styles.uscTalambanCebu, styles.textTypo]}>
                    USC Talamban, Cebu City
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.buttonsFrame, styles.frameSpaceBlock]}>
              <Pressable
                style={[styles.cancelBookingBtn, styles.btnBorder]}
                onPress={openCancelBookingBtn3}
              >
                <Text style={[styles.cancelBooking, styles.viewDetailsTypo]}>
                  Cancel Booking
                </Text>
              </Pressable>
              <Pressable
                style={[styles.viewDetailsBtn, styles.btnBorder]}
                onPress={() => navigation.navigate("BookingDetails")}
              >
                <Text style={[styles.viewDetails, styles.viewDetailsTypo]}>
                  View Details
                </Text>
              </Pressable>
            </View>
          </View>
        </View> */}
      </View>
      )}

      {/* <Modal animationType="fade" transparent visible={cancelBookingBtnVisible}>
        <View style={styles.cancelBookingBtnOverlay}>
          <Pressable
            style={styles.cancelBookingBtnBg}
            onPress={closeCancelBookingBtn}
          />
          <CancelBookingPrompt onClose={closeCancelBookingBtn} />
        </View>
      </Modal> */}

      {/* <Modal
        animationType="fade"
        transparent
        visible={cancelBookingBtn1Visible}
      >
        <View style={styles.cancelBookingBtn1Overlay}>
          <Pressable
            style={styles.cancelBookingBtn1Bg}
            onPress={closeCancelBookingBtn1}
          />
          <CancelBookingPrompt onClose={closeCancelBookingBtn1} />
        </View>
      </Modal> */}

      <Modal
        animationType="fade"
        transparent
        visible={cancelBookingBtn2Visible}
      >
        <View style={styles.cancelBookingBtn2Overlay}>
          <Pressable
            style={styles.cancelBookingBtn2Bg}
            onPress={closeCancelBookingBtn2}
          />
          <CancelBookingPrompt onClose={closeCancelBookingBtn2} />
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent
        visible={cancelBookingBtn3Visible}
      >
        <View style={styles.cancelBookingBtn3Overlay}>
          <Pressable
            style={styles.cancelBookingBtn3Bg}
            onPress={closeCancelBookingBtn3}
          />
          <CancelBookingPrompt onClose={closeCancelBookingBtn3} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  logoutButtonOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  logoutButtonBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
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
    fontSize: FontSize.size_3xs,
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
    width: 73,
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
  buttonsFrame: {
    paddingBottom: Padding.p_3xs,
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
  },
  rectangleFrame: {
    backgroundColor: Color.colorAliceblue,
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
  rectangleFrame1: {
    backgroundColor: Color.colorGainsboro_200,
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
  rectangleFrame2: {
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
    flex: 1,
    backgroundColor: Color.white,
    alignSelf: "stretch",
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
  frameParent1: {
    paddingVertical: Padding.p_121xl,
    paddingHorizontal: Padding.p_xl,
    borderRadius: Border.br_5xs,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: Color.white,
  },
  component13Icon: {
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
});

export default ActiveBookings;
