import * as React from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { Color, FontSize, FontFamily, Border, Padding } from "../GlobalStyles";
import Spinner from "react-native-loading-spinner-overlay";
import messaging from "@react-native-firebase/messaging";

const Homepage = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true); // Initialize loading state as true

  const fetchUserData = async () => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        // Handle the case when the user is not signed in
        // You can navigate to the login screen or show a message
        // For now, let's set name and email to empty strings
        setName("");
        setEmail("");
        setLoading(false); // Set loading to false when data fetching is complete
        return;
      }

      try {
        // Access the user's email directly from currentUser
        const email = currentUser.email;
        setEmail(email);

        const db = getFirestore(); // Use getFirestore() to initialize Firestore
        const userProfilesCollection = collection(db, "userProfiles");

        // Get a reference to the document with the user's UID
        const userDocRef = doc(userProfilesCollection, currentUser.uid);

        // Check if the document with the user's UID exists
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          // Document with matching UID found, get the data
          const userData = userDocSnapshot.data();
          const { name } = userData;
          setName(name);
          setLoading(false); // Set loading to false when data fetching is complete
          // Display the user's UID using console.log
          // console.log("User UID:", currentUser.uid);
        } else {
          console.log("No user data found for the given UID.");
          setLoading(false); // Set loading to false when data fetching is complete
          // Handle this case, e.g., display a message to the user
        }
      } catch (error) {
        // console.error("Error retrieving user data:", error);
        setLoading(false); // Set loading to false when data fetching is complete
        // Handle the error, e.g., display an error message to the user
      }
    });

    // Return the unsubscribe function to clean up the listener when needed
    return unsubscribe;
  };

  useEffect(() => {
    const checkMessagingPermission = async () => {
      try {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.log("Authorization status:", authStatus);
        } else {
          console.log("Messaging permission not granted");
        }
      } catch (error) {
        // console.error("Error requesting messaging permission:", error);
      }
    };

    checkMessagingPermission();
  }, []); // Empty dependency array means this effect runs only once on component mount

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchUserData();
    }, 2000); // 5000 milliseconds = 5 seconds

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.homepage}>
      <StatusBar barStyle="default" />
      <ScrollView
        style={styles.body}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.bodyScrollViewContent}
      >
        <View style={[styles.helloUser, styles.servicesFlexBox]}>
          <View style={[styles.componentsintroSearch, styles.searchFlexBox]}>
            <View style={styles.topContent}>
              <View style={styles.helloMikeContainer}>
                {loading ? (
                  <Spinner visible={true} />
                ) : (
                  <Text style={[styles.helloMike, styles.helloMikeTypo]}>
                    Hello {name} 👋
                  </Text>
                )}
              </View>
              <Text style={styles.goodMorning}>
                What are you looking for today?
              </Text>
            </View>

            <View style={[styles.searchBar, styles.searchFlexBox]}>
              <TextInput
                style={[styles.searchWhatYou, styles.searchWhatYouTypo]}
                placeholder="Search what you need..."
                placeholderTextColor="#9b9e9f"
              />
              <Pressable style={styles.searchButton}>
                <View style={styles.searchButtonChild} />
                <Image
                  style={[styles.icon16pxsearch, styles.badgePosition]}
                  contentFit="cover"
                  source={require("../assets/icon16pxsearch1.png")}
                />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={[styles.services, styles.servicesFlexBox]}>
          <View style={styles.ourServices}>
            <View style={styles.tagParent}>
              <View style={styles.tag} />
              <Text style={[styles.ourServices1, styles.helloMikeTypo]}>
                Our Services
              </Text>
            </View>
          </View>
          <View style={[styles.firstGroup, styles.viewFlexBox]}>
            <Pressable
              style={styles.plumbingCategory}
              onPress={() => navigation.navigate("PlumbingSubcategory")}
            >
              <Image
                style={styles.plumbingIcon}
                contentFit="cover"
                source={require("../assets/plumbing.png")}
              />
              <Text style={styles.plumbing}>Plumbing</Text>
            </Pressable>
            <Pressable
              style={[styles.electricalCategory, styles.categoryFlexBox]}
              onPress={() => navigation.navigate("ElectricalSubcategory")}
            >
              <Image
                style={styles.plumbingIcon}
                contentFit="cover"
                source={require("../assets/electrical.png")}
              />
              <Text style={styles.plumbing}>Electrical</Text>
            </Pressable>
            <Pressable
              style={[styles.cleaningCategory, styles.categoryFlexBox]}
              onPress={() => navigation.navigate("CleaningSubcategory")}
            >
              <Image
                style={styles.cleaningCategoryIcon}
                contentFit="cover"
                source={require("../assets/cleaning-category.png")}
              />
              <Text style={styles.plumbing}>Cleaning</Text>
            </Pressable>
          </View>
          <View style={styles.secondGroup}>
            <Pressable
              style={styles.plumbingCategory}
              onPress={() => navigation.navigate("PetCareSubcategory")}
            >
              <Image
                style={styles.plumbingIcon}
                contentFit="cover"
                source={require("../assets/pet-care.png")}
              />
              <Text style={styles.plumbing}>Pet Care</Text>
            </Pressable>
            <Pressable
              style={[styles.electricalCategory, styles.categoryFlexBox]}
              onPress={() => navigation.navigate("GardeningSubcategory")}
            >
              <Image
                style={styles.plumbingIcon}
                contentFit="cover"
                source={require("../assets/gardening.png")}
              />
              <Text style={styles.plumbing}>Gardening</Text>
            </Pressable>
            <Pressable
              style={[styles.electricalCategory, styles.categoryFlexBox]}
              onPress={() => navigation.navigate("CarpentrySubcategory")}
            >
              <Image
                style={styles.carpentryIcon}
                contentFit="cover"
                source={require("../assets/carpentry.png")}
              />
              <Text style={styles.plumbing}>Carpentry</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1a244d",
  },
  bodyScrollViewContent: {
    flexDirection: "column",
    paddingTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  viewFlexBox: {
    paddingHorizontal: 0,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  currentLocationFlexBox: {
    textAlign: "right",
    color: Color.white,
  },
  searchWhatYouTypo: {
    fontSize: FontSize.typographyTaglineSmallRegular_size,
    flex: 1,
  },
  servicesFlexBox: {
    paddingVertical: 0,
    alignItems: "center",
    alignSelf: "stretch",
  },
  searchFlexBox: {
    borderWidth: 1,
    borderStyle: "solid",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  helloMikeTypo: {
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
    textAlign: "left",
  },
  badgePosition: {
    zIndex: 1,
    position: "absolute",
  },
  categoryFlexBox: {
    marginLeft: 40,
    alignItems: "center",
    flex: 1,
  },
  iconContainerFlexBox: {
    borderRadius: Border.br_base,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  labelTypo: {
    fontFamily: FontFamily.m3LabelLarge,
    lineHeight: 16,
    letterSpacing: 1,
    textAlign: "center",
    fontWeight: "500",
  },
  segmentSpaceBlock: {
    paddingBottom: Padding.p_base,
    paddingTop: Padding.p_xs,
    width: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  iconLayout: {
    width: 26,
    overflow: "hidden",
    height: 30,
  },
  helloMike: {
    fontSize: FontSize.m3LabelLarge_size,
    letterSpacing: 2,
    lineHeight: 26,
    color: "#666c89",
    textTransform: "uppercase",
    alignSelf: "stretch",
  },
  goodMorning: {
    fontSize: FontSize.m3HeadlineLarge_size,
    letterSpacing: -1,
    lineHeight: 41,
    color: Color.colorDarkslategray_800,
    marginTop: 4,
    textAlign: "left",
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    alignSelf: "stretch",
  },
  topContent: {
    alignSelf: "stretch",
  },
  searchWhatYou: {
    fontFamily: FontFamily.level2Medium12,
    fontWeight: "500",
  },
  searchButtonChild: {
    width: 32,
    zIndex: 0,
    height: 32,
    backgroundColor: Color.colorSteelblue_100,
    borderRadius: Border.br_5xs,
  },
  icon16pxsearch: {
    marginTop: -8,
    right: 8,
    width: 16,
    height: 16,
    top: "50%",
  },
  searchButton: {
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  searchBar: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorGray_200,
    borderColor: Color.colorWhitesmoke_400,
    paddingHorizontal: Padding.p_smi,
    paddingVertical: Padding.p_4xs,
    marginTop: 16,
    flexDirection: "row",
  },
  componentsintroSearch: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    borderColor: Color.colorBlack,
    padding: Padding.p_base,
    borderRadius: Border.br_5xs,
    borderStyle: "solid",
    flex: 1,
    backgroundColor: Color.white,
  },
  helloUser: {
    height: 210,
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: 0,
    justifyContent: "center",
  },
  tag: {
    borderRadius: Border.br_9xs,
    width: 4,
    overflow: "hidden",
    height: 30,
    backgroundColor: Color.colorSteelblue_100,
  },
  ourServices1: {
    fontSize: FontSize.title4Regular18_size,
    letterSpacing: -0.4,
    color: Color.neutral07,
    marginLeft: 10,
  },
  tagParent: {
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  ourServices: {
    paddingLeft: Padding.p_12xs,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  plumbingIcon: {
    height: 85,
    width: 75,
  },
  plumbing: {
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    letterSpacing: -0.3,
    lineHeight: 22,
    color: Color.colorDarkslategray_300,
    textAlign: "center",
    fontFamily: FontFamily.level2Medium12,
    fontWeight: "500",
  },
  plumbingCategory: {
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
  electricalCategory: {
    justifyContent: "flex-end",
  },
  cleaningCategoryIcon: {
    width: 79,
    height: 86,
  },
  cleaningCategory: {
    height: 109,
  },
  firstGroup: {
    paddingVertical: Padding.p_mini,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  carpentryIcon: {
    height: 86,
    width: 75,
  },
  secondGroup: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    flex: 1,
  },
  services: {
    height: 378,
    marginTop: 20,
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: 0,
  },
  body: {
    alignSelf: "stretch",
    flex: 1,
  },
  homepage: {
    width: "100%",
    height: 812,
    flex: 1,
    backgroundColor: Color.white,
  },
});

export default Homepage;
