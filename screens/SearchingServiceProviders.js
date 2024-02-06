// // // // import * as React from "react";
// // // // import {
// // // //   StatusBar,
// // // //   StyleSheet,
// // // //   Pressable,
// // // //   View,
// // // //   Text,
// // // //   ImageBackground,
// // // // } from "react-native";
// // // // import { SafeAreaView } from "react-native-safe-area-context";
// // // // import { Image } from "expo-image";
// // // // import { useNavigation } from "@react-navigation/native";
// // // // import { FontFamily, Color, FontSize, Padding, Border } from "../GlobalStyles";

// // // // const SearchingServiceProviders = () => {
// // // //   const navigation = useNavigation();

// // // //   return (
// // // //     <View style={styles.searchingServiceProviders}>
// // // //       <StatusBar barStyle="default" />
// // // //       <ImageBackground
// // // //         style={styles.bodyIcon}
// // // //         resizeMode="cover"
// // // //         source={require("../assets/body.png")}
// // // //       >
// // // //         <Image
// // // //           style={styles.icons8Location10022}
// // // //           contentFit="cover"
// // // //           source={require("../assets/icons8location100-2-2.png")}
// // // //         />
// // // //         <View style={styles.searchingProviderModal}>
// // // //           <View style={styles.content}>
// // // //             <View style={styles.content}>
// // // //               <Text style={styles.lookingForService}>
// // // //                 Looking for Service Providers...
// // // //               </Text>
// // // //               <Text style={styles.giveProvidersSome}>
// // // //                 Give providers some time to accept your booking
// // // //               </Text>
// // // //             </View>
// // // //             <View style={styles.frameParentFlexBox}>
// // // //               <View style={styles.addressFrame}>
// // // //                 <View style={styles.plumbingInstallationPicWrapper}>
// // // //                   <Image
// // // //                     style={styles.plumbingInstallationPic}
// // // //                     contentFit="cover"
// // // //                     source={require("../assets/plumbing-installation-pic2.png")}
// // // //                   />
// // // //                 </View>
// // // //                 <View style={[styles.frameWrapper, styles.frameSpaceBlock]}>
// // // //                   <View style={styles.frame}>
// // // //                     <Text
// // // //                       style={[
// // // //                         styles.plumbingInstallation,
// // // //                         styles.paypalFlexBox,
// // // //                       ]}
// // // //                     >
// // // //                       Plumbing Installation
// // // //                     </Text>
// // // //                   </View>
// // // //                 </View>
// // // //               </View>
// // // //               <View style={[styles.addressFrame1, styles.frameFlexBox]}>
// // // //                 <View style={styles.markersNearPinletMarkerWrapper}>
// // // //                   <Image
// // // //                     style={styles.markersNearPinletMarker}
// // // //                     contentFit="cover"
// // // //                     source={require("../assets/markers--near-pinlet-marker3.png")}
// // // //                   />
// // // //                 </View>
// // // //                 <View style={[styles.frameWrapper, styles.frameSpaceBlock]}>
// // // //                   <View style={styles.frame}>
// // // //                     <Text
// // // //                       style={[
// // // //                         styles.plumbingInstallation,
// // // //                         styles.paypalFlexBox,
// // // //                       ]}
// // // //                     >
// // // //                       Nasipit, Talamban, Cebu City
// // // //                     </Text>
// // // //                   </View>
// // // //                 </View>
// // // //               </View>
// // // //             </View>
// // // //             <View style={[styles.frameParent, styles.frameParentFlexBox]}>
// // // //               <View style={styles.vectorWrapper}>
// // // //                 <Image
// // // //                   style={[styles.frameChild, styles.iconLayout]}
// // // //                   contentFit="cover"
// // // //                   source={require("../assets/line-745.png")}
// // // //                 />
// // // //               </View>
// // // //               <View style={[styles.btn, styles.frameFlexBox]}>
// // // //                 <View style={styles.dateAndTimeFrame}>
// // // //                   <View style={styles.plumbingInstallationPicWrapper}>
// // // //                     <Image
// // // //                       style={styles.image2373Icon}
// // // //                       contentFit="cover"
// // // //                       source={require("../assets/image-23732.png")}
// // // //                     />
// // // //                   </View>
// // // //                   <View style={[styles.frameFrame, styles.frameSpaceBlock]}>
// // // //                     <View style={styles.frame}>
// // // //                       <View style={styles.paypalWrapper}>
// // // //                         <Text style={[styles.paypal, styles.editTypo]}>
// // // //                           PayPal
// // // //                         </Text>
// // // //                       </View>
// // // //                     </View>
// // // //                   </View>
// // // //                 </View>
// // // //                 <View style={styles.btnInner}>
// // // //                   <Image
// // // //                     style={styles.frameItem}
// // // //                     contentFit="cover"
// // // //                     source={require("../assets/line-746.png")}
// // // //                   />
// // // //                 </View>
// // // //                 <View style={styles.editBtn}>
// // // //                   <Text style={[styles.edit, styles.editTypo]}>₱6040.00</Text>
// // // //                 </View>
// // // //               </View>
// // // //               <View style={[styles.cancelFrame, styles.frameFlexBox]}>
// // // //                 <Pressable
// // // //                   style={styles.cancelBtn}
// // // //                   onPress={() => navigation.goBack()}
// // // //                 >
// // // //                   <Text style={[styles.viewAllServices, styles.searchingTypo]}>
// // // //                     CANCEL
// // // //                   </Text>
// // // //                 </Pressable>
// // // //               </View>
// // // //             </View>
// // // //           </View>
// // // //         </View>
// // // //       </ImageBackground>
// // // //     </View>
// // // //   );
// // // // };

// // // // const styles = StyleSheet.create({
// // // //   header: {
// // // //     backgroundColor: "#1a244d",
// // // //   },
// // // //   iconLayout: {
// // // //     overflow: "hidden",
// // // //     width: "100%",
// // // //   },
// // // //   searchingTypo: {
// // // //     fontFamily: FontFamily.title2Bold32,
// // // //     textAlign: "center",
// // // //     fontWeight: "700",
// // // //   },
// // // //   frameSpaceBlock: {
// // // //     marginLeft: 7,
// // // //     justifyContent: "center",
// // // //   },
// // // //   paypalFlexBox: {
// // // //     textAlign: "left",
// // // //     color: Color.colorBlack,
// // // //     flex: 1,
// // // //   },
// // // //   frameFlexBox: {
// // // //     marginTop: 8,
// // // //     alignItems: "center",
// // // //     alignSelf: "stretch",
// // // //   },
// // // //   frameParentFlexBox: {
// // // //     marginTop: 15,
// // // //     alignItems: "center",
// // // //     alignSelf: "stretch",
// // // //   },
// // // //   editTypo: {
// // // //     fontSize: FontSize.title4Regular18_size,
// // // //     fontFamily: FontFamily.workSansMedium,
// // // //     fontWeight: "500",
// // // //   },
// // // //   icons8Location10022: {
// // // //     position: "absolute",
// // // //     top: 267,
// // // //     left: 26,
// // // //     width: 50,
// // // //     height: 50,
// // // //     zIndex: 0,
// // // //   },
// // // //   lookingForService: {
// // // //     fontFamily: FontFamily.workSansBold,
// // // //     color: Color.heading,
// // // //     textTransform: "capitalize",
// // // //     textAlign: "center",
// // // //     fontWeight: "700",
// // // //     fontSize: FontSize.title3Bold20_size,
// // // //     alignSelf: "stretch",
// // // //   },
// // // //   giveProvidersSome: {
// // // //     fontSize: FontSize.typographyTaglineSmallRegular_size,
// // // //     lineHeight: 20,
// // // //     color: Color.bg,
// // // //     marginTop: 10,
// // // //     fontFamily: FontFamily.workSansMedium,
// // // //     fontWeight: "500",
// // // //     textAlign: "center",
// // // //     alignSelf: "stretch",
// // // //   },
// // // //   content: {
// // // //     alignItems: "center",
// // // //     alignSelf: "stretch",
// // // //   },
// // // //   plumbingInstallationPic: {
// // // //     height: 42,
// // // //     width: 40,
// // // //   },
// // // //   plumbingInstallationPicWrapper: {
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //     flexDirection: "row",
// // // //   },
// // // //   plumbingInstallation: {
// // // //     fontFamily: FontFamily.workSansRegular,
// // // //     fontSize: FontSize.body1Semibold_size,
// // // //     textTransform: "capitalize",
// // // //   },
// // // //   frame: {
// // // //     alignItems: "center",
// // // //     flexDirection: "row",
// // // //     alignSelf: "stretch",
// // // //   },
// // // //   frameWrapper: {
// // // //     flex: 1,
// // // //   },
// // // //   addressFrame: {
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //     flexDirection: "row",
// // // //     alignSelf: "stretch",
// // // //   },
// // // //   markersNearPinletMarker: {
// // // //     width: 32,
// // // //     height: 41,
// // // //   },
// // // //   markersNearPinletMarkerWrapper: {
// // // //     paddingHorizontal: Padding.p_9xs,
// // // //     paddingVertical: 0,
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //     flexDirection: "row",
// // // //   },
// // // //   addressFrame1: {
// // // //     justifyContent: "center",
// // // //     flexDirection: "row",
// // // //   },
// // // //   frameChild: {
// // // //     maxWidth: "100%",
// // // //     maxHeight: "100%",
// // // //     alignSelf: "stretch",
// // // //     flex: 1,
// // // //   },
// // // //   vectorWrapper: {
// // // //     height: 1,
// // // //     display: "none",
// // // //     alignItems: "center",
// // // //     alignSelf: "stretch",
// // // //   },
// // // //   image2373Icon: {
// // // //     height: 23,
// // // //     width: 40,
// // // //   },
// // // //   paypal: {
// // // //     textAlign: "left",
// // // //     color: Color.colorBlack,
// // // //     flex: 1,
// // // //   },
// // // //   paypalWrapper: {
// // // //     alignItems: "center",
// // // //     flexDirection: "row",
// // // //     flex: 1,
// // // //   },
// // // //   frameFrame: {
// // // //     width: 58,
// // // //   },
// // // //   dateAndTimeFrame: {
// // // //     borderRadius: Border.br_3xs,
// // // //     paddingHorizontal: 0,
// // // //     paddingVertical: Padding.p_8xs,
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //     flexDirection: "row",
// // // //     backgroundColor: Color.white,
// // // //     flex: 1,
// // // //   },
// // // //   frameItem: {
// // // //     width: 45,
// // // //     height: 0,
// // // //   },
// // // //   btnInner: {
// // // //     width: 5,
// // // //     marginLeft: 15,
// // // //     alignItems: "center",
// // // //   },
// // // //   edit: {
// // // //     lineHeight: 24,
// // // //     color: Color.neutral07,
// // // //     display: "flex",
// // // //     width: 91,
// // // //     textAlign: "center",
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //     alignSelf: "stretch",
// // // //   },
// // // //   editBtn: {
// // // //     marginLeft: 15,
// // // //     justifyContent: "center",
// // // //     flexDirection: "row",
// // // //     flex: 1,
// // // //   },
// // // //   btn: {
// // // //     display: "none",
// // // //     justifyContent: "center",
// // // //     flexDirection: "row",
// // // //   },
// // // //   viewAllServices: {
// // // //     letterSpacing: -0.1,
// // // //     lineHeight: 24,
// // // //     color: Color.neutral01,
// // // //     fontSize: FontSize.body1Semibold_size,
// // // //     textAlign: "center",
// // // //   },
// // // //   cancelBtn: {
// // // //     borderRadius: Border.br_mini,
// // // //     backgroundColor: Color.colorFirebrick_200,
// // // //     paddingHorizontal: Padding.p_3xl,
// // // //     paddingVertical: Padding.p_xs,
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //     flexDirection: "row",
// // // //     alignSelf: "stretch",
// // // //   },
// // // //   cancelFrame: {
// // // //     justifyContent: "flex-end",
// // // //   },
// // // //   frameParent: {
// // // //     justifyContent: "center",
// // // //   },
// // // //   searchingProviderModal: {
// // // //     borderRadius: Border.br_xs,
// // // //     width: 345,
// // // //     paddingHorizontal: Padding.p_3xs,
// // // //     paddingVertical: Padding.p_xl,
// // // //     zIndex: 1,
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //     backgroundColor: Color.white,
// // // //   },
// // // //   bodyIcon: {
// // // //     height: 696,
// // // //     paddingBottom: Padding.p_81xl,
// // // //     justifyContent: "flex-end",
// // // //     alignItems: "center",
// // // //     alignSelf: "stretch",
// // // //   },
// // // //   searchingServiceProviders: {
// // // //     backgroundColor: Color.colorWhitesmoke_200,
// // // //     height: 812,
// // // //     width: "100%",
// // // //     flex: 1,
// // // //   },
// // // // });

// // // // export default SearchingServiceProviders;
// // // import * as React from "react";
// // // import {
// // //   StatusBar,
// // //   StyleSheet,
// // //   Pressable,
// // //   TouchableOpacity,
// // //   View,
// // //   Text,
// // //   ImageBackground,
// // //   Animated,
// // // } from "react-native";
// // // import { Image } from "expo-image";
// // // import { useState, useEffect, useRef } from "react";
// // // import { useNavigation } from "@react-navigation/native";
// // // import { FontFamily, Border, FontSize, Color, Padding } from "../GlobalStyles";
// // // //import SearchingDistanceRadiusModal from "../components/SearchingDistanceRadiusModal";
// // // import SearchingServiceProviderModal from "../components/SearchingServiceProviderModal";

// // // import MapView, { Marker, Circle } from "react-native-maps";
// // // import axios from "axios";
// // // import * as Location from "expo-location";
// // // import { Easing } from "react-native-reanimated";

// // // const SearchingDistanceRadius = ({ route }) => {
// // //   const navigation = useNavigation();

// // //   const mapRef = useRef(null);
// // //   const circleRadius = useRef(new Animated.Value(0)).current;
// // //   const colorValue = useRef(new Animated.Value(0)).current;

// // //   const { latitude, longitude, sliderValue, location, title,category} = route.params || {};

// // //   console.log("Fetched lat: ", { latitude });
// // //   console.log("Fetched long: ", { longitude });
// // //   console.log("Fetched location: ", { location });
// // //   console.log("Fetched slider: ", { sliderValue });

// // //   const stableCircleRadius = 50; // Set your stable circle radius here

// // //   useEffect(() => {
// // //     const circleAnimation = Animated.loop(
// // //       Animated.timing(circleRadius, {
// // //         toValue: sliderValue * 1000,
// // //         duration: 1500,
// // //         easing: Easing.inOut(Easing.ease),
// // //         useNativeDriver: false,
// // //       })
// // //     );

// // //     const colorAnimation = Animated.loop(
// // //       Animated.timing(colorValue, {
// // //         toValue: 1,
// // //         duration: 1500,
// // //         easing: Easing.inOut(Easing.ease),
// // //         useNativeDriver: false,
// // //       })
// // //     );

// // //     circleAnimation.start();
// // //     colorAnimation.start();

// // //     return () => {
// // //       circleAnimation.stop();
// // //       colorAnimation.stop();
// // //     };
// // //   }, [sliderValue]);

// // //   const circleColor = colorValue.interpolate({
// // //     inputRange: [0, 1],
// // //     outputRange: ["rgba(70, 130, 180, 0)", "rgba(70, 130, 180, 0.5)"], // Slightly darker sky blue color
// // //   });

// // //   const [isInputFocused, setIsInputFocused] = useState(false);

// // //   const [initialMapRegion, setInitialMapRegion] = useState({
// // //     latitude: latitude,
// // //     longitude: longitude,
// // //     latitudeDelta: 0.16,
// // //     longitudeDelta: 0.16,
// // //   });

// // //   const [initialMarkerPosition, setInitialMarkerPosition] = useState({
// // //     latitude: latitude,
// // //     longitude: longitude,
// // //   });

// // //   const [markerPosition, setMarkerPosition] = useState(initialMarkerPosition);
// // //   const [reverseGeocodedAddress, setReverseGeocodedAddress] = useState(null);
// // //   const [editLocationVisible, setEditLocationVisible] = useState(false);
// // //   const [cityAddress, setCityAddress] = useState(null);

