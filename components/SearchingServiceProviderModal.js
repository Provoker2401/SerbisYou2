// import * as React from "react";
// import {
//   StatusBar,
//   StyleSheet,
//   Pressable,
//   TouchableOpacity,
//   View,
//   Text,
//   ImageBackground,
//   Animated,
// } from "react-native";
// import { Image } from "expo-image";
// import { useState, useEffect, useRef } from "react";
// import { useNavigation } from "@react-navigation/native";
// import { FontFamily, Border, FontSize, Color, Padding } from "../GlobalStyles";
// //import SearchingDistanceRadiusModal from "../components/SearchingDistanceRadiusModal";
// // import SearchingServiceProviderModal from "../components/SearchingServiceProviderModal";

// import MapView, { Marker, Circle } from "react-native-maps";
// import axios from "axios";
// import * as Location from "expo-location";
// import { Easing } from "react-native-reanimated";

// const SearchingServiceProviderModal = ({ route }) => {
//   const navigation = useNavigation();

//   const mapRef = useRef(null);
//   const circleRadius = useRef(new Animated.Value(0)).current;
//   const colorValue = useRef(new Animated.Value(0)).current;

//   const { latitude, longitude, sliderValue, location} = route.params || {};

//   console.log("Fetched lat: ", { latitude });
//   console.log("Fetched long: ", { longitude });
//   console.log("Fetched location: ", { location });
//   console.log("Fetched slider: ", { sliderValue });

//   const stableCircleRadius = 50; // Set your stable circle radius here

//   useEffect(() => {
//     const circleAnimation = Animated.loop(
//       Animated.timing(circleRadius, {
//         toValue: sliderValue * 1000,
//         duration: 1500,
//         easing: Easing.inOut(Easing.ease),
//         useNativeDriver: false,
//       })
//     );

//     const colorAnimation = Animated.loop(
//       Animated.timing(colorValue, {
//         toValue: 1,
//         duration: 1500,
//         easing: Easing.inOut(Easing.ease),
//         useNativeDriver: false,
//       })
//     );

//     circleAnimation.start();
//     colorAnimation.start();

//     return () => {
//       circleAnimation.stop();
//       colorAnimation.stop();
//     };
//   }, [sliderValue]);

//   const circleColor = colorValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["rgba(70, 130, 180, 0)", "rgba(70, 130, 180, 0.5)"], // Slightly darker sky blue color
//   });

//   const [isInputFocused, setIsInputFocused] = useState(false);

//   const [initialMapRegion, setInitialMapRegion] = useState({
//     latitude: latitude,
//     longitude: longitude,
//     latitudeDelta: 0.16,
//     longitudeDelta: 0.16,
//   });

//   const [initialMarkerPosition, setInitialMarkerPosition] = useState({
//     latitude: latitude,
//     longitude: longitude,
//   });

//   const [markerPosition, setMarkerPosition] = useState(initialMarkerPosition);
//   const [reverseGeocodedAddress, setReverseGeocodedAddress] = useState(null);
//   const [editLocationVisible, setEditLocationVisible] = useState(false);
//   const [cityAddress, setCityAddress] = useState(null);

//   const fetchReverseGeolocation = async (latitude, longitude) => {
//     try {
//       const apiKey = "AIzaSyAuaR8dxr95SLUTU-cidS7I-3uB6mEoJmA";
//       const response = await axios.get(
//         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
//       );
//       if (response.data.results && response.data.results.length > 0) {
//         const firstResult = response.data.results[0];
//         const formattedAddress = firstResult.formatted_address;

//         // Extracting the city from the formatted address
//         const addressComponents = firstResult.address_components;
//         let city = "";
//         for (const component of addressComponents) {
//           if (component.types.includes("locality")) {
//             city = component.long_name;
//             break;
//           }
//         }
//         setReverseGeocodedAddress(formattedAddress);
//         setCityAddress(city);
//         // Console.log the city
//         console.log("City:", city);
//       } else {
//         setReverseGeocodedAddress("Location not found");
//         console.log("Location not found");
//       }
//     } catch (error) {
//       console.error("Error fetching reverse geolocation:", error);
//     }
//   };

//   const gotoUserLocation = async () => {
//     try {
//       const { status } = await Location.requestForegroundPermissionsAsync();

