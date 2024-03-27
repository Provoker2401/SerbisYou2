import React, { useState, useCallback, useEffect, useContext } from "react";
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import MultipleLocationModal from "./MultipleLocationModal";
import { Color, Padding, FontSize, FontFamily, Border } from "../GlobalStyles";
// import Modal from "react-native-modal";
import axios from "axios";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { AddressSelectedContext } from "../AddressSelectedContext";

const Header42 = ({ style}) => {
  const [address, setAddress] = useState(null);
  const [selectedOption, setSelectedOption] = useState(0);
  const [locationBtnVisible, setLocationBtnVisible] = useState(false);
  const { currentAddress, setCurrentAddress, currentOption, setCurrentOption } = useContext(AddressSelectedContext);

  const openLocationBtn = () => {
    setLocationBtnVisible(true);
  };

  const closeLocationBtn = () => {
    setLocationBtnVisible(false);
  };

  const handleLocationChange = (newLocation, value) => {
    setCurrentAddress(newLocation);
    // setAddress(newLocation);
    console.log("Address: ", newLocation);
    setCurrentOption(value);
    console.log("Value: ", selectedOption);
    setLocationBtnVisible(false);
  };

  // const handleSelectedLocation = (value) => {
  //   setSelectedOption(value);
  // }
  useEffect(() => {
    // This function will be executed whenever currentAddress changes
    setAddress(currentAddress);
  }, [currentAddress]); // Dependency array with currentAddress

  useEffect(() => {
    if(!currentAddress) {
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
  
        const apiKey = "AIzaSyAuaR8dxr95SLUTU-cidS7I-3uB6mEoJmA"; // Replace with your Google Maps API key
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&result_type=street_address&key=${apiKey}`
        );
  
        if (addressResponse.length > 0) {
          const addressInfo = addressResponse[0];
          console.log("Address: ", addressInfo);
  
          if (addressInfo.streetNumber !== null && addressInfo.street !== null && addressInfo.city !== null) {
            const cityOnly = `${addressResponse[0].streetNumber}, ${addressResponse[0].street}, ${addressResponse[0].city}`;
            console.log(cityOnly);
            // setAddress(cityOnly);
            setCurrentAddress(cityOnly);
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
              setCurrentAddress(formattedAddress1);
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
                    setCurrentAddress(fullAddress);
                  } else {
                    cityAddress = osmData.address.city;
                    const fullAddress = modifiedAddress + ", " + cityAddress;
                    // Handle case where no specific city is found
                    console.log("Address is out of Cebu City");
                    // setAddress(fullAddress);
                    setCurrentAddress(fullAddress);
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
        }
      })();
    }
  }, []);

  return (
    <>
      <SafeAreaView style={[styles.header, style]}>
        <View style={styles.view}>
          <View style={styles.serbisyouwhite2Wrapper}>
            <Image
              style={styles.serbisyouwhite2Icon}
              contentFit="cover"
              source={require("../assets/serbisyouwhite-2.png")}
            />
          </View>
          <View>
            <Text style={styles.serbisyou}>SerbisYou</Text>
          </View>
          <View style={[styles.frame, styles.locationWrapperFlexBox4]}>
            <Pressable style={styles.locationBtn} onPress={openLocationBtn}>
              <View
                style={[
                  styles.currentLocationWrapper,
                  styles.locationWrapperFlexBox4,
                ]}
              >
                <Text
                  style={[
                    styles.currentLocation,
                    styles.currentLocationFlexBox2,
                  ]}
                >
                  Current Location
                </Text>
              </View>
              <View
                style={[styles.locationBtn1, styles.locationWrapperFlexBox4]}
              >
                <View
                  style={[
                    styles.talambanCebuCityWrapper,
                    styles.locationWrapperFlexBox4,
                  ]}
                > 
                {address && (
                  <Text
                    style={[
                      styles.talambanCebuCity,
                      styles.currentLocationFlexBox2,
                    ]}
                  >
                    {/* {location} */}
                    {/* {options[selectedOption].label} */}
                    {address}
                  </Text>
                )}
                </View>
                <View
                  style={[
                    styles.locationBtnInner,
                    styles.locationWrapperFlexBox4,
                  ]}
                >
                  <Image
                    style={styles.frameChild}
                    contentFit="cover"
                    source={require("../assets/vector-4.png")}
                  />
                </View>
              </View>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>

      <Modal
        animationType="fade"
        transparent
        visible={locationBtnVisible}
        style={styles.modalContainer}
      >
        <View style={styles.locationBtnOverlay}>
          <Pressable style={styles.locationBtnBg} onPress={closeLocationBtn} />
          <MultipleLocationModal
            onClose={closeLocationBtn}
            onCurrentLocation={handleLocationChange}
            selectedValue={currentOption}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.colorDarkslateblue_100,
  },
  locationWrapperFlexBox4: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  currentLocationFlexBox2: {
    textAlign: "right",
    flex: 1,
    color: Color.white,
  },
  serbisyouwhite2Icon: {
    width: 63,
    height: 49,
  },
  serbisyouwhite2Wrapper: {
    paddingLeft: Padding.p_xs,
    paddingTop: Padding.p_7xs,
    paddingBottom: Padding.p_7xs,
  },
  serbisyou: {
    fontSize: FontSize.title3Bold20_size,
    letterSpacing: 0.5,
    fontWeight: "700",
    fontFamily: FontFamily.title2Bold32,
    textAlign: "left",
    color: Color.white,
    alignSelf: "stretch",
  },
  locationBtnOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  locationBtnBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  currentLocation: {
    fontSize: FontSize.size_4xs,
    letterSpacing: 0.6,
    lineHeight: 12,
    textTransform: "uppercase",
    fontWeight: "500",
    fontFamily: FontFamily.level2Medium12,
  },
  currentLocationWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: "stretch",
  },
  talambanCebuCity: {
    fontSize: FontSize.typographyTaglineSmallRegular_size,
    fontFamily: FontFamily.abhayaLibreExtraBold,
  },
  talambanCebuCityWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  frameChild: {
    borderRadius: Border.br_12xs,
    width: 11,
    height: 6,
  },
  locationBtnInner: {
    marginLeft: 1,
  },
  locationBtn1: {
    marginTop: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: "stretch",
  },
  locationBtn: {
    alignItems: "flex-end",
    justifyContent: "center",
    flex: 1,
  },
  frame: {
    paddingRight: Padding.p_smi,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  view: {
    paddingHorizontal: 0,
    paddingVertical: Padding.p_5xs,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
});

export default Header42;
