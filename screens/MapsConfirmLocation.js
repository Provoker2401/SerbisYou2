import React, { useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Pressable,
  TextInput,
  Keyboard,
  Alert,
  Linking,
} from "react-native";
import MapView, {
  Marker,
  Circle,
  enableLatestRenderer,
} from "react-native-maps";
import axios from "axios";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation, useRoute } from "@react-navigation/native";
const { height, width } = Dimensions.get("window");
import {
  getFirestore,
  doc,
  getDoc,
  collection, // Import getDoc for checking if a user with the same phone number exists
} from "firebase/firestore";
import { getAuth} from "firebase/auth";
import Toast from "react-native-toast-message";
import { Padding, Border, Color, FontFamily, FontSize } from "../GlobalStyles";
import { AddressSelectedContext } from "../AddressSelectedContext";
import { useReviewSummaryContext } from "../ReviewSummaryContext";
import { useEditLocation } from '../EditLocationContext';

const MapsConfirmLocation = ({route}) => {
  const ref = useRef();
  const mapRef = useRef(null);
  const navigation = useNavigation();

  const { selectedCoordinates} = route.params || {};

  if(selectedCoordinates == null){
    console.log("Selected Loc is null")
  }else{
    console.log("Selected Loc is not null", selectedCoordinates);
  }

  const [latitudeToPass, setlatitudeToPass] = useState();
  const [longitudeToPass, setlongitudeToPass] = useState();

  const { reviewData, setReviewData } = useReviewSummaryContext();
  const { chosenOptionAddress, chosenOptionLatitude, chosenOptionLongitude, currentLatitude, currentLongitude } = useContext(AddressSelectedContext);

  if(chosenOptionLatitude == null || chosenOptionLongitude== null){
    console.log("Selected Loc is null")
  }else{
    console.log("Selected Lat: ", chosenOptionLatitude);
    console.log("Selected Long: ", chosenOptionLongitude);
  }

  // Access the values from locationData
  const { locationData, setLocation } = useEditLocation();
  const cityAddress2 = locationData.cityAddress;
  const specificLocation = locationData.specificLocation;
  const streetValue = locationData.streetValue;
  const houseValue = locationData.houseValue;
  const floorValue = locationData.floorValue;
  const noteValue = locationData.noteValue;
  const label = locationData.label;
  const otherLabel = locationData.otherLabel;

  const [isInputFocused, setIsInputFocused] = useState(false);

  const [initialMapRegion, setInitialMapRegion] = useState({
    latitude: chosenOptionLatitude || selectedCoordinates?.latitude || currentLatitude,
    longitude: chosenOptionLongitude || selectedCoordinates?.longitude || currentLongitude,
    latitudeDelta: 0.0522,
    longitudeDelta: 0.0321,
  });
  
  const [initialMarkerPosition, setInitialMarkerPosition] = useState({
    latitude: chosenOptionLatitude || selectedCoordinates?.latitude || currentLatitude,
    longitude: chosenOptionLongitude || selectedCoordinates?.longitude || currentLongitude,
  });
  

  // useEffect(() => {
  //   // Fetch geocode information for the chosenOptionAddress or selectedLoc
  //   async function fetchGeocode() {
  //     try {
  //       console.log("Chosen Option Address or Selected Location!");
  
  //       let addressToFetch = chosenOptionAddress;
  
  //       // Use selectedLoc if it's not null
  //       if (selectedLoc) {
  //         addressToFetch = selectedLoc; // Assuming selectedLoc has the required structure
  //       }
  
  //       const response = await axios.get(
  //         `https://maps.googleapis.com/maps/api/geocode/json?address=${addressToFetch}&key=AIzaSyAuaR8dxr95SLUTU-cidS7I-3uB6mEoJmA`
  //       );
  
  //       if (response.data.results.length > 0) {
  //         const { lat, lng } = response.data.results[0].geometry.location;
  //         setMarkerPosition({ latitude: lat, longitude: lng });
  //         setInitialMapRegion({
  //           latitude: lat,
  //           longitude: lng,
  //           latitudeDelta: 0.0922,
  //           longitudeDelta: 0.0421,
  //         });
  //         console.log("Latitude:", lat);
  //         console.log("Longitude:", lng);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching geocode:", error);
  //     }
  //   }
  
  //   // Trigger the fetch when either chosenOptionAddress or selectedLoc changes
  //   if (chosenOptionAddress || selectedLoc) {
  //     fetchGeocode();
  //   }
  // }, [chosenOptionAddress, selectedLoc]);
  const [markerPosition, setMarkerPosition] = useState(initialMarkerPosition);
  const [adjustedPosition, setAdjustedPosition] = useState(
    initialMarkerPosition
  );
  const [currentPosition, setCurrentPosition] = useState(initialMarkerPosition);
  const [reverseGeocodedAddress, setReverseGeocodedAddress] = useState(null);
  const [showLocationDetails, setShowLocationDetails] = useState(true);
  const [showCloseBtn, setShowCloseBtn] = useState(true);
  const [cityAddress, setcityAddress] = useState(null);

  const [isMapPressable, setIsMapPressable] = useState(true); // make it false as default

  const handlePlaceSelect = (data, details) => {
    setIsMapPressable(true);      // Make the map pressable
    setShowLocationDetails(true); // show the info container

    console.log("Map is now pressable after pressing handplace select");

    if (details) {

      setTimeout(() => {
        ref.current?.setAddressText('');
      }, 100);
      
      console.log("Details: ", details);
      const { lat, lng } = details.geometry.location;
      console.log(lat);
      console.log(lng);
      console.log("Details Geometry: ", details.geometry.location);
      console.log("Formatted Address: ", details.formatted_address);
      setMarkerPosition({ latitude: lat, longitude: lng });
      setInitialMapRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0321,
      });
    }
  };

  const handleMapPress = (event) => {
    if (isMapPressable) {
      // Your logic for handling map press
      const { latitude, longitude } = event.nativeEvent.coordinate;
      setShowLocationDetails(true);
      setMarkerPosition({ latitude, longitude });
      setInitialMapRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0321,
      });
      console.log("Map is pressed");
      // Reset the map pressability state if needed
    } else {
      console.log("Map is not pressable");
    }
  };

  const handleAddressInputChange = (text) => {
    if (text.trim() === "") {
      setIsMapPressable(true); // Make the map pressable
      setShowLocationDetails(true);
      setShowCloseBtn(false);
    } else {
      setShowLocationDetails(false);
      setIsMapPressable(false); // Make the map not pressable
      setShowCloseBtn(true);
    }
  };

  const fetchReverseGeolocation = async (latitude, longitude) => {
    try {
      enableLatestRenderer();
      setlatitudeToPass(latitude);
      setlongitudeToPass(longitude);

      const apiKey = "AIzaSyBeZMkWh5O-VLFnVvRJw13qwXK6xDyiYrQ"; // Replace with your Google Maps API key
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=street_address&key=${apiKey}`
      );
      console.log("OG Response: " ,response.data.results);

      if (response.data.results && response.data.results.length > 0) {
        const data = response.data.results;
        // console.log("Data Results: ", JSON.stringify(data));
        const firstResult = response.data.results[0];
        const formattedAddress = firstResult.formatted_address;
        console.log("First Result: ", firstResult);
        // console.log("Formatted Address: ", formattedAddress);
        console.log("Formatted Address: ", formattedAddress);

        // Modify the address components to exclude the region, zip code, and country
        const addressComponents1 = firstResult.address_components.filter(
          (component) => {
            return ![
              "administrative_area_level_1",
              "postal_code",
              "country",
            ].includes(component.types[0]);
          }
        );

        const formattedAddress1 = addressComponents1
          .map((component) => component.long_name)
          .join(", ");
        // console.log("Address Component: ", formattedAddress1);

        // Extracting the city from the formatted address
        const addressComponents = firstResult.address_components;
        let city = "";
        for (const component of addressComponents) {
          if (component.types.includes("locality")) {
            city = component.long_name;
            break;
          }
        }

        if (
          ![
            "Cebu",
            "Cebu City",
            "Mandaue",
            "Mandaue City",
            "Lapu-Lapu",
            "Lapu-Lapu City",
          ].includes(city)
        ) {
          // Store administrative_area_level_2 in the city variable
          for (const component of firstResult.address_components) {
            if (component.types.includes("administrative_area_level_2")) {
              city = component.long_name;
              break;
            }
          }
        }

        setReverseGeocodedAddress(formattedAddress1);
        setcityAddress(city);
        // Console.log the city
        console.log("City:", city);
      } else {
        // If Google Geocoding API doesn't return results, try OpenStreetMap Nominatim API
        try {
          const osmResponse = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const osmData = await osmResponse.json();
          console.log("OSM Data:", osmData);
          if (osmData.display_name) {
            const addressParts = osmData.display_name.split(", ");
            console.log("Address Parts:", addressParts);
            // Remove the last 3 parts (region, zip code, and country)
            const modifiedAddress = addressParts.slice(0, -3).join(", ");
            console.log("Modified Address:", modifiedAddress);

            
            // New variable for city address
            let cityAddress = "";

            // Loop through addressParts to find specific city names
            for (const part of addressParts) {
              if (["Cebu", "Cebu City"].includes(part)) {
                cityAddress = "Cebu City";
                break; // Exit loop once the city is found
              } else if (["Mandaue", "Mandaue City"].includes(part)) {
                cityAddress = "Mandaue City";
                break; // Exit loop once the city is found
              } else if (["Lapu-Lapu", "Lapu-Lapu City"].includes(part)) {
                cityAddress = "Lapu-Lapu City";
                break; // Exit loop once the city is found
              }
            }

            // Use the cityAddress variable
            if (cityAddress) {
              console.log("City Address:", cityAddress);
              setcityAddress(cityAddress);
            } else {
              // Handle case where no specific city is found
              console.log("Address is out of Cebu City");
              setcityAddress(cityAddress);
              // setcityAddress("Address is out of scope");
            }

            setReverseGeocodedAddress(modifiedAddress);
            // console.log("OpenStreetMap Location:", osmData.display_name);
          } else {
            setReverseGeocodedAddress("Location not found");
            // console.log("Location not found with OpenStreetMap");
          }
        } catch (osmError) {
          console.error(
            "Error fetching location with OpenStreetMap:",
            osmError
          );
        }
        // setReverseGeocodedAddress("Location not found");
        // console.log("City not found");
      }
    } catch (error) {
      console.error("Error fetching reverse geolocation:", error);
    }
  };



  useEffect(() => {
    let isMounted = true; // To prevent setting state after component unmount
    
    const fetchCurrentLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return null;
        }
        const location = await Location.getCurrentPositionAsync({});
        return location.coords;
      } catch (error) {
        console.error('Error fetching current location:', error);
      }
    };
  
    const fetchGeocode = async (latitude, longitude) => {
      if (!latitude || !longitude) return;
      try {
        // Assuming fetchReverseGeolocation is a function that sets some state with geolocation data
        await fetchReverseGeolocation(latitude, longitude);
        if (isMounted) {
          setInitialMarkerPosition({ latitude, longitude });
          setInitialMapRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0522,
            longitudeDelta: 0.0321,
          });
          setMarkerPosition({ latitude, longitude });
        }
      } catch (error) {
        console.error('Error fetching geocode:', error);
      }
    };
  
    const initializeMap = async () => {
      const coordinates = selectedCoordinates || { latitude: chosenOptionLatitude, longitude: chosenOptionLongitude };
      const currentLocation = await fetchCurrentLocation();

      console.log("Coordinates:", coordinates);
  
      if (isMounted) {
        setCurrentPosition(currentLocation);
      }
      console.log("Current Position: ", currentPosition);
  
      if (coordinates.latitude && coordinates.longitude) {
        await fetchGeocode(coordinates.latitude, coordinates.longitude);
        console.log("Initial Marker Position: ", currentPosition);
        console.log("Initial Map Region: ", currentPosition);
        console.log("Marker Position: ", currentPosition);
        console.log("Current Position: ", currentPosition);

      } else if (currentLocation) {
        await fetchGeocode(currentLocation.latitude, currentLocation.longitude);
        console.log("2 Initial Marker Position: ", currentPosition);
        console.log("2 Initial Map Region: ", currentPosition);
        console.log("2 Marker Position: ", currentPosition);
        console.log("2 Current Position: ", currentPosition);
      }
      console.log("Last Initial Marker Position: ", currentPosition);
      console.log("Last Initial Map Region: ", currentPosition);
      console.log("Last Marker Position: ", currentPosition);
      console.log("Last Current Position: ", currentPosition);
    };
  
    initializeMap();
  
    return () => {
      isMounted = false; // Clean up to prevent setting state after unmount
    };
  }, [selectedCoordinates, chosenOptionLatitude, chosenOptionLongitude]);

  // const gotoUserLocation = async () => {
  //   try {
  //     enableLatestRenderer();
  //     const { status } = await Location.requestForegroundPermissionsAsync();

  //     if (status === "granted") {
  //       const location = await Location.getCurrentPositionAsync({});
  //       const { latitude, longitude } = location.coords;
        
  //       setMarkerPosition({ latitude, longitude });
  //       setCurrentPosition({ latitude, longitude });

  //       // Calculate new latitude and longitude values
  //       const newLatitude = latitude - 0.0002;
  //       const newLongitude = longitude + 0.0;
  //       // Create a new object for markerPosition
  //       const newMarkerPosition = {
  //         latitude: newLatitude,
  //         longitude: newLongitude,
  //       };
  //       setAdjustedPosition(newMarkerPosition);
  //       if (mapRef.current) {
  //         mapRef.current.animateToRegion({
  //           latitude:  latitude,
  //           longitude:  longitude,
  //           latitudeDelta: 0.0922,
  //           longitudeDelta: 0.0421,
  //         });
  //       }
  //       setInitialMarkerPosition({ latitude, longitude });


  //       fetchReverseGeolocation(latitude, longitude);
  //     } else {
  //       console.error("Location permission denied");
  //     }
  //   } catch (error) {
  //     console.error("Error getting user location:", error);
  //   }
  // };


  const gotoUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission denied');
        // Show an alert or some UI to inform the user
        Alert.alert(
          'Location Permission Required',
          'Please enable location services for this app in your device settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            // Optionally, open device settings
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ]
        );
        return;
      }
  
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      
      setMarkerPosition({ latitude, longitude });
      setCurrentPosition({ latitude, longitude });
      setAdjustedPosition({ latitude: latitude - 0.0002, longitude: longitude + 0.0 });
  
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0321,
        });
      }
      setInitialMarkerPosition({ latitude, longitude });
      fetchReverseGeolocation(latitude, longitude);
    } catch (error) {
      console.error("Error getting user location:", error.message);
      // Show an alert or some UI to inform the user about the error
      Alert.alert(
        'Location Error',
        'Failed to obtain your location. Make sure that location services are enabled.',
        [
          { text: 'OK', style: 'default' }
        ]
      );
    }
  };

  // If using async/await
// const gotoUserLocation = async () => {
//   try {
//     const { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== 'granted') {
//       // Handle the case where permission is not granted
//       console.error('Location permission denied');
//       // Inform the user what to do next
//       // ...
//     } else {
//       const location = await Location.getCurrentPositionAsync({});
//       // Process the location
//       // ...
//     }
//   } catch (error) {
//     // Handle the error
//     console.error('Error getting user location:', error);
//     // Inform the user what to do next
//     // ...
//   }
// };

// // If using promises without async/awaita
// Location.requestForegroundPermissionsAsync()
//   .then((permissionResponse) => {
//     if (permissionResponse.status !== 'granted') {
//       // Handle the case where permission is not granted
//       console.error('Location permission denied');
//       // Inform the user what to do next
//       // ...
//     } else {
//       return Location.getCurrentPositionAsync({});
//     }
//   })
//   .then((location) => {
//     // Process the location
//     // ...
//   })
//   .catch((error) => {
//     // Handle the error
//     console.error('Error getting user location:', error);
//     // Inform the user what to do next
//     // ...
//   });

  

  const goToMarker = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: markerPosition.latitude,
        longitude: markerPosition.longitude,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0321,
      });
    }
  };

  const gotoSearchingRadius = async (latitude, longitude) => {
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser.uid;

    // Reference to the "manageAddress" collection for the specified userUID
    const manageAddressCollectionRef = collection(
      db,
      "userProfiles",
      user,
      "manageAddress"
    );

    const savedOptionsDocRef = doc(
      manageAddressCollectionRef,
      "savedOptions"
    );

    console.log("Specific Location: " , specificLocation);
    console.log("Reverse Geocoded Address: " , reverseGeocodedAddress);
    console.log("Latitude: " , latitude);
    console.log("Longitude: " , longitude);


    if(reverseGeocodedAddress && latitude && longitude) {
      try {
        const docSnapshot = await getDoc(savedOptionsDocRef);
        if (docSnapshot.exists()) {
          const optionsData = docSnapshot.data();
          console.log("Saved Options Data: ", optionsData);
        
          // Check if "savedOptions" is an array
          if (Array.isArray(optionsData.savedOptions)) {
            let foundMatch = false; // Flag to indicate if we found a match
            
            // Loop through saved options to see if the selectedCoordinates match any existing coordinates
            for (let i = 0; i < optionsData.savedOptions.length; i++) {
              console.log("Address from savedOptions: " , optionsData.savedOptions[i].address);
              console.log("Reverse Geocoded Address: " , reverseGeocodedAddress);
              if (optionsData.savedOptions[i].address === reverseGeocodedAddress) {
                // Match found, fetch the value field
                foundMatch = true;
                fetchedData = optionsData.savedOptions[i]; // Set the fetched value to dataToAdd.value
                console.log("Fetched Data:", fetchedData);

                const cityAddress = optionsData.savedOptions[i]?.city || "";
                const specificLocation = optionsData.savedOptions[i]?.address || "";
                const streetValue = optionsData.savedOptions[i]?.street || "";
                const houseValue = optionsData.savedOptions[i]?.houseNumber || "";
                const floorValue = optionsData.savedOptions[i]?.floor || "";
                const noteValue = optionsData.savedOptions[i]?.note || "";
                const label  = optionsData.savedOptions[i]?.label || "";
                const otherLabel  = optionsData.savedOptions[i]?.otherLabel || "None";

                // Update the context with the new values
                setLocation({
                  cityAddress,
                  specificLocation,
                  streetValue,
                  houseValue,
                  floorValue,
                  noteValue,
                  label,
                  otherLabel,
                });
                console.log("Additional details are added to the selected location");
                console.log("Location is selected from the Saved Addresses list");
                break; // Exit the loop after finding the match
              }
            }
            console.log("No additional details about the selected location");
            console.log("Location is not selected from the Saved Addresses list");
            Toast.show({
              type: "success",
              position: "top",
              text1: "Success!",
              text2: "Selection Location is Confirmed❗",
              visibilityTime: 5000,
            });

            navigation.navigate("SearchingDistanceRadius", {
              latitude,
              longitude,
            });
          }else{
            console.log("No additional details about the selected location");
            console.log("Saved Options Document is not yet created");
            Toast.show({
              type: "success",
              position: "top",
              text1: "Success!",
              text2: "Selection Location is Confirmed❗",
              visibilityTime: 5000,
            });
  
            navigation.navigate("SearchingDistanceRadius", {
              latitude,
              longitude,
            });
          }
        }else{
          console.log("No additional details about the selected location");
          console.log("Saved Options Document is not yet created");
          Toast.show({
            type: "success",
            position: "top",
            text1: "Success!",
            text2: "Selection Location is Confirmed❗",
            visibilityTime: 5000,
          });

          navigation.navigate("SearchingDistanceRadius", {
            latitude,
            longitude,
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }else{

    }
  };

  const xButtonPress = () => {
    navigation.navigate("BottomTabsRoot", { screen: "Homepage" });
  };

  useEffect(() => {
    if (markerPosition) {
      fetchReverseGeolocation(
        markerPosition.latitude,
        markerPosition.longitude
      );
    }
    console.log("Is TextInput focused:", isInputFocused);
  }, [markerPosition, isInputFocused]);



  // Create a new object by spreading the existing reviewData and adding the 'location' property
  const updatedReviewData = {
    ...reviewData,
    location: reverseGeocodedAddress,
  };

  useEffect(() => {
    console.log("isMapPressable changed:", isMapPressable);
  }, [isMapPressable]);

  return (
    <View style={styles.container}>
      <View style={[styles.componentstopNavigation]}>
        <View style={[styles.view, styles.backParentFlexBox6]}>
          <View style={[styles.frameParent, styles.backParentFlexBox6]}>
            <View style={[styles.backBtnParent, styles.backParentFlexBox6]}>
              <Pressable
                style={[styles.backBtn, styles.backParentFlexBox6]}
                onPress={() => navigation.goBack()}
              >
                <Image
                  style={styles.icon24pxbackArrow}
                  contentFit="cover"
                  source={require("../assets/icon24pxback-arrow1.png")}
                />
              </Pressable>
              <View style={styles.searchLocationWrapper}>
                <GooglePlacesAutocomplete
                  ref={ref}
                  enablePoweredByContainer={false} // Disable "Powered by Google" logo
                  placeholder="Enter your address"
                  onPress={(data, details = null) => {
                    handlePlaceSelect(data, details);
                  }}
                  onFail={error => console.error(error)}
                  query={{
                    key: "AIzaSyBeZMkWh5O-VLFnVvRJw13qwXK6xDyiYrQ",
                    language: "en",
                    components: "country:PH",
                  }}
                  fetchDetails={true}
                  renderRightButton={() =>
                    showCloseBtn && (
                      <TouchableOpacity
                        onPress={() => [
                          ref.current?.setAddressText(""),
                          setShowCloseBtn(false),
                        ]}
                        style={styles.backBtnWrapper}
                      >
                        <View style={styles.backBtnShadowBox}>
                          <Image
                            style={{ width: 10, height: 10 }}
                            resizeMode={"contain"}
                            source={require("../assets/closeBtn.png")}
                          />
                        </View>
                      </TouchableOpacity>
                    )
                  }
                  styles={{
                    container: {
                      marginVertical: 5,
                      marginLeft: -10,
                    },
                    listView: {
                      position: "absolute",
                      top: 50,
                      left: -40,
                      width: "130%",
                    },
                    separator: {
                      backgroundColor: "#ddd",
                      height: 1,
                    },
                    textInput: {
                      height: 38,
                      color: "black",
                      fontSize: 16,
                    },
                    row: {
                      backgroundColor: "white",
                      flexDirection: "row",
                      alignItems: "center",
                    },
                    description: {
                      color: "black", // Change the text color of suggested places
                    },
                    poweredContainer: {
                      display: "none", // Hide the "Powered by Google" container
                    },
                  }}
                  textInputProps={{
                    // onFocus: handleInputFocus,
                    // onBlur: handleInputBlur,
                    onChangeText: handleAddressInputChange,
                    // clearButtonMode: "never",
                  }}
                />
              </View>
            </View>
            <Pressable style={[styles.searchBtn, styles.backParentFlexBox6]}>
              <View style={styles.searchBtnChild} />
              <Image
                style={styles.icon16pxsearch}
                contentFit="cover"
                source={require("../assets/icon16pxsearch.png")}
              />
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          region={initialMapRegion}
          onPress={handleMapPress}
          // provider={PROVIDER_GOOGLE}
        >
          {/* <Marker
            coordinate={currentPosition}
            centerOffset={currentPosition}
            title="You are here"
            image={require("../assets/currentMarker.png")}
          /> */}

          <Circle
            center={currentPosition}
            radius={5}
            strokeWidth={2}
            strokeColor="#FFF"
            fillColor="rgba(0, 126, 167, 0.8)"
          />
          <Circle
            center={currentPosition}
            radius={50}
            strokeWidth={2}
            strokeColor="rgba(174, 221, 255, 1)"
            fillColor="rgba(174, 221, 255, 0.4)"
          />
          <Marker
            coordinate={markerPosition}
            title="Pinned Location"
            draggable={true}
            image={require("../assets/icons8location100-2-1.png")}
          />
        </MapView>
      </View>
      {showLocationDetails ? (
        <View>
          <Pressable style={styles.locationButton} onPress={gotoUserLocation}>
            <View style={styles.locationTargetWrapper}>
              <Image
                style={styles.icon24pxbackArrowLayout}
                contentFit="cover"
                source={require("../assets/location-target.png")}
              />
            </View>
          </Pressable>
          <TouchableOpacity
            style={styles.goToMarkerButton}
            onPress={goToMarker}
          >
            <Text>Go to Marker</Text>
          </TouchableOpacity>
          <View style={styles.confirmLocation}>
            <View style={styles.frameContainer}>
              <View style={styles.vectorWrapper}>
                <Image
                  style={styles.frameChild}
                  contentFit="cover"
                  source={require("../assets/line-76.png")}
                />
              </View>
              <View
                style={[
                  styles.componentsSearchDefault,
                  styles.componentsFlexBox,
                ]}
              >
                <View style={styles.iconOutlineFlexBox}>
                  <Image
                    style={styles.locationIcon}
                    contentFit="cover"
                    source={require("../assets/icons8location100-2-1.png")}
                  />
                </View>
                <View style={styles.uscTalambanParent}>
                  <Text style={styles.uscTalamban}>
                    {/* USC Talamban */}
                    {cityAddress}
                  </Text>
                  <Text
                    style={[
                      styles.barangayNasipitTalamban,
                      styles.addAddressDetailsClr,
                    ]}
                  >
                    {/* Barangay Nasipit, Talamban, Cebu City, Cebu, Central
                    Visayas, Philippines */}
                    {reverseGeocodedAddress}
                  </Text>
                </View>
                <View style={[styles.savedPlaces, styles.iconOutlineFlexBox]}>
                  <TouchableOpacity
                    style={[
                      styles.whiteBookmarkParent,
                      styles.componentsbuttonFlexBox,
                    ]}
                    onPress={() => navigation.navigate("Addresses")}
                  >
                    <Image
                      style={[
                        styles.whiteBookmarkIcon,
                        styles.bookmarkIconPosition,
                      ]}
                      contentFit="cover"
                      source={require("../assets/white-bookmark.png")}
                    />
                    <Image
                      style={[
                        styles.grayBookmarkIcon,
                        styles.bookmarkIconPosition,
                      ]}
                      contentFit="cover"
                      source={require("../assets/gray-bookmark.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={[
                  styles.componentsSearchDefault1,
                  styles.componentsFlexBox,
                ]}
              >
                <Pressable
                  style={[styles.addressDetailsBtn, styles.addressDetailsBtnBg]}
                >
                  <View style={styles.addressDetailsFrame}>
                    <Text
                      style={[
                        styles.addAddressDetails,
                        styles.addAddressDetailsClr,
                      ]}
                    >
                      Add Address Details (e.g. Floor, unit number)
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() => {
                      navigation.navigate("MapsEditLocationDetailsNo", {
                        selectedCoordinates: markerPosition,
                        selectedCityAddress: cityAddress,
                        selectedSpecificLocation: reverseGeocodedAddress,
                      });

                      console.log("Specific Location:", reverseGeocodedAddress);
                      console.log("City Address:", cityAddress);
                      console.log("Coordinates:", markerPosition);
                    }}
                  >
                    <Text style={[styles.edit, styles.editTypo]}>Edit</Text>
                  </TouchableOpacity>
                </Pressable>
              </View>
              <View
                style={[
                  styles.componentsbuttonWrapper,
                  styles.componentsFlexBox,
                ]}
              >
                <Pressable
                  style={[
                    styles.componentsbutton,
                    styles.componentsbuttonFlexBox,
                  ]}
                  onPress={() => {
                    setReviewData(updatedReviewData);
                    gotoSearchingRadius(latitudeToPass, longitudeToPass);
                  }}
                >
                  <Text style={styles.viewAllServices}>Confirm Location</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.hideLocationDetails}>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Close Button Styles for Search Address
  backBtnShadowBox: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    height: 20,
    width: 20,
    // shadowOpacity: 1,
    // elevation: 4,
    // shadowRadius: 4,
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.colorLightGray,
    flex: 1,
    alignSelf: "center",
  },
  backBtnWrapper: {
    // left: 16,
    // paddingVertical: Padding.p_mini,
    zIndex: 0,
    flexDirection: "row",
    marginBottom: 5,
    // top: 0,
    // position: "absolute",
  },
  // Bottom Navigation Styles
  currentLocationBtn: {
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
  },
  currentLocationBtnWrapper: {
    paddingVertical: Padding.p_xl,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    zIndex: 1,
    paddingHorizontal: Padding.p_base,
    alignSelf: "stretch",
    backgroundColor: "rgba(255, 0, 0, 0.1)", // Red color with 50% opacity
  },
  locationTargetWrapper: {
    // shadowColor: "rgba(0, 0, 0, 0.25)",
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    width: 40,
    height: 40,
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_9xs,
    borderRadius: Border.br_xl,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.white,
  },
  icon24pxbackArrowLayout: {
    height: 24,
    width: 24,
  },
  confirmLocation: {
    justifyContent: "flex-end",
    zIndex: 1,
    alignSelf: "stretch",
    alignItems: "center",
  },
  frameContainer: {
    borderTopLeftRadius: Border.br_5xl,
    borderTopRightRadius: Border.br_5xl,
    paddingBottom: Padding.p_mini,
    justifyContent: "flex-end",
    paddingHorizontal: Padding.p_base,
    alignSelf: "stretch",
    alignItems: "center",
    backgroundColor: Color.white,
  },
  vectorWrapper: {
    paddingBottom: Padding.p_8xs,
    paddingTop: Padding.p_3xs,
    justifyContent: "center",
    alignSelf: "stretch",
    alignItems: "center",
  },
  frameChild: {
    width: 41,
    height: 3,
  },
  componentsSearchDefault: {
    paddingLeft: Padding.p_8xs,
    paddingTop: Padding.p_xs,
    paddingRight: Padding.p_3xs,
    paddingBottom: Padding.p_xs,
    backgroundColor: Color.colorWhitesmoke_300,
    flexDirection: "row",
    borderRadius: Border.br_5xs,
  },
  componentsFlexBox: {
    marginTop: 15,
    justifyContent: "center",
    alignSelf: "stretch",
    alignItems: "center",
  },
  locationIcon: {
    width: 30,
    height: 30,
  },
  uscTalamban: {
    fontFamily: FontFamily.montserratBold,
    color: Color.heading,
    textAlign: "left",
    fontWeight: "700",
    lineHeight: 32,
    fontSize: FontSize.body1Semibold_size,
    alignSelf: "stretch",
  },
  uscTalambanParent: {
    marginLeft: 8,
    overflow: "hidden",
    flex: 1,
  },
  barangayNasipitTalamban: {
    fontSize: FontSize.typographyTaglineSmallRegular_size,
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "500",
    lineHeight: 20,
    alignSelf: "stretch",
  },
  addAddressDetailsClr: {
    color: Color.colorDarkgray_300,
    textAlign: "left",
  },
  savedPlaces: {
    borderRadius: Border.br_xl,
    marginLeft: 8,
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
  componentsSearchDefault1: {
    borderRadius: Border.br_5xs,
    overflow: "hidden",
    flexDirection: "row",
  },
  addAddressDetails: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: FontSize.level2Medium12_size,
    lineHeight: 32,
    color: Color.colorDarkgray_300,
    flex: 1,
  },
  addressDetailsBtnBg: {
    backgroundColor: Color.colorWhitesmoke_300,
    flexDirection: "row",
  },
  addressDetailsBtn: {
    paddingLeft: Padding.p_3xs,
    paddingTop: Padding.p_8xs,
    paddingRight: Padding.p_8xs,
    paddingBottom: Padding.p_8xs,
    borderRadius: Border.br_3xs,
    flex: 1,
  },
  addressDetailsFrame: {
    flexDirection: "row",
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
  edit: {
    color: Color.colorDeepskyblue_100,
    display: "flex",
    width: 34,
    textAlign: "center",
    fontSize: FontSize.level2Medium12_size,
    justifyContent: "center",
    alignItems: "center",
  },
  editBtn: {
    marginLeft: 5,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  editTypo: {
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "500",
    lineHeight: 20,
    alignSelf: "stretch",
  },
  componentsbuttonWrapper: {
    paddingTop: Padding.p_3xs,
  },
  componentsbutton: {
    borderRadius: Border.br_mini,
    paddingHorizontal: Padding.p_3xl,
    paddingVertical: Padding.p_xs,
    alignSelf: "stretch",
  },
  viewAllServices: {
    letterSpacing: -0.1,
    lineHeight: 24,
    fontFamily: FontFamily.title2Bold32,
    color: Color.neutral01,
    textAlign: "center",
    fontWeight: "700",
    fontSize: FontSize.body1Semibold_size,
  },
  icons8Location10021Wrapper: {
    top: 234,
    left: 53,
    padding: Padding.p_3xs,
    zIndex: 2,
    justifyContent: "flex-end",
    position: "absolute",
    overflow: "hidden",
    alignItems: "center",
  },
  icons8Location10021Wrapper1: {
    top: 365,
    left: 300,
    padding: Padding.p_3xs,
    zIndex: 2,
    justifyContent: "flex-end",
    position: "absolute",
    overflow: "hidden",
    alignItems: "center",
  },
  icons8Location10021: {
    width: 50,
    height: 50,
  },

  // Top Navigation styles
  componentstopNavigation: {
    backgroundColor: Color.colorDarkslateblue_200,
    position: "relative",
    zIndex: 2,
  },
  backParentFlexBox6: {
    alignItems: "center",
    flexDirection: "row",
  },
  icon24pxbackArrow: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
  backBtn: {
    width: 48,
    padding: Padding.p_xs,
    justifyContent: "center",
  },
  searchLocation: {
    fontFamily: FontFamily.title4Regular18,
    fontSize: FontSize.m3LabelLarge_size,
    alignSelf: "stretch",
  },
  searchLocationWrapper: {
    marginLeft: 7,
    justifyContent: "center",
    flex: 1,
  },
  backBtnParent: {
    flex: 1,
  },
  searchBtnChild: {
    borderRadius: 8,
    backgroundColor: "#007ea7",
    width: 32,
    height: 32,
    zIndex: 0,
  },
  icon16pxsearch: {
    position: "absolute",
    marginTop: -15,
    top: "50%",
    right: 8,
    width: 16,
    height: 16,
    zIndex: 1,
  },
  searchBtn: {
    marginLeft: 8,
  },
  frameParent: {
    borderRadius: 10,
    backgroundColor: "#fbfbfb",
    borderStyle: "solid",
    borderColor: "#f2f2f2",
    borderWidth: 0.9,
    paddingRight: 8,
    flex: 1,
  },
  view: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  container: {
    flex: 1,
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    zIndex: 1,
  },
  map: {
    flex: 1,
  },
  infoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 16,
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: hp(20),
    width: wp(100),
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
  infoIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
    marginBottom: 60,
  },
  infoTextContainer: {
    flex: 1,
    paddingBottom: 60,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infoSubtitle: {
    fontSize: 14,
    color: "gray",
  },
  editIconContainer: {
    marginLeft: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 60,
  },
  editIcon: {
    width: 16,
    height: 16,
  },
  locationButton: {
    position: "absolute",
    bottom: 335,
    right: 5,
    padding: 3,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  hideLocationDetails: {
    display: "none",
  },
  goToMarkerButton: {
    position: "absolute",
    bottom: 305,
    right: 10,
    padding: 3,
    backgroundColor: "#fff",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  saveButton: {
    position: "absolute",
    top: 100,
    left: 20,
    alignSelf: "center",
    backgroundColor: "#003459",
    paddingHorizontal: 125,
    paddingVertical: 15,
    borderRadius: 15,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  editLocationContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "column",
    alignItems: "stretch",
    height: 400,
    zIndex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  centeredImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredImageTextContainer: {
    alignItems: "center",
  },
  centeredImage: {
    marginBottom: 10,
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  exploreText: {
    fontSize: 14,
    marginTop: 10,
  },
  row: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  iconImage: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  rowText: {
    fontSize: 16,
  },
  xButton: {
    position: "absolute",
    top: 190,
    left: 10,
    width: 50,
    height: 50,
  },
});

export default MapsConfirmLocation;