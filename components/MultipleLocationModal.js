import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  ActivityIndicator, 
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Padding, Border, Color, FontFamily, FontSize } from "../GlobalStyles";
import * as Location from "expo-location";
import { useState, useCallback, useEffect, useContext, useRef} from "react";
import { useAddAddressContext } from "../AddAddressContext";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection, // Import getDoc for checking if a user with the same phone number exists
} from "firebase/firestore";
import axios from "axios";
import { getAuth} from "firebase/auth";
import Toast from "react-native-toast-message";
import { AddressSelectedContext } from "../AddressSelectedContext";
import MapView, {Marker} from "react-native-maps";

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
  const {currentAddress, setCurrentAddress, setChosenOptionAddress, setChosenOptionLatitude, setChosenOptionLongitude } = useContext(AddressSelectedContext);
  let currentLocation;

  const { addAddressData, setAddAddressData } = useAddAddressContext();
  const [loading, setLoading] = useState(false);

  const {selectedIDValue} = addAddressData || {};
  const [isMapReady, setIsMapReady] = useState(false);

  const mapRef = useRef(null);

  const onMapLayout = () => {
    setIsMapReady(true);
  };

  // Set the initial selected option to the default option (0)
  const [selectedOption, setSelectedOption] = useState(selectedValue);

  const [savedOptionsData, setSavedOptionsData] = useState([]);
  // Initialize the secondDocumentData using useState
  const [secondDocumentData, setSecondDocumentData] = useState({
    savedOptions: [],
  });

  const [currentLocationData, setCurrentLocationData] = useState({
    currentLocation: [],
  });


  const [userCoordinatesLat, setUserCoordinatesLat] = useState();
  const [userCoordinatesLng, setUserCoordinatesLng] = useState();

  const useCurrentLocationButton = async () => {
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser.uid;

    const manageAddressCollectionRef = collection(
      db,
      "userProfiles",
      user,
      "manageAddress"
    );

    const savedOptionsDocRef = doc(manageAddressCollectionRef, "savedOptions");

    console.log("Current Location To be Set:", currentLocationArr);

    const docSnapshot = await getDoc(savedOptionsDocRef);

    if (docSnapshot.exists()) {
      const optionsData = docSnapshot.data();
      console.log("Saved Options Data: ", optionsData);

      if (Array.isArray(optionsData.savedOptions) && optionsData.savedOptions.length > 0) {
        // Update the first element of savedOptions with currentLocationArr.currentLocation[0]
        optionsData.savedOptions[0] = currentLocationArr.currentLocation[0];

        // Update Firestore document with the modified savedOptions array
        await setDoc(savedOptionsDocRef, { savedOptions: optionsData.savedOptions });

        setSecondDocumentData((prevData) => ({
          ...prevData,
          savedOptions: [...optionsData.savedOptions],
        }));

        console.log("Saved Options Array: ", secondDocumentData);
        console.log("Specifc Saved Options Document Data: ", secondDocumentData.savedOptions);

        setUserCoordinatesLat(currentLocationArr.currentLocation[0].coordinates.latitude);
        setUserCoordinatesLng(currentLocationArr.currentLocation[0].coordinates.longitude);

        onCurrentLocation(optionsData.savedOptions[0].address, 0);
      } else {
        console.log("No savedOptions found in the document.");
      }
    } else {
      console.log("No such document!");
      setSecondDocumentData({ savedOptions: currentLocationArr.currentLocation });

      // Set the new document with default data
      await setDoc(savedOptionsDocRef, { savedOptions: secondDocumentData.savedOptions });

      // Update the state with the default data


      console.log("New document 'savedOptions' created with default data.");

      // Set user coordinates to default
      setUserCoordinatesLat(currentLocationArr.currentLocation[0].coordinates.latitude);
      setUserCoordinatesLng(currentLocationArr.currentLocation[0].coordinates.longitude);

      onCurrentLocation(currentLocationArr.currentLocation[0].address, 0);

    }
    onClose();
  };

  const handleRadioChange = (value) => {
    setSelectedOption(value);

    // Find the selected option
    const chosenOption = secondDocumentData.savedOptions.find(
      (option) => option.value === value
    );

    if (chosenOption) {
      setCurrentAddress(chosenOption.address);
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
    console.log("Saved Options Data: ", savedOptionsData);
    console.log("Temporary Data: ", secondDocumentData);
  }, [savedOptionsData, secondDocumentData]);

  const handleAddNewAddress = async () => {
    try {
      console.log("Total Value: ", secondDocumentData.savedOptions.length);
      const selectedValue = secondDocumentData.savedOptions.find(
        (option) => option.value === selectedOption
      );
  
      if (selectedValue) {
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
  };

  const getCurrentLocationAndSetDocumentData = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const addressResponse = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      console.log("Address Response:", addressResponse);
      const apiKey = "AIzaSyAuaR8dxr95SLUTU-cidS7I-3uB6mEoJmA"; // Replace with your Google Maps API key
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&result_type=street_address&key=${apiKey}`
      );
  
      if (addressResponse.length > 0) {
        const addressInfo = addressResponse[0];
        console.log("Address: ", addressInfo);
  
        let cityOnly;
        if (addressInfo.streetNumber !== null && addressInfo.street !== null && addressInfo.city !== null) {
          cityOnly = `${addressResponse[0].streetNumber}, ${addressResponse[0].street}, ${addressResponse[0].city}`;
          currentLocation = cityOnly;
        } else {
          console.log("Google Maps or OSM will be used");
          if (response.data.results && response.data.results.length > 0) {
            const firstResult = response.data.results[0];
                    console.log("First Result: ", firstResult);
 
            const addressComponents1 = firstResult.address_components.filter(
              (component) => {
                // Check if any of the component's types match the excluded list
                return !component.types.some(type => 
                  ["administrative_area_level_1", "administrative_area_level_2", "postal_code", "country"].includes(type)
                );
              }
            );
            console.log("Components Address: ", addressComponents1);
    
            const formattedAddress1 = addressComponents1
              .map((component) => component.long_name)
              .join(", ");
    
            // setAddress(formattedAddress1);
            currentLocation = formattedAddress1;
            // Console.log the city
            console.log("City Address:", formattedAddress1);
          } else {
            // If Google Geocoding API doesn't return results, try OpenStreetMap Nominatim API
            try {
              const osmResponse = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
              );
              const osmData = await osmResponse.json();
              console.log("OSM Data:", osmData);
              if (osmData.display_name) {
                const addressParts = osmData.display_name.split(", ");
                console.log("Address Parts:", addressParts);
                // console.log("City Part:", addressParts);
                // Remove the last 3 parts (region, zip code, and country)
                const modifiedAddress = addressParts.slice(0, -4).join(", ");
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

                console.log(cityAddress);    
                // Use the cityAddress variable
                if (cityAddress) {
                  const fullAddress = modifiedAddress + ", " + cityAddress;
                  console.log("City Address:", fullAddress);
                  // setAddress(fullAddress);
                  currentLocation = fullAddress;
                } else {
                  cityAddress = osmData.address.city;
                  const fullAddress = modifiedAddress + ", " + cityAddress;
                  // Handle case where no specific city is found
                  console.log("Address is out of Cebu City");
                  // setAddress(fullAddress);
                  currentLocation = fullAddress;
                  // setcityAddress("Address is out of scope");
                }
              } else {
                console.log("Error fetching location with OpenStreetMap");
              }
            } catch (osmError) {
              console.error(
                "Error fetching location with OpenStreetMap:",
                osmError
              );
            }
          }
        }
  
        console.log("City Only: ", cityOnly);
        console.log("Current Location: ", currentLocation);
  
        const currentLocData = [
          {
            address: currentLocation,
            label: "Current Location",
            coordinates: location.coords,
            value: 1,
          },
        ];
  
        setCurrentLocationData({ currentLocation: currentLocData });
        // setSecondDocumentData({ savedOptions: currentLocData });
  
        currentLocationArr.currentLocation = currentLocData;
  
        console.log("Current Location:", currentLocationArr);
        console.log("Current Location Data:", currentLocationData);
        console.log("SecondDocumentData:", secondDocumentData);
      }
    } catch (error) {
      console.error("Error getting address:", error);
    }
  };
  
  const fetchAndSetDocumentData = async () => {
    try {
      setLoading(true);
      const db = getFirestore();
      const auth = getAuth();
      const user = auth.currentUser.uid;
  
      console.log(user);
      console.log("Selected Id: ", selectedIDValue);

      const manageAddressCollectionRef = collection(
        db,
        "userProfiles",
        user,
        "manageAddress"
      );
  
      const currentLocationDocRef = doc(manageAddressCollectionRef, "currentLocation");
      const savedOptionsDocRef = doc(manageAddressCollectionRef, "savedOptions");

      console.log("Current Location To be Set:", currentLocationArr);
  
      await setDoc(currentLocationDocRef, currentLocationArr);
      console.log("Document 'currentLocation' created.");
  
      const docSnapshot = await getDoc(savedOptionsDocRef);
  
      if (docSnapshot.exists()) {
        const optionsData = docSnapshot.data();
        console.log("Saved Options Data: ", optionsData);
  
        if (Array.isArray(optionsData.savedOptions) && optionsData.savedOptions.length > 0) {
          setSecondDocumentData((prevData) => ({
            ...prevData,
            savedOptions: [...optionsData.savedOptions],
          }));
  
          console.log("Saved Options Array: ", secondDocumentData);
          console.log("Specifc Saved Options Document Data: ", secondDocumentData.savedOptions);
  
          const savedOptionsArray = [...optionsData.savedOptions];
  
          const itemWithDesiredValue = savedOptionsArray.find(
            (item) => item.value === selectedValue
          );
  
          if (itemWithDesiredValue) {
            const coordinates = itemWithDesiredValue.coordinates;
            console.log(`Coordinates for value ${selectedValue}:`, coordinates);
  
            setUserCoordinatesLat(coordinates.latitude);
            setUserCoordinatesLng(coordinates.longitude);
          } else {
            console.log("Item with desired value not found in the savedOptions array.");
          }
        } else {
          console.log("No savedOptions found in the document.");
        }
      } else {
        await setDoc(savedOptionsDocRef, {});
        console.log("Saved Options Document is created!");
      }
      setLoading(false);
    } catch (error) {
      console.error("Fetching data error:", error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
  
      getCurrentLocationAndSetDocumentData();
    })();
  
    fetchAndSetDocumentData();
  }, []);
  
  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       console.error("Permission to access location was denied");
  //       return;
  //     }

  //     const location = await Location.getCurrentPositionAsync({});

  //     const addressResponse = await Location.reverseGeocodeAsync({
  //       latitude: location.coords.latitude,
  //       longitude: location.coords.longitude,
  //     });
  //     console.log("Address Response:", addressResponse);

  //     // Destructuring latitude and longitude from location.coords
  //     const { latitude, longitude } = location.coords;
  //     let cityOnly;

  //     // Now you can use latitude and longitude as separate variables
  //     console.log("Latitude:", latitude);
  //     console.log("Longitude:", longitude);

  //     if (addressResponse.length > 0) {
  //       const addressInfo = addressResponse[0];

  //       if (addressInfo.streetNumber !== null) {
  //         cityOnly = `${addressResponse[0].streetNumber}, ${addressResponse[0].street}, ${addressResponse[0].city}`;
  //         // setSelectedOption(0);
  //         console.log("City Only: ", cityOnly);
  //         setAddress(cityOnly);

  //         console.log("OG Document Data:", secondDocumentData); // Log the updated data

  //         const currentLocData = [
  //           {
  //             address: cityOnly,
  //             label: "Home",
  //             coordinates: location.coords,
  //             value: 1,
  //           },
  //         ];

  //         // Update secondDocumentData
  //         setCurrentLocationData({currentLocation: currentLocData,});
  //         setSecondDocumentData({savedOptions: currentLocData,});
  //         currentLocationArr.currentLocation = currentLocData;

  //         console.log("Current Location:", currentLocationArr); // Log the updated data
  //         console.log("Current Location Data:", currentLocationData); // Log the updated data
  //         console.log("SecondDocumentData:", secondDocumentData); // Log the updated data
  //       } else {
  //         const cityOnly = `${addressResponse[0].street}, ${addressResponse[0].city}`;

  //         console.log("City Only: ", cityOnly);
  //         setAddress(cityOnly);

  //         console.log("OG Document Data:", secondDocumentData); // Log the updated data

  //         const currentLocData = [
  //           {
  //             address: cityOnly,
  //             label: "Home",
  //             coordinates: location.coords,
  //             value: 1,
  //           },
  //         ];

  //         // Update secondDocumentData
  //         setCurrentLocationData({
  //           currentLocation: currentLocData,
  //         });
  //         setSecondDocumentData({
  //           savedOptions: currentLocData,
  //         });
  //         currentLocationArr.currentLocation = currentLocData;

  //         console.log("Current Location:", currentLocationArr); // Log the updated data
  //         console.log("Current Location Data:", currentLocationData); // Log the updated data
  //         console.log("SecondDocumentData:", secondDocumentData); // Log the updated data
  //       }
  //     }
  //   })();
  
  //   (async () => {
  //     try {
  //       setLoading(true);
  //       const db = getFirestore(); // Use getFirestore() to initialize Firestore
  
  //       // Get the user's UID
  //       const auth = getAuth();
  //       const user = auth.currentUser.uid;
  //       console.log(user);
  //       console.log("Selected Id: ", selectedIDValue);
  //       // Reference to the "manageAddress" collection for the specified userUID
  //       const manageAddressCollectionRef = collection(
  //         db,
  //         "userProfiles",
  //         user,
  //         "manageAddress"
  //       );
  
  //       // Reference to the "userProfiles" collection and "manageAddress" subcollection
  //       const collectionName = "userProfiles";
  //       const subCollectionName = "manageAddress";
  
  //       const currentLocationDocRef = doc(
  //         manageAddressCollectionRef,
  //         "currentLocation"
  //       );
  
  //       // Add the second document named "savedOptions"
  //       const savedOptionsDocRef = doc(
  //         manageAddressCollectionRef,
  //         "savedOptions"
  //       );
  //       console.log("Current Location To be Set:", currentLocationArr); // Log the updated data
  //       await setDoc(currentLocationDocRef, currentLocationArr);
  //       console.log("Document 'currentLocation' created.");
  
  //       getDoc(savedOptionsDocRef)
  //         .then(async (docSnapshot) => {
  //           if (docSnapshot.exists()) {
  //             const optionsData = docSnapshot.data();
  //             console.log("Saved Options Data: ", optionsData); // Log the entire fetched data
  
  //             // Check if "savedOptions" is an array and has at least one item
  //             if (
  //               Array.isArray(optionsData.savedOptions) &&
  //               optionsData.savedOptions.length > 0
  //             ) {
  //               setSecondDocumentData((prevData) => ({
  //                 ...prevData,
  //                 savedOptions: [...optionsData.savedOptions],
  //               }));
  //               console.log("Saved Options Array: ", secondDocumentData);
  //               console.log(
  //                 "Specifc Saved Options Document Data: ",
  //                 secondDocumentData.savedOptions
  //               );

  //               const savedOptionsArray = [...optionsData.savedOptions];

  //               // Find the item with "value" equal to 6
  //               const itemWithDesiredValue = savedOptionsArray.find(
  //                 (item) => item.value === selectedValue
  //               );

  //               // Check if the item was found
  //               if (itemWithDesiredValue) {
  //                 // Access and log the coordinates
  //                 const coordinates = itemWithDesiredValue.coordinates;
  //                 console.log(
  //                   `Coordinates for value ${selectedValue}:`,
  //                   coordinates
  //                 );

  //                 setUserCoordinatesLat(coordinates.latitude);
  //                 setUserCoordinatesLng(coordinates.longitude);
  //               } else {
  //                 console.log(
  //                   "Item with value 6 not found in the savedOptions array."
  //                 );
  //               }
  //             } else {
  //               console.log("No savedOptions found in the document.");
  //             }
  //           } else {
  //             console.log("No such document!");
  //           }
  //         })
  //         .catch((error) => {
  //           console.error("Error getting document:", error);
  //         });
  //         setLoading(false);
  //     } catch (error) {
  //       console.error("Fetching data error:", error);
  //     }
  //   })();


  // }, []);


  useEffect(() => {
    if (isMapReady) {
      // Perform map operations here
    }
  }, [isMapReady]);

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
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
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
                  <View
                    style={[
                      styles.chooseLocationBtn,
                      styles.frameParentFlexBox,
                    ]}
                  >
                      <MapView
                          ref={mapRef}
                          style={styles.map} // Set the MapView dimensions to take the entire space
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
  map: {
    width: '100%', // Take the full width of the container
    height: 120, // Set a fixed height or adjust as necessary
    borderRadius: 10, // Rounded corners
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
