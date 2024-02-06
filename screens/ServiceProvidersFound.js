// // // import * as React from "react";
// // // import {
// // //   StatusBar,
// // //   StyleSheet,
// // //   Pressable,
// // //   View,
// // //   Text,
// // //   ImageBackground,
// // // } from "react-native";
// // // import { SafeAreaView } from "react-native-safe-area-context";
// // // import { Image } from "expo-image";
// // // import { useNavigation } from "@react-navigation/native";
// // // import { FontFamily, Color, FontSize, Border, Padding } from "../GlobalStyles";

// // // const ServiceProvidersFound = () => {
// // //   const navigation = useNavigation();

// // //   return (
// // //     <View style={styles.serviceProvidersFound}>
// // //       <StatusBar barStyle="default" />
// // //       <ImageBackground
// // //         style={styles.bodyIcon}
// // //         resizeMode="cover"
// // //         source={require("../assets/body.png")}
// // //       >
// // //         <Image
// // //           style={styles.icons8Location10022}
// // //           contentFit="cover"
// // //           source={require("../assets/icons8location100-2-2.png")}
// // //         />
// // //         <View style={styles.serviceProviderFoundModal}>
// // //           <View style={styles.frameParent}>
// // //             <View style={styles.congratulationsParent}>
// // //               <Text style={[styles.congratulations, styles.dummyAccount1Text]}>
// // //                 Congratulations!
// // //               </Text>
// // //               <Text
// // //                 style={[
// // //                   styles.homeServiceProvider,
// // //                   styles.standardCleaningText,
// // //                 ]}
// // //               >
// // //                 home service Provider has been found!
// // //               </Text>
// // //             </View>
// // //             <View
// // //               style={[styles.image2358Wrapper, styles.image2358WrapperFlexBox]}
// // //             >
// // //               <Image
// // //                 style={styles.image2358Icon}
// // //                 contentFit="cover"
// // //                 source={require("../assets/image-23581.png")}
// // //               />
// // //             </View>
// // //             <View
// // //               style={[
// // //                 styles.dummyAccount1Parent,
// // //                 styles.image2358WrapperFlexBox,
// // //               ]}
// // //             >
// // //               <Text style={[styles.dummyAccount1, styles.dummyAccount1Text]}>
// // //                 Dummy account #1
// // //               </Text>
// // //               <Text
// // //                 style={[styles.standardCleaning, styles.standardCleaningText]}
// // //               >
// // //                 Standard Cleaning
// // //               </Text>
// // //             </View>
// // //             <View
// // //               style={[
// // //                 styles.dummyAccount1Parent,
// // //                 styles.image2358WrapperFlexBox,
// // //               ]}
// // //             >
// // //               <Pressable
// // //                 style={styles.componentsbutton}
// // //                 onPress={() =>
// // //                   navigation.navigate("BottomTabsRoot", {
// // //                     screen: "BookingsActive",
// // //                   })
// // //                 }
// // //               >
// // //                 <Text style={[styles.viewAllServices, styles.searchingTypo]}>
// // //                   Proceed to Bookings
// // //                 </Text>
// // //               </Pressable>
// // //             </View>
// // //           </View>
// // //         </View>
// // //       </ImageBackground>
// // //     </View>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   header: {
// // //     backgroundColor: "#1a244d",
// // //   },
// // //   searchingTypo: {
// // //     textAlign: "center",
// // //     fontFamily: FontFamily.title2Bold32,
// // //     fontWeight: "700",
// // //   },
// // //   dummyAccount1Text: {
// // //     color: Color.colorBlack,
// // //     textTransform: "capitalize",
// // //     textAlign: "center",
// // //     alignSelf: "stretch",
// // //   },
// // //   standardCleaningText: {
// // //     marginTop: 10,
// // //     color: Color.colorBlack,
// // //     textTransform: "capitalize",
// // //     textAlign: "center",
// // //     alignSelf: "stretch",
// // //   },
// // //   image2358WrapperFlexBox: {
// // //     marginTop: 20,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //   },
// // //   icons8Location10022: {
// // //     position: "absolute",
// // //     top: 267,
// // //     left: 26,
// // //     width: 50,
// // //     height: 50,
// // //     zIndex: 0,
// // //   },
// // //   congratulations: {
// // //     fontWeight: "600",
// // //     fontFamily: FontFamily.workSansSemiBold,
// // //     fontSize: FontSize.bodyLgBodyLgRegular_size,
// // //   },
// // //   homeServiceProvider: {
// // //     fontFamily: FontFamily.galdeanoRegular,
// // //     fontSize: FontSize.bodyLgBodyLgRegular_size,
// // //   },
// // //   congratulationsParent: {
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     alignSelf: "stretch",
// // //   },
// // //   image2358Icon: {
// // //     width: 129,
// // //     height: 132,
// // //   },
// // //   image2358Wrapper: {
// // //     flexDirection: "row",
// // //   },
// // //   dummyAccount1: {
// // //     fontSize: FontSize.size_5xl,
// // //     fontWeight: "500",
// // //     fontFamily: FontFamily.workSansMedium,
// // //   },
// // //   standardCleaning: {
// // //     fontSize: FontSize.title4Regular18_size,
// // //     fontFamily: FontFamily.workSansRegular,
// // //   },
// // //   dummyAccount1Parent: {
// // //     alignSelf: "stretch",
// // //   },
// // //   viewAllServices: {
// // //     fontSize: FontSize.body1Semibold_size,
// // //     letterSpacing: -0.1,
// // //     lineHeight: 24,
// // //     color: Color.neutral01,
// // //   },
// // //   componentsbutton: {
// // //     borderRadius: Border.br_5xs,
// // //     backgroundColor: Color.colorDarkslategray_900,
// // //     width: 282,
// // //     height: 45,
// // //     paddingHorizontal: Padding.p_3xl,
// // //     paddingVertical: Padding.p_xs,
// // //     justifyContent: "center",
// // //     flexDirection: "row",
// // //   },
// // //   frameParent: {
// // //     borderRadius: Border.br_5xl,
// // //     paddingHorizontal: Padding.p_6xl,
// // //     paddingVertical: Padding.p_11xl,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     backgroundColor: Color.white,
// // //     flex: 1,
// // //   },
// // //   serviceProviderFoundModal: {
// // //     width: 340,
// // //     zIndex: 1,
// // //     flexDirection: "row",
// // //   },
// // //   bodyIcon: {
// // //     height: 696,
// // //     paddingBottom: Padding.p_81xl,
// // //     justifyContent: "flex-end",
// // //     alignItems: "center",
// // //     alignSelf: "stretch",
// // //   },
// // //   serviceProvidersFound: {
// // //     backgroundColor: Color.colorWhitesmoke_200,
// // //     height: 812,
// // //     width: "100%",
// // //     flex: 1,
// // //   },
// // // });

