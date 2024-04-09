import * as React from "react";
import {
  StatusBar,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  Animated,
  Modal,
} from "react-native";
import { Image } from "expo-image";
import { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Border, FontSize, Color, Padding } from "../GlobalStyles";
import SearchingServiceProviderModal from "../components/SearchingServiceProviderModal";
import NoProvidersFound from "../components/NoProvidersFound";
import MapView, { Marker, Circle } from "react-native-maps";
import axios from "axios";
import * as Location from "expo-location";
import { Easing } from "react-native-reanimated";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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

import { useSearchingContext } from "../SearchingContext";

const SearchingDistanceRadius = ({ route }) => {
  const providersMatched = [];

  const navigation = useNavigation();

  const mapRef = useRef(null);
  const circleRadius = useRef(new Animated.Value(0)).current;
  const colorValue = useRef(new Animated.Value(0)).current;

  const [booking, setBooking] = useState(null);
  const [bookingAccepted, setBookingAccepted] = useState(null);
  const [bookingTotal, setBookingTotal] = useState("");
  const [bookingPaymentMethod, setBookingPaymentMethod] = useState("");
  const [acceptedByProvider, setacceptedByProvider] = useState(null);

  let Name = "";
  let Email = "";
  let PhoneNumber = "";

  const { firstProviderIds, setFirstProviderIdsValue } = useSearchingContext();
  const [noProviderVisible, setnoProviderVisible] = useState(false);
  const [bookingAssigned, setBookingAssigned] = useState(false);
  const [gotoFound, setGoToFound] = useState(false);

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
  } = route.params;

  const geolib = require("geolib");

  const calculateDistance = ([lat1, lon1], [lat2, lon2]) => {
    if (lat1 === null || lon1 === null || lat2 === null || lon2 === null) {
      console.error("Invalid coordinates");
      return null;
    }

    const distance = geolib.getDistance(
      { latitude: lat1, longitude: lon1 },
      { latitude: lat2, longitude: lon2 }
    );

    const kmDistance = distance / 1000;

    console.log("Calculated distance between the two:", kmDistance.toFixed(2));

    return kmDistance;
  };



  // this function checks the blacklisted and acceptedby fields
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

        const bookingsArray = docSnapshot.data().bookings || [];
        // console.log("The booking array is: ", bookingsArray);
        // console.log("The bookingID to search is: ", bookingID);

        // find what index
        const index = bookingsArray.findIndex(
          (booking) => booking.bookingID === bookingID
        );

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

            // Add a listener for changes in blackListedCurrent but only listen only

            if (blackListedCurrent.length > 0) {
              const blackListedUnsubscribe = onSnapshot(
                serviceBookingDocRef,
                (docSnapshot) => {
                  const updatedBlackListed =
                    docSnapshot.data().blackListed || [];
                  console.log("Search Again");
                  fetchBookingIndex();
                  searchProvider();
                }
              );
            }

            if (bookingAccepted && acceptedByProvider !== "") {
              console.log("This is true at index:", index);
              setacceptedByProvider(acceptedByProvider);
              setBookingAccepted(true);
              setnoProviderVisible(false);
              setGoToFound(true);
            } else {
              console.log("Error in booking accepted and acceptedbyProvider");
            }

            return {
              unsubscribe: () => {
                // Stop listening to the main document
                unsubscribe();
                // Stop listening to blackListed
                blackListedUnsubscribe();
              },
            };
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

  const [bookingIndex, setBookingIndex] = useState(null);

  // this function gets the booking INDEX
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
        // console.log("THE BOOKING ARRAY IS: ", bookingsArray);
        // console.log("THE BOOKING ID TO SEARCH IS: ", bookingID);

        const index = bookingsArray.findIndex(
          (booking) => booking.bookingID === bookingID
        );

        // console.log("THE BOOKING INDEX IS", index);

        // Set the booking index state or return the index here...

        setBookingIndex(index);

        if (index !== -1) {
          const foundBooking = bookingsArray[index];
          // console.log("FOUND BOOKING DETAILS:", foundBooking);

          return index;
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

  //this function searches for the provider
  const searchProvider = async () => {
    const distanceThreshold = sliderValue; // slider value
    const providerLine = []; // create an array to store the providers available

    try {
      const db = getFirestore();
      const providerProfilesCollection = collection(db, "providerProfiles");
      const providerProfilesSnapshot = await getDocs(
        providerProfilesCollection
      );

      ///FINDING STARTS HEREEEEEE
      for (const doc of providerProfilesSnapshot.docs) {
        const data = doc.data();

        const appForm3CollectionRef = collection(doc.ref, "appForm3");
        const appForm3Snapshot = await getDocs(appForm3CollectionRef);

        // console.log("Blacklisted array in searchProvider: ", data.blackListed);

        // // // Log availability for each document
        console.log(`Document ${doc.id}, Availability: ${data.availability}`);
        console.log(`Document ${doc.id}, BlackListed: ${data.blackListed}`);
        // console.log(`Document ${doc.id}, BookingID: ${data.bookingID}`);

        // console.log("The title is: ", title);

        // get only the available

        if (data.availability === "available" && !data.bookingMatched) {
          console.log(`Document ${doc.id} is available and false bookingmatched`);

          if (data.blackListed.includes(bookingID)) {
            console.log(`Document ${doc.id} has blacklisted bookingID`); // go to else if there is blacklisted
          } else {
            if (!appForm3Snapshot.empty) {
              const querySnapshot = await getDocs(
                query(
                  appForm3CollectionRef,
                  where("category", "array-contains-any", [title]) // Check if the provider has title = category
                )
              );

              if (!querySnapshot.empty) {
                console.log(`Document ${doc.id} has same title`);

                const documentwithSameCategoryTitle = querySnapshot.docs.filter(
                  (doc) => doc.data().services.includes(category)
                );

                // if found proceed to search for the same category //
                if (documentwithSameCategoryTitle.length > 0) {
                  console.log(`Document ${doc.id}  have same category`);

                  const subCategoriesArray =
                    documentwithSameCategoryTitle[0].data().SubCategories;

                  // go to the next search which are the sub categories if found same title and category
                  if (
                    extractedNames.every((name) =>
                      subCategoriesArray.includes(name)
                    )
                  ) {
                    console.log(`Document ${doc.id}  have met sub categories`);

                    const mainDocumentData = doc.data();
                    const coordinates = mainDocumentData.coordinates;
                    const name = mainDocumentData.name; // name of provider

                    if (
                      coordinates &&
                      coordinates.latitude &&
                      coordinates.longitude
                    ) {
                      // solve the distance
                      const distance = calculateDistance(
                        [latitude, longitude],
                        [coordinates.latitude, coordinates.longitude]
                      );
                      console.log(`The distance of ${doc.id} is ${distance}`);

                      // get only providers within distance threshold
                      if (distance <= distanceThreshold) {
                        const providerId = doc.id;
                        console.log(
                          `Document ${providerId} (${name}) is within ${distanceThreshold} from the user.`
                        );

                        providerLine.push({
                          id: providerId,
                          distance: distance,
                        });

                        console.log("Provider Line: ", providerLine);
                      } else {
                        console.log("Provider distance out of range");
                      }
                    } else {
                      console.log("Coordinates not found");
                    }
                  }
                } else {
                  console.log(`Document ${doc.id} dont have same category`);
                }
              } else {
                console.log(`Document ${doc.id} dont have same title`);
              }
            } else {
              console.log("AppForm3 is empty");
            }
          }
        }

        // if (data.availability === "available") {
        //   // console.log(`Document ${doc.id} is available`);
        //   if (data.blackListed.includes(bookingID)) {
        //     console.log(`Document ${doc.id} has blacklisted bookingID`); // go to else if there is blacklisted
        //     break;
        //   } else {
        //     //  (2) go to appForm3Collection to check if the provider has the available services offered
        //     const appForm3CollectionRef = collection(doc.ref, "appForm3");
        //     const appForm3Snapshot = await getDocs(appForm3CollectionRef);

        //     if (!appForm3Snapshot.empty) {
        //       const querySnapshot = await getDocs(
        //         query(
        //           appForm3CollectionRef,
        //           where("category", "array-contains-any", [title]) // Check if the provider has title = category
        //         )
        //       );
        //       if (!querySnapshot.empty) {

        //         console.log("This has passed the first check");

        //         const documentwithSameCategoryTitle = querySnapshot.docs.filter(
        //           (doc) => doc.data().services.includes(category)
        //         );
        //         // if found proceed to search for the same category and service//
        //         if (documentwithSameCategoryTitle.length > 0) {
        //           const subCategoriesArray =
        //             documentwithSameCategoryTitle[0].data().SubCategories;

        //           // go to the next search which are the sub categories if found same title and category
        //           if (
        //             extractedNames.every((name) =>
        //               subCategoriesArray.includes(name)
        //             )
        //           ) {
        //             console.log(
        //               `Document ${doc.id} in "appForm3" collection has both title and category, and sub categories.`
        //             );
        //             // fetch the coordinates of the providers
        //             const mainDocumentData = doc.data();
        //             const coordinates = mainDocumentData.coordinates;
        //             const name = mainDocumentData.name; // name of provider

        //             console.log(
        //               `Provider ${doc.id} has coordinates of ${coordinates.latitude} and ${coordinates.longitude}`
        //             );
        //             // calculate distance //
        //             if (
        //               coordinates &&
        //               coordinates.latitude &&
        //               coordinates.longitude
        //             ) {
        //               const distance = calculateDistance(
        //                 [latitude, longitude],
        //                 [coordinates.latitude, coordinates.longitude]
        //               );
        //               console.log(`The distance of ${doc.id} is ${distance}`);
        //               // get only providers within distance threshold
        //               if (distance <= distanceThreshold) {
        //                 const providerId = doc.id;
        //                 console.log(
        //                   `Document ${providerId} (${name}) is within ${distanceThreshold} from the user.`
        //                 );

        //                 providerLine.push({
        //                   id: providerId,
        //                   distance: distance,
        //                 });

        //                 console.log("Provider Line: ", providerLine);
        //               }else{
        //                 console.log("Provider distance out of range");

        //               }
        //             }else{
        //               console.log("Coordinates not found");

        //             }
        //           }else{
        //             console.log("Services not found");

        //           }
        //         } else {
        //           console.log("Subcategories are not found");

        //         }
        //       } else {
        //         console.log("Category=title is not found");
        //         console.log("No documents found with the specified criteria");

        //       }
        //     } else {
        //       console.log(
        //         `Document ${doc.id} does not have "appForm3" collection.`
        //       );

        //     }
        //   }
        // } else {
        //   console.log(`Provider not available`);
        //   break;
        // }
      }

      providerLine.sort((a, b) => a.distance - b.distance);

      // Extract the ids after sorting
      const sortedProvidersIds = providerLine.map((provider) => provider.id);
      console.log("Sorted Providers Matched: ", sortedProvidersIds);

      if (sortedProvidersIds.length > 0) {
        const firstProviderIds = sortedProvidersIds[0];

        console.log("First Provider ID:", firstProviderIds);

        const providerDocRef = doc(
          collection(db, "providerProfiles"),
          firstProviderIds
        );

        try {
          await runTransaction(db, async (transaction) => {
            const providerDoc = await transaction.get(providerDocRef);
            console.log("Provider Doc:", providerDoc);
            console.log("Provider Doc exists:", providerDoc.exists());
            console.log("Availability status:", providerDoc.data().availability);
            if (!providerDoc.exists() || providerDoc.data().availability !== 'available') {
              throw new Error("Provider not available");
            }

            // Check if the provider is still available
            if (providerDoc.exists() && providerDoc.data().availability === "available" && !providerDoc.data().bookingMatched ) {
              // Proceed to update the provider's status and create a new booking
              transaction.update(providerDocRef, {
                bookingID: serviceBookingUID,
                bookingIndex: bookingIndex,
                bookingMatched: true,
                availability: "onHold",
              });
              updateBookingAssigned(true);
              setFirstProviderIdsValue(firstProviderIds);

              console.log(`Booking created successfully for provider ${firstProviderIds}`);
            } else {
              // Handle the case where the provider is no longer available
              console.error('Provider is no longer available');
            }
          });
          console.log("Booking successfully created");
        } catch (error) {
          console.error("Booking transaction failed", error);
        }
      }
    } catch (error) {
      console.log("CheckAppFrom3 Error", error);
    }
  };

  const updateBookingAssigned = async (status) => {
    const db = getFirestore();
    // Get the user's UID
    const auth = getAuth();
    const userUID = auth.currentUser.uid;

    const serviceBookingsCollection = collection(db, "serviceBookings");

    // Get the service booking document using userBookingID
    const serviceBookingDocRef = doc(serviceBookingsCollection, userUID);

    // Get the document snapshot
    const serviceBookingSnapshot = await getDoc(serviceBookingDocRef);
    try {
      if (serviceBookingSnapshot.exists()) {
        // Update the acceptedBy field within the service booking document
        const updatedBookings = [...serviceBookingSnapshot.data().bookings];
        // updatedBookings[bookingIndex].acceptedBy = providerUID;
        updatedBookings[bookingIndex].bookingAssigned = status;

        // Update the service booking document
        await updateDoc(serviceBookingDocRef, {
          bookings: updatedBookings,
        });
        console.log(
          "Booking Matched field updated in serviceBookings document."
        );
      } else {
        console.error("Service Booking document does not exist");
      }
    } catch (error) {
      console.log("Updated Booking Assigned error:, ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const index = await fetchBookingIndex();
        // Ensure the booking index is not null before proceeding
        if (index !== null) {
          setBookingIndex(index);
        }
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  useEffect(() => {
    // This useEffect will run whenever bookingIndex changes
    if (bookingIndex !== null) {
      searchProvider();
      fetchDetails();
    }
  }, [bookingIndex]);

  const intervalTime = 20000; // Interval of 10 seconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!bookingAssigned) {
        // Check if bookingAssigned is false
        searchProvider(); // Call searchProvider() at regular intervals until bookingAssigned becomes true
      } else {
        clearInterval(intervalId); // Stop the interval if bookingAssigned becomes true then double check if the bookingID is the same with yours
      }
    }, intervalTime); // Interval set to 5 seconds (5000 milliseconds)

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(intervalId);
  }, [bookingAssigned, bookingIndex]); // Dependency array contains both bookingAssigned and bookingIndex

  const checkBookingID = async () => {
    try {
      const db = getFirestore();
      // Get the user's UID
      const auth = getAuth();
      const user = auth.currentUser.uid;

      // Create references to the user's document and the appForm2 subcollection
      const providerDocRef = doc(db, "providerProfiles", firstProviderIds);

      // Subscribe to the document snapshot changes
      const unsubscribe = onSnapshot(providerDocRef, (docSnapshot) => {
        const providerBookingID = docSnapshot.data().bookingID;

        console.log("Provider Booking ID is", providerBookingID);

        if (providerBookingID === user) {
          updateBookingAssigned(true);
          console.log("Provider Booking ID is equal with user UID");
        } else {
          updateBookingAssigned(false);
          console.log("Provider Booking ID is not equal with user UID");
        }
      });

      console.log("Unsubscribe function:", unsubscribe);

      // Return unsubscribe function to stop listening when needed
      return unsubscribe;
    } catch (error) {
      console.log("Error bookingID", error);
    }
  };

  useEffect(() => {
    let unsubscribe;

    if (firstProviderIds != null) {
      // Call the function and assign the unsubscribe function
      unsubscribe = checkBookingID();
    }

    // Unsubscribe when the component unmounts or when firstProviderIds changes
    return () => {
      if (unsubscribe && typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [firstProviderIds]);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        console.log("fetchBooking function is called");
        console.log("bookingAccepted: " , bookingAccepted);
        console.log("acceptedByProvider: " , acceptedByProvider);

        if (bookingAccepted && acceptedByProvider) {
          // Create a reference to the Firestore database using your app instance
          const db = getFirestore();
          // Get the user's UID 
          const auth = getAuth();
          const userUID = auth.currentUser.uid;
    
          const serviceBookingsCollection = collection(db, "serviceBookings");
    
          // Get the service booking document using userUID
          const serviceBookingDocRef = doc(serviceBookingsCollection, userUID);

          const userDocRef = doc(db, 'serviceBookings', userUID);
          const activeBookings = collection(userDocRef, "activeBookings");
    
          // Get the document snapshot
          const serviceBookingSnapshot = await getDoc(serviceBookingDocRef);
          const providerDocRef = doc(
            collection(db, "providerProfiles"),
            acceptedByProvider
          );
    
          const providerProfileDoc = await getDoc(providerDocRef);
          if (providerProfileDoc.exists()){
            const providerData = providerProfileDoc.data();
            console.log("Provider Data: ", providerData);
            console.log("Provider Name: ", providerData.name);
            console.log("Provider Email: ", providerData.email);
            console.log("Provider Phone: ", providerData.phone);
            // setProviderName(providerData.name);
            // setProviderEmail(providerData.email);
            // setProviderPhoneNumber(providerData.phone);
            Name = providerData.name;
            Email = providerData.email;
            PhoneNumber = providerData.phone;
            console.log("New Name: ", Name);
            console.log("New Email: ", Email);
            console.log("New Phone: ", PhoneNumber);
    
            // Combine provider data with existing booking data
            const updatedBooking = {
              ...booking,
              providerName: providerData.name,
              providerEmail: providerData.email,
              providerPhone: providerData.phone,
              createdAt: serverTimestamp() // This will save the server's current timestamp
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
              console.error('No such document');
            }
      
          }else{
            console.error('No such document');
          }

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
    

          // Navigate to your desired screen
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
          }); // Replace 'YourScreenName' with the actual screen name you want to navigate to

          // Wait for the delay
          console.log("Still waiting for 10 seconds...");
          await new Promise(resolve => setTimeout(resolve, 10 * 1000));

          if(bookingPaymentMethod !== "Cash"){
            const bookingDataNotif2 = {
              // Using bookingID as the key for the map inside the document
              [generateRandomBookingIDWithNumbers()]: {
                subTitle: `You'll only be charged the final amount once the service is complete. Any unused amount will be returned to your payment method.`,
                title: `₱${bookingTotal}.00 is currently on hold`,
              },
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
  const [editLocationVisible, setEditLocationVisible] = useState(false);
  const [cityAddress, setCityAddress] = useState(null);

  const searchAgain = async () => {
    fetchBookingIndex();
    searchProvider();
  };

  // const [seconds, setSeconds] = useState(80);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (seconds > 0) {
  //       setSeconds((prevSeconds) => prevSeconds - 1);
  //     } else {
  //       clearInterval(interval);
  //       console.log("Timer reached zero!");
  //       setnoProviderVisible(true);
  //     }
  //   }, 1000);

  //   // Cleanup the interval on component unmount
  //   return () => clearInterval(interval);
  // }, [seconds]);

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
              // onDragEnd={handleMarkerDragEnd}
              image={require("../assets/icons8location100-2-1.png")}
            />
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
            onPress={() => navigation.goBack()}
            // onPress={searchAgain}
          >
            <Image
              style={styles.uiIconarrowBackwardfilled}
              contentFit="cover"
              source={require("../assets/ui-iconarrow-backwardfilled.png")}
            />
          </Pressable>
        </View>

        {/* for the no providers found */}

        <Modal animationType="fade" transparent visible={noProviderVisible}>
          <View style={styles.noProviderContainer}>
            <NoProvidersFound />
          </View>
        </Modal>

        <View style={[styles.searchingDistanceRadiusModa]}>
          <SearchingServiceProviderModal
            cityAddress={cityAddress}
            specificLocation={reverseGeocodedAddress || "Loading..."}
            latitude={latitude}
            longitude={longitude}
            city={cityAddress}
            location={location} // Pass the location prop
            title={title}
            category={category}
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

export default SearchingDistanceRadius;
