import React, { useState, useEffect, useRef, useContext } from "react";
import {
  StatusBar,
  StyleSheet,
  Pressable,
  View,
  Text,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";
import { useReviewSummaryContext } from "../ReviewSummaryContext";
import { useDateTimeContext } from "../DateTimeContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  updateDoc,
  onSnapshot,
  setDoc,
  query,
  getDocs,
} from "firebase/firestore";
import Toast from "react-native-toast-message";
import axios from "axios";
import { MarkerContext } from "../MarkerContext";

//for plumbing
import plumbingInstall from "../assets/mask-group10.png";
import plumbingRepairs from "../assets/mask-group11.png";

//for electrical
import electricalInstall from "../assets/mask-group12.png";
import electricalRepairs from "../assets/mask-group13.png";

// for cleaning
import deepCleaningImage from "../assets/mask-group14.png";
import standardCleaningImage from "../assets/mask-group15.png";
import electricCleaningImage from "../assets/mask-group16.png";
import pestCleaningImage from "../assets/mask-group17.png";

//for petcare
import dogTrainingImage from "../assets/mask-group.png";
import petGroomingImage from "../assets/mask-group1.png";
import petSittingImage from "../assets/mask-group2.png";

//for carpentry
import installationImage from "../assets/mask-group7.png";
import repairsImage from "../assets/mask-group8.png";
import furnitureAssemblyImage from "../assets/mask-group9.png";

//for gardening
import gardenMaintenanceImage from "../assets/mask-group3.png";
import landscapeDesignImage from "../assets/mask-group4.png";
import irrigationSystemImage from "../assets/mask-group5.png";
import pestManagementSystemImage from "../assets/mask-group6.png";

//context
import { useEditLocation } from "../EditLocationContext";
import { SliderContext } from "../SliderContext";
import { UserLocationContext } from "../UserLocationContext"; // adjust the path accordingly
import { useLatitudeLongitude } from "../LatitudeLongitudeContext"; // Import the custom hook

let feeDistance;