//       if (status === "granted") {
//         const location = await Location.getCurrentPositionAsync({});
//         const { latitude, longitude } = location.coords;
//         setMarkerPosition({ latitude, longitude });
//         setInitialMapRegion({
//           latitude,
//           longitude,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         });
//         setInitialMarkerPosition({ latitude, longitude });
//         fetchReverseGeolocation(latitude, longitude);
//       } else {
//         console.error("Location permission denied");
//       }
//     } catch (error) {
//       console.error("Error getting user location:", error);
//     }
//   };

//   const goToMarker = () => {
//     setInitialMapRegion({
//       ...markerPosition,
//       latitudeDelta: 0.0922,
//       longitudeDelta: 0.0421,
//     });
//   };

//   useEffect(() => {
//     if (markerPosition) {
//       fetchReverseGeolocation(
//         markerPosition.latitude,
//         markerPosition.longitude
//       );
//     }
//     console.log("Is TextInput focused:", isInputFocused);
//   }, [markerPosition, isInputFocused]);

//   const handlePlaceSelect = (data, details = null) => {
//     if (details) {
//       const { lat, lng } = details.geometry.location;
//       setMarkerPosition({ latitude: lat, longitude: lng });
//       setInitialMapRegion({
//         latitude: lat,
//         longitude: lng,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       });
//       setEditLocationVisible(false);
//     }
//   };

//   return (
//     <View style={styles.searchingDistanceRadius}>
//       <StatusBar barStyle="default" />
//       <View style={[styles.body, styles.frameFlexBox]}>
//         <View style={styles.rowContainer}>
//           <MapView
//             style={styles.map}
//             region={initialMapRegion}
//             // onPress={handleMapPress}
//             // provider={PROVIDER_GOOGLE}
//           >
//             <Marker
//               coordinate={markerPosition}
//               title="Pinned Location"
//               draggable={false}
//               // onDragEnd={handleMarkerDragEnd}
//               image={require("../assets/icons8location100-2-1.png")}
//             />
//             {/* <Circle
//               center={markerPosition}
//               radius={(sliderValue ? sliderValue * 1000 : 3000)}
//               strokeWidth={2}
//               strokeColor="#1A244D"
//               fillColor="rgba(211, 211, 211, 0.4)"
//             /> */}
//             <AnimatedCircle
//               center={markerPosition}
//               radius={circleRadius}
//               fillColor={circleColor}
//             />
//           </MapView>
//         </View>

//         <View style={[styles.backBtnWrapper, styles.valueEditThisPosition]}>
//           <Pressable
//             style={[styles.backBtn, styles.editWrapperFlexBox]}
//             onPress={() => navigation.goBack()}
//           >
//             <Image
//               style={styles.uiIconarrowBackwardfilled}
//               contentFit="cover"
//               source={require("../assets/ui-iconarrow-backwardfilled.png")}
//             />
//           </Pressable>
//         </View>
//         <View style={[styles.searchingDistanceRadiusModa]}>
//           {/* <SearchingServiceProviderModal
//             cityAddress={cityAddress}
//             specificLocation={reverseGeocodedAddress || "Loading..."}
//             latitude={latitude}
//             longitude={longitude}
//             city={cityAddress}
//             location={location} // Pass the location prop
//             title= {title}
//             category={category}

//           /> */}
//         </View>
//       </View>
//     </View>
//   );
// };

