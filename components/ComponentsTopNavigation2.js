// import * as React from "react";
// import {
//   View,
//   StyleProp,
//   ViewStyle,
//   Pressable,
//   StyleSheet,
//   TextInput,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Image } from "expo-image";
// import { useNavigation } from "@react-navigation/native";
// import { Color, Padding, FontFamily, FontSize, Border } from "../GlobalStyles";

// const ComponentsTopNavigation2 = ({ style }) => {
//   const navigation = useNavigation();

//   return (
//     <SafeAreaView style={[styles.componentstopNavigation, style]}>
//       <View style={[styles.view, styles.backParentFlexBox6]}>
//         <View style={[styles.frameParent, styles.backParentFlexBox6]}>
//           <View style={[styles.backBtnParent, styles.backParentFlexBox6]}>
//             <Pressable
//               style={[styles.backBtn, styles.backParentFlexBox6]}
//               onPress={() => navigation.goBack()}
//             >
//               <Image
//                 style={styles.icon24pxbackArrow}
//                 contentFit="cover"
//                 source={require("../assets/icon24pxback-arrow1.png")}
//               />
//             </Pressable>
//             <View style={styles.searchLocationWrapper}>
//               <TextInput
//                 style={styles.searchLocation}
//                 placeholder="Search Category"
//                 placeholderTextColor="#9b9e9f"
//               />
//             </View>
//           </View>
//           <Pressable style={[styles.searchBtn, styles.backParentFlexBox6]}>
//             <View style={styles.searchBtnChild} />
//             <Image
//               style={styles.icon16pxsearch}
//               contentFit="cover"
//               source={require("../assets/icon16pxsearch.png")}
//             />
//           </Pressable>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   componentstopNavigation: {
//     backgroundColor: Color.colorDarkslateblue_200,
//   },
//   backParentFlexBox6: {
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   icon24pxbackArrow: {
//     width: 24,
//     height: 24,
//     overflow: "hidden",
//   },
//   backBtn: {
//     width: 48,
//     padding: Padding.p_xs,
//     justifyContent: "center",
//   },
//   searchLocation: {
//     fontFamily: FontFamily.title4Regular18,
//     fontSize: FontSize.m3LabelLarge_size,
//     alignSelf: "stretch",
//   },
//   searchLocationWrapper: {
//     marginLeft: 7,
//     justifyContent: "center",
//     flex: 1,
//   },
//   backBtnParent: {
//     flex: 1,
//   },
//   searchBtnChild: {
//     borderRadius: Border.br_5xs,
//     backgroundColor: Color.colorSteelblue_100,
//     width: 32,
//     height: 32,
//     zIndex: 0,
//   },
//   icon16pxsearch: {
//     position: "absolute",
//     marginTop: -8,
//     top: "50%",
//     right: 8,
//     width: 16,
//     height: 16,
//     zIndex: 1,
//   },
//   searchBtn: {
//     marginLeft: 8,
//   },
//   frameParent: {
//     borderRadius: Border.br_3xs,
//     backgroundColor: Color.colorGray_200,
//     borderStyle: "solid",
//     borderColor: Color.colorWhitesmoke_400,
//     borderWidth: 0.9,
//     paddingRight: Padding.p_5xs,
//     flex: 1,
//   },
//   view: {
//     paddingHorizontal: Padding.p_base,
//     paddingVertical: Padding.p_xs,
//     justifyContent: "space-between",
//     alignSelf: "stretch",
//   },
// });

// export default ComponentsTopNavigation2;

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleProp,
  ViewStyle,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, FontFamily, FontSize, Border } from "../GlobalStyles";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const ComponentsTopNavigation2 = ({ style }) => {
  const navigation = useNavigation();
  const ref = useRef();

  // const [searchText, setSearchText] = useState(""); // State to store the text input

  // const handleTextInputChange = (text) => {
  //   setSearchText(text); // Update the state with the typed text
  //   console.log("Typed text:", text); // Log the typed text
  //   navigation.navigate("MapsConfirmLocation", { searchText: text });
  // };

  

  const handlePlaceSelect = (data, details = null) => { 
    if (details) {
      const { lat, lng } = details.geometry.location;
  
      //Log the latitude and longitude
      console.log("Latitude:", lat);
      console.log("Longitude:", lng);
  
      if((lat || lng) === null){
        return;
      }
      else{
        navigation.navigate("MapsConfirmLocation", {
          latitudeHeader: lat, // Replace with the actual latitude value
          longitudeHeader: lng, // Replace with the actual longitude value
        });
      }
      setMarkerPosition({ latitude: lat, longitude: lng });
      setInitialMapRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
  
      // Pass data to the other screen

    }
  };
  
  

  return (
    <SafeAreaView style={[styles.componentstopNavigation, style]}>
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
              {/* <TextInput
                style={styles.searchLocation}
                placeholder="Search Location"
                placeholderTextColor="#9b9e9f"
                onChangeText={handleTextInputChange} // Add this prop
                value={searchText} // Bind the value to the state
              /> */}

              <GooglePlacesAutocomplete
                ref={ref}
                activeOpacity={1}
                // currentLocation={true}
                enablePoweredByContainer={false} // Disable "Powered by Google" logo
                placeholder="Enter your address"
                onPress={(data, details = null) =>
                  handlePlaceSelect(data, details)
                }
                query={{
                  key: "AIzaSyAuaR8dxr95SLUTU-cidS7I-3uB6mEoJmA",
                  language: "en",
                  components: "country:PH",
                }}
                fetchDetails={true}
                styles={{
                  container:{
                    marginVertical: 2,
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  componentstopNavigation: {
    backgroundColor: Color.colorDarkslateblue_200,
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
    borderRadius: Border.br_5xs,
    backgroundColor: Color.colorSteelblue_100,
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
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorGray_200,
    borderStyle: "solid",
    borderColor: Color.colorWhitesmoke_400,
    borderWidth: 0.9,
    paddingRight: Padding.p_5xs,
    flex: 1,
  },
  view: {
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_xs,
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
});

export default ComponentsTopNavigation2;


