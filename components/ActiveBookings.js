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
  serverTimestamp,
  runTransaction,
  writeBatch,
} from "firebase/firestore"; // Updated imports
import { getAuth } from "firebase/auth";
import ActiveBookingCard from "./ActiveBookingCard";
import CancelActiveBookingPrompt from "./CancelActiveBookingPrompt";
import CancelActiveBookingSuccessful from "./CancelActiveBookingSuccessful";

const ActiveBookings = ({ style }) => {

  const [cancelBookingBtn2Visible, setCancelBookingBtn2Visible] = useState(false);
  const [cancelBookingBtn3Visible, setCancelBookingBtn3Visible] = useState(false);
  const navigation = useNavigation();
  const [activeBookings, setActiveBookings] = useState([]);
  const [providerID, setProviderID] = useState(""); // State to hold the selected booking ID for cancellation
  const [matchedBookingID, setMatchedBookingID] = useState(""); 
  const [selectedBookingId, setSelectedBookingId] = useState(null); // State to hold the selected booking ID for cancellation
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State to control visibility of the success modal

  const closeCancelBookingBtn2 = useCallback(() => {
    setCancelBookingBtn2Visible(false);
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
      const bookingDocRef = await getDoc(bookingRef);
      if (bookingDocRef.exists()) {
        setProviderID(bookingDocRef.acceptedBy);
      }
      await deleteDoc(bookingRef);
      console.log("Booking deleted: ", id);
      // Update the active bookings state to reflect the deletion
      setActiveBookings(currentBookings => currentBookings.filter(booking => booking.id !== id));
    } catch (error) {
      console.error("Error deleting booking: ", error);
    }
  };

  // Callback to open the cancellation prompt
  const openCancelModal = (bookingId, serviceProviderID, bookingID) => {
    setSelectedBookingId(bookingId); // Set the selected booking ID
    setProviderID(serviceProviderID);
    setMatchedBookingID(bookingID);
    // Logic to show the CancelBookingPrompt modal
    // ...
    console.log("Provider ID: ", providerID); 
    console.log("Booking ID: ", matchedBookingID); 
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
      // await deleteBooking(selectedBookingId);
      setSelectedBookingId(null);
      setShowSuccessModal(true);
      console.log("Provider ID: ", providerID);

      const db = getFirestore();
      const auth = getAuth();
      const userUID = auth.currentUser.uid;
      const bookingRef = doc(db, "serviceBookings", userUID, "activeBookings", selectedBookingId);
  
      // try {
      //   const bookingDocRef = await getDoc(bookingRef);
      //   if (bookingDocRef.exists()) {
      //     setProviderID(bookingDocRef.acceptedBy);
      //   }
      //   await deleteDoc(bookingRef);
      //   console.log("Booking deleted: ", selectedBookingId);
      //   // Update the active bookings state to reflect the deletion
      //   setActiveBookings(currentBookings => currentBookings.filter(booking => booking.id !== selectedBookingId));
      // } catch (error) {
      //   console.error("Error deleting booking: ", error);
      // }

      // Start a Firestore transaction
      await runTransaction(db, async (transaction) => {
        // Get the current document
        const userBookingSnapshot = await transaction.get(bookingRef);

        if (!userBookingSnapshot.exists()) {
          throw "Document does not exist!";
        }

        const userBookingData = userBookingSnapshot.data();
        
        // Update the status to "Completed"
        transaction.update(bookingRef, { status: "Canceled" });

        // Move the document to the activeBookings collection
        const historyBookingDocRef = doc(db, "serviceBookings", userUID, "historyBookings", selectedBookingId);
        transaction.set(historyBookingDocRef, { ...userBookingData, status: "Canceled" });

        // Delete the document from historyBookings collection
        transaction.delete(bookingRef);

        // Update the provider profile
        const providerDocRef = doc(db, 'providerProfiles', providerID);
        transaction.update(providerDocRef, {
          availability: "available",
          bookingID: "",
          bookingIndex: null,
          bookingMatched: false,
        });
        console.log("User booking cancelled and moved to historyBookings");
      });

      const providerBookingDocRef = collection(db, "providerProfiles", providerID, "activeBookings");

      const q = query(providerBookingDocRef, where("bookingID", "==", matchedBookingID));
      const querySnapshot = await getDocs(q);

      // Run a batch operation to move the booking to historyBookings and update the provider profile
      const batch = writeBatch(db);

      querySnapshot.forEach((document) => {
        const docRef = doc(db, "providerProfiles", providerID, "activeBookings", document.id);
        const historyDocRef = doc(db, "providerProfiles", providerID, "historyBookings", document.id);

        // Copy the document to historyBookings
        batch.set(historyDocRef, { ...document.data(), status: "Completed" });

        // Delete the document from activeBookings
        batch.delete(docRef);
      });

      // Commit the batch
      await batch.commit();
      console.log("Provider Booking canceled and moved to historyBookings");

      const notifDocRef = doc(db, "userProfiles", userUID);
      const notifCollection = collection(notifDocRef, "notifications");
  
      const today = new Date();
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formattedDate = today.toLocaleDateString("en-US", options); // Adjust locale as needed

      const bookingDataNotif = {
        [generateRandomBookingIDWithNumbers()]: {
          subTitle: `Booking ${selectedBookingId} has been cancelled successfully`,
          title: "Booking Cancelled",
          createdAt: serverTimestamp(),
        },
        date: serverTimestamp(),
      };

      const notificationDocRef = doc(notifCollection, formattedDate);

      try {
        const notificationDoc = await getDoc(notificationDocRef);
        if (notificationDoc.exists()) {
          // Document exists, update it
          await setDoc(notificationDocRef, bookingDataNotif, {
            merge: true,
          });
          console.log("Notification updated successfully!");
        } else {
          // Document doesn't exist, create it
          await setDoc(notificationDocRef, bookingDataNotif);
          console.log("New notification document created!");
        }
      } catch (error) {
        console.error("Error updating notification:", error);
      }

      const notifDocRef2 = doc(db, "providerProfiles", providerID);
      const notifCollection2 = collection(notifDocRef2, "notifications");

      const bookingDataNotif2 = {
        [generateRandomBookingIDWithNumbers()]: {
          subTitle: `We regret to inform you that your Booking ${selectedBookingId} has been cancelled by the customer`,
          title: "Booking Cancelled",
          createdAt: serverTimestamp(),
        },
        date: serverTimestamp(),
      };

      const notificationDocRef2 = doc(notifCollection2, formattedDate);

      try {
        const notificationDoc = await getDoc(notificationDocRef);
        if (notificationDoc.exists()) {
          // Document exists, update it
          await setDoc(notificationDocRef2, bookingDataNotif2, {
            merge: true,
          });
          console.log("Notification updated successfully!");
        } else {
          // Document doesn't exist, create it
          await setDoc(notificationDocRef2, bookingDataNotif2);
          console.log("New notification document created!");
        }
      } catch (error) {
        console.error("Error updating notification:", error);
      }
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false); // Hide the success modal
    setSelectedBookingId(null);
    // Optionally, navigate back to the ActiveBookingsScreen or refresh the bookings list
  };

  function generateRandomBookingIDWithNumbers(length = 8) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let bookingID = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      bookingID += characters.charAt(randomIndex);
    }
    return bookingID;
  }

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
        onOpenCancelModal={() => openCancelModal(item.id, item.acceptedBy, item.bookingID)}
      />
      
      {selectedBookingId !== null && (
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
            onPress={closeSuccessModal}
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
      </View>
      )}

      {/* <Modal
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
      </Modal> */}
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
