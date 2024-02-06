import * as React from "react";
import {
  StatusBar,
  StyleSheet,
  Pressable,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { Image } from "expo-image";
import { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Padding, Border, FontFamily, Color, FontSize } from "../GlobalStyles";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import EditAddressModal from "./EditAddressModal";

export default function SearchAddressModal({
  selectedLocation,
  selectedLabel,
  editAddress,
  body,
  name,
  btnName,
  checkMarkerChange,
  cityAddress,
  specificLocation,
  addOrEdit,
}) {
  const navigation = useNavigation();
  const ref = useRef();

  const [label, setLabel] = useState(selectedLabel);
  const [selectedLoc, setSelectedLoc] = useState(selectedLocation);
  // const [buttonName, setButtonName] = useState(btnName);
  const [labelVisible, setLabelVisible] = useState(false);
  const [searchModal, setSearchModal] = useState(true);

  const [isInputFocused, setIsInputFocused] = useState(false);

  const screenHeight = Dimensions.get("window").height;
  const editLocationContainerHeight = screenHeight * 0.75;
  const [showExploreContainer, setShowExploreContainer] = useState(true);

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
  const [showLocationDetails, setShowLocationDetails] = useState(true);
  const [showCloseBtn, setShowCloseBtn] = useState(true);
  const [cityLocation, setCityLocation] = useState(null);

  const handleInputFocus = () => {
    setShowCloseBtn(showCloseBtn);
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setShowCloseBtn(showCloseBtn);
    setIsInputFocused(false);
  };

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
      const apiKey = "AIzaSyAuaR8dxr95SLUTU-cidS7I-3uB6mEoJmA"; // Replace with your Google Maps API key
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
        setCityLocation(city);
        // Console.log the city
        console.log("City:", city);
      } else {
        setReverseGeocodedAddress("Location not found");
        console.log("City not found");
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

  const handleAddressInputChange = (text) => {
    if (text.trim() === "") {
      setShowCloseBtn(false);
      setShowExploreContainer(true);
    } else {
      setShowCloseBtn(true);
      setShowExploreContainer(false);
    }
    console.log("User input in real-time:", text);
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
    setShowLocationDetails(true);
    if (details) {
      console.log("Details: ", details);
      const { lat, lng } = details.geometry.location;
      console.log("Details Geometry: ", details.geometry.location);
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

  const handleCategoryButtonPress = (category, value) => {
    if (category === "Label") {
      setLabel(value);
      setLabelVisible(true);
    }
  };
  const handleAdd = (category, value) => {
    navigation.navigate("EditAddressIconComplete", {
      checkMarkerChange: { checkMarkerChange },
      cityAddress: { cityAddress },
      specificLocation: { specificLocation },
    });
  };
  const handleEdit = (category, value) => {
    if (category === "Label") {
      setLabel(value);
      setLabelVisible(true);
    }
  };

  return (
    <View style={styles.editAddressModal}>
      {searchModal && (
        <View style={styles.frameGroup}>
          <View style={styles.frameContainer}>
            <View style={styles.frameFlexBox1}>
              <View style={[styles.vectorWrapper1, styles.btnWrapperFlexBox]}>
                <Image
                  style={styles.frameChild}
                  contentFit="cover"
                  source={require("../assets/line-76.png")}
                />
              </View>
            </View>
            <View style={styles.frameContainer1}>
              <View
                style={[
                  styles.componentsSearchDefaultWrapper,
                  styles.btnWrapperFlexBox,
                ]}
              >
                <View
                  style={[
                    styles.componentsSearchDefault3,
                    styles.btnWrapperFlexBox,
                  ]}
                >
                  <Pressable
                    style={[styles.iconOutline1, styles.btnWrapperFlexBox]}
                    //   onPress={() => navigation.navigate("AddNewAddress")}
                    onPress={() => setSearchModal(false)}
                  >
                    <Image
                      style={[
                        styles.uiIconarrowBackwardfilled1,
                        styles.locationTargetIconLayout,
                      ]}
                      contentFit="cover"
                      source={require("../assets/ui-iconarrow-backwardfilled.png")}
                    />
                  </Pressable>
                  <View
                    style={[
                      styles.componentsSearchDefault2,
                      styles.btnWrapperFlexBox,
                    ]}
                  >
                    <GooglePlacesAutocomplete
                      ref={ref}
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
                      renderRightButton={() =>
                        showCloseBtn && (
                          <TouchableOpacity
                            onPress={() => [
                              ref.current?.setAddressText(""),
                              setShowCloseBtn(false),
                            ]}
                            style={styles.backBtnWrapper}
                          >
                            <Image
                              style={{ width: 15, height: 15 }}
                              source={require("../assets/vector10.png")}
                            />
                          </TouchableOpacity>
                        )
                      }
                      styles={{
                        container: {
                          marginVertical: 5,
                          paddingTop: 3,
                          marginLeft: -10,
                        },
                        listView: {
                          zIndex: 3,
                          position: "absolute",
                          top: 70,
                          left: -40,
                          width: "150%",
                        },
                        separator: {
                          backgroundColor: "#ddd",
                          height: 1,
                          width: "150%",
                        },
                        textInput: {
                          color: "black",
                          fontSize: 16,
                          backgroundColor: "#F7F6F6",
                          borderRadius: 10,
                        },
                        textInputContainer: {
                          height: 40,
                          marginLeft: 10,
                          top: -3,
                          backgroundColor: "#F7F6F6",
                          borderRadius: 10,
                          width: "97%",
                        },
                        row: {
                          backgroundColor: Color.white,
                          flexDirection: "row",
                          alignItems: "center",
                        },
                        description: {
                          color: Color.colorBlack, // Change the text color of suggested places
                        },
                        poweredContainer: {
                          display: "none", // Hide the "Powered by Google" container
                        },
                      }}
                      textInputProps={{
                        onFocus: handleInputFocus,
                        onBlur: handleInputBlur,
                        onChangeText: handleAddressInputChange,
                        clearButtonMode: "never",
                      }}
                    />
                    {/* <View style={styles.addressFrame}> 
                      
                      
                      {/* <TextInput
                        style={styles.enterAddressInput}
                        placeholder="Enter your address"
                        placeholderTextColor="#979696"
                      />
                      <Pressable
                        style={[styles.closeBtn, styles.btnWrapperFlexBox]}
                      >
                        <Image
                          style={styles.vectorIcon1}
                          contentFit="cover"
                          source={require("../assets/vector10.png")}
                        />
                      </Pressable> 
                    </View> */}
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.frameView, styles.frameFlexBox]}>
              <View style={[styles.vectorWrapper1, styles.btnWrapperFlexBox]}>
                <Image
                  style={[styles.frameItem1, styles.frameLayout]}
                  contentFit="cover"
                  source={require("../assets/line-762.png")}
                />
              </View>
            </View>
            {showExploreContainer ? (
              <View style={styles.frameParent1}>
                <View style={styles.image2397Wrapper}>
                  <Image
                    style={styles.image2397Icon}
                    contentFit="cover"
                    source={require("../assets/image-2397.png")}
                  />
                </View>
                <View
                  style={[
                    styles.enterAnAddressToExploreSeWrapper,
                    styles.btnWrapperFlexBox,
                  ]}
                >
                  <Text
                    style={[styles.enterAnAddress, styles.btnWrapperFlexBox]}
                  >
                    Enter an address to explore service providers around you
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.hiddenFrame}>
                <View style={styles.frameParent2}>
                  <View style={styles.image2397Wrapper}>
                    <Image
                      style={styles.image2397Icon}
                      contentFit="cover"
                      source={require("../assets/image-2397.png")}
                    />
                  </View>
                  <View
                    style={[
                      styles.enterAnAddressToExploreSeWrapper,
                      styles.btnWrapperFlexBox,
                    ]}
                  >
                    <Text
                      style={[styles.enterAnAddress, styles.btnWrapperFlexBox]}
                    >
                      Enter an address to explore service providers around you
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>

          {/* {editLocationVisible && (
          <View
            style={[
              styles.editLocationContainer,
              { height: editLocationContainerHeight },
            ]}
          >
            <View style={styles.searchContainer}>
              <TouchableOpacity
                onPress={() => {
                  setEditLocationVisible(!editLocationVisible);
                }}
              >
                <Image
                  style={styles.editIcon}
                  source={require("../assets/icon24pxback-arrow.png")}
                />
              </TouchableOpacity>

              <GooglePlacesAutocomplete
                ref={ref}
                enablePoweredByContainer={false} // Disable "Powered by Google" logo
                placeholder="Enter your address"
                onPress={(data, details = null) =>
                  handlePlaceSelect(data, details)
                }
                query={{
                  key: "API",
                  language: "en",
                  components: "country:PH",
                }}
                fetchDetails={true}
                styles={{
                  container: {
                    flex: 1,
                  },
                  listView: {
                    position: "absolute",
                    top: 45,
                    width: "100%",
                  },
                  separator: {
                    backgroundColor: "#ddd",
                    height: 1,
                  },
                  textInput: {
                    backgroundColor: "#e5e6e9",
                    color: "black",
                    marginLeft: 10,
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
                }}
                textInputProps={{
                  onFocus: handleInputFocus,
                  onBlur: handleInputBlur,
                  onChangeText: handleAddressInputChange,
                }}
              />
            </View>
            {showExploreContainer && (
            <View style={styles.centeredImageContainer}>
              <View style={styles.centeredImageTextContainer}>
                <Image
                  style={styles.centeredImage}
                  source={require("../assets/map_icon.png")}
                />
                <Text style={styles.exploreText}>
                  Enter an address to explore service providers around you
                </Text>
              </View>
            </View>
          )}
          </View>
        )} */}
        </View>
      )}
      {!searchModal && addOrEdit == "Add" && (
        <EditAddressModal btnName="Confirm Location" name="Add a new address" />
      )}
      {!searchModal && addOrEdit == "Edit" && (
        <EditAddressModal
          editAddress={true}
          body={true}
          name="Edit your address"
          btnName="Save and Continue"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Search Address Styles
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
  editIcon: {
    width: 16,
    height: 16,
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

  searchAdddresModal: {
    // zIndex: 3,
    // overflow: "hidden",
    // justifyContent: "flex-end",
    // alignSelf: "stretch",
    // alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingVertical: 16,
    // paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "column",
    // alignItems: "stretch",
    alignSelf: "center",
    alignItems: "stertch",
    // flex: 1,
    // width: "100%",
  },
  frameGroup1: {
    borderTopLeftRadius: Border.br_5xl,
    borderTopRightRadius: Border.br_5xl,
    // paddingBottom: Padding.p_256xl,
    overflow: "hidden",
    alignSelf: "stretch",
    alignItems: "center",
    backgroundColor: Color.white,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 5,
    // borderRadius: 8,
    flexDirection: "column",
    flex: 1,
    zIndex: 5,
    // alignItems: "stretch",
    // alignSelf: "center",
    // alignItems: "stretch",
  },
  frameFlexBox: {
    paddingTop: Padding.p_5xs,
    height: 8,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  frameFlexBox1: {
    // paddingTop: Padding.p_5xs,
    height: 8,
    // justifyContent: "center",
    // alignSelf: "stretch",
  },
  vectorWrapper1: {
    // height: 0,
    alignSelf: "stretch",
  },
  btnWrapperFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  frameChild: {
    width: 42,
    height: 3,
  },
  frameContainer1: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    marginTop: 3,
    alignSelf: "stretch",
    alignItems: "center",
    flex: 1,
    // flexDirection: "column",
  },
  componentsSearchDefaultWrapper: {
    alignSelf: "stretch",
  },
  componentsSearchDefault3: {
    // overflow: "hidden",
    flexDirection: "row",
    // alignSelf: "stretch",
  },
  iconOutline1: {
    flexDirection: "row",
  },
  uiIconarrowBackwardfilled1: {
    overflow: "hidden",
  },
  locationTargetIconLayout: {
    height: 24,
    width: 24,
  },
  componentsSearchDefault2: {
    borderRadius: Border.br_5xs,
    marginLeft: 10,
    flexDirection: "row",
    flex: 1,
  },
  addressFrame: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorWhitesmoke_300,
    paddingLeft: Padding.p_3xs,
    paddingTop: Padding.p_8xs,
    paddingRight: Padding.p_5xs,
    paddingBottom: Padding.p_8xs,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  enterAddressInput: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: FontSize.level2Medium12_size,
    flexDirection: "row",
    flex: 1,
  },
  closeBtn: {
    marginLeft: 5,
    flexDirection: "row",
  },
  vectorIcon1: {
    width: 16,
    height: 16,
  },
  frameView1: {
    marginTop: 3,
  },
  frameItem1: {
    maxWidth: "100%",
    overflow: "hidden",
    width: "100%",
  },
  frameLayout: {
    height: 1.5,
    alignSelf: "stretch",
  },
  frameLayout1: {
    maxWidth: "100%",
    overflow: "hidden",
    width: "100%",
  },
  vectorFrame: {
    display: "none",
    marginTop: 3,
    alignItems: "center",
  },
  frameInner: {
    maxHeight: "100%",
    alignSelf: "stretch",
    flex: 1,
  },
  image2397Icon: {
    width: 150,
    height: 150,
  },
  enterAnAddressToExploreSeWrapper: {
    paddingHorizontal: Padding.p_31xl,
    marginTop: 10,
    paddingVertical: Padding.p_mini,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  enterAnAddress: {
    fontSize: FontSize.m3LabelLarge_size,
    lineHeight: 15,
    fontWeight: "500",
    fontFamily: FontFamily.montserratMedium,
    color: Color.colorGray_800,
    textAlign: "center",
    display: "flex",
    height: 35,
    flex: 1,
  },

  whiteParentPosition: {
    padding: Padding.p_3xs,
    zIndex: 1,
    position: "absolute",
    alignItems: "center",
  },
  wrapperFlexBox: {
    marginTop: 10,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  addALabelFlexBox: {
    textAlign: "left",
    lineHeight: 32,
  },
  frameSpaceBlock: {
    marginTop: 15,
    alignSelf: "stretch",
  },
  componentsFlexBox: {
    paddingBottom: Padding.p_3xs,
    paddingTop: Padding.p_3xs,
    paddingLeft: Padding.p_8xs,
    borderRadius: Border.br_5xs,
    overflow: "hidden",
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  homeTypo: {
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: "600",
    lineHeight: 15,
    textAlign: "left",
  },
  cebuClr: {
    color: Color.colorSilver_300,
    lineHeight: 15,
  },
  pencil1Position: {
    height: 20,
    width: 20,
    left: -10,
    top: -10,
    position: "absolute",
  },
  textTypo: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: FontSize.typographyTaglineSmallRegular_size,
  },
  cebuTypo: {
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "500",
    textAlign: "left",
  },
  addALabelTypo: {
    fontFamily: FontFamily.title2Bold32,
    fontSize: FontSize.body1Semibold_size,
    fontWeight: "700",
  },
  whitePosition: {
    zIndex: 0,
  },
  homeIconPosition: {
    left: 10,
    height: 30,
    width: 30,
    top: 10,
    position: "absolute",
  },
  addPosition: {
    left: 2,
    top: 2,
    overflow: "hidden",
    justifyContent: "center",
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
  },
  uiIconarrowBackwardfilled: {
    width: 24,
    height: 24,
  },
  backBtn: {
    borderRadius: Border.br_xl,
    width: 40,
    height: 40,
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_9xs,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.white,
  },
  backBtnWrapper: {
    paddingVertical: Padding.p_mini,
    zIndex: 0,
    paddingHorizontal: 0,
    flexDirection: "row",
    top: 0,
    marginRight: 10,
  },
  frameItemLayout: {
    height: 50,
    width: 50,
  },
  icons8Location10021Wrapper: {
    top: 252,
    left: 28,
    zIndex: 1,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  vectorWrapper: {
    width: 342,
    height: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  editYourAddress: {
    fontSize: FontSize.size_mid,
    fontFamily: FontFamily.montserratBold,
    display: "flex",
    width: 253,
    color: Color.colorGray_800,
    fontWeight: "700",
    textAlign: "left",
    lineHeight: 32,
    height: 24,
    alignItems: "center",
  },
  editYourAddressWrapper: {
    alignItems: "center",
  },
  frameContainer: {
    paddingTop: Padding.p_5xs,
    justifyContent: "flex-end",
    alignSelf: "stretch",
    position: "relative",
    alignItems: "center",
    flex: 1,
  },
  locationIcon: {
    height: 30,
    width: 30,
  },
  iconOutline: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  barangayNasipitTalamban: {
    color: Color.colorDarkgray_300,
    fontSize: FontSize.m3LabelLarge_size,
    fontFamily: FontFamily.montserratSemiBold,
    alignSelf: "stretch",
  },
  cebu: {
    fontSize: FontSize.size_3xs,
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "500",
    textAlign: "left",
    alignSelf: "stretch",
  },
  barangayNasipitTalambanCeParent: {
    marginLeft: 10,
    overflow: "hidden",
    flex: 1,
  },
  pencil1Wrapper: {
    zIndex: 0,
  },
  componentsSearchDefaultInner: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  componentsSearchDefault: {
    paddingRight: Padding.p_10xs,
  },
  editBtn: {
    justifyContent: "flex-end",
  },
  noteInput: {
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: 0,
    fontSize: FontSize.typographyTaglineSmallRegular_size,
    overflow: "hidden",
    justifyContent: "center",
    alignSelf: "stretch",
    flex: 1,
  },
  componentsSearchDefault1: {
    borderStyle: "solid",
    borderColor: Color.colorDarkgray_100,
    borderWidth: 1,
    height: 48,
    paddingRight: Padding.p_3xs,
  },
  streetFrame: {
    flex: 1,
  },
  houseNumberFrame: {
    marginLeft: 15,
    flex: 1,
  },
  streetFrameParent: {
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  serviceProviderInstructions: {
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
    lineHeight: 15,
    fontSize: FontSize.m3LabelLarge_size,
    textAlign: "left",
    color: Color.colorGray_800,
  },
  giveUsMore: {
    fontSize: FontSize.level2Medium12_size,
    color: Color.colorDimgray_100,
    marginTop: 3,
    lineHeight: 15,
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "500",
  },
  deliveryInstructionsFrame: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    textAlign: "right",
    fontSize: FontSize.typographyTaglineSmallRegular_size,
    color: Color.colorSilver_300,
    lineHeight: 15,
  },
  wrapper: {
    marginTop: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: "stretch",
  },
  addALabel: {
    color: Color.colorBlack,
    textAlign: "left",
    lineHeight: 32,
    fontFamily: FontFamily.title2Bold32,
    fontSize: FontSize.body1Semibold_size,
    alignSelf: "stretch",
  },
  frameItem: {
    height: 50,
    width: 50,
  },
  whiteHomeIcon: {
    left: 10,
    height: 30,
    width: 30,
    top: 10,
    position: "absolute",
  },
  blueHomeIcon: {
    zIndex: 1,
  },
  whiteHomeParent: {
    top: 10,
    left: 10,
    zIndex: 1,
    justifyContent: "center",
  },
  ellipseParentShadowBox: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.75)",
    borderRadius: Border.br_11xl,
    height: 50,
    width: 50,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.white,
    zIndex: 1,
  },
  ellipseParentShadowBox1: {
    shadowOpacity: 1,
    elevation: 6,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 1)",
    borderRadius: Border.br_11xl,
    height: 50,
    width: 50,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.colorDarkslategray_900,
    zIndex: 1,
  },
  home: {
    fontSize: FontSize.typographyTaglineSmallRegular_size,
    color: Color.colorGray_800,
  },
  homeWrapper: {
    paddingVertical: Padding.p_8xs,
    justifyContent: "center",
    paddingHorizontal: 0,
  },
  homeBtn: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  apartmentBtn: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  whiteAdd: {
    display: "none",
    zIndex: 0,
  },
  blueAdd: {
    zIndex: 1,
  },
  whiteAddParent: {
    top: 9,
    left: 8,
    zIndex: 1,
    justifyContent: "center",
  },
  addALabelIconsFrame: {
    flexDirection: "row",
    alignItems: "center",
  },
  frameView: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  viewAllServices: {
    letterSpacing: -0.1,
    lineHeight: 24,
    color: Color.neutral01,
    textAlign: "center",
  },
  componentsbutton: {
    borderRadius: Border.br_mini,
    backgroundColor: Color.colorDarkslategray_900,
    // width: 343,
    paddingHorizontal: Padding.p_3xl,
    paddingVertical: Padding.p_xs,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
  },
  frameGroup: {
    borderTopLeftRadius: Border.br_5xl,
    borderTopRightRadius: Border.br_5xl,
    // paddingHorizontal: Padding.p_base,
    paddingBottom: 60,
    alignSelf: "stretch",
    alignItems: "center",
    backgroundColor: Color.white,
  },
  editAddressModal: {
    zIndex: 5,
    justifyContent: "flex-end",
    alignSelf: "stretch",
    alignItems: "center",
  },
  frameParent: {
    justifyContent: "flex-end",
    alignSelf: "stretch",
    alignItems: "center",
    flex: 1,
  },
  frameParent1: {
    paddingTop: 30,
    justifyContent: "flex-start",
    alignSelf: "stretch",
    alignItems: "center",
    // flex: 1,
  },
  frameParent2: {
    display: "none",
    paddingTop: 30,
    justifyContent: "flex-start",
    alignSelf: "stretch",
    alignItems: "center",
    // flex: 1,
  },
  hiddenFrame: {
    display: "flex",
    marginTop: 255,
    justifyContent: "flex-start",
    alignSelf: "stretch",
    alignItems: "center",
    flex: 5,
  },
  body: {
    justifyContent: "flex-end",
    alignSelf: "stretch",
    alignItems: "center",
    flex: 1,
  },
  editAddressIconComplete: {
    width: "100%",
    height: 812,
    alignItems: "center",
    flex: 1,
    backgroundColor: Color.white,
  },
});

// {editLocationVisible && (
//   <View
//     style={[
//       styles.editLocationContainer,
//       { height: editLocationContainerHeight },
//     ]}
//   >
//     <View style={styles.searchContainer}>
//       <TouchableOpacity
//         onPress={() => {
//           setEditLocationVisible(!editLocationVisible);
//         }}
//       >
//         <Image
//           style={styles.editIcon}
//           source={require("../assets/icon24pxback-arrow.png")}
//         />
//       </TouchableOpacity>

//       <GooglePlacesAutocomplete
//         ref={ref}
//         enablePoweredByContainer={false} // Disable "Powered by Google" logo
//         placeholder="Enter your address"
//         onPress={(data, details = null) =>
//           handlePlaceSelect(data, details)
//         }
//         query={{
//           key: "API",
//           language: "en",
//           components: "country:PH"
//         }}
//         fetchDetails={true}
//         styles={{
//           container: {
//             flex: 1,
//           },
//           listView: {
//             position: "absolute",
//             top: 45,
//             width: "100%",
//           },
//           separator: {
//             backgroundColor: "#ddd",
//             height: 1,
//           },
//           textInput: {
//             backgroundColor: "#e5e6e9",
//             color: "black",
//             marginLeft: 10,
//           },
//           textInput: {
//             height: 38,
//             color: 'black',
//             fontSize: 16,
//           },
//           row: {
//             backgroundColor: "white",
//             flexDirection: "row",
//             alignItems: "center",
//           },
//         }}
//         textInputProps={{
//           onFocus: handleInputFocus,
//           onBlur: handleInputBlur,
//           onChangeText: handleAddressInputChange,
//         }}
//       />
//     </View>

//     {showExploreContainer && (
//       <View style={styles.centeredImageContainer}>
//         <View style={styles.centeredImageTextContainer}>
//           <Image
//             style={styles.centeredImage}
//             source={require("../assets/map_icon.png")}
//           />
//           <Text style={styles.exploreText}>
//             Enter an address to explore service providers around you
//           </Text>
//         </View>
//       </View>
//     )}
//   </View>
// )}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   rowContainer: {
//     flex: 1,
//     flexDirection: "row",
//   },
//   map: {
//     flex: 1,
//   },
//   infoContainer: {
//     position: "absolute",
//     bottom: 50,
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
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     backgroundColor: "#f0f0f0",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   editIcon: {
//     width: 16,
//     height: 16,
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
//   saveButton: {
//     position: "absolute",
//     bottom: 4,
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
//   centeredImageContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   centeredImageTextContainer: {
//     alignItems: "center",
//   },
//   centeredImage: {
//     marginBottom: 10,
//     width: 100,
//     height: 100,
//     resizeMode: "contain",
//   },
//   exploreText: {
//     fontSize: 14,
//     marginTop: 10,
//   },
//   row: {
//     backgroundColor: "white",
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderColor: "#ddd",
//   },
//   iconImage: {
//     width: 24,
//     height: 24,
//     marginRight: 12,
//   },
//   rowText: {
//     fontSize: 16,
//   },
//   });
