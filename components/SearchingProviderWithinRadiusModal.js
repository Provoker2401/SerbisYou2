import {
  View,
  Text,
  Pressable,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Padding, Border, FontFamily, Color, FontSize } from "../GlobalStyles";
import Slider from "@react-native-community/slider";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  getDocs,
} from "firebase/firestore";

const SearchingProviderWithinRadiusModal = ({
  searchCategory,
  latitude,
  longitude,
  updateSearchResults,
  kmResults,
  goLoading
}) => {
  const navigation = useNavigation();

  const [sliderValue, setSliderValue] = useState("3");
  const searchResults = []; // Array to store search results

  const submit = (value) => {
    setSliderValue(value);
    let radius = parseInt(value) * 1000;
    console.log("Submit radius",radius);
    navigation.navigate({
      name: "SearchingDistanceRadius2",
      params: { sliderValue: radius },
      merge: true,
    });
  };

  const handleSearch = () => {
    if (!searchCategory.trim()) {
      console.log("empty");
      return;
    }
    // Perform the search action here, for example, navigate or update state
    console.log(`Searching for category: ${searchCategory}`);
    // update get the value of the current value of slider
    console.log(sliderValue)
    fetchProvider();
  };

  const fetchProvider = async () => {

    goLoading(true); // Set loading to true


    const searchTextLowercase = searchCategory.toLowerCase(); // Convert search text to lowercase


    const db = getFirestore();
    const providerProfilesCollection = collection(db, "providerProfiles");
    const providerProfilesSnapshot = await getDocs(providerProfilesCollection);

    try {
      console.log("Searching");
      const searchPromises = [];

      providerProfilesSnapshot.docs.forEach((doc) => {
        const data = doc.data();
        const appForm3CollectionRef = collection(doc.ref, "appForm3");
        const appForm3SnapshotPromise = getDocs(appForm3CollectionRef);
        searchPromises.push(appForm3SnapshotPromise);
      });

      const appForm3Snapshots = await Promise.all(searchPromises);

      appForm3Snapshots.forEach((appForm3Snapshot, index) => {
        const data = providerProfilesSnapshot.docs[index].data();
        const uid = providerProfilesSnapshot.docs[index].id; // Get document UID

        if (!appForm3Snapshot.empty) {
          appForm3Snapshot.forEach((appForm3Doc) => {
            const appForm3Data = appForm3Doc.data();
            const appForm3DataLowercase = JSON.parse(
              JSON.stringify(appForm3Data).toLowerCase()
            );

            const searchExactMatch = (obj, searchText) => {
              if (typeof obj === "string") {
                return obj === searchText;
              } else if (typeof obj === "object" && obj !== null) {
                return Object.values(obj).some((value) =>
                  searchExactMatch(value, searchText)
                );
              }
              return false;
            };

            if (searchExactMatch(appForm3DataLowercase, searchTextLowercase)) {
              const coordinates = data.coordinates;
              const latitude = coordinates.latitude;
              const longitude = coordinates.longitude;
              searchResults.push({
                providerProfile: data.name,
                latitude: latitude,
                longitude: longitude,
                phoneNumber: data.phone,
                uid: uid, // Add UID to search results
                availability: data.availability
              });
              return; // Exit loop after finding a match
            }
          });
        }
      });
    } catch (error) {
      console.error("Error searching appForm3 documents: ", error);
    } finally {
      if (searchResults.length === 0) {
        console.log("Searching result none");
      }
      console.log("Searching is done", searchResults);
      updateSearchResults(searchResults, sliderValue);
      goLoading(false); // Set loading to false

    }
  };

  return (
    <View style={[styles.frameGroup, styles.frameFlexBox]}>
      <View style={[styles.lineParent, styles.editWrapperFlexBox]}>
        <View style={styles.frameChild} />
        <View
          style={[
            styles.searchingDistanceRadiusWrapper,
            styles.editWrapperFlexBox,
          ]}
        >
          <Text style={[styles.searchingDistanceRadius1, styles.kmTypo]}>
            Search Service Providers Within Range
          </Text>
        </View>
        <Image
          style={styles.frameItem}
          contentFit="cover"
          source={require("../assets/line-748.png")}
        />
      </View>
      <View
        style={[styles.sliderFrameParent, styles.sliderFrameParentFlexBox1]}
      >
        <View style={[styles.kmWrapper, styles.editWrapperFlexBox]}>
          <Slider
            style={{ width: 250, margin: 0, padding: 0 }}
            minimumValue={3}
            maximumValue={6}
            onValueChange={(value) => submit(value)}
            onSlidingComplete={() => handleSearch()}
            onSlidingStart={() => console.log("Sliding start")}
            step={1}
            thumbTintColor="#007EA7"
            maximumTrackTintColor="#8B8E91"
            minimumTrackTintColor="#007EA7"
          />
        </View>

        <View style={[styles.kmWrapper, styles.editWrapperFlexBox]}>
          <Text style={[styles.km, styles.kmTypo]}>{sliderValue}km</Text>
        </View>
      </View>
      <View
        style={[styles.sliderFrameParent, styles.sliderFrameParentFlexBox2]}
      >
        <Text style={[styles.barangayNasipitTalamban, styles.noteText]}>
          *An additional charge of ₱20 per kilometer*
        </Text>
      </View>
      <View
        style={[
          styles.componentsbuttonWrapper,
          styles.sliderFrameParentFlexBox,
        ]}
      >
        <TouchableOpacity
          style={[styles.componentsbutton, styles.componentsbuttonFlexBox]}
          onPress={handleSearch}
        >
          <Text style={styles.viewAllServices}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Searching Distance Radius Modal Styles
  editWrapperFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
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
  sliderFrameParentFlexBox1: {
    marginTop: 15,
    justifyContent: "space-between",
    alignSelf: "stretch",
    alignItems: "center",
  },
  sliderFrameParentFlexBox2: {
    marginTop: 5,
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
  noteText: {
    color: Color.colorDarkgray_300,
    textAlign: "right",
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
    zIndex: 2,
    alignSelf: "stretch",
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
});
export default SearchingProviderWithinRadiusModal;