// // // export default ServiceProvidersFound;
// // import { useState, useEffect, useRef } from "react";
// // import {
// //   StatusBar,
// //   StyleSheet,
// //   Pressable,
// //   View,
// //   Text,
// //   ImageBackground,
// // } from "react-native";
// // import { SafeAreaView } from "react-native-safe-area-context";
// // import { Image } from "expo-image";
// // import { useNavigation } from "@react-navigation/native";
// // import { FontFamily, Color, FontSize, Border, Padding } from "../GlobalStyles";
// // import MapView, { Marker, Circle } from "react-native-maps";



// // const ServiceProvidersFound = () => {
// //   const navigation = useNavigation();

// //   const [initialMapRegion, setInitialMapRegion] = useState({
// //     latitude: 11.135585962202539,
// //     longitude: 123.95930342373755,
// //     latitudeDelta: 0.01,
// //     longitudeDelta: 0.01,
// //   });

// //   const [initialMarkerPosition, setInitialMarkerPosition] = useState({
// //     latitude: 11.135585962202539,
// //     longitude:  123.95930342373755,
// //   });

// //   const [markerPosition, setMarkerPosition] = useState(initialMarkerPosition);
// //   const [reverseGeocodedAddress, setReverseGeocodedAddress] = useState(null);
// //   const [editLocationVisible, setEditLocationVisible] = useState(false);
// //   const [cityAddress, setCityAddress] = useState(null);



