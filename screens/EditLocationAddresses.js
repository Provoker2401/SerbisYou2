import React, { useState, useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  Pressable,
  View,
  Text,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, Border, FontFamily, FontSize } from "../GlobalStyles";
import {
  getAuth,
  onAuthStateChanged,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const EditLocationAddresses = () => {
  const navigation = useNavigation();
  const [savedAddressData, setSavedAddressData] = useState([]);

  const [label, setLabel] = useState(selectedLabel);
  const [labelVisible, setLabelVisible] = useState(false);

  //handle text inputs
  const [textInputStreet, setTextInputStreet] = useState("");
  const [textInputHouseNumber, setTextInputHouseNumber] = useState("");
  const [textInputFloor, setTextInputFloor] = useState("");
  const [textInputNote, setTextInputNote] = useState("");
  const [textInputLabel, setTextInputLabel] = useState("");

  useEffect(() => {
    async function fetchSavedAddressData() {
      try {
        const db = getFirestore();
        const auth = getAuth(); // Use getAuth from Firebase Authentication
        const user = auth.currentUser.uid;
        const manageAddressCollectionRef = collection(
          db,
          "userProfiles",
          user,
          "manageAddress"
        );
        const savedOptionsRef = doc(manageAddressCollectionRef, "savedOptions");

        const savedOptionsSnapshot = await getDoc(savedOptionsRef);

        if (savedOptionsSnapshot.exists()) {
          const savedOptionsData =
            savedOptionsSnapshot.data().savedOptions || [];
          setSavedAddressData(savedOptionsData);
        }
      } catch (error) {
        console.error("Error fetching saved address data:", error);
      }
    }

    fetchSavedAddressData();
  }, []);

  const handleDelete = async (address) => {
    try {
      const db = getFirestore();
      const auth = getAuth();
      const user = auth.currentUser.uid;
      const manageAddressCollectionRef = collection(
        db,
        "userProfiles",
        user,
        "manageAddress"
      );

      // Assuming the document that contains the saved addresses is named "savedOptions"
      const savedOptionsRef = doc(manageAddressCollectionRef, "savedOptions");

      // Get the current data of saved options
      const savedOptionsSnapshot = await getDoc(savedOptionsRef);
      if (savedOptionsSnapshot.exists()) {
        const savedOptionsData = savedOptionsSnapshot.data();
        const updatedSavedOptions = savedOptionsData.savedOptions || [];

        // Remove the address to be deleted from the list
        const updatedAddresses = updatedSavedOptions.filter(
          (savedAddress) => savedAddress.label !== address.label
        );

        // Update the document with the updated address list
        await updateDoc(savedOptionsRef, { savedOptions: updatedAddresses });

        // Update the local state to reflect the change
        setSavedAddressData(updatedAddresses);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleCategoryButtonPress = (category, value) => {
    if (category === "Label") {
      setLabel(value);
      setLabelVisible(true);
    }
  };

  const handleLocationEdit = () => {
    navigation.navigate("MapsConfirmLocation");
  };

  return (
    <View style={styles.container}>
      <View style={styles.frameGroup}>
        <View style={styles.frameContainer}>
          <View style={[styles.editYourAddressWrapper, styles.wrapperFlexBox]}>
            <Text style={[styles.editYourAddress, styles.addALabelFlexBox]}>
              Edit Address
            </Text>
          </View>
        </View>
        <View style={[styles.editBtn, styles.frameSpaceBlock]}>
          <View
            style={[styles.componentsSearchDefault, styles.componentsFlexBox]}
          >
            <View style={styles.iconOutline}>
              <Image
                style={styles.locationIcon}
                contentFit="cover"
                source={require("../assets/location-icon1.png")}
              />
            </View>
            <View style={styles.barangayNasipitTalambanCeParent}>
              <Text style={[styles.barangayNasipitTalamban, styles.homeTypo]}>
                101 Barangay Nasipit, Talamban, Cebu City Cebu. Central Visayas
                {/* {selectedLocation} */}
              </Text>
              <Text style={[styles.cebu, styles.cebuClr]}>Cebu</Text>
            </View>
          </View>
        </View>

        <View style={[styles.frameView, styles.frameSpaceBlock]}>
          <View style={styles.streetFrameParent}>
            <View style={styles.streetFrame}>
              <View
                style={[
                  styles.componentsSearchDefault1,
                  styles.componentsFlexBox,
                ]}
              >
                <TextInput
                  style={[styles.noteInput, styles.textTypo]}
                  placeholder={selectedStreet ? selectedStreet : "Street"}
                  placeholderTextColor={selectedStreet ? "#000" : "#b8b8b8"}
                  onChangeText={(text) => setTextInputStreet(text)}
                />
              </View>
            </View>
            <View style={styles.houseNumberFrame}>
              <View
                style={[
                  styles.componentsSearchDefault1,
                  styles.componentsFlexBox,
                ]}
              >
                <TextInput
                  style={[styles.noteInput, styles.textTypo]}
                  placeholder={
                    selectedHouseNumber ? selectedHouseNumber : "House Number"
                  }
                  placeholderTextColor={
                    selectedHouseNumber ? "#000" : "#b8b8b8"
                  }
                  onChangeText={(text) => setTextInputHouseNumber(text)}
                />
              </View>
            </View>
          </View>
          <View style={styles.frameSpaceBlock}>
            <View
              style={[
                styles.componentsSearchDefault1,
                styles.componentsFlexBox,
              ]}
            >
              <TextInput
                style={[styles.noteInput, styles.textTypo]}
                placeholder={
                  selectedFloor ? selectedFloor : "Floor/Unit/Room #"
                }
                placeholderTextColor={selectedFloor ? "#000" : "#b8b8b8"}
                onChangeText={(text) => setTextInputFloor(text)}
              />
            </View>
          </View>
          <View
            style={[styles.deliveryInstructionsFrame, styles.frameSpaceBlock]}
          >
            <View style={styles.streetFrame}>
              <Text style={styles.serviceProviderInstructions}>
                Service Provider Instructions
              </Text>
              <Text style={[styles.giveUsMore, styles.cebuTypo]}>
                Give us more information about your address.
              </Text>
            </View>
          </View>
          <View style={styles.frameSpaceBlock}>
            <View
              style={[
                styles.componentsSearchDefault1,
                styles.componentsFlexBox,
              ]}
            >
              <TextInput
                style={[styles.noteInput, styles.textTypo]}
                placeholder={
                  selectedNote
                    ? selectedNote
                    : "Note to service provider - e.g. landmark"
                }
                placeholderTextColor={selectedNote ? "#000" : "#b8b8b8"}
                onChangeText={(text) => setTextInputNote(text)}
              />
            </View>
            <View style={styles.wrapper}>
              <Text style={[styles.text, styles.textTypo]}>0/300</Text>
            </View>
          </View>
          <View
            style={[styles.deliveryInstructionsFrame, styles.frameSpaceBlock]}
          >
            <View style={styles.streetFrame}>
              <Text style={[styles.addALabel, styles.addALabelTypo]}>
                Add a label
              </Text>
            </View>
          </View>
          <View style={[styles.addALabelIconsFrame, styles.frameSpaceBlock]}>
            <Pressable
              style={styles.homeBtn}
              onPress={() => handleCategoryButtonPress("Label", "Home")}
            >
              <View
                style={
                  label == "Home"
                    ? styles.ellipseParentShadowBox1
                    : styles.ellipseParentShadowBox
                }
              >
                <Image
                  style={[styles.frameItem, styles.whitePosition]}
                  contentFit="cover"
                  source={require("../assets/ellipse-43.png")}
                >
                  <View
                    style={[styles.whiteHomeParent, styles.whiteParentPosition]}
                  >
                    {label == "Home" ? (
                      <Image
                        style={[styles.whiteHomeIcon, styles.whitePosition]}
                        contentFit="cover"
                        source={require("../assets/white-home1.png")}
                      />
                    ) : (
                      <Image
                        style={[styles.blueHomeIcon, styles.homeIconPosition]}
                        contentFit="cover"
                        source={require("../assets/blue-home1.png")}
                      />
                    )}
                  </View>
                </Image>
              </View>
              <View style={[styles.homeWrapper, styles.wrapperFlexBox]}>
                <Text style={[styles.home, styles.homeTypo]}>Home</Text>
              </View>
            </Pressable>
            <Pressable
              style={styles.apartmentBtn}
              onPress={() => handleCategoryButtonPress("Label", "Apartment")}
            >
              <View
                style={
                  label == "Apartment"
                    ? styles.ellipseParentShadowBox1
                    : styles.ellipseParentShadowBox
                }
              >
                <Image
                  style={[styles.frameItem, styles.whitePosition]}
                  contentFit="cover"
                  source={require("../assets/ellipse-43.png")}
                >
                  <View
                    style={[styles.whiteHomeParent, styles.whiteParentPosition]}
                  >
                    {label == "Apartment" ? (
                      <Image
                        style={[styles.whiteHomeIcon, styles.whitePosition]}
                        contentFit="cover"
                        source={require("../assets/white-condo1.png")}
                      />
                    ) : (
                      <Image
                        style={[styles.blueHomeIcon, styles.homeIconPosition]}
                        contentFit="cover"
                        source={require("../assets/blue-condo1.png")}
                      />
                    )}
                  </View>
                </Image>
              </View>
              <View style={[styles.homeWrapper, styles.wrapperFlexBox]}>
                <Text style={[styles.home, styles.homeTypo]}>Apartment</Text>
              </View>
            </Pressable>
            <Pressable
              style={styles.apartmentBtn}
              onPress={() => handleCategoryButtonPress("Label", "Condo")}
            >
              <View
                style={
                  label == "Condo"
                    ? styles.ellipseParentShadowBox1
                    : styles.ellipseParentShadowBox
                }
              >
                <Image
                  style={[styles.frameItem, styles.whitePosition]}
                  contentFit="cover"
                  source={require("../assets/ellipse-43.png")}
                >
                  <View
                    style={[styles.whiteHomeParent, styles.whiteParentPosition]}
                  >
                    {label == "Condo" ? (
                      <Image
                        style={[styles.whiteHomeIcon, styles.whitePosition]}
                        contentFit="cover"
                        source={require("../assets/white-apartment2.png")}
                      />
                    ) : (
                      <Image
                        style={[styles.blueHomeIcon, styles.homeIconPosition]}
                        contentFit="cover"
                        source={require("../assets/blue-apartment1.png")}
                      />
                    )}
                  </View>
                </Image>
              </View>
              <View style={[styles.homeWrapper, styles.wrapperFlexBox]}>
                <Text style={[styles.home, styles.homeTypo]}>Condo</Text>
              </View>
            </Pressable>
            <Pressable
              style={styles.apartmentBtn}
              onPress={() => handleCategoryButtonPress("Label", "Others")}
            >
              <View
                style={
                  label == "Others"
                    ? styles.ellipseParentShadowBox1
                    : styles.ellipseParentShadowBox
                }
              >
                <Image
                  style={[styles.frameItem, styles.whitePosition]}
                  contentFit="cover"
                  source={require("../assets/ellipse-43.png")}
                >
                  <View
                    style={[styles.whiteHomeParent, styles.whiteParentPosition]}
                  >
                    {label == "Others" ? (
                      <Image
                        style={[styles.whiteHomeIcon, styles.whitePosition]}
                        contentFit="cover"
                        source={require("../assets/vector11.png")}
                      />
                    ) : (
                      <Image
                        style={[styles.blueHomeIcon, styles.homeIconPosition]}
                        contentFit="cover"
                        source={require("../assets/vector12.png")}
                      />
                    )}
                  </View>
                </Image>
              </View>
              <View style={[styles.homeWrapper, styles.wrapperFlexBox]}>
                <Text style={[styles.home, styles.homeTypo]}>Other</Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View style={[styles.frameView, styles.frameSpaceBlock]}>
          <Pressable
            style={styles.componentsbutton}
            onPress={handleLocationEdit}
          >
            <Text style={[styles.viewAllServices, styles.addALabelTypo]}>
              Save and Continue
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
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
    flexDirection: "column",
  },
  componentsSearchDefaultWrapper: {
    alignSelf: "stretch",
  },
  componentsSearchDefault3: {
    overflow: "hidden",
    flexDirection: "row",
    alignSelf: "stretch",
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
    left: 16,
    paddingVertical: Padding.p_mini,
    zIndex: 0,
    paddingHorizontal: 0,
    flexDirection: "row",
    top: 0,
    position: "absolute",
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
    fontSize: FontSize.level2Medium12_size,
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
    paddingHorizontal: Padding.p_base,
    paddingBottom: Padding.p_mini,
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
    flex: 1,
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

export default EditLocationAddresses;