// // //   const fetchReverseGeolocation = async (latitude, longitude) => {
// // //     try {
// // //       const apiKey = "AIzaSyAuaR8dxr95SLUTU-cidS7I-3uB6mEoJmA";
// // //       const response = await axios.get(
// // //         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
// // //       );
// // //       if (response.data.results && response.data.results.length > 0) {
// // //         const firstResult = response.data.results[0];
// // //         const formattedAddress = firstResult.formatted_address;

// // //         // Extracting the city from the formatted address
// // //         const addressComponents = firstResult.address_components;
// // //         let city = "";
// // //         for (const component of addressComponents) {
// // //           if (component.types.includes("locality")) {
// // //             city = component.long_name;
// // //             break;
// // //           }
// // //         }
// // //         setReverseGeocodedAddress(formattedAddress);
// // //         setCityAddress(city);
// // //         // Console.log the city
// // //         console.log("City:", city);
// // //       } else {
// // //         setReverseGeocodedAddress("Location not found");
// // //         console.log("Location not found");
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching reverse geolocation:", error);
// // //     }
// // //   };

// // //   const gotoUserLocation = async () => {
// // //     try {
// // //       const { status } = await Location.requestForegroundPermissionsAsync();

// // //       if (status === "granted") {
// // //         const location = await Location.getCurrentPositionAsync({});
// // //         const { latitude, longitude } = location.coords;
// // //         setMarkerPosition({ latitude, longitude });
// // //         setInitialMapRegion({
// // //           latitude,
// // //           longitude,
// // //           latitudeDelta: 0.0922,
// // //           longitudeDelta: 0.0421,
// // //         });
// // //         setInitialMarkerPosition({ latitude, longitude });
// // //         fetchReverseGeolocation(latitude, longitude);
// // //       } else {
// // //         console.error("Location permission denied");
// // //       }
// // //     } catch (error) {
// // //       console.error("Error getting user location:", error);
// // //     }
// // //   };

// // //   const goToMarker = () => {
// // //     setInitialMapRegion({
// // //       ...markerPosition,
// // //       latitudeDelta: 0.0922,
// // //       longitudeDelta: 0.0421,
// // //     });
// // //   };

// // //   useEffect(() => {
// // //     if (markerPosition) {
// // //       fetchReverseGeolocation(
// // //         markerPosition.latitude,
// // //         markerPosition.longitude
// // //       );
// // //     }
// // //     console.log("Is TextInput focused:", isInputFocused);
// // //   }, [markerPosition, isInputFocused]);

// // //   const handlePlaceSelect = (data, details = null) => {
// // //     if (details) {
// // //       const { lat, lng } = details.geometry.location;
// // //       setMarkerPosition({ latitude: lat, longitude: lng });
// // //       setInitialMapRegion({
// // //         latitude: lat,
// // //         longitude: lng,
// // //         latitudeDelta: 0.0922,
// // //         longitudeDelta: 0.0421,
// // //       });
// // //       setEditLocationVisible(false);
// // //     }
// // //   };

// // //   return (
// // //     <View style={styles.searchingDistanceRadius}>
// // //       <StatusBar barStyle="default" />
// // //       <View style={[styles.body, styles.frameFlexBox]}>
// // //         <View style={styles.rowContainer}>
// // //           <MapView
// // //             style={styles.map}
// // //             region={initialMapRegion}
// // //             // onPress={handleMapPress}
// // //             // provider={PROVIDER_GOOGLE}
// // //           >
// // //             <Marker
// // //               coordinate={markerPosition}
// // //               title="Pinned Location"
// // //               draggable={false}
// // //               // onDragEnd={handleMarkerDragEnd}
// // //               image={require("../assets/icons8location100-2-1.png")}
// // //             />
// // //             {/* <Circle
// // //               center={markerPosition}
// // //               radius={(sliderValue ? sliderValue * 1000 : 3000)}
// // //               strokeWidth={2}
// // //               strokeColor="#1A244D"
// // //               fillColor="rgba(211, 211, 211, 0.4)"
// // //             /> */}
// // //             <AnimatedCircle
// // //               center={markerPosition}
// // //               radius={circleRadius}
// // //               fillColor={circleColor}
// // //             />
// // //           </MapView>
// // //         </View>

// // //         <View style={[styles.backBtnWrapper, styles.valueEditThisPosition]}>
// // //           <Pressable
// // //             style={[styles.backBtn, styles.editWrapperFlexBox]}
// // //             onPress={() => navigation.goBack()}
// // //           >
// // //             <Image
// // //               style={styles.uiIconarrowBackwardfilled}
// // //               contentFit="cover"
// // //               source={require("../assets/ui-iconarrow-backwardfilled.png")}
// // //             />
// // //           </Pressable>
// // //         </View>
// // //         <View style={[styles.searchingDistanceRadiusModa]}>
// // //           <SearchingServiceProviderModal
// // //             cityAddress={cityAddress}
// // //             specificLocation={reverseGeocodedAddress || "Loading..."}
// // //             latitude={latitude}
// // //             longitude={longitude}
// // //             city={cityAddress}
// // //             location={location} // Pass the location prop
// // //             title= {title}
// // //             category={category}

// // //           />
// // //         </View>
// // //       </View>
// // //     </View>
// // //   );
// // // };

// // // const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// // // const styles = StyleSheet.create({
// // //   searchingDistanceRadius: {
// // //     width: "100%",
// // //     height: 812,
// // //     alignItems: "center",
// // //     flex: 1,
// // //     backgroundColor: Color.white,
// // //   },
// // //   body: {
// // //     alignSelf: "stretch",
// // //     flex: 1,
// // //   },
// // //   frameParent: {
// // //     alignSelf: "stretch",
// // //     flex: 1,
// // //   },
// // //   backBtnWrapper: {
// // //     left: 16,
// // //     paddingHorizontal: 0,
// // //     paddingVertical: Padding.p_mini,
// // //     zIndex: 0,
// // //     flexDirection: "row",
// // //   },
// // //   valueEditThisPosition: {
// // //     top: 0,
// // //     flexDirection: "row",
// // //     position: "absolute",
// // //   },
// // //   backBtn: {
// // //     height: 40,
// // //     paddingHorizontal: Padding.p_xs,
// // //     paddingVertical: Padding.p_9xs,
// // //     width: 40,
// // //     borderRadius: Border.br_xl,
// // //     flexDirection: "row",
// // //     backgroundColor: Color.white,
// // //   },
// // //   editWrapperFlexBox: {
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //   },
// // //   uiIconarrowBackwardfilled: {
// // //     width: 24,
// // //     height: 24,
// // //     overflow: "hidden",
// // //   },
// // //   icons8Location10021Wrapper: {
// // //     top: 252,
// // //     left: 28,
// // //     padding: Padding.p_3xs,
// // //     zIndex: 1,
// // //     overflow: "hidden",
// // //     position: "absolute",
// // //     justifyContent: "flex-end",
// // //     alignItems: "center",
// // //   },
// // //   icons8Location10021: {
// // //     width: 50,
// // //     height: 50,
// // //   },

// // //   // Location Styles
// // //   rowContainer: {
// // //     flex: 1,
// // //     flexDirection: "row",
// // //   },
// // //   map: {
// // //     flex: 1,
// // //     // zIndex: 1,
// // //   },

// // //   // Searching Distance Radius Modal Styles
// // //   kmTypo: {
// // //     textAlign: "center",
// // //     fontFamily: FontFamily.title2Bold32,
// // //     fontWeight: "700",
// // //   },
// // //   sliderFrameParentFlexBox: {
// // //     marginTop: 15,
// // //     justifyContent: "center",
// // //     alignSelf: "stretch",
// // //     alignItems: "center",
// // //   },
// // //   valueEditThisLayout: {
// // //     height: 4,
// // //     borderRadius: Border.br_5xs,
// // //   },
// // //   textTypo: {
// // //     fontSize: FontSize.level2Medium12_size,
// // //     textAlign: "center",
// // //   },
// // //   iconLayout: {
// // //     height: 30,
// // //     width: 30,
// // //   },
// // //   addressDetailsBtnBg: {
// // //     backgroundColor: Color.colorWhitesmoke_300,
// // //     flexDirection: "row",
// // //   },
// // //   addAddressDetailsClr: {
// // //     color: Color.colorDarkgray_300,
// // //     textAlign: "left",
// // //   },
// // //   iconOutlineFlexBox: {
// // //     padding: Padding.p_12xs,
// // //     justifyContent: "center",
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //   },
// // //   componentsbuttonFlexBox: {
// // //     backgroundColor: Color.colorDarkslategray_900,
// // //     justifyContent: "center",
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //   },
// // //   bookmarkIconPosition: {
// // //     height: 15,
// // //     width: 15,
// // //     left: 5,
// // //     top: 5,
// // //     position: "absolute",
// // //   },
// // //   componentsFlexBox: {
// // //     borderRadius: Border.br_5xs,
// // //     marginTop: 15,
// // //     justifyContent: "center",
// // //     alignSelf: "stretch",
// // //     alignItems: "center",
// // //   },
// // //   editTypo: {
// // //     fontFamily: FontFamily.montserratMedium,
// // //     fontWeight: "500",
// // //     lineHeight: 20,
// // //     alignSelf: "stretch",
// // //   },
// // //   frameChild: {
// // //     borderStyle: "solid",
// // //     borderColor: Color.colorDarkgray_400,
// // //     borderTopWidth: 2,
// // //     height: 2,
// // //     width: 40,
// // //   },
// // //   searchingDistanceRadius1: {
// // //     fontSize: FontSize.bodyLgBodyLgRegular_size,
// // //     lineHeight: 21,
// // //     color: Color.colorGray_700,
// // //   },
// // //   searchingDistanceRadiusWrapper: {
// // //     marginTop: 12,
// // //     flexDirection: "row",
// // //     alignSelf: "stretch",
// // //   },
// // //   frameItem: {
// // //     width: 342,
// // //     marginTop: 12,
// // //     height: 2,
// // //   },

// // //   spacer: {
// // //     width: 4,
// // //     height: 1,
// // //   },
// // //   text: {
// // //     lineHeight: 16,
// // //     fontWeight: "600",
// // //     fontFamily: FontFamily.level2Semibold12,
// // //     color: Color.gray100,
// // //   },
// // //   tooltip: {
// // //     borderRadius: Border.br_9xs,
// // //     backgroundColor: Color.gray700,
// // //     shadowColor: "rgba(55, 65, 81, 0.06)",
// // //     shadowOffset: {
// // //       width: 0,
// // //       height: 1,
// // //     },
// // //     shadowRadius: 2,
// // //     elevation: 2,
// // //     shadowOpacity: 1,
// // //     paddingHorizontal: Padding.p_9xs,
// // //     paddingVertical: Padding.p_11xs,
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //   },
// // //   atomSliderTooltip: {
// // //     flexDirection: "row",
// // //   },
// // //   bgIcon: {
// // //     marginTop: 5,
// // //   },
// // //   atomSliderDragHandle: {
// // //     height: 20,
// // //   },
// // //   valueEditThis: {
// // //     left: 0,
// // //     backgroundColor: Color.blue500,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     flexDirection: "row",
// // //     top: 0,
// // //     position: "absolute",
// // //   },
// // //   atomSliderRangeNew: {
// // //     backgroundColor: Color.gray200,
// // //     alignSelf: "stretch",
// // //   },
// // //   sliderFrame: {
// // //     paddingRight: Padding.p_131xl,
// // //     flex: 1,
// // //   },
// // //   km: {
// // //     fontSize: FontSize.title3Bold20_size,
// // //     lineHeight: 26,
// // //     color: Color.neutral07,
// // //   },
// // //   kmWrapper: {
// // //     marginLeft: 10,
// // //     flexDirection: "row",
// // //   },
// // //   sliderFrameParent: {
// // //     flexDirection: "row",
// // //   },
// // //   uscTalamban: {
// // //     fontFamily: FontFamily.montserratBold,
// // //     color: Color.heading,
// // //     textAlign: "left",
// // //     lineHeight: 32,
// // //     fontSize: FontSize.body1Semibold_size,
// // //     fontWeight: "700",
// // //     alignSelf: "stretch",
// // //   },
// // //   barangayNasipitTalamban: {
// // //     fontSize: FontSize.typographyTaglineSmallRegular_size,
// // //     fontFamily: FontFamily.montserratMedium,
// // //     fontWeight: "500",
// // //     lineHeight: 20,
// // //     alignSelf: "stretch",
// // //   },
// // //   uscTalambanParent: {
// // //     marginLeft: 8,
// // //     overflow: "hidden",
// // //     flex: 1,
// // //   },
// // //   whiteBookmarkIcon: {
// // //     zIndex: 0,
// // //   },
// // //   grayBookmarkIcon: {
// // //     display: "none",
// // //     zIndex: 1,
// // //   },
// // //   whiteBookmarkParent: {
// // //     width: 25,
// // //     height: 25,
// // //     borderRadius: Border.br_xl,
// // //   },
// // //   savedPlaces: {
// // //     marginLeft: 8,
// // //     borderRadius: Border.br_xl,
// // //   },
// // //   componentsSearchDefault: {
// // //     paddingLeft: Padding.p_8xs,
// // //     paddingTop: Padding.p_xs,
// // //     paddingRight: Padding.p_3xs,
// // //     paddingBottom: Padding.p_xs,
// // //     borderRadius: Border.br_5xs,
// // //     marginTop: 15,
// // //     justifyContent: "center",
// // //     alignSelf: "stretch",
// // //     alignItems: "center",
// // //   },
// // //   addAddressDetails: {
// // //     fontFamily: FontFamily.montserratRegular,
// // //     lineHeight: 32,
// // //     color: Color.colorDarkgray_300,
// // //     fontSize: FontSize.level2Medium12_size,
// // //     flex: 1,
// // //   },
// // //   addressDetailsFrame: {
// // //     flexDirection: "row",
// // //     flex: 1,
// // //   },
// // //   edit: {
// // //     color: Color.colorDeepskyblue_100,
// // //     display: "flex",
// // //     width: 34,
// // //     fontSize: FontSize.level2Medium12_size,
// // //     textAlign: "center",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //   },
// // //   editBtn: {
// // //     marginLeft: 5,
// // //     flexDirection: "row",
// // //     alignSelf: "stretch",
// // //   },
// // //   addressDetailsBtn: {
// // //     borderRadius: Border.br_3xs,
// // //     paddingLeft: Padding.p_3xs,
// // //     paddingTop: Padding.p_8xs,
// // //     paddingRight: Padding.p_8xs,
// // //     paddingBottom: Padding.p_8xs,
// // //     flex: 1,
// // //   },
// // //   componentsSearchDefault1: {
// // //     overflow: "hidden",
// // //     flexDirection: "row",
// // //   },
// // //   viewAllServices: {
// // //     letterSpacing: -0.1,
// // //     lineHeight: 24,
// // //     color: Color.neutral01,
// // //     fontSize: FontSize.body1Semibold_size,
// // //     textAlign: "center",
// // //     fontFamily: FontFamily.title2Bold32,
// // //     fontWeight: "700",
// // //   },
// // //   componentsbutton: {
// // //     borderRadius: Border.br_mini,
// // //     paddingHorizontal: Padding.p_3xl,
// // //     paddingVertical: Padding.p_xs,
// // //     alignSelf: "stretch",
// // //   },
// // //   componentsbuttonWrapper: {
// // //     paddingTop: Padding.p_3xs,
// // //   },

// // //   cancelButtonText: {
// // //     color: "blue", // Customize the color as needed
// // //   },

// // //   frameGroup: {
// // //     borderTopLeftRadius: Border.br_5xl,
// // //     borderTopRightRadius: Border.br_5xl,
// // //     paddingHorizontal: Padding.p_base,
// // //     paddingBottom: Padding.p_mini,
// // //     alignSelf: "stretch",
// // //     backgroundColor: Color.white,
// // //   },
// // //   frameFlexBox: {
// // //     justifyContent: "flex-end",
// // //     alignItems: "center",
// // //   },
// // //   lineParent: {
// // //     paddingTop: Padding.p_5xs,
// // //     alignSelf: "stretch",
// // //   },
// // //   searchingDistanceRadiusModa: {
// // //     // zIndex: 2,
// // //     // alignSelf: "stretch",
// // //     position: "absolute",
// // //     width: "100%",
// // //     height: "auto",
// // //   },
// // // });

// // // export default SearchingDistanceRadius;