// //   return (
// //     <View style={styles.serviceProvidersFound}>
// //       <StatusBar barStyle="default" />
// //       <MapView
// //             style={styles.map}
// //             region={initialMapRegion}
// //           >
// //             <Marker
// //               coordinate={markerPosition}
// //               title="Pinned Location"
// //               draggable={false}
// //               // onDragEnd={handleMarkerDragEnd}
// //               image={require("../assets/icons8location100-2-1.png")}
// //             />
// //           </MapView>
   
// //         <View style={styles.serviceProviderFoundModal}>
// //           <View style={styles.frameParent}>
// //             <View style={styles.congratulationsParent}>
// //               <Text style={[styles.congratulations, styles.dummyAccount1Text]}>
// //                 Congratulations!
// //               </Text>
// //               <Text
// //                 style={[
// //                   styles.homeServiceProvider,
// //                   styles.standardCleaningText,
// //                 ]}
// //               >
// //                 Home service Provider has been found!
// //               </Text>
// //             </View>
// //             <View
// //               style={[styles.image2358Wrapper, styles.image2358WrapperFlexBox]}
// //             >
// //               <Image
// //                 style={styles.image2358Icon}
// //                 contentFit="cover"
// //                 source={require("../assets/image-23581.png")}
// //               />
// //             </View>
// //             <View
// //               style={[
// //                 styles.dummyAccount1Parent,
// //                 styles.image2358WrapperFlexBox,
// //               ]}
// //             >
// //               <Text style={[styles.dummyAccount1, styles.dummyAccount1Text]}>
// //                 Dummy account #1
// //               </Text>
// //               <Text
// //                 style={[styles.standardCleaning, styles.standardCleaningText]}
// //               >
// //                 Standard Cleaning
// //               </Text>
// //             </View>
// //             <View
// //               style={[
// //                 styles.dummyAccount1Parent,
// //                 styles.image2358WrapperFlexBox,
// //               ]}
// //             >
// //               <Pressable
// //                 style={styles.componentsbutton}
// //                 onPress={() =>
// //                   navigation.navigate("BottomTabsRoot", {
// //                     screen: "BookingsActive",
// //                   })
// //                 }
// //               >
// //                 <Text style={[styles.viewAllServices, styles.searchingTypo]}>
// //                   Proceed to Bookings
// //                 </Text>
// //               </Pressable>
// //             </View>
// //           </View>
// //         </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   header: {
// //     backgroundColor: "#1a244d",
// //   },
// //   searchingTypo: {
// //     textAlign: "center",
// //     fontFamily: FontFamily.title2Bold32,
// //     fontWeight: "700",
// //   },
// //   dummyAccount1Text: {
// //     color: Color.colorBlack,
// //     textTransform: "capitalize",
// //     textAlign: "center",
// //     alignSelf: "stretch",
// //   },
// //   standardCleaningText: {
// //     marginTop: 10,
// //     color: Color.colorBlack,
// //     textTransform: "capitalize",
// //     textAlign: "center",
// //     alignSelf: "stretch",
// //   },
// //   image2358WrapperFlexBox: {
// //     marginTop: 20,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   icons8Location10022: {
// //     position: "absolute",
// //     top: 267,
// //     left: 26,
// //     width: 50,
// //     height: 50,
// //     zIndex: 0,
// //   },
// //   congratulations: {
// //     fontWeight: "600",
// //     fontFamily: FontFamily.workSansSemiBold,
// //     fontSize: FontSize.bodyLgBodyLgRegular_size,
// //   },
// //   homeServiceProvider: {
// //     fontFamily: FontFamily.galdeanoRegular,
// //     fontSize: FontSize.bodyLgBodyLgRegular_size,
// //   },
// //   congratulationsParent: {
// //     justifyContent: "center",
// //     alignItems: "center",
// //     alignSelf: "stretch",
// //   },
// //   image2358Icon: {
// //     width: 129,
// //     height: 132,
// //   },
// //   image2358Wrapper: {
// //     flexDirection: "row",
// //   },
// //   dummyAccount1: {
// //     fontSize: FontSize.size_5xl,
// //     fontWeight: "500",
// //     fontFamily: FontFamily.workSansMedium,
// //   },
// //   standardCleaning: {
// //     fontSize: FontSize.title4Regular18_size,
// //     fontFamily: FontFamily.workSansRegular,
// //   },
// //   dummyAccount1Parent: {
// //     alignSelf: "stretch",
// //   },
// //   viewAllServices: {
// //     fontSize: FontSize.body1Semibold_size,
// //     letterSpacing: -0.1,
// //     lineHeight: 24,
// //     color: Color.neutral01,
// //   },
// //   componentsbutton: {
// //     borderRadius: Border.br_5xs,
// //     backgroundColor: Color.colorDarkslategray_900,
// //     width: 282,
// //     height: 45,
// //     paddingHorizontal: Padding.p_3xl,
// //     paddingVertical: Padding.p_xs,
// //     justifyContent: "center",
// //     flexDirection: "row",
// //   },
// //   frameParent: {
// //     borderRadius: 10,
// //     padding:16,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     backgroundColor: Color.white,
// //   },
// //   serviceProviderFoundModal: {
// //     ...StyleSheet.absoluteFillObject,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     backgroundColor: "rgba(0, 0, 0, 0.5)",
// //   },
// //   bodyIcon: {
// //     height: 696,
// //     paddingBottom: Padding.p_81xl,
// //     justifyContent: "flex-end",
// //     alignItems: "center",
// //     alignSelf: "stretch",
// //   },
// //   serviceProvidersFound: {
// //     backgroundColor: Color.colorWhitesmoke_200,
// //     height: 812,
// //     width: "100%",
// //     flex: 1,
// //   },
// //   map:{
// //     flex:1,
// //   }
// // });

