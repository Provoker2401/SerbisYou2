import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
  Switch,
  Animated,
  LayoutAnimation,
  Linking,
} from "react-native";
import { Image } from "expo-image";
import { Color, Padding, FontFamily, Border, FontSize } from "../GlobalStyles";
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
import { toggleAnimation } from "../animations/toggleAnimation";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const ProviderProfileModal = ({
  isVisible,
  onClose,
  providerName,
  providerUID,
  providerPhone,
  providerStatus,
  tailoredCategory,
}) => {
  const isAvailable = providerStatus === "available";
  const statusText = isAvailable ? "Available Now" : "Unavailable";
  const statusColor = isAvailable ? "#4ABA40" : "gray";
  const navigation = useNavigation();

  // for tailored services function

  // const [tailoredCategory, setTailoredCategory] = useState(null);
  const [showSubCategory, setShowSubCategory] = useState([]);
  const [arrowCategoryRotation, setArrowCategoryRotation] = useState([]);
  const [arrowSubCategoryRotation, setArrowSubCategoryRotation] = useState([]);
  const [showSubContent, setShowSubContent] = useState([]);

  // useEffect(() => {
  //   const fetchTailoredServices = async () => {
  //     try {
  //       const db = getFirestore();
  //       const auth = getAuth();
  //       const provider = providerUID;

  //       const q = query(
  //         collection(db, "providerProfiles", provider, "appForm3")
  //       );
  //       const querySnapshot = await getDocs(q);

  //       let bookings;

  //       // Check if there are at least two documents
  //       if (querySnapshot.size <= 2) {
  //         // Get the second document (index 1 since arrays are 0-based)
  //         const secondDocumentSnapshot = querySnapshot.docs[1];

  //         // Get the data of the second document
  //         const secondDocumentData = secondDocumentSnapshot.data();

  //         bookings = secondDocumentData;
  //       } else {
  //         console.log(
  //           "There are not enough documents in appForm3 subcollection."
  //         );
  //       }
  //       setTailoredCategory(bookings);

  //       const authStatus = await messaging().requestPermission();
  //       const enabled =
  //         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //       if (enabled) {
  //         console.log("Authorization status:", authStatus);
  //       }
  //     } catch (error) {
  //       // Handle errors, e.g., permission issues
  //       console.log("Error fetching active bookings: ", error);
  //       return [];
  //     }
  //   };

  //   fetchTailoredServices();
  // }, []);

  useEffect(() => {
    if (tailoredCategory) {
      setShowSubCategory(
        Array(Object.keys(tailoredCategory).length).fill(false)
      );
      // Initialize arrowRotations with animated values
      const initialCategoryRotations = Array(
        Object.keys(tailoredCategory).length
      )
        .fill(0)
        .map(() => new Animated.Value(0));
      setArrowCategoryRotation(initialCategoryRotations);

      setShowSubContent(
        Object.values(tailoredCategory).map((services) =>
          Array(Object.keys(services).length).fill(false)
        )
      );
      const initialSubCategoryRotations = Object.values(tailoredCategory).map(
        (services) =>
          Array(Object.keys(services).length)
            .fill(0)
            .map(() => new Animated.Value(0))
      );
      setArrowSubCategoryRotation(initialSubCategoryRotations);
    }
  }, [tailoredCategory]);

  useEffect(() => {
    if (tailoredCategory) {
      console.log("Tailored Category:", tailoredCategory);
    }
  }, [tailoredCategory]);

  const toggleCategory = (index) => {
    const newShowContent = [...showSubCategory];
    newShowContent[index] = !newShowContent[index];
    setShowSubCategory(newShowContent);

    const newArrowRotations = [...arrowCategoryRotation];
    Animated.timing(newArrowRotations[index], {
      toValue: newShowContent[index] ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    LayoutAnimation.configureNext(toggleAnimation);
    setArrowCategoryRotation(newArrowRotations);
  };

  const toggleSubCategory = (index, subIndex) => {
    const newShowSubContent = [...showSubContent];
    newShowSubContent[index][subIndex] = !newShowSubContent[index][subIndex];
    setShowSubContent(newShowSubContent);

    const newSubArrowRotations = [...arrowSubCategoryRotation];
    Animated.timing(newSubArrowRotations[index][subIndex], {
      toValue: newShowSubContent[index][subIndex] ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    LayoutAnimation.configureNext(toggleAnimation);
    setArrowSubCategoryRotation(newSubArrowRotations);
  };

  const arrowCategoryRotate = (index) => {
    if (!arrowCategoryRotation[index]) return "0deg"; // Check if arrowRotations[index] is defined
    return arrowCategoryRotation[index].interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "90deg"],
    });
  };

  const subCategoryArrowRotate = (index, subIndex) => {
    if (
      !arrowSubCategoryRotation[index] ||
      !arrowSubCategoryRotation[index][subIndex]
    )
      return "0deg";
    return arrowSubCategoryRotation[index][subIndex].interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "90deg"],
    });
  };

  const getCategoryImageSource = (category) => {
    switch (category) {
      case "Plumbing":
        return require("../assets/plumbing.png");
      case "Carpentry":
        return require("../assets/carpentry.png");
      case "Pet Care":
        return require("../assets/pet-care.png");
      case "Electrical":
        return require("../assets/electrical.png");
      case "Gardening":
        return require("../assets/gardening.png");
      case "Cleaning":
        return require("../assets/cleaning-category.png");
      default:
        return require("../assets/cleaning-category.png");
    }
  };

  const getServiceImageSource = (category, service) => {
    if (category === "Plumbing") {
      switch (service) {
        case "Installation":
          return require("../assets/plumbing-installation.png");
        case "Repairs/Replacement":
          return require("../assets/plumbing-repair.png");
        default:
          return require("../assets/plumbing-installation.png");
      }
    } else if (category === "Electrical") {
      switch (service) {
        case "Installation":
          return require("../assets/electrical-installation.png");
        case "Repairs/Replacement":
          return require("../assets/electrical-repair.png");
        default:
          return require("../assets/electrical-installation.png");
      }
    } else if (category === "Carpentry") {
      switch (service) {
        case "Installation":
          return require("../assets/carpentry-installation.png");
        case "Repairs/Replacement":
          return require("../assets/carpentry-repair.png");
        case "Furniture Assembly And Disassembly":
          return require("../assets/furniture-assembly-and-disassembly.png");
        default:
          return require("../assets/carpentry-installation.png");
      }
    } else if (
      category === "Cleaning" ||
      category === "Pet Care" ||
      category === "Gardening"
    ) {
      switch (service) {
        case "Standard Cleaning":
          return require("../assets/standard-cleaning.png");
        case "Deep Cleaning":
          return require("../assets/deep-cleaning.png");
        case "Electronic Appliance Cleaning":
          return require("../assets/electronic-appliance-cleaning.png");
        case "Pest Control":
          return require("../assets/pest-control.png");
        case "Dog Training":
          return require("../assets/dog-training.png");
        case "Pet Grooming":
          return require("../assets/pet-grooming.png");
        case "Pet Sitting":
          return require("../assets/pet-sitting.png");
        case "Garden Maintenance":
          return require("../assets/garden-maintenance.png");
        case "Landscape Design and Planning":
          return require("../assets/landscape-design-and-planning.png");
        case "Irrigation System Installation/Repairs":
          return require("../assets/irrigation-system.png");
        case "Pest and Disease Management":
          return require("../assets/pest-and-disease-management.png");
        default:
          return require("../assets/standard-cleaning.png");
      }
    }
  };

  // Render the activeBookings
  const renderTailoredServices = () => {
    if (!tailoredCategory) {
      return <Text>Loading...</Text>; // or any loading indicator
    }

    // Check if tailoredCategory is an array and has items before mapping
    if (Object.keys(tailoredCategory).length === 0) {
      return <Text>No tailored services available</Text>; // Or any other placeholder
    }
    // console.log("renderTailoredServices", tailoredCategory);

    return (
      <View style={styles.comment1Parent}>
        {Object.entries(tailoredCategory).map(([category, services], index) => (
          <View key={category} style={styles.verticalGap}>
            <Pressable
              style={styles.comment1}
              onPress={() => toggleCategory(index)}
            >
              <View style={styles.collapseArrowWrapper}>
                <Animated.Image
                  style={[
                    styles.collapseArrowIcon,
                    {
                      transform: [
                        {
                          rotate: arrowCategoryRotate(index),
                        },
                      ],
                    },
                  ]}
                  contentFit="cover"
                  source={require("../assets/collapse-arrow3.png")}
                />
              </View>
              <View style={styles.cleaningCategory}>
                <Image
                  style={styles.cleaningCategoryIcon}
                  contentFit="cover"
                  source={getCategoryImageSource(category)}
                />
              </View>
              <View style={styles.cleaningWrapper}>
                <Text style={styles.cleaningTypo}>
                  <Text style={styles.cleaning1Typo}>{category}</Text>
                  <Text style={styles.text4}>{` `}</Text>
                </Text>
              </View>
            </Pressable>
            {showSubCategory[index] &&
              Object.entries(services).map(([service, bookings], subIndex) => (
                <View key={service} style={styles.comment5Parent}>
                  <Pressable
                    style={styles.commentFlexBox2}
                    onPress={() => toggleSubCategory(index, subIndex)}
                  >
                    <View style={styles.collapseArrowWrapper}>
                      <Animated.Image
                        style={[
                          styles.collapseArrowIcon,
                          {
                            transform: [
                              {
                                rotate: subCategoryArrowRotate(index, subIndex),
                              },
                            ],
                          },
                        ]}
                        contentFit="cover"
                        source={require("../assets/collapse-arrow3.png")}
                      />
                    </View>
                    <View style={styles.comment5Inner}>
                      <Image
                        style={styles.cleaningCategoryIcon}
                        contentFit="cover"
                        source={getServiceImageSource(category, service)}
                      />
                    </View>
                    <View style={styles.standardCleaningWrapper}>
                      <Text
                        style={[styles.standardCleaning, styles.cleaningTypo1]}
                      >
                        {service}
                      </Text>
                    </View>
                  </Pressable>
                  <Pressable  style={styles.comment2}>
                  {showSubContent[index][subIndex] &&
                    bookings.map((homeService, itemIndex) => (
                      <View key={itemIndex} style={styles.comment6Parent}>
                        <View style={styles.commentFlexBox1}>
                          <Image
                            style={styles.frameIcon}
                            contentFit="cover"
                            source={require("../assets/bulletFrame.png")}
                          />
                          <View style={styles.livingRoomWrapper}>
                            <Text
                              style={[styles.livingRoom, styles.cleaningTypo2]}
                            >
                              {homeService}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ))}
                  </Pressable>
                </View>
              ))}
          </View>
        ))}
      </View>
    );
  };

  const messageProvider = () => {
    Linking.openURL(`sms:${providerPhone}`);
  };
  const callProvider = () => {
    Linking.openURL(`tel:${providerPhone}`);
  };


  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback>      
              <View style={styles.modalView}>
                <View style={styles.topView}>
                  <Text style={styles.providerName}>{providerName}</Text>
                  <View style={styles.callTextContainer}>
                    <TouchableOpacity onPress={messageProvider}>
                      <Image
                        style={styles.text}
                        contentFit="cover"
                        source={require("../assets/text.png")}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={callProvider}>
                      <Image
                        style={styles.call}
                        contentFit="cover"
                        source={require("../assets/Call.png")}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.statusContainer}>
                  <Text style={[styles.providerStatus, { color: statusColor }]}>
                    {statusText}
                  </Text>
                  <Text style={styles.titleTailored}>Tailored Services:</Text>
                </View>
                <View style={styles.tailoredServiesContainer}>
                  <ScrollView style={styles.comments}>
                    {tailoredCategory !== null ? (
                      renderTailoredServices()
                    ) : (
                      <Text>No tailored services found.</Text>
                    )}
                  </ScrollView>
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    title="Choose Service"
                    onPress={() => {
                      navigation.navigate("ProviderServicesOffered", {
                        tailoredCategory: tailoredCategory,
                        providerName: providerName,
                      });
                      onClose(); // Call onClose function here
                    }}
                    disabled={!isAvailable}
                    color={isAvailable ? "#2196F3" : "gray"}
                    style={styles.button}
                  />
                </View>
              </View>
            
          </TouchableWithoutFeedback>
        </View>    
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // semi-transparent background
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    width: "85%",
  },
  dateBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  topView: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center", // Align items vertically in the center
    justifyContent: "space-between", // Add space between items
  },
  providerName: {
    fontSize: 15,
    marginBottom: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  callTextContainer: {
    flexDirection: "row",
    alignItems: "center", // Align buttons vertically in the center
    paddingHorizontal: 10, // Add horizontal padding to the container
  },
  text: {
    width: 25,
    height: 25,
    marginHorizontal: 7,
  },
  call: {
    width: 25,
    height: 25,
  },
  statusContainer: {
    marginTop: -18,
  },
  providerStatus: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#4ABA40",
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  tailoredServiesContainer: {},
  titleTailored: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: "bold",
  },

  tailoredServices: {
    // fontFamily: FontFamily.workSansExtraBold,
    fontFamily: FontFamily.title2Bold32,
    color: Color.black,
    fontWeight: "600",
    fontSize: FontSize.size_11xl,
  },
  collapseArrowIcon: {
    height: 30,
    width: 14,
  },
  collapseArrowWrapper: {
    alignItems: "center",
    flexDirection: "row",
  },
  cleaningCategoryIcon: {
    width: 40,
    height: 44,
  },
  cleaningCategory: {
    marginLeft: 10,
    alignItems: "center",
  },
  text4: {
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
  },
  cleaningWrapper: {
    paddingLeft: Padding.p_3xs,
    marginLeft: 10,
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  comment1: {
    overflow: "hidden",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  comment2: {
    overflow: "hidden",
    alignItems: "center",
    alignSelf: "stretch",
  },
  comment5Inner: {
    marginLeft: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  standardCleaning: {
    fontFamily: FontFamily.levelSemibold14,
    fontWeight: "600",
  },
  standardCleaningWrapper: {
    marginLeft: 10,
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  frameIcon: {
    width: 15,
    height: 15,
    overflow: "hidden",
  },
  livingRoom: {
    fontFamily: FontFamily.level2Medium12,
    fontWeight: "500",
  },
  livingRoomWrapper: {
    paddingLeft: Padding.p_8xs,
    marginLeft: 5,
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  comment9: {
    marginTop: 2,
  },
  comment6Parent: {
    marginTop: 10,
    alignItems: "center",
    alignSelf: "stretch",
  },
  electronicApplianceCleaning: {
    height: 40,
    width: 40,
  },
  comment7: {
    marginTop: 10,
  },
  pestControlPic: {
    height: 40,
    width: 35,
  },
  pestControlPicWrapper: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  pestControlWrapper: {
    paddingLeft: Padding.p_sm,
    marginLeft: 10,
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  comment5Parent: {
    marginTop: 5,
    alignItems: "center",
    alignSelf: "stretch",
  },
  comment1Parent: {
    alignItems: "left",
    alignSelf: "stretch",
  },
  comment91: {
    marginTop: 2,
  },
  collapseArrowIcon7: {
    transform: [
      {
        rotate: "-180deg",
      },
    ],
  },
  collapseArrowWrapper4: {
    transform: [
      {
        rotate: "-180deg",
      },
    ],
    alignItems: "center",
    flexDirection: "row",
  },
  comments: {
    maxHeight: 400, // Adjust the max height as needed

    // alignItems: "center",
    // alignSelf: "stretch",
  },
  verticalGap: {
    marginVertical: 5,
  },
  cleaningTypo: {
    color: Color.colorGray_400,
    lineHeight: 22,
    fontSize: FontSize.title3Bold20_size,
    textAlign: "left",
    flex: 1,
  },
  cleaningTypo1: {
    color: Color.colorGray_400,
    lineHeight: 22,
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    textAlign: "left",
    flex: 1,
    fontSize: 12,
  },
  cleaningTypo2: {
    color: Color.colorGray_400,
    lineHeight: 22,
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    textAlign: "left",
    flex: 1,
    fontSize: 12,
  },
  commentFlexBox1: {
    paddingLeft: 95,
    overflow: "hidden",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  commentFlexBox2: {
    paddingLeft: 20,
    overflow: "hidden",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  commentFlexBox: {
    paddingLeft: 105,
    overflow: "hidden",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  cleaning1Typo: {
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    fontSize: 12,
  },
});

export default ProviderProfileModal;