// // // import * as React from "react";
// // // import {
// // //   StatusBar,
// // //   StyleSheet,
// // //   Pressable,
// // //   TouchableOpacity,
// // //   View,
// // //   Text,
// // //   ImageBackground,
// // //   Animated,
// // // } from "react-native";
// // // import { Image } from "expo-image";
// // // import { useState, useEffect, useRef } from "react";
// // // import { useNavigation } from "@react-navigation/native";
// // // import { FontFamily, Border, FontSize, Color, Padding } from "../GlobalStyles";
// // // import SearchingServiceProviderModal from "../components/SearchingServiceProviderModal";
// // // import MapView, { Marker, Circle } from "react-native-maps";
// // // import axios from "axios";
// // // import * as Location from "expo-location";
// // // import { Easing } from "react-native-reanimated";
// // // import { getAuth, onAuthStateChanged } from "firebase/auth";
// // // import {
// // //   getFirestore,
// // //   doc,
// // //   getDocs,
// // //   collection,
// // //   query,
// // //   where,
// // //   getDoc,
// // // } from "firebase/firestore";



// // // const SearchingDistanceRadius = ({ route }) => {
// // //   const navigation = useNavigation();

// // //   const mapRef = useRef(null);
// // //   const circleRadius = useRef(new Animated.Value(0)).current;
// // //   const colorValue = useRef(new Animated.Value(0)).current;

// // //   const {
// // //     latitude,
// // //     longitude,
// // //     sliderValue,
// // //     location,
// // //     title,
// // //     category,
// // //     extractedNames,
// // //   } = route.params;

// // //   const [userCoordinates, setUserCoordinates] = useState(null);
// // //   const [providerCoordinates, setProviderCoordinates] = useState(null);
// // //   const [distance, setDistance] = useState(null);
// // //   const [isWithinRadius, setIsWithinRadius] = useState(null);

// // //   const latitudeUser = userCoordinates ? userCoordinates.latitude : null;
// // //   const longitudeUser = userCoordinates ? userCoordinates.longitude : null;

// // //   console.log("Latitude of User:", latitude);
// // //   console.log("Longitude of User:", longitude);

// // //   useEffect(() => {
// // //     const checkAppForm3 = async () => {
// // //       try {
// // //         const userCoordinates = [latitudeUser, longitudeUser]; // Replace with actual user coordinates
// // //         const distanceThreshold = 3; // 3km threshold

// // //         const db = getFirestore();
// // //         const providerProfilesCollection = collection(db, "providerProfiles");

// // //         const providerProfilesSnapshot = await getDocs(
// // //           providerProfilesCollection
// // //         );

// // //         for (const doc of providerProfilesSnapshot.docs) {
// // //           const appForm3CollectionRef = collection(doc.ref, "appForm3");
// // //           const appForm3Snapshot = await getDocs(appForm3CollectionRef);

// // //           if (!appForm3Snapshot.empty) {
// // //             // "appForm3" collection exists in this document
// // //             console.log(`Document ${doc.id} has "appForm3" collection.`);

// // //             // Check if there is a document inside the "appForm3" collection
// // //             const querySnapshot = await getDocs(
// // //               query(
// // //                 appForm3CollectionRef,
// // //                 where("category", "array-contains-any", [title])
// // //               )
// // //             );

// // //             if (!querySnapshot.empty) {
// // //               // Filter documents on the client side
// // //               const documentsWithInstallation = querySnapshot.docs.filter(
// // //                 (doc) => doc.data().services.includes(category)
// // //               );

// // //               if (documentsWithInstallation.length > 0) {
// // //                 // Check if SubCategories include all items in the extractedNames array
// // //                 const subCategoriesArray =
// // //                   documentsWithInstallation[0].data().SubCategories;

// // //                 if (
// // //                   extractedNames.every((name) =>
// // //                     subCategoriesArray.includes(name)
// // //                   )
// // //                 ) {
// // //                   console.log(`Document ${doc.id} has everything`);

// // //                   // Retrieve coordinates from the main document (not in "appForm3" collection)
// // //                   const mainDocumentData = doc.data();
// // //                   const coordinates = mainDocumentData.coordinates;

// // //                   //console.log("Coordinates of provider: ", coordinates[0]);

// // //                   console.log("Lat of provider:", coordinates[0]);
// // //                   console.log("Long of provider:", coordinates[1]);

// // //                   // Check if coordinates is an array with at least two elements
// // //                   if (Array.isArray(coordinates) && coordinates.length >= 2) {
// // //                     const distance = calculateDistance(
// // //                       [latitudeUser, longitudeUser],
// // //                       [coordinates[0], coordinates[1]]
// // //                     );

// // //                     if (distance <= distanceThreshold) {
// // //                       console.log(
// // //                         `Document ${doc.id} is within 3km from the user.`
// // //                       );
// // //                       console.log(distance);
// // //                       console.log(distanceThreshold);
// // //                     } else {
// // //                       console.log(
// // //                         `Document ${doc.id} is outside the 3km distance from the user.`
// // //                       );
// // //                       console.log(distance);
// // //                     }
// // //                   } else {
// // //                     console.log(
// // //                       `Document ${doc.id} does not have valid coordinates.`
// // //                     );
// // //                   }
// // //                 } else {
// // //                   console.log(
// // //                     `Document ${doc.id} in "appForm3" collection does not have all SubCategories in the extractedNames array.`
// // //                   );
// // //                 }
// // //               } else {
// // //                 console.log(
// // //                   `Document ${doc.id} in "appForm3" collection does not have both Plumbing and Cleaning categories or services including installation.`
// // //                 );
// // //               }
// // //             } else {
// // //               console.log(
// // //                 `Document ${doc.id} in "appForm3" collection does not have both Plumbing and Cleaning categories.`
// // //               );
// // //             }
// // //           } else {
// // //             console.log(
// // //               `Document ${doc.id} does not have "appForm3" collection.`
// // //             );
// // //           }
// // //         }
// // //       } catch (error) {
// // //         console.error("Error checking for appForm3 collection:", error);
// // //       }
// // //     };

// // //     // Function to calculate distance between two sets of coordinates using Haversine formula
// // //     // const calculateDistance = ([lat1, lon1], [lat2, lon2]) => {
// // //     //   const R = 6371; // Radius of the Earth in kilometers
// // //     //   const dLat = deg2rad(lat2 - lat1);
// // //     //   const dLon = deg2rad(lon2 - lon1);
// // //     //   const a =
// // //     //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
// // //     //     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
// // //     //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
// // //     //   const distance = R * c; // Distance in kilometers
// // //     //   console.log("Calculated distance: ", distance);
// // //     //   return distance;
// // //     // };

// // //     // // Function to convert degrees to radians
// // //     // const deg2rad = (deg) => {
// // //     //   return deg * (Math.PI / 180);
// // //     // };

// // //     // Function to convert degrees to radians
// // //     // Function to convert degrees to radians
// // //     const deg2rad = (deg) => {
// // //       return deg * (Math.PI / 180);
// // //     };

// // //     // Function to calculate distance between two sets of coordinates using Haversine formula
// // //     const calculateDistance = ([lat1, lon1], [lat2, lon2]) => {
// // //       const R = 6371; // Radius of the Earth in kilometers
// // //       const dLat = deg2rad(lat2 - lat1);
// // //       const dLon = deg2rad(lon2 - lon1);
// // //       const a =
// // //         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
// // //         Math.cos(deg2rad(lat1)) *
// // //           Math.cos(deg2rad(lat2)) *
// // //           Math.sin(dLon / 2) *
// // //           Math.sin(dLon / 2);
// // //       const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
// // //       const distance = R * c; // Distance in kilometers
// // //       console.log("Calculated distance:", distance.toFixed(2), "kilometers");
// // //       return distance;
// // //     };

// // //     // Call the function to check for "appForm3" collection and categories: Plumbing and Cleaning
// // //     checkAppForm3();
// // //   }, []);

// // //   const stableCircleRadius = 50;

// // //   const fetchCoordinatesForCurrentUser = async () => {
// // //     try {
// // //       const auth = getAuth();
// // //       if (auth.currentUser) {
// // //         const userAuthId = auth.currentUser.uid;
// // //         const db = getFirestore();
// // //         const serviceBookingsDoc = doc(db, "serviceBookings", userAuthId);

// // //         const docSnapshot = await getDoc(serviceBookingsDoc);

// // //         if (docSnapshot.exists()) {
// // //           const data = docSnapshot.data();
// // //           const bookingsArray = data.bookings || [];

// // //           if (Array.isArray(bookingsArray) && bookingsArray.length > 0) {
// // //             bookingsArray.forEach((bookingItem, index) => {
// // //               const coordinates = bookingItem.coordinates || [];

// // //               if (Array.isArray(coordinates) && coordinates.length >= 2) {
// // //                 const latitude = coordinates[0];
// // //                 const longitude = coordinates[1];

// // //                 console.log(`Booking ${index + 1} Latitude:`, latitude);
// // //                 console.log(`Booking ${index + 1} Longitude:`, longitude);

// // //                 setUserCoordinates({ latitude, longitude });
// // //               } else {
// // //                 console.log(
// // //                   `Invalid coordinates array format in Booking ${index + 1}:`,
// // //                   coordinates
// // //                 );
// // //               }
// // //             });
// // //           } else {
// // //             console.log(
// // //               "Invalid 'bookings' array format or empty array:",
// // //               bookingsArray
// // //             );
// // //           }
// // //         } else {
// // //           console.log("Document not found with ID:", userAuthId);
// // //         }
// // //       } else {
// // //         console.log("No signed-in user");
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching coordinates for user:", error);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchCoordinatesForCurrentUser();
// // //   }, []);

// // //   useEffect(() => {
// // //     const circleAnimation = Animated.loop(
// // //       Animated.timing(circleRadius, {
// // //         toValue: sliderValue * 1000,
// // //         duration: 1500,
// // //         easing: Easing.inOut(Easing.ease),
// // //         useNativeDriver: false,
// // //       })
// // //     );

// // //     const colorAnimation = Animated.loop(
// // //       Animated.timing(colorValue, {
// // //         toValue: 1,
// // //         duration: 1500,
// // //         easing: Easing.inOut(Easing.ease),
// // //         useNativeDriver: false,
// // //       })
// // //     );

// // //     circleAnimation.start();
// // //     colorAnimation.start();

// // //     return () => {
// // //       circleAnimation.stop();
// // //       colorAnimation.stop();
// // //     };
// // //   }, [sliderValue]);

// // //   const circleColor = colorValue.interpolate({
// // //     inputRange: [0, 1],
// // //     outputRange: ["rgba(70, 130, 180, 0)", "rgba(70, 130, 180, 0.5)"], // Slightly darker sky blue color
// // //   });

// // //   const [isInputFocused, setIsInputFocused] = useState(false);

// // //   const [initialMapRegion, setInitialMapRegion] = useState({
// // //     latitude: latitude,
// // //     longitude: longitude,
// // //     latitudeDelta: 0.16,
// // //     longitudeDelta: 0.16,
// // //   });

// // //   const [initialMarkerPosition, setInitialMarkerPosition] = useState({
// // //     latitude: latitude,
// // //     longitude: longitude,
// // //   });

// // //   const [markerPosition, setMarkerPosition] = useState(initialMarkerPosition);
// // //   const [reverseGeocodedAddress, setReverseGeocodedAddress] = useState(null);
// // //   const [editLocationVisible, setEditLocationVisible] = useState(false);
// // //   const [cityAddress, setCityAddress] = useState(null);

// // //   const fetchReverseGeolocation = async (latitude, longitude) => {
// // //     try {
// // //       const apiKey = "AIzaSyAuaR8dxr95SLUTU-cidS7I-3uB6mEoJmA";
// // //       const response = await axios.get(
// // //         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
// // //       );
// // //       if (response.data.results && response.data.results.length > 0) {
// // //         const firstResult = response.data.results[0];
// // //         const formattedAddress = firstResult.formatted_address;

// // //         // Extracting the city from the formatted address
// // //         const addressComponents = firstResult.address_components;
// // //         let city = "";
// // //         for (const component of addressComponents) {
// // //           if (component.types.includes("locality")) {
// // //             city = component.long_name;
// // //             break;
// // //           }
// // //         }
// // //         setReverseGeocodedAddress(formattedAddress);
// // //         setCityAddress(city);
// // //         // Console.log the city
// // //         console.log("City:", city);
// // //       } else {
// // //         setReverseGeocodedAddress("Location not found");
// // //         console.log("Location not found");
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching reverse geolocation:", error);
// // //     }
// // //   };

// // //   const gotoUserLocation = async () => {
// // //     try {
// // //       const { status } = await Location.requestForegroundPermissionsAsync();

// // //       if (status === "granted") {
// // //         const location = await Location.getCurrentPositionAsync({});
// // //         const { latitude, longitude } = location.coords;
// // //         setMarkerPosition({ latitude, longitude });
// // //         setInitialMapRegion({
// // //           latitude,
// // //           longitude,
// // //           latitudeDelta: 0.0922,
// // //           longitudeDelta: 0.0421,
// // //         });
// // //         setInitialMarkerPosition({ latitude, longitude });
// // //         fetchReverseGeolocation(latitude, longitude);
// // //       } else {
// // //         console.error("Location permission denied");
// // //       }
// // //     } catch (error) {
// // //       console.error("Error getting user location:", error);
// // //     }
// // //   };

// // //   const goToMarker = () => {
// // //     setInitialMapRegion({
// // //       ...markerPosition,
// // //       latitudeDelta: 0.0922,
// // //       longitudeDelta: 0.0421,
// // //     });
// // //   };

// // //   useEffect(() => {
// // //     if (markerPosition) {
// // //       fetchReverseGeolocation(
// // //         markerPosition.latitude,
// // //         markerPosition.longitude
// // //       );
// // //     }
// // //     console.log("Is TextInput focused:", isInputFocused);
// // //   }, [markerPosition, isInputFocused]);

// // //   const handlePlaceSelect = (data, details = null) => {
// // //     if (details) {
// // //       const { lat, lng } = details.geometry.location;
// // //       setMarkerPosition({ latitude: lat, longitude: lng });
// // //       setInitialMapRegion({
// // //         latitude: lat,
// // //         longitude: lng,
// // //         latitudeDelta: 0.0922,
// // //         longitudeDelta: 0.0421,
// // //       });
// // //       setEditLocationVisible(false);
// // //     }
// // //   };

// // //   return (
// // //     <View style={styles.searchingDistanceRadius}>
// // //       <StatusBar barStyle="default" />
// // //       <View style={[styles.body, styles.frameFlexBox]}>
// // //         <View style={styles.rowContainer}>
// // //           <MapView
// // //             style={styles.map}
// // //             region={initialMapRegion}
// // //             // onPress={handleMapPress}
// // //             // provider={PROVIDER_GOOGLE}
// // //           >
// // //             <Marker
// // //               coordinate={markerPosition}
// // //               title="Pinned Location"
// // //               draggable={false}
// // //               // onDragEnd={handleMarkerDragEnd}
// // //               image={require("../assets/icons8location100-2-1.png")}
// // //             />
// // //             {/* <Circle
// // //               center={markerPosition}
// // //               radius={(sliderValue ? sliderValue * 1000 : 3000)}
// // //               strokeWidth={2}
// // //               strokeColor="#1A244D"
// // //               fillColor="rgba(211, 211, 211, 0.4)"
// // //             /> */}
// // //             <AnimatedCircle
// // //               center={markerPosition}
// // //               radius={circleRadius}
// // //               fillColor={circleColor}
// // //             />
// // //           </MapView>
// // //         </View>

// // //         <View style={[styles.backBtnWrapper, styles.valueEditThisPosition]}>
// // //           <Pressable
// // //             style={[styles.backBtn, styles.editWrapperFlexBox]}
// // //             onPress={() => navigation.goBack()}
// // //           >
// // //             <Image
// // //               style={styles.uiIconarrowBackwardfilled}
// // //               contentFit="cover"
// // //               source={require("../assets/ui-iconarrow-backwardfilled.png")}
// // //             />
// // //           </Pressable>
// // //         </View>
// // //         <View style={[styles.searchingDistanceRadiusModa]}>
// // //           <SearchingServiceProviderModal
// // //             cityAddress={cityAddress}
// // //             specificLocation={reverseGeocodedAddress || "Loading..."}
// // //             latitude={latitude}
// // //             longitude={longitude}
// // //             city={cityAddress}
// // //             location={location} // Pass the location prop
// // //             title={title}
// // //             category={category}
// // //           />
// // //         </View>
// // //       </View>
// // //     </View>
// // //   );
// // // };

