// // // import * as React from "react";
// // // import {
// // //   StatusBar,
// // //   StyleSheet,
// // //   Pressable,
// // //   TouchableOpacity,
// // //   View,
// // //   Text,
// // //   TextInput,
// // //   ImageBackground,
// // //   Dimensions,
// // // } from "react-native";
// // // import { Image } from "expo-image";
// // // import { useState, useEffect, useRef } from "react";
// // // import { useNavigation } from "@react-navigation/native";
// // // import { Padding, FontFamily, Color, Border, FontSize } from "../GlobalStyles";
// // // import MapView, { Marker } from "react-native-maps";
// // // import axios from "axios";
// // // import * as Location from "expo-location";
// // // import EditLocationDetailsModal from "../components/EditLocationDetailsModal";

// // // const MapsEditLocationDetailsNo = ({ route }) => {
// // //   const navigation = useNavigation();
// // //   const ref = useRef();

// // //   // From MapsConfirmLocation
// // //   const [selectedCoordinates, setSelectedCoordinates] = useState(
// // //     route.params?.selectedCoordinates
// // //   );
// // //   const [selectedCityAddress, setSelectedCityAddress] = useState(
// // //     route.params?.selectedCityAddress
// // //   );
// // //   const [selectedSpecificLocation, setSelectedSpecificLocation] = useState(
// // //     route.params?.selectedSpecificLocation
// // //   );

// // //   // const [confirmAdd, setConfirmAdd] = useState(route.params?.addedFlag);

// // //   const [isInputFocused, setIsInputFocused] = useState(false);

// // //   const [initialMapRegion, setInitialMapRegion] = useState({
// // //     latitude: selectedCoordinates.latitude,
// // //     longitude: selectedCoordinates.longitude,
// // //     latitudeDelta: 0.0922,
// // //     longitudeDelta: 0.0421,
// // //   });

// // //   const [initialMarkerPosition, setInitialMarkerPosition] = useState({
// // //     latitude: selectedCoordinates.latitude,
// // //     longitude: selectedCoordinates.longitude,
// // //   });

// // //   const [markerPosition, setMarkerPosition] = useState(initialMarkerPosition);
// // //   const [reverseGeocodedAddress, setReverseGeocodedAddress] = useState(null);
// // //   const [editLocationVisible, setEditLocationVisible] = useState(false);
// // //   const [cityAddress, setCityAddress] = useState(null);

// // //   const handleMapPress = (event) => {
// // //     const { latitude, longitude } = event.nativeEvent.coordinate;
// // //     setMarkerPosition({ latitude, longitude });
// // //   };

// // //   const handleMarkerDragEnd = (event) => {
// // //     const { latitude, longitude } = event.nativeEvent.coordinate;
// // //     setMarkerPosition({ latitude, longitude });
// // //   };

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

// // //   useEffect(() => {
// // //     console.log("selected Specific Location:", selectedSpecificLocation);
// // //     console.log("selected City Address:", selectedCityAddress);
// // //     console.log("selected Coordinates:", selectedCoordinates.latitude);
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
// // //     <View style={styles.mapsEditLocationDetailsNo}>
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
// // //               draggable={true}
// // //               onDragEnd={handleMarkerDragEnd}
// // //               image={require("../assets/icons8location100-2-1.png")}
// // //             />
// // //           </MapView>
// // //         </View>

// // //         {/* <View style={styles.infoContainer}>
// // //           <Image
// // //             style={styles.infoIcon}
// // //             source={require("../assets/location-icon1.png")}
// // //           />
// // //           <View style={styles.infoTextContainer}>
// // //             <Text style={styles.infoTitle}>
// // //               Hello
// // //               // {markerPosition.latitude.toFixed(6)} 
// // //             </Text>
// // //             <Text style={styles.infoSubtitle}>
// // //               {reverseGeocodedAddress || "Loading..."}
// // //             </Text>
// // //           </View>
// // //           <TouchableOpacity
// // //             style={styles.editIconContainer}
// // //             onPress={() => setEditLocationVisible(!editLocationVisible)}
// // //           >
// // //             <Image
// // //               style={styles.editIcon}
// // //               source={require("../assets/pencil-11.png")}
// // //             />
// // //           </TouchableOpacity>
// // //         </View> */}

// // //         <View style={styles.editLocationDetailsModal}>
// // //           <EditLocationDetailsModal
// // //             cityAddress={selectedCityAddress}
// // //             specificLocation={selectedSpecificLocation || "Loading..."}
// // //             coordinates={selectedCoordinates}
// // //           />
// // //         </View>

