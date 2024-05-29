import * as React from "react";
import {
  StatusBar,
  StyleSheet,
  Pressable,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { useState, useEffect, useRef, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Border, FontSize, Color, Padding } from "../GlobalStyles";
import SearchingProviderWithinRadiusModal from "../components/SearchingProviderWithinRadiusModal";
import MapView, { Marker, Circle } from "react-native-maps";
import axios from "axios";
import * as Location from "expo-location";
import { useSearchResultsContext } from "../SearchResultsContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useSearchText } from "../SearchTextContext";
import ProviderProfileModal from "../components/ProviderProfileModal";
import { useLatitudeLongitude } from "../LatitudeLongitudeContext"; // Import the custom hook

import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  onSnapshot,
} from "firebase/firestore"; // Updated imports
import { getAuth } from "firebase/auth";
import messaging from "@react-native-firebase/messaging";
import { SliderContext } from "../SliderContext";
import { MarkerContext } from "../MarkerContext";

const SearchingDistanceRadius = ({ route }) => {
  const { searchTextLowercase } = useSearchText();
  const navigation = useNavigation();
  const ref = useRef();
  const { searchResults, setSearchResults } = useSearchResultsContext();
  const [searchCategory, setSearchCategory] = useState(searchTextLowercase);
  const { latitude, longitude, sliderValue } = route.params || {};
  const { kmFilter, setKmFilter } = useContext(SliderContext);
  const { setLocation } = useLatitudeLongitude();

  const [providerModalVisible, setProviderModalVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [tailoredCategory, setTailoredCategory] = useState(null);
  const { setMarkerUid } = useContext(MarkerContext);

  useEffect(() => {
    if (latitude && longitude) {
      setLocation({ latitude, longitude }); // Update the context with the new values
    }
  }, [latitude, longitude]);

  const handleMarkerPress = (marker) => {
    fetchTailoredServices(marker.uid);
    setMarkerUid(marker.uid);
    setSelectedMarker(marker);
    setProviderModalVisible(!providerModalVisible);

    console.log("handle marker press", tailoredCategory);
    console.log("UID", marker.uid);
  };

  const fetchTailoredServices = async (marker) => {
    try {
      const db = getFirestore();
      const auth = getAuth();
      const provider = marker;

      const q = query(collection(db, "providerProfiles", provider, "appForm3"));
      const querySnapshot = await getDocs(q);

      let bookings;

      // Check if there are at least two documents
      if (querySnapshot.size <= 2) {
        // Get the second document (index 1 since arrays are 0-based)
        const secondDocumentSnapshot = querySnapshot.docs[1];

        // Get the data of the second document
        const secondDocumentData = secondDocumentSnapshot.data();

        bookings = secondDocumentData;
      } else {
        console.log(
          "There are not enough documents in appForm3 subcollection."
        );
      }
      setTailoredCategory(bookings);

      console.log("Tailored category:", bookings); // Log the tailored category here

      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log("Authorization status:", authStatus);
      }
    } catch (error) {
      // Handle errors, e.g., permission issues
      console.log("Error fetching active bookings: ", error);
      return [];
    }
  };

  const [initialMapRegion, setInitialMapRegion] = useState({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [initialMarkerPosition, setInitialMarkerPosition] = useState({
    latitude: latitude,
    longitude: longitude,
  });

  const [markerPosition, setMarkerPosition] = useState(initialMarkerPosition);

  const updateSearchResults = (results, km) => {
    if (searchResults.length == 0) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Service Error",
        text2: "Service Not Found❗",
        visibilityTime: 5000,
      });
    } else {
      setSearchResults(results);
      setKmFilter(km);
    }
  };

  const geolib = require("geolib");

  const markersProvider = searchResults.map((item, index) => ({
    coordinate: {
      latitude: parseFloat(item.latitude),
      longitude: parseFloat(item.longitude),
    },
    title: item.providerProfile,
    uid: item.uid,
    phone: item.phone,
    availability: item.availability,
  }));

  const filteredMarkers = markersProvider.filter((marker) => {
    const distance = geolib.getDistance(
      { latitude: latitude, longitude: longitude },
      marker.coordinate
    );

    // Distance in meters, convert to kilometers
    const distanceInKm = distance / 1000;

    // Check if distance is within 3km
    return distanceInKm <= kmFilter;
  });

  useEffect(() => {}, [searchResults]);

  // Log the markersProvider array when the component mounts

  useEffect(() => {}, [filteredMarkers]);

  useEffect(() => {
    if (tailoredCategory !== null) {
      console.log("Tailored category from the useEffect:", tailoredCategory);
      // Perform any actions that depend on tailoredCategory being set
    }
  }, [tailoredCategory]);

  return (
    <View style={styles.searchingDistanceRadius}>
      <View style={[styles.view, styles.backParentFlexBox]}>
        <View style={[styles.frameParent, styles.backParentFlexBox]}>
          <View style={[styles.backBtnParent, styles.backParentFlexBox]}>
            <TouchableOpacity
              style={[styles.backBtn, styles.backParentFlexBox]}
              onPress={() => navigation.goBack()}
            >
              <Image
                style={styles.icon24pxbackArrow}
                contentFit="cover"
                source={require("../assets/icon24pxback-arrow1.png")}
              />
            </TouchableOpacity>
            <View style={styles.searchCategoryWrapper}>
              <TextInput
                style={styles.searchCategory}
                placeholder="Search Category"
                placeholderTextColor="#9b9e9f"
                value={searchCategory}
                onChangeText={setSearchCategory}
              />
            </View>
          </View>
        </View>
      </View>
      {selectedMarker && (
        <ProviderProfileModal
          isVisible={providerModalVisible}
          onClose={() => {
            setProviderModalVisible(false);
            // Clear the search category when closing the modal
            // setSearchCategory(""); // Assuming setSearchCategory is the state setter function
          }}
          providerName={selectedMarker.title}
          providerUID={selectedMarker.uid}
          providerPhone={selectedMarker.phone}
          providerStatus={selectedMarker.availability}
          tailoredCategory={tailoredCategory}
        />
      )}

      <View style={[styles.body, styles.frameFlexBox]}>
        <View style={styles.rowContainer}>
          <MapView style={styles.map} region={initialMapRegion}>
            {/* Render filtered markers with one color */}
            {filteredMarkers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker.coordinate}
                title={marker.title}
                draggable={false}
                pinColor="red"
                onPress={() => handleMarkerPress(marker)}
              />
            ))}

            {/* Render remaining markers with a different color */}
            {markersProvider.map((marker, index) => {
              // Check if the marker is not in the filteredMarkers array

              const isFiltered = filteredMarkers.some(
                (filteredMarker) =>
                  filteredMarker.coordinate.latitude ===
                    marker.coordinate.latitude &&
                  filteredMarker.coordinate.longitude ===
                    marker.coordinate.longitude
              );

              // If not in filteredMarkers, render with a different color
              if (!isFiltered) {
                return (
                  <Marker
                    key={index}
                    coordinate={marker.coordinate}
                    title={marker.title}
                    draggable={false}
                    pinColor="blue"
                  />
                );
              }
            })}

            {/* Display current location marker */}
            {markerPosition && (
              <Marker
                coordinate={markerPosition}
                title="Current Location"
                image={require("../assets/icons8location100-2-1.png")}
              />
            )}

            {/* Display circle around current location */}
            <Circle
              center={markerPosition}
              radius={
                route.params?.sliderValue ? route.params?.sliderValue : 3000
              }
              strokeWidth={2}
              strokeColor="#1A244D"
              fillColor="rgba(211, 211, 211, 0.4)"
            />
          </MapView>
        </View>
        <View style={[styles.searchingDistanceRadiusModa]}>
          <SearchingProviderWithinRadiusModal
            searchCategory={searchCategory}
            latitude={latitude}
            longitude={longitude}
            updateSearchResults={updateSearchResults}
          />
        </View>
      </View>
    </View>
  );
};

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

  searchingDistanceRadiusModa: {
    // zIndex: 2,
    // alignSelf: "stretch",
    position: "absolute",
    width: "100%",
    height: "auto",
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
  componentstopNavigation: {
    backgroundColor: Color.colorDarkslateblue_200,
  },
  backParentFlexBox: {
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
  searchCategory: {
    fontFamily: FontFamily.title4Regular18,
    fontSize: FontSize.m3LabelLarge_size,
    alignSelf: "stretch",
  },
  searchCategoryWrapper: {
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
    // marginTop: -8,
    top: 8,
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
    backgroundColor: Color.colorDarkslateblue_200,
  },
});

export default SearchingDistanceRadius;