// // // const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// // // const styles = StyleSheet.create({
// // //   searchingDistanceRadius: {
// // //     width: "100%",
// // //     height: 812,
// // //     alignItems: "center",
// // //     flex: 1,
// // //     backgroundColor: Color.white,
// // //   },
// // //   body: {
// // //     alignSelf: "stretch",
// // //     flex: 1,
// // //   },
// // //   frameParent: {
// // //     alignSelf: "stretch",
// // //     flex: 1,
// // //   },
// // //   backBtnWrapper: {
// // //     left: 16,
// // //     paddingHorizontal: 0,
// // //     paddingVertical: Padding.p_mini,
// // //     zIndex: 0,
// // //     flexDirection: "row",
// // //   },
// // //   valueEditThisPosition: {
// // //     top: 0,
// // //     flexDirection: "row",
// // //     position: "absolute",
// // //   },
// // //   backBtn: {
// // //     height: 40,
// // //     paddingHorizontal: Padding.p_xs,
// // //     paddingVertical: Padding.p_9xs,
// // //     width: 40,
// // //     borderRadius: Border.br_xl,
// // //     flexDirection: "row",
// // //     backgroundColor: Color.white,
// // //   },
// // //   editWrapperFlexBox: {
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //   },
// // //   uiIconarrowBackwardfilled: {
// // //     width: 24,
// // //     height: 24,
// // //     overflow: "hidden",
// // //   },
// // //   icons8Location10021Wrapper: {
// // //     top: 252,
// // //     left: 28,
// // //     padding: Padding.p_3xs,
// // //     zIndex: 1,
// // //     overflow: "hidden",
// // //     position: "absolute",
// // //     justifyContent: "flex-end",
// // //     alignItems: "center",
// // //   },
// // //   icons8Location10021: {
// // //     width: 50,
// // //     height: 50,
// // //   },

// // //   // Location Styles
// // //   rowContainer: {
// // //     flex: 1,
// // //     flexDirection: "row",
// // //   },
// // //   map: {
// // //     flex: 1,
// // //     // zIndex: 1,
// // //   },

// // //   // Searching Distance Radius Modal Styles
// // //   kmTypo: {
// // //     textAlign: "center",
// // //     fontFamily: FontFamily.title2Bold32,
// // //     fontWeight: "700",
// // //   },
// // //   sliderFrameParentFlexBox: {
// // //     marginTop: 15,
// // //     justifyContent: "center",
// // //     alignSelf: "stretch",
// // //     alignItems: "center",
// // //   },
// // //   valueEditThisLayout: {
// // //     height: 4,
// // //     borderRadius: Border.br_5xs,
// // //   },
// // //   textTypo: {
// // //     fontSize: FontSize.level2Medium12_size,
// // //     textAlign: "center",
// // //   },
// // //   iconLayout: {
// // //     height: 30,
// // //     width: 30,
// // //   },
// // //   addressDetailsBtnBg: {
// // //     backgroundColor: Color.colorWhitesmoke_300,
// // //     flexDirection: "row",
// // //   },
// // //   addAddressDetailsClr: {
// // //     color: Color.colorDarkgray_300,
// // //     textAlign: "left",
// // //   },
// // //   iconOutlineFlexBox: {
// // //     padding: Padding.p_12xs,
// // //     justifyContent: "center",
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //   },
// // //   componentsbuttonFlexBox: {
// // //     backgroundColor: Color.colorDarkslategray_900,
// // //     justifyContent: "center",
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //   },
// // //   bookmarkIconPosition: {
// // //     height: 15,
// // //     width: 15,
// // //     left: 5,
// // //     top: 5,
// // //     position: "absolute",
// // //   },
// // //   componentsFlexBox: {
// // //     borderRadius: Border.br_5xs,
// // //     marginTop: 15,
// // //     justifyContent: "center",
// // //     alignSelf: "stretch",
// // //     alignItems: "center",
// // //   },
// // //   editTypo: {
// // //     fontFamily: FontFamily.montserratMedium,
// // //     fontWeight: "500",
// // //     lineHeight: 20,
// // //     alignSelf: "stretch",
// // //   },
// // //   frameChild: {
// // //     borderStyle: "solid",
// // //     borderColor: Color.colorDarkgray_400,
// // //     borderTopWidth: 2,
// // //     height: 2,
// // //     width: 40,
// // //   },
// // //   searchingDistanceRadius1: {
// // //     fontSize: FontSize.bodyLgBodyLgRegular_size,
// // //     lineHeight: 21,
// // //     color: Color.colorGray_700,
// // //   },
// // //   searchingDistanceRadiusWrapper: {
// // //     marginTop: 12,
// // //     flexDirection: "row",
// // //     alignSelf: "stretch",
// // //   },
// // //   frameItem: {
// // //     width: 342,
// // //     marginTop: 12,
// // //     height: 2,
// // //   },

// // //   spacer: {
// // //     width: 4,
// // //     height: 1,
// // //   },
// // //   text: {
// // //     lineHeight: 16,
// // //     fontWeight: "600",
// // //     fontFamily: FontFamily.level2Semibold12,
// // //     color: Color.gray100,
// // //   },
// // //   tooltip: {
// // //     borderRadius: Border.br_9xs,
// // //     backgroundColor: Color.gray700,
// // //     shadowColor: "rgba(55, 65, 81, 0.06)",
// // //     shadowOffset: {
// // //       width: 0,
// // //       height: 1,
// // //     },
// // //     shadowRadius: 2,
// // //     elevation: 2,
// // //     shadowOpacity: 1,
// // //     paddingHorizontal: Padding.p_9xs,
// // //     paddingVertical: Padding.p_11xs,
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //   },
// // //   atomSliderTooltip: {
// // //     flexDirection: "row",
// // //   },
// // //   bgIcon: {
// // //     marginTop: 5,
// // //   },
// // //   atomSliderDragHandle: {
// // //     height: 20,
// // //   },
// // //   valueEditThis: {
// // //     left: 0,
// // //     backgroundColor: Color.blue500,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     flexDirection: "row",
// // //     top: 0,
// // //     position: "absolute",
// // //   },
// // //   atomSliderRangeNew: {
// // //     backgroundColor: Color.gray200,
// // //     alignSelf: "stretch",
// // //   },
// // //   sliderFrame: {
// // //     paddingRight: Padding.p_131xl,
// // //     flex: 1,
// // //   },
// // //   km: {
// // //     fontSize: FontSize.title3Bold20_size,
// // //     lineHeight: 26,
// // //     color: Color.neutral07,
// // //   },
// // //   kmWrapper: {
// // //     marginLeft: 10,
// // //     flexDirection: "row",
// // //   },
// // //   sliderFrameParent: {
// // //     flexDirection: "row",
// // //   },
// // //   uscTalamban: {
// // //     fontFamily: FontFamily.montserratBold,
// // //     color: Color.heading,
// // //     textAlign: "left",
// // //     lineHeight: 32,
// // //     fontSize: FontSize.body1Semibold_size,
// // //     fontWeight: "700",
// // //     alignSelf: "stretch",
// // //   },
// // //   barangayNasipitTalamban: {
// // //     fontSize: FontSize.typographyTaglineSmallRegular_size,
// // //     fontFamily: FontFamily.montserratMedium,
// // //     fontWeight: "500",
// // //     lineHeight: 20,
// // //     alignSelf: "stretch",
// // //   },
// // //   uscTalambanParent: {
// // //     marginLeft: 8,
// // //     overflow: "hidden",
// // //     flex: 1,
// // //   },
// // //   whiteBookmarkIcon: {
// // //     zIndex: 0,
// // //   },
// // //   grayBookmarkIcon: {
// // //     display: "none",
// // //     zIndex: 1,
// // //   },
// // //   whiteBookmarkParent: {
// // //     width: 25,
// // //     height: 25,
// // //     borderRadius: Border.br_xl,
// // //   },
// // //   savedPlaces: {
// // //     marginLeft: 8,
// // //     borderRadius: Border.br_xl,
// // //   },
// // //   componentsSearchDefault: {
// // //     paddingLeft: Padding.p_8xs,
// // //     paddingTop: Padding.p_xs,
// // //     paddingRight: Padding.p_3xs,
// // //     paddingBottom: Padding.p_xs,
// // //     borderRadius: Border.br_5xs,
// // //     marginTop: 15,
// // //     justifyContent: "center",
// // //     alignSelf: "stretch",
// // //     alignItems: "center",
// // //   },
// // //   addAddressDetails: {
// // //     fontFamily: FontFamily.montserratRegular,
// // //     lineHeight: 32,
// // //     color: Color.colorDarkgray_300,
// // //     fontSize: FontSize.level2Medium12_size,
// // //     flex: 1,
// // //   },
// // //   addressDetailsFrame: {
// // //     flexDirection: "row",
// // //     flex: 1,
// // //   },
// // //   edit: {
// // //     color: Color.colorDeepskyblue_100,
// // //     display: "flex",
// // //     width: 34,
// // //     fontSize: FontSize.level2Medium12_size,
// // //     textAlign: "center",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //   },
// // //   editBtn: {
// // //     marginLeft: 5,
// // //     flexDirection: "row",
// // //     alignSelf: "stretch",
// // //   },
// // //   addressDetailsBtn: {
// // //     borderRadius: Border.br_3xs,
// // //     paddingLeft: Padding.p_3xs,
// // //     paddingTop: Padding.p_8xs,
// // //     paddingRight: Padding.p_8xs,
// // //     paddingBottom: Padding.p_8xs,
// // //     flex: 1,
// // //   },
// // //   componentsSearchDefault1: {
// // //     overflow: "hidden",
// // //     flexDirection: "row",
// // //   },
// // //   viewAllServices: {
// // //     letterSpacing: -0.1,
// // //     lineHeight: 24,
// // //     color: Color.neutral01,
// // //     fontSize: FontSize.body1Semibold_size,
// // //     textAlign: "center",
// // //     fontFamily: FontFamily.title2Bold32,
// // //     fontWeight: "700",
// // //   },
// // //   componentsbutton: {
// // //     borderRadius: Border.br_mini,
// // //     paddingHorizontal: Padding.p_3xl,
// // //     paddingVertical: Padding.p_xs,
// // //     alignSelf: "stretch",
// // //   },
// // //   componentsbuttonWrapper: {
// // //     paddingTop: Padding.p_3xs,
// // //   },

// // //   cancelButtonText: {
// // //     color: "blue", // Customize the color as needed
// // //   },

// // //   frameGroup: {
// // //     borderTopLeftRadius: Border.br_5xl,
// // //     borderTopRightRadius: Border.br_5xl,
// // //     paddingHorizontal: Padding.p_base,
// // //     paddingBottom: Padding.p_mini,
// // //     alignSelf: "stretch",
// // //     backgroundColor: Color.white,
// // //   },
// // //   frameFlexBox: {
// // //     justifyContent: "flex-end",
// // //     alignItems: "center",
// // //   },
// // //   lineParent: {
// // //     paddingTop: Padding.p_5xs,
// // //     alignSelf: "stretch",
// // //   },
// // //   searchingDistanceRadiusModa: {
// // //     // zIndex: 2,
// // //     // alignSelf: "stretch",
// // //     position: "absolute",
// // //     width: "100%",
// // //     height: "auto",
// // //   },
// // // });

// // // export default SearchingDistanceRadius;

// // import * as React from "react";
// // import {
// //   StatusBar,
// //   StyleSheet,
// //   Pressable,
// //   TouchableOpacity,
// //   View,
// //   Text,
// //   ImageBackground,
// //   Animated,
// // } from "react-native";
// // import { Image } from "expo-image";
// // import { useState, useEffect, useRef } from "react";
// // import { useNavigation } from "@react-navigation/native";
// // import { FontFamily, Border, FontSize, Color, Padding } from "../GlobalStyles";
// // import SearchingServiceProviderModal from "../components/SearchingServiceProviderModal";
// // import MapView, { Marker, Circle } from "react-native-maps";
// // import axios from "axios";
// // import * as Location from "expo-location";
// // import { Easing } from "react-native-reanimated";
// // import { getAuth, onAuthStateChanged } from "firebase/auth";
// // import {
// //   getFirestore,
// //   doc,
// //   getDocs,
// //   collection,
// //   query,
// //   where,
// //   getDoc,
// // } from "firebase/firestore";
// // import * as geolib from "geolib";

// // const SearchingDistanceRadius = ({ route }) => {
// //   const navigation = useNavigation();

// //   const mapRef = useRef(null);
// //   const circleRadius = useRef(new Animated.Value(0)).current;
// //   const colorValue = useRef(new Animated.Value(0)).current;

// //   const geolib = require("geolib");

// //   const {
// //     latitude,
// //     longitude,
// //     sliderValue,
// //     location,
// //     title,
// //     category,
// //     extractedNames,
// //   } = route.params;

// //   const [userCoordinates, setUserCoordinates] = useState(null);
// //   const [providerCoordinates, setProviderCoordinates] = useState(null);
// //   const [distance, setDistance] = useState(null);
// //   const [isWithinRadius, setIsWithinRadius] = useState(null);

// //   console.log("User lat:", latitude);
// //   console.log("User long:", longitude);

// //   console.log("The title is: ", title);
// //   console.log("The category is: ", category);

// //   // const fetchCoordinatesForCurrentUser = () => {
// //   //   const auth = getAuth();
// //   //   const userAuthId = auth.currentUser?.uid;

// //   //   if (!userAuthId) {
// //   //     return Promise.reject(new Error("No signed-in user"));
// //   //   }

// //   //   const db = getFirestore();
// //   //   const serviceBookingsDoc = doc(db, "serviceBookings", userAuthId);

// //   //   return getDoc(serviceBookingsDoc)
// //   //     .then((docSnapshot) => {
// //   //       if (docSnapshot.exists()) {
// //   //         const data = docSnapshot.data();
// //   //         const bookingsArray = data.bookings || [];

// //   //         if (Array.isArray(bookingsArray) && bookingsArray.length > 0) {
// //   //           const firstBooking = bookingsArray[0];
// //   //           const coordinates = firstBooking.coordinates || [];

// //   //           if (Array.isArray(coordinates) && coordinates.length >= 2) {
// //   //             const [latitude, longitude] = coordinates;
// //   //             console.log("Latitude of User:", latitude);
// //   //             console.log("Longitude of User:", longitude);
// //   //             setUserCoordinates({ latitude, longitude });
// //   //             return Promise.resolve({ latitude, longitude });
// //   //           } else {
// //   //             return Promise.reject(new Error("Invalid coordinates array format"));
// //   //           }
// //   //         } else {
// //   //           return Promise.reject(new Error("Invalid 'bookings' array format or empty array"));
// //   //         }
// //   //       } else {
// //   //         return Promise.reject(new Error(`Document not found with ID: ${userAuthId}`));
// //   //       }
// //   //     })
// //   //     .catch((error) => {
// //   //       console.error("Error fetching coordinates for user:", error);
// //   //       return Promise.reject(error);
// //   //     });
// //   // };

// //   // // console.log("Latitude of User:", latitude ?? "N/A");
// //   // // console.log("Longitude of User:", longitude ?? "N/A");

// //   const calculateDistance = ([lat1, lon1], [lat2, lon2]) => {
// //     if (lat1 === null || lon1 === null || lat2 === null || lon2 === null) {
// //       console.error("Invalid coordinates");
// //       return null;
// //     }

// //     const distance = geolib.getDistance(
// //       { latitude: lat1, longitude: lon1 },
// //       { latitude: lat2, longitude: lon2 }
// //     );

// //     const kmDistance = distance / 1000;

// //     console.log("Calculated distance between the two:", kmDistance.toFixed(2));

// //     return kmDistance;
// //   };

// //   // const checkAppForm3 = async () => {
// //   //   try {
// //   //     const distanceThreshold = 3; // 3km threshold

// //   //     const db = getFirestore();
// //   //     const providerProfilesCollection = collection(db, "providerProfiles");

// //   //     const providerProfilesSnapshot = await getDocs(
// //   //       providerProfilesCollection
// //   //     );

// //   //     for (const doc of providerProfilesSnapshot.docs) {
// //   //       const appForm3CollectionRef = collection(doc.ref, "appForm3");
// //   //       const appForm3Snapshot = await getDocs(appForm3CollectionRef);

// //   //       if (!appForm3Snapshot.empty) {
// //   //         // "appForm3" collection exists in this document
// //   //         console.log(`Document ${doc.id} has "appForm3" collection.`);

