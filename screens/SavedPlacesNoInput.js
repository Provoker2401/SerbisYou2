// import * as React from "react";
// import {
//   StatusBar,
//   StyleSheet,
//   Pressable,
//   View,
//   Text,
//   TextInput,
//   ImageBackground,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Image } from "expo-image";
// import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";

// const SavedPlacesNoInput = () => {
//   return (
//     <View style={styles.savedPlacesNoInput}>
//       <StatusBar style={styles.statusBarLightLayout} barStyle="default" />
//       <ImageBackground
//         style={styles.bodyIcon}
//         resizeMode="cover"
//         source={require("../assets/body1.png")}
//       >
//         <Image
//           style={styles.icons8Location10022}
//           contentFit="cover"
//           source={require("../assets/icons8location100-2-2.png")}
//         />
//         <View style={[styles.savedPlacesModal, styles.savedWrapperFlexBox]}>
//           <View style={styles.frameParent}>
//             <View style={styles.nameWrapper}>
//               <Text style={styles.nameTypo}>
//                 <Text style={styles.nameTxt}>
//                   <Text style={styles.name1}>Name</Text>
//                   <Text style={styles.text}>*</Text>
//                 </Text>
//               </Text>
//             </View>
//             <View
//               style={[styles.componentsSearchDefault, styles.componentsFlexBox]}
//             >
//               <TextInput
//                 style={styles.nameInput}
//                 placeholder="e.g. Home, Apartment, Condominium"
//                 placeholderTextColor="#b8b8b8"
//               />
//             </View>
//             <View style={styles.componentsFlexBox}>
//               <Text style={[styles.labelThisAddress, styles.talambanLayout]}>
//                 Label this address for easy reference
//               </Text>
//             </View>
//           </View>
//           <View style={styles.parentSpaceBlock}>
//             <Text style={styles.nameTypo}>
//               <Text style={styles.nameTxt}>
//                 <Text style={styles.name1}>Address</Text>
//                 <Text style={styles.text}>*</Text>
//               </Text>
//             </Text>
//             <View
//               style={[
//                 styles.componentsSearchDefault1,
//                 styles.componentsFlexBox,
//               ]}
//             >
//               <View style={[styles.locationFrame, styles.savedWrapperFlexBox]}>
//                 <Image
//                   style={styles.icons8Location100221}
//                   contentFit="cover"
//                   source={require("../assets/icons8location100-2-1.png")}
//                 />
//               </View>
//               <View style={styles.uscTalambanParent}>
//                 <Text style={[styles.uscTalamban, styles.talambanLayout]}>
//                   USC Talamban
//                 </Text>
//                 <Text
//                   style={[
//                     styles.barangayNasipitTalamban,
//                     styles.talambanLayout,
//                   ]}
//                 >
//                   Barangay Nasipit, Talamban, Cebu City
//                 </Text>
//               </View>
//             </View>
//           </View>
//           <View style={styles.parentSpaceBlock}>
//             <Text style={[styles.addressDetails, styles.nameTypo]}>
//               Address details
//             </Text>
//             <View
//               style={[styles.componentsSearchDefault, styles.componentsFlexBox]}
//             >
//               <TextInput
//                 style={styles.nameInput}
//                 placeholder="e.g. Floor, unit number"
//                 placeholderTextColor="#b8b8b8"
//               />
//             </View>
//           </View>
//           <View
//             style={[
//               styles.noteToServiceProviderParent,
//               styles.parentSpaceBlock,
//             ]}
//           >
//             <Text style={[styles.addressDetails, styles.nameTypo]}>
//               Note to Service Provider
//             </Text>
//             <View
//               style={[styles.componentsSearchDefault, styles.componentsFlexBox]}
//             >
//               <TextInput
//                 style={styles.nameInput}
//                 placeholder="e.g. Meet me at the lobby"
//                 placeholderTextColor="#b8b8b8"
//               />
//             </View>
//             <View style={styles.componentsFlexBox}>
//               <Text style={[styles.labelThisAddress, styles.talambanLayout]}>
//                 Put location instructions or directions here
//               </Text>
//             </View>
//           </View>
//           <View
//             style={[styles.componentsbuttonWrapper, styles.parentSpaceBlock]}
//           >
//             <Pressable
//               style={[styles.componentsbutton, styles.savedWrapperFlexBox]}
//             >
//               <Text style={[styles.viewAllServices, styles.addToSavedTypo]}>
//                 Save Address
//               </Text>
//             </Pressable>
//           </View>
//         </View>
//       </ImageBackground>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: "#1a244d",
//   },
//   statusBarLightLayout: {
//     width: 375,
//     backgroundColor: Color.white,
//   },
//   savedWrapperFlexBox: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   addToSavedTypo: {
//     textAlign: "center",
//     fontFamily: FontFamily.title2Bold32,
//     fontWeight: "700",
//   },
//   componentsFlexBox: {
//     marginTop: 5,
//     flexDirection: "row",
//     alignSelf: "stretch",
//   },
//   talambanLayout: {
//     lineHeight: 15,
//     textAlign: "left",
//   },
//   nameTypo: {
//     width: 253,
//     display: "flex",
//     textAlign: "left",
//     fontFamily: FontFamily.level2Medium12,
//     fontWeight: "500",
//     lineHeight: 32,
//     fontSize: FontSize.m3LabelLarge_size,
//     height: 24,
//     alignItems: "center",
//   },
//   parentSpaceBlock: {
//     marginTop: 15,
//     alignSelf: "stretch",
//   },
//   icons8Location10022: {
//     position: "absolute",
//     top: 267,
//     left: 26,
//     width: 50,
//     height: 50,
//     zIndex: 0,
//   },
//   name1: {
//     color: Color.colorGray_300,
//   },
//   text: {
//     color: Color.colorRed_200,
//   },
//   nameTxt: {
//     width: "100%",
//   },
//   nameWrapper: {
//     flexDirection: "row",
//     alignSelf: "stretch",
//   },
//   nameInput: {
//     paddingHorizontal: Padding.p_3xs,
//     paddingVertical: 0,
//     fontSize: FontSize.typographyTaglineSmallRegular_size,
//     fontFamily: FontFamily.montserratRegular,
//     overflow: "hidden",
//     justifyContent: "center",
//     alignSelf: "stretch",
//     flex: 1,
//   },
//   componentsSearchDefault: {
//     height: 40,
//     paddingBottom: Padding.p_3xs,
//     paddingRight: Padding.p_3xs,
//     paddingTop: Padding.p_3xs,
//     paddingLeft: Padding.p_8xs,
//     borderWidth: 1,
//     borderColor: Color.colorDarkgray_100,
//     borderStyle: "solid",
//     borderRadius: Border.br_5xs,
//     marginTop: 5,
//     overflow: "hidden",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   labelThisAddress: {
//     color: Color.colorDimgray_100,
//     fontSize: FontSize.size_3xs,
//     lineHeight: 15,
//     fontFamily: FontFamily.montserratRegular,
//   },
//   frameParent: {
//     paddingTop: Padding.p_xl,
//     alignSelf: "stretch",
//   },
//   icons8Location100221: {
//     width: 30,
//     height: 30,
//   },
//   locationFrame: {
//     transform: [
//       {
//         rotate: "180deg",
//       },
//     ],
//     overflow: "hidden",
//     flexDirection: "row",
//   },
//   uscTalamban: {
//     fontWeight: "600",
//     fontFamily: FontFamily.montserratSemiBold,
//     color: Color.colorSilver_300,
//     lineHeight: 15,
//     fontSize: FontSize.m3LabelLarge_size,
//   },
//   barangayNasipitTalamban: {
//     color: Color.colorDarkgray_300,
//     fontSize: FontSize.size_3xs,
//     lineHeight: 15,
//     fontFamily: FontFamily.montserratRegular,
//   },
//   uscTalambanParent: {
//     marginLeft: 10,
//     overflow: "hidden",
//     flex: 1,
//   },
//   componentsSearchDefault1: {
//     backgroundColor: Color.colorWhitesmoke_300,
//     paddingBottom: Padding.p_3xs,
//     paddingRight: Padding.p_3xs,
//     paddingTop: Padding.p_3xs,
//     paddingLeft: Padding.p_8xs,
//     borderWidth: 1,
//     borderColor: Color.colorDarkgray_100,
//     borderStyle: "solid",
//     borderRadius: Border.br_5xs,
//     marginTop: 5,
//     overflow: "hidden",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   addressDetails: {
//     color: Color.colorGray_300,
//   },
//   noteToServiceProviderParent: {
//     paddingBottom: Padding.p_xl,
//   },
//   viewAllServices: {
//     fontSize: FontSize.body1Semibold_size,
//     letterSpacing: -0.1,
//     lineHeight: 24,
//     color: Color.colorGray_400,
//   },
//   componentsbutton: {
//     borderRadius: Border.br_mini,
//     backgroundColor: Color.colorSilver_200,
//     paddingHorizontal: Padding.p_3xl,
//     paddingVertical: Padding.p_xs,
//     flexDirection: "row",
//     alignSelf: "stretch",
//   },
//   componentsbuttonWrapper: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   savedPlacesModal: {
//     borderTopLeftRadius: Border.br_5xl,
//     borderTopRightRadius: Border.br_5xl,
//     paddingHorizontal: Padding.p_base,
//     zIndex: 1,
//     paddingBottom: Padding.p_xl,
//     width: 375,
//     backgroundColor: Color.white,
//   },
//   bodyIcon: {
//     height: 768,
//     justifyContent: "flex-end",
//     alignItems: "center",
//     alignSelf: "stretch",
//   },
//   savedPlacesNoInput: {
//     backgroundColor: Color.colorWhitesmoke_200,
//     height: 812,
//     width: "100%",
//     flex: 1,
//   },
// });

