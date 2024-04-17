import {
  View,
  StatusBar,
  StyleSheet,
  Pressable,
  Text,
  TextInput,
  ImageBackground,
  ScrollView, 
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Padding, Border, FontFamily, Color, FontSize } from "../GlobalStyles";
import { useState, useContext } from "react";
import { AddressSelectedContext } from "../AddressSelectedContext";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection, // Import getDoc for checking if a user with the same phone number exists
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Toast from "react-native-toast-message";
import { useEditLocation } from '../EditLocationContext';

const EditLocationDetailsModal = ({
  cityAddress,
  specificLocation,
  selectedCoordinates,
}) => {
  const navigation = useNavigation();

  const [savedPlaces, setSavedPlaces] = useState(false);
  const [savedOptions, setSavedOptions] = useState([]);
  const [savedPlacesVisibility, setSavedPlacesVisibility] = useState(true);
  const [label, setLabel] = useState("");
  const [labelVisible, setLabelVisible] = useState(false);
  const [showLabel, setshowLabel] = useState(false);

  const { setCurrentFocus } = useContext(AddressSelectedContext);

  //to pass
  const [streetValue, setStreetValue] = useState("");
  const [houseValue, setHouseValue] = useState("");
  const [floorValue, setFloorValue] = useState("");
  const [noteValue, setNoteValue] = useState("");
  const [otherLabel, setotherLabel] = useState("");

  //context

  const { setLocation } = useEditLocation();


  const handleCategoryButtonPress = (category, value) => {
    if (category === "Label") {
      setLabel(value);
      setLabelVisible(true);

      if (value === "Others") {
        setshowLabel(true);
      } else {
        setshowLabel(false);
      }
    }
  };

  const handleSavedPlaces = (state) => {
    if(state){
      setSavedPlaces(true);
    }else{
      setSavedPlaces(false);
      setLabel("");

    }
  };
  
  // Fetch saved options from Firestore
  const fetchSavedOptions = async () => {
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser.uid;
    const manageAddressCollectionRef = collection(db, "userProfiles", user, "manageAddress");
    const savedOptionsDocRef = doc(manageAddressCollectionRef, "savedOptions");

    try {
      const docSnapshot = await getDoc(savedOptionsDocRef);
      if (docSnapshot.exists()) {
        const optionsData = docSnapshot.data();
        if (Array.isArray(optionsData.savedOptions)) {
          setSavedOptions(optionsData.savedOptions);
        }
      }else{
        await setDoc(savedOptionsDocRef, {});
        console.log("Saved Options Document is created!");
      }
    } catch (error) {
      console.error("Error fetching saved options:", error);
    }
  };

  // useEffect to fetch saved options when component mounts
  useEffect(() => {
    fetchSavedOptions();
    console.log("Picked Coordinates: " ,selectedCoordinates);
  }, []);

   // useEffect to check for matching coordinates
   useEffect(() => {
    const checkForMatchingCoordinates = () => {
      for (let option of savedOptions) {
        if (option.coordinates.latitude === selectedCoordinates.latitude &&
            option.coordinates.longitude === selectedCoordinates.longitude) {
          setSavedPlacesVisibility(false);
          setSavedPlaces(true);
          return; // Exit the function as we don't need to update the document
        }
      }
      // Perform the document update here if no matching coordinates were found
      // addNewAddressToFirestore(); // This would be your function to add the new address
    };

    // Call the check function if savedOptions and selectedCoordinates are available
    if (savedOptions.length > 0 && selectedCoordinates.latitude && selectedCoordinates.longitude) {
      checkForMatchingCoordinates();
    }
  }, [savedOptions, selectedCoordinates]);

  const handleConfirmLocation = async () => {
    console.log("Confirm Button is Pressed!");

    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser.uid;

    // Reference to the "manageAddress" collection for the specified userUID
    const manageAddressCollectionRef = collection(
      db,
      "userProfiles",
      user,
      "manageAddress"
    );

    // Your code to save data in "manageAddress" collection
    const dataToAdd = {
      city: cityAddress,
      address: specificLocation,
      street: streetValue,
      houseNumber: houseValue,
      floor: floorValue,
      note: noteValue,
      label: label,
      otherLabel: otherLabel,
      coordinates: selectedCoordinates,
    };

    const addNewAddress = [{
      city: cityAddress,
      address: specificLocation,
      street: streetValue,
      houseNumber: houseValue,
      floor: floorValue,
      note: noteValue,
      label: label,
      otherLabel: otherLabel,
      coordinates: selectedCoordinates,
    }];

    const savedOptionsDocRef = doc(
      manageAddressCollectionRef,
      "savedOptions"
    );
  
    if (!savedPlaces && savedPlacesVisibility) {
      // If savedPlaces is not true, update context with new values
      console.log("City:", cityAddress);
      console.log("Address:", specificLocation);
      console.log("Street:", streetValue);
      console.log("House:", houseValue);
      console.log("Floor:", floorValue);
      console.log("Note:", noteValue);
      console.log("Label:", label);
      console.log("Other Label:", otherLabel);
  
      // Update the context with the new values
      setLocation({
        cityAddress,
        specificLocation,
        streetValue,
        houseValue,
        floorValue,
        noteValue,
        label,
        otherLabel,
      });
  
      navigation.goBack();
    } else if (savedPlaces && !savedPlacesVisibility) {
      // If savedPlaces is not true, update context with new values
      console.log("City:", cityAddress);
      console.log("Address:", specificLocation);
      console.log("Street:", streetValue);
      console.log("House:", houseValue);
      console.log("Floor:", floorValue);
      console.log("Note:", noteValue);
      console.log("Label:", label);
      console.log("Other Label:", otherLabel);
  
      // Update the context with the new values
      setLocation({
        cityAddress,
        specificLocation,
        streetValue,
        houseValue,
        floorValue,
        noteValue,
        label,
        otherLabel,
      });
  
      if (label !== undefined) {
        try {
          const docSnapshot = await getDoc(savedOptionsDocRef);
          if (docSnapshot.exists()) {
            const optionsData = docSnapshot.data();
            console.log("Saved Options Data: ", optionsData);
          
            // Check if "savedOptions" is an array
            if (Array.isArray(optionsData.savedOptions)) {
              let foundMatch = false; // Flag to indicate if we found a match
          
              // Loop through saved options to see if the selectedCoordinates match any existing coordinates
              for (let i = 0; i < optionsData.savedOptions.length; i++) {
                if (optionsData.savedOptions[i].coordinates.latitude === selectedCoordinates.latitude &&
                    optionsData.savedOptions[i].coordinates.longitude === selectedCoordinates.longitude) {
                  // Match found, fetch the value field
                  foundMatch = true;
                  dataToAdd.value = optionsData.savedOptions[i].value; // Set the fetched value to dataToAdd.value
                  console.log("Element Value:", dataToAdd.value);
          
                  // Update the existing element with new data
                  optionsData.savedOptions[i] = {...optionsData.savedOptions[i], ...dataToAdd};
                  console.log("Element Data:", optionsData.savedOptions[i]);
                  break; // Exit the loop after finding the match
                }
              }
          
              // If no match was found, add a new value index to dataToAdd
              if (!foundMatch) {
                const latestIndex = optionsData.savedOptions.length > 0
                                    ? optionsData.savedOptions[optionsData.savedOptions.length - 1].value
                                    : 0;
                dataToAdd.value = latestIndex + 1; // Set a new value for the new element
                optionsData.savedOptions.push(dataToAdd); // Add the new data to the array
              }
              console.log("Updated Element Fields:", optionsData.savedOptions);
          
              // Update the savedOptions document with the modified array
              await updateDoc(savedOptionsDocRef, {
                savedOptions: optionsData.savedOptions,
              });
            }
          }else{
            await setDoc(savedOptionsDocRef, { savedOptions: addNewAddress});
            console.log("Saved Options Document is created!");
          }
  
          Toast.show({
            type: "success",
            position: "top",
            text1: "Address Added Successfully✅",
            text2: "Address is now added in your Saved Locations",
            visibilityTime: 5000,
          });
  
          navigation.goBack();
        } catch (error) {
          console.error("Error:", error);
          Toast.show({
            type: "error",
            position: "top",
            text1: "Error❗",
            text2: "An error occurred while adding",
            visibilityTime: 5000,
          });
        }
      } else {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Label Error",
          text2: "Please add a label❗",
          visibilityTime: 5000,
        });
      }
    } else if(savedPlaces && savedPlacesVisibility){
      setLocation({
        cityAddress,
        specificLocation,
        streetValue,
        houseValue,
        floorValue,
        noteValue,
        label,
        otherLabel,
      });
      if (label !== undefined) {
        try {
          // Fetch the latest savedOptions data
          const docSnapshot = await getDoc(savedOptionsDocRef);
          if (docSnapshot.exists()) {
            const optionsData = docSnapshot.data();
            console.log("Saved Options Data: ", optionsData);
  
            // Check if "savedOptions" is an array
            if (Array.isArray(optionsData.savedOptions)) {
              const latestIndex =
                optionsData.savedOptions.length > 0
                  ? optionsData.savedOptions.length - 1
                  : 0;
  
              // Include the 'value' field in dataToAdd with the latest index + 1
              dataToAdd.value = latestIndex + 2;
  
              const updatedOptions = [...optionsData.savedOptions, dataToAdd];
  
              // Log the latest index of the array
              console.log("Latest Index of the Array: ", latestIndex);
  
              // Update the savedOptions document
              await updateDoc(savedOptionsDocRef, {
                savedOptions: updatedOptions,
              });
            }else{
              await setDoc(savedOptionsDocRef, { savedOptions: addNewAddress});
              console.log("Saved Options Document is created!");
            }
          }else{
            await setDoc(savedOptionsDocRef, { savedOptions: addNewAddress});
            console.log("Saved Options Document is created!");
          }
  
          Toast.show({
            type: "success",
            position: "top",
            text1: "Address Added Successfully✅",
            text2: "Address is now added in your Saved Locations",
            visibilityTime: 5000,
          });
  
          navigation.goBack();
        } catch (error) {
          console.error("Error:", error);
          Toast.show({
            type: "error",
            position: "top",
            text1: "Error❗",
            text2: "An error occurred while adding",
            visibilityTime: 5000,
          });
        }
      } else {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Label Error",
          text2: "Please add a label❗",
          visibilityTime: 5000,
        });
      }
    }
  };

  // Define onFocus and onBlur handlers for your inputs
  const handleTextInputFocus = (inputType) => {
    setCurrentFocus(inputType);
  };
  
  // Inside your handleTextInputBlur function
  const handleTextInputBlur = () => {
    setCurrentFocus(null);
  };
  
  return (
    // <View style={[styles.editLocationDetailsModal, styles.frameFlexBox]}>
    <View style={[styles.frameGroup, styles.frameFlexBox]}>
      <View
        style={[styles.editLocationDetailsWrapper, styles.wrapperSpaceBlock]}
      >
        <Text style={styles.editLocationDetails}>Edit Location Details</Text>
      </View>
      <View style={styles.parentSpaceBlock}>
        <Text style={[styles.address, styles.addressTypo]}>
          <Text style={styles.addressTxt}>
            <Text style={styles.address1}>Address</Text>
            <Text style={styles.text}>*</Text>
          </Text>
        </Text>
        <View
          style={[styles.componentsSearchDefault, styles.componentsSpaceBlock]}
        >
          <View style={styles.iconOutlineFlexBox}>
            <Image
              style={styles.locationIcon}
              contentFit="cover"
              source={require("../assets/icons8location100-2-1.png")}
            />
          </View>
          <View style={styles.uscTalambanParent}>
            <Text style={[styles.uscTalamban, styles.addToSavedTypo]}>
              {cityAddress}
            </Text>
            <Text
              style={[styles.barangayNasipitTalamban, styles.saveThisPlaceTypo]}
            >
              {specificLocation}
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.frameView, styles.frameSpaceBlock]}>
        <View style={styles.streetFrameParent}>
          <View style={styles.streetFrame}>
            <Text>Street</Text>

            <View
              style={[
                styles.componentsSearchDefault1,
                styles.componentsFlexBox,
              ]}
            >
              <ScrollView keyboardShouldPersistTaps="handled">
                <TextInput
                  style={[styles.noteInput, styles.textTypo]}
                  placeholder={"Street"}
                  value={streetValue} // Set the value prop to the state variable
                  onChangeText={(text) => setStreetValue(text)} // Update the state when text changes
                  onFocus={() => handleTextInputFocus("street")}
                  onBlur={handleTextInputBlur}
                  onKeyPress={() => handleTextInputFocus("street")}
                  onPressIn={() => handleTextInputFocus("street")}
                  onLayout={() => handleTextInputFocus("street")}
                  onClick={() => handleTextInputFocus("street")}
                />
              </ScrollView>
            </View>
          </View>
          <View style={styles.houseNumberFrame}>
            <Text>House Number</Text>

            <View
              style={[
                styles.componentsSearchDefault1,
                styles.componentsFlexBox,
              ]}
            >
              <ScrollView keyboardShouldPersistTaps="handled">
                <TextInput
                    style={[styles.noteInput, styles.textTypo]}
                    placeholder={"House Number"}
                    value={houseValue}
                    onChangeText={(text) => setHouseValue(text)} // Update the state when text changes
                    onFocus={() => handleTextInputFocus("houseNumber")}
                    onBlur={handleTextInputBlur}
                    onKeyPress={() => handleTextInputFocus("houseNumber")}
                    onPressIn={() => handleTextInputFocus("houseNumber")}
                    onLayout={() => handleTextInputFocus("houseNumber")}
                  />
              </ScrollView>
            </View>
          </View>
        </View>

        <View style={styles.frameSpaceBlock}>
          <Text>Floor/Unit/Room#</Text>

          <View
            style={[styles.componentsSearchDefault1, styles.componentsFlexBox]}
          >
            <ScrollView keyboardShouldPersistTaps="handled">
              <TextInput
                style={[styles.noteInput, styles.textTypo]}
                placeholder={"Floor/Unit/Room #"}
                value={floorValue}
                onChangeText={(text) => setFloorValue(text)} // Update the state when text changes
                onFocus={() => handleTextInputFocus("floor")}
                onBlur={handleTextInputBlur}
                onKeyPress={() => handleTextInputFocus("floor")}
                onPressIn={() => handleTextInputFocus("floor")}
                onLayout={() => handleTextInputFocus("floor")}
              />
            </ScrollView>
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
            style={[styles.componentsSearchDefault1, styles.componentsFlexBox]}
          >
            <ScrollView keyboardShouldPersistTaps="handled">
              <TextInput
                style={[styles.noteInput, styles.textTypo]}
                placeholder={"Note to service provider - e.g. landmark"}
                value={noteValue}
                onChangeText={(text) => setNoteValue(text)} // Update the state when text changes
                onFocus={() => handleTextInputFocus("note")}
                onBlur={handleTextInputBlur}
                onKeyPress={() => handleTextInputFocus("note")}
                onPressIn={() => handleTextInputFocus("note")}
                onLayout={() => handleTextInputFocus("note")}
                maxLength={300} // This is optional to further enforce the limit
              />
            </ScrollView>
          </View>
          {/* <View style={styles.wrapper}>
            <Text style={[styles.text, styles.textTypo]}>0/300</Text>
          </View> */}
        </View>
      </View>

      {savedPlacesVisibility  && (
        <View style={[styles.frameContainer, styles.parentSpaceBlock]}>
          <View style={styles.addToSavedPlacesParent}>
            <Text style={[styles.addToSaved, styles.addToSavedTypo]}>
              Add to Saved Places
            </Text>
            <Text style={[styles.saveThisPlace, styles.saveThisPlaceTypo]}>
              Save this place for future orders
            </Text>
          </View>
          <View style={[styles.savedPlaces, styles.iconOutlineFlexBox]}>
            {savedPlaces ? (
              <Pressable
                style={styles.bookmarkBtn}
                onPress={() => handleSavedPlaces(false)}
              >
                <Image
                  style={[styles.savedBookmarkIcon, styles.bookmarkIconPosition]}
                  contentFit="cover"
                  source={require("../assets/saved-bookmark.png")}
                />
              </Pressable>
            ) : (
              <Pressable
                style={styles.bookmarkBtn}
                onPress={() =>  handleSavedPlaces(true)}
              >
                <Image
                  style={[
                    styles.unsavedBookmarkIcon,
                    styles.bookmarkIconPosition,
                  ]}
                  contentFit="cover"
                  source={require("../assets/unsaved-bookmark.png")}
                />
              </Pressable>
            )}
          </View>
        </View>
      )}

      {/* {savedPlaces && ( */}

      {savedPlaces && (
        <View
          style={[styles.deliveryInstructionsFrame, styles.frameSpaceBlock1]}
        >
          <View style={styles.streetFrame}>
            <Text style={[styles.addALabel, styles.addALabelTypo]}>
              Add a label
            </Text>
          </View>
        </View>
      )}
      {savedPlaces && (
        <View style={[styles.addALabelIconsFrame, styles.frameSpaceBlock1]}>
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
      )}

      {showLabel && (
        <View style={styles.parentSpaceBlock1}>
          <Text style={[styles.address, styles.addressTypo]}>
            <Text style={styles.addressTxt}>
              <Text style={styles.address1}>Label</Text>
              <Text style={styles.text}>*</Text>
            </Text>
          </Text>
          <View
            style={[
              styles.componentsSearchDefault1,
              styles.componentsSpaceBlock,
            ]}
          >
            <ScrollView keyboardShouldPersistTaps="handled">
              <TextInput
                style={styles.addressDetailsInput}
                placeholder="e.g. Office, Lobby, Villa, etc."
                placeholderTextColor="#b8b8b8"
                value={otherLabel} 
                onChangeText={(text) => setotherLabel(text)} 
                onFocus={() => handleTextInputFocus("label")}
                onBlur={handleTextInputBlur}
                onKeyPress={() => handleTextInputFocus("label")}
                onPressIn={() => handleTextInputFocus("label")}
                onLayout={() => handleTextInputFocus("label")}
                onClick={() => handleTextInputFocus("label")}
              />
            </ScrollView>
          </View>
        </View>
      )}
      <View style={[styles.componentsbuttonWrapper, styles.parentSpaceBlock1]}>
        <Pressable style={styles.componentsbutton} onPress={handleConfirmLocation}>
          <Text style={styles.viewAllServices}>Confirm</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  apartmentBtn: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  homeWrapper: {
    paddingVertical: Padding.p_8xs,
    justifyContent: "center",
    paddingHorizontal: 0,
  },
  wrapperFlexBox: {
    marginTop: 5,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  home: {
    fontSize: FontSize.typographyTaglineSmallRegular_size,
    color: Color.colorGray_800,
  },
  homeTypo: {
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: "600",
    lineHeight: 15,
    textAlign: "left",
  },
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
    fontSize: 11,
    fontFamily: FontFamily.montserratRegular,
    lineHeight: 12,
    textAlign: "left",
  },
  parentSpaceBlock: {
    marginTop: 15,
    alignSelf: "stretch",
  },
  parentSpaceBlock1: {
    marginTop: 5,
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
    zIndex: 0,
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
    paddingTop: Padding.p_8xs,
    alignItems: "center",
  },
  frameGroup: {
    borderTopLeftRadius: Border.br_5xl,
    borderTopRightRadius: Border.br_5xl,
    paddingHorizontal: Padding.p_base,
    paddingBottom: Padding.p_mini,
    // overflow: "hidden",
    alignSelf: "stretch",
    backgroundColor: Color.white,
  },
  editLocationDetailsModal: {
    zIndex: 1,
    alignSelf: "stretch",
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
    backgroundColor: Color.white,
  },
  frameView: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  frameSpaceBlock: {
    marginTop: 15,
    alignSelf: "stretch",
  },
  frameSpaceBlock1: {
    marginTop: 5,
    alignSelf: "stretch",
  },
  streetFrameParent: {
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  streetFrame: {
    flex: 1,
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
  textTypo: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: FontSize.typographyTaglineSmallRegular_size,
  },
  houseNumberFrame: {
    marginLeft: 15,
    flex: 1,
  },
  componentsSearchDefault1: {
    borderStyle: "solid",
    borderColor: Color.colorDarkgray_100,
    borderWidth: 1,
    height: 48,
    paddingRight: Padding.p_3xs,
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
  textTypo: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: FontSize.typographyTaglineSmallRegular_size,
  },
  deliveryInstructionsFrame: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  giveUsMore: {
    fontSize: FontSize.level2Medium12_size,
    color: Color.colorDimgray_100,
    marginTop: 3,
    lineHeight: 15,
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "500",
  },
  cebuTypo: {
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "500",
    textAlign: "left",
  },
  serviceProviderInstructions: {
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
    lineHeight: 15,
    fontSize: FontSize.m3LabelLarge_size,
    textAlign: "left",
    color: Color.colorGray_800,
  },
  addALabelIconsFrame: {
    flexDirection: "row",
    alignItems: "center",
  },
  homeBtn: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
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
  frameItem: {
    height: 50,
    width: 50,
  },
  whitePosition: {
    zIndex: 0,
  },
  whiteHomeParent: {
    top: 10,
    left: 10,
    zIndex: 1,
    justifyContent: "center",
  },
  whiteParentPosition: {
    padding: Padding.p_3xs,
    zIndex: 1,
    position: "absolute",
    alignItems: "center",
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
  homeIconPosition: {
    left: 10,
    height: 30,
    width: 30,
    top: 10,
    position: "absolute",
  },
  addALabel: {
    color: Color.colorBlack,
    textAlign: "left",
    lineHeight: 32,
    fontFamily: FontFamily.title2Bold32,
    fontSize: FontSize.body1Semibold_size,
    alignSelf: "stretch",
  },
  addALabelTypo: {
    fontFamily: FontFamily.title2Bold32,
    fontSize: FontSize.body1Semibold_size,
    fontWeight: "700",
  },
});

export default EditLocationDetailsModal;
