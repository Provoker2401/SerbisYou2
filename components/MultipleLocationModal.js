import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator, 
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Padding, Border, Color, FontFamily, FontSize } from "../GlobalStyles";
import { RadioButton } from "react-native-paper"; // Updated import statement
import * as Location from "expo-location";
import { useState, useCallback, useEffect, useContext} from "react";
import { useAddAddressContext } from "../AddAddressContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection, // Import getDoc for checking if a user with the same phone number exists
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, updateEmail } from "firebase/auth";
import Toast from "react-native-toast-message";
import { AddressSelectedContext } from "../AddressSelectedContext";
import MapView, {
  Marker,
  Circle,
  enableLatestRenderer,
} from "react-native-maps";

// Initialize valueCounter outside the component
//let valueCounter = 2; // Start from 2 if you have initial options
let optionsLength = 0;
let updatedOptionsArr = { savedOptions: [] };
let currentLocationArr = { currentLocation: [] };

const MultipleLocationModal = ({
  onClose,
  onCurrentLocation,
  selectedValue,
  testingLat,
  testingLng,
}) => {
  const navigation = useNavigation();
  const { setChosenOptionAddress, setChosenOptionLatitude, setChosenOptionLongitude } = useContext(AddressSelectedContext);
  const [currentLocation, setCurrentLocation] = useState();

  const { addAddressData, setAddAddressData } = useAddAddressContext();
  const [loading, setLoading] = useState(false);

  // Now you can access the data in reviewData
  // const { addressValue, streetValue, houseNumberValue, floorValue, noteValue, labelValue} = addAddressData;
  const {
    addressValue,
    streetValue,
    houseNumberValue,
    floorValue,
    noteValue,
    labelValue,
    addValue,
    selectedIDValue,
  } = addAddressData || {};
  const [addFlag, setAddFlag] = useState(false);
  // Define state variables to store the values you want to display
  const [displayAddress, setDisplayAddress] = useState("");
  const [displayStreet, setDisplayStreet] = useState("");
  const [displayHouseNumber, setDisplayHouseNumber] = useState("");
  const [displayFloor, setDisplayFloor] = useState("");
  const [displayNote, setDisplayNote] = useState("");
  const [displayLabel, setDisplayLabel] = useState("");
  const [displaySelectedID, setDisplaySelectedID] = useState("");
  const [displayAddFlag, setDisplayAddFlag] = useState(false);

  const [addedAddress, setAddedAddress] = useState(null);
  const [addedFloor, setAddedFloor] = useState(null);
  const [addedHouseNumber, setAddedHouseNumber] = useState(null);
  const [addedLabel, setAddedLabel] = useState(null);
  const [addedNote, setAddedNote] = useState(null);
  const [addedStreet, setAddedStreet] = useState(null);

  const [address, setAddress] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  // Set the initial selected option to the default option (0)
  const [selectedOption, setSelectedOption] = useState(selectedValue);
  const [displayCurrentLocation, setDisplayCurrentLocation] = useState(false);

  const [savedOptionsData, setSavedOptionsData] = useState([]);
  // Initialize the secondDocumentData using useState
  const [secondDocumentData, setSecondDocumentData] = useState({
    savedOptions: [],
  });

  const [currentLocationData, setCurrentLocationData] = useState({
    currentLocation: [],
  });

  const [helloWorld, setHelloWorld] = useState("");

  const [userCoordinatesLat, setUserCoordinatesLat] = useState();
  const [userCoordinatesLng, setUserCoordinatesLng] = useState();
  
  const [options, setOptions] = useState([
    {
      label: "Home",
      loc: address,
      value: 0,
    },
    { label: "Apartment", loc: "Hello World", value: 1 },
    // { label: "Condo", loc: "WAGMI", value: 2 },
  ]);

  // Initialize a counter to generate unique values
  const [valueCounter, setValueCounter] = useState(null); // Start from 2 if you have initial options

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const useCurrentLocationButton = () => {
    // Set the selected option to the default (0) and address to the default option's label
    setSelectedOption(1);
    console.log("Current Option 2: ", selectedOption);
    setAddress(secondDocumentData.savedOptions[0]);
    console.log("Second Document Data: ", secondDocumentData.savedOptions);
    // Find the selected option
    const chosenOption = secondDocumentData.savedOptions.find(
      (option) => option.value == 1
    );

    if (chosenOption) {
      console.log("Selected Option Label:", chosenOption.label);
      console.log("Selected Option Address:", chosenOption.address);
      setChosenOptionAddress(chosenOption.address);
      onCurrentLocation(chosenOption.address, chosenOption.value);
    } else {
      console.log("Selected Option not found");
    }
    // Close the modal
    onClose();
  };

  const handleRadioChange = (value) => {
    console.log("Value: ", value);
    setSelectedOption(value);
    console.log("Current Option: ", selectedOption);
    console.log("Second Document Data: ", secondDocumentData.savedOptions);

    // Find the selected option
    const chosenOption = secondDocumentData.savedOptions.find(
      (option) => option.value === value
    );

    if (chosenOption) {
      console.log("Selected Option Label:", chosenOption.label);
      console.log("Selected Option Address:", chosenOption.address);
      console.log("Selected Option Latitude:", chosenOption.coordinates.latitude);
      console.log("Selected Option Address:", chosenOption.coordinates.longitude);
      setChosenOptionAddress(chosenOption.address);
      setChosenOptionLatitude(chosenOption.coordinates.latitude);
      setChosenOptionLongitude(chosenOption.coordinates.longitude);
      onCurrentLocation(chosenOption.address, chosenOption.value);
    } else {
      console.log("Selected Option not found");
    }
    onClose();
  };

  const handleEditBtnChange = (value) => {
    setSelectedOption(value);

    // Find the selected option
    const chosenOption = secondDocumentData.savedOptions.find(
      (option) => option.value === value
    );

    if (chosenOption) {
      console.log("Selected Option Address:", chosenOption.address);
      console.log("Selected Option City:", chosenOption.city);
      console.log("Selected Option Coordinates:", chosenOption.coordinates);
      console.log("Selected Option Floor:", chosenOption.floor);
      console.log("Selected Option House Number:", chosenOption.houseNumber);
      console.log("Selected Option Label:", chosenOption.label);
      console.log("Selected Option Note:", chosenOption.note);
      console.log("Selected Option Street Number:", chosenOption.street);
      console.log("Selected Option Value:", chosenOption.value);
    
      navigation.navigate("EditAddressIconComplete", {
        loc: chosenOption.address,
        city: chosenOption.city,
        coordinates: chosenOption.coordinates,
        floor: chosenOption.floor,
        houseNumber: chosenOption.houseNumber,
        label: chosenOption.label,
        otherLabel: chosenOption.otherLabel,
        note: chosenOption.note,
        street: chosenOption.street,
        value: chosenOption.value,
      });
      onClose();
    } else {
      console.log("Selected Option not found");
      onClose();
    }
  };

  useEffect(() => {
    console.log("WAGMI: ", helloWorld);
    console.log("Saved Options Data: ", savedOptionsData);
    console.log("Temporary Data: ", secondDocumentData);
  }, [helloWorld, savedOptionsData, secondDocumentData]);

  const handleAddNewAddress = async () => {
    try {
      console.log("Total Value: ", secondDocumentData.savedOptions.length);
      const selectedValue = secondDocumentData.savedOptions.find(
        (option) => option.value === selectedOption
      );
  
      if (selectedValue) {
        console.log("Option Address:", selectedValue.address);
        console.log("Option Label:", selectedValue.label);
        console.log("Option Latitude:", selectedValue.coordinates.latitude);
        console.log("Option Longitude:", selectedValue.coordinates.longitude);
  
        navigation.navigate("AddNewAddress", {
          loc: selectedValue.address,
          // selCoordinates:selectedValue.coordinates,
          selLatitude:selectedValue.coordinates.latitude,
          selLongitude:selectedValue.coordinates.longitude,
        });
        onClose();
      } else {
        console.log("Option not found");
        navigation.navigate("AddNewAddress");
        onClose();
      }
    } catch (error) {
      console.error("Sign-up error:", error);

      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: error.message || "An error occurred while adding",
        visibilityTime: 5000,
      });
    }
    // Find the selected option
    // console.log("Current dasdasdadas option: ", selectedOption);

  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      const addressResponse = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      console.log("Address Response:", addressResponse);

      // Destructuring latitude and longitude from location.coords
      const { latitude, longitude } = location.coords;

      // Now you can use latitude and longitude as separate variables
      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);

      if (addressResponse.length > 0) {
        const addressInfo = addressResponse[0];

        if (addressInfo.streetNumber !== null) {
          const cityOnly = `${addressResponse[0].streetNumber}, ${addressResponse[0].street}, ${addressResponse[0].city}`;
          // setSelectedOption(0);
          console.log("City Only: ", cityOnly);
          setAddress(cityOnly);

          console.log("OG Document Data:", secondDocumentData); // Log the updated data

          const currentLocData = [
            {
              address: cityOnly,
              label: "Home",
              coordinates: location.coords,
              value: 1,
            },
          ];

          // Update secondDocumentData
          setCurrentLocationData({
            currentLocation: currentLocData,
          });
          setSecondDocumentData({
            savedOptions: currentLocData,
          });
          currentLocationArr.currentLocation = currentLocData;

          console.log("Current Location:", currentLocationArr); // Log the updated data
          console.log("Current Location Data:", currentLocationData); // Log the updated data
          console.log("SecondDocumentData:", secondDocumentData); // Log the updated data
        } else {
          const cityOnly = `${addressResponse[0].street}, ${addressResponse[0].city}`;
          // setSelectedOption(0);
          console.log("City Only: ", cityOnly);
          setAddress(cityOnly);

          console.log("OG Document Data:", secondDocumentData); // Log the updated data

          const currentLocData = [
            {
              address: cityOnly,
              label: "Home",
              coordinates: location.coords,
              value: 1,
            },
          ];

          // Update secondDocumentData
          setCurrentLocationData({
            currentLocation: currentLocData,
          });
          setSecondDocumentData({
            savedOptions: currentLocData,
          });
          currentLocationArr.currentLocation = currentLocData;

          console.log("Current Location:", currentLocationArr); // Log the updated data
          console.log("Current Location Data:", currentLocationData); // Log the updated data
          console.log("SecondDocumentData:", secondDocumentData); // Log the updated data
        }

        // Generate savedOptions based on addressResponse
        // const newSavedOptions = addressResponse.map((addressInfo, index) => {
        //   // Integrate the code to set 'label' and 'value' here
        //   const label = "Current Location";
        //   const value = index + 1;

        //   // Return the object with 'address', 'label', and 'value'
        //   return {
        //     address: cityOnly, // Use the 'cityOnly' value
        //     label,
        //     value,
        //   };
        // });

        // // Update secondDocumentData
        // setSecondDocumentData({ savedOptions: newSavedOptions });
        // console.log("SecondDocumentData:", secondDocumentData); // Log the updated data
      }
    })();

    (async () => {
      try {
        setLoading(true);
        const db = getFirestore(); // Use getFirestore() to initialize Firestore
  
        // Get the user's UID
        const auth = getAuth();
        const user = auth.currentUser.uid;
        console.log(user);
        console.log("Selected Id: ", selectedIDValue);
        // Reference to the "manageAddress" collection for the specified userUID
        const manageAddressCollectionRef = collection(
          db,
          "userProfiles",
          user,
          "manageAddress"
        );
  
        // Reference to the "userProfiles" collection and "manageAddress" subcollection
        const collectionName = "userProfiles";
        const subCollectionName = "manageAddress";
  
        const currentLocationDocRef = doc(
          manageAddressCollectionRef,
          "currentLocation"
        );
  
        // Add the second document named "savedOptions"
        const savedOptionsDocRef = doc(
          manageAddressCollectionRef,
          "savedOptions"
        );
        console.log("Current Location To be Set:", currentLocationArr); // Log the updated data
        await setDoc(currentLocationDocRef, currentLocationArr);
        console.log("Document 'currentLocation' created.");
  
        getDoc(savedOptionsDocRef)
          .then(async (docSnapshot) => {
            if (docSnapshot.exists()) {
              const optionsData = docSnapshot.data();
              console.log("Saved Options Data: ", optionsData); // Log the entire fetched data
  
              // Check if "savedOptions" is an array and has at least one item
              if (
                Array.isArray(optionsData.savedOptions) &&
                optionsData.savedOptions.length > 0
              ) {
                setSecondDocumentData((prevData) => ({
                  ...prevData,
                  savedOptions: [...optionsData.savedOptions],
                }));
                console.log("Saved Options Array: ", secondDocumentData);
                console.log(
                  "Specifc Saved Options Document Data: ",
                  secondDocumentData.savedOptions
                );

                const savedOptionsArray = [...optionsData.savedOptions];

                // Find the item with "value" equal to 6
                const itemWithDesiredValue = savedOptionsArray.find(
                  (item) => item.value === selectedValue
                );

                // Check if the item was found
                if (itemWithDesiredValue) {
                  // Access and log the coordinates
                  const coordinates = itemWithDesiredValue.coordinates;
                  console.log(
                    `Coordinates for value ${selectedValue}:`,
                    coordinates
                  );

                  setUserCoordinatesLat(coordinates.latitude);
                  setUserCoordinatesLng(coordinates.longitude);
                } else {
                  console.log(
                    "Item with value 6 not found in the savedOptions array."
                  );
                }
              } else {
                console.log("No savedOptions found in the document.");
              }
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.error("Error getting document:", error);
          });
          setLoading(false);
      } catch (error) {
        console.error("Fetching data error:", error);
      }
    })();


  }, []);

  // Function to clear all data in AsyncStorage
  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage data cleared successfully");
    } catch (error) {
      console.error("Error clearing AsyncStorage data:", error);
    }
  };

  //Load options from AsyncStorage when the component mounts
  useEffect(() => {
    async function loadOptions() {
      try {
        const savedOptions = await AsyncStorage.getItem("options");
        if (savedOptions !== null) {
          setOptions(JSON.parse(savedOptions));
          // Find the maximum value among the loaded options and set the counter accordingly
          // const maxOptionValue = Math.max(
          //   ...JSON.parse(savedOptions).map((option) => option.value),
          //   1
          // );
          // const number = maxOptionValue + 1;
          // console.log("Number: ", number);
          // console.log("Max Options Value", maxOptionValue);
          // setValueCounter(maxOptionValue + 1);
          // valueCounter = maxOptionValue + 1;
          // console.log("After setValueCounter", valueCounter);
        }
      } catch (error) {
        console.error("Error loading options from AsyncStorage:", error);
      }
    }

    loadOptions();
  }, []);

  // Ensure valueCounter is initialized when options are loaded
  useEffect(() => {
    if (options && options.length > 0) {
      // Find the maximum value among the loaded options and set the counter accordingly
      const maxOptionValue = Math.max(
        ...options.map((option) => option.value),
        1
      );
      setValueCounter(maxOptionValue + 1);
    }
  }, [options]);

  // useEffect for handling addValue logic
  useEffect(() => {
    // setHelloWorld("WAGMI");
    // console.log("Use Effect: ", helloWorld);
    // if (addValue) {
    // Generate a unique value for the new option based on the counter
    // const uniqueValue = valueCounter;
    // Increment the counter for the next new option
    // setValueCounter((prevCounter) => prevCounter + 1);

    // Increment the counter for the next new option
    // valueCounter++;

    // Reference to Firestore
    // try {
    //   const db = getFirestore(); // Use getFirestore() to initialize Firestore

    //   // Get the user's UID
    //   const auth = getAuth();
    //   const user = auth.currentUser.uid;
    //   console.log(user);
    //   console.log("Selected Id: ", selectedIDValue);
    //   // Reference to the "manageAddress" collection for the specified userUID
    //   const manageAddressCollectionRef = collection(
    //     db,
    //     "userProfiles",
    //     user,
    //     "manageAddress"
    //   );

    //   // Reference to the "userProfiles" collection and "manageAddress" subcollection
    //   const collectionName = "userProfiles";
    //   const subCollectionName = "manageAddress";

    //   // Fetch the unique ID document under "SubCategories"
    //   const subCollectionRef = doc(
    //     db,
    //     collectionName,
    //     user,
    //     subCollectionName,
    //     selectedIDValue
    //   );

    //   // Add the second document named "savedOptions"
    //   const savedOptionsDocRef = doc(
    //     manageAddressCollectionRef,
    //     "savedOptions"
    //   );

    //   getDoc(savedOptionsDocRef)
    //     .then(async (docSnapshot) => {
    //       if (docSnapshot.exists()) {
    //         const optionsData = docSnapshot.data();
    //         console.log("Saved Options Data: ", optionsData); // Log the entire fetched data

    //         // Check if "savedOptions" is an array and has at least one item
    //         if (
    //           Array.isArray(optionsData.savedOptions) &&
    //           optionsData.savedOptions.length > 0
    //         ) {
    //           setSecondDocumentData((prevData) => ({
    //             ...prevData,
    //             savedOptions: [...optionsData.savedOptions],
    //           }));
    //           console.log("Saved Options Array: ", secondDocumentData);
    //           console.log("Specifc Saved Options DocumentData: ", secondDocumentData.savedOptions);
    //         } else {
    //           console.log("No savedOptions found in the document.");
    //         }
    //       } else {
    //         console.log("No such document!");
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("Error getting document:", error);
    //     });

    //   // getDoc(subCollectionRef)
    //   //   .then(async (docSnapshot) => {
    //   //     if (docSnapshot.exists()) {
    //   //       const addedData = docSnapshot.data();
    //   //       console.log("Fetched Data: ", addedData); // Log the entire fetched data

    //   //       // Now, log individual fields
    //   //       console.log("Address: ", addedData.address);
    //   //       console.log("Street: ", addedData.street);
    //   //       console.log("House Number: ", addedData.houseNumber);
    //   //       console.log("Floor: ", addedData.floor);
    //   //       console.log("Note: ", addedData.note);
    //   //       console.log("Label: ", addedData.label);

    //   //       console.log("Updated Options Length: ", optionsLength);
    //   //       console.log("Updated Options Array: ", updatedOptionsArr);

    //   //       setAddedAddress(addedData.address);
    //   //       setAddedFloor(addedData.floor);
    //   //       setAddedHouseNumber(addedData.houseNumber);
    //   //       setAddedLabel(addedData.label);
    //   //       setAddedNote(addedData.note);
    //   //       setAddedStreet(addedData.street);

    //   //       console.log("Address: ", addedAddress);
    //   //       console.log("Street: ", addedStreet);
    //   //       console.log("House Number: ", addedHouseNumber);
    //   //       console.log("Floor: ", addedFloor);
    //   //       console.log("Note: ", addedNote);
    //   //       console.log("Label: ", addedLabel);

    //   //       const tempData = [
    //   //         {
    //   //           address: addedData.address,
    //   //           label: addedData.label,
    //   //           floor: addedData.floor,
    //   //           houseNumber: addedData.houseNumber,
    //   //           note: addedData.note,
    //   //           street: addedData.street,
    //   //           value: optionsLength + 1,
    //   //         },
    //   //       ];
    //   //       console.log("tempData: ", tempData);
    //   //       console.log("Not updated: ", secondDocumentData.savedOptions);

    //   //       // Set state to update secondDocumentData.savedOptions
    //   //       setSecondDocumentData((prevData) => ({
    //   //         ...prevData,
    //   //         savedOptions: [...prevData.savedOptions, ...tempData],
    //   //       }));
    //   //       console.log("Updated secondDocumentData: ", secondDocumentData);

    //   //       const dataToStore = {
    //   //         savedOptions: secondDocumentData.savedOptions,
    //   //       };

    //   //       // Append the new array to updatedOptionsArr without modifying the original
    //   //       updatedOptionsArr = {
    //   //         savedOptions: [
    //   //           ...updatedOptionsArr.savedOptions,
    //   //           ...tempData,
    //   //         ],
    //   //       };
    //   //       // updatedOptionsArr = [...updatedOptionsArr, ...dataToStore];

    //   //       console.log("Updated Options Array: ", updatedOptionsArr);
    //   //       await setDoc(savedOptionsDocRef, updatedOptionsArr);

    //   //       // await setDoc(savedOptionsDocRef, secondDocumentData);
    //   //       console.log("Updated 'savedOptions' document\n");
    //   //     } else {
    //   //       console.log("No such document!");
    //   //     }
    //   //   })
    //   //   .catch((error) => {
    //   //     console.error("Error getting document:", error);
    //   //   });
    // } catch (error) {
    //   console.error("Fetching data error:", error);
    // }

    // console.log("Address: ", addressValue);
    // console.log("Street: ", streetValue);
    // console.log("House Number: ", houseNumberValue);
    // console.log("Floor: ", floorValue);
    // console.log("Note: ", noteValue);
    // console.log("Label: ", labelValue);
    // console.log("addFlag: ", addValue);
    // console.log("Counter value: ", valueCounter);

    // console.log("A list will be added!");
    // setOptions([...options, ])
    setDisplayAddress(addressValue); // Update the displayAddress state with addressValue
    setDisplayStreet(streetValue); // Update the displayStreet state with streetValue
    setDisplayHouseNumber(houseNumberValue); // Update the displayHouseNumber state with houseNumberValue
    setDisplayFloor(floorValue); // Update the displayFloor state with floorValue
    setDisplayNote(noteValue); // Update the displayNote state with noteValue
    setDisplayLabel(labelValue); // Update the displayLabel state with labelValue
    setDisplayAddFlag(true); // Update the displayAddFlag state to true

    // if (valueCounter === null) {
    //   // Initialize valueCounter when it's not set (no options loaded)
    //   setValueCounter(2);
    // } else {
    // Generate a unique value for the new option based on the counter
    const uniqueValue = valueCounter;

    // Increment the counter for the next new option
    setValueCounter((prevCounter) => prevCounter + 1);
    // console.log("Counter value: ", valueCounter);
    // Insert a new object into the options array
    const newOption = {
      label: labelValue,
      loc: addressValue,
      value: options.length, // Use the unique value
    };

    // Insert a new object into the options array
    // const newOption = {
    //   label: labelValue,
    //   loc: addressValue,
    //   value: uniqueValue,
    // };

    // Update options with the new option
    const newOptions = [...options, newOption];
    setOptions(newOptions);

    // Save the updated options to AsyncStorage
    AsyncStorage.setItem("options", JSON.stringify(newOptions)).catch((error) =>
      console.error("Error saving options to AsyncStorage:", error)
    );

    setAddAddressData({
      addValue: addFlag,
    });
    // }
    // }
  }, [
    addValue,
    addressValue,
    streetValue,
    houseNumberValue,
    floorValue,
    noteValue,
    labelValue,
    addFlag,
  ]);

  const handleNewAddress = () => {
    navigation.navigate("Maps");
    setModalVisible(false);
  };

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const parsedTestingLat = parseFloat(testingLat);
  const parsedTestingLng = parseFloat(testingLng);

  console.log("UserCoodinatesLat: ", userCoordinatesLat);
  console.log("UserCoordinatesLng:", userCoordinatesLng);

  useEffect(() => {
    // Call the function to fetch or update coordinates

    // Update the region based on the fetched or updated coordinates
    if (
      !isNaN(parseFloat(userCoordinatesLat)) &&
      !isNaN(parseFloat(userCoordinatesLng))
    ) {
      setRegion({
        latitude: parseFloat(userCoordinatesLat),
        longitude: parseFloat(userCoordinatesLng),
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  }, [userCoordinatesLat, userCoordinatesLng]);

  const [region, setRegion] = useState({
    latitude: !isNaN(parseFloat(userCoordinatesLat))
      ? parseFloat(userCoordinatesLat)
      : 0,
    longitude: !isNaN(parseFloat(userCoordinatesLng))
      ? parseFloat(userCoordinatesLng)
      : 0,
    latitudeDelta: 0.0922, // Controls the zoom level. Adjust as needed.
    longitudeDelta: 0.0421, // Controls the zoom level. Adjust as needed.
  });

  const onRegionChange = (newRegion) => {
    // Update the region dynamically if needed
    setRegion(newRegion);
  };

  return (
    <View style={styles.multipleLocationModal}>
      <View style={styles.lineFrame}>
        <View style={styles.lineFrameInner}>
          <View style={styles.frameChild} />
        </View>
      </View>
      <Pressable
        style={[
          styles.useMyCurrentLocationFrame,
          styles.addressBtnInnerFlexBox,
        ]}
        onPress={useCurrentLocationButton}
      >
        <View style={styles.currentLocationBtn}>
          <View style={[styles.frameParent, styles.frameParentFlexBox]}>
            <Image
              style={styles.frameItemLayout}
              contentFit="cover"
              source={require("../assets/frame-26085027.png")}
            />
            <View style={styles.homeParentSpaceBlock}>
              <Text style={styles.useMyCurrent}>Use my current location</Text>
            </View>
          </View>
        </View>
      </Pressable>

      <View style={styles.chooseLocationFrameParent}>
        {loading ? (
         <ActivityIndicator size="small" color="#003459" />
        ):(
          secondDocumentData.savedOptions.map((option, index) => (
            <View key={index}>
              {selectedOption === option.value ? (
                <View style={[styles.chooseLocationFrame, styles.frameFlexBox]}>
                  {/* <Pressable
                    style={[styles.chooseLocationBtn, styles.frameParentFlexBox]}
                  > */}
                  <View
                    style={[
                      styles.chooseLocationBtn,
                      styles.frameParentFlexBox,
                    ]}
                  >
                    <MapView
                      style={{ width: width, height: 150 }} // Set the MapView dimensions to take the entire space
                      zoomEnabled={false}
                      scrollEnabled={false} // Disable map dragging
                      region={region} // Set the initial region for the map
                      onRegionChange={onRegionChange} // Update the region dynamically
                    >
                      <Marker
                        coordinate={{
                          latitude: parseFloat(userCoordinatesLat),
                          longitude: parseFloat(userCoordinatesLng),
                        }}
                      />
                    </MapView>
                    {/* <View style={styles.lineFrameInner}>
                      <ImageBackground
                        style={[styles.frameWrapper, styles.frameLayout]}
                        resizeMode="cover"
                        source={require("../assets/frame26085032.png")}
                      >
                        <View
                          style={[
                            styles.icons8Location10021Wrapper,
                            styles.editBtnPosition,
                          ]}
                        >
                          <Image
                            style={[
                              styles.icons8Location10021,
                              styles.pencil1IconPosition,
                            ]}
                            contentFit="cover"
                            source={require("../assets/icons8location100-2-1.png")}
                          />
                        </View>
                      </ImageBackground>
                    </View> */}
                    <View style={styles.lineFrameInner}>
                      <View style={[styles.frameGroup, styles.frameSpaceBlock]}>
                        <View style={styles.radioButton1Wrapper}>
                          <TouchableOpacity
                            onPress={() => handleRadioChange(option.value)}
                          >
                            {selectedOption === option.value ? (
                              <View style={styles.outerClicked}>
                                <View style={styles.innerClicked}></View>
                              </View>
                            ) : (
                              <View style={styles.outer} />
                            )}
                          </TouchableOpacity>
                        </View>
                        <View style={styles.homeParentSpaceBlock}>
                          <Text style={styles.homeTypo}>{option.label}</Text>
                          <Text style={styles.barangayTypo}>
                            {option.address}
                          </Text>
                          {/* <Text style={styles.barangayTypo}>{option.value}</Text> */}
                          <Pressable
                            style={[styles.editBtn, styles.editBtnPosition]}
                            onPress={() => handleEditBtnChange(option.value)}
                          >
                            <Image
                              style={[
                                styles.pencil1Icon,
                                styles.pencil1IconPosition,
                              ]}
                              contentFit="cover"
                              source={require("../assets/pencil-1.png")}
                            />
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  {/* </Pressable> */}
                  </View>
                </View>
              ) : (
                <View style={styles.frameFlexBox1}>
                  <Pressable
                    style={[styles.chooseLocationBtn, styles.frameParentFlexBox]}
                  >
                    <View style={styles.lineFrameInner}>
                      <View style={[styles.frameGroup, styles.frameSpaceBlock]}>
                        <View style={styles.radioButton1Wrapper}>
                          <TouchableOpacity
                            onPress={() => handleRadioChange(option.value)}
                          >
                            {selectedOption === option.value ? (
                              <View style={styles.outerClicked}>
                                <View style={styles.innerClicked}></View>
                              </View>
                            ) : (
                              <View style={styles.outer} />
                            )}
                          </TouchableOpacity>
                        </View>
                        <View style={styles.homeParentSpaceBlock}>
                          <Text style={styles.homeTypo}>{option.label}</Text>
                          <Text style={styles.barangayTypo}>
                            {option.address}
                          </Text>
                          {/* <Text style={styles.barangayTypo}>{option.value}</Text> */}
                          <Pressable
                            style={[styles.editBtn, styles.editBtnPosition]}
                            onPress={() => handleEditBtnChange(option.value)}
                          >
                            <Image
                              style={[
                                styles.pencil1Icon,
                                styles.pencil1IconPosition,
                              ]}
                              contentFit="cover"
                              source={require("../assets/pencil-1.png")}
                            />
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  </Pressable>
                </View>
              )}
            </View>
          ))
        )}
      </View>
      
      <View style={[styles.addNewAddressFrame, styles.frameSpaceBlock]}>
        <Pressable
          style={styles.currentLocationBtn}
          onPress={() => handleAddNewAddress()}
        >
          <View style={[styles.frameParent, styles.frameParentFlexBox]}>
            <View style={styles.radioButton1Wrapper}>
              <Image
                style={styles.add2Icon}
                contentFit="cover"
                source={require("../assets/add-21.png")}
              />
            </View>
            <View style={styles.homeParentSpaceBlock}>
              <Text style={styles.useMyCurrent}>Add New Address</Text>
            </View>
          </View>
        </Pressable>
      </View>
      {/* <View>
        <Text>Display Address: {displayAddress}</Text>
        <Text>Display Street: {displayStreet}</Text>
        <Text>Display House Number: {displayHouseNumber}</Text>
        <Text>Display Floor: {displayFloor}</Text>
        <Text>Display Note: {displayNote}</Text>
        <Text>Display Label: {displayLabel}</Text>
        <Text>Display Add Flag: {displayAddFlag ? "true" : "false"}</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  addressBtnInnerFlexBox: {
    display: "flex",
    alignSelf: "stretch",
  },
  frameParentFlexBox: {
    flex: 1,
    alignItems: "center",
  },

  frameLayout: {
    height: 95,
    borderRadius: Border.br_8xs,
    alignSelf: "stretch",
  },
  editBtnPosition: {
    position: "absolute",
    padding: Padding.p_3xs,
    alignItems: "center",
  },
  pencil1IconPosition: {
    left: 0,
    top: 0,
    zIndex: 0,
    position: "absolute",
  },
  frameSpaceBlock: {
    paddingHorizontal: 0,
    alignSelf: "stretch",
  },
  homeTypo: {
    width: 253,
    display: "flex",
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratBold,
    lineHeight: 32,
    fontSize: FontSize.body1Semibold_size,
    height: 24,
    textAlign: "left",
    fontWeight: "700",
    alignItems: "center",
  },
  barangayTypo: {
    color: Color.colorDarkgray_200,
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "500",
    lineHeight: 20,
    fontSize: FontSize.typographyTaglineSmallRegular_size,
    textAlign: "left",
    alignSelf: "stretch",
  },
  frameChild: {
    borderStyle: "solid",
    borderColor: Color.colorDarkgray_400,
    borderTopWidth: 2,
    width: 40,
    height: 2,
  },
  lineFrameInner: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  lineFrame: {
    paddingTop: Padding.p_5xs,
    paddingBottom: Padding.p_6xs,
    alignSelf: "stretch",
  },
  frameItemLayout: {
    height: 20,
    width: 20,
  },
  useMyCurrent: {
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    lineHeight: 21,
    fontFamily: FontFamily.title2Bold32,
    color: Color.colorDarkslategray_900,
    textAlign: "left",
    fontWeight: "700",
  },
  homeParentSpaceBlock: {
    marginLeft: 10,
    flex: 1,
  },
  frameParent: {
    flexDirection: "row",
  },
  currentLocationBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
  },
  icons8Location10021: {
    width: 30,
    height: 30,
  },
  icons8Location10021Wrapper: {
    top: 20,
    left: 58,
    zIndex: 0,
    justifyContent: "center",
  },
  frameWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButton1: {
    width: 24,
    height: 24,
  },
  radioButton1Wrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  frameGroup: {
    paddingVertical: Padding.p_8xs,
    flexDirection: "row",
    alignItems: "center",
  },
  chooseLocationBtn: {
    justifyContent: "center",
  },
  chooseLocationFrame: {
    backgroundColor: Color.colorSteelblue_200,
    marginTop: 10,
  },
  frameInner: {
    width: "100%",
    overflow: "hidden",
    maxWidth: "100%",
  },
  addressBtnInner: {
    justifyContent: "center",
    alignItems: "center",
  },
  radioButton11: {
    flexDirection: "row",
  },
  home: {
    zIndex: 0,
  },
  barangaySambagP: {
    zIndex: 1,
  },
  pencil1Icon: {
    height: 20,
    width: 20,
  },
  editBtn: {
    top: 5,
    left: 205,
    zIndex: 2,
  },
  addressFrame: {
    marginTop: 5,
    backgroundColor: Color.white,
  },
  chooseLocationFrameParent: {
    marginTop: 5,
    alignSelf: "stretch",
  },
  add2Icon: {
    width: 18,
    height: 18,
    overflow: "hidden",
  },
  multipleLocationModal: {
    borderRadius: Border.br_5xl,
    width: 310,
    paddingHorizontal: Padding.p_base,
    paddingBottom: Padding.p_xl,
    maxHeight: "100%",
    maxWidth: "100%",
    backgroundColor: Color.white,
  },

  // Radio Button Styles
  outerClicked: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Color.colorDarkslategray_900,
  },
  innerClicked: {
    width: 17,
    height: 17,
    backgroundColor: Color.colorDarkslategray_900,
    borderRadius: 10,
  },
  outer: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Color.colorDarkslategray_900,
  },

  frameFlexBox: {
    padding: Padding.p_3xs,
    borderRadius: Border.br_8xs,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  frameFlexBox1: {
    paddingHorizontal: Padding.p_3xs,
    borderRadius: Border.br_8xs,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  useMyCurrentLocationFrame: {
    // paddingBottom: Padding.p_5xs,
    marginTop: 5,
  },

  addNewAddressFrame: {
    paddingVertical: Padding.p_8xs,
    // marginTop: 5,
  },
});

export default MultipleLocationModal;

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   StyleProp,
//   ViewStyle,
//   StyleSheet,
//   Text,
//   Pressable,
//   TouchableOpacity,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Image } from "expo-image";
// import { Color, Padding, FontSize, FontFamily, Border } from "../GlobalStyles";
// import * as Location from "expo-location";
// import Modal from "react-native-modal";
// import { RadioButton } from "react-native-paper"; // Updated import statement
// import { useNavigation } from "@react-navigation/native";

// const Header = ({ style }) => {
//   const [address, setAddress] = useState(null);
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [contentHeight, setContentHeight] = useState(0);

//   // Set the initial selected option to the default option (0)
//   const [selectedOption, setSelectedOption] = useState(0);

//   const options = [
//     { label: address, value: 0 },
//     { label: "Option 2", value: 1 },
//     { label: "Option 3", value: 2 },
//   ];

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };

//   const navigation = useNavigation();

//   const handleNewAddress = () => {
//     navigation.navigate("Maps");
//     setModalVisible(false);
//   };

//   const useCurrentLocationButton = () => {
//     // Set the selected option to the default (0) and address to the default option's label
//     setSelectedOption(0);
//     setAddress(options[0].label);

//     // Close the modal
//     setModalVisible(false);
//   };

//   const measureContentHeight = (content) => {
//     if (content) {
//       setContentHeight(content.clientHeight);
//     }
//   };

//   const handleRadioChange = (value) => {
//     setSelectedOption(value);

//     // Find the selected option
//     const selectedOption = options.find((option) => option.value === value);

//     if (selectedOption) {
//       console.log("Selected Option Label:", selectedOption.label);
//     } else {
//       console.log("Selected Option not found");
//     }

//     setModalVisible(false);
//   };

//   useEffect(() => {
//     (async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         console.error("Permission to access location was denied");
//         return;
//       }

//       const location = await Location.getCurrentPositionAsync({});

//       const addressResponse = await Location.reverseGeocodeAsync({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//       });

//       if (addressResponse.length > 0) {
//         const addressInfo = addressResponse[0];

//         if (addressInfo.streetNumber !== null) {
//           const cityOnly = `${addressResponse[0].streetNumber}, ${addressResponse[0].street}, ${addressResponse[0].city}`;
//           setAddress(cityOnly);
//         } else {
//           const cityOnly = `${addressResponse[0].street}, ${addressResponse[0].city}`;
//           setAddress(cityOnly);
//         }
//       }
//     })();
//   }, []);

//   return (
//     <SafeAreaView style={[styles.header, style]}>
//       <View style={styles.view}>
//         <View style={styles.serbisyouwhite2Wrapper}>
//           <Image
//             style={styles.serbisyouwhite2Icon}
//             contentFit="cover"
//             source={require("../assets/serbisyouwhite-2.png")}
//           />
//         </View>
//         <Text style={[styles.serbisyou, styles.serbisyouFlexBox]}>
//           SerbisYou
//         </Text>
//         <View style={[styles.frame, styles.frameFlexBox]}>
//           <View style={styles.currentLocationParent}>
//             <View style={[styles.locationBtn, styles.locationFlexBox]}>
//               {address && (
//                 <Text style={styles.locationText}>
//                   {options[selectedOption].label}
//                 </Text>
//               )}

//               <Pressable onPress={toggleModal}>
//                 <Image
//                   style={styles.locationBtnChild}
//                   contentFit="cover"
//                   source={require("../assets/vector-4.png")}
//                 />
//               </Pressable>

//               <Modal
//                 isVisible={isModalVisible}
//                 style={styles.modalContainer}
//                 animationOut="fadeOutDownBig"
//                 animationOutTiming={2000}
//               >
//                 <View
//                   style={[styles.modalContent, { height: contentHeight }]}
//                   onLayout={(event) =>
//                     measureContentHeight(event.nativeEvent.target)
//                   }
//                 >
//                   <View style={styles.currentAddContainer}>
//                     <TouchableOpacity
//                       style={styles.currentAddContainer}
//                       onPress={useCurrentLocationButton}
//                     >
//                       {/* <Image
//                         style={styles.locationIcon}
//                         source={require("../assets/gotolocation.png")}
//                       /> */}
//                       <Text style={styles.currentlocationText}>
//                         Use my current location
//                       </Text>
//                     </TouchableOpacity>
//                   </View>
//                   <View style={styles.radioContainer}>
//                     {options.map((option) => (
//                       <View
//                         key={option.value}
//                         style={{
//                           flexDirection: "row",
//                           alignItems: "center",
//                           marginLeft: 5,
//                         }}
//                       >
//                         <RadioButton
//                           value={option.value}
//                           style={{height: 300}}
//                           uncheckedColor={"#003459"}
//                           color={'#003459'}
//                           status={
//                             selectedOption === option.value
//                               ? "checked"
//                               : "unchecked"
//                           }
//                           onPress={() => handleRadioChange(option.value)}
//                         />
//                         <Text style={styles.optionLabels}>{option.label}</Text>
//                       </View>
//                     ))}
//                     {/* <Text>
//                       Selected option: {options[selectedOption].label}
//                     </Text> */}
//                   </View>
//                   <View style={styles.currentAddContainer}>
//                     <TouchableOpacity
//                       onPress={handleNewAddress}
//                       style={styles.currentAddContainer}
//                     >
//                       <Image
//                         style={styles.locationIcon}
//                         source={require("../assets/add-21.png")}
//                       />
//                       <Text style={styles.currentlocationText}>
//                         Add New Address
//                       </Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </Modal>
//             </View>
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   optionLabels: {
//     paddingVertical: 5,
//     color: "#003459",
//     fontSize: 16,
//     fontFamily: FontFamily.title2Bold32,
//     marginLeft: 5,
//   },
//   radioContainer: {
//     marginLeft: -10,
//     paddingBottom: 5,
//   },
//   radioItem: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   currentlocationText: {
//     paddingVertical: 5,
//     color: "#003459",
//     fontSize: 16,
//     fontFamily: FontFamily.title2Bold32,
//     marginLeft: 15,
//   },
//   currentAddContainer: {
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   locationIcon: {
//     height: 20,
//     width: 20,
//   },
//   modalContainer: {
//     backgroundColor: "transparent",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   modalContent: {
//     width: 300,
//     backgroundColor: "white",
//     borderRadius: 10,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//   },
//   header: {
//     backgroundColor: Color.colorDarkslateblue_100,
//   },
//   serbisyouFlexBox: {
//     textAlign: "left",
//     color: Color.white,
//   },
//   frameFlexBox: {
//     justifyContent: "flex-end",
//     flexDirection: "row",
//   },
//   locationFlexBox: {
//     flex: 1,
//     alignItems: "center",
//   },
//   serbisyouwhite2Icon: {
//     width: 63,
//     height: 49,
//   },
//   serbisyouwhite2Wrapper: {
//     paddingLeft: Padding.p_xs,
//     paddingTop: Padding.p_7xs,
//     paddingBottom: Padding.p_7xs,
//   },
//   serbisyou: {
//     fontSize: 20,
//     letterSpacing: 0.5,
//     fontWeight: "700",
//     fontFamily: FontFamily.title2Bold32,
//     width: 131,
//   },
//   currentLocation: {
//     fontSize: 10,
//     letterSpacing: 0.6,
//     lineHeight: 12,
//     textTransform: "uppercase",
//     fontWeight: "500",
//     fontFamily: FontFamily.level2Medium12,
//     width: 101,
//     textAlign: "left",
//     color: Color.white,
//   },
//   talambanCebuCity: {
//     fontSize: 13,
//     fontFamily: FontFamily.title4Regular18,
//     textAlign: "center",
//     color: Color.white,
//   },
//   locationBtnChild: {
//     borderRadius: Border.br_12xs,
//     width: 12,
//     height: 12,
//     marginLeft: 1,
//   },
//   locationBtn: {
//     marginTop: 1,
//     justifyContent: "flex-end",
//     flexDirection: "row",
//     alignSelf: "stretch",
//     flex: 1,
//   },
//   currentLocationParent: {
//     width: 144,
//     height: 37,
//     alignItems: "flex-end",
//     justifyContent: "center",
//   },
//   frame: {
//     paddingHorizontal: Padding.p_smi,
//     paddingVertical: 0,
//   },
//   view: {
//     paddingTop: Padding.p_5xs,
//     paddingRight: Padding.p_2xs,
//     paddingBottom: Padding.p_5xs,
//     justifyContent: "space-between",
//     alignItems: "center",
//     flexDirection: "row",
//     alignSelf: "stretch",
//   },
//   locationText: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "white",
//   },
// });

// export default Header;
