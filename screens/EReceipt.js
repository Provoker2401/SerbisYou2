// import * as React from "react";
// import {
//   StatusBar,
//   StyleSheet,
//   Pressable,
//   View,
//   Text,
//   ScrollView,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Image } from "expo-image";
// import { FontFamily, Padding, FontSize, Color, Border } from "../GlobalStyles";

// const EReceipt = () => {
//   return (
//     <View style={styles.eReceipt}>
//       <StatusBar barStyle="default" />
//       <ScrollView
//         style={styles.body}
//         indicatorStyle="default"
//         showsVerticalScrollIndicator={true}
//         showsHorizontalScrollIndicator={false}
//         pagingEnabled={false}
//         contentContainerStyle={styles.bodyScrollViewContent}
//       >
//         <View style={styles.providerDetailsParent}>
//           <View style={[styles.providerDetails, styles.frameWrapperFlexBox1]}>
//             <View
//               style={[styles.image2358Wrapper, styles.frameWrapperFlexBox1]}
//             >
//               <Image
//                 style={styles.image2358Icon}
//                 contentFit="cover"
//                 source={require("../assets/image-23583.png")}
//               />
//             </View>
//             <View
//               style={[
//                 styles.dummyProvider1Wrapper,
//                 styles.frameWrapperFlexBox1,
//               ]}
//             >
//               <Text style={[styles.dummyProvider, styles.eReceipt1Typo]}>
//                 Dummy Provider # 1
//               </Text>
//             </View>
//             <View style={[styles.lineWrapper, styles.lineWrapperFlexBox]}>
//               <Image
//                 style={[styles.lineIcon, styles.lineIconLayout]}
//                 contentFit="cover"
//                 source={require("../assets/line.png")}
//               />
//             </View>
//           </View>
//           <View style={[styles.frameWrapper, styles.frameWrapperFlexBox]}>
//             <View style={styles.totalAssetSpaceBlock}>
//               <View
//                 style={[
//                   styles.frameServicesParent,
//                   styles.frameWrapperFlexBox1,
//                 ]}
//               >
//                 <View style={styles.frameServices}>
//                   <Text style={[styles.service, styles.serviceFlexBox]}>
//                     Service
//                   </Text>
//                 </View>
//                 <View style={[styles.frameServices1, styles.copyButtonFlexBox]}>
//                   <Text style={styles.plumbing}>Plumbing</Text>
//                 </View>
//               </View>
//               <View
//                 style={[
//                   styles.dummyProvider1Wrapper,
//                   styles.frameWrapperFlexBox1,
//                 ]}
//               >
//                 <View style={styles.frameServices}>
//                   <Text
//                     style={[styles.service, styles.serviceFlexBox]}
//                   >{`Date & Time`}</Text>
//                 </View>
//                 <View style={[styles.frameServices1, styles.copyButtonFlexBox]}>
//                   <Text style={styles.plumbing}>Aug 17, 2023 | 7:00 AM</Text>
//                 </View>
//               </View>
//               <View
//                 style={[
//                   styles.dummyProvider1Wrapper,
//                   styles.frameWrapperFlexBox1,
//                 ]}
//               >
//                 <View style={styles.frameServices}>
//                   <Text style={[styles.service, styles.serviceFlexBox]}>
//                     Address
//                   </Text>
//                 </View>
//                 <View style={[styles.frameServices1, styles.copyButtonFlexBox]}>
//                   <Text style={styles.plumbing}>
//                     Nasipit, Talamban, Cebu City
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//           <View style={[styles.firstQuestion, styles.frameWrapperFlexBox]}>
//             <View style={[styles.totalAsset, styles.totalAssetSpaceBlock]}>
//               <View
//                 style={[
//                   styles.frameServicesParent,
//                   styles.frameWrapperFlexBox1,
//                 ]}
//               >
//                 <View style={styles.titleLabelWrapper}>
//                   <Text style={styles.titleLabel}>Service Details</Text>
//                 </View>
//                 <View
//                   style={[
//                     styles.polygonDownParent,
//                     styles.frameWrapperFlexBox1,
//                   ]}
//                 >
//                   <Image
//                     style={styles.polygonDownIcon}
//                     contentFit="cover"
//                     source={require("../assets/polygon-down2.png")}
//                   />
//                   <Image
//                     style={styles.polygonUpIcon}
//                     contentFit="cover"
//                     source={require("../assets/polygon-up2.png")}
//                   />
//                 </View>
//               </View>
//               <View style={[styles.answerFrame, styles.frameWrapperFlexBox1]}>
//                 <View style={styles.lineContainerFlexBox}>
//                   <Image
//                     style={[styles.frameChild, styles.lineIconLayout]}
//                     contentFit="cover"
//                     source={require("../assets/line-132.png")}
//                   />
//                 </View>
//                 <View
//                   style={[styles.dateAndTimeFrame, styles.frameWrapperFlexBox]}
//                 >
//                   <View
//                     style={[styles.frameContainer, styles.frameWrapperFlexBox1]}
//                   >
//                     <View
//                       style={[
//                         styles.frameServicesParent,
//                         styles.frameWrapperFlexBox1,
//                       ]}
//                     >
//                       <View
//                         style={[
//                           styles.plumbingInstallationWrapper,
//                           styles.frameWrapperFlexBox1,
//                         ]}
//                       >
//                         <Text style={styles.plumbingInstallation}>
//                           Plumbing Installation
//                         </Text>
//                       </View>
//                     </View>
//                   </View>
//                 </View>
//                 <View style={styles.frameWrapperFlexBox}>
//                   <View style={styles.lineWrapperFlexBox}>
//                     <View
//                       style={[
//                         styles.dateAndTimeFrameInner,
//                         styles.frameWrapperFlexBox1,
//                       ]}
//                     >
//                       <View
//                         style={[
//                           styles.frameContainer,
//                           styles.frameWrapperFlexBox1,
//                         ]}
//                       >
//                         <Text style={[styles.x, styles.xTypo]}>2x</Text>
//                       </View>
//                     </View>
//                     <View style={[styles.frameFrame, styles.frameSpaceBlock]}>
//                       <View style={styles.frame1}>
//                         <Text style={[styles.toiletSystem, styles.xTypo]}>
//                           Toilet System
//                         </Text>
//                       </View>
//                     </View>
//                     <View style={[styles.frameView, styles.frameSpaceBlock]}>
//                       <View style={styles.frame1}>
//                         <Text style={[styles.text, styles.textTypo]}>
//                           ₱2000.00
//                         </Text>
//                       </View>
//                     </View>
//                   </View>
//                   <View style={[styles.lineWrapper, styles.lineWrapperFlexBox]}>
//                     <View
//                       style={[
//                         styles.dateAndTimeFrameInner,
//                         styles.frameWrapperFlexBox1,
//                       ]}
//                     >
//                       <View
//                         style={[
//                           styles.frameContainer,
//                           styles.frameWrapperFlexBox1,
//                         ]}
//                       >
//                         <Text style={[styles.x, styles.xTypo]}>1x</Text>
//                       </View>
//                     </View>
//                     <View style={[styles.frameFrame, styles.frameSpaceBlock]}>
//                       <View style={styles.frame1}>
//                         <Text style={[styles.toiletSystem, styles.xTypo]}>
//                           Septic Tank
//                         </Text>
//                       </View>
//                     </View>
//                     <View style={[styles.frameView, styles.frameSpaceBlock]}>
//                       <View style={styles.frame1}>
//                         <Text style={[styles.text, styles.textTypo]}>
//                           ₱1500.00
//                         </Text>
//                       </View>
//                     </View>
//                   </View>
//                   <View style={[styles.lineWrapper, styles.lineWrapperFlexBox]}>
//                     <View
//                       style={[
//                         styles.dateAndTimeFrameInner,
//                         styles.frameWrapperFlexBox1,
//                       ]}
//                     >
//                       <View
//                         style={[
//                           styles.frameContainer,
//                           styles.frameWrapperFlexBox1,
//                         ]}
//                       >
//                         <Text style={[styles.x, styles.xTypo]}>2x</Text>
//                       </View>
//                     </View>
//                     <View style={[styles.frameFrame, styles.frameSpaceBlock]}>
//                       <View style={styles.frame1}>
//                         <Text style={[styles.toiletSystem, styles.xTypo]}>
//                           Pressure Pump
//                         </Text>
//                       </View>
//                     </View>
//                     <View style={[styles.frameView, styles.frameSpaceBlock]}>
//                       <View style={styles.frame1}>
//                         <Text style={[styles.text, styles.textTypo]}>
//                           ₱2500.00
//                         </Text>
//                       </View>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             </View>
//           </View>
//           <View style={[styles.frameWrapper5, styles.frameWrapperFlexBox]}>
//             <View style={styles.totalAssetSpaceBlock}>
//               <View
//                 style={[
//                   styles.frameServicesParent,
//                   styles.frameWrapperFlexBox1,
//                 ]}
//               >
//                 <View style={styles.frameServices}>
//                   <Text style={[styles.service, styles.serviceFlexBox]}>
//                     Subtotal
//                   </Text>
//                 </View>
//                 <View style={[styles.frameServices1, styles.copyButtonFlexBox]}>
//                   <Text style={[styles.text, styles.textTypo]}>₱6000.00</Text>
//                 </View>
//               </View>
//               <View
//                 style={[
//                   styles.dummyProvider1Wrapper,
//                   styles.frameWrapperFlexBox1,
//                 ]}
//               >
//                 <View style={styles.frameServices}>
//                   <Text style={[styles.service, styles.serviceFlexBox]}>
//                     Distance Fee
//                   </Text>
//                 </View>
//                 <View style={[styles.frameServices1, styles.copyButtonFlexBox]}>
//                   <Text style={[styles.text, styles.textTypo]}>₱40.00</Text>
//                 </View>
//               </View>
//               <View style={[styles.lineContainer, styles.lineContainerFlexBox]}>
//                 <Image
//                   style={[styles.frameChild, styles.lineIconLayout]}
//                   contentFit="cover"
//                   source={require("../assets/line-133.png")}
//                 />
//               </View>
//               <View
//                 style={[
//                   styles.dummyProvider1Wrapper,
//                   styles.frameWrapperFlexBox1,
//                 ]}
//               >
//                 <View style={styles.frameServices}>
//                   <Text style={[styles.totalPrice, styles.xTypo]}>
//                     Total Price
//                   </Text>
//                 </View>
//                 <View style={[styles.frameServices1, styles.copyButtonFlexBox]}>
//                   <Text style={[styles.text5, styles.textTypo]}>₱6040.00</Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//           <View style={[styles.frameWrapper6, styles.frameWrapperFlexBox]}>
//             <View style={styles.totalAssetSpaceBlock}>
//               <View
//                 style={[
//                   styles.frameServicesParent,
//                   styles.frameWrapperFlexBox1,
//                 ]}
//               >
//                 <View style={styles.frameServices12}>
//                   <Text style={[styles.service, styles.serviceFlexBox]}>
//                     Payment Method
//                   </Text>
//                 </View>
//                 <View style={[styles.frameServices1, styles.copyButtonFlexBox]}>
//                   <Text style={styles.plumbing}>PayPal</Text>
//                 </View>
//               </View>
//               <View
//                 style={[
//                   styles.dummyProvider1Wrapper,
//                   styles.frameWrapperFlexBox1,
//                 ]}
//               >
//                 <View style={styles.frameServices12}>
//                   <Text style={[styles.service, styles.serviceFlexBox]}>
//                     Transaction ID
//                   </Text>
//                 </View>
//                 <View style={[styles.frameServices1, styles.copyButtonFlexBox]}>
//                   <Text style={styles.plumbing}>SDSA259SFJK</Text>
//                 </View>
//                 <Pressable
//                   style={[styles.copyButton, styles.copyButtonFlexBox]}
//                 >
//                   <Image
//                     style={styles.vectorIcon}
//                     contentFit="cover"
//                     source={require("../assets/vector8.png")}
//                   />
//                 </Pressable>
//               </View>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: "#1a244d",
//   },
//   bodyScrollViewContent: {
//     flexDirection: "column",
//     paddingTop: 20,
//     paddingBottom: 25,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   frameWrapperFlexBox1: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   eReceipt1Typo: {
//     fontFamily: FontFamily.title2Bold32,
//     fontWeight: "700",
//     textAlign: "center",
//   },
//   lineWrapperFlexBox: {
//     paddingVertical: Padding.p_8xs,
//     paddingHorizontal: 0,
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//     alignSelf: "stretch",
//   },
//   lineIconLayout: {
//     maxWidth: "100%",
//     overflow: "hidden",
//     flex: 1,
//   },
//   frameWrapperFlexBox: {
//     marginTop: 10,
//     justifyContent: "center",
//     alignSelf: "stretch",
//   },
//   serviceFlexBox: {
//     textAlign: "left",
//     flex: 1,
//   },
//   copyButtonFlexBox: {
//     justifyContent: "flex-end",
//     marginLeft: 10,
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   totalAssetSpaceBlock: {
//     paddingVertical: Padding.p_mini,
//     paddingHorizontal: Padding.p_3xs,
//     justifyContent: "center",
//     alignSelf: "stretch",
//   },
//   xTypo: {
//     fontFamily: FontFamily.level2Medium12,
//     fontWeight: "500",
//   },
//   frameSpaceBlock: {
//     marginLeft: 7,
//     justifyContent: "center",
//   },
//   textTypo: {
//     lineHeight: 16,
//     fontSize: FontSize.level2Medium12_size,
//     textAlign: "right",
//     color: Color.neutral07,
//     flex: 1,
//   },
//   lineContainerFlexBox: {
//     height: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     alignSelf: "stretch",
//   },
//   image2358Icon: {
//     height: 132,
//     width: 129,
//   },
//   image2358Wrapper: {
//     flexDirection: "row",
//   },
//   dummyProvider: {
//     fontSize: FontSize.size_5xl,
//     lineHeight: 41,
//     color: Color.colorDarkslategray_800,
//     textTransform: "capitalize",
//     textAlign: "center",
//     flex: 1,
//   },
//   dummyProvider1Wrapper: {
//     marginTop: 5,
//     flexDirection: "row",
//     alignSelf: "stretch",
//   },
//   lineIcon: {
//     height: 2,
//   },
//   lineWrapper: {
//     marginTop: 5,
//   },
//   providerDetails: {
//     alignSelf: "stretch",
//   },
//   service: {
//     color: Color.neutral07,
//     letterSpacing: -0.3,
//     fontSize: FontSize.body1Semibold_size,
//     textAlign: "left",
//     fontFamily: FontFamily.title4Regular18,
//   },
//   frameServices: {
//     width: 94,
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   plumbing: {
//     textAlign: "right",
//     fontFamily: FontFamily.level2Semibold12,
//     fontWeight: "600",
//     color: Color.neutral07,
//     letterSpacing: -0.3,
//     fontSize: FontSize.body1Semibold_size,
//     flex: 1,
//   },
//   frameServices1: {
//     marginLeft: 10,
//     flex: 1,
//   },
//   frameServicesParent: {
//     flexDirection: "row",
//     alignSelf: "stretch",
//   },
//   frameWrapper: {
//     borderWidth: 1,
//     borderColor: Color.colorBlack,
//     borderStyle: "solid",
//     shadowOpacity: 1,
//     elevation: 4,
//     shadowRadius: 4,
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowColor: "rgba(0, 0, 0, 0.25)",
//     borderRadius: Border.br_5xs,
//     backgroundColor: Color.white,
//   },
//   titleLabel: {
//     lineHeight: 24,
//     color: Color.colorGray_1000,
//     fontFamily: FontFamily.level2Semibold12,
//     fontWeight: "600",
//     textAlign: "left",
//     fontSize: FontSize.body1Semibold_size,
//   },
//   titleLabelWrapper: {
//     alignItems: "center",
//     flexDirection: "row",
//     flex: 1,
//   },
//   polygonDownIcon: {
//     width: 12,
//     height: 10,
//     borderRadius: Border.br_12xs,
//   },
//   polygonUpIcon: {
//     width: 15,
//     height: 15,
//     display: "none",
//     borderRadius: Border.br_12xs,
//     marginLeft: 10,
//   },
//   polygonDownParent: {
//     marginLeft: 10,
//     flexDirection: "row",
//   },
//   frameChild: {
//     maxHeight: "100%",
//     opacity: 0.3,
//     alignSelf: "stretch",
//     width: "100%",
//   },
//   plumbingInstallation: {
//     fontSize: FontSize.title4Regular18_size,
//     fontFamily: FontFamily.workSansMedium,
//     color: Color.colorBlack,
//     fontWeight: "500",
//     textAlign: "center",
//     flex: 1,
//   },
//   plumbingInstallationWrapper: {
//     flexDirection: "row",
//     flex: 1,
//   },
//   frameContainer: {
//     flex: 1,
//   },
//   dateAndTimeFrame: {
//     paddingTop: Padding.p_3xs,
//     paddingBottom: Padding.p_8xs,
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   x: {
//     fontSize: FontSize.level2Medium12_size,
//     fontFamily: FontFamily.level2Medium12,
//     color: Color.colorBlack,
//     textAlign: "center",
//     alignSelf: "stretch",
//   },
//   dateAndTimeFrameInner: {
//     width: 30,
//     flexDirection: "row",
//   },
//   toiletSystem: {
//     fontSize: FontSize.level2Medium12_size,
//     fontFamily: FontFamily.level2Medium12,
//     color: Color.colorBlack,
//     textAlign: "left",
//     flex: 1,
//     textTransform: "capitalize",
//   },
//   frame1: {
//     alignItems: "center",
//     flexDirection: "row",
//     alignSelf: "stretch",
//   },
//   frameFrame: {
//     flex: 1,
//   },
//   text: {
//     fontFamily: FontFamily.title4Regular18,
//   },
//   frameView: {
//     width: 68,
//     alignItems: "flex-end",
//   },
//   answerFrame: {
//     paddingTop: Padding.p_8xs,
//     alignSelf: "stretch",
//   },
//   totalAsset: {
//     borderWidth: 1,
//     borderColor: Color.colorBlack,
//     borderStyle: "solid",
//     shadowOpacity: 1,
//     elevation: 4,
//     shadowRadius: 4,
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowColor: "rgba(0, 0, 0, 0.25)",
//     borderRadius: Border.br_5xs,
//     backgroundColor: Color.white,
//     alignItems: "center",
//   },
//   firstQuestion: {
//     alignItems: "center",
//   },
//   lineContainer: {
//     marginTop: 5,
//   },
//   totalPrice: {
//     textAlign: "left",
//     flex: 1,
//     color: Color.neutral07,
//     letterSpacing: -0.3,
//     fontSize: FontSize.body1Semibold_size,
//   },
//   text5: {
//     fontFamily: FontFamily.level2Medium12,
//     fontWeight: "500",
//   },
//   frameWrapper5: {
//     borderWidth: 1,
//     borderColor: Color.colorBlack,
//     borderStyle: "solid",
//     shadowOpacity: 1,
//     elevation: 4,
//     shadowRadius: 4,
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowColor: "rgba(0, 0, 0, 0.25)",
//     borderRadius: Border.br_5xs,
//     backgroundColor: Color.white,
//   },
//   frameServices12: {
//     width: 129,
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   vectorIcon: {
//     width: 14,
//     height: 16,
//   },
//   copyButton: {
//     marginLeft: 10,
//   },
//   frameWrapper6: {
//     borderWidth: 1,
//     borderColor: Color.colorBlack,
//     borderStyle: "solid",
//     shadowOpacity: 1,
//     elevation: 4,
//     shadowRadius: 4,
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowColor: "rgba(0, 0, 0, 0.25)",
//     borderRadius: Border.br_5xs,
//     backgroundColor: Color.white,
//   },
//   providerDetailsParent: {
//     paddingVertical: 0,
//     paddingHorizontal: Padding.p_3xs,
//     justifyContent: "center",
//     alignSelf: "stretch",
//   },
//   body: {
//     alignSelf: "stretch",
//     flex: 1,
//   },
//   eReceipt: {
//     backgroundColor: Color.colorWhitesmoke_200,
//     height: 812,
//     width: "100%",
//     flex: 1,
//   },
// });

// export default EReceipt;

import * as React from "react";
import {
  StatusBar,
  StyleSheet,
  Pressable,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { FontFamily, Padding, FontSize, Color, Border } from "../GlobalStyles";
import { useState, useCallback, useRef, useEffect } from "react";
//import { useReviewSummaryContext } from "../ReviewSummaryContext";
import { useDateTimeContext } from "../DateTimeContext"; // Import the hook
import { toggleAnimation } from "../animations/toggleAnimation";
import * as Clipboard from 'expo-clipboard';
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"; // Updated imports
import { getAuth, onAuthStateChanged, updateEmail } from "firebase/auth";

const EReceipt = ({route}) => {
  //const { reviewData } = useReviewSummaryContext();

  // Now you can access the data in reviewData
  //const { inputValues, multipliedValue, category, logo, title } = reviewData;
  //const { selectedDateContext, selectedTimeContext } = useDateTimeContext();



  const animationController = useRef(new Animated.Value(0)).current;
  const [showContent, setShowContent] = useState(false);


  const { itemID } = route.params;
  const [bookingID, setBookingID] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingAddress, setBookingAddress] = useState("");
  const [bookingDistanceRadius, setBookingDistanceRadius] = useState("");
  const [bookingTitle, setBookingTitle] = useState("");
  const [bookingCategory, setBookingCategory] = useState("");
  const [bookingServices, setBookingServices] = useState([]);
  const [bookingSubtotal, setBookingSubtotal] = useState("");
  const [bookingDistanceFee, setBookingDistanceFee] = useState("");
  const [bookingTotalPrice, setBookingTotalPrice] = useState("");
  const [bookingPaymentMethod, setBookingPaymentMethod] = useState("");
  const [bookingProviderName, setBookingProviderName] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [bookingCoordinates, setBookingCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

  const [materialFee, setMaterialFee] = useState("");

  const [loading, setLoading] = useState(false); // Set to true initially, assuming you want to show the loading indicator on component mount

  const toggleListItem = () => {
    const config = {
      duration: 300,
      toValue: showContent ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController, config).start();
    LayoutAnimation.configureNext(toggleAnimation);
    setShowContent(!showContent);
  };

  const arrowTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const copyToClipboard = useCallback(() => {
    Clipboard.setString(bookingID);
    Alert.alert('Copied to clipboard', `Booking ID: ${bookingID} has been copied to clipboard.`);
  }, [bookingID]);

  // console.log(selectedDateContext);
  // console.log(selectedTimeContext);


  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true); // Set loading to true before fetching data

        const db = getFirestore(); // Use getFirestore() to initialize Firestore

        // Get the user's UID
        const auth = getAuth();
        const userUID = auth.currentUser.uid;
        console.log("User UID: ", userUID);
        console.log("Item Id: ", itemID);

        const userBookingDocRef = doc(
          db,
          "serviceBookings",
          userUID,
          "historyBookings",
          itemID
        );
        const docSnapshot = await getDoc(userBookingDocRef);

        if (docSnapshot.exists()) {
          const booking = docSnapshot.data();
          console.log("Booking Data: ", booking);

          const servicesData = booking.service.map((doc) => doc);
          console.log("Data Services: ", servicesData);

          setBookingID(booking.bookingID);
          setBookingDate(booking.date);
          setBookingTime(booking.time);
          setBookingAddress(booking.address);
          setBookingDistanceRadius(booking.distanceRadius);
          setBookingTitle(booking.title);
          setBookingCategory(booking.category);
          setBookingServices(booking.service);
          setBookingSubtotal(booking.subTotal);
          setBookingDistanceFee(booking.feeDistance);
          setBookingTotalPrice(booking.totalPrice);
          setBookingPaymentMethod(booking.paymentMethod);
          setBookingProviderName(booking.providerName);
          setBookingStatus(booking.status);
          setBookingCoordinates({
            latitude: booking.coordinates.latitude,
            longitude: booking.coordinates.longitude,
          });
          setMaterialFee(booking.materialFee);

          console.log("Coordinates: ", bookingCoordinates);
        } else {
          console.log("No such document!");
        }

        setLoading(false); // Set loading to true before fetching data
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    }

    fetchData(); // Call the fetchData function immediately
  }, []);


  return (
    <View style={styles.eReceipt}>
      <StatusBar barStyle="default" />
      <ScrollView
        style={styles.body}
        indicatorStyle="default"
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={false}
        contentContainerStyle={styles.bodyScrollViewContent}
      >
            {loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{
              marginVertical: "75%",
              transform: [{ scale: 2 }], // Adjust the scale factor as needed
            }}
          />
        ) : (
          <View style={styles.providerDetailsParent}>
            <View style={[styles.providerDetails, styles.frameWrapperFlexBox1]}>
              <View
                style={[styles.image2358Wrapper, styles.frameWrapperFlexBox1]}
              >
                <Image
                  style={styles.image2358Icon}
                  contentFit="cover"
                  source={require("../assets/image-23583.png")}
                />
              </View>
              <View
                style={[
                  styles.dummyProvider1Wrapper,
                  styles.frameWrapperFlexBox1,
                ]}
              >
                <Text style={[styles.dummyProvider, styles.eReceipt1Typo]}>
                  {bookingProviderName}
                </Text>
              </View>
              <View style={[styles.lineWrapper, styles.lineWrapperFlexBox]}>
                <Image
                  style={[styles.lineIcon, styles.lineIconLayout]}
                  contentFit="cover"
                  source={require("../assets/line.png")}
                />
              </View>
            </View>
            <View style={[styles.frameWrapper, styles.frameWrapperFlexBox]}>
              <View style={styles.totalAssetSpaceBlock}>
                <View
                  style={[
                    styles.frameServicesParent,
                    styles.frameWrapperFlexBox1,
                  ]}
                >
                  <View style={styles.frameServices}>
                    <Text style={[styles.service, styles.serviceFlexBox]}>
                      Service
                    </Text>
                  </View>
                  <View
                    style={[styles.frameServices1, styles.copyButtonFlexBox]}
                  >
                    <Text style={styles.plumbing}>{bookingTitle}</Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.dummyProvider1Wrapper,
                    styles.frameWrapperFlexBox1,
                  ]}
                >
                  <View style={styles.frameServices}>
                    <Text
                      style={[styles.service, styles.serviceFlexBox]}
                    >{`Date & Time`}</Text>
                  </View>
                  <View
                    style={[styles.frameServices1, styles.copyButtonFlexBox]}
                  >
                    <Text style={styles.plumbing}>
                      {bookingDate} | {bookingTime}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.dummyProvider1Wrapper,
                    styles.frameWrapperFlexBox1,
                  ]}
                >
                  <View style={styles.frameServices}>
                    <Text style={[styles.service, styles.serviceFlexBox]}>
                      Address
                    </Text>
                  </View>
                  <View
                    style={[styles.frameServices1, styles.copyButtonFlexBox]}
                  >
                    <Text style={styles.plumbing}>{bookingAddress}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.firstQuestion, styles.frameWrapperFlexBox]}>
              <View style={[styles.totalAsset, styles.totalAssetSpaceBlock]}>
                <TouchableOpacity
                  onPress={() => toggleListItem()}
                  style={[
                    styles.frameServicesParent,
                    styles.frameWrapperFlexBox1,
                  ]}
                >
                  <View style={styles.titleLabelWrapper}>
                    <Text style={styles.titleLabel}>Service Details</Text>
                  </View>
                  <Animated.Image
                    style={[
                      styles.polygonUpIcon,
                      { transform: [{ rotate: arrowTransform }] },
                    ]}
                    contentFit="cover"
                    source={require("../assets/polygon-up2.png")}
                  />
                </TouchableOpacity>
                {showContent && (
                  <View
                    style={[styles.answerFrame, styles.frameWrapperFlexBox1]}
                  >
                    <View style={styles.lineContainerFlexBox}>
                      <Image
                        style={[styles.frameChild, styles.lineIconLayout]}
                        contentFit="cover"
                        source={require("../assets/line-132.png")}
                      />
                    </View>
                    <View
                      style={[
                        styles.dateAndTimeFrame,
                        styles.frameWrapperFlexBox,
                      ]}
                    >
                      <View
                        style={[
                          styles.frameContainer,
                          styles.frameWrapperFlexBox1,
                        ]}
                      >
                        <View
                          style={[
                            styles.frameServicesParent,
                            styles.frameWrapperFlexBox1,
                          ]}
                        >
                          <View
                            style={[
                              styles.plumbingInstallationWrapper,
                              styles.frameWrapperFlexBox1,
                            ]}
                          >
                            <Text style={styles.plumbingInstallation}>
                              {bookingTitle} {bookingCategory}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={styles.frameWrapperFlexBox}>
                      {bookingServices.map((item, index) => (
                        <View style={styles.lineWrapperFlexBox}>
                          <View
                            style={[
                              styles.dateAndTimeFrameInner,
                              styles.frameWrapperFlexBox1,
                            ]}
                          >
                            <View
                              style={[
                                styles.frameContainer,
                                styles.frameWrapperFlexBox1,
                              ]}
                            >
                              <Text style={[styles.x, styles.xTypo]}>
                                {item.value}x
                              </Text>
                            </View>
                          </View>
                          <View
                            style={[styles.frameFrame, styles.frameSpaceBlock]}
                          >
                            <View style={styles.frame1}>
                              <Text style={[styles.toiletSystem, styles.xTypo]}>
                                {item.name}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={[styles.frameView, styles.frameSpaceBlock]}
                          >
                            <View style={styles.frame1}>
                              <Text style={[styles.text, styles.textTypo]}>
                                ₱{item.totalPrice}.00
                              </Text>
                            </View>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            </View>
            <View style={[styles.frameWrapper5, styles.frameWrapperFlexBox]}>
              <View style={styles.totalAssetSpaceBlock}>
                <View
                  style={[
                    styles.frameServicesParent,
                    styles.frameWrapperFlexBox1,
                  ]}
                >
                  <View style={styles.frameServices}>
                    <Text style={[styles.service, styles.serviceFlexBox]}>
                      Subtotal
                    </Text>
                  </View>
                  <View
                    style={[styles.frameServices1, styles.copyButtonFlexBox]}
                  >
                    <Text style={[styles.text, styles.textTypo]}>
                      ₱{bookingSubtotal}.00
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.frameServicesParent,
                    styles.frameWrapperFlexBox1,
                  ]}
                >
                  <View style={styles.frameServices}>
                    <Text style={[styles.service, styles.serviceFlexBox]}>
                      Material Fee
                    </Text>
                  </View>
                  <View
                    style={[styles.frameServices1, styles.copyButtonFlexBox]}
                  >
                    <Text style={[styles.text, styles.textTypo]}>
                      ₱{materialFee}.00
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.dummyProvider1Wrapper,
                    styles.frameWrapperFlexBox1,
                  ]}
                >
                  <View style={styles.frameServices}>
                    <Text style={[styles.service, styles.serviceFlexBox]}>
                      Distance Fee
                    </Text>
                  </View>
                  <View
                    style={[styles.frameServices1, styles.copyButtonFlexBox]}
                  >
                    <Text style={[styles.text, styles.textTypo]}>
                      ₱{bookingDistanceFee}.00
                    </Text>
                  </View>
                </View>
                <View
                  style={[styles.lineContainer, styles.lineContainerFlexBox]}
                >
                  <Image
                    style={[styles.frameChild, styles.lineIconLayout]}
                    contentFit="cover"
                    source={require("../assets/line-133.png")}
                  />
                </View>
                <View
                  style={[
                    styles.dummyProvider1Wrapper,
                    styles.frameWrapperFlexBox1,
                  ]}
                >
                  <View style={styles.frameServices}>
                    <Text style={[styles.totalPrice, styles.xTypo]}>
                      Total Price
                    </Text>
                  </View>
                  <View
                    style={[styles.frameServices1, styles.copyButtonFlexBox]}
                  >
                    <Text style={[styles.text5, styles.textTypo]}>
                      ₱{bookingTotalPrice}.00
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.frameWrapper6, styles.frameWrapperFlexBox]}>
              <View style={styles.totalAssetSpaceBlock}>
                <View
                  style={[
                    styles.frameServicesParent,
                    styles.frameWrapperFlexBox1,
                  ]}
                >
                  <View style={styles.frameServices12}>
                    <Text style={[styles.service, styles.serviceFlexBox]}>
                      Payment Method
                    </Text>
                  </View>
                  <View
                    style={[styles.frameServices1, styles.copyButtonFlexBox]}
                  >
                    <Text style={styles.plumbing}>{bookingPaymentMethod}</Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.dummyProvider1Wrapper,
                    styles.frameWrapperFlexBox1,
                  ]}
                >
                  <View style={styles.frameServices12}>
                    <Text style={[styles.service, styles.serviceFlexBox]}>
                      Booking ID
                    </Text>
                  </View>
                  <View
                    style={[styles.frameServices1, styles.copyButtonFlexBox]}
                  >
                    <Text style={styles.plumbing}>{bookingID}</Text>
                  </View>
                  <Pressable
                    style={[styles.copyButton, styles.copyButtonFlexBox]}
                    onPress={copyToClipboard}
                  >
                    <Image
                      style={styles.vectorIcon}
                      contentFit="cover"
                      source={require("../assets/vector8.png")}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        )}
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
    paddingTop: 20,
    paddingBottom: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  frameWrapperFlexBox1: {
    justifyContent: "center",
    alignItems: "center",
  },
  eReceipt1Typo: {
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    textAlign: "center",
  },
  lineWrapperFlexBox: {
    paddingVertical: Padding.p_8xs,
    paddingHorizontal: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  lineIconLayout: {
    maxWidth: "100%",
    overflow: "hidden",
    flex: 1,
  },
  frameWrapperFlexBox: {
    marginTop: 10,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  serviceFlexBox: {
    textAlign: "left",
    flex: 1,
  },
  copyButtonFlexBox: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  totalAssetSpaceBlock: {
    paddingVertical: Padding.p_mini,
    paddingHorizontal: Padding.p_3xs,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  xTypo: {
    fontFamily: FontFamily.level2Medium12,
    fontWeight: "500",
  },
  frameSpaceBlock: {
    marginLeft: 7,
    justifyContent: "center",
  },
  textTypo: {
    lineHeight: 16,
    fontSize: FontSize.m3LabelLarge_size,
    textAlign: "right",
    color: Color.neutral07,
    flex: 1,
  },
  lineContainerFlexBox: {
    height: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  image2358Icon: {
    height: 132,
    width: 129,
  },
  image2358Wrapper: {
    flexDirection: "row",
  },
  dummyProvider: {
    fontSize: FontSize.size_5xl,
    lineHeight: 41,
    color: Color.colorDarkslategray_800,
    textTransform: "capitalize",
    textAlign: "center",
    flex: 1,
  },
  dummyProvider1Wrapper: {
    marginTop: 5,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  lineIcon: {
    height: 2,
  },
  lineWrapper: {
    marginTop: 5,
  },
  providerDetails: {
    alignSelf: "stretch",
  },
  service: {
    color: Color.neutral07,
    letterSpacing: -0.3,
    fontSize: FontSize.body1Semibold_size,
    textAlign: "left",
    fontFamily: FontFamily.title4Regular18,
  },
  frameServices: {
    width: 94,
    alignItems: "center",
    flexDirection: "row",
  },
  plumbing: {
    textAlign: "right",
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
    color: Color.neutral07,
    letterSpacing: -0.3,
    fontSize: FontSize.body1Semibold_size,
    flex: 1,
  },
  frameServices1: {
    marginLeft: 5,
    flex: 1,
  },
  frameServicesParent: {
    flexDirection: "row",
    alignSelf: "stretch",
  },
  frameWrapper: {
    borderWidth: 1,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: Border.br_5xs,
    backgroundColor: Color.white,
  },
  titleLabel: {
    lineHeight: 24,
    color: Color.colorGray_1000,
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
    textAlign: "left",
    fontSize: FontSize.body1Semibold_size,
  },
  titleLabelWrapper: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  polygonDownIcon: {
    width: 12,
    height: 10,
    borderRadius: Border.br_12xs,
  },
  polygonUpIcon: {
    width: 12,
    height: 10,
    borderRadius: Border.br_12xs,
  },
  polygonDownParent: {
    marginLeft: 10,
    flexDirection: "row",
  },
  frameChild: {
    maxHeight: "100%",
    opacity: 0.3,
    alignSelf: "stretch",
    width: "100%",
  },
  plumbingInstallation: {
    fontSize: FontSize.title4Regular18_size,
    fontFamily: FontFamily.workSansMedium,
    color: Color.colorBlack,
    fontWeight: "500",
    textAlign: "center",
    flex: 1,
  },
  plumbingInstallationWrapper: {
    flexDirection: "row",
    flex: 1,
  },
  frameContainer: {
    flex: 1,
  },
  dateAndTimeFrame: {
    paddingTop: Padding.p_3xs,
    paddingBottom: Padding.p_8xs,
    alignItems: "center",
    flexDirection: "row",
  },
  x: {
    fontSize: FontSize.m3LabelLarge_size,
    fontFamily: FontFamily.level2Medium12,
    color: Color.colorBlack,
    textAlign: "center",
    alignSelf: "stretch",
  },
  dateAndTimeFrameInner: {
    width: 30,
    flexDirection: "row",
  },
  toiletSystem: {
    fontSize: FontSize.m3LabelLarge_size,
    fontFamily: FontFamily.level2Medium12,
    color: Color.colorBlack,
    textAlign: "left",
    flex: 1,
    textTransform: "capitalize",
  },
  frame1: {
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  frameFrame: {
    flex: 1,
  },
  text: {
    fontFamily: FontFamily.title4Regular18,
  },
  frameView: {
    width: 68,
    alignItems: "flex-end",
  },
  answerFrame: {
    paddingTop: Padding.p_8xs,
    alignSelf: "stretch",
  },
  totalAsset: {
    borderWidth: 1,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: Border.br_5xs,
    backgroundColor: Color.white,
    alignItems: "center",
  },
  firstQuestion: {
    alignItems: "center",
  },
  lineContainer: {
    marginTop: 5,
  },
  totalPrice: {
    textAlign: "left",
    flex: 1,
    color: Color.neutral07,
    letterSpacing: -0.3,
    fontSize: FontSize.body1Semibold_size,
  },
  text5: {
    fontFamily: FontFamily.level2Medium12,
    fontWeight: "500",
  },
  frameWrapper5: {
    borderWidth: 1,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: Border.br_5xs,
    backgroundColor: Color.white,
  },
  frameServices12: {
    width: 129,
    alignItems: "center",
    flexDirection: "row",
  },
  vectorIcon: {
    width: 14,
    height: 16,
  },
  copyButton: {
    marginLeft: 10,
  },
  frameWrapper6: {
    borderWidth: 1,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: Border.br_5xs,
    backgroundColor: Color.white,
  },
  providerDetailsParent: {
    paddingVertical: 0,
    paddingHorizontal: Padding.p_3xs,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  body: {
    alignSelf: "stretch",
    flex: 1,
  },
  eReceipt: {
    backgroundColor: Color.colorWhitesmoke_200,
    height: 812,
    width: "100%",
    flex: 1,
  },
});

export default EReceipt;