// // export default ServiceProvidersFound;
// import { useState, useEffect, useRef } from "react";
// import {
//   StatusBar,
//   StyleSheet,
//   Pressable,
//   View,
//   Text,
//   ImageBackground,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Image } from "expo-image";
// import { useNavigation } from "@react-navigation/native";
// import { FontFamily, Color, FontSize, Border, Padding } from "../GlobalStyles";
// import MapView, { Marker, Circle } from "react-native-maps";
// import {
//   getFirestore,
//   collection,
//   query,
//   where,
//   getDoc,
//   doc,
// } from "firebase/firestore";

// const ServiceProvidersFound = ({ route }) => {
//   const navigation = useNavigation();

//   const {
//     latitude,
//     longitude,
//     bookingID,
//     serviceBookingUID,
//     title,
//     category,
//     acceptedByProvider
//   } = route.params;

//   const [bookingData, setBookingData] = useState({});
//   const [providerName, setProviderName] = useState("");
//   const [categoryProvider, setCategoryProvider] = useState("");
//   const [serviceProvider, setServiceProvider] = useState("");

//   console.log(bookingID);
//   console.log(serviceBookingUID);
//   console.log(title);
//   console.log(category);
//   console.log(acceptedByProvider);


//   useEffect(() => {
//     const fetchProviderData = async () => {
//       const firestore = getFirestore();
//       const providerProfileRef = doc(firestore, "providerProfiles", acceptedByProvider);
      