// //   //         // Check if there is a document inside the "appForm3" collection
// //   //         const querySnapshot = await getDocs(
// //   //           query(
// //   //             appForm3CollectionRef,
// //   //             where("category", "array-contains-any", [title])
// //   //           )
// //   //         );

// //   //         if (!querySnapshot.empty) {
// //   //           // Filter documents on the client side
// //   //           const documentsWithInstallation = querySnapshot.docs.filter(
// //   //             (doc) => doc.data().services.includes(category)
// //   //           );

// //   //           if (documentsWithInstallation.length > 0) {
// //   //             // Check if SubCategories include all items in the extractedNames array
// //   //             const subCategoriesArray =
// //   //               documentsWithInstallation[0].data().SubCategories;

// //   //             if (
// //   //               extractedNames.every((name) =>
// //   //                 subCategoriesArray.includes(name)
// //   //               )
// //   //             ) {
// //   //               console.log(`Document ${doc.id} has everything`);

// //   //               // Retrieve coordinates from the main document (not in "appForm3" collection)
// //   //               const mainDocumentData = doc.data();
// //   //               const coordinates = mainDocumentData.coordinates;

// //   //               console.log("Lat of provider:", coordinates[0]);
// //   //               console.log("Long of provider:", coordinates[1]);

// //   //               //Check if coordinates is an array with at least two elements
// //   //               if (Array.isArray(coordinates) && coordinates.length >= 2) {

// //   //                 // fetchCoordinatesForCurrentUser()

// //   //                 const distance = calculateDistance(
// //   //                   [latitude, longitude],
// //   //                   [coordinates[0], coordinates[1]]
// //   //                 );

// //   //                 if (distance <= distanceThreshold) {
// //   //                   console.log(
// //   //                     `Document ${doc.id} is within 3km from the user.`
// //   //                   );
// //   //                   console.log(distance);
// //   //                   console.log(distanceThreshold);
// //   //                 } else {
// //   //                   console.log(
// //   //                     `Document ${doc.id} is outside the 3km distance from the user.`
// //   //                   );
// //   //                   console.log(distance);
// //   //                 }

// //   //               } else {
// //   //                 console.log(
// //   //                   `Document ${doc.id} does not have valid coordinates.`
// //   //                 );
// //   //               }
// //   //             } else {
// //   //               console.log(
// //   //                 `Document ${doc.id} in "appForm3" collection does not have all SubCategories in the extractedNames array.`
// //   //               );
// //   //             }
// //   //           } else {
// //   //             console.log(
// //   //               `Document ${doc.id} in "appForm3" collection does not have both Plumbing and Cleaning categories or services including installation.`
// //   //             );
// //   //           }
// //   //         } else {
// //   //           console.log(
// //   //             `Document ${doc.id} in "appForm3" collection does not have both Plumbing and Cleaning categories.`
// //   //           );
// //   //         }
// //   //       } else {
// //   //         console.log(`Document ${doc.id} does not have "appForm3" collection.`);
// //   //       }
// //   //     }
// //   //   } catch (error) {
// //   //     console.error("Error checking for appForm3 collection:", error);
// //   //   }
// //   // };

// //   const checkAppForm3 = async () => {
// //     try {
// //       const distanceThreshold = 3; // 3km threshold

// //       const db = getFirestore();
// //       const providerProfilesCollection = collection(db, "providerProfiles");

// //       const providerProfilesSnapshot = await getDocs(
// //         providerProfilesCollection
// //       );

// //       for (const doc of providerProfilesSnapshot.docs) {
// //         const data = doc.data();

// //         // Log availability for each document
// //         console.log(`Document ${doc.id}, Availability: ${data.availability}`);

// //         // Ensure data object and availability property exist
// //         if (data && data.availability === true) {
// //           const appForm3CollectionRef = collection(doc.ref, "appForm3");
// //           const appForm3Snapshot = await getDocs(appForm3CollectionRef);

// //           console.log("This is available");

// //           if (!appForm3Snapshot.empty) {
// //             console.log(`Document ${doc.id} has "appForm3" collection.`);

// //             // Check if there is a document inside the "appForm3" collection
// //             const querySnapshot = await getDocs(
// //               query(
// //                 appForm3CollectionRef,
// //                 where("category", "array-contains-any", [title])
// //               )
// //             );

// //             if (!querySnapshot.empty) {
// //               const documentsWithInstallation = querySnapshot.docs.filter(
// //                 (doc) => doc.data().services.includes(category)
// //               );

// //               // if (documentsWithInstallation.length > 0) {
// //               //   // Check if SubCategories include all items in the extractedNames array
// //               //   const subCategoriesArray =
// //               //     documentsWithInstallation[0].data().SubCategories;

// //               console.log("title is found");

// //               if (documentsWithInstallation.length > 0) {
// //                 const subCategoriesArray =
// //                   documentsWithInstallation[0].data().SubCategories;

// //                 if (
// //                   extractedNames.every((name) =>
// //                     subCategoriesArray.includes(name)
// //                   )
// //                 ) {
// //                   console.log(`Document ${doc.id} has everything`);

// //                   const mainDocumentData = doc.data();
// //                   const coordinates = mainDocumentData.coordinates;

// //                   console.log("Lat of provider:", coordinates[0]);
// //                   console.log("Long of provider:", coordinates[1]);

// //                   if (Array.isArray(coordinates) && coordinates.length >= 2) {

// //                     const distance = calculateDistance(
// //                       [latitude, longitude],
// //                       [coordinates[0], coordinates[1]]
// //                     );
    
// //                     if (distance <= distanceThreshold) {
// //                       console.log(
// //                         `Document ${doc.id} is within 3km from the user.`
// //                       );
// //                       console.log(distance);
// //                       console.log(distanceThreshold);
// //                     } else {
// //                       console.log(
// //                         `Document ${doc.id} is outside the 3km distance from the user.`
// //                       );
// //                       console.log(distance);
// //                     }
    
                  
// //                   } else {
// //                     console.log(
// //                       `Document ${doc.id} does not have valid coordinates.`
// //                     );
// //                   }
// //                 } else {
// //                   console.log(
// //                     `Document ${doc.id} in "appForm3" collection does not have all SubCategories in the extractedNames array.`
// //                   );
// //                 }
// //               } else {
// //                 console.log(
// //                   `Document ${doc.id} in "appForm3" collection does not have both title and category.`
// //                 );
// //               }

// //               // }
// //             } else {
// //               console.log("title is not found");
// //             }
// //           } else {
// //             console.log(
// //               `Document ${doc.id} does not have "appForm3" collection.`
// //             );
// //           }
// //         } else {
// //           console.log(
// //             `Document ${doc.id} is either not available or availability is not a boolean or not set to true.`
// //           );
// //         }
// //       }
// //     } catch (error) {
// //       console.error("Error checking for appForm3 collection:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     checkAppForm3();
// //   }, []);

// //   const stableCircleRadius = 50;

// //   useEffect(() => {
// //     const circleAnimation = Animated.loop(
// //       Animated.timing(circleRadius, {
// //         toValue: sliderValue * 1000,
// //         duration: 1500,
// //         easing: Easing.inOut(Easing.ease),
// //         useNativeDriver: false,
// //       })
// //     );

// //     const colorAnimation = Animated.loop(
// //       Animated.timing(colorValue, {
// //         toValue: 1,
// //         duration: 1500,
// //         easing: Easing.inOut(Easing.ease),
// //         useNativeDriver: false,
// //       })
// //     );

// //     circleAnimation.start();
// //     colorAnimation.start();

// //     return () => {
// //       circleAnimation.stop();
// //       colorAnimation.stop();
// //     };
// //   }, [sliderValue]);

// //   const circleColor = colorValue.interpolate({
// //     inputRange: [0, 1],
// //     outputRange: ["rgba(70, 130, 180, 0)", "rgba(70, 130, 180, 0.5)"], // Slightly darker sky blue color
// //   });

// //   const [isInputFocused, setIsInputFocused] = useState(false);

// //   const [initialMapRegion, setInitialMapRegion] = useState({
// //     latitude: latitude,
// //     longitude: longitude,
// //     latitudeDelta: 0.16,
// //     longitudeDelta: 0.16,
// //   });

// //   const [initialMarkerPosition, setInitialMarkerPosition] = useState({
// //     latitude: latitude,
// //     longitude: longitude,
// //   });

// //   const [markerPosition, setMarkerPosition] = useState(initialMarkerPosition);
// //   const [reverseGeocodedAddress, setReverseGeocodedAddress] = useState(null);
// //   const [editLocationVisible, setEditLocationVisible] = useState(false);
// //   const [cityAddress, setCityAddress] = useState(null);

// //   const fetchReverseGeolocation = async (latitude, longitude) => {
// //     try {
// //       const apiKey = "AIzaSyAuaR8dxr95SLUTU-cidS7I-3uB6mEoJmA";
// //       const response = await axios.get(
// //         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
// //       );
// //       if (response.data.results && response.data.results.length > 0) {
// //         const firstResult = response.data.results[0];
// //         const formattedAddress = firstResult.formatted_address;

// //         // Extracting the city from the formatted address
// //         const addressComponents = firstResult.address_components;
// //         let city = "";
// //         for (const component of addressComponents) {
// //           if (component.types.includes("locality")) {
// //             city = component.long_name;
// //             break;
// //           }
// //         }
// //         setReverseGeocodedAddress(formattedAddress);
// //         setCityAddress(city);
// //         // Console.log the city
// //         console.log("City:", city);
// //       } else {
// //         setReverseGeocodedAddress("Location not found");
// //         console.log("Location not found");
// //       }
// //     } catch (error) {
// //       console.error("Error fetching reverse geolocation:", error);
// //     }
// //   };

// //   const gotoUserLocation = async () => {
// //     try {
// //       const { status } = await Location.requestForegroundPermissionsAsync();

// //       if (status === "granted") {
// //         const location = await Location.getCurrentPositionAsync({});
// //         const { latitude, longitude } = location.coords;
// //         setMarkerPosition({ latitude, longitude });
// //         setInitialMapRegion({
// //           latitude,
// //           longitude,
// //           latitudeDelta: 0.0922,
// //           longitudeDelta: 0.0421,
// //         });
// //         setInitialMarkerPosition({ latitude, longitude });
// //         fetchReverseGeolocation(latitude, longitude);
// //       } else {
// //         console.error("Location permission denied");
// //       }
// //     } catch (error) {
// //       console.error("Error getting user location:", error);
// //     }
// //   };

// //   const goToMarker = () => {
// //     setInitialMapRegion({
// //       ...markerPosition,
// //       latitudeDelta: 0.0922,
// //       longitudeDelta: 0.0421,
// //     });
// //   };

// //   useEffect(() => {
// //     if (markerPosition) {
// //       fetchReverseGeolocation(
// //         markerPosition.latitude,
// //         markerPosition.longitude
// //       );
// //     }
// //     console.log("Is TextInput focused:", isInputFocused);
// //   }, [markerPosition, isInputFocused]);

// //   const handlePlaceSelect = (data, details = null) => {
// //     if (details) {
// //       const { lat, lng } = details.geometry.location;
// //       setMarkerPosition({ latitude: lat, longitude: lng });
// //       setInitialMapRegion({
// //         latitude: lat,
// //         longitude: lng,
// //         latitudeDelta: 0.0922,
// //         longitudeDelta: 0.0421,
// //       });
// //       setEditLocationVisible(false);
// //     }
// //   };

// //   return (
// //     <View style={styles.searchingDistanceRadius}>
// //       <StatusBar barStyle="default" />
// //       <View style={[styles.body, styles.frameFlexBox]}>
// //         <View style={styles.rowContainer}>
// //           <MapView
// //             style={styles.map}
// //             region={initialMapRegion}
// //             // onPress={handleMapPress}
// //             // provider={PROVIDER_GOOGLE}
// //           >
// //             <Marker
// //               coordinate={markerPosition}
// //               title="Pinned Location"
// //               draggable={false}
// //               // onDragEnd={handleMarkerDragEnd}
// //               image={require("../assets/icons8location100-2-1.png")}
// //             />
// //             {/* <Circle
// //               center={markerPosition}
// //               radius={(sliderValue ? sliderValue * 1000 : 3000)}
// //               strokeWidth={2}
// //               strokeColor="#1A244D"
// //               fillColor="rgba(211, 211, 211, 0.4)"
// //             /> */}
// //             <AnimatedCircle
// //               center={markerPosition}
// //               radius={circleRadius}
// //               fillColor={circleColor}
// //             />
// //           </MapView>
// //         </View>

// //         <View style={[styles.backBtnWrapper, styles.valueEditThisPosition]}>
// //           <Pressable
// //             style={[styles.backBtn, styles.editWrapperFlexBox]}
// //             onPress={() => navigation.goBack()}
// //           >
// //             <Image
// //               style={styles.uiIconarrowBackwardfilled}
// //               contentFit="cover"
// //               source={require("../assets/ui-iconarrow-backwardfilled.png")}
// //             />
// //           </Pressable>
// //         </View>
// //         <View style={[styles.searchingDistanceRadiusModa]}>
// //           <SearchingServiceProviderModal
// //             cityAddress={cityAddress}
// //             specificLocation={reverseGeocodedAddress || "Loading..."}
// //             latitude={latitude}
// //             longitude={longitude}
// //             city={cityAddress}
// //             location={location} // Pass the location prop
// //             title={title}
// //             category={category}
// //           />
// //         </View>
// //       </View>
// //     </View>
// //   );
// // };