// export default SavedPlacesNoInput;


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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import NoInputDefault from "../components/NoInputDefault";
import { Padding, FontFamily, Color, Border, FontSize } from "../GlobalStyles";
import MapView, { Marker} from "react-native-maps";
import axios from "axios";
import * as Location from "expo-location";

const SavedPlacesNoInput = () => {
  const navigation = useNavigation();
  const ref = useRef();

  const [isInputFocused, setIsInputFocused] = useState(false);

  const [initialMapRegion, setInitialMapRegion] = useState({
    latitude: 10.3157,
    longitude: 123.8854,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [initialMarkerPosition, setInitialMarkerPosition] = useState({
    latitude: 10.3157,
    longitude: 123.8854,
  });

  const [markerPosition, setMarkerPosition] = useState(initialMarkerPosition);
  const [reverseGeocodedAddress, setReverseGeocodedAddress] = useState(null);
  const [editLocationVisible, setEditLocationVisible] = useState(false);
  const [cityAddress, setCityAddress] = useState(null);

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarkerPosition({ latitude, longitude });
  };

  const handleMarkerDragEnd = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarkerPosition({ latitude, longitude });
  };

  const fetchReverseGeolocation = async (latitude, longitude) => {
    try {
      const apiKey = "AIzaSyDWQablgpC3ElsqOQuVhQU2YFsri1VmCss";
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
    <View style={styles.savedPlacesNoInput}>
      <StatusBar barStyle="default" />
      <View style={styles.bodyIcon}>
      <View style={styles.rowContainer}>
          <MapView
            style={styles.map}
            region={initialMapRegion}
            onPress={handleMapPress}
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

        <SafeAreaView style={styles.editLocationDetailsModal}>
          <NoInputDefault
            noInputDefaultPosition="unset"
            noInputDefaultZIndex={1}
            cityAddress={cityAddress} 
            specificLocation={reverseGeocodedAddress || "Loading..."}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1a244d",
  },
  viewFlexBox: {
    justifyContent: "center",
    flexDirection: "row",
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
  bodyIcon: {
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "stretch",
    flex: 1,
  },
  savedPlacesNoInput: {
    // backgroundColor: Color.colorWhitesmoke_200,
    height: 812,
    width: "100%",
    flex: 1,
  },

  rowContainer: {
    flex: 1,
    flexDirection: "row",
  },
  map: {
    flex: 1,
    // zIndex: 1,
  },
  editLocationDetailsModal: {
    position: 'absolute',
    width: "100%",
    height: "auto",
  }
});

export default SavedPlacesNoInput;