//       try {
//         const providerProfileDoc = await getDoc(providerProfileRef);

//         if (providerProfileDoc.exists()) {
//           const providerData = providerProfileDoc.data();
//           setProviderName(providerData.name);
//         } else {
//           console.log("Provider profile not found for UID:", acceptedByProvider);
//         }
//       } catch (error) {
//         console.error("Error fetching provider profile:", error);
//       }
//     };

//     fetchProviderData();
//   }, [acceptedByProvider]);



//   const [initialMapRegion, setInitialMapRegion] = useState({
//     latitude: latitude,
//     longitude: longitude,
//     latitudeDelta: 0.01,
//     longitudeDelta: 0.01,
//   });

//   const [initialMarkerPosition, setInitialMarkerPosition] = useState({
//     latitude: latitude,
//     longitude: longitude,
//   });

//   const [markerPosition, setMarkerPosition] = useState(initialMarkerPosition);

//   return (
//     <View style={styles.serviceProvidersFound}>
//       <StatusBar barStyle="default" />
//       <MapView style={styles.map} region={initialMapRegion}>
//         <Marker
//           coordinate={markerPosition}
//           title="Pinned Location"
//           draggable={false}
//           // onDragEnd={handleMarkerDragEnd}
//           image={require("../assets/icons8location100-2-1.png")}
//         />
//       </MapView>

//       <View style={styles.serviceProviderFoundModal}>
//         <View style={styles.frameParent}>
//           <View style={styles.congratulationsParent}>
//             <Text style={[styles.congratulations, styles.dummyAccount1Text]}>
//               Congratulations!
//             </Text>
//             <Text
//               style={[styles.homeServiceProvider, styles.standardCleaningText]}
//             >
//                {title} Service Provider has been found!
//             </Text>
//           </View>
//           <View
//             style={[styles.image2358Wrapper, styles.image2358WrapperFlexBox]}
//           >
//             <Image
//               style={styles.image2358Icon}
//               contentFit="cover"
//               source={require("../assets/image-23581.png")}
//             />
//           </View>
//           <View
//             style={[styles.dummyAccount1Parent, styles.image2358WrapperFlexBox]}
//           >
//             <Text style={[styles.dummyAccount1, styles.dummyAccount1Text]}>
//               {providerName}
//             </Text>
//             <Text
//               style={[styles.standardCleaning, styles.standardCleaningText]}
//             >
//               {category} {title}
//             </Text>
//           </View>
//           <View
//             style={[styles.dummyAccount1Parent, styles.image2358WrapperFlexBox]}
//           >
//             <Pressable
//               style={styles.componentsbutton}
//               onPress={() =>
//                 navigation.navigate("BottomTabsRoot", {
//                   screen: "BookingsActive",
//                 })
//               }
//             >
//               <Text style={[styles.viewAllServices, styles.searchingTypo]}>
//                 Proceed to Bookings
//               </Text>
//             </Pressable>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: "#1a244d",
//   },
//   searchingTypo: {
//     textAlign: "center",
//     fontFamily: FontFamily.title2Bold32,
//     fontWeight: "700",
//   },
//   dummyAccount1Text: {
//     color: Color.colorBlack,
//     textTransform: "capitalize",
//     textAlign: "center",
//     alignSelf: "stretch",
//   },
//   standardCleaningText: {
//     marginTop: 10,
//     color: Color.colorBlack,
//     textAlign: "center",
//     alignSelf: "stretch",
//   },
//   image2358WrapperFlexBox: {
//     marginTop: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   icons8Location10022: {
//     position: "absolute",
//     top: 267,
//     left: 26,
//     width: 50,
//     height: 50,
//     zIndex: 0,
//   },
//   congratulations: {
//     fontWeight: "600",
//     fontFamily: FontFamily.workSansSemiBold,
//     fontSize: FontSize.bodyLgBodyLgRegular_size,
//   },
//   homeServiceProvider: {
//     fontFamily: FontFamily.galdeanoRegular,
//     fontSize: FontSize.bodyLgBodyLgRegular_size,
//   },
//   congratulationsParent: {
//     justifyContent: "center",
//     alignItems: "center",
//     alignSelf: "stretch",
//   },
//   image2358Icon: {
//     width: 129,
//     height: 132,
//   },
//   image2358Wrapper: {
//     flexDirection: "row",
//   },
//   dummyAccount1: {
//     fontSize: FontSize.size_5xl,
//     fontWeight: "500",
//     fontFamily: FontFamily.workSansMedium,
//   },
//   standardCleaning: {
//     fontSize: 20,
//     fontFamily: FontFamily.workSansRegular,
//   },
//   dummyAccount1Parent: {
//     alignSelf: "stretch",
//   },
//   viewAllServices: {
//     fontSize: FontSize.body1Semibold_size,
//     letterSpacing: -0.1,
//     lineHeight: 24,
//     color: Color.neutral01,
//   },
//   componentsbutton: {
//     borderRadius: Border.br_5xs,
//     backgroundColor: Color.colorDarkslategray_900,
//     width: 282,
//     height: 45,
//     paddingHorizontal: Padding.p_3xl,
//     paddingVertical: Padding.p_xs,
//     justifyContent: "center",
//     flexDirection: "row",
//   },
//   frameParent: {
//     borderRadius: 10,
//     padding: 16,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: Color.white,
//   },
//   serviceProviderFoundModal: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   bodyIcon: {
//     height: 696,
//     paddingBottom: Padding.p_81xl,
//     justifyContent: "flex-end",
//     alignItems: "center",
//     alignSelf: "stretch",
//   },
//   serviceProvidersFound: {
//     backgroundColor: Color.colorWhitesmoke_200,
//     height: 812,
//     width: "100%",
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
// });

