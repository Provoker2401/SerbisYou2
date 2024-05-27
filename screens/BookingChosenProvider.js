import * as React from "react";
import {
  StatusBar,
  StyleSheet,
  Pressable,
  View,
  Animated,
  Modal,
} from "react-native";
import { Image } from "expo-image";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Border, FontSize, Color, Padding } from "../GlobalStyles";
import BookingChosenProviderModal from "../components/BookingChosenProviderModal";
import Toast from "react-native-toast-message";
import NoProvidersFound from "../components/NoProvidersFound";
import ServiceProviderDecline from "../components/ServiceProviderDecline";
import MapView, { Marker, Circle } from "react-native-maps";
import { Easing } from "react-native-reanimated";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDocs,
  collection,
  query,
  where,
  getDoc,
  runTransaction,
  onSnapshot,
  updateDoc,
  addDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { Audio } from "expo-av";
import { useSearchingContext } from "../SearchingContext";
import { useDateTimeContext } from "../DateTimeContext";

const BookingChosenProvider = ({ route }) => {
  const providersMatched = [];
  const { selectedDateContext, selectedTimeContext } = useDateTimeContext();

  const navigation = useNavigation();

  const mapRef = useRef(null);
  const circleRadius = useRef(new Animated.Value(0)).current;
  const colorValue = useRef(new Animated.Value(0)).current;

  const [booking, setBooking] = useState(null);
  const [bookingAccepted, setBookingAccepted] = useState(null);
  const [bookingTotal, setBookingTotal] = useState("");
  const [bookingPaymentMethod, setBookingPaymentMethod] = useState("");
  const [acceptedByProvider, setacceptedByProvider] = useState(null);
  const stopSearchingRef = useRef(false);

  const { firstProviderIds, setFirstProviderIdsValue } = useSearchingContext();
  const [noProviderVisible, setnoProviderVisible] = useState(false);
  const [bookingAssigned, setBookingAssigned] = useState(false);
  const [gotoFound, setGoToFound] = useState(false);
  const [sound, setSound] = useState();
  const [bookingIndex, setBookingIndex] = useState(null);
  const {
    latitude,
    longitude,
    sliderValue,
    location,
    title,
    category,
    extractedNames,
    bookingID,
    serviceBookingUID,
    providerName,
    providerLat,
    providerLong,
    markerUid,
  } = route.params;

  //Step 1
  useEffect(() => {
    console.log("Service Booking UID:", serviceBookingUID);
    console.log("bookingID:", bookingID);

    const fetchBookingIndex = async () => {
      try {
        const db = getFirestore();
        const serviceBookingsCollection = collection(db, "serviceBookings");
        const serviceBookingDocRef = doc(
          serviceBookingsCollection,
          serviceBookingUID
        );

        const docSnapshot = await getDoc(serviceBookingDocRef);

        if (docSnapshot.exists()) {
          const bookingsArray = docSnapshot.data().bookings || [];
          console.log("Booking Array:", bookingsArray);

          const index = bookingsArray.findIndex(
            (booking) => booking.bookingID === bookingID
          );

          setBookingIndex(index);

          if (index !== -1) {
            const foundBooking = bookingsArray[index];
            console.log("FOUND BOOKING DETAILS:", foundBooking);
          } else {
            console.log("Booking ID not found in the array");
          }
        } else {
          console.log("Document does not exist");
        }
      } catch (error) {
        console.error("Error fetching booking index:", error);
      }
    };

    fetchBookingIndex();
  }, [serviceBookingUID, bookingID]);

  useEffect(() => {
    if (bookingIndex !== null) {
      console.log("Booking Index:", bookingIndex);

      handleBooking();
      fetchDetails();
    }
  }, [bookingIndex, markerUid]);

  //Step 2 check layer

  const checkProviderLayer = async (markerUid) => {
    try {
      const db = getFirestore();
      const auth = getAuth();

      const providerDocRef = doc(db, "providerProfiles", markerUid);
      const providerDocSnap = await getDoc(providerDocRef);

      // Check if the document exists
      if (providerDocSnap.exists()) {
        // Get the data from the document
        const providerData = providerDocSnap.data();

        const q = query(
          collection(db, "providerProfiles", markerUid, "activeBookings")
        );
        const querySnapshot = await getDocs(q);

        console.log(querySnapshot.size);

        if (querySnapshot.size >= 1) {
          querySnapshot.forEach((doc) => {
            // Get the data from each document in the subcollection
            const bookingData = doc.data();
            console.log("Booking Data: ", bookingData);

            if (
              bookingData.date === selectedDateContext &&
              bookingData.time === selectedTimeContext
            ) {
              console.log("Selected date and time are already booked.");
              return false;
            }
          });
        } else {
          console.log(
            "There are not enough documents in activeBookings subcollection."
          );
        }

        // Check the availability field
        if (providerData.availability !== "available") {
          console.log("Provider is not available");
          return false;
        } else {
          console.log("Provider is available");
          return true;
        }
      } else {
        console.log("No such document!");
        return false;
      }
    } catch (error) {
      console.error("Error checking provider layer: ", error);
      return false;
    }
  };

  const handleBooking = async () => {
    const isAvailable = await checkProviderLayer(markerUid);

    if (!isAvailable) {
      console.log("Provider is not available for booking");
      Toast.show({
        type: "error",
        position: "top",
        text1: "Service Error",
        text2: "Provider is not available for booking❗",
        visibilityTime: 5000,
      });
    } else {
      //Step 3 proceed wit the booking ping the provider
      console.log("Proceed with booking");
      pingProvider();
    }
  };

  const pingProvider = async () => {
    try {
      const db = getFirestore();
      const auth = getAuth();

      const providerDocRef = doc(db, "providerProfiles", markerUid);
      const providerDocSnap = await getDoc(providerDocRef);

      // Check if the document exists
      if (providerDocSnap.exists()) {
        // Get the data from the document

        const isAvailable = await checkProviderLayer(markerUid);

        if (isAvailable) {
          const providerData = providerDocSnap.data();
          console.log("Provider Data:", providerData);

          await updateDoc(providerDocRef, {
            bookingID: serviceBookingUID,
            bookingIndex: bookingIndex,
            bookingMatched: true,
            availability: "onHold",
          });
        }
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching provider data:", error);
    }
  };

  // Function to play the sound
  const playBookingSearchSound = async () => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../Sounds/success-fanfare-trumpets.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // const stopSearchingCallback = useCallback(async () => {
  //   console.log("I am executed");

  //   // Create a reference to the Firestore database using your app instance
  //   const db = getFirestore();

  //   if (markerUid) {
  //     // Create references to the user's document and the appForm2 subcollection
  //     const providerDocRef = doc(db, "providerProfiles", markerUid);
  //     console.log("I am executed 2");
  //     // Get the document snapshot
  //     const providerSnapshot = await getDoc(providerDocRef);
  //     if (providerSnapshot.exists()) {
  //       providerBookingID = providerSnapshot.data().bookingID;
  //       await updateDoc(providerDocRef, {
  //         bookingID: null,
  //       });
  //       console.log("Booking ID is set to null!");
  //     } else {
  //       console.log("Provider Snapshot does not exist!");
  //     }
  //   } else {
  //     console.log("Provider's UID is not yet fetched");
  //   }

  //   console.log("Gonna stop the booking!");
  //   stopSearchingRef.current = true;

  //   setBookingIndex(null);
  //   setBookingAssigned(false);
  //   setBookingAccepted(false);
  // }, []);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        console.log("fetchBooking function is called");
        console.log("bookingAccepted: ", bookingAccepted);
        console.log("acceptedByProvider: ", acceptedByProvider);

        if (bookingAccepted && acceptedByProvider) {
          // Create a reference to the Firestore database using your app instance
          const db = getFirestore();
          // Get the user's UID
          const auth = getAuth();
          const userUID = auth.currentUser.uid;

          const serviceBookingsCollection = collection(db, "serviceBookings");

          // Get the service booking document using userUID
          const serviceBookingDocRef = doc(serviceBookingsCollection, userUID);

          const userDocRef = doc(db, "serviceBookings", userUID);
          const activeBookings = collection(userDocRef, "activeBookings");

          // Get the document snapshot
          const serviceBookingSnapshot = await getDoc(serviceBookingDocRef);
          const providerDocRef = doc(
            collection(db, "providerProfiles"),
            acceptedByProvider
          );

          const providerProfileDoc = await getDoc(providerDocRef);
          if (providerProfileDoc.exists()) {
            const providerData = providerProfileDoc.data();

            // Combine provider data with existing booking data
            const updatedBooking = {
              ...booking,
              providerName: providerData.name,
              providerEmail: providerData.email,
              providerPhone: providerData.phone,
              providerCoordinates: {
                latitude: providerData.realTimeCoordinates.latitude,
                longitude: providerData.realTimeCoordinates.longitude,
              },
              createdAt: serverTimestamp(), // This will save the server's current timestamp
            };

            console.log("Provider Updated Data: ", updatedBooking);

            setBooking(updatedBooking);

            console.log("New Booking: ", booking);
            if (serviceBookingSnapshot.exists()) {
              const docRef = await addDoc(activeBookings, updatedBooking);

              // Get the unique ID of the newly added document
              const newDocumentID = docRef.id;
              console.log("Document added to 'activeBookings' successfully.");
            } else {
              console.error("No such document");
            }
          } else {
            console.error("No such document");
          }

          playBookingSearchSound();

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
            // Using bookingID as the key for the map inside the document
            [bookingID]: {
              subTitle: `Your booking ${bookingID} has been confirmed`,
              title: "Booking Successful!",
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

          console.log("Navigating to ServiceProvidersFound with:", {
            latitude,
            longitude,
            bookingID,
            serviceBookingUID,
            title,
            category,
            acceptedByProvider, // Pass acceptedByProvider to the next screen
          });

          navigation.navigate("ServiceProvidersFound", {
            latitude,
            longitude,
            bookingID,
            serviceBookingUID,
            title,
            category,
            acceptedByProvider, // Pass acceptedByProvider to the next screen
          });

          // Wait for the delay
          console.log("Still waiting for 10 seconds...");
          await new Promise((resolve) => setTimeout(resolve, 10 * 1000));

          if (bookingPaymentMethod !== "Cash") {
            const bookingDataNotif2 = {
              // Using bookingID as the key for the map inside the document
              [generateRandomBookingIDWithNumbers()]: {
                subTitle: `You'll only be charged the final amount once the service is complete. Any unused amount will be returned to your payment method.`,
                title: `₱${bookingTotal}.00 is currently on hold`,
                createdAt: serverTimestamp(),
              },
              date: serverTimestamp(),
            };

            const notificationDocRef2 = doc(notifCollection, formattedDate);

            console.log("Setting up Payment notification!");

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
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    };

    // Call the fetchBooking function initially
    fetchBooking();
  }, [bookingAccepted, acceptedByProvider]);

  const fetchDetails = () => {
    const db = getFirestore();
    const serviceBookingsCollection = collection(db, "serviceBookings");
    const serviceBookingDocRef = doc(
      serviceBookingsCollection,
      serviceBookingUID
    );

    const unsubscribe = onSnapshot(serviceBookingDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const blacklisted = docSnapshot.data().blackListed || [];

        console.log("BlackListed Array:", blacklisted);

        const bookingsArray = docSnapshot.data().bookings || [];
        // console.log("The booking array is: ", bookingsArray);
        // console.log("The bookingID to search is: ", bookingID);

        // find what index
        const index = bookingsArray.findIndex(
          (booking) => booking.bookingID === bookingID
        );

        if (blacklisted.includes(bookingID)) {
          setnoProviderVisible(true);
          unsubscribe(); // Stop listening to changes
          return; // Exit the function early
        }

        //console.log("The booking index is", index);

        if (index !== -1) {
          console.log("Match found at index:", index);
          const matchedBooking = bookingsArray[index];
          console.log("The matched booking details are:", matchedBooking);

          // // Add a new field 'status' with the value 'Upcoming' to the matched booking
          const updatedBooking = { ...matchedBooking, status: "Upcoming" };

          setBooking(updatedBooking);
          setBookingTotal(matchedBooking.totalPrice);
          setBookingPaymentMethod(matchedBooking.paymentMethod);
          console.log("Stored Booking: ", booking);

          // if bookingaccepted and accepted by if not undefined (eg true or has value)
          if (
            matchedBooking &&
            matchedBooking.bookingAccepted !== undefined &&
            matchedBooking.acceptedBy !== undefined
          ) {
            const bookingAccepted = matchedBooking.bookingAccepted;
            const acceptedByProvider = matchedBooking.acceptedBy;
            const blackListedCurrent = matchedBooking.blackListed;

            console.log("Accepted by:", acceptedByProvider);
            console.log("Blacklist is:", blackListedCurrent);
            console.log("Booking Accepted Field:", bookingAccepted);

            setBookingAssigned(matchedBooking.bookingAssigned);

            setnoProviderVisible(false);

            if (bookingAccepted && acceptedByProvider !== "") {
              console.log("This is true at index:", index);
              setacceptedByProvider(acceptedByProvider);
              setBookingAccepted(true);
              setnoProviderVisible(false);
              setGoToFound(true);
            } else {
              console.log("Error in booking accepted and acceptedbyProvider");
            }

            return unsubscribe; // Return the unsubscribe function to stop listening when needed
          } else {
            console.log("Invalid matched booking details");
          }
        } else {
          console.log("BookingID not found in the array");
        }
      } else {
        console.log("Document does not exist");
      }
    });

    return unsubscribe; // Return the unsubscribe function to stop listening when needed
  };
  const providerPosition =
    providerLat && providerLong
      ? { latitude: providerLat, longitude: providerLong }
      : null;

  function generateRandomBookingIDWithNumbers(length = 8) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let bookingID = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      bookingID += characters.charAt(randomIndex);
    }
    return bookingID;
  }

  useEffect(() => {
    const circleAnimation = Animated.loop(
      Animated.timing(circleRadius, {
        toValue: sliderValue * 1000,
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      })
    );

    const colorAnimation = Animated.loop(
      Animated.timing(colorValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      })
    );

    circleAnimation.start();
    colorAnimation.start();

    return () => {
      circleAnimation.stop();
      colorAnimation.stop();
    };
  }, [sliderValue]);

  const circleColor = colorValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(70, 130, 180, 0)", "rgba(70, 130, 180, 0.5)"], // Slightly darker sky blue color
  });

  const [initialMapRegion, setInitialMapRegion] = useState({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.16,
    longitudeDelta: 0.16,
  });

  const [initialMarkerPosition, setInitialMarkerPosition] = useState({
    latitude: latitude,
    longitude: longitude,
  });

  const [markerPosition, setMarkerPosition] = useState(initialMarkerPosition);
  const [reverseGeocodedAddress, setReverseGeocodedAddress] = useState(null);
  const [cityAddress, setCityAddress] = useState(null);

  const [seconds, setSeconds] = useState(20);

  useEffect(() => {
    // Define the async function inside useEffect
    const fetchAndResetAvailability = async () => {
      try {
        const db = getFirestore();
        const providerProfilesCollection = collection(db, "providerProfiles");
        const providerProfileDocRef = doc(
          providerProfilesCollection,
          markerUid
        );

        // Fetch the document data
        const providerProfileDocSnapshot = await getDoc(providerProfileDocRef);

        // Access the availability field
        if (providerProfileDocSnapshot.exists()) {
          const providerProfileData = providerProfileDocSnapshot.data();
          const availabilityData = providerProfileData.availability;
          // Now you can use the availabilityData as needed
          console.log(availabilityData);

          await updateDoc(providerProfileDocRef, {
            availability: "available",
            bookingID: "",
            bookingIndex: "",
            bookingMatched: false,
          });
        }
      } catch (error) {
        console.error("Error accessing availability data:", error);
      }
      setnoProviderVisible(true);
    };

    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      // Cleanup interval on component unmount or when seconds changes
      return () => clearInterval(interval);
    } else {
      fetchAndResetAvailability();
    }
  }, [seconds, markerUid, setnoProviderVisible]);

  return (
    <View style={styles.searchingDistanceRadius}>
      <StatusBar barStyle="default" />
      <View style={[styles.body, styles.frameFlexBox]}>
        <View style={styles.rowContainer}>
          <MapView
            style={styles.map}
            region={initialMapRegion}
            // onPress={handleMapPress}
            // provider={PROVIDER_GOOGLE}
          >
            <Marker
              coordinate={markerPosition}
              title="Pinned Location"
              draggable={false}
              image={require("../assets/icons8location100-2-1.png")}
            />
            {providerPosition && (
              <Marker
                coordinate={providerPosition}
                title="Provider Location"
                draggable={false}
                pinColor="blue" // You can change the color or image as needed
              />
            )}
            <AnimatedCircle
              center={markerPosition}
              radius={circleRadius}
              fillColor={circleColor}
            />
          </MapView>
        </View>

        <View style={[styles.backBtnWrapper, styles.valueEditThisPosition]}>
          <Pressable
            style={[styles.backBtn, styles.editWrapperFlexBox]}
            // onPress={stopBooking}
          >
            <Image
              style={styles.uiIconarrowBackwardfilled}
              contentFit="cover"
              source={require("../assets/ui-iconarrow-backwardfilled.png")}
            />
          </Pressable>
        </View>
        <Modal animationType="fade" transparent visible={noProviderVisible}>
          <View style={styles.noProviderContainer}>
            <ServiceProviderDecline />
          </View>
        </Modal>

        <View style={[styles.searchingDistanceRadiusModa]}>
          <BookingChosenProviderModal
            cityAddress={cityAddress}
            specificLocation={reverseGeocodedAddress || "Loading..."}
            latitude={latitude}
            longitude={longitude}
            city={cityAddress}
            location={location} // Pass the location prop
            title={title}
            category={category}
            providerName={providerName}
            markerUid={markerUid}
          />
        </View>
      </View>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  noProviderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchingDistanceRadius: {
    width: "100%",
    height: 812,
    alignItems: "center",
    flex: 1,
    backgroundColor: Color.white,
  },
  body: {
    alignSelf: "stretch",
    flex: 1,
  },
  frameParent: {
    alignSelf: "stretch",
    flex: 1,
  },
  backBtnWrapper: {
    left: 16,
    paddingHorizontal: 0,
    paddingVertical: Padding.p_mini,
    zIndex: 0,
    flexDirection: "row",
  },
  valueEditThisPosition: {
    top: 0,
    flexDirection: "row",
    position: "absolute",
  },
  backBtn: {
    height: 40,
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_9xs,
    width: 40,
    borderRadius: Border.br_xl,
    flexDirection: "row",
    backgroundColor: Color.white,
  },
  editWrapperFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  uiIconarrowBackwardfilled: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
  icons8Location10021Wrapper: {
    top: 252,
    left: 28,
    padding: Padding.p_3xs,
    zIndex: 1,
    overflow: "hidden",
    position: "absolute",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  icons8Location10021: {
    width: 50,
    height: 50,
  },

  // Location Styles
  rowContainer: {
    flex: 1,
    flexDirection: "row",
  },
  map: {
    flex: 1,
    // zIndex: 1,
  },

  // Searching Distance Radius Modal Styles
  kmTypo: {
    textAlign: "center",
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
  },
  sliderFrameParentFlexBox: {
    marginTop: 15,
    justifyContent: "center",
    alignSelf: "stretch",
    alignItems: "center",
  },
  valueEditThisLayout: {
    height: 4,
    borderRadius: Border.br_5xs,
  },
  textTypo: {
    fontSize: FontSize.level2Medium12_size,
    textAlign: "center",
  },
  iconLayout: {
    height: 30,
    width: 30,
  },
  addressDetailsBtnBg: {
    backgroundColor: Color.colorWhitesmoke_300,
    flexDirection: "row",
  },
  addAddressDetailsClr: {
    color: Color.colorDarkgray_300,
    textAlign: "left",
  },
  iconOutlineFlexBox: {
    padding: Padding.p_12xs,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  componentsbuttonFlexBox: {
    backgroundColor: Color.colorDarkslategray_900,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  bookmarkIconPosition: {
    height: 15,
    width: 15,
    left: 5,
    top: 5,
    position: "absolute",
  },
  componentsFlexBox: {
    borderRadius: Border.br_5xs,
    marginTop: 15,
    justifyContent: "center",
    alignSelf: "stretch",
    alignItems: "center",
  },
  editTypo: {
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "500",
    lineHeight: 20,
    alignSelf: "stretch",
  },
  frameChild: {
    borderStyle: "solid",
    borderColor: Color.colorDarkgray_400,
    borderTopWidth: 2,
    height: 2,
    width: 40,
  },
  searchingDistanceRadius1: {
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    lineHeight: 21,
    color: Color.colorGray_700,
  },
  searchingDistanceRadiusWrapper: {
    marginTop: 12,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  frameItem: {
    width: 342,
    marginTop: 12,
    height: 2,
  },

  spacer: {
    width: 4,
    height: 1,
  },
  text: {
    lineHeight: 16,
    fontWeight: "600",
    fontFamily: FontFamily.level2Semibold12,
    color: Color.gray100,
  },
  tooltip: {
    borderRadius: Border.br_9xs,
    backgroundColor: Color.gray700,
    shadowColor: "rgba(55, 65, 81, 0.06)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 1,
    paddingHorizontal: Padding.p_9xs,
    paddingVertical: Padding.p_11xs,
    flexDirection: "row",
    alignItems: "center",
  },
  atomSliderTooltip: {
    flexDirection: "row",
  },
  bgIcon: {
    marginTop: 5,
  },
  atomSliderDragHandle: {
    height: 20,
  },
  valueEditThis: {
    left: 0,
    backgroundColor: Color.blue500,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    top: 0,
    position: "absolute",
  },
  atomSliderRangeNew: {
    backgroundColor: Color.gray200,
    alignSelf: "stretch",
  },
  sliderFrame: {
    paddingRight: Padding.p_131xl,
    flex: 1,
  },
  km: {
    fontSize: FontSize.title3Bold20_size,
    lineHeight: 26,
    color: Color.neutral07,
  },
  kmWrapper: {
    marginLeft: 10,
    flexDirection: "row",
  },
  sliderFrameParent: {
    flexDirection: "row",
  },
  uscTalamban: {
    fontFamily: FontFamily.montserratBold,
    color: Color.heading,
    textAlign: "left",
    lineHeight: 32,
    fontSize: FontSize.body1Semibold_size,
    fontWeight: "700",
    alignSelf: "stretch",
  },
  barangayNasipitTalamban: {
    fontSize: FontSize.typographyTaglineSmallRegular_size,
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "500",
    lineHeight: 20,
    alignSelf: "stretch",
  },
  uscTalambanParent: {
    marginLeft: 8,
    overflow: "hidden",
    flex: 1,
  },
  whiteBookmarkIcon: {
    zIndex: 0,
  },
  grayBookmarkIcon: {
    display: "none",
    zIndex: 1,
  },
  whiteBookmarkParent: {
    width: 25,
    height: 25,
    borderRadius: Border.br_xl,
  },
  savedPlaces: {
    marginLeft: 8,
    borderRadius: Border.br_xl,
  },
  componentsSearchDefault: {
    paddingLeft: Padding.p_8xs,
    paddingTop: Padding.p_xs,
    paddingRight: Padding.p_3xs,
    paddingBottom: Padding.p_xs,
    borderRadius: Border.br_5xs,
    marginTop: 15,
    justifyContent: "center",
    alignSelf: "stretch",
    alignItems: "center",
  },
  addAddressDetails: {
    fontFamily: FontFamily.montserratRegular,
    lineHeight: 32,
    color: Color.colorDarkgray_300,
    fontSize: FontSize.level2Medium12_size,
    flex: 1,
  },
  addressDetailsFrame: {
    flexDirection: "row",
    flex: 1,
  },
  edit: {
    color: Color.colorDeepskyblue_100,
    display: "flex",
    width: 34,
    fontSize: FontSize.level2Medium12_size,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  editBtn: {
    marginLeft: 5,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  addressDetailsBtn: {
    borderRadius: Border.br_3xs,
    paddingLeft: Padding.p_3xs,
    paddingTop: Padding.p_8xs,
    paddingRight: Padding.p_8xs,
    paddingBottom: Padding.p_8xs,
    flex: 1,
  },
  componentsSearchDefault1: {
    overflow: "hidden",
    flexDirection: "row",
  },
  viewAllServices: {
    letterSpacing: -0.1,
    lineHeight: 24,
    color: Color.neutral01,
    fontSize: FontSize.body1Semibold_size,
    textAlign: "center",
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
  },
  componentsbutton: {
    borderRadius: Border.br_mini,
    paddingHorizontal: Padding.p_3xl,
    paddingVertical: Padding.p_xs,
    alignSelf: "stretch",
  },
  componentsbuttonWrapper: {
    paddingTop: Padding.p_3xs,
  },

  cancelButtonText: {
    color: "blue", // Customize the color as needed
  },

  frameGroup: {
    borderTopLeftRadius: Border.br_5xl,
    borderTopRightRadius: Border.br_5xl,
    paddingHorizontal: Padding.p_base,
    paddingBottom: Padding.p_mini,
    alignSelf: "stretch",
    backgroundColor: Color.white,
  },
  frameFlexBox: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  lineParent: {
    paddingTop: Padding.p_5xs,
    alignSelf: "stretch",
  },
  searchingDistanceRadiusModa: {
    // zIndex: 2,
    // alignSelf: "stretch",
    position: "absolute",
    width: "100%",
    height: "auto",
  },
});

export default BookingChosenProvider;