// const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// const styles = StyleSheet.create({
//   searchingDistanceRadius: {
//     width: "100%",
//     height: 812,
//     alignItems: "center",
//     flex: 1,
//     backgroundColor: Color.white,
//   },
//   body: {
//     alignSelf: "stretch",
//     flex: 1,
//   },
//   frameParent: {
//     alignSelf: "stretch",
//     flex: 1,
//   },
//   backBtnWrapper: {
//     left: 16,
//     paddingHorizontal: 0,
//     paddingVertical: Padding.p_mini,
//     zIndex: 0,
//     flexDirection: "row",
//   },
//   valueEditThisPosition: {
//     top: 0,
//     flexDirection: "row",
//     position: "absolute",
//   },
//   backBtn: {
//     height: 40,
//     paddingHorizontal: Padding.p_xs,
//     paddingVertical: Padding.p_9xs,
//     width: 40,
//     borderRadius: Border.br_xl,
//     flexDirection: "row",
//     backgroundColor: Color.white,
//   },
//   editWrapperFlexBox: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   uiIconarrowBackwardfilled: {
//     width: 24,
//     height: 24,
//     overflow: "hidden",
//   },
//   icons8Location10021Wrapper: {
//     top: 252,
//     left: 28,
//     padding: Padding.p_3xs,
//     zIndex: 1,
//     overflow: "hidden",
//     position: "absolute",
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   icons8Location10021: {
//     width: 50,
//     height: 50,
//   },

//   // Location Styles
//   rowContainer: {
//     flex: 1,
//     flexDirection: "row",
//   },
//   map: {
//     flex: 1,
//     // zIndex: 1,
//   },

//   // Searching Distance Radius Modal Styles
//   kmTypo: {
//     textAlign: "center",
//     fontFamily: FontFamily.title2Bold32,
//     fontWeight: "700",
//   },
//   sliderFrameParentFlexBox: {
//     marginTop: 15,
//     justifyContent: "center",
//     alignSelf: "stretch",
//     alignItems: "center",
//   },
//   valueEditThisLayout: {
//     height: 4,
//     borderRadius: Border.br_5xs,
//   },
//   textTypo: {
//     fontSize: FontSize.level2Medium12_size,
//     textAlign: "center",
//   },
//   iconLayout: {
//     height: 30,
//     width: 30,
//   },
//   addressDetailsBtnBg: {
//     backgroundColor: Color.colorWhitesmoke_300,
//     flexDirection: "row",
//   },
//   addAddressDetailsClr: {
//     color: Color.colorDarkgray_300,
//     textAlign: "left",
//   },
//   iconOutlineFlexBox: {
//     padding: Padding.p_12xs,
//     justifyContent: "center",
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   componentsbuttonFlexBox: {
//     backgroundColor: Color.colorDarkslategray_900,
//     justifyContent: "center",
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   bookmarkIconPosition: {
//     height: 15,
//     width: 15,
//     left: 5,
//     top: 5,
//     position: "absolute",
//   },
//   componentsFlexBox: {
//     borderRadius: Border.br_5xs,
//     marginTop: 15,
//     justifyContent: "center",
//     alignSelf: "stretch",
//     alignItems: "center",
//   },
//   editTypo: {
//     fontFamily: FontFamily.montserratMedium,
//     fontWeight: "500",
//     lineHeight: 20,
//     alignSelf: "stretch",
//   },
//   frameChild: {
//     borderStyle: "solid",
//     borderColor: Color.colorDarkgray_400,
//     borderTopWidth: 2,
//     height: 2,
//     width: 40,
//   },
//   searchingDistanceRadius1: {
//     fontSize: FontSize.bodyLgBodyLgRegular_size,
//     lineHeight: 21,
//     color: Color.colorGray_700,
//   },
//   searchingDistanceRadiusWrapper: {
//     marginTop: 12,
//     flexDirection: "row",
//     alignSelf: "stretch",
//   },
//   frameItem: {
//     width: 342,
//     marginTop: 12,
//     height: 2,
//   },

//   spacer: {
//     width: 4,
//     height: 1,
//   },
//   text: {
//     lineHeight: 16,
//     fontWeight: "600",
//     fontFamily: FontFamily.level2Semibold12,
//     color: Color.gray100,
//   },
//   tooltip: {
//     borderRadius: Border.br_9xs,
//     backgroundColor: Color.gray700,
//     shadowColor: "rgba(55, 65, 81, 0.06)",
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowRadius: 2,
//     elevation: 2,
//     shadowOpacity: 1,
//     paddingHorizontal: Padding.p_9xs,
//     paddingVertical: Padding.p_11xs,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   atomSliderTooltip: {
//     flexDirection: "row",
//   },
//   bgIcon: {
//     marginTop: 5,
//   },
//   atomSliderDragHandle: {
//     height: 20,
//   },
//   valueEditThis: {
//     left: 0,
//     backgroundColor: Color.blue500,
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//     top: 0,
//     position: "absolute",
//   },
//   atomSliderRangeNew: {
//     backgroundColor: Color.gray200,
//     alignSelf: "stretch",
//   },
//   sliderFrame: {
//     paddingRight: Padding.p_131xl,
//     flex: 1,
//   },
//   km: {
//     fontSize: FontSize.title3Bold20_size,
//     lineHeight: 26,
//     color: Color.neutral07,
//   },
//   kmWrapper: {
//     marginLeft: 10,
//     flexDirection: "row",
//   },
//   sliderFrameParent: {
//     flexDirection: "row",
//   },
//   uscTalamban: {
//     fontFamily: FontFamily.montserratBold,
//     color: Color.heading,
//     textAlign: "left",
//     lineHeight: 32,
//     fontSize: FontSize.body1Semibold_size,
//     fontWeight: "700",
//     alignSelf: "stretch",
//   },
//   barangayNasipitTalamban: {
//     fontSize: FontSize.typographyTaglineSmallRegular_size,
//     fontFamily: FontFamily.montserratMedium,
//     fontWeight: "500",
//     lineHeight: 20,
//     alignSelf: "stretch",
//   },
//   uscTalambanParent: {
//     marginLeft: 8,
//     overflow: "hidden",
//     flex: 1,
//   },
//   whiteBookmarkIcon: {
//     zIndex: 0,
//   },
//   grayBookmarkIcon: {
//     display: "none",
//     zIndex: 1,
//   },
//   whiteBookmarkParent: {
//     width: 25,
//     height: 25,
//     borderRadius: Border.br_xl,
//   },
//   savedPlaces: {
//     marginLeft: 8,
//     borderRadius: Border.br_xl,
//   },
//   componentsSearchDefault: {
//     paddingLeft: Padding.p_8xs,
//     paddingTop: Padding.p_xs,
//     paddingRight: Padding.p_3xs,
//     paddingBottom: Padding.p_xs,
//     borderRadius: Border.br_5xs,
//     marginTop: 15,
//     justifyContent: "center",
//     alignSelf: "stretch",
//     alignItems: "center",
//   },
//   addAddressDetails: {
//     fontFamily: FontFamily.montserratRegular,
//     lineHeight: 32,
//     color: Color.colorDarkgray_300,
//     fontSize: FontSize.level2Medium12_size,
//     flex: 1,
//   },
//   addressDetailsFrame: {
//     flexDirection: "row",
//     flex: 1,
//   },
//   edit: {
//     color: Color.colorDeepskyblue_100,
//     display: "flex",
//     width: 34,
//     fontSize: FontSize.level2Medium12_size,
//     textAlign: "center",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   editBtn: {
//     marginLeft: 5,
//     flexDirection: "row",
//     alignSelf: "stretch",
//   },
//   addressDetailsBtn: {
//     borderRadius: Border.br_3xs,
//     paddingLeft: Padding.p_3xs,
//     paddingTop: Padding.p_8xs,
//     paddingRight: Padding.p_8xs,
//     paddingBottom: Padding.p_8xs,
//     flex: 1,
//   },
//   componentsSearchDefault1: {
//     overflow: "hidden",
//     flexDirection: "row",
//   },
//   viewAllServices: {
//     letterSpacing: -0.1,
//     lineHeight: 24,
//     color: Color.neutral01,
//     fontSize: FontSize.body1Semibold_size,
//     textAlign: "center",
//     fontFamily: FontFamily.title2Bold32,
//     fontWeight: "700",
//   },
//   componentsbutton: {
//     borderRadius: Border.br_mini,
//     paddingHorizontal: Padding.p_3xl,
//     paddingVertical: Padding.p_xs,
//     alignSelf: "stretch",
//   },
//   componentsbuttonWrapper: {
//     paddingTop: Padding.p_3xs,
//   },

//   cancelButtonText: {
//     color: "blue", // Customize the color as needed
//   },

//   frameGroup: {
//     borderTopLeftRadius: Border.br_5xl,
//     borderTopRightRadius: Border.br_5xl,
//     paddingHorizontal: Padding.p_base,
//     paddingBottom: Padding.p_mini,
//     alignSelf: "stretch",
//     backgroundColor: Color.white,
//   },
//   frameFlexBox: {
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   lineParent: {
//     paddingTop: Padding.p_5xs,
//     alignSelf: "stretch",
//   },
//   searchingDistanceRadiusModa: {
//     // zIndex: 2,
//     // alignSelf: "stretch",
//     position: "absolute",
//     width: "100%",
//     height: "auto",
//   },
// });

// export default SearchingServiceProviderModal;

import {
  View,
  Text,
  Pressable,
  ImageBackground,
  StyleSheet,
  Modal,
} from "react-native";
import React, { useState, useCallback } from "react";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Padding, Border, FontFamily, Color, FontSize } from "../GlobalStyles";
import Slider from "@react-native-community/slider";
import CancelBookingPrompt from "../components/CancelBookingPrompt";

const SearchingDistanceRadiusModal = ({
  cityAddress,
  specificLocation,
  latitude,
  longitude,
  city,
  location,
  title,
  category,
}) => {
  const [cancelModalVisible, setcancelModalVisible] = useState(false);

  const openCancelModal = useCallback(() => {
    setcancelModalVisible(true);
  }, []);

  const closeCancelModal = useCallback(() => {
    setcancelModalVisible(false);
  }, []);

  const navigation = useNavigation();

  const [sliderValue, setSliderValue] = useState("3");
  const minimumValue = 1;
  const maximumValue = 10;

  const sentence = `${title} - ${category}`;

  const submit = (value) => {
    setSliderValue(value);
    let radius = parseInt(value) * 1000;
    console.log(radius);
    navigation.navigate({
      name: "SearchingDistanceRadius",
      params: { sliderValue: radius },
      merge: true,
    });
  };

  return (
    <View style={[styles.frameGroup, styles.frameFlexBox]}>
      <View style={[styles.lineParent, styles.editWrapperFlexBox]}>
        <View style={styles.frameChild} />
        <View
          style={[
            styles.searchingDistanceRadiusWrapper,
            styles.editWrapperFlexBox,
          ]}
        >
          <Text style={[styles.searchingDistanceRadius1, styles.kmTypo]}>
            Searching Providers
          </Text>
        </View>
        <Image
          style={styles.frameItem}
          contentFit="cover"
          source={require("../assets/line-748.png")}
        />
      </View>
      {/* <View
          style={[styles.sliderFrameParent, styles.sliderFrameParentFlexBox1]}
        >
          <View style={[styles.kmWrapper, styles.editWrapperFlexBox]}>
            <Text>Plumbing</Text>
            <Text>Nasipit Talamban</Text>
          </View>
  
          <View style={[styles.kmWrapper, styles.editWrapperFlexBox]}>
            <Text style={[styles.km, styles.kmTypo]}>{sliderValue}km</Text>
          </View>
        </View>   */}
      <View style={styles.infoContainer}>
        <View>
          <Text>{sentence}</Text>
        </View>
      </View>
      <View
        style={[styles.sliderFrameParent, styles.sliderFrameParentFlexBox2]}
      >
        <Text style={[styles.barangayNasipitTalamban, styles.noteText]}>
          {location}
        </Text>
      </View>
      <View
        style={[
          styles.componentsbuttonWrapper,
          styles.sliderFrameParentFlexBox,
        ]}
      >
        <Pressable
          style={[
            styles.componentsbutton,
            styles.componentsbuttonFlexBox,
            { backgroundColor: "#8B0000" }, // Change to your desired color
          ]}
          onPress={openCancelModal}

          //   onPress={() =>
          //     navigation.navigate("ReviewSummary", {
          //       sliderValue,
          //       latitude,
          //       longitude,
          //       city,
          //     })
          //   }
        >
          <Text style={styles.viewAllServices}>Cancel</Text>
        </Pressable>
      </View>

      <Modal animationType="fade" transparent visible={cancelModalVisible}>
        <View style={styles.logoutButtonOverlay}>
          <Pressable style={styles.logoutButtonBg} onPress={closeCancelModal} />
          <CancelBookingPrompt onClose={closeCancelModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // Searching Distance Radius Modal Styles
  editWrapperFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
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
  sliderFrameParentFlexBox1: {
    marginTop: 15,
    justifyContent: "space-between",
    alignSelf: "stretch",
    alignItems: "center",
  },
  sliderFrameParentFlexBox2: {
    marginTop: 5,
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
  noteText: {
    color: Color.colorDarkgray_300,
    textAlign: "right",
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
    // fontWeight: "500",
    // lineHeight: 20,
    // alignSelf: "stretch",
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
  searchingDistanceRadiusModa: {
    zIndex: 2,
    alignSelf: "stretch",
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
  infoContainer: {
    marginTop: 10,
  },
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
});
export default SearchingDistanceRadiusModal;