// export default ServiceProvidersFound;

import { useState, useEffect, useRef } from "react";
import {
  StatusBar,
  StyleSheet,
  Pressable,
  View,
  Text,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border, Padding } from "../GlobalStyles";
import MapView, { Marker, Circle } from "react-native-maps";
import {
  getFirestore,
  collection,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";

const ServiceProvidersFound = ({ route }) => {
  const navigation = useNavigation();

  const {
    latitude,
    longitude,
    bookingID,
    serviceBookingUID,
    title,
    category,
    acceptedByProvider
  } = route.params;

  const [bookingData, setBookingData] = useState({});
  const [providerName, setProviderName] = useState("");
  const [categoryProvider, setCategoryProvider] = useState("");
  const [serviceProvider, setServiceProvider] = useState("");

  console.log(bookingID);
  console.log(serviceBookingUID);
  console.log(title);
  console.log(category);
  console.log(acceptedByProvider);


  useEffect(() => {
    const fetchProviderData = async () => {
      const firestore = getFirestore();
      const providerProfileRef = doc(firestore, "providerProfiles", acceptedByProvider);
      
      try {
        const providerProfileDoc = await getDoc(providerProfileRef);

        if (providerProfileDoc.exists()) {
          const providerData = providerProfileDoc.data();
          setProviderName(providerData.name);
        } else {
          console.log("Provider profile not found for UID:", acceptedByProvider);
        }
      } catch (error) {
        console.error("Error fetching provider profile:", error);
      }
    };

    fetchProviderData();
  }, [acceptedByProvider]);



  const [initialMapRegion, setInitialMapRegion] = useState({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [initialMarkerPosition, setInitialMarkerPosition] = useState({
    latitude: latitude,
    longitude: longitude,
  });

  const [markerPosition, setMarkerPosition] = useState(initialMarkerPosition);

  return (
    <View style={styles.serviceProvidersFound}>
      <StatusBar barStyle="default" />
      <MapView style={styles.map} region={initialMapRegion}>
        <Marker
          coordinate={markerPosition}
          title="Pinned Location"
          draggable={false}
          // onDragEnd={handleMarkerDragEnd}
          image={require("../assets/icons8location100-2-1.png")}
        />
      </MapView>

      <View style={styles.serviceProviderFoundModal}>
        <View style={styles.frameParent}>
          <View style={styles.congratulationsParent}>
            <Text style={[styles.congratulations, styles.dummyAccount1Text]}>
              Congratulations!
            </Text>
            <Text
              style={[styles.homeServiceProvider, styles.standardCleaningText]}
            >
               {title} Service Provider has been found!
            </Text>
          </View>
          <View
            style={[styles.image2358Wrapper, styles.image2358WrapperFlexBox]}
          >
            <Image
              style={styles.image2358Icon}
              contentFit="cover"
              source={require("../assets/image-23581.png")}
            />
          </View>
          <View
            style={[styles.dummyAccount1Parent, styles.image2358WrapperFlexBox]}
          >
            <Text style={[styles.dummyAccount1, styles.dummyAccount1Text]}>
              {providerName}
            </Text>
            <Text
              style={[styles.standardCleaning, styles.standardCleaningText]}
            >
              {category} {title}
            </Text>
          </View>
          <View
            style={[styles.dummyAccount1Parent, styles.image2358WrapperFlexBox]}
          >
            <Pressable
              style={styles.componentsbutton}
              onPress={() =>
                navigation.navigate("BottomTabsRoot", {
                  screen: "BookingsActive",
                })
              }
            >
              <Text style={[styles.viewAllServices, styles.searchingTypo]}>
                Proceed to Bookings
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
  searchingTypo: {
    textAlign: "center",
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
  },
  dummyAccount1Text: {
    color: Color.colorBlack,
    textTransform: "capitalize",
    textAlign: "center",
    alignSelf: "stretch",
  },
  standardCleaningText: {
    marginTop: 10,
    color: Color.colorBlack,
    textAlign: "center",
    alignSelf: "stretch",
  },
  image2358WrapperFlexBox: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  icons8Location10022: {
    position: "absolute",
    top: 267,
    left: 26,
    width: 50,
    height: 50,
    zIndex: 0,
  },
  congratulations: {
    fontWeight: "600",
    fontFamily: FontFamily.workSansSemiBold,
    fontSize: FontSize.bodyLgBodyLgRegular_size,
  },
  homeServiceProvider: {
    fontFamily: FontFamily.galdeanoRegular,
    fontSize: FontSize.bodyLgBodyLgRegular_size,
  },
  congratulationsParent: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  image2358Icon: {
    width: 129,
    height: 132,
  },
  image2358Wrapper: {
    flexDirection: "row",
  },
  dummyAccount1: {
    fontSize: FontSize.size_5xl,
    fontWeight: "500",
    fontFamily: FontFamily.workSansMedium,
  },
  standardCleaning: {
    fontSize: 20,
    fontFamily: FontFamily.workSansRegular,
  },
  dummyAccount1Parent: {
    alignSelf: "stretch",
  },
  viewAllServices: {
    fontSize: FontSize.body1Semibold_size,
    letterSpacing: -0.1,
    lineHeight: 24,
    color: Color.neutral01,
  },
  componentsbutton: {
    borderRadius: Border.br_5xs,
    backgroundColor: Color.colorDarkslategray_900,
    width: 282,
    height: 45,
    paddingHorizontal: Padding.p_3xl,
    paddingVertical: Padding.p_xs,
    justifyContent: "center",
    flexDirection: "row",
  },
  frameParent: {
    borderRadius: 10,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.white,
  },
  serviceProviderFoundModal: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bodyIcon: {
    height: 696,
    paddingBottom: Padding.p_81xl,
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "stretch",
  },
  serviceProvidersFound: {
    backgroundColor: Color.colorWhitesmoke_200,
    height: 812,
    width: "100%",
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default ServiceProvidersFound;


