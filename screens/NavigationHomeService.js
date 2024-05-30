import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  StatusBar,
  StyleSheet,
  Pressable,
  Text,
  View,
  Image,
  Modal,
  Linking
} from "react-native";
import MapView, { Marker, enableLatestRenderer } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { FontFamily, Padding, FontSize, Color, Border } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import CancelBookingPrompt from "../components/CancelBookingPrompt";
import { getDistance } from "geolib";
import { getFirestore, doc, onSnapshot} from "firebase/firestore"; // Updated imports

const NavigationHomeService = ({ route }) => {
  const mapRef = useRef(null);

  const {
    itemID,
    statusOrder,
    bookingID,
    bookingDate,
    bookingTime,
    bookingAddress,
    bookingDistanceRadius,
    bookingTitle,
    bookingCategory,
    bookingServices,
    bookingSubtotal,
    bookingDistanceFee,
    bookingTotalPrice,
    bookingPaymentMethod,
    bookingProviderName,
    bookingStatus,
    bookingCoordinates,
    providerCoordinates,
    bookingProviderNumber,
    acceptedBy,
  } = route.params;

  //get the real time coordinates

  const db = getFirestore();
  const providerProfilesCollection = doc(db, "providerProfiles", acceptedBy);

  useEffect(() => {
    const unsubscribe = onSnapshot(providerProfilesCollection, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const info = docSnapshot.data();
        console.log("info of provider:", info);

        const latitude = info.realTimeCoordinates.latitude;
        const longitude = info.realTimeCoordinates.longitude;

        console.log("Latitude of Provider:", latitude);
        console.log("Longitude of Provider:", longitude);

        setProviderLocation({ latitude, longitude });

        // Update the coordinates state for the provider only
        setCoordinates((prevCoordinates) => [
          prevCoordinates[0], // User
          { latitude, longitude }, // Updated Provider
        ]);
      } else {
        console.log("Provider document does not exist");
      }
    });

    // Cleanup function to unsubscribe from snapshot listener when component unmounts
    return () => unsubscribe();
  }, []);


  const [coordinates, setCoordinates] = useState([
    {
      latitude: bookingCoordinates.latitude,
      longitude: bookingCoordinates.longitude,
    }, // User
    {
      latitude: providerCoordinates.latitude, 
      longitude: providerCoordinates.longitude, 
    }, // Provider
  ]);

  const [providerLocation, setProviderLocation] = useState({
    latitude: providerCoordinates.latitude, 
    longitude: providerCoordinates.longitude, 
  });

  const navigation = useNavigation();
  const [cancelBtnVisible, setCancelBtnVisible] = useState(false);

  const [timeDuration, settimeDuration] = useState(null);

  const openCancelBtn = useCallback(() => {
    setCancelBtnVisible(true);
  }, []);

  const closeCancelBtn = useCallback(() => {
    setCancelBtnVisible(false);
  }, []);

  // Update distance whenever coordinates change
  useEffect(() => {
    if (coordinates.length === 2) {
      const distanceInMeters = getDistance(
        {
          latitude: coordinates[0].latitude,
          longitude: coordinates[0].longitude,
        }, // User
        {
          latitude: coordinates[1].latitude,
          longitude: coordinates[1].longitude,
        } // Provider
      );

      setDistance(distanceInMeters);
    }
  }, [coordinates]);

  const userMarkerImage = require("../assets/location-icon1.png");
  const providerMarkerImage = require("../assets/service-provider-icon.png");

  const formatDistance = (distance) => {
    if (distance >= 1000) {
      // If distance is greater than or equal to 1 km, display in kilometers
      const distanceInKm = (distance / 1000).toFixed(2); // Round to 2 decimal places
      return `${distanceInKm} km`;
    } else {
      // If distance is less than 1 km, display in meters
      return `${distance} meters`;
    }
  };

  const [distance, setDistance] = useState(null);

  // Adjust the width and height based on your preference
  const markerImageStyle = { width: 40, height: 40 };

  const handleDirectionsReady = ({ duration }) => {
    const roundedDuration = Math.round(duration); // Round to the nearest whole number
    settimeDuration(roundedDuration);
  };

  const messageProvider = ()=>{
    Linking.openURL(`sms:${bookingProviderNumber}`);
  }

  const callProvider = ()=>{
    Linking.openURL(`tel:${bookingProviderNumber}`);
  }

  const getFormattedServiceName = () => {
    if (!bookingTitle || !bookingCategory) {
      return 'Service'; // Default text or handle as needed
    }

    // Check if the title is "Pet Care" or "Gardening"
    if (bookingTitle === "Pet Care" || bookingTitle === "Gardening" || bookingTitle === "Cleaning") {
      return bookingCategory;
    } else {
      // If not, concatenate the title and category
      return `${bookingTitle} ${bookingCategory}`;
    }
  };

  return (
    <View style={styles.navigationHomeService}>
      <StatusBar barStyle="default" />
      <View style={styles.body}>
        <View style={[styles.backBtnWrapper]}>
          <Pressable
            style={[styles.backBtn, styles.backBtnLayout]}
            onPress={() => navigation.goBack()}
          >
            <Image
              style={styles.vectorIcon}
              contentFit="cover"
              source={require("../assets/vector9.png")}
            />
          </Pressable>
        </View>
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: bookingCoordinates.latitude, // put the user lat here
            longitude: bookingCoordinates.longitude, // put the user long here
            latitudeDelta: 0.004, // Adjusted for higher zoom
            longitudeDelta: 0.004, // Adjusted for higher zoom
          }}
        >
          {coordinates.map((coord, index) => (
            <Marker
              key={index}
              coordinate={coord}
              title={index === 0 ? "User" : "Provider"}
            >
              <Image
                source={index === 0 ? userMarkerImage : providerMarkerImage}
                style={{ ...markerImageStyle }}
              />
            </Marker>
          ))}

          <MapViewDirections
            origin={coordinates[0]}
            destination={providerLocation} // Use the updated provider's location
            apikey="AIzaSyBeZMkWh5O-VLFnVvRJw13qwXK6xDyiYrQ"
            strokeWidth={4}
            strokeColor="red"
            lineDashPattern={[20, 10]} // Longer dashes with a gap of 10
            onReady={handleDirectionsReady}
          />
        </MapView>

        <View style={styles.serviceProviderInTransitMo}>
          <View style={styles.frameGroup}>
            <View style={[styles.frameWrapper, styles.wrapperSpaceBlock]}>
              <View style={styles.vectorWrapper}>
                <Image
                  style={styles.frameChild1}
                  contentFit="cover"
                  source={require("../assets/line-761.png")}
                />
              </View>
            </View>
            <View style={styles.frameContainerSpaceBlock}>
              <View style={styles.minsWrapper}>
                <Text style={[styles.mins, styles.minsTypo]}>
                  {timeDuration} min
                </Text>
              </View>

              <View
                style={[
                  styles.yourHomeServiceProviderIsWrapper,
                  styles.cancelFrameFlexBox,
                ]}
              >
                <Text
                  style={[styles.yourHomeService, styles.yourHomeServiceTypo]}
                >
                  Your Home Service Provider is on the way
                </Text>
              </View>
              <Text
                style={[
                  styles.providerDistanceText,
                  styles.providerDistanceTextTypo,
                ]}
              >
                (The Provider Distance is {formatDistance(distance)})
              </Text>
            </View>
            <View
              style={[
                styles.providerTrackingParent,
                styles.frameContainerSpaceBlock,
              ]}
            >
              <View
                style={[
                  styles.providerTracking,
                  styles.providerTrackingSpaceBlock,
                ]}
              >
                <View style={styles.image2378Wrapper}>
                  <Image
                    style={styles.iconLayout}
                    contentFit="cover"
                    source={require("../assets/image-23781.png")}
                  />
                </View>
                <View style={[styles.frameView, styles.btnSpaceBlock]}>
                  <View style={styles.dummyAccount1Wrapper}>
                    <Text
                      style={[styles.dummyAccount, styles.dummyAccountFlexBox]}
                    >
                     {bookingProviderName}
                    </Text>
                  </View>
                  <View style={styles.dummyAccount1Wrapper}>
                    <Text
                      style={[
                        styles.standardCleaning,
                        styles.dummyAccountFlexBox,
                      ]}
                    >
                      {getFormattedServiceName()}
                    </Text>
                  </View>
                </View>
                <View style={[styles.callBtnParent, styles.btnSpaceBlock]}>
                  <Pressable style={styles.callBtn} onPress={callProvider}>
                    <Image
                      style={styles.callBtnChild}
                      contentFit="cover"
                      source={require("../assets/ellipse-2321.png")}
                      on
                    />
                    <Image
                      style={[styles.callIcon, styles.callIconLayout]}
                      contentFit="cover"
                      source={require("../assets/call1.png")}
                    />
                  </Pressable>
                  <Pressable style={[styles.messageBtn, styles.btnSpaceBlock]} onPress={messageProvider}>
                    <Image
                      style={styles.callBtnChild}
                      contentFit="cover"
                      source={require("../assets/ellipse-2321.png")}
                    />
                    <Image
                      style={[styles.callIcon, styles.callIconLayout]}
                      contentFit="cover"
                      source={require("../assets/message1.png")}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>

        <Modal animationType="fade" transparent visible={cancelBtnVisible}>
          <View style={styles.cancelBtnOverlay}>
            <Pressable style={styles.cancelBtnBg} onPress={closeCancelBtn} />
            <CancelBookingPrompt onClose={closeCancelBtn} />
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backBtnWrapper: {
    position: "absolute",
    top: 20, // Adjust this value as needed
    left: 20, // Adjust this value as needed
    zIndex: 2, // Ensures it appears above the map
    borderRadius: 50, // Make it a circle
    backgroundColor: "white", // Set the background color to white
    padding: 10, // Adjust the padding as needed
  },

  backBtn: {
    width: "100%",
    height: "100%",
    borderRadius: 50, // Ensure it remains a circle
    justifyContent: "center",
    alignItems: "center",
  },

  userFrameParentFlexBox: {
    padding: Padding.p_3xs,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconLayout: {
    height: 50,
    width: 50,
  },
  framePosition: {
    zIndex: 2,
    position: "absolute",
  },
  callIconLayout: {
    height: 23,
    position: "absolute",
  },
  providerTrackingSpaceBlock: {
    paddingVertical: Padding.p_xl,
    alignSelf: "stretch",
  },
  wrapperSpaceBlock: {
    paddingHorizontal: Padding.p_base,
    justifyContent: "flex-end",
  },
  minsTypo: {
    textAlign: "center",
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    lineHeight: 24,
  },
  cancelFrameFlexBox: {
    marginTop: 3,
    alignSelf: "stretch",
    alignItems: "center",
  },
  yourHomeServiceTypo: {
    letterSpacing: -0.1,
    fontSize: FontSize.body1Semibold_size,
  },
  providerDistanceTextTypo: {
    letterSpacing: -0.1,
    fontSize: 15,
  },
  frameContainerSpaceBlock: {
    marginTop: 15,
    paddingVertical: 0,
    paddingHorizontal: Padding.p_base,
    justifyContent: "flex-end",
    alignSelf: "stretch",
    alignItems: "center",
  },
  btnSpaceBlock: {
    marginLeft: 5,
    justifyContent: "center",
  },
  dummyAccountFlexBox: {
    textAlign: "left",
    color: Color.colorBlack,
    lineHeight: 24,
    alignSelf: "stretch",
  },

  serviceProviderIcon: {
    left: 0,
    zIndex: 0,
    top: 0,
    position: "absolute",
  },
  serviceProviderIconWrapper: {
    top: 99,
    left: 249,
    zIndex: 1,
    position: "absolute",
  },
  userFrame: {
    zIndex: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  frameChild: {
    top: 61,
    left: 44,
    width: 61,
    height: 19,
    zIndex: 1,
    position: "absolute",
  },
  frameItem: {
    left: 109,
    width: 43,
    height: 119,
    top: -40,
  },
  frameInner: {
    left: 154,
    width: 37,
    zIndex: 3,
    top: -40,
  },
  lineIcon: {
    top: -53,
    left: 191,
    width: 27,
    height: 32,
    zIndex: 4,
    position: "absolute",
  },
  userFrameParent: {
    top: 206,
    left: 56,
    padding: Padding.p_3xs,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  locationTargetIcon: {
    width: 24,
    height: 24,
  },
  locationTargetWrapper: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    justifyContent: "center",
  },
  currentLocationBtn: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  currentLocationBtnWrapper: {
    alignItems: "flex-end",
    paddingHorizontal: Padding.p_base,
    justifyContent: "flex-end",
    zIndex: 3,
  },
  frameChild1: {
    width: 55,
    height: 5,
  },
  vectorWrapper: {
    width: 342,
    height: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  frameWrapper: {
    paddingTop: Padding.p_5xs,
    alignSelf: "stretch",
    alignItems: "center",
  },
  mins: {
    color: Color.colorDarkslategray_900,
    letterSpacing: -0.2,
    fontSize: FontSize.bodyLgBodyLgRegular_size,
  },
  minsWrapper: {
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  yourHomeService: {
    color: Color.colorDarkslategray_900,
    width: 333,
    textAlign: "center",
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    lineHeight: 24,
  },
  providerDistanceText: {
    color: "#3f434a",
    width: 333,
    textAlign: "center",
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    lineHeight: 24,
  },
  yourHomeServiceProviderIsWrapper: {
    justifyContent: "center",
    flexDirection: "row",
  },
  image2378Wrapper: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  dummyAccount: {
    fontWeight: "600",
    fontFamily: FontFamily.level2Semibold12,
    letterSpacing: -0.2,
    fontSize: FontSize.bodyLgBodyLgRegular_size,
  },
  dummyAccount1Wrapper: {
    justifyContent: "center",
    alignSelf: "stretch",
  },
  standardCleaning: {
    fontFamily: FontFamily.title4Regular18,
    letterSpacing: -0.1,
    fontSize: FontSize.body1Semibold_size,
  },
  frameView: {
    paddingLeft: Padding.p_8xs,
    flex: 1,
  },
  callBtnChild: {
    width: 42,
    height: 42,
    zIndex: 0,
  },
  callIcon: {
    top: 9,
    left: 9,
    width: 23,
    overflow: "hidden",
    zIndex: 1,
  },
  callBtn: {
    overflow: "hidden",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  messageBtn: {
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
  },
  callBtnParent: {
    flexDirection: "row",
    alignItems: "center",
  },
  providerTracking: {
    justifyContent: "center",
    paddingHorizontal: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  cancelBtnOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  cancelBtnBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  viewAllServices: {
    color: Color.neutral01,
    textAlign: "center",
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    lineHeight: 24,
  },
  cancelBtn: {
    borderRadius: Border.br_mini,
    backgroundColor: Color.colorFirebrick_200,
    paddingHorizontal: Padding.p_3xl,
    paddingVertical: Padding.p_xs,
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  cancelFrame: {
    paddingBottom: Padding.p_xl,
    justifyContent: "flex-end",
  },
  providerTrackingParent: {
    backgroundColor: Color.colorGainsboro_300,
  },
  frameGroup: {
    borderTopLeftRadius: Border.br_5xl,
    borderTopRightRadius: Border.br_5xl,
    justifyContent: "flex-end",
    alignSelf: "stretch",
    alignItems: "center",
    backgroundColor: Color.white,
  },
  serviceProviderInTransitMo: {
    zIndex: 4,
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
  body: {
    justifyContent: "flex-end",
    alignSelf: "stretch",
    flex: 1,
  },
  navigationHomeService: {
    flex: 1,
  },
});

export default NavigationHomeService;