// // //         <View style={styles.backBtnWrapper}>
// // //           <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
// // //             <Image
// // //               style={styles.uiIconarrowBackwardfilled}
// // //               contentFit="cover"
// // //               source={require("../assets/ui-iconarrow-backwardfilled.png")}
// // //             />
// // //           </Pressable>
// // //         </View>
// // //         {/* <View style={[styles.editLocationDetailsModal, styles.frameFlexBox]}>
// // //           <EditLocationDetailsModal style={{ zIndex: 1 }} />
// // //         </View> */}
// // //         {/* <View style={[styles.editLocationDetailsModal, styles.frameFlexBox]}>
// // //             <View style={[styles.frameGroup, styles.frameFlexBox]}>
// // //               <View
// // //                 style={[
// // //                   styles.editLocationDetailsWrapper,
// // //                   styles.wrapperSpaceBlock,
// // //                 ]}
// // //               >
// // //                 <Text style={styles.editLocationDetails}>
// // //                   Edit Location Details
// // //                 </Text>
// // //               </View>
// // //               <View style={styles.parentSpaceBlock}>
// // //                 <Text style={[styles.address, styles.addressTypo]}>
// // //                   <Text style={styles.addressTxt}>
// // //                     <Text style={styles.address1}>Address</Text>
// // //                     <Text style={styles.text}>*</Text>
// // //                   </Text>
// // //                 </Text>
// // //                 <View
// // //                   style={[
// // //                     styles.componentsSearchDefault,
// // //                     styles.componentsSpaceBlock,
// // //                   ]}
// // //                 >
// // //                   <View style={styles.iconOutlineFlexBox}>
// // //                     <Image
// // //                       style={styles.locationIcon}
// // //                       contentFit="cover"
// // //                       source={require("../assets/icons8location100-2-1.png")}
// // //                     />
// // //                   </View>
// // //                   <View style={styles.uscTalambanParent}>
// // //                     <Text style={[styles.uscTalamban, styles.addToSavedTypo]}>
// // //                       USC Talamban
// // //                     </Text>
// // //                     <Text
// // //                       style={[
// // //                         styles.barangayNasipitTalamban,
// // //                         styles.saveThisPlaceTypo,
// // //                       ]}
// // //                     >
// // //                       Barangay Nasipit, Talamban, Cebu City
// // //                     </Text>
// // //                   </View>
// // //                 </View>
// // //               </View>
// // //               <View style={styles.parentSpaceBlock}>
// // //                 <Text style={[styles.addressDetails, styles.addressTypo]}>
// // //                   Address details
// // //                 </Text>
// // //                 <View
// // //                   style={[
// // //                     styles.componentsSearchDefault1,
// // //                     styles.componentsSpaceBlock,
// // //                   ]}
// // //                 >
// // //                   <TextInput
// // //                     style={styles.addressDetailsInput}
// // //                     placeholder="e.g. Floor, unit number"
// // //                     placeholderTextColor="#b8b8b8"
// // //                   />
// // //                 </View>
// // //               </View>
// // //               <View style={styles.parentSpaceBlock}>
// // //                 <Text style={[styles.addressDetails, styles.addressTypo]}>
// // //                   Note to Service Provider
// // //                 </Text>
// // //                 <View
// // //                   style={[
// // //                     styles.componentsSearchDefault1,
// // //                     styles.componentsSpaceBlock,
// // //                   ]}
// // //                 >
// // //                   <TextInput
// // //                     style={styles.addressDetailsInput}
// // //                     placeholder="e.g. Meet me at the lobby"
// // //                     placeholderTextColor="#b8b8b8"
// // //                   />
// // //                 </View>
// // //               </View>
// // //               <View style={[styles.frameContainer, styles.parentSpaceBlock]}>
// // //                 <View style={styles.addToSavedPlacesParent}>
// // //                   <Text style={[styles.addToSaved, styles.addToSavedTypo]}>
// // //                     Add to Saved Places
// // //                   </Text>
// // //                   <Text
// // //                     style={[styles.saveThisPlace, styles.saveThisPlaceTypo]}
// // //                   >
// // //                     Save this place for future orders
// // //                   </Text>
// // //                 </View>
// // //                 <View style={[styles.savedPlaces, styles.iconOutlineFlexBox]}>
// // //                   <Pressable style={styles.bookmarkBtn}>
// // //                     <Image
// // //                       style={[
// // //                         styles.savedBookmarkIcon,
// // //                         styles.bookmarkIconPosition,
// // //                       ]}
// // //                       contentFit="cover"
// // //                       source={require("../assets/saved-bookmark.png")}
// // //                     />
// // //                     <Image
// // //                       style={[
// // //                         styles.unsavedBookmarkIcon,
// // //                         styles.bookmarkIconPosition,
// // //                       ]}
// // //                       contentFit="cover"
// // //                       source={require("../assets/unsaved-bookmark.png")}
// // //                     />
// // //                   </Pressable>
// // //                 </View>
// // //               </View>
// // //               <View style={[styles.nameParent, styles.parentSpaceBlock]}>
// // //                 <Text style={[styles.address, styles.addressTypo]}>
// // //                   <Text style={styles.addressTxt}>
// // //                     <Text style={styles.address1}>Name</Text>
// // //                     <Text style={styles.text}>*</Text>
// // //                   </Text>
// // //                 </Text>
// // //                 <View
// // //                   style={[
// // //                     styles.componentsSearchDefault1,
// // //                     styles.componentsSpaceBlock,
// // //                   ]}
// // //                 >
// // //                   <TextInput
// // //                     style={styles.addressDetailsInput}
// // //                     placeholder="e.g. Meet me at the lobby"
// // //                     placeholderTextColor="#b8b8b8"
// // //                   />
// // //                 </View>
// // //               </View>
// // //               <View
// // //                 style={[
// // //                   styles.componentsbuttonWrapper,
// // //                   styles.parentSpaceBlock,
// // //                 ]}
// // //               >
// // //                 <Pressable style={styles.componentsbutton}>
// // //                   <Text style={styles.viewAllServices}>Confirm</Text>
// // //                 </Pressable>
// // //               </View>
// // //             </View>
// // //           </View> */}
// // //         {/* </ImageBackground> */}
// // //       </View>
// // //     </View>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   frameFlexBox: {
// // //     justifyContent: "flex-end",
// // //     alignItems: "center",
// // //   },
// // //   wrapperSpaceBlock: {
// // //     paddingTop: Padding.p_xl,
// // //     alignItems: "center",
// // //   },
// // //   addressTypo: {
// // //     fontFamily: FontFamily.level2Medium12,
// // //     fontWeight: "500",
// // //   },
// // //   componentsSpaceBlock: {
// // //     marginTop: 5,
// // //     paddingBottom: Padding.p_3xs,
// // //     paddingRight: Padding.p_3xs,
// // //     paddingTop: Padding.p_3xs,
// // //     paddingLeft: Padding.p_8xs,
// // //     borderWidth: 1,
// // //     borderColor: Color.colorDarkgray_100,
// // //     borderStyle: "solid",
// // //     borderRadius: Border.br_5xs,
// // //     overflow: "hidden",
// // //     justifyContent: "center",
// // //     flexDirection: "row",
// // //     alignSelf: "stretch",
// // //     alignItems: "center",
// // //   },
// // //   addToSavedTypo: {
// // //     lineHeight: 15,
// // //     fontSize: FontSize.m3LabelLarge_size,
// // //     textAlign: "left",
// // //   },
// // //   saveThisPlaceTypo: {
// // //     fontSize: FontSize.size_3xs,
// // //     fontFamily: FontFamily.montserratRegular,
// // //     lineHeight: 15,
// // //     textAlign: "left",
// // //   },
// // //   parentSpaceBlock: {
// // //     marginTop: 15,
// // //     alignSelf: "stretch",
// // //   },
// // //   iconOutlineFlexBox: {
// // //     padding: Padding.p_12xs,
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
// // //   uiIconarrowBackwardfilled: {
// // //     width: 24,
// // //     overflow: "hidden",
// // //     height: 24,
// // //   },
// // //   backBtn: {
// // //     width: 40,
// // //     paddingHorizontal: Padding.p_xs,
// // //     paddingVertical: Padding.p_9xs,
// // //     justifyContent: "center",
// // //     height: 40,
// // //     borderRadius: Border.br_xl,
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     backgroundColor: Color.white,
// // //   },
// // //   backBtnWrapper: {
// // //     top: 0,
// // //     left: 16,
// // //     paddingHorizontal: 0,
// // //     paddingVertical: Padding.p_mini,
// // //     zIndex: 2,
// // //     flexDirection: "row",
// // //     position: "absolute",
// // //   },
// // //   icons8Location10021: {
// // //     width: 50,
// // //     height: 50,
// // //   },
// // //   icons8Location10021Wrapper: {
// // //     top: 252,
// // //     left: 28,
// // //     padding: Padding.p_3xs,
// // //     zIndex: 1,
// // //     overflow: "hidden",
// // //     position: "absolute",
// // //   },
// // //   editLocationDetails: {
// // //     fontSize: FontSize.size_mid,
// // //     fontFamily: FontFamily.montserratBold,
// // //     width: 253,
// // //     display: "flex",
// // //     textAlign: "left",
// // //     lineHeight: 32,
// // //     color: Color.colorGray_800,
// // //     fontWeight: "700",
// // //     height: 24,
// // //     alignItems: "center",
// // //   },
// // //   editLocationDetailsWrapper: {
// // //     flexDirection: "row",
// // //     alignSelf: "stretch",
// // //   },
// // //   address1: {
// // //     color: Color.colorGray_300,
// // //   },
// // //   text: {
// // //     color: Color.colorRed_200,
// // //   },
// // //   addressTxt: {
// // //     width: "100%",
// // //   },
// // //   address: {
// // //     fontSize: FontSize.m3LabelLarge_size,
// // //     fontWeight: "500",
// // //     width: 253,
// // //     display: "flex",
// // //     textAlign: "left",
// // //     lineHeight: 32,
// // //     height: 24,
// // //     alignItems: "center",
// // //   },
// // //   locationIcon: {
// // //     width: 30,
// // //     height: 30,
// // //   },
// // //   uscTalamban: {
// // //     fontWeight: "600",
// // //     fontFamily: FontFamily.montserratSemiBold,
// // //     color: Color.colorSilver_300,
// // //     alignSelf: "stretch",
// // //   },
// // //   barangayNasipitTalamban: {
// // //     color: Color.colorDarkgray_300,
// // //     fontFamily: FontFamily.montserratRegular,
// // //   },
// // //   uscTalambanParent: {
// // //     marginLeft: 10,
// // //     overflow: "hidden",
// // //     flex: 1,
// // //   },
// // //   componentsSearchDefault: {
// // //     backgroundColor: Color.colorWhitesmoke_300,
// // //   },
// // //   addressDetails: {
// // //     color: Color.colorGray_300,
// // //     fontSize: FontSize.m3LabelLarge_size,
// // //     fontWeight: "500",
// // //     width: 253,
// // //     display: "flex",
// // //     textAlign: "left",
// // //     lineHeight: 32,
// // //     height: 24,
// // //     alignItems: "center",
// // //   },
// // //   addressDetailsInput: {
// // //     paddingHorizontal: Padding.p_3xs,
// // //     paddingVertical: 0,
// // //     fontSize: FontSize.typographyTaglineSmallRegular_size,
// // //     fontFamily: FontFamily.montserratRegular,
// // //     overflow: "hidden",
// // //     justifyContent: "center",
// // //     alignSelf: "stretch",
// // //     flex: 1,
// // //   },
// // //   componentsSearchDefault1: {
// // //     height: 40,
// // //   },
// // //   addToSaved: {
// // //     fontFamily: FontFamily.level2Medium12,
// // //     fontWeight: "500",
// // //     color: Color.colorGray_800,
// // //     lineHeight: 15,
// // //   },
// // //   saveThisPlace: {
// // //     color: Color.colorDimgray_100,
// // //     marginTop: 3,
// // //     fontFamily: FontFamily.montserratRegular,
// // //   },
// // //   addToSavedPlacesParent: {
// // //     flex: 1,
// // //   },
// // //   savedBookmarkIcon: {
// // //     display: "none",
// // //     zIndex: 0,
// // //   },
// // //   unsavedBookmarkIcon: {
// // //     zIndex: 1,
// // //   },
// // //   bookmarkBtn: {
// // //     width: 25,
// // //     height: 25,
// // //     justifyContent: "center",
// // //     borderRadius: Border.br_xl,
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //   },
// // //   savedPlaces: {
// // //     marginLeft: 10,
// // //     borderRadius: Border.br_xl,
// // //   },
// // //   frameContainer: {
// // //     justifyContent: "center",
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //   },
// // //   nameParent: {
// // //     display: "none",
// // //   },
// // //   viewAllServices: {
// // //     fontSize: FontSize.body1Semibold_size,
// // //     letterSpacing: -0.1,
// // //     lineHeight: 24,
// // //     fontFamily: FontFamily.title2Bold32,
// // //     color: Color.neutral01,
// // //     textAlign: "center",
// // //     fontWeight: "700",
// // //   },
// // //   componentsbutton: {
// // //     borderRadius: Border.br_mini,
// // //     backgroundColor: Color.colorDarkslategray_900,
// // //     paddingHorizontal: Padding.p_3xl,
// // //     paddingVertical: Padding.p_xs,
// // //     justifyContent: "center",
// // //     flexDirection: "row",
// // //     alignSelf: "stretch",
// // //     alignItems: "center",
// // //   },
// // //   componentsbuttonWrapper: {
// // //     paddingTop: Padding.p_xl,
// // //     alignItems: "center",
// // //   },
// // //   frameGroup: {
// // //     borderTopLeftRadius: Border.br_5xl,
// // //     borderTopRightRadius: Border.br_5xl,
// // //     paddingHorizontal: Padding.p_base,
// // //     paddingBottom: Padding.p_mini,
// // //     overflow: "hidden",
// // //     alignSelf: "stretch",
// // //     backgroundColor: Color.colorBlack,
// // //   },
// // //   editLocationDetailsModal: {
// // //     // zIndex: 2,
// // //     // alignSelf: "stretch",
// // //     // borderTopLeftRadius: Border.br_5xl,
// // //     // borderTopRightRadius: Border.br_5xl,
// // //     // paddingHorizontal: Padding.p_base,
// // //     // overflow: "hidden",
// // //     // backgroundColor: Color.colorBlack,