// // const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// // const styles = StyleSheet.create({
// //   searchingDistanceRadius: {
// //     width: "100%",
// //     height: 812,
// //     alignItems: "center",
// //     flex: 1,
// //     backgroundColor: Color.white,
// //   },
// //   body: {
// //     alignSelf: "stretch",
// //     flex: 1,
// //   },
// //   frameParent: {
// //     alignSelf: "stretch",
// //     flex: 1,
// //   },
// //   backBtnWrapper: {
// //     left: 16,
// //     paddingHorizontal: 0,
// //     paddingVertical: Padding.p_mini,
// //     zIndex: 0,
// //     flexDirection: "row",
// //   },
// //   valueEditThisPosition: {
// //     top: 0,
// //     flexDirection: "row",
// //     position: "absolute",
// //   },
// //   backBtn: {
// //     height: 40,
// //     paddingHorizontal: Padding.p_xs,
// //     paddingVertical: Padding.p_9xs,
// //     width: 40,
// //     borderRadius: Border.br_xl,
// //     flexDirection: "row",
// //     backgroundColor: Color.white,
// //   },
// //   editWrapperFlexBox: {
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   uiIconarrowBackwardfilled: {
// //     width: 24,
// //     height: 24,
// //     overflow: "hidden",
// //   },
// //   icons8Location10021Wrapper: {
// //     top: 252,
// //     left: 28,
// //     padding: Padding.p_3xs,
// //     zIndex: 1,
// //     overflow: "hidden",
// //     position: "absolute",
// //     justifyContent: "flex-end",
// //     alignItems: "center",
// //   },
// //   icons8Location10021: {
// //     width: 50,
// //     height: 50,
// //   },

// //   // Location Styles
// //   rowContainer: {
// //     flex: 1,
// //     flexDirection: "row",
// //   },
// //   map: {
// //     flex: 1,
// //     // zIndex: 1,
// //   },

// //   // Searching Distance Radius Modal Styles
// //   kmTypo: {
// //     textAlign: "center",
// //     fontFamily: FontFamily.title2Bold32,
// //     fontWeight: "700",
// //   },
// //   sliderFrameParentFlexBox: {
// //     marginTop: 15,
// //     justifyContent: "center",
// //     alignSelf: "stretch",
// //     alignItems: "center",
// //   },
// //   valueEditThisLayout: {
// //     height: 4,
// //     borderRadius: Border.br_5xs,
// //   },
// //   textTypo: {
// //     fontSize: FontSize.level2Medium12_size,
// //     textAlign: "center",
// //   },
// //   iconLayout: {
// //     height: 30,
// //     width: 30,
// //   },
// //   addressDetailsBtnBg: {
// //     backgroundColor: Color.colorWhitesmoke_300,
// //     flexDirection: "row",
// //   },
// //   addAddressDetailsClr: {
// //     color: Color.colorDarkgray_300,
// //     textAlign: "left",
// //   },
// //   iconOutlineFlexBox: {
// //     padding: Padding.p_12xs,
// //     justifyContent: "center",
// //     flexDirection: "row",
// //     alignItems: "center",
// //   },
// //   componentsbuttonFlexBox: {
// //     backgroundColor: Color.colorDarkslategray_900,
// //     justifyContent: "center",
// //     flexDirection: "row",
// //     alignItems: "center",
// //   },
// //   bookmarkIconPosition: {
// //     height: 15,
// //     width: 15,
// //     left: 5,
// //     top: 5,
// //     position: "absolute",
// //   },
// //   componentsFlexBox: {
// //     borderRadius: Border.br_5xs,
// //     marginTop: 15,
// //     justifyContent: "center",
// //     alignSelf: "stretch",
// //     alignItems: "center",
// //   },
// //   editTypo: {
// //     fontFamily: FontFamily.montserratMedium,
// //     fontWeight: "500",
// //     lineHeight: 20,
// //     alignSelf: "stretch",
// //   },
// //   frameChild: {
// //     borderStyle: "solid",
// //     borderColor: Color.colorDarkgray_400,
// //     borderTopWidth: 2,
// //     height: 2,
// //     width: 40,
// //   },
// //   searchingDistanceRadius1: {
// //     fontSize: FontSize.bodyLgBodyLgRegular_size,
// //     lineHeight: 21,
// //     color: Color.colorGray_700,
// //   },
// //   searchingDistanceRadiusWrapper: {
// //     marginTop: 12,
// //     flexDirection: "row",
// //     alignSelf: "stretch",
// //   },
// //   frameItem: {
// //     width: 342,
// //     marginTop: 12,
// //     height: 2,
// //   },

// //   spacer: {
// //     width: 4,
// //     height: 1,
// //   },
// //   text: {
// //     lineHeight: 16,
// //     fontWeight: "600",
// //     fontFamily: FontFamily.level2Semibold12,
// //     color: Color.gray100,
// //   },
// //   tooltip: {
// //     borderRadius: Border.br_9xs,
// //     backgroundColor: Color.gray700,
// //     shadowColor: "rgba(55, 65, 81, 0.06)",
// //     shadowOffset: {
// //       width: 0,
// //       height: 1,
// //     },
// //     shadowRadius: 2,
// //     elevation: 2,
// //     shadowOpacity: 1,
// //     paddingHorizontal: Padding.p_9xs,
// //     paddingVertical: Padding.p_11xs,
// //     flexDirection: "row",
// //     alignItems: "center",
// //   },
// //   atomSliderTooltip: {
// //     flexDirection: "row",
// //   },
// //   bgIcon: {
// //     marginTop: 5,
// //   },
// //   atomSliderDragHandle: {
// //     height: 20,
// //   },
// //   valueEditThis: {
// //     left: 0,
// //     backgroundColor: Color.blue500,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     flexDirection: "row",
// //     top: 0,
// //     position: "absolute",
// //   },
// //   atomSliderRangeNew: {
// //     backgroundColor: Color.gray200,
// //     alignSelf: "stretch",
// //   },
// //   sliderFrame: {
// //     paddingRight: Padding.p_131xl,
// //     flex: 1,
// //   },
// //   km: {
// //     fontSize: FontSize.title3Bold20_size,
// //     lineHeight: 26,
// //     color: Color.neutral07,
// //   },
// //   kmWrapper: {
// //     marginLeft: 10,
// //     flexDirection: "row",
// //   },
// //   sliderFrameParent: {
// //     flexDirection: "row",
// //   },
// //   uscTalamban: {
// //     fontFamily: FontFamily.montserratBold,
// //     color: Color.heading,
// //     textAlign: "left",
// //     lineHeight: 32,
// //     fontSize: FontSize.body1Semibold_size,
// //     fontWeight: "700",
// //     alignSelf: "stretch",
// //   },
// //   barangayNasipitTalamban: {
// //     fontSize: FontSize.typographyTaglineSmallRegular_size,
// //     fontFamily: FontFamily.montserratMedium,
// //     fontWeight: "500",
// //     lineHeight: 20,
// //     alignSelf: "stretch",
// //   },
// //   uscTalambanParent: {
// //     marginLeft: 8,
// //     overflow: "hidden",
// //     flex: 1,
// //   },
// //   whiteBookmarkIcon: {
// //     zIndex: 0,
// //   },
// //   grayBookmarkIcon: {
// //     display: "none",
// //     zIndex: 1,
// //   },
// //   whiteBookmarkParent: {
// //     width: 25,
// //     height: 25,
// //     borderRadius: Border.br_xl,
// //   },
// //   savedPlaces: {
// //     marginLeft: 8,
// //     borderRadius: Border.br_xl,
// //   },
// //   componentsSearchDefault: {
// //     paddingLeft: Padding.p_8xs,
// //     paddingTop: Padding.p_xs,
// //     paddingRight: Padding.p_3xs,
// //     paddingBottom: Padding.p_xs,
// //     borderRadius: Border.br_5xs,
// //     marginTop: 15,
// //     justifyContent: "center",
// //     alignSelf: "stretch",
// //     alignItems: "center",
// //   },
// //   addAddressDetails: {
// //     fontFamily: FontFamily.montserratRegular,
// //     lineHeight: 32,
// //     color: Color.colorDarkgray_300,
// //     fontSize: FontSize.level2Medium12_size,
// //     flex: 1,
// //   },
// //   addressDetailsFrame: {
// //     flexDirection: "row",
// //     flex: 1,
// //   },
// //   edit: {
// //     color: Color.colorDeepskyblue_100,
// //     display: "flex",
// //     width: 34,
// //     fontSize: FontSize.level2Medium12_size,
// //     textAlign: "center",
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   editBtn: {
// //     marginLeft: 5,
// //     flexDirection: "row",
// //     alignSelf: "stretch",
// //   },
// //   addressDetailsBtn: {
// //     borderRadius: Border.br_3xs,
// //     paddingLeft: Padding.p_3xs,
// //     paddingTop: Padding.p_8xs,
// //     paddingRight: Padding.p_8xs,
// //     paddingBottom: Padding.p_8xs,
// //     flex: 1,
// //   },
// //   componentsSearchDefault1: {
// //     overflow: "hidden",
// //     flexDirection: "row",
// //   },
// //   viewAllServices: {
// //     letterSpacing: -0.1,
// //     lineHeight: 24,
// //     color: Color.neutral01,
// //     fontSize: FontSize.body1Semibold_size,
// //     textAlign: "center",
// //     fontFamily: FontFamily.title2Bold32,
// //     fontWeight: "700",
// //   },
// //   componentsbutton: {
// //     borderRadius: Border.br_mini,
// //     paddingHorizontal: Padding.p_3xl,
// //     paddingVertical: Padding.p_xs,
// //     alignSelf: "stretch",
// //   },
// //   componentsbuttonWrapper: {
// //     paddingTop: Padding.p_3xs,
// //   },

// //   cancelButtonText: {
// //     color: "blue", // Customize the color as needed
// //   },

// //   frameGroup: {
// //     borderTopLeftRadius: Border.br_5xl,
// //     borderTopRightRadius: Border.br_5xl,
// //     paddingHorizontal: Padding.p_base,
// //     paddingBottom: Padding.p_mini,
// //     alignSelf: "stretch",
// //     backgroundColor: Color.white,
// //   },
// //   frameFlexBox: {
// //     justifyContent: "flex-end",
// //     alignItems: "center",
// //   },
// //   lineParent: {
// //     paddingTop: Padding.p_5xs,
// //     alignSelf: "stretch",
// //   },
// //   searchingDistanceRadiusModa: {
// //     // zIndex: 2,
// //     // alignSelf: "stretch",
// //     position: "absolute",
// //     width: "100%",
// //     height: "auto",
// //   },
// // });

// // export default SearchingDistanceRadius;

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
// import SearchingServiceProviderModal from "../components/SearchingServiceProviderModal";
// import MapView, { Marker, Circle } from "react-native-maps";
// import axios from "axios";
// import * as Location from "expo-location";
// import { Easing } from "react-native-reanimated";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import {
//   getFirestore,
//   doc,
//   getDocs,
//   collection,
//   query,
//   where,
//   getDoc,
//   onSnapshot,
// } from "firebase/firestore";
// import * as geolib from "geolib";


// // const fetchBookingDetails = (bookingID, serviceBookingUID, setBookingAccepted,setacceptedByProvider) => {
// //   const db = getFirestore();
// //   const serviceBookingsCollection = collection(db, "serviceBookings");
// //   const serviceBookingDocRef = doc(serviceBookingsCollection, serviceBookingUID);

// //   const unsubscribe = onSnapshot(serviceBookingDocRef, (docSnapshot) => {
// //     if (docSnapshot.exists()) {
// //       const bookingsArray = docSnapshot.data().bookings || [];
// //       console.log("The booking array is: ", bookingsArray);
// //       console.log("The bookingID to search is: ", bookingID);

// //       const index = bookingsArray.findIndex(
// //         (booking) => booking.bookingID === bookingID
// //       );

// //       console.log(index);

// //       if (index !== -1) {
// //         console.log("Match found at index:", index);
// //         const matchedBooking = bookingsArray[index];
// //         console.log("The matched booking details are:", matchedBooking);

// //         const bookingAccepted = matchedBooking.bookingAccepted;
// //         const acceptedByProvider = matchedBooking.acceptedBy;

// //         console.log("Accepted by:",acceptedByProvider )


// //         if (bookingAccepted && acceptedByProvider !== "") {
// //           console.log("This is true at index:", index);
// //           setBookingAccepted(bookingAccepted); // Trigger a state update or handle the data accordingly
// //           setacceptedByProvider(acceptedByProvider);
// //       } else {
// //           console.log("This is false at index", index);
// //       }
// //       } else {
// //         console.log("BookingID not found in the array");
// //       }
// //     } else {
// //       console.log("Document does not exist");
// //     }
// //   });

// //   return unsubscribe; // Return the unsubscribe function to stop listening when needed
// // };


// const fetchBookingDetails = (bookingID, serviceBookingUID, setBookingAccepted, setacceptedByProvider) => {
//   const db = getFirestore();
//   const serviceBookingsCollection = collection(db, "serviceBookings");
//   const serviceBookingDocRef = doc(serviceBookingsCollection, serviceBookingUID);

//   const unsubscribe = onSnapshot(serviceBookingDocRef, (docSnapshot) => {
//     if (docSnapshot.exists()) {
//       const bookingsArray = docSnapshot.data().bookings || [];
//       console.log("The booking array is: ", bookingsArray);
//       console.log("The bookingID to search is: ", bookingID);

//       const index = bookingsArray.findIndex((booking) => booking.bookingID === bookingID);

//       console.log(index);

//       if (index) {
//         console.log("Match found at index:", index);
//         const matchedBooking = bookingsArray[index];
//         console.log("The matched booking details are:", matchedBooking);

//         if (matchedBooking && matchedBooking.bookingAccepted !== undefined && matchedBooking.acceptedBy !== undefined) {
//           const bookingAccepted = matchedBooking.bookingAccepted;
//           const acceptedByProvider = matchedBooking.acceptedBy;

//           console.log("Accepted by:", acceptedByProvider);

//           if (bookingAccepted && acceptedByProvider !== "") {
//             console.log("This is true at index:", index);
//             setBookingAccepted(bookingAccepted); // Trigger a state update or handle the data accordingly
//             setacceptedByProvider(acceptedByProvider);
//           } else {
//             console.log("This is false at index", index);
//           }
//         } else {
//           console.log("Invalid matched booking details");
//         }
//       } else {
//         console.log("BookingID not found in the array");
//       }
//     } else {
//       console.log("Document does not exist");
//     }
//   });

//   return unsubscribe; // Return the unsubscribe function to stop listening when needed
// };



// const SearchingDistanceRadius = ({ route }) => {
//   const navigation = useNavigation();

//   const mapRef = useRef(null);
//   const circleRadius = useRef(new Animated.Value(0)).current;
//   const colorValue = useRef(new Animated.Value(0)).current;

//   const [bookingAccepted, setBookingAccepted] = useState(null);
//   const [acceptedByProvider, setacceptedByProvider] = useState(null);



//   const geolib = require("geolib");

//   const {
//     latitude,
//     longitude,
//     sliderValue,
//     location,
//     title,
//     category,
//     extractedNames,
//     bookingID,
//     serviceBookingUID,
//   } = route.params;

//   const [userCoordinates, setUserCoordinates] = useState(null);
//   const [providerCoordinates, setProviderCoordinates] = useState(null);
//   const [distance, setDistance] = useState(null);
//   const [isWithinRadius, setIsWithinRadius] = useState(null);

//   console.log("User lat:", latitude);
//   console.log("User long:", longitude);

//   console.log("The title is: ", title);
//   console.log("The category is: ", category);
//   console.log("Booking ID:", bookingID);
//   console.log("Service Booking UID:", serviceBookingUID);

 

//   useEffect(() => {
//     console.log("Initial bookingID:", bookingID);
//     console.log("Initial serviceBookingUID:", serviceBookingUID);

//     // Call the fetchBookingDetails function with the desired bookingID and serviceBookingUID
//     const unsubscribe = fetchBookingDetails(
//       bookingID,
//       serviceBookingUID,
//       setBookingAccepted,
//       setacceptedByProvider,
//     );

//     return () => {
//       // Clean up the listener when the component unmounts or is no longer needed
//       unsubscribe();
//     };
//   }, [bookingID, serviceBookingUID]);

//   const calculateDistance = ([lat1, lon1], [lat2, lon2]) => {
//     if (lat1 === null || lon1 === null || lat2 === null || lon2 === null) {
//       console.error("Invalid coordinates");
//       return null;
//     }

//     const distance = geolib.getDistance(
//       { latitude: lat1, longitude: lon1 },
//       { latitude: lat2, longitude: lon2 }
//     );

//     const kmDistance = distance / 1000;

//     console.log("Calculated distance between the two:", kmDistance.toFixed(2));

//     return kmDistance;
//   };

//   const checkAppForm3 = async () => {
//     try {
//       const distanceThreshold = 3; // 3km threshold

//       const db = getFirestore();
//       const providerProfilesCollection = collection(db, "providerProfiles");

//       const providerProfilesSnapshot = await getDocs(
//         providerProfilesCollection
//       );

//       for (const doc of providerProfilesSnapshot.docs) {
//         const data = doc.data();

//         // Log availability for each document
//         console.log(`Document ${doc.id}, Availability: ${data.availability}`);

//         // Ensure data object and availability property exist
//         if (data && data.availability === true) {
//           const appForm3CollectionRef = collection(doc.ref, "appForm3");
//           const appForm3Snapshot = await getDocs(appForm3CollectionRef);

//           console.log("This is available");

//           if (!appForm3Snapshot.empty) {
//             console.log(`Document ${doc.id} has "appForm3" collection.`);

//             // Check if there is a document inside the "appForm3" collection
//             const querySnapshot = await getDocs(
//               query(
//                 appForm3CollectionRef,
//                 where("category", "array-contains-any", [title])
//               )
//             );

//             if (!querySnapshot.empty) {
//               const documentsWithInstallation = querySnapshot.docs.filter(
//                 (doc) => doc.data().services.includes(category)
//               );

//               // if (documentsWithInstallation.length > 0) {
//               //   // Check if SubCategories include all items in the extractedNames array
//               //   const subCategoriesArray =
//               //     documentsWithInstallation[0].data().SubCategories;

//               console.log("title is found");

//               if (documentsWithInstallation.length > 0) {
//                 const subCategoriesArray =
//                   documentsWithInstallation[0].data().SubCategories;

//                 if (
//                   extractedNames.every((name) =>
//                     subCategoriesArray.includes(name)
//                   )
//                 ) {
//                   console.log(`Document ${doc.id} has everything`);

//                   const mainDocumentData = doc.data();
//                   const coordinates = mainDocumentData.coordinates;
//                   const name = mainDocumentData.name;

//                   console.log("Lat of provider:", coordinates[0]);
//                   console.log("Long of provider:", coordinates[1]);

//                   if (Array.isArray(coordinates) && coordinates.length >= 2) {
//                     const distance = calculateDistance(
//                       [latitude, longitude],
//                       [coordinates[0], coordinates[1]]
//                     );

//                     if (distance <= distanceThreshold) {
//                       console.log(
//                         `Document ${doc.id} is within 3km from the user.`
//                       );
//                       console.log(distance);
//                       console.log(distanceThreshold);
//                       console.log("Name of Provider:", name);
//                     } else {
//                       console.log(
//                         `Document ${doc.id} is outside the 3km distance from the user.`
//                       );
//                       console.log(distance);
//                     }
//                   } else {
//                     console.log(
//                       `Document ${doc.id} does not have valid coordinates.`
//                     );
//                   }
//                 } else {
//                   console.log(
//                     `Document ${doc.id} in "appForm3" collection does not have all SubCategories in the extractedNames array.`
//                   );
//                 }
//               } else {
//                 console.log(
//                   `Document ${doc.id} in "appForm3" collection does not have both title and category.`
//                 );
//               }

//               // }
//             } else {
//               console.log("title is not found");
//             }
//           } else {
//             console.log(
//               `Document ${doc.id} does not have "appForm3" collection.`
//             );
//           }
//         } else {
//           console.log(
//             `Document ${doc.id} is either not available or availability is not a boolean or not set to true.`
//           );
//         }
//       }
//     } catch (error) {
//       console.error("Error checking for appForm3 collection:", error);
//     }
//   };

//   useEffect(() => {
//     checkAppForm3();
//   }, []);

//   useEffect(() => {
//     if (bookingAccepted) {
//       // Navigate to your desired screen

//       console.log('Navigating to ServiceProvidersFound with:', {
//         latitude,
//         longitude,
//         bookingID,
//         serviceBookingUID,
//         title,
//         category,
//         acceptedByProvider, // Pass acceptedByProvider to the next screen
//       });
//       navigation.navigate('ServiceProvidersFound',{
//         latitude,
//         longitude,
//         bookingID,
//         serviceBookingUID,
//         title,
//         category,
//         acceptedByProvider, // Pass acceptedByProvider to the next screen

//       }); // Replace 'YourScreenName' with the actual screen name you want to navigate to
//     }
//   }, [bookingAccepted,acceptedByProvider]);



//   const stableCircleRadius = 50;

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
//           <SearchingServiceProviderModal
//             cityAddress={cityAddress}
//             specificLocation={reverseGeocodedAddress || "Loading..."}
//             latitude={latitude}
//             longitude={longitude}
//             city={cityAddress}
//             location={location} // Pass the location prop
//             title={title}
//             category={category}
//           />
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

// export default SearchingDistanceRadius;

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
// import SearchingServiceProviderModal from "../components/SearchingServiceProviderModal";
// import MapView, { Marker, Circle } from "react-native-maps";
// import axios from "axios";
// import * as Location from "expo-location";
// import { Easing } from "react-native-reanimated";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import {
//   getFirestore,
//   doc,
//   getDocs,
//   collection,
//   query,
//   where,
//   getDoc,
//   onSnapshot,
//   updateDoc,
// } from "firebase/firestore";
// import * as geolib from "geolib";

// const SearchingDistanceRadius = ({ route }) => {
//   const providersMatched = [];

//   const navigation = useNavigation();

//   const mapRef = useRef(null);
//   const circleRadius = useRef(new Animated.Value(0)).current;
//   const colorValue = useRef(new Animated.Value(0)).current;

//   const [bookingAccepted, setBookingAccepted] = useState(null);
//   const [acceptedByProvider, setacceptedByProvider] = useState(null);

//   const [BookingIndex, setBookingIndex] = useState(null);

//   const geolib = require("geolib");

//   const auth = getAuth();
//   const db = getFirestore();

//   const {
//     latitude,
//     longitude,
//     sliderValue,
//     location,
//     title,
//     category,
//     extractedNames,
//     bookingID,
//     serviceBookingUID,
//   } = route.params;

//   const [userCoordinates, setUserCoordinates] = useState(null);
//   const [providerCoordinates, setProviderCoordinates] = useState(null);
//   const [distance, setDistance] = useState(null);
//   const [isWithinRadius, setIsWithinRadius] = useState(null);

//   console.log("User lat:", latitude);
//   console.log("User long:", longitude);

//   console.log("The title is: ", title);
//   console.log("The category is: ", category);
//   console.log("Booking ID:", bookingID);
//   console.log("User's Service Booking UID:", serviceBookingUID);

//   const fetchBookingDetails = (
//     bookingID,
//     serviceBookingUID,
//     setBookingAccepted,
//     setacceptedByProvider
//   ) => {
//     const db = getFirestore();
//     const serviceBookingsCollection = collection(db, "serviceBookings");
//     const serviceBookingDocRef = doc(
//       serviceBookingsCollection,
//       serviceBookingUID
//     );

//     const unsubscribe = onSnapshot(serviceBookingDocRef, (docSnapshot) => {
//       if (docSnapshot.exists()) {
//         const blacklisted = docSnapshot.data().blacklisted || false;

//         const bookingsArray = docSnapshot.data().bookings || [];
//         console.log("The booking array is: ", bookingsArray);
//         console.log("The bookingID to search is: ", bookingID);

//         const index = bookingsArray.findIndex(
//           (booking) => booking.bookingID === bookingID
//         );

//         console.log("The booking index is", index);

//         if (index !== -1) {
//           console.log("Match found at index:", index);
//           const matchedBooking = bookingsArray[index];
//           console.log("The matched booking details are:", matchedBooking);

//           if (
//             matchedBooking &&
//             matchedBooking.bookingAccepted !== undefined &&
//             matchedBooking.acceptedBy !== undefined
//           ) {
//             const bookingAccepted = matchedBooking.bookingAccepted;
//             const acceptedByProvider = matchedBooking.acceptedBy;
//             const blackListedCurrent = matchedBooking.blackListed;

//             console.log("Accepted by:", acceptedByProvider);
//             console.log("Blacklist is:", blackListedCurrent);

//             if (blackListedCurrent) {
//               console.log("SearchAgain");
//             }

//             if (bookingAccepted && acceptedByProvider !== "") { 
//               console.log("This is true at index:", index);
//               setBookingAccepted(bookingAccepted); // Trigger a state update or handle the data accordingly
//               setacceptedByProvider(acceptedByProvider);
//             } else {
//               console.log("This is false at index", index);
//             }
//           } else {
//             console.log("Invalid matched booking details");
//           }
//         } else {
//           console.log("BookingID not found in the array");
//         }
//       } else {
//         console.log("Document does not exist");
//       }
//     });

//     return unsubscribe; // Return the unsubscribe function to stop listening when needed
//   };

//   useEffect(() => {
//     console.log("Initial bookingID:", bookingID);
//     console.log("Initial serviceBookingUID:", serviceBookingUID);

//     // Call the fetchBookingDetails function with the desired bookingID and serviceBookingUID
//     const unsubscribe = fetchBookingDetails(
//       bookingID,
//       serviceBookingUID,
//       setBookingAccepted,
//       setacceptedByProvider
//     );

//     return () => {
//       // Clean up the listener when the component unmounts or is no longer needed
//       unsubscribe();
//     };
//   }, [bookingID, serviceBookingUID]);

//   const calculateDistance = ([lat1, lon1], [lat2, lon2]) => {
//     if (lat1 === null || lon1 === null || lat2 === null || lon2 === null) {
//       console.error("Invalid coordinates");
//       return null;
//     }

//     const distance = geolib.getDistance(
//       { latitude: lat1, longitude: lon1 },
//       { latitude: lat2, longitude: lon2 }
//     );

//     const kmDistance = distance / 1000;

//     console.log("Calculated distance between the two:", kmDistance.toFixed(2));

//     return kmDistance;
//   };

//   const fetchBookingIndex = async (bookingID, serviceBookingUID) => {
//     try {
//       let providersFound = false; // Flag to track whether providers are found

//       const db = getFirestore();
//       const serviceBookingsCollection = collection(db, "serviceBookings");
//       const serviceBookingDocRef = doc(
//         serviceBookingsCollection,
//         serviceBookingUID
//       );

//       const docSnapshot = await getDoc(serviceBookingDocRef);

//       if (docSnapshot.exists()) {
//         const bookingsArray = docSnapshot.data().bookings || [];
//         console.log("THE BOOKING ARRAY IS: ", bookingsArray);
//         console.log("THE BOOKING ID TO SEARCH IS: ", bookingID);

//         const index = bookingsArray.findIndex(
//           (booking) => booking.bookingID === bookingID
//         );

//         console.log("THE BOOKING INDEX IS", index);

//         // Set the booking index state or return the index here...

//         if (index !== -1) {
//           const foundBooking = bookingsArray[index];
//           console.log("FOUND BOOKING DETAILS:", foundBooking);

//           console.log("Accepted by:", foundBooking.acceptedBy);

//           if (foundBooking.acceptedBy === "") {
//             // If acceptedBy is empty, set a timeout to log "Providers not found" after 10 seconds
//             setTimeout(() => {
//               if (!providersFound) {
//                 console.log("Providers not found");
//               }
//             }, 10000);
//           } else {
//             // If acceptedBy is not empty, providers are found
//           }

//           return index;
//         } else {
//           console.log("Booking ID not found in the array");
//         }
//       } else {
//         console.log("Document does not exist");
//       }
//     } catch (error) {
//       console.error("Error fetching booking index:", error);
//     }
//   };

//   const checkAppForm3 = async () => {
//     try {
//       const distanceThreshold = 3; // 3km threshold
//       const providersMatched = [];

//       const db = getFirestore();
//       const providerProfilesCollection = collection(db, "providerProfiles");

//       const serviceBookingsCollection = collection(db, "serviceBookings");
//       const serviceBookingDocRef = doc(
//         serviceBookingsCollection,
//         serviceBookingUID
//       );

//       const docSnapshot = await getDoc(serviceBookingDocRef);
//       const providerProfilesSnapshot = await getDocs(
//         providerProfilesCollection
//       );

//       for (const doc of providerProfilesSnapshot.docs) {
//         const data = doc.data();

//         // Log availability for each document
//         console.log(`Document ${doc.id}, Availability: ${data.availability}`);
//         console.log(`Document ${doc.id}, BlackListed: ${data.blackListed}`);
//         console.log(`Document ${doc.id}, BookingID: ${bookingID}`);

//         // Ensure data object and availability property exist
//         if (data && data.availability === "available") {
//           if (data.blackListed && data.blackListed.includes(bookingID)) {
//             console.log(
//               `Document ${doc.id} has blacklisted bookingID. Going to else block.`
//             );
//             continue; // Skip the rest of the loop and move on to the next provider
//           } else {
//             const appForm3CollectionRef = collection(doc.ref, "appForm3");
//             const appForm3Snapshot = await getDocs(appForm3CollectionRef);

//             console.log("This is available");

//             if (!appForm3Snapshot.empty) {
//               console.log(`Document ${doc.id} has "appForm3" collection.`);

//               // Check if there is a document inside the "appForm3" collection
//               const querySnapshot = await getDocs(
//                 query(
//                   appForm3CollectionRef,
//                   where("category", "array-contains-any", [title])
//                 )
//               );

//               if (!querySnapshot.empty) {
//                 const documentsWithInstallation = querySnapshot.docs.filter(
//                   (doc) => doc.data().services.includes(category)
//                 );

//                 console.log("title is found");

//                 if (documentsWithInstallation.length > 0) {
//                   const subCategoriesArray =
//                     documentsWithInstallation[0].data().SubCategories;

//                   console.log(
//                     `Document ${doc.id} in "appForm3" collection has both title and category.`
//                   );

//                   console.log("ExtractedNames are: ", extractedNames);
//                   console.log("Subcategories array: ", subCategoriesArray);

//                   if (
//                     extractedNames.every((name) =>
//                       subCategoriesArray.includes(name)
//                     )
//                   ) {
//                     const mainDocumentData = doc.data();
//                     const coordinates = mainDocumentData.coordinates;
//                     const name = mainDocumentData.name;

//                     console.log("Lat of User:", latitude);
//                     console.log("Long of User:", longitude);
//                     console.log("Lat of provider:", coordinates.latitude);
//                     console.log("Long of provider:", coordinates.longitude);

//                     if (
//                       coordinates &&
//                       coordinates.latitude &&
//                       coordinates.longitude
//                     ) {
//                       const distance = calculateDistance(
//                         [latitude, longitude],
//                         [coordinates.latitude, coordinates.longitude]
//                       );

//                       if (distance <= distanceThreshold) {
//                         const providerId = doc.id;

//                         // Check if the providerId is not already in providersMatched array
//                         const isProviderAlreadyAdded = providersMatched.some(
//                           (provider) => provider.id === providerId
//                         );

//                         if (!isProviderAlreadyAdded) {
//                           console.log(
//                             `Document ${providerId} (${name}) is within 3km from the user.`
//                           );
//                           console.log(`Document ${providerId} has everything`);

//                           providersMatched.push({
//                             id: providerId,
//                             distance: distance,
//                           });
//                           console.log("Providers Matched: ", providersMatched);
//                         } else {
//                           console.log(
//                             `Document ${providerId} (${name}) is already in the list.`
//                           );
//                         }
//                       } else {
//                         console.log(
//                           `Document ${doc.id} (${name}) is outside the 3km distance from the user.`
//                         );
//                         console.log(`Distance: ${distance} km`);
//                       }
//                     } else {
//                       console.log(
//                         `Document ${doc.id} (${name}) does not have valid coordinates.`
//                       );
//                     }
//                   } else {
//                     console.log(
//                       `Document ${doc.id} in "appForm3" collection does not have all SubCategories in the extractedNames array.`
//                     );
//                   }
//                 } else {
//                   console.log(
//                     `Document ${doc.id} in "appForm3" collection does not have both title and category.`
//                   );
//                 }
//               } else {
//                 console.log("title is not found");
//               }
//             } else {
//               console.log(
//                 `Document ${doc.id} does not have "appForm3" collection.`
//               );
//             }
//           }
//         } else {
//           console.log(
//             `Document ${doc.id} is either not available or availability is not a boolean or not set to true.`
//           );
//         }
//       }

//       providersMatched.sort((a, b) => a.distance - b.distance);

//       // Extract the ids after sorting
//       const sortedProvidersIds = providersMatched.map(
//         (provider) => provider.id
//       );

//       // Log the sorted providers
//       console.log("Sorted Providers Matched: ", sortedProvidersIds);
//       console.log("Sorted Providers Matched: ", sortedProvidersIds[0]);
//       console.log("BookingID: ", bookingID);
//       console.log("Booking Index:", BookingIndex);

//       if (sortedProvidersIds.length > 0) {
//         const firstProviderIds = sortedProvidersIds[0];
//         console.log("Updating provider document...");
//         await updateProviderDocument(
//           firstProviderIds,
//           serviceBookingUID,
//           BookingIndex
//         );
//       } else {
//         console.log("No providers matched the criteria.");
//       }
//     } catch (error) {
//       console.error("Error checking for appForm3 collection:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Run fetchBookingIndex
//         const bookingIndex = await fetchBookingIndex(
//           bookingID,
//           serviceBookingUID
//         );

//         // Set the booking index state or handle the index value as needed...
//         // For example:
//         setBookingIndex(bookingIndex);

//         // Continue with other operations, in this case, checkAppForm3
//         if (bookingIndex !== null) {
//           checkAppForm3();
//         }
//       } catch (error) {
//         console.error("Error in fetchData:", error);
//       }
//     };

//     // Call the fetchData function initially
//     fetchData();

//     const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         const authUserID = user.uid;
//         const serviceBookingsCollection = collection(db, "serviceBookings");
//         const serviceBookingDocRef = doc(serviceBookingsCollection, authUserID);

//         const unsubscribeSnapshot = onSnapshot(serviceBookingDocRef, (docSnapshot) => {
//           if (docSnapshot.exists()) {
//             const blackListed = docSnapshot.data().blackListed || [];
//             // Now you can use the blackListed array and perform any actions you need.
//             console.log("Blacklisted array:", blackListed);

//             // Trigger a search again here
//             // searchAgainFunction();
//             console.log("Search Again");
//             fetchData();
//           } else {
//             console.log("Document does not exist");
//           }
//         });

//         // To stop listening for changes, call the unsubscribe function
//         // when it's no longer needed (e.g., when the component unmounts).
//         // return () => unsubscribeSnapshot();
//       } else {
//         console.log("User not authenticated");
//       }
//     });

//     // // Set up an interval to run fetchData every 10 seconds
//     // const interval = setInterval(fetchData, 30000);

//     // // Clean-up function to clear the interval in case the component unmounts
//     // return () => clearInterval(interval);
//   }, [bookingID, serviceBookingUID, setBookingIndex, checkAppForm3]);

//   useEffect(() => {
//     if (bookingAccepted) {
//       // Navigate to your desired screen
//       console.log("Navigating to ServiceProvidersFound with:", {
//         latitude,
//         longitude,
//         bookingID,
//         serviceBookingUID,
//         title,
//         category,
//         acceptedByProvider, // Pass acceptedByProvider to the next screen
//       });
//       navigation.navigate("ServiceProvidersFound", {
//         latitude,
//         longitude,
//         bookingID,
//         serviceBookingUID,
//         title,
//         category,
//         acceptedByProvider, // Pass acceptedByProvider to the next screen
//       }); // Replace 'YourScreenName' with the actual screen name you want to navigate to
//     }
//   }, [bookingAccepted, acceptedByProvider]);

//   const updateProviderDocument = async (
//     providerId,
//     newBookingId,
//     newBookingIndex
//   ) => {
//     try {
//       const db = getFirestore();
//       const providerDocRef = doc(
//         collection(db, "providerProfiles"),
//         providerId
//       );

//       await updateDoc(providerDocRef, {
//         bookingID: newBookingId,
//         bookingIndex: newBookingIndex,
//         bookingMatched: true,
//         availability: "onHold",
//       });

//       console.log(`Document ${providerId} updated successfully.`);
//     } catch (error) {
//       console.error(`Error updating document ${providerId}:`, error);
//     }
//   };

//   const stableCircleRadius = 50;

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
//           <SearchingServiceProviderModal
//             cityAddress={cityAddress}
//             specificLocation={reverseGeocodedAddress || "Loading..."}
//             latitude={latitude}
//             longitude={longitude}
//             city={cityAddress}
//             location={location} // Pass the location prop
//             title={title}
//             category={category}
//           />
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

// export default SearchingDistanceRadius;

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
} from "react-native";
import { Image } from "expo-image";
import { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Border, FontSize, Color, Padding } from "../GlobalStyles";
import SearchingServiceProviderModal from "../components/SearchingServiceProviderModal";
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
  onSnapshot,
  updateDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import * as geolib from "geolib";

const SearchingDistanceRadius = ({ route }) => {
  const providersMatched = [];

  const navigation = useNavigation();

  const mapRef = useRef(null);
  const circleRadius = useRef(new Animated.Value(0)).current;
  const colorValue = useRef(new Animated.Value(0)).current;

  const [booking, setBooking] = useState(null);
  const [bookingAccepted, setBookingAccepted] = useState(null);
  const [acceptedByProvider, setacceptedByProvider] = useState(null);
  const [providerName, setProviderName] = useState("");
  const [providerEmail, setProviderEmail] = useState("");
  const [providerPhoneNumber, setProviderPhoneNumber] = useState("");
  const [providerID, setProviderID] = useState("");

  let Name = "";
  let Email = "";
  let PhoneNumber = "";

  const [BookingIndex, setBookingIndex] = useState(null);

  const geolib = require("geolib");

  const auth = getAuth();
  const db = getFirestore();

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

  const [userCoordinates, setUserCoordinates] = useState(null);
  const [providerCoordinates, setProviderCoordinates] = useState(null);
  const [distance, setDistance] = useState(null);
  const [isWithinRadius, setIsWithinRadius] = useState(null);

  console.log("User lat:", latitude);
  console.log("User long:", longitude);

  console.log("The title is: ", title);
  console.log("The category is: ", category);
  console.log("Booking ID:", bookingID);
  console.log("Service Booking UID:", serviceBookingUID);

  const fetchBookingDetails = (
    bookingID,
    serviceBookingUID,
    setBookingAccepted,
    setacceptedByProvider
  ) => {
    const db = getFirestore();
    const serviceBookingsCollection = collection(db, "serviceBookings");
    const serviceBookingDocRef = doc(
      serviceBookingsCollection,
      serviceBookingUID
    );

    const unsubscribe = onSnapshot(serviceBookingDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const blacklisted = docSnapshot.data().blacklisted || false;

        const bookingsArray = docSnapshot.data().bookings || [];
        console.log("The booking array is: ", bookingsArray);
        console.log("The bookingID to search is: ", bookingID);

        const index = bookingsArray.findIndex(
          (booking) => booking.bookingID === bookingID
        );

        console.log("The booking index is", index);

        if (index !== -1) {
          console.log("Match found at index:", index);
          const matchedBooking = bookingsArray[index];
          console.log("The matched booking details are:", matchedBooking);

          // Add a new field 'status' with the value 'Upcoming' to the matched booking
          const updatedBooking = { ...matchedBooking, status: "Upcoming" };

          setBooking(updatedBooking);
          console.log("Stored Booking: ", booking);

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

            if (blackListedCurrent) {
              console.log("SearchAgain");
            }

            if (bookingAccepted && acceptedByProvider !== "") {
              console.log("This is true at index:", index);
              setBookingAccepted(bookingAccepted); // Trigger a state update or handle the data accordingly
              setacceptedByProvider(acceptedByProvider);
            } else {
              console.log("This is false at index", index);
            }
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

  useEffect(() => {
    console.log("Initial bookingID:", bookingID);
    console.log("Initial serviceBookingUID:", serviceBookingUID);

    // Call the fetchBookingDetails function with the desired bookingID and serviceBookingUID
    const unsubscribe = fetchBookingDetails(
      bookingID,
      serviceBookingUID,
      setBookingAccepted,
      setacceptedByProvider
    );

    return () => {
      // Clean up the listener when the component unmounts or is no longer needed
      unsubscribe();
    };
  }, [bookingID, serviceBookingUID]);

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

  const fetchBookingIndex = async (bookingID, serviceBookingUID) => {
    try {
      let providersFound = false; // Flag to track whether providers are found

      const db = getFirestore();
      const serviceBookingsCollection = collection(db, "serviceBookings");
      const serviceBookingDocRef = doc(
        serviceBookingsCollection,
        serviceBookingUID
      );

      const docSnapshot = await getDoc(serviceBookingDocRef);

      if (docSnapshot.exists()) {
        const bookingsArray = docSnapshot.data().bookings || [];
        console.log("THE BOOKING ARRAY IS: ", bookingsArray);
        console.log("THE BOOKING ID TO SEARCH IS: ", bookingID);

        const index = bookingsArray.findIndex(
          (booking) => booking.bookingID === bookingID
        );

        console.log("THE BOOKING INDEX IS", index);

        // Set the booking index state or return the index here...

        if (index !== -1) {
          const foundBooking = bookingsArray[index];
          console.log("FOUND BOOKING DETAILS:", foundBooking);

          console.log("Accepted by:", foundBooking.acceptedBy);

          if (foundBooking.acceptedBy === "") {
            // If acceptedBy is empty, set a timeout to log "Providers not found" after 10 seconds
            setTimeout(() => {
              if (!providersFound) {
                console.log("Providers not found");
              }
            }, 10000);
          } else {
            // If acceptedBy is not empty, providers are found
          }

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

  const checkAppForm3 = async () => {
    try {
      const distanceThreshold = 3; // 3km threshold
      const providersMatched = [];

      const db = getFirestore();
      const providerProfilesCollection = collection(db, "providerProfiles");
      const providerProfilesSnapshot = await getDocs(
        providerProfilesCollection
      );

      for (const doc of providerProfilesSnapshot.docs) {
        const data = doc.data();

        // Log availability for each document
        console.log(`Document ${doc.id}, Availability: ${data.availability}`);
        console.log(`Document ${doc.id}, BlackListed: ${data.blackListed}`);
        console.log(`Document ${doc.id}, BookingID: ${bookingID}`);

        // Ensure data object and availability property exist
        if (data && data.availability === "available") {
          if (data.blackListed && data.blackListed.includes(bookingID)) {
            console.log(
              `Document ${doc.id} has blacklisted bookingID. Going to else block.`
            );
            continue; // Skip the rest of the loop and move on to the next provider
          } else {
            const appForm3CollectionRef = collection(doc.ref, "appForm3");
            const appForm3Snapshot = await getDocs(appForm3CollectionRef);

            console.log("This is available");

            if (!appForm3Snapshot.empty) {
              console.log(`Document ${doc.id} has "appForm3" collection.`);

              // Check if there is a document inside the "appForm3" collection
              const querySnapshot = await getDocs(
                query(
                  appForm3CollectionRef,
                  where("category", "array-contains-any", [title])
                )
              );

              if (!querySnapshot.empty) {
                const documentsWithInstallation = querySnapshot.docs.filter(
                  (doc) => doc.data().services.includes(category)
                );

                console.log("title is found");

                if (documentsWithInstallation.length > 0) {
                  const subCategoriesArray =
                    documentsWithInstallation[0].data().SubCategories;

                  console.log(
                    `Document ${doc.id} in "appForm3" collection has both title and category.`
                  );

                  console.log("ExtractedNames are: ", extractedNames);
                  console.log("Subcategories array: ", subCategoriesArray);

                  if (
                    extractedNames.every((name) =>
                      subCategoriesArray.includes(name)
                    )
                  ) {
                    const mainDocumentData = doc.data();
                    const coordinates = mainDocumentData.coordinates;
                    const name = mainDocumentData.name;

                    console.log("Lat of User:", latitude);
                    console.log("Long of User:", longitude);
                    console.log("Lat of provider:", coordinates.latitude);
                    console.log("Long of provider:", coordinates.longitude);

                    if (
                      coordinates &&
                      coordinates.latitude &&
                      coordinates.longitude
                    ) {
                      const distance = calculateDistance(
                        [latitude, longitude],
                        [coordinates.latitude, coordinates.longitude]
                      );

                      if (distance <= distanceThreshold) {
                        const providerId = doc.id;

                        // Check if the providerId is not already in providersMatched array
                        const isProviderAlreadyAdded = providersMatched.some(
                          (provider) => provider.id === providerId
                        );

                        if (!isProviderAlreadyAdded) {
                          console.log(
                            `Document ${providerId} (${name}) is within 3km from the user.`
                          );
                          console.log(`Document ${providerId} has everything`);

                          providersMatched.push({
                            id: providerId,
                            distance: distance,
                          });
                          console.log("Providers Matched: ", providersMatched);
                        } else {
                          console.log(
                            `Document ${providerId} (${name}) is already in the list.`
                          );
                        }
                      } else {
                        console.log(
                          `Document ${doc.id} (${name}) is outside the 3km distance from the user.`
                        );
                        console.log(`Distance: ${distance} km`);
                      }
                    } else {
                      console.log(
                        `Document ${doc.id} (${name}) does not have valid coordinates.`
                      );
                    }
                  } else {
                    console.log(
                      `Document ${doc.id} in "appForm3" collection does not have all SubCategories in the extractedNames array.`
                    );
                  }
                } else {
                  console.log(
                    `Document ${doc.id} in "appForm3" collection does not have both title and category.`
                  );
                }
              } else {
                console.log("title is not found");
              }
            } else {
              console.log(
                `Document ${doc.id} does not have "appForm3" collection.`
              );
            }
          }
        } else {
          console.log(
            `Document ${doc.id} is either not available or availability is not a boolean or not set to true.`
          );
        }
      }

      providersMatched.sort((a, b) => a.distance - b.distance);

      // Extract the ids after sorting
      const sortedProvidersIds = providersMatched.map(
        (provider) => provider.id
      );

      // Log the sorted providers
      console.log("Sorted Providers Matched: ", sortedProvidersIds);
      console.log("Sorted Providers Matched: ", sortedProvidersIds[0]);
      console.log("BookingID: ", bookingID);
      console.log("Booking Index:", BookingIndex);

      if (sortedProvidersIds.length > 0) {
        const firstProviderIds = sortedProvidersIds[0];
        setProviderID(firstProviderIds);
        console.log("Updating provider document...");
        await updateProviderDocument(
          firstProviderIds,
          serviceBookingUID,
          BookingIndex
        );
      } else {
        console.log("No providers matched the criteria.");
      }
    } catch (error) {
      console.error("Error checking for appForm3 collection:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Run fetchBookingIndex
        const bookingIndex = await fetchBookingIndex(
          bookingID,
          serviceBookingUID
        );

        // Set the booking index state or handle the index value as needed...
        // For example:
        setBookingIndex(bookingIndex);

        // Continue with other operations, in this case, checkAppForm3
        if (bookingIndex !== null) {
          checkAppForm3();
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    };

    // Call the fetchData function initially
    fetchData();

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const authUserID = user.uid;
        const serviceBookingsCollection = collection(db, "serviceBookings");
        const serviceBookingDocRef = doc(serviceBookingsCollection, authUserID);

        const unsubscribeSnapshot = onSnapshot(
          serviceBookingDocRef,
          (docSnapshot) => {
            if (docSnapshot.exists()) {
              const blackListed = docSnapshot.data().blackListed || [];
              // Now you can use the blackListed array and perform any actions you need.
              console.log("Blacklisted array:", blackListed);

              // Trigger a search again here
              // searchAgainFunction();
              console.log("Search Again");
              fetchData();
            } else {
              console.log("Document does not exist");
            }
          }
        );

        // To stop listening for changes, call the unsubscribe function
        // when it's no longer needed (e.g., when the component unmounts).
        // return () => unsubscribeSnapshot();
      } else {
        console.log("User not authenticated");
      }
    });

    // // Set up an interval to run fetchData every 10 seconds
    // const interval = setInterval(fetchData, 30000);

    // // Clean-up function to clear the interval in case the component unmounts
    // return () => clearInterval(interval);
  }, [bookingID, serviceBookingUID, setBookingIndex, checkAppForm3]);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        if (bookingAccepted && acceptedByProvider) {
          // Create a reference to the Firestore database using your app instance
          const db = getFirestore();
          // Get the user's UID 
          const auth = getAuth();
          const userUID = auth.currentUser.uid;
    
          const serviceBookingsCollection = collection(db, "serviceBookings");
    
          // Get the service booking document using userUID
          const serviceBookingDocRef = doc(
            serviceBookingsCollection,
            userUID
          );

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
            // console.log("Provider Name: ", providerName);
            // console.log("Provider Email: ", providerEmail);
            // console.log("Provider Phone: ", providerPhoneNumber);
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
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    };

    // Call the fetchBooking function initially
    fetchBooking();
  }, [bookingAccepted, acceptedByProvider]);

  const updateProviderDocument = async (
    providerId,
    newBookingId,
    newBookingIndex
  ) => {
    try {
      const db = getFirestore();
      const providerDocRef = doc(
        collection(db, "providerProfiles"),
        providerId
      );

      await updateDoc(providerDocRef, {
        bookingID: newBookingId,
        bookingIndex: newBookingIndex,
        bookingMatched: true,
        availability: "onHold",
      });

      console.log(`Document ${providerId} updated successfully.`);
    } catch (error) {
      console.error(`Error updating document ${providerId}:`, error);
    }
  };

  const stableCircleRadius = 50;

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

  const [isInputFocused, setIsInputFocused] = useState(false);

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
        setReverseGeocodedAddress(formattedAddress);
        setCityAddress(city);
        // Console.log the city
        console.log("City:", city);
      } else {
        setReverseGeocodedAddress("Location not found");
        console.log("Location not found");
      }
    } catch (error) {
      console.error("Error fetching reverse geolocation:", error);
    }
  };

  const gotoUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setMarkerPosition({ latitude, longitude });
        setInitialMapRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setInitialMarkerPosition({ latitude, longitude });
        fetchReverseGeolocation(latitude, longitude);
      } else {
        console.error("Location permission denied");
      }
    } catch (error) {
      console.error("Error getting user location:", error);
    }
  };

  const goToMarker = () => {
    setInitialMapRegion({
      ...markerPosition,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
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

  const handlePlaceSelect = (data, details = null) => {
    if (details) {
      const { lat, lng } = details.geometry.location;
      setMarkerPosition({ latitude: lat, longitude: lng });
      setInitialMapRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setEditLocationVisible(false);
    }
  };

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
            {/* <Circle
              center={markerPosition}
              radius={(sliderValue ? sliderValue * 1000 : 3000)}
              strokeWidth={2}
              strokeColor="#1A244D"
              fillColor="rgba(211, 211, 211, 0.4)"
            /> */}
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
          >
            <Image
              style={styles.uiIconarrowBackwardfilled}
              contentFit="cover"
              source={require("../assets/ui-iconarrow-backwardfilled.png")}
            />
          </Pressable>
        </View>
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