const ReviewSummary = ({ route }) => {
  const navigation = useNavigation();

  const { kmFilter } = useContext(SliderContext);
  const { markerUid } = useContext(MarkerContext);

  const { userLocation } = useContext(UserLocationContext);
  const { location } = useLatitudeLongitude(); // Access the context
  const [city, setCity] = useState("");
  const { reviewData } = useReviewSummaryContext();
  const { selectedDateContext, selectedTimeContext } = useDateTimeContext();
  const [providerName, setProviderName] = useState("");
  const [providerLat, setProviderLat] = useState("");
  const [providerLong, setProviderLong] = useState("");

  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        const db = getFirestore();
        const auth = getAuth();

        const providerDocRef = doc(db, "providerProfiles", markerUid);
        const providerDocSnap = await getDoc(providerDocRef);

        // Check if the document exists
        if (providerDocSnap.exists()) {
          // Get the data from the document
          const providerData = providerDocSnap.data();
          const providerName = providerData.name;
          const coordinates = providerData.coordinates; // Accessing nested 'map' object
          const latitude = coordinates.latitude;
          const longitude = coordinates.longitude;

          setProviderName(providerName);
          setProviderLat(latitude);
          setProviderLong(longitude);
        }
      } catch (error) {
        console.error("Error fetching provider data:", error);
      }
    };

    fetchProviderData();
  }, [markerUid]);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetchReverseGeolocation(location.latitude, location.longitude);
    }
  }, [location]);

  const fetchReverseGeolocation = async (latitude, longitude) => {
    try {
      const apiKey = "AIzaSyAuaR8dxr95SLUTU-cidS7I-3uB6mEoJmA";
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      );
      if (response.data.results && response.data.results.length > 0) {
        const firstResult = response.data.results[0];
        const formattedAddress = firstResult.formatted_address;

        // Extracting the city from the formatted address
        const addressComponents = firstResult.address_components;
        let city = "";
        for (const component of addressComponents) {
          if (component.types.includes("locality")) {
            city = component.long_name;
            break;
          }
        }

        setCity(city);
        // Console.log the city
        // console.log("City:", city);
      } else {
        console.log("Location not found");
      }
    } catch (error) {
      console.error("Error fetching reverse geolocation:", error);
    }
  };

  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");

  const { locationData } = useEditLocation();

  // Access the values from locationData
  const cityAddress = locationData.cityAddress;
  const specificLocation = locationData.specificLocation;
  const streetValue = locationData.streetValue;
  const houseValue = locationData.houseValue;
  const floorValue = locationData.floorValue;
  const noteValue = locationData.noteValue;
  const label = locationData.label;
  const otherLabel = locationData.otherLabel;

  // Now you can use these values in your component
  console.log("City:", cityAddress);
  console.log("Address:", specificLocation);
  console.log("Street:", streetValue);
  console.log("House:", houseValue);
  console.log("Floor:", floorValue);
  console.log("Note:", noteValue);
  console.log("Label:", label);
  console.log("Other Label:", otherLabel);

  const imageSources = {
    Cash: require("../assets/cash.png"),
    Gcash: require("../assets/image-2387.png"),
    PayPal: require("../assets/image-2373.png"),
    PayMaya: require("../assets/maya.png"),
    GrabPay: require("../assets/grab-pay.png"),
  };

  useEffect(() => {
    const initializeMaterials = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const firestore = getFirestore();
          const userDocRef = doc(firestore, "userProfiles", user.uid);

          // Get the current document data
          const userDocSnap = await getDoc(userDocRef);

          // Check if 'selectedPaymentOption' field is empty, and set 'materials' accordingly
          const paymentOption = userDocSnap.exists()
            ? userDocSnap.data().selectedPaymentOption
            : "Cash";

          const materialsValue = paymentOption || "Cash";

          // setMaterials(materialsValue);
          // setMaterialsVisible(true);
          setSelectedPaymentOption(materialsValue);

          // Update the Firestore document with the selected payment option
          await updateDoc(userDocRef, {
            selectedPaymentOption: materialsValue,
          });

          console.log("Payment option saved successfully!");

          // Set up a real-time listener for changes to the selectedPaymentOption
          const unsubscribe = onSnapshot(userDocRef, (doc) => {
            const updatedPaymentOption = doc.data().selectedPaymentOption;
            setSelectedPaymentOption(updatedPaymentOption);
            console.log(
              "Payment option updated in real-time:",
              updatedPaymentOption
            );
          });

          // Clean up the listener when the component is unmounted
          return () => unsubscribe();
        } else {
          console.error("User not signed in.");
          Toast.show({
            type: "error",
            position: "top",
            text1: "Auth Error",
            text2: "User not signed in❗",
            visibilityTime: 5000,
          });
        }
      } catch (error) {
        console.error("Error updating payment option:", error);
        Toast.show({
          type: "error",
          position: "top",
          text1: error,
          text2: "Use Effect Error❗",
          visibilityTime: 5000,
        });
      }
    };

    // Call the initialization function
    initializeMaterials();
  }, []);

  // const { addUserDetails } = useUserDetailsContext();

  // Now you can access the data in reviewData
  const {
    property,
    materials,
    inputValues,
    multipliedValue,
    title,
    category,
    logo,
    // location,
    coordinates,
  } = reviewData;

  const extractedNames = inputValues.map((item) => item.name);

  // Log the extracted names
  console.log("Extracted Names:", extractedNames);

  const [chosenProperty, setChosenProperty] = useState(property);
  const [chosenMaterials, setChosenMaterials] = useState(materials);
  const [chosenDate, setChosenDate] = useState(selectedDateContext);
  const [chosenTime, setChosenTime] = useState(selectedTimeContext);
  const [chosenAddress, setChosenAddress] = useState(userLocation);
  const [chosenDistance, setChosenDistance] = useState(kmFilter);
  const [subTotal, setSubTotal] = useState(multipliedValue);
  const [chosenCategory, setChosenCategory] = useState(category);
  const [chosenService, setChosenService] = useState(inputValues);

  let materialFee;

  if (materials == "selfProvidedMaterials") {
    materialFee = 0;
  } else {
    materialFee = 50;
  }

  if (chosenDistance == 3) {
    feeDistance = 20;
  } else if (chosenDistance == 4) {
    feeDistance = 40;
  } else if (chosenDistance == 5) {
    feeDistance = 60;
  } else if (chosenDistance == 6) {
    feeDistance = 80;
  }

  const totalFee = subTotal + feeDistance + materialFee;

  let selectedImage;
  let selectServiceScreen;

  // Determine which image to use based on the logo variable
  if (logo === "mask-group15.png") {
    selectedImage = deepCleaningImage;
    selectServiceScreen = "DeepCleaningSubcategory";
  } else if (logo === "mask-group14.png") {
    selectedImage = standardCleaningImage;
    selectServiceScreen = "StandardCleaningSubcategory";
  } else if (logo === "mask-group16.png") {
    selectedImage = electricCleaningImage;
    selectServiceScreen = "ElectronicApplianceCleaning";
  } else if (logo === "mask-group17.png") {
    selectedImage = pestCleaningImage;
    selectServiceScreen = "PestControlSubcategory";
  } else if (logo === "mask-group10.png") {
    selectedImage = plumbingInstall;
    selectServiceScreen = "PlumbingInstallationSubcateg";
  } else if (logo === "mask-group11.png") {
    selectedImage = plumbingRepairs;
    selectServiceScreen = "PlumbingRepairsSubcategory";
  } else if (logo === "mask-group12.png") {
    selectedImage = electricalInstall;
    selectServiceScreen = "ElectricalInstallationSubcat";
  } else if (logo === "mask-group13.png") {
    selectedImage = electricalRepairs;
    selectServiceScreen = "ElectricalRepairsSubcategory";
  } else if (logo === "mask-group.png") {
    selectedImage = dogTrainingImage;
    selectServiceScreen = "DogTrainingSubcategoryBlue";
  } else if (logo === "mask-group1.png") {
    selectedImage = petGroomingImage;
    selectServiceScreen = "PetGroomingSubcategoryDog";
  } else if (logo === "mask-group2.png") {
    selectedImage = petSittingImage;
    selectServiceScreen = "PetSittingSubcategoryDog";
  } else if (logo === "mask-group7.png") {
    selectedImage = installationImage;
    selectServiceScreen = "CarpentryInstallationSubcate";
  } else if (logo === "mask-group8.png") {
    selectedImage = repairsImage;
    selectServiceScreen = "CarpentryRepairsSubcategory";
  } else if (logo === "mask-group9.png") {
    selectedImage = furnitureAssemblyImage;
    selectServiceScreen = "CarpentryFurnitureSubcategor";
  } else if (logo === "mask-group3.png") {
    selectedImage = gardenMaintenanceImage;
    selectServiceScreen = "GardenMaintenanceSubcategory";
  } else if (logo === "mask-group4.png") {
    selectedImage = landscapeDesignImage;
    selectServiceScreen = "LandscapeDesignSubcategory";
  } else if (logo === "mask-group5.png") {
    selectedImage = irrigationSystemImage;
    selectServiceScreen = "IrrigationSystemSubcategory";
  } else if (logo === "mask-group6.png") {
    selectedImage = pestManagementSystemImage;
    selectServiceScreen = "PestDiseaseManagementSubc";
  }

  function generateRandomBookingIDWithNumbers(length = 8) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let bookingID = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      bookingID += characters.charAt(randomIndex);
    }
    return bookingID;
  }

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
  
        // console.log(querySnapshot.size);
  
        if (querySnapshot.size >= 1) {
          for (const doc of querySnapshot.docs) {
            // Get the data from each document in the subcollection
            const bookingData = doc.data();
            console.log("Booking Data: ", bookingData);
  
            if (
              bookingData.date === selectedDateContext &&
              bookingData.time === selectedTimeContext
            ) {
              console.log("Selected date and time are already booked.");
              return false; // Exit the function early
            }
          }
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
      console.log("Proceed with booking");
      try {
        const db = getFirestore();
        const auth = getAuth();
        const user = auth.currentUser.uid;
        const userProfilesCollection = collection(db, "userProfiles");
        const userDocRef = doc(userProfilesCollection, user);
        const userDocSnapshot = await getDoc(userDocRef);

        if (!userDocSnapshot.exists()) {
          console.log("No user data found for the given UID.");
          Toast.show({
            type: "error",
            position: "top",
            text1: "No user data found for the given UID.",
            visibilityTime: 5000,
          });
        }
        const userData = userDocSnapshot.data();
        const { name, email, phone } = userData;

        const bookingDocRef = doc(db, "serviceBookings", user);
        const bookingDocSnapshot = await getDoc(bookingDocRef);
        let existingBookings = [];

        if (bookingDocSnapshot.exists()) {
          const existingData = bookingDocSnapshot.data();
          console.log("Existing Data: ", existingData);
          existingBookings = existingData.bookings || []; // Assuming you have a "bookings" field in Firestore
        }

        // Save provider data to Firestore using the UID as the document ID
        const addressDetails = {
          cityAddress: cityAddress,
          specificLocation: specificLocation,
          street: streetValue,
          house: houseValue,
          floor: floorValue,
          note: noteValue,
          label: label,
          otherLabel: otherLabel,
        };
        console.log("Address Details:", addressDetails);

        // Add the new booking data to the existing array
        const newBooking = {
          bookingID: generateRandomBookingIDWithNumbers(), // Generate a unique booking ID with numbers
          customerUID: user,
          name: name,
          email: email,
          phone: phone,
          date: chosenDate,
          time: chosenTime,
          address: chosenAddress,
          city: city,
          coordinates: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
          distanceRadius: chosenDistance,
          propertyType: chosenProperty,
          materials: chosenMaterials,
          category: chosenCategory,
          title: title,
          service: chosenService,
          subTotal: subTotal,
          feeDistance: feeDistance,
          totalPrice: totalFee,
          paymentMethod: selectedPaymentOption,
          bookingAccepted: false,
          bookingAssigned: false,
          blackListed: [],
          acceptedBy: "",
          addressDetails: addressDetails, // Include the address details map
          materialFee: materialFee,
        };

        existingBookings = [...existingBookings, newBooking]; // Add the new booking to the array

        // Save the updated array to Firestore
        const UpdatedBookingss = await setDoc(
          bookingDocRef,
          { bookings: existingBookings },
          { merge: true }
        );

        // User signed up successfully
        console.log("Going to Search now!");
        Toast.show({
          type: "success",
          position: "top",
          text1: "Going to Search now!",
          text2: "Searching for Service Providers...",
          visibilityTime: 5000,
        });
        navigation.navigate("BookingChosenProvider", {
          latitude: location.latitude,
          longitude: location.longitude,
          sliderValue: kmFilter,
          location: userLocation,
          title: title,
          category: category,
          extractedNames: extractedNames,
          bookingID: newBooking.bookingID,
          serviceBookingUID: user,
          service: chosenService,
          providerName: providerName,
          providerLat: providerLat,
          providerLong: providerLong,
          markerUid: markerUid,
        });
      } catch (error) {
        console.error("Sign-up error:", error);
        Toast.show({
          type: "error",
          position: "top",
          text1: error,
          text2: "Handle Booking Error❗",
          visibilityTime: 5000,
        });
      }
    }
  };

  const handlePress = () => {
    // Navigate to selectServiceScreen with the parameter PlumbingRepairsSubcategory
    navigation.navigate(selectServiceScreen); // Use the variable here
  };

  return (
    <View style={styles.reviewSummary}>
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
          <View style={styles.frameParent}>
            <View style={styles.bookingDetailsLabelParent}>
              <View style={styles.bookingDetailsLabel}>
                <Text style={[styles.bookingDetails, styles.totalTypo]}>
                  Booking details
                </Text>
              </View>
              <View style={[styles.dateAndTimeFrame, styles.dateFrameFlexBox1]}>
                <View style={styles.dateRangeLightWrapper}>
                  <Image
                    style={styles.dateRangeLightIcon}
                    contentFit="cover"
                    source={require("../assets/date-range-light2.png")}
                  />
                </View>
                <View style={[styles.frameGroup, styles.frameSpaceBlock]}>
                  <View style={styles.frame}>
                    <View style={styles.dateAndTimeWrapper}>
                      <Text
                        style={[styles.dateAndTime, styles.dateAndTimeFlexBox]}
                      >
                        Date and Time
                      </Text>
                    </View>
                    <Pressable
                      style={styles.editBtn}
                      onPress={() => navigation.goBack()}
                    >
                      <Text style={[styles.edit, styles.editTypo]}>Edit</Text>
                    </Pressable>
                  </View>
                  <View style={styles.frame}>
                    <Text style={[styles.august112023, styles.textTypo]}>
                      {selectedDateContext} | {selectedTimeContext}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.dateAndTimeFrame, styles.dateFrameFlexBox1]}>
                <View
                  style={[
                    styles.markersNearPinletMarkerWrapper,
                    styles.dateAndTimeFrameInnerSpaceBlock,
                  ]}
                >
                  <Image
                    style={styles.markersNearPinletMarker}
                    contentFit="cover"
                    source={require("../assets/markers--near-pinlet-marker4.png")}
                  />
                </View>
                <View style={[styles.frameGroup, styles.frameSpaceBlock]}>
                  <View style={styles.frame}>
                    <View style={styles.dateAndTimeWrapper}>
                      <Text
                        style={[styles.dateAndTime, styles.dateAndTimeFlexBox]}
                      >
                        Address
                      </Text>
                    </View>
                    <Pressable
                      style={styles.editBtn}
                      onPress={() =>
                        navigation.navigate("MapsConfirmLocation", {
                          searchResults: ["dummy"], // Providing searchResults or a dummy value if it's falsy
                        })
                      }
                    >
                      <Text style={[styles.edit, styles.editTypo]}>Edit</Text>
                    </Pressable>
                  </View>
                  <View style={styles.frame}>
                    <Text style={[styles.august112023, styles.textTypo]}>
                      {chosenAddress}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.dateAndTimeFrame, styles.dateFrameFlexBox1]}>
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
                        style={[styles.dateAndTime, styles.dateAndTimeFlexBox]}
                      >
                        Distance Radius
                      </Text>
                    </View>
                    <Pressable
                      style={styles.editBtn}
                      onPress={() =>
                        navigation.navigate("SearchingDistanceRadius2", {
                          latitude: location.latitude,
                          longitude: location.longitude,
                        })
                      }
                    >
                      <Text style={[styles.edit, styles.editTypo]}>Edit</Text>
                    </Pressable>
                  </View>
                  <View style={styles.frame}>
                    <Text style={[styles.august112023, styles.textTypo]}>
                      {kmFilter} kilometers
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={[
                styles.bookingDetailsLabelGroup,
                styles.bookingSpaceBlock,
              ]}
            >
              <View
                style={[
                  styles.bookingDetailsLabel1,
                  styles.subtotalWrapperFlexBox,
                ]}
              >
                <Text style={[styles.bookingDetails, styles.totalTypo]}>
                  Service details
                </Text>
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
                    source={selectedImage}
                  />
                </View>
                <View style={[styles.frameGroup, styles.frameSpaceBlock]}>
                  <View style={styles.frame}>
                    <View style={styles.dateAndTimeWrapper}>
                      <Text
                        style={[styles.dateAndTime, styles.dateAndTimeFlexBox]}
                      >
                        {category}
                      </Text>
                    </View>
                    <Pressable
                      style={styles.editBtn}
                      onPress={() => navigation.goBack()}
                    >
                      <Text style={[styles.edit3, styles.editLayout]}>
                        Edit
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
              <View style={styles.subcategoriesFrame}>
                {inputValues.map((item, index) => (
                  <View
                    key={index}
                    style={[styles.dateAndTimeFrame2, { marginBottom: 10 }]}
                  >
                    <View
                      style={[styles.dateAndTimeFrameInner, styles.editLayout]}
                    >
                      <View style={styles.frameWrapper1}>
                        <View
                          style={[
                            styles.frameWrapper2,
                            styles.frameWrapper2FlexBox,
                          ]}
                        >
                          <View style={styles.bookingDetailsLabel}>
                            <Text style={[styles.text, styles.textTypo]}>
                              {item.value}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={[styles.frameGroup, styles.frameSpaceBlock]}>
                      <View style={styles.frame}>
                        <Text style={styles.toiletSystem}>{item.name}</Text>
                      </View>
                    </View>
                    <View
                      style={[styles.frameWrapper3, styles.frameSpaceBlock]}
                    >
                      <View style={styles.frame}>
                        <Text style={styles.text1}>₱{item.totalPrice}.00</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
              <View style={styles.vectorWrapper}>
                <Image
                  style={styles.frameChild}
                  contentFit="cover"
                  source={require("../assets/line-747.png")}
                />
              </View>
              <View style={styles.dateAndTimeFrame5}>
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
                        <Text style={[styles.text6, styles.text6Layout]}>
                          ₱{multipliedValue}.00
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
                        <Text style={[styles.text6, styles.text6Layout]}>
                          ₱{materialFee}.00
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
                        <Text style={[styles.text6, styles.text6Layout]}>
                          ₱{feeDistance}.00
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.bookingSpaceBlock1}>
              <View style={styles.bookingDetailsLabel}>
                <Text style={[styles.bookingDetails, styles.totalTypo]}>
                  Payment Method
                </Text>
              </View>
              <View
                style={[
                  styles.dateAndTimeFrame7,
                  styles.dateAndTimeFrame7Layout,
                ]}
              >
                <View style={styles.dateRangeLightWrapper}>
                  <Image
                    style={styles.image2373Icon}
                    contentFit="cover"
                    source={imageSources[selectedPaymentOption]}
                  />
                </View>
                <View style={[styles.frameGroup, styles.frameSpaceBlock]}>
                  <View style={styles.frame}>
                    <View style={styles.dateAndTimeWrapper}>
                      <Text
                        style={[styles.dateAndTime, styles.dateAndTimeFlexBox]}
                      >
                        {selectedPaymentOption}
                      </Text>
                    </View>
                    <Pressable
                      style={styles.changeBtn}
                      onPress={() => navigation.navigate("PaymentMethod")}
                    >
                      <Text style={[styles.change, styles.editTypo]}>
                        Change
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.confirmLocation, styles.bodyInnerFlexBox]}>
        <View
          style={[
            styles.componentsSearchDefaultParent,
            styles.bodyInnerFlexBox,
          ]}
        >
          <View
            style={[
              styles.componentsSearchDefault,
              styles.frameWrapper2FlexBox,
            ]}
          >
            <View
              style={[styles.addressDetailsBtn, styles.dateAndTimeFrame7Layout]}
            >
              <View style={styles.addressDetailsFrame}>
                <Text style={[styles.total, styles.totalTypo]}>Total </Text>
              </View>
              <View style={styles.editBtn4}>
                <Text style={[styles.edit5, styles.text6Layout]}>
                  ₱{totalFee}.00
                </Text>
              </View>
            </View>
          </View>
          <View
            style={[styles.componentsbuttonWrapper, styles.dateFrameFlexBox1]}
          >
            <Pressable style={styles.componentsbutton} onPress={handleBooking}>
              <Text style={[styles.viewAllServices, styles.reviewSummary1Typo]}>
                Book Now
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
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
    justifyContent: "flex-end",
  },
  textClr: {
    color: Color.white,
    textAlign: "center",
  },
  bodyInnerFlexBox: {
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "stretch",
  },
  totalTypo: {
    textAlign: "left",
    color: Color.colorDarkslateblue_100,
    fontFamily: FontFamily.workSansSemiBold,
    fontWeight: "600",
    fontSize: FontSize.title3Bold20_size,
    flex: 1,
  },
  dateFrameFlexBox1: {
    paddingTop: Padding.p_3xs,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  frameSpaceBlock: {
    marginLeft: 7,
    justifyContent: "center",
  },
  dateAndTimeFlexBox: {
    color: Color.colorBlack,
    textAlign: "left",
    flex: 1,
  },
  editTypo: {
    color: Color.colorDeepskyblue_200,
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    textAlign: "right",
    fontFamily: FontFamily.workSansMedium,
    fontWeight: "500",
  },
  textTypo: {
    fontFamily: FontFamily.workSansRegular,
    fontSize: FontSize.body1Semibold_size,
  },
  dateAndTimeFrameInnerSpaceBlock: {
    paddingHorizontal: Padding.p_9xs,
    paddingVertical: 0,
    justifyContent: "center",
    flexDirection: "row",
  },
  bookingSpaceBlock: {
    marginTop: 10,
    paddingRight: Padding.p_5xs,
    paddingLeft: Padding.p_10xs,
    paddingTop: Padding.p_8xs,
    paddingBottom: Padding.p_8xs,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  bookingSpaceBlock1: {
    marginTop: 10,
    paddingRight: Padding.p_10xs,
    paddingLeft: Padding.p_10xs,
    paddingTop: Padding.p_8xs,
    paddingBottom: Padding.p_8xs,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  subtotalWrapperFlexBox: {
    paddingLeft: Padding.p_8xs,
    alignItems: "center",
    flexDirection: "row",
  },
  editLayout: {
    width: 38,
    alignItems: "center",
  },
  dateFrameFlexBox: {
    paddingHorizontal: 0,
    paddingVertical: Padding.p_8xs,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  frameWrapper2FlexBox: {
    borderRadius: Border.br_5xs,
    justifyContent: "center",
    alignItems: "center",
  },
  text6Typo: {
    fontFamily: FontFamily.interLight,
    fontWeight: "300",
    flex: 1,
  },
  text6Layout: {
    lineHeight: 20,
    color: Color.neutral07,
    fontSize: FontSize.body1Semibold_size,
  },
  dateAndTimeFrame7Layout: {
    borderRadius: Border.br_3xs,
    flexDirection: "row",
    backgroundColor: Color.white,
  },
  reviewSummary1Typo: {
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    fontSize: FontSize.title3Bold20_size,
  },
  bookingDetails: {
    display: "flex",
    alignItems: "center",
    alignSelf: "stretch",
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
    fontSize: FontSize.title4Regular18_size,
    fontFamily: FontFamily.workSansMedium,
    fontWeight: "500",
    color: Color.colorBlack,
  },
  dateAndTimeWrapper: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  edit: {
    textAlign: "right",
    width: 40,
    display: "flex",
    alignItems: "center",
  },
  editBtn: {
    alignItems: "center",
    flexDirection: "row",
  },
  frame: {
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  august112023: {
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
    alignItems: "center",
    flexDirection: "row",
  },
  markersNearPinletMarker: {
    width: 32,
    height: 41,
  },
  markersNearPinletMarkerWrapper: {
    alignItems: "center",
  },
  bookingDetailsLabelParent: {
    paddingHorizontal: Padding.p_5xs,
    paddingVertical: Padding.p_8xs,
    justifyContent: "center",
    alignSelf: "stretch",
    backgroundColor: Color.white,
  },
  bookingDetailsLabel1: {
    justifyContent: "center",
    alignSelf: "stretch",
  },
  plumbingInstallationPic: {
    height: 42,
    width: 40,
  },
  edit3: {
    textAlign: "right",
    color: Color.colorDeepskyblue_200,
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    fontFamily: FontFamily.workSansMedium,
    fontWeight: "500",
    display: "flex",
  },
  dateAndTimeFrame1: {
    marginTop: 5,
    paddingBottom: Padding.p_8xs,
    paddingTop: Padding.p_3xs,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  text: {
    textAlign: "center",
    color: Color.white,
  },
  frameWrapper2: {
    backgroundColor: Color.colorDarkslateblue_200,
    width: 30,
    height: 30,
  },
  frameWrapper1: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  dateAndTimeFrameInner: {
    paddingHorizontal: Padding.p_9xs,
    paddingVertical: 0,
    justifyContent: "center",
    flexDirection: "row",
  },
  toiletSystem: {
    fontSize: FontSize.m3LabelLarge_size,
    fontFamily: FontFamily.title4Regular18,
    textTransform: "capitalize",
    color: Color.colorBlack,
    textAlign: "left",
    flex: 1,
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
  dateAndTimeFrame2: {
    flexDirection: "row",
  },
  dateAndTimeFrame3: {
    marginTop: 5,
    flexDirection: "row",
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
    overflow: "hidden",
    alignSelf: "stretch",
    width: "100%",
    flex: 1,
  },
  vectorWrapper: {
    height: 1,
    marginTop: 5,
    alignItems: "center",
    alignSelf: "stretch",
  },
  subtotal: {
    fontSize: FontSize.body1Semibold_size,
    fontWeight: "300",
    color: Color.colorBlack,
    textAlign: "left",
  },
  subtotalWrapper: {
    flex: 1,
  },
  text6: {
    fontFamily: FontFamily.interLight,
    fontWeight: "300",
    flex: 1,
    textAlign: "right",
  },
  frameInner: {
    width: 83,
    alignItems: "center",
  },
  frameWrapper12: {
    justifyContent: "center",
    alignSelf: "stretch",
  },
  dateAndTimeFrame5: {
    paddingTop: Padding.p_8xs,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  bookingDetailsLabelGroup: {
    backgroundColor: Color.white,
  },
  image2373Icon: {
    height: 40,
    width: 40,
  },
  edit4: {
    textAlign: "right",
    flex: 1,
  },
  editWrapper: {
    flexDirection: "row",
  },
  bookingDetailsLabelContainer: {
    display: "none",
    backgroundColor: Color.white,
  },
  change: {
    textAlign: "right",
  },
  changeBtn: {
    paddingRight: Padding.p_8xs,
    alignItems: "center",
    flexDirection: "row",
  },
  dateAndTimeFrame7: {
    paddingHorizontal: 0,
    paddingVertical: Padding.p_8xs,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    marginTop: 5,
  },
  frameParent: {
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: 0,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  bodyInner: {
    flex: 1,
  },
  body: {
    alignSelf: "stretch",
    flex: 1,
  },
  total: {
    lineHeight: 32,
  },
  addressDetailsFrame: {
    flexDirection: "row",
    flex: 1,
  },
  edit5: {
    display: "flex",
    fontFamily: FontFamily.workSansSemiBold,
    fontWeight: "600",
    lineHeight: 20,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    marginVertical: 5,
  },
  editBtn4: {
    // marginLeft: 90,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  addressDetailsBtn: {
    paddingLeft: Padding.p_8xs,
    paddingRight: Padding.p_8xs,
    paddingTop: Padding.p_8xs,
    paddingBottom: Padding.p_8xs,
    flex: 1,
  },
  componentsSearchDefault: {
    overflow: "hidden",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  viewAllServices: {
    letterSpacing: -0.2,
    lineHeight: 24,
    color: Color.neutral01,
    textAlign: "center",
  },
  componentsbutton: {
    borderRadius: Border.br_mini,
    backgroundColor: Color.colorDarkslategray_900,
    paddingHorizontal: Padding.p_3xl,
    paddingVertical: Padding.p_xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  componentsbuttonWrapper: {
    marginTop: 15,
    alignItems: "center",
  },
  componentsSearchDefaultParent: {
    borderTopLeftRadius: Border.br_5xl,
    borderTopRightRadius: Border.br_5xl,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_mini,
    backgroundColor: Color.white,
    flex: 1,
  },
  confirmLocation: {
    height: 145,
  },
  reviewSummary: {
    backgroundColor: Color.colorWhitesmoke_200,
    height: 812,
    width: "100%",
    flex: 1,
  },
});

export default ReviewSummary;