// // //     position: "absolute",

// // //     // backgroundColor: Color.colorBlack,

// // //     // borderRadius: 8,
// // //     width: "100%",
// // //     // elevation: 5,
// // //     height: "auto",
// // //     // flexDirection: "row",
// // //     // alignItems: "center",
// // //   },
// // //   frameParent: {
// // //     alignSelf: "stretch",
// // //     flex: 1,
// // //   },
// // //   body: {
// // //     alignSelf: "stretch",
// // //     flex: 1,
// // //   },
// // //   mapsEditLocationDetailsNo: {
// // //     height: 812,
// // //     alignItems: "center",
// // //     width: "100%",
// // //     flex: 1,
// // //     // backgroundColor: Color.colorDarkslateblue_200,
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
// // //   locationButton: {
// // //     position: "absolute",
// // //     bottom: 190,
// // //     right: 20,
// // //     width: 50,
// // //     height: 50,
// // //   },
// // //   goToMarkerButton: {
// // //     position: "absolute",
// // //     bottom: 270,
// // //     right: 20,
// // //     padding: 3,
// // //     backgroundColor: "#fff",
// // //     borderRadius: 5,
// // //     alignItems: "center",
// // //     justifyContent: "center",
// // //   },
// // //   infoContainer: {
// // //     position: "absolute",
// // //     bottom: 600,
// // //     left: 16,
// // //     right: 16,
// // //     backgroundColor: "white",
// // //     padding: 16,
// // //     borderRadius: 8,
// // //     shadowColor: "#000",
// // //     shadowOffset: { width: 0, height: 2 },
// // //     shadowOpacity: 0.25,
// // //     shadowRadius: 3.84,
// // //     elevation: 5,
// // //     height: "auto",
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //   },
// // //   infoIcon: {
// // //     width: 24,
// // //     height: 24,
// // //     marginRight: 8,
// // //   },
// // //   infoTextContainer: {
// // //     flex: 1,
// // //   },
// // //   infoTitle: {
// // //     fontSize: 16,
// // //     fontWeight: "bold",
// // //   },
// // //   infoSubtitle: {
// // //     fontSize: 14,
// // //     color: "gray",
// // //   },
// // //   editIconContainer: {
// // //     marginLeft: 8,
// // //     position: "absolute",
// // //     width: 24,
// // //     height: 24,
// // //     borderRadius: 12,
// // //     bottom: 500,
// // //     backgroundColor: "#f0f0f0",
// // //     alignItems: "center",
// // //     justifyContent: "center",
// // //   },
// // //   editIcon: {
// // //     width: 16,
// // //     height: 16,
// // //   },
// // //   saveButton: {
// // //     position: "absolute",
// // //     bottom: 500,
// // //     alignSelf: "center",
// // //     backgroundColor: "#007AFF",
// // //     paddingHorizontal: 80,
// // //     paddingVertical: 10,
// // //     borderRadius: 8,
// // //   },
// // //   saveButtonText: {
// // //     color: "white",
// // //     fontWeight: "bold",
// // //   },
// // //   editLocationContainer: {
// // //     position: "absolute",
// // //     bottom: 0,
// // //     left: 0,
// // //     right: 0,
// // //     backgroundColor: "white",
// // //     paddingVertical: 16,
// // //     paddingHorizontal: 16,
// // //     borderRadius: 8,
// // //     flexDirection: "column",
// // //     alignItems: "stretch",
// // //     height: 400,
// // //   },
// // //   searchContainer: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //   },
// // // });

// // // export default MapsEditLocationDetailsNo;


// // import * as React from "react";
// // import {
// //   StatusBar,
// //   StyleSheet,
// //   Pressable,
// //   TouchableOpacity,
// //   View,
// //   Text,
// //   TextInput,
// //   ImageBackground,
// //   Dimensions,
// // } from "react-native";
// // import { Image } from "expo-image";
// // import { useState, useEffect, useRef } from "react";
// // import { useNavigation } from "@react-navigation/native";
// // import { Padding, FontFamily, Color, Border, FontSize } from "../GlobalStyles";
// // import MapView, { Marker } from "react-native-maps";
// // import axios from "axios";
// // import * as Location from "expo-location";
// // import EditLocationDetailsModal from "../components/EditLocationDetailsModal";

// // const MapsEditLocationDetailsNo = ({ route }) => {
// //   const navigation = useNavigation();
// //   const ref = useRef();

// //   // From MapsConfirmLocation
// //   const [selectedCoordinates, setSelectedCoordinates] = useState(
// //     route.params?.selectedCoordinates
// //   );
// //   const [selectedCityAddress, setSelectedCityAddress] = useState(
// //     route.params?.selectedCityAddress
// //   );
// //   const [selectedSpecificLocation, setSelectedSpecificLocation] = useState(
// //     route.params?.selectedSpecificLocation
// //   );

// //   // const [confirmAdd, setConfirmAdd] = useState(route.params?.addedFlag);

// //   const [isInputFocused, setIsInputFocused] = useState(false);

// //   const [initialMapRegion, setInitialMapRegion] = useState({
// //     latitude: selectedCoordinates.latitude,
// //     longitude: selectedCoordinates.longitude,
// //     latitudeDelta: 0.0922,
// //     longitudeDelta: 0.0421,
// //   });

// //   const [initialMarkerPosition, setInitialMarkerPosition] = useState({
// //     latitude: selectedCoordinates.latitude,
// //     longitude: selectedCoordinates.longitude,
// //   });

// //   const [markerPosition, setMarkerPosition] = useState(initialMarkerPosition);
// //   const [reverseGeocodedAddress, setReverseGeocodedAddress] = useState(null);
// //   const [editLocationVisible, setEditLocationVisible] = useState(false);
// //   const [cityAddress, setCityAddress] = useState(null);

// //   const handleMapPress = (event) => {
// //     const { latitude, longitude } = event.nativeEvent.coordinate;
// //     setMarkerPosition({ latitude, longitude });
// //   };

// //   const handleMarkerDragEnd = (event) => {
// //     const { latitude, longitude } = event.nativeEvent.coordinate;
// //     setMarkerPosition({ latitude, longitude });
// //   };

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

// //   useEffect(() => {
// //     console.log("selected Specific Location:", selectedSpecificLocation);
// //     console.log("selected City Address:", selectedCityAddress);
// //     console.log("selected Coordinates:", selectedCoordinates.latitude);
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
// //     <View style={styles.mapsEditLocationDetailsNo}>
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
// //               draggable={true}
// //               onDragEnd={handleMarkerDragEnd}
// //               image={require("../assets/icons8location100-2-1.png")}
// //             />
// //           </MapView>
// //         </View>

// //         {/* <View style={styles.infoContainer}>
// //           <Image
// //             style={styles.infoIcon}
// //             source={require("../assets/location-icon1.png")}
// //           />
// //           <View style={styles.infoTextContainer}>
// //             <Text style={styles.infoTitle}>
// //               Hello
// //               // {markerPosition.latitude.toFixed(6)} 
// //             </Text>
// //             <Text style={styles.infoSubtitle}>
// //               {reverseGeocodedAddress || "Loading..."}
// //             </Text>
// //           </View>
// //           <TouchableOpacity
// //             style={styles.editIconContainer}
// //             onPress={() => setEditLocationVisible(!editLocationVisible)}
// //           >
// //             <Image
// //               style={styles.editIcon}
// //               source={require("../assets/pencil-11.png")}
// //             />
// //           </TouchableOpacity>
// //         </View> */}

// //         <View style={styles.editLocationDetailsModal}>
// //           <EditLocationDetailsModal
// //             cityAddress={selectedCityAddress}
// //             specificLocation={selectedSpecificLocation || "Loading..."}
// //             coordinates={selectedCoordinates}
// //           />
// //         </View>

// //         <View style={styles.backBtnWrapper}>
// //           <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
// //             <Image
// //               style={styles.uiIconarrowBackwardfilled}
// //               contentFit="cover"
// //               source={require("../assets/ui-iconarrow-backwardfilled.png")}
// //             />
// //           </Pressable>
// //         </View>
// //         {/* <View style={[styles.editLocationDetailsModal, styles.frameFlexBox]}>
// //           <EditLocationDetailsModal style={{ zIndex: 1 }} />
// //         </View> */}
// //         {/* <View style={[styles.editLocationDetailsModal, styles.frameFlexBox]}>
// //             <View style={[styles.frameGroup, styles.frameFlexBox]}>
// //               <View
// //                 style={[
// //                   styles.editLocationDetailsWrapper,
// //                   styles.wrapperSpaceBlock,
// //                 ]}
// //               >
// //                 <Text style={styles.editLocationDetails}>
// //                   Edit Location Details
// //                 </Text>
// //               </View>
// //               <View style={styles.parentSpaceBlock}>
// //                 <Text style={[styles.address, styles.addressTypo]}>
// //                   <Text style={styles.addressTxt}>
// //                     <Text style={styles.address1}>Address</Text>
// //                     <Text style={styles.text}>*</Text>
// //                   </Text>
// //                 </Text>
// //                 <View
// //                   style={[
// //                     styles.componentsSearchDefault,
// //                     styles.componentsSpaceBlock,
// //                   ]}
// //                 >
// //                   <View style={styles.iconOutlineFlexBox}>
// //                     <Image
// //                       style={styles.locationIcon}
// //                       contentFit="cover"
// //                       source={require("../assets/icons8location100-2-1.png")}
// //                     />
// //                   </View>
// //                   <View style={styles.uscTalambanParent}>
// //                     <Text style={[styles.uscTalamban, styles.addToSavedTypo]}>
// //                       USC Talamban
// //                     </Text>
// //                     <Text
// //                       style={[
// //                         styles.barangayNasipitTalamban,
// //                         styles.saveThisPlaceTypo,
// //                       ]}
// //                     >
// //                       Barangay Nasipit, Talamban, Cebu City
// //                     </Text>
// //                   </View>
// //                 </View>
// //               </View>
// //               <View style={styles.parentSpaceBlock}>
// //                 <Text style={[styles.addressDetails, styles.addressTypo]}>
// //                   Address details
// //                 </Text>
// //                 <View
// //                   style={[
// //                     styles.componentsSearchDefault1,
// //                     styles.componentsSpaceBlock,
// //                   ]}
// //                 >
// //                   <TextInput
// //                     style={styles.addressDetailsInput}
// //                     placeholder="e.g. Floor, unit number"
// //                     placeholderTextColor="#b8b8b8"
// //                   />
// //                 </View>
// //               </View>
// //               <View style={styles.parentSpaceBlock}>
// //                 <Text style={[styles.addressDetails, styles.addressTypo]}>
// //                   Note to Service Provider
// //                 </Text>
// //                 <View
// //                   style={[
// //                     styles.componentsSearchDefault1,
// //                     styles.componentsSpaceBlock,
// //                   ]}
// //                 >
// //                   <TextInput
// //                     style={styles.addressDetailsInput}
// //                     placeholder="e.g. Meet me at the lobby"
// //                     placeholderTextColor="#b8b8b8"
// //                   />
// //                 </View>
// //               </View>
// //               <View style={[styles.frameContainer, styles.parentSpaceBlock]}>
// //                 <View style={styles.addToSavedPlacesParent}>
// //                   <Text style={[styles.addToSaved, styles.addToSavedTypo]}>
// //                     Add to Saved Places
// //                   </Text>
// //                   <Text
// //                     style={[styles.saveThisPlace, styles.saveThisPlaceTypo]}
// //                   >
// //                     Save this place for future orders
// //                   </Text>
// //                 </View>
// //                 <View style={[styles.savedPlaces, styles.iconOutlineFlexBox]}>
// //                   <Pressable style={styles.bookmarkBtn}>
// //                     <Image
// //                       style={[
// //                         styles.savedBookmarkIcon,
// //                         styles.bookmarkIconPosition,
// //                       ]}
// //                       contentFit="cover"
// //                       source={require("../assets/saved-bookmark.png")}
// //                     />
// //                     <Image
// //                       style={[
// //                         styles.unsavedBookmarkIcon,
// //                         styles.bookmarkIconPosition,
// //                       ]}
// //                       contentFit="cover"
// //                       source={require("../assets/unsaved-bookmark.png")}
// //                     />
// //                   </Pressable>
// //                 </View>
// //               </View>
// //               <View style={[styles.nameParent, styles.parentSpaceBlock]}>
// //                 <Text style={[styles.address, styles.addressTypo]}>
// //                   <Text style={styles.addressTxt}>
// //                     <Text style={styles.address1}>Name</Text>
// //                     <Text style={styles.text}>*</Text>
// //                   </Text>
// //                 </Text>
// //                 <View
// //                   style={[
// //                     styles.componentsSearchDefault1,
// //                     styles.componentsSpaceBlock,
// //                   ]}
// //                 >
// //                   <TextInput
// //                     style={styles.addressDetailsInput}
// //                     placeholder="e.g. Meet me at the lobby"
// //                     placeholderTextColor="#b8b8b8"
// //                   />
// //                 </View>
// //               </View>
// //               <View
// //                 style={[
// //                   styles.componentsbuttonWrapper,
// //                   styles.parentSpaceBlock,
// //                 ]}
// //               >
// //                 <Pressable style={styles.componentsbutton}>
// //                   <Text style={styles.viewAllServices}>Confirm</Text>
// //                 </Pressable>
// //               </View>
// //             </View>
// //           </View> */}
// //         {/* </ImageBackground> */}
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   frameFlexBox: {
// //     justifyContent: "flex-end",
// //     alignItems: "center",
// //   },
// //   wrapperSpaceBlock: {
// //     paddingTop: Padding.p_xl,
// //     alignItems: "center",
// //   },
// //   addressTypo: {
// //     fontFamily: FontFamily.level2Medium12,
// //     fontWeight: "500",
// //   },
// //   componentsSpaceBlock: {
// //     marginTop: 5,
// //     paddingBottom: Padding.p_3xs,
// //     paddingRight: Padding.p_3xs,
// //     paddingTop: Padding.p_3xs,
// //     paddingLeft: Padding.p_8xs,
// //     borderWidth: 1,
// //     borderColor: Color.colorDarkgray_100,
// //     borderStyle: "solid",
// //     borderRadius: Border.br_5xs,
// //     overflow: "hidden",
// //     justifyContent: "center",
// //     flexDirection: "row",
// //     alignSelf: "stretch",
// //     alignItems: "center",
// //   },
// //   addToSavedTypo: {
// //     lineHeight: 15,
// //     fontSize: FontSize.m3LabelLarge_size,
// //     textAlign: "left",
// //   },
// //   saveThisPlaceTypo: {
// //     fontSize: FontSize.size_3xs,
// //     fontFamily: FontFamily.montserratRegular,
// //     lineHeight: 15,
// //     textAlign: "left",
// //   },
// //   parentSpaceBlock: {
// //     marginTop: 15,
// //     alignSelf: "stretch",
// //   },
// //   iconOutlineFlexBox: {
// //     padding: Padding.p_12xs,
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
// //   uiIconarrowBackwardfilled: {
// //     width: 24,
// //     overflow: "hidden",
// //     height: 24,
// //   },
// //   backBtn: {
// //     width: 40,
// //     paddingHorizontal: Padding.p_xs,
// //     paddingVertical: Padding.p_9xs,
// //     justifyContent: "center",
// //     height: 40,
// //     borderRadius: Border.br_xl,
// //     flexDirection: "row",
// //     alignItems: "center",
// //     backgroundColor: Color.white,
// //   },
// //   backBtnWrapper: {
// //     top: 0,
// //     left: 16,
// //     paddingHorizontal: 0,
// //     paddingVertical: Padding.p_mini,
// //     zIndex: 2,
// //     flexDirection: "row",
// //     position: "absolute",
// //   },
// //   icons8Location10021: {
// //     width: 50,
// //     height: 50,
// //   },
// //   icons8Location10021Wrapper: {
// //     top: 252,
// //     left: 28,
// //     padding: Padding.p_3xs,
// //     zIndex: 1,
// //     overflow: "hidden",
// //     position: "absolute",
// //   },
// //   editLocationDetails: {
// //     fontSize: FontSize.size_mid,
// //     fontFamily: FontFamily.montserratBold,
// //     width: 253,
// //     display: "flex",
// //     textAlign: "left",
// //     lineHeight: 32,
// //     color: Color.colorGray_800,
// //     fontWeight: "700",
// //     height: 24,
// //     alignItems: "center",
// //   },
// //   editLocationDetailsWrapper: {
// //     flexDirection: "row",
// //     alignSelf: "stretch",
// //   },
// //   address1: {
// //     color: Color.colorGray_300,
// //   },
// //   text: {
// //     color: Color.colorRed_200,
// //   },
// //   addressTxt: {
// //     width: "100%",
// //   },
// //   address: {
// //     fontSize: FontSize.m3LabelLarge_size,
// //     fontWeight: "500",
// //     width: 253,
// //     display: "flex",
// //     textAlign: "left",
// //     lineHeight: 32,
// //     height: 24,
// //     alignItems: "center",
// //   },
// //   locationIcon: {
// //     width: 30,
// //     height: 30,
// //   },
// //   uscTalamban: {
// //     fontWeight: "600",
// //     fontFamily: FontFamily.montserratSemiBold,
// //     color: Color.colorSilver_300,
// //     alignSelf: "stretch",
// //   },
// //   barangayNasipitTalamban: {
// //     color: Color.colorDarkgray_300,
// //     fontFamily: FontFamily.montserratRegular,
// //   },
// //   uscTalambanParent: {
// //     marginLeft: 10,
// //     overflow: "hidden",
// //     flex: 1,
// //   },
// //   componentsSearchDefault: {
// //     backgroundColor: Color.colorWhitesmoke_300,
// //   },
// //   addressDetails: {
// //     color: Color.colorGray_300,
// //     fontSize: FontSize.m3LabelLarge_size,
// //     fontWeight: "500",
// //     width: 253,
// //     display: "flex",
// //     textAlign: "left",
// //     lineHeight: 32,
// //     height: 24,
// //     alignItems: "center",
// //   },
// //   addressDetailsInput: {
// //     paddingHorizontal: Padding.p_3xs,
// //     paddingVertical: 0,
// //     fontSize: FontSize.typographyTaglineSmallRegular_size,
// //     fontFamily: FontFamily.montserratRegular,
// //     overflow: "hidden",
// //     justifyContent: "center",
// //     alignSelf: "stretch",
// //     flex: 1,
// //   },
// //   componentsSearchDefault1: {
// //     height: 40,
// //   },
// //   addToSaved: {
// //     fontFamily: FontFamily.level2Medium12,
// //     fontWeight: "500",
// //     color: Color.colorGray_800,
// //     lineHeight: 15,
// //   },
// //   saveThisPlace: {
// //     color: Color.colorDimgray_100,
// //     marginTop: 3,
// //     fontFamily: FontFamily.montserratRegular,
// //   },
// //   addToSavedPlacesParent: {
// //     flex: 1,
// //   },
// //   savedBookmarkIcon: {
// //     display: "none",
// //     zIndex: 0,
// //   },
// //   unsavedBookmarkIcon: {
// //     zIndex: 1,
// //   },
// //   bookmarkBtn: {
// //     width: 25,
// //     height: 25,
// //     justifyContent: "center",
// //     borderRadius: Border.br_xl,
// //     flexDirection: "row",
// //     alignItems: "center",
// //   },
// //   savedPlaces: {
// //     marginLeft: 10,
// //     borderRadius: Border.br_xl,
// //   },
// //   frameContainer: {
// //     justifyContent: "center",
// //     flexDirection: "row",
// //     alignItems: "center",
// //   },
// //   nameParent: {
// //     display: "none",
// //   },
// //   viewAllServices: {
// //     fontSize: FontSize.body1Semibold_size,
// //     letterSpacing: -0.1,
// //     lineHeight: 24,
// //     fontFamily: FontFamily.title2Bold32,
// //     color: Color.neutral01,
// //     textAlign: "center",
// //     fontWeight: "700",
// //   },
// //   componentsbutton: {
// //     borderRadius: Border.br_mini,
// //     backgroundColor: Color.colorDarkslategray_900,
// //     paddingHorizontal: Padding.p_3xl,
// //     paddingVertical: Padding.p_xs,
// //     justifyContent: "center",
// //     flexDirection: "row",
// //     alignSelf: "stretch",
// //     alignItems: "center",
// //   },
// //   componentsbuttonWrapper: {
// //     paddingTop: Padding.p_xl,
// //     alignItems: "center",
// //   },
// //   frameGroup: {
// //     borderTopLeftRadius: Border.br_5xl,
// //     borderTopRightRadius: Border.br_5xl,
// //     paddingHorizontal: Padding.p_base,
// //     paddingBottom: Padding.p_mini,
// //     overflow: "hidden",
// //     alignSelf: "stretch",
// //     backgroundColor: Color.colorBlack,
// //   },
// //   editLocationDetailsModal: {
// //     // zIndex: 2,
// //     // alignSelf: "stretch",
// //     // borderTopLeftRadius: Border.br_5xl,
// //     // borderTopRightRadius: Border.br_5xl,
// //     // paddingHorizontal: Padding.p_base,
// //     // overflow: "hidden",
// //     // backgroundColor: Color.colorBlack,

// //     position: "absolute",

// //     // backgroundColor: Color.colorBlack,

// //     // borderRadius: 8,
// //     width: "100%",
// //     // elevation: 5,
// //     height: "auto",
// //     // flexDirection: "row",
// //     // alignItems: "center",
// //   },
// //   frameParent: {
// //     alignSelf: "stretch",
// //     flex: 1,
// //   },
// //   body: {
// //     alignSelf: "stretch",
// //     flex: 1,
// //   },
// //   mapsEditLocationDetailsNo: {
// //     height: 812,
// //     alignItems: "center",
// //     width: "100%",
// //     flex: 1,
// //     // backgroundColor: Color.colorDarkslateblue_200,
// //   },

// //   // Location Styles
// //   rowContainer: {
// //     flex: 1,
// //     flexDirection: "row",
// //   },
// //   map: {
// //     width: 500, // Set the desired width
// //     height: 500, // Set the desired height
// //     // zIndex: 1,
// //   },
// //   locationButton: {
// //     position: "absolute",
// //     bottom: 190,
// //     right: 20,
// //     width: 50,
// //     height: 50,
// //   },
// //   goToMarkerButton: {
// //     position: "absolute",
// //     bottom: 270,
// //     right: 20,
// //     padding: 3,
// //     backgroundColor: "#fff",
// //     borderRadius: 5,
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   infoContainer: {
// //     position: "absolute",
// //     bottom: 600,
// //     left: 16,
// //     right: 16,
// //     backgroundColor: "white",
// //     padding: 16,
// //     borderRadius: 8,
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.25,
// //     shadowRadius: 3.84,
// //     elevation: 5,
// //     height: "auto",
// //     flexDirection: "row",
// //     alignItems: "center",
// //   },
// //   infoIcon: {
// //     width: 24,
// //     height: 24,
// //     marginRight: 8,
// //   },
// //   infoTextContainer: {
// //     flex: 1,
// //   },
// //   infoTitle: {
// //     fontSize: 16,
// //     fontWeight: "bold",
// //   },
// //   infoSubtitle: {
// //     fontSize: 14,
// //     color: "gray",
// //   },
// //   editIconContainer: {
// //     marginLeft: 8,
// //     position: "absolute",
// //     width: 24,
// //     height: 24,
// //     borderRadius: 12,
// //     bottom: 500,
// //     backgroundColor: "#f0f0f0",
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   editIcon: {
// //     width: 16,
// //     height: 16,
// //   },
// //   saveButton: {
// //     position: "absolute",
// //     bottom: 500,
// //     alignSelf: "center",
// //     backgroundColor: "#007AFF",
// //     paddingHorizontal: 80,
// //     paddingVertical: 10,
// //     borderRadius: 8,
// //   },
// //   saveButtonText: {
// //     color: "white",
// //     fontWeight: "bold",
// //   },
// //   editLocationContainer: {
// //     position: "absolute",
// //     bottom: 0,
// //     left: 0,
// //     right: 0,
// //     backgroundColor: "white",
// //     paddingVertical: 16,
// //     paddingHorizontal: 16,
// //     borderRadius: 8,
// //     flexDirection: "column",
// //     alignItems: "stretch",
// //     height: 400,
// //   },
// //   searchContainer: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //   },
// // });

// // export default MapsEditLocationDetailsNo;


// import * as React from "react";
// import {
//   StatusBar,
//   StyleSheet,
//   Pressable,
//   TouchableOpacity,
//   View,
//   Text,
//   TextInput,
//   ImageBackground,
//   Dimensions,
// } from "react-native";
// import { Image } from "expo-image";
// import { useState, useEffect, useRef } from "react";
// import { useNavigation } from "@react-navigation/native";
// import { Padding, FontFamily, Color, Border, FontSize } from "../GlobalStyles";
// import MapView, { Marker } from "react-native-maps";
// import axios from "axios";
// import * as Location from "expo-location";
// import EditLocationDetailsModal from "../components/EditLocationDetailsModal";

// const MapsEditLocationDetailsNo = ({ route }) => {
//   const navigation = useNavigation();
//   const ref = useRef();

//   // From MapsConfirmLocation
//   const [selectedCoordinates, setSelectedCoordinates] = useState(
//     route.params?.selectedCoordinates
//   );
//   const [selectedCityAddress, setSelectedCityAddress] = useState(
//     route.params?.selectedCityAddress
//   );
//   const [selectedSpecificLocation, setSelectedSpecificLocation] = useState(
//     route.params?.selectedSpecificLocation
//   );

//   // const [confirmAdd, setConfirmAdd] = useState(route.params?.addedFlag);

//   const [isInputFocused, setIsInputFocused] = useState(false);

//   const [initialMapRegion, setInitialMapRegion] = useState({
//     latitude: selectedCoordinates.latitude,
//     longitude: selectedCoordinates.longitude,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.3021,
//   });

//   const [initialMarkerPosition, setInitialMarkerPosition] = useState({
//     latitude: selectedCoordinates.latitude,
//     longitude: selectedCoordinates.longitude,
//   });

//   const [markerPosition, setMarkerPosition] = useState(initialMarkerPosition);
//   const [reverseGeocodedAddress, setReverseGeocodedAddress] = useState(null);
//   const [editLocationVisible, setEditLocationVisible] = useState(false);
//   const [cityAddress, setCityAddress] = useState(null);

//   const handleMapPress = (event) => {
//     const { latitude, longitude } = event.nativeEvent.coordinate;
//     setMarkerPosition({ latitude, longitude });
//   };

//   const handleMarkerDragEnd = (event) => {
//     const { latitude, longitude } = event.nativeEvent.coordinate;
//     setMarkerPosition({ latitude, longitude });
//   };

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

//   useEffect(() => {
//     console.log("selected Specific Location:", selectedSpecificLocation);
//     console.log("selected City Address:", selectedCityAddress);
//     console.log("selected Coordinates:", selectedCoordinates.latitude);
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
//     <View style={styles.mapsEditLocationDetailsNo}>
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
//               draggable={true}
//               onDragEnd={handleMarkerDragEnd}
//               image={require("../assets/icons8location100-2-1.png")}
//             />
//           </MapView>
//         </View>

//         {/* <View style={styles.infoContainer}>
//           <Image
//             style={styles.infoIcon}
//             source={require("../assets/location-icon1.png")}
//           />
//           <View style={styles.infoTextContainer}>
//             <Text style={styles.infoTitle}>
//               Hello
//               // {markerPosition.latitude.toFixed(6)} 
//             </Text>
//             <Text style={styles.infoSubtitle}>
//               {reverseGeocodedAddress || "Loading..."}
//             </Text>
//           </View>
//           <TouchableOpacity
//             style={styles.editIconContainer}
//             onPress={() => setEditLocationVisible(!editLocationVisible)}
//           >
//             <Image
//               style={styles.editIcon}
//               source={require("../assets/pencil-11.png")}
//             />
//           </TouchableOpacity>
//         </View> */}

//         <View style={styles.editLocationDetailsModal}>
//           <EditLocationDetailsModal
//             cityAddress={selectedCityAddress}
//             specificLocation={selectedSpecificLocation || "Loading..."}
//             coordinates={selectedCoordinates}
//           />
//         </View>

//         <View style={styles.backBtnWrapper}>
//           <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
//             <Image
//               style={styles.uiIconarrowBackwardfilled}
//               contentFit="cover"
//               source={require("../assets/ui-iconarrow-backwardfilled.png")}
//             />
//           </Pressable>
//         </View>
//         {/* <View style={[styles.editLocationDetailsModal, styles.frameFlexBox]}>
//           <EditLocationDetailsModal style={{ zIndex: 1 }} />
//         </View> */}
//         {/* <View style={[styles.editLocationDetailsModal, styles.frameFlexBox]}>
//             <View style={[styles.frameGroup, styles.frameFlexBox]}>
//               <View
//                 style={[
//                   styles.editLocationDetailsWrapper,
//                   styles.wrapperSpaceBlock,
//                 ]}
//               >
//                 <Text style={styles.editLocationDetails}>
//                   Edit Location Details
//                 </Text>
//               </View>
//               <View style={styles.parentSpaceBlock}>
//                 <Text style={[styles.address, styles.addressTypo]}>
//                   <Text style={styles.addressTxt}>
//                     <Text style={styles.address1}>Address</Text>
//                     <Text style={styles.text}>*</Text>
//                   </Text>
//                 </Text>
//                 <View
//                   style={[
//                     styles.componentsSearchDefault,
//                     styles.componentsSpaceBlock,
//                   ]}
//                 >
//                   <View style={styles.iconOutlineFlexBox}>
//                     <Image
//                       style={styles.locationIcon}
//                       contentFit="cover"
//                       source={require("../assets/icons8location100-2-1.png")}
//                     />
//                   </View>
//                   <View style={styles.uscTalambanParent}>
//                     <Text style={[styles.uscTalamban, styles.addToSavedTypo]}>
//                       USC Talamban
//                     </Text>
//                     <Text
//                       style={[
//                         styles.barangayNasipitTalamban,
//                         styles.saveThisPlaceTypo,
//                       ]}
//                     >
//                       Barangay Nasipit, Talamban, Cebu City
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//               <View style={styles.parentSpaceBlock}>
//                 <Text style={[styles.addressDetails, styles.addressTypo]}>
//                   Address details
//                 </Text>
//                 <View
//                   style={[
//                     styles.componentsSearchDefault1,
//                     styles.componentsSpaceBlock,
//                   ]}
//                 >
//                   <TextInput
//                     style={styles.addressDetailsInput}
//                     placeholder="e.g. Floor, unit number"
//                     placeholderTextColor="#b8b8b8"
//                   />
//                 </View>
//               </View>
//               <View style={styles.parentSpaceBlock}>
//                 <Text style={[styles.addressDetails, styles.addressTypo]}>
//                   Note to Service Provider
//                 </Text>
//                 <View
//                   style={[
//                     styles.componentsSearchDefault1,
//                     styles.componentsSpaceBlock,
//                   ]}
//                 >
//                   <TextInput
//                     style={styles.addressDetailsInput}
//                     placeholder="e.g. Meet me at the lobby"
//                     placeholderTextColor="#b8b8b8"
//                   />
//                 </View>
//               </View>
//               <View style={[styles.frameContainer, styles.parentSpaceBlock]}>
//                 <View style={styles.addToSavedPlacesParent}>
//                   <Text style={[styles.addToSaved, styles.addToSavedTypo]}>
//                     Add to Saved Places
//                   </Text>
//                   <Text
//                     style={[styles.saveThisPlace, styles.saveThisPlaceTypo]}
//                   >
//                     Save this place for future orders
//                   </Text>
//                 </View>
//                 <View style={[styles.savedPlaces, styles.iconOutlineFlexBox]}>
//                   <Pressable style={styles.bookmarkBtn}>
//                     <Image
//                       style={[
//                         styles.savedBookmarkIcon,
//                         styles.bookmarkIconPosition,
//                       ]}
//                       contentFit="cover"
//                       source={require("../assets/saved-bookmark.png")}
//                     />
//                     <Image
//                       style={[
//                         styles.unsavedBookmarkIcon,
//                         styles.bookmarkIconPosition,
//                       ]}
//                       contentFit="cover"
//                       source={require("../assets/unsaved-bookmark.png")}
//                     />
//                   </Pressable>
//                 </View>
//               </View>
//               <View style={[styles.nameParent, styles.parentSpaceBlock]}>
//                 <Text style={[styles.address, styles.addressTypo]}>
//                   <Text style={styles.addressTxt}>
//                     <Text style={styles.address1}>Name</Text>
//                     <Text style={styles.text}>*</Text>
//                   </Text>
//                 </Text>
//                 <View
//                   style={[
//                     styles.componentsSearchDefault1,
//                     styles.componentsSpaceBlock,
//                   ]}
//                 >
//                   <TextInput
//                     style={styles.addressDetailsInput}
//                     placeholder="e.g. Meet me at the lobby"
//                     placeholderTextColor="#b8b8b8"
//                   />
//                 </View>
//               </View>
//               <View
//                 style={[
//                   styles.componentsbuttonWrapper,
//                   styles.parentSpaceBlock,
//                 ]}
//               >
//                 <Pressable style={styles.componentsbutton}>
//                   <Text style={styles.viewAllServices}>Confirm</Text>
//                 </Pressable>
//               </View>
//             </View>
//           </View> */}
//         {/* </ImageBackground> */}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   frameFlexBox: {
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   wrapperSpaceBlock: {
//     paddingTop: Padding.p_xl,
//     alignItems: "center",
//   },
//   addressTypo: {
//     fontFamily: FontFamily.level2Medium12,
//     fontWeight: "500",
//   },
//   componentsSpaceBlock: {
//     marginTop: 5,
//     paddingBottom: Padding.p_3xs,
//     paddingRight: Padding.p_3xs,
//     paddingTop: Padding.p_3xs,
//     paddingLeft: Padding.p_8xs,
//     borderWidth: 1,
//     borderColor: Color.colorDarkgray_100,
//     borderStyle: "solid",
//     borderRadius: Border.br_5xs,
//     overflow: "hidden",
//     justifyContent: "center",
//     flexDirection: "row",
//     alignSelf: "stretch",
//     alignItems: "center",
//   },
//   addToSavedTypo: {
//     lineHeight: 15,
//     fontSize: FontSize.m3LabelLarge_size,
//     textAlign: "left",
//   },
//   saveThisPlaceTypo: {
//     fontSize: FontSize.size_3xs,
//     fontFamily: FontFamily.montserratRegular,
//     lineHeight: 15,
//     textAlign: "left",
//   },
//   parentSpaceBlock: {
//     marginTop: 15,
//     alignSelf: "stretch",
//   },
//   iconOutlineFlexBox: {
//     padding: Padding.p_12xs,
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
//   uiIconarrowBackwardfilled: {
//     width: 24,
//     overflow: "hidden",
//     height: 24,
//   },
//   backBtn: {
//     width: 40,
//     paddingHorizontal: Padding.p_xs,
//     paddingVertical: Padding.p_9xs,
//     justifyContent: "center",
//     height: 40,
//     borderRadius: Border.br_xl,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: Color.white,
//   },
//   backBtnWrapper: {
//     top: 0,
//     left: 16,
//     paddingHorizontal: 0,
//     paddingVertical: Padding.p_mini,
//     zIndex: 2,
//     flexDirection: "row",
//     position: "absolute",
//   },
//   icons8Location10021: {
//     width: 50,
//     height: 50,
//   },
//   icons8Location10021Wrapper: {
//     top: 252,
//     left: 28,
//     padding: Padding.p_3xs,
//     zIndex: 1,
//     overflow: "hidden",
//     position: "absolute",
//   },
//   editLocationDetails: {
//     fontSize: FontSize.size_mid,
//     fontFamily: FontFamily.montserratBold,
//     width: 253,
//     display: "flex",
//     textAlign: "left",
//     lineHeight: 32,
//     color: Color.colorGray_800,
//     fontWeight: "700",
//     height: 24,
//     alignItems: "center",
//   },
//   editLocationDetailsWrapper: {
//     flexDirection: "row",
//     alignSelf: "stretch",
//   },
//   address1: {
//     color: Color.colorGray_300,
//   },
//   text: {
//     color: Color.colorRed_200,
//   },
//   addressTxt: {
//     width: "100%",
//   },
//   address: {
//     fontSize: FontSize.m3LabelLarge_size,
//     fontWeight: "500",
//     width: 253,
//     display: "flex",
//     textAlign: "left",
//     lineHeight: 32,
//     height: 24,
//     alignItems: "center",
//   },
//   locationIcon: {
//     width: 30,
//     height: 30,
//   },
//   uscTalamban: {
//     fontWeight: "600",
//     fontFamily: FontFamily.montserratSemiBold,
//     color: Color.colorSilver_300,
//     alignSelf: "stretch",
//   },
//   barangayNasipitTalamban: {
//     color: Color.colorDarkgray_300,
//     fontFamily: FontFamily.montserratRegular,
//   },
//   uscTalambanParent: {
//     marginLeft: 10,
//     overflow: "hidden",
//     flex: 1,
//   },
//   componentsSearchDefault: {
//     backgroundColor: Color.colorWhitesmoke_300,
//   },
//   addressDetails: {
//     color: Color.colorGray_300,
//     fontSize: FontSize.m3LabelLarge_size,
//     fontWeight: "500",
//     width: 253,
//     display: "flex",
//     textAlign: "left",
//     lineHeight: 32,
//     height: 24,
//     alignItems: "center",
//   },
//   addressDetailsInput: {
//     paddingHorizontal: Padding.p_3xs,
//     paddingVertical: 0,
//     fontSize: FontSize.typographyTaglineSmallRegular_size,
//     fontFamily: FontFamily.montserratRegular,
//     overflow: "hidden",
//     justifyContent: "center",
//     alignSelf: "stretch",
//     flex: 1,
//   },
//   componentsSearchDefault1: {
//     height: 40,
//   },
//   addToSaved: {
//     fontFamily: FontFamily.level2Medium12,
//     fontWeight: "500",
//     color: Color.colorGray_800,
//     lineHeight: 15,
//   },
//   saveThisPlace: {
//     color: Color.colorDimgray_100,
//     marginTop: 3,
//     fontFamily: FontFamily.montserratRegular,
//   },
//   addToSavedPlacesParent: {
//     flex: 1,
//   },
//   savedBookmarkIcon: {
//     display: "none",
//     zIndex: 0,
//   },
//   unsavedBookmarkIcon: {
//     zIndex: 1,
//   },
//   bookmarkBtn: {
//     width: 25,
//     height: 25,
//     justifyContent: "center",
//     borderRadius: Border.br_xl,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   savedPlaces: {
//     marginLeft: 10,
//     borderRadius: Border.br_xl,
//   },
//   frameContainer: {
//     justifyContent: "center",
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   nameParent: {
//     display: "none",
//   },
//   viewAllServices: {
//     fontSize: FontSize.body1Semibold_size,
//     letterSpacing: -0.1,
//     lineHeight: 24,
//     fontFamily: FontFamily.title2Bold32,
//     color: Color.neutral01,
//     textAlign: "center",
//     fontWeight: "700",
//   },
//   componentsbutton: {
//     borderRadius: Border.br_mini,
//     backgroundColor: Color.colorDarkslategray_900,
//     paddingHorizontal: Padding.p_3xl,
//     paddingVertical: Padding.p_xs,
//     justifyContent: "center",
//     flexDirection: "row",
//     alignSelf: "stretch",
//     alignItems: "center",
//   },
//   componentsbuttonWrapper: {
//     paddingTop: Padding.p_xl,
//     alignItems: "center",
//   },
//   frameGroup: {
//     borderTopLeftRadius: Border.br_5xl,
//     borderTopRightRadius: Border.br_5xl,
//     paddingHorizontal: Padding.p_base,
//     paddingBottom: Padding.p_mini,
//     overflow: "hidden",
//     alignSelf: "stretch",
//     backgroundColor: Color.colorBlack,
//   },
//   editLocationDetailsModal: {
//     // zIndex: 2,
//     // alignSelf: "stretch",
//     // borderTopLeftRadius: Border.br_5xl,
//     // borderTopRightRadius: Border.br_5xl,
//     // paddingHorizontal: Padding.p_base,
//     // overflow: "hidden",
//     // backgroundColor: Color.colorBlack,

//     position: "absolute",

//     // backgroundColor: Color.colorBlack,

//     // borderRadius: 8,
//     width: "100%",
//     // elevation: 5,
//     height: "auto",
//     // flexDirection: "row",
//     // alignItems: "center",
//   },
//   frameParent: {
//     alignSelf: "stretch",
//     flex: 1,
//   },
//   body: {
//     alignSelf: "stretch",
//     flex: 1,
//   },
//   mapsEditLocationDetailsNo: {
//     height: 812,
//     alignItems: "center",
//     width: "100%",
//     flex: 1,
//     // backgroundColor: Color.colorDarkslateblue_200,
//   },

//   // Location Styles
//   rowContainer: {
//     flex: 1,
//     flexDirection: "row",
//   },
//   map: {
//     width: 500, // Set the desired width
//     height: 500, // Set the desired height
//     // zIndex: 1,
//   },
//   locationButton: {
//     position: "absolute",
//     bottom: 190,
//     right: 20,
//     width: 50,
//     height: 50,
//   },
//   goToMarkerButton: {
//     position: "absolute",
//     bottom: 270,
//     right: 20,
//     padding: 3,
//     backgroundColor: "#fff",
//     borderRadius: 5,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   infoContainer: {
//     position: "absolute",
//     bottom: 600,
//     left: 16,
//     right: 16,
//     backgroundColor: "white",
//     padding: 16,
//     borderRadius: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     height: "auto",
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   infoIcon: {
//     width: 24,
//     height: 24,
//     marginRight: 8,
//   },
//   infoTextContainer: {
//     flex: 1,
//   },
//   infoTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   infoSubtitle: {
//     fontSize: 14,
//     color: "gray",
//   },
//   editIconContainer: {
//     marginLeft: 8,
//     position: "absolute",
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     bottom: 500,
//     backgroundColor: "#f0f0f0",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   editIcon: {
//     width: 16,
//     height: 16,
//   },
//   saveButton: {
//     position: "absolute",
//     bottom: 500,
//     alignSelf: "center",
//     backgroundColor: "#007AFF",
//     paddingHorizontal: 80,
//     paddingVertical: 10,
//     borderRadius: 8,
//   },
//   saveButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   editLocationContainer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "white",
//     paddingVertical: 16,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     flexDirection: "column",
//     alignItems: "stretch",
//     height: 400,
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
// });

// export default MapsEditLocationDetailsNo;


import * as React from "react";
import {
  StatusBar,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Padding, FontFamily, Color, Border, FontSize } from "../GlobalStyles";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import * as Location from "expo-location";
import EditLocationDetailsModal from "../components/EditLocationDetailsModal";

const MapsEditLocationDetailsNo = ({ route }) => {
  const navigation = useNavigation();
  const ref = useRef();

  //From MapsConfirmLocation
  const [selectedCoordinates, setSelectedCoordinates] = useState(
    route.params?.selectedCoordinates
  );
  const [selectedCityAddress, setSelectedCityAddress] = useState(
    route.params?.selectedCityAddress
  );
  const [selectedSpecificLocation, setSelectedSpecificLocation] = useState(
    route.params?.selectedSpecificLocation
  );


  console.log("Selected Coordinates: ", selectedCoordinates);

  // const [selectedCoordinates, selectedCityAddress, selectedSpecificLocation] = route.params;

  // const [confirmAdd, setConfirmAdd] = useState(route.params?.addedFlag);

  const [isInputFocused, setIsInputFocused] = useState(false);

  const [initialMapRegion, setInitialMapRegion] = useState({
    latitude: selectedCoordinates.latitude - 0.0025,
    longitude: selectedCoordinates.longitude,
    latitudeDelta: 0.0141,
    longitudeDelta: 0.0041,
  });

  const [initialMarkerPosition, setInitialMarkerPosition] = useState({
    latitude: selectedCoordinates.latitude,
    longitude: selectedCoordinates.longitude,
  });

  const [markerPosition, setMarkerPosition] = useState(initialMarkerPosition);
  const [reverseGeocodedAddress, setReverseGeocodedAddress] = useState(null);
  const [editLocationVisible, setEditLocationVisible] = useState(false);
  const [cityAddress, setCityAddress] = useState(null);


  const handleMarkerDragEnd = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarkerPosition({ latitude, longitude });
  };

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
        console.log("City:", city);
      } else {
        setReverseGeocodedAddress("Location not found");
        console.log("Location not found");
      }
    } catch (error) {
      console.error("Error fetching reverse geolocation:", error);
    }
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

  useEffect(() => {
    console.log("selected Specific Location:", selectedSpecificLocation);
    console.log("selected City Address:", selectedCityAddress);
    console.log("Latitude:", selectedCoordinates.latitude);
    console.log("Longitude:", selectedCoordinates.longitude);
  }, [markerPosition, isInputFocused]);

  return (
    <View style={styles.mapsEditLocationDetailsNo}>
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
              draggable={true}
              onDragEnd={handleMarkerDragEnd}
              image={require("../assets/icons8location100-2-1.png")}
            />
          </MapView>
        </View>

        <View style={styles.editLocationDetailsModal}>
          <EditLocationDetailsModal
            cityAddress={selectedCityAddress}
            specificLocation={selectedSpecificLocation || "Loading..."}
            selectedCoordinates={selectedCoordinates}
          />
        </View>

        <View style={styles.backBtnWrapper}>
          <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Image
              style={styles.uiIconarrowBackwardfilled}
              contentFit="cover"
              source={require("../assets/ui-iconarrow-backwardfilled.png")}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameFlexBox: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  wrapperSpaceBlock: {
    paddingTop: Padding.p_xl,
    alignItems: "center",
  },
  addressTypo: {
    fontFamily: FontFamily.level2Medium12,
    fontWeight: "500",
  },
  componentsSpaceBlock: {
    marginTop: 5,
    paddingBottom: Padding.p_3xs,
    paddingRight: Padding.p_3xs,
    paddingTop: Padding.p_3xs,
    paddingLeft: Padding.p_8xs,
    borderWidth: 1,
    borderColor: Color.colorDarkgray_100,
    borderStyle: "solid",
    borderRadius: Border.br_5xs,
    overflow: "hidden",
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  addToSavedTypo: {
    lineHeight: 15,
    fontSize: FontSize.m3LabelLarge_size,
    textAlign: "left",
  },
  saveThisPlaceTypo: {
    fontSize: FontSize.size_3xs,
    fontFamily: FontFamily.montserratRegular,
    lineHeight: 15,
    textAlign: "left",
  },
  parentSpaceBlock: {
    marginTop: 15,
    alignSelf: "stretch",
  },
  iconOutlineFlexBox: {
    padding: Padding.p_12xs,
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
  uiIconarrowBackwardfilled: {
    width: 24,
    overflow: "hidden",
    height: 24,
  },
  backBtn: {
    width: 40,
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_9xs,
    justifyContent: "center",
    height: 40,
    borderRadius: Border.br_xl,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.white,
  },
  backBtnWrapper: {
    top: 0,
    left: 16,
    paddingHorizontal: 0,
    paddingVertical: Padding.p_mini,
    zIndex: 2,
    flexDirection: "row",
    position: "absolute",
  },
  icons8Location10021: {
    width: 50,
    height: 50,
  },
  icons8Location10021Wrapper: {
    top: 252,
    left: 28,
    padding: Padding.p_3xs,
    zIndex: 1,
    overflow: "hidden",
    position: "absolute",
  },
  editLocationDetails: {
    fontSize: FontSize.size_mid,
    fontFamily: FontFamily.montserratBold,
    width: 253,
    display: "flex",
    textAlign: "left",
    lineHeight: 32,
    color: Color.colorGray_800,
    fontWeight: "700",
    height: 24,
    alignItems: "center",
  },
  editLocationDetailsWrapper: {
    flexDirection: "row",
    alignSelf: "stretch",
  },
  address1: {
    color: Color.colorGray_300,
  },
  text: {
    color: Color.colorRed_200,
  },
  addressTxt: {
    width: "100%",
  },
  address: {
    fontSize: FontSize.m3LabelLarge_size,
    fontWeight: "500",
    width: 253,
    display: "flex",
    textAlign: "left",
    lineHeight: 32,
    height: 24,
    alignItems: "center",
  },
  locationIcon: {
    width: 30,
    height: 30,
  },
  uscTalamban: {
    fontWeight: "600",
    fontFamily: FontFamily.montserratSemiBold,
    color: Color.colorSilver_300,
    alignSelf: "stretch",
  },
  barangayNasipitTalamban: {
    color: Color.colorDarkgray_300,
    fontFamily: FontFamily.montserratRegular,
  },
  uscTalambanParent: {
    marginLeft: 10,
    overflow: "hidden",
    flex: 1,
  },
  componentsSearchDefault: {
    backgroundColor: Color.colorWhitesmoke_300,
  },
  addressDetails: {
    color: Color.colorGray_300,
    fontSize: FontSize.m3LabelLarge_size,
    fontWeight: "500",
    width: 253,
    display: "flex",
    textAlign: "left",
    lineHeight: 32,
    height: 24,
    alignItems: "center",
  },
  addressDetailsInput: {
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: 0,
    fontSize: FontSize.typographyTaglineSmallRegular_size,
    fontFamily: FontFamily.montserratRegular,
    overflow: "hidden",
    justifyContent: "center",
    alignSelf: "stretch",
    flex: 1,
  },
  componentsSearchDefault1: {
    height: 40,
  },
  addToSaved: {
    fontFamily: FontFamily.level2Medium12,
    fontWeight: "500",
    color: Color.colorGray_800,
    lineHeight: 15,
  },
  saveThisPlace: {
    color: Color.colorDimgray_100,
    marginTop: 3,
    fontFamily: FontFamily.montserratRegular,
  },
  addToSavedPlacesParent: {
    flex: 1,
  },
  savedBookmarkIcon: {
    display: "none",
    zIndex: 0,
  },
  unsavedBookmarkIcon: {
    zIndex: 1,
  },
  bookmarkBtn: {
    width: 25,
    height: 25,
    justifyContent: "center",
    borderRadius: Border.br_xl,
    flexDirection: "row",
    alignItems: "center",
  },
  savedPlaces: {
    marginLeft: 10,
    borderRadius: Border.br_xl,
  },
  frameContainer: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  nameParent: {
    display: "none",
  },
  viewAllServices: {
    fontSize: FontSize.body1Semibold_size,
    letterSpacing: -0.1,
    lineHeight: 24,
    fontFamily: FontFamily.title2Bold32,
    color: Color.neutral01,
    textAlign: "center",
    fontWeight: "700",
  },
  componentsbutton: {
    borderRadius: Border.br_mini,
    backgroundColor: Color.colorDarkslategray_900,
    paddingHorizontal: Padding.p_3xl,
    paddingVertical: Padding.p_xs,
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  componentsbuttonWrapper: {
    paddingTop: Padding.p_xl,
    alignItems: "center",
  },
  frameGroup: {
    borderTopLeftRadius: Border.br_5xl,
    borderTopRightRadius: Border.br_5xl,
    paddingHorizontal: Padding.p_base,
    paddingBottom: Padding.p_mini,
    overflow: "hidden",
    alignSelf: "stretch",
    backgroundColor: Color.colorBlack,
  },
  editLocationDetailsModal: {
    // zIndex: 2,
    // alignSelf: "stretch",
    // borderTopLeftRadius: Border.br_5xl,
    // borderTopRightRadius: Border.br_5xl,
    // paddingHorizontal: Padding.p_base,
    // overflow: "hidden",
    // backgroundColor: Color.colorBlack,

    position: "absolute",

    // backgroundColor: Color.colorBlack,

    // borderRadius: 8,
    width: "100%",
    // elevation: 5,
    height: "auto",
    // flexDirection: "row",
    // alignItems: "center",
  },
  frameParent: {
    alignSelf: "stretch",
    flex: 1,
  },
  body: {
    alignSelf: "stretch",
    flex: 1,
  },
  mapsEditLocationDetailsNo: {
    height: 812,
    alignItems: "center",
    width: "100%",
    flex: 1,
    // backgroundColor: Color.colorDarkslateblue_200,
  },

  // Location Styles
  rowContainer: {
    flex: 1,
    flexDirection: "row",
  },
  map: {
    width: 500, // Set the desired width
    height: 500, // Set the desired height
    // zIndex: 1,
  },
  locationButton: {
    position: "absolute",
    bottom: 190,
    right: 20,
    width: 50,
    height: 50,
  },
  goToMarkerButton: {
    position: "absolute",
    bottom: 270,
    right: 20,
    padding: 3,
    backgroundColor: "#fff",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    position: "absolute",
    bottom: 600,
    left: 16,
    right: 16,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  infoTextContainer: {
    flex: 1,
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
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    bottom: 500,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  editIcon: {
    width: 16,
    height: 16,
  },
  saveButton: {
    position: "absolute",
    bottom: 500,
    alignSelf: "center",
    backgroundColor: "#007AFF",
    paddingHorizontal: 80,
    paddingVertical: 10,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
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
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default MapsEditLocationDetailsNo;

