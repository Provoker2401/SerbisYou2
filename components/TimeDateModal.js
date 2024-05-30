// import DateTimePicker from "@react-native-community/datetimepicker";
// import { useNavigation } from "@react-navigation/native";
// import { Image } from "expo-image";
// import React, { useState, useContext } from "react";
// import {
//   Modal,
//   Platform,
//   Pressable,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import { getAuth } from "firebase/auth";
// import {
//   getFirestore,
//   collection,
//   getDoc,
//   doc,
//   updateDoc,
//   onSnapshot,
//   setDoc,
//   query,
//   getDocs,
// } from "firebase/firestore";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import Toast from "react-native-toast-message";
// import { useDateTimeContext } from "../DateTimeContext";
// import { Border, Color, FontFamily, FontSize, Padding } from "../GlobalStyles";
// import { MarkerContext } from "../MarkerContext";

// const TimeDateModal = ({ visible, onClose, content, bookDirect }) => {
//   const { selectedDateContext, setSelectedDateContext, selectedTimeContext, setSelectedTimeContext } = useDateTimeContext();
//   const navigation = useNavigation();
//   const [dateVisible, setDateVisible] = useState(false);
//   const [timeVisible, setTimeVisible] = useState(false);
//   const [date, setDate] = useState(new Date());
//   const [mode, setMode] = useState("date");
//   const [show, setShow] = useState(false);

//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const [selectedDate, setSelectedDate] = useState("Select your Date");
//   const [selectedTime, setSelectedTime] = useState("Select your Time");
//   const [pastTimeHandler, setPastTimeHandler] = useState(false);

//   const { markerUid } = useContext(MarkerContext);

//   const showMode = (currentMode) => {
//     if (currentMode === "time") {
//       const now = new Date();
//       if (date.toDateString() === now.toDateString()) {
//         const roundedDate = roundToNextInterval(now, 15);
//         setDate(roundedDate);
//       } else if (date > now) {
//         const futureDate = new Date(date);
//         futureDate.setHours(8, 0, 0, 0); // Set time to 8:00 AM
//         setDate(futureDate);
//       }
//     }
//     setShow(true);
//     setMode(currentMode);
//   };

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleDateConfirm = (date) => {
//     const dt = new Date(date);
//     const formattedDate = `${dt.toLocaleString("en-US", {
//       month: "long",
//     })} ${dt.getDate()}, ${dt.getFullYear()}`;
//     setSelectedDate(formattedDate);
//     setDate(dt);
//     setDateVisible(true);
//     setTimeVisible(false);
//     setSelectedTime("Select your Time"); // Reset selected time when date is changed
//     hideDatePicker();
//   };

//   const roundToNextInterval = (date, interval) => {
//     const ms = 1000 * 60 * interval;
//     return new Date(Math.ceil(date.getTime() / ms) * ms);
//   };

//   // Function to check if a provider is available at the selected date and time
//   const checkProviderTimeAvailability = async (providerId, selectedDateContext, selectedTimeContext) => {
//     const db = getFirestore();
//     const providerDocRef = doc(db, "providerProfiles", providerId);
//     const activeBookingsCollectionRef = collection(providerDocRef, "activeBookings");

//     const q = query(activeBookingsCollectionRef);
//     const querySnapshot = await getDocs(q);

//     for (const doc of querySnapshot.docs) {
//       const bookingData = doc.data();
//       if (bookingData.date === selectedDateContext && bookingData.time === selectedTimeContext) {
//         console.log(`Provider ${providerId} is not available on the selected date and time.`);

//         return false; // Provider is not available
//       }
//     }
//     return true; // Provider is available
//   };

//   const onChange = async (event, selectedDate) => {
//     if (event.type !== "set") {
//       setShow(false);
//       return;
//     }

//     const currentDate = selectedDate || date;
//     const now = new Date();

//     if ((currentDate.toDateString() === now.toDateString() && currentDate < now) || currentDate < now) {
//       Toast.show({
//         type: "error",
//         text1: "Invalid Time",
//         text2: "Please select a future time.",
//       });
//       setShow(false); // Hide the time picker
//       setDate(currentDate);
//       const dt = new Date(currentDate);
//       const origTime = dt.toLocaleString("en-US");
//       const splitTime = dt.toLocaleString("en-US").split(",");
//       const timeParts = splitTime[1].trim().split(":");
//       const AM_PM = origTime.match(/\b(?:AM|PM)\b/)[0];
//       setSelectedTime(`${timeParts[0]}:${timeParts[1]} ${AM_PM}`);
//       setShow(Platform.OS === "ios");
//       setTimeVisible(true);
//       setPastTimeHandler(true); // Set pastTimeHandler to true when an invalid time is selected
//       return;
//     }

//     setDate(currentDate);
//     const dt = new Date(currentDate);
//     const origTime = dt.toLocaleString("en-US");
//     const splitTime = dt.toLocaleString("en-US").split(",");
//     const timeParts = splitTime[1].trim().split(":");
//     const AM_PM = origTime.match(/\b(?:AM|PM)\b/)[0];
//     const selectedTimeString = `${timeParts[0]}:${timeParts[1]} ${AM_PM}`;

//     const isAvailable = await checkProviderTimeAvailability(markerUid, currentDate.toDateString(), selectedTimeString);
//     if (!isAvailable) {
//       Toast.show({
//         type: "error",
//         text1: "Time Unavailable",
//         text2: "Please select another time since Provider has a booking appointment at this time.",
//       });
//       setShow(false);
//       return;
//     }

//     setShow(false); // Hide the time picker
//     setSelectedTime(selectedTimeString);
//     setTimeVisible(true);
//     setPastTimeHandler(false); // Reset pastTimeHandler when a valid time is selected
//   };

//   const confirmClicked = () => {
//     if (bookDirect) {
//       setSelectedDateContext(selectedDate);
//       setSelectedTimeContext(selectedTime);
//       navigation.navigate("ReviewSummary2");
//       console.log("Going to Review Summary 2")
//       onClose();
//     } else {
//       setSelectedDateContext(selectedDate);
//       setSelectedTimeContext(selectedTime);
//       navigation.navigate("MapsConfirmLocation");
//       console.log("Maps Confirm Location")

//       onClose();
//     }
//   };

//   const isConfirmDisabled = selectedDate === "Select your Date" || selectedTime === "Select your Time" || pastTimeHandler;

//   return (
//     <Modal
//       animationType="fade"
//       transparent={true}
//       visible={visible}
//       onRequestClose={onClose}
//     >
//       <View style={styles.modalContainer}>
//         <Pressable style={styles.dateBg} onPress={onClose} />
//         <View style={styles.timeDateModal}>
//           <View style={styles.titleParent}>
//             <View style={[styles.title, styles.buttonFlexBox1]}>
//               <View style={[styles.title1, styles.title1Position]}>
//                 <View style={styles.tag} />
//                 <Text style={[styles.selectYourDate, styles.selectTypo]}>
//                   Select your Date & Time
//                 </Text>
//               </View>
//               <Pressable
//                 onRequestClose={onClose}
//                 style={[styles.comment, styles.commentFlexBox]}
//                 onPress={onClose}
//               >
//                 <Image
//                   style={[styles.uiIconcloselight, styles.cheveronIconLayout]}
//                   contentFit="cover"
//                   source={require("../assets/ui-iconcloselight.png")}
//                 />
//               </Pressable>
//             </View>
//             <View style={[styles.timeDate, styles.buttonFlexBox1]}>
//               <Pressable onPress={showDatePicker}>
//                 <View style={[styles.date1, styles.date1Layout]}>
//                   <Image
//                     style={styles.iconOutline}
//                     contentFit="cover"
//                     source={require("../assets/icon-outline2.png")}
//                   />
//                   <View style={styles.dateParent}>
//                     <Text style={[styles.date2, styles.date2Typo]}>Date</Text>
//                     <Text style={[styles.selectYourDate1, styles.textTypo2]}>
//                       {selectedDate}
//                     </Text>
//                   </View>
//                   <DateTimePickerModal
//                     isVisible={isDatePickerVisible}
//                     mode="date"
//                     minimumDate={new Date()}
//                     onConfirm={handleDateConfirm}
//                     onCancel={hideDatePicker}
//                   />
//                 </View>
//               </Pressable>
//               <Pressable
//                 style={styles.dateAndWeekendBar}
//                 onPress={() => showMode("time")}
//               >
//                 <View style={[styles.time1, styles.date1Layout]}>
//                   <Image
//                     style={styles.iconOutline}
//                     contentFit="cover"
//                     source={require("../assets/icon-outline3.png")}
//                   />
//                   <View style={styles.dateParent}>
//                     <Text style={[styles.date2, styles.date2Typo]}>Time</Text>
//                     <Text style={[styles.selectYourDate1, styles.textTypo2]}>
//                       {selectedTime}
//                     </Text>
//                   </View>
//                   {show && (
//                     <DateTimePicker
//                       testID="dateTimePicker"
//                       value={date}
//                       mode={mode}
//                       display="spinner"
//                       onChange={onChange}
//                       minimumDate={
//                         date.toDateString() === new Date().toDateString()
//                           ? new Date()
//                           : undefined
//                       }
//                       minuteInterval={15}
//                       is24Hour={false}
//                     />
//                   )}
//                 </View>
//               </Pressable>
//             </View>
//             <View style={[styles.timeDateModal2, styles.buttonFlexBox]}>
//               <View style={styles.frameParent10}>
//                 <View style={styles.frameParent11}>
//                   <View style={styles.selfProvidedMaterialsWrapper}>
//                     <Text style={styles.text21Typo}>
//                       <Text style={styles.totalCost1}>Total Cost</Text>
//                       <Text style={styles.text20}>{` `}</Text>
//                     </Text>
//                   </View>
//                   <View style={styles.wrapper}>
//                     <Text style={styles.text21Typo}>
//                       <Text style={styles.totalCost1}>{content}</Text>
//                       <Text style={styles.text20}>{` `}</Text>
//                     </Text>
//                   </View>
//                 </View>
//                 <View style={styles.priceButton1}>
//                   <View style={styles.frameParent11}>
//                     {/* {dateVisible && timeVisible ? (
//                       <Pressable
//                         style={[styles.activeButton]}
//                         onPress={confirmClicked}
//                       >
//                         <Text style={styles.activeConfirm}>Confirm</Text>
//                       </Pressable>
//                     ) : (
//                       <View style={[styles.button2, styles.buttonFlexBox]}>
//                         <Text style={styles.confirm2}>Confirm</Text>
//                       </View>
//                     )} */}
//                     <Pressable
//                       style={[isConfirmDisabled ? styles.button2 : styles.activeButton, styles.buttonFlexBox]}
//                       onPress={confirmClicked}
//                       disabled={isConfirmDisabled}
//                     >
//                       <Text style={isConfirmDisabled ? styles.confirm2 : styles.activeConfirm}>Confirm</Text>
//                     </Pressable>

//                   </View>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>
//         <Toast config={{ zIndex: 1000 }} ref={(ref) => Toast.setRef(ref)} />
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   timeDateModalFlexBox: {
//     paddingHorizontal: Padding.p_smi,
//     alignItems: "center",
//     alignSelf: "stretch",
//   },
//   modalContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-end",
//     backgroundColor: "rgba(113, 113, 113, 0.3)",
//   },
//   timeDateModal: {
//     paddingVertical: 12,
//     justifyContent: "center",
//     backgroundColor: Color.white,
//   },
//   timeDateModal2: {
//     paddingHorizontal: 16,
//     alignSelf: "stretch",
//     backgroundColor: Color.white,
//     marginTop: 5,
//   },
//   priceButtonWrapper: {
//     height: 48,
//     justifyContent: "center",
//     alignItems: "center",
//     alignSelf: "stretch",
//   },
//   priceButton: {
//     justifyContent: "center",
//     alignItems: "center",
//     alignSelf: "stretch",
//   },
//   priceButton1: {
//     marginTop: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     alignSelf: "stretch",
//   },
//   button: {
//     backgroundColor: Color.neutral03,
//     paddingHorizontal: Padding.p_xl,
//     paddingVertical: Padding.p_xs,
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//     flex: 1,
//   },
//   button2: {
//     // backgroundColor: Color.colorDarkslategray_900,
//     paddingHorizontal: Padding.p_xl,
//     flexDirection: "row",
//     flex: 1,
//     backgroundColor: Color.neutral03,
//     borderRadius: Border.br_xs,
//   },
//   activeButton: {
//     backgroundColor: Color.colorDarkslategray_900,
//     paddingHorizontal: Padding.p_xl,
//     paddingVertical: Padding.p_xs,
//     borderRadius: Border.br_xs,
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//     flex: 1,
//   },
//   buttonFlexBox: {
//     paddingVertical: Padding.p_xs,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonFlexBox1: {
//     paddingHorizontal: 16,
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   buttons: {
//     flexDirection: "row",
//     alignSelf: "stretch",
//   },
//   confirm: {
//     fontSize: FontSize.body1Semibold_size,
//     lineHeight: 24,
//     letterSpacing: -0.1,
//     color: Color.neutral07,
//     textAlign: "center",
//     fontFamily: FontFamily.title2Bold32,
//     fontWeight: "700",
//     flex: 1,
//   },
//   confirm2: {
//     fontSize: FontSize.body1Semibold_size,
//     lineHeight: 24,
//     letterSpacing: -0.1,
//     textAlign: "center",
//     color: Color.neutral07,
//     fontFamily: FontFamily.title2Bold32,
//     fontWeight: "700",
//     flex: 1,
//   },
//   activeConfirm: {
//     lineHeight: 24,
//     letterSpacing: -0.1,
//     textAlign: "center",
//     color: Color.white,
//     fontFamily: FontFamily.title2Bold32,
//     fontSize: FontSize.body1Semibold_size,
//     fontWeight: "700",
//     flex: 1,
//   },
//   frameParent10: {
//     justifyContent: "center",
//     alignItems: "center",
//     alignSelf: "stretch",
//   },
//   frameParent11: {
//     flexDirection: "row",
//     alignSelf: "stretch",
//   },
//   selfProvidedMaterialsWrapper: {
//     alignItems: "center",
//     flexDirection: "row",
//     flex: 1,
//   },
//   text21Typo: {
//     letterSpacing: -0.2,
//     textAlign: "left",
//     color: Color.neutral07,
//     fontFamily: FontFamily.buttonBold15,
//     fontWeight: "700",
//     fontSize: FontSize.title3Bold20_size,
//   },
//   totalCost1: {
//     lineHeight: 24,
//   },
//   text20: {
//     lineHeight: 16,
//   },
//   wrapper: {
//     justifyContent: "flex-end",
//     marginLeft: 125,
//     alignItems: "center",
//     flexDirection: "row",
//     flex: 1,
//   },
//   title1Position: {
//     // left: 0,
//     flexDirection: "row",
//   },
//   selectTypo: {
//     fontFamily: FontFamily.level2Semibold12,
//     fontWeight: "600",
//   },
//   commentFlexBox: {
//     padding: Padding.p_5xs,
//     borderRadius: Border.br_17xl,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   cheveronIconLayout: {
//     width: 20,
//     height: 20,
//   },
//   date1Layout: {
//     borderRadius: Border.br_xs,
//     flexDirection: "row",
//   },
//   date2Typo: {
//     fontFamily: FontFamily.level2Medium12,
//     fontWeight: "500",
//   },
//   textTypo2: {
//     fontSize: FontSize.body1Semibold_size,
//     lineHeight: 24,
//     letterSpacing: -0.1,
//   },
//   textTypo1: {
//     textAlign: "center",
//     fontFamily: FontFamily.level2Semibold12,
//     fontWeight: "600",
//   },
//   calendarSpaceBlock: {
//     paddingVertical: Padding.p_5xs,
//     paddingHorizontal: Padding.p_9xs,
//     borderRadius: Border.br_13xl,
//     backgroundColor: Color.neutral01,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   calendarFlexBox1: {
//     padding: Padding.p_9xs,
//     borderRadius: Border.br_13xl,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   calendarFlexBox: {
//     opacity: 0,
//     padding: Padding.p_9xs,
//     borderRadius: Border.br_13xl,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   calenderSpaceBlock: {
//     display: "none",
//     marginTop: 20,
//   },
//   timeLiPosition: {
//     top: 0,
//     position: "absolute",
//   },
//   timeFlexBox: {
//     paddingHorizontal: Padding.p_xs,
//     paddingVertical: Padding.p_5xs,
//     alignSelf: "stretch",
//     borderRadius: Border.br_9xs,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   textTypo: {
//     width: 44,
//     lineHeight: 24,
//     letterSpacing: -0.1,
//     fontSize: FontSize.body1Semibold_size,
//     textAlign: "left",
//     fontFamily: FontFamily.level2Semibold12,
//     fontWeight: "600",
//   },
//   php8001Typo: {
//     fontFamily: FontFamily.title2Bold32,
//     fontWeight: "700",
//   },
//   tag: {
//     backgroundColor: Color.colorSteelblue_100,
//     width: 4,
//     overflow: "hidden",
//     height: 20,
//     borderRadius: Border.br_9xs,
//   },
//   selectYourDate: {
//     // width: 279,
//     marginLeft: 10,
//     textAlign: "left",
//     color: Color.neutral07,
//     letterSpacing: -0.4,
//     fontSize: FontSize.title4Regular18_size,
//     fontWeight: "600",
//   },
//   title1: {
//     // top: 2,
//     // width: 282,
//     flexDirection: "row",
//     // position: "absolute",
//     alignItems: "center",
//   },
//   uiIconcloselight: {
//     overflow: "hidden",
//   },
//   comment: {
//     right: 0,
//     width: 35,
//     backgroundColor: Color.neutral03,
//     top: 0,
//     // position: "absolute",
//   },
//   title: {
//     // width: 326,
//     // height: 36,
//     alignSelf: "stretch",
//     flexDirection: "row",
//   },
//   dateOverlay: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "rgba(113, 113, 113, 0.3)",
//   },
//   dateBg: {
//     position: "absolute",
//     width: "100%",
//     height: "100%",
//     left: 0,
//     top: 0,
//   },
//   iconOutline: {
//     height: 24,
//     width: 24,
//     overflow: "hidden",
//     marginBottom: 5,
//   },
//   date2: {
//     fontSize: FontSize.level2Medium12_size,
//     letterSpacing: 0.2,
//     lineHeight: 12,
//     textTransform: "uppercase",
//     color: Color.neutral04,
//     alignSelf: "stretch",
//     textAlign: "left",
//   },
//   selectYourDate1: {
//     marginTop: 4,
//     lineHeight: 24,
//     letterSpacing: -0.1,
//     alignSelf: "stretch",
//     textAlign: "left",
//     color: Color.neutral07,
//     fontFamily: FontFamily.level2Semibold12,
//     fontWeight: "600",
//   },
//   dateParent: {
//     marginLeft: 12,
//     flex: 1,
//     justifyContent: "center",
//   },
//   date1: {
//     backgroundColor: "#fbbc05",
//     alignItems: "center",
//     alignSelf: "center",
//     justifyContent: "center",
//     padding: Padding.p_base,
//   },
//   comment1: {
//     backgroundColor: Color.neutral01,
//   },
//   november2021: {
//     textAlign: "left",
//     color: Color.neutral07,
//     letterSpacing: -0.4,
//     fontSize: FontSize.title4Regular18_size,
//     fontWeight: "600",
//   },
//   comment2: {
//     backgroundColor: Color.neutral03,
//   },
//   month: {
//     paddingHorizontal: Padding.p_5xs,
//     paddingVertical: 0,
//     justifyContent: "space-between",
//     width: 327,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   su: {
//     color: Color.colorSlategray_100,
//     lineHeight: 16,
//     fontSize: FontSize.m3LabelLarge_size,
//     width: 24,
//   },
//   calendar1: {
//     marginLeft: 16,
//   },
//   weekend: {
//     width: 327,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   text: {
//     lineHeight: 24,
//     letterSpacing: -0.1,
//     fontSize: FontSize.body1Semibold_size,
//     width: 24,
//     color: Color.neutral07,
//   },
//   calendar8: {
//     marginLeft: 16,
//   },
//   calendarParent: {
//     width: 327,
//     flexDirection: "row",
//   },
//   text7: {
//     color: Color.neutral01,
//     lineHeight: 24,
//     letterSpacing: -0.1,
//     fontSize: FontSize.body1Semibold_size,
//     width: 24,
//   },
//   calendar14: {
//     backgroundColor: "#3b71fe",
//   },
//   calendarGroup: {
//     marginTop: 16,
//     width: 327,
//     flexDirection: "row",
//   },
//   calendar38: {
//     marginLeft: 16,
//   },
//   timeDate: {
//     marginTop: 20,
//   },
//   timeDate1: {
//     marginTop: 5,
//     justifyContent: "center",
//     alignItems: "center",
//     alignSelf: "stretch",
//   },
//   dateAndWeekendBar: {
//     marginTop: 16,
//   },
//   timeOverlay: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "rgba(113, 113, 113, 0.3)",
//   },
//   timeBg: {
//     position: "absolute",
//     width: "100%",
//     height: "100%",
//     left: 0,
//     top: 0,
//   },
//   time1: {
//     backgroundColor: "#b5e4ca",
//     padding: Padding.p_base,
//     alignItems: "center",
//     alignSelf: "center",
//     justifyContent: "center",
//   },
//   text35: {
//     color: Color.neutral04,
//   },
//   pm: {
//     lineHeight: 24,
//     letterSpacing: -0.1,
//     fontSize: FontSize.body1Semibold_size,
//     color: Color.neutral04,
//     marginLeft: 10,
//   },
//   parent: {
//     flexDirection: "row",
//   },
//   time3: {
//     backgroundColor: Color.neutral01,
//   },
//   text36: {
//     color: Color.neutral07,
//   },
//   pm1: {
//     lineHeight: 24,
//     letterSpacing: -0.1,
//     fontSize: FontSize.body1Semibold_size,
//     marginLeft: 10,
//     color: Color.neutral07,
//   },
//   time4: {
//     backgroundColor: Color.neutral03,
//   },
//   timeGroup: {
//     flex: 1,
//   },
//   timeLiChild: {
//     borderRadius: 40,
//     backgroundColor: Color.neutralShadeDark0440,
//     width: 6,
//     height: 40,
//     marginLeft: 14,
//   },
//   timeLi: {
//     width: 327,
//     flexDirection: "row",
//     left: 0,
//   },
//   timeOpenCard: {
//     height: 360,
//     width: 327,
//   },
//   total: {
//     lineHeight: 24,
//   },
//   php800: {
//     lineHeight: 16,
//   },
//   totalPhp800Container: {
//     fontSize: FontSize.m3LabelLarge_size,
//     letterSpacing: -0.1,
//     color: Color.neutral04,
//     textAlign: "left",
//   },
//   viewDetails: {
//     right: 16,
//     color: Color.colorBrandSecondaryOrange,
//     textAlign: "right",
//     width: 104,
//     fontSize: FontSize.m3LabelLarge_size,
//     lineHeight: 24,
//     letterSpacing: -0.1,
//     top: 0,
//     position: "absolute",
//   },
//   viewDetailsBtnChild: {
//     top: 7,
//     right: -1,
//     width: 9,
//     height: 5,
//     position: "absolute",
//   },
//   viewDetailsBtn: {
//     marginLeft: 125,
//     flex: 1,
//     height: 24,
//   },
//   totalPhp800Parent: {
//     alignSelf: "stretch",
//     flexDirection: "row",
//   },
//   confirm: {
//     lineHeight: 24,
//     letterSpacing: -0.1,
//     fontSize: FontSize.body1Semibold_size,
//     textAlign: "left",
//     color: Color.neutral07,
//   },
//   button: {
//     paddingHorizontal: Padding.p_xl,
//     paddingVertical: Padding.p_xs,
//     flex: 1,
//     backgroundColor: Color.neutral03,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttons: {
//     width: 343,
//     marginTop: 16,
//     flexDirection: "row",
//   },
//   titleParent: {
//     justifyContent: "center",
//     alignItems: "center",
//     alignSelf: "stretch",
//   },
//   timeDateModal: {
//     borderTopLeftRadius: Border.br_base,
//     borderTopRightRadius: Border.br_base,
//     backgroundColor: Color.white,
//     maxWidth: "100%",
//     maxHeight: "100%",
//     paddingVertical: Padding.p_base,
//     alignItems: "center",
//     alignSelf: "stretch",
//   },
// });

// export default TimeDateModal;


import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import React, { useState, useContext} from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  updateDoc,
  onSnapshot,
  setDoc,
  query,
  getDocs,
} from "firebase/firestore";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Toast from 'react-native-toast-message';
import { useDateTimeContext } from '../DateTimeContext';
import { Border, Color, FontFamily, FontSize, Padding } from "../GlobalStyles";
import { MarkerContext } from "../MarkerContext";

const TimeDateModal = ({ visible, onClose, content, bookDirect }) => {
  const { selectedDateContext, setSelectedDateContext, selectedTimeContext, setSelectedTimeContext } = useDateTimeContext();
  const navigation = useNavigation();
  const [dateVisible, setDateVisible] = useState(false);
  const [timeVisible, setTimeVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Select your Date");
  const [selectedTime, setSelectedTime] = useState("Select your Time");
  const [pastTimeHandler, setPastTimeHandler] = useState(false);

  const { markerUid } = useContext(MarkerContext);

  const showMode = (currentMode) => {
    if (currentMode === "time") {
      const now = new Date();
      if (date.toDateString() === now.toDateString()) {
        const roundedDate = roundToNextInterval(now, 15);
        setDate(roundedDate);
      } else if (date > now) {
        const futureDate = new Date(date);
        futureDate.setHours(8, 0, 0, 0); // Set time to 8:00 AM
        setDate(futureDate);
      }
    }
    setShow(true);
    setMode(currentMode);
  };

  const roundToNextInterval = (date, interval) => {
    const ms = 1000 * 60 * interval;
    return new Date(Math.ceil(date.getTime() / ms) * ms);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    const dt = new Date(date);
    const formattedDate = `${dt.toLocaleString("en-US", { month: "long" })} ${dt.getDate()}, ${dt.getFullYear()}`;
    setSelectedDate(formattedDate);
    setDate(dt);
    setDateVisible(true);
    setSelectedTime("Select your Time"); // Reset selected time when date is changed
    hideDatePicker();
  };

  const formatDateWithoutDay = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options).replace(/^\w+, /, '');
  };

  // Function to check if a provider is available at the selected date and time
  const checkProviderTimeAvailability = async (providerId, selectedDateContext, selectedTimeContext) => {
    const db = getFirestore();
    const providerDocRef = doc(db, "providerProfiles", providerId);
    const activeBookingsCollectionRef = collection(providerDocRef, "activeBookings");

    const q = query(activeBookingsCollectionRef);
    const querySnapshot = await getDocs(q);

    for (const doc of querySnapshot.docs) {
      const bookingData = doc.data();
      console.log("Booking data Date: " + bookingData.date);
      console.log("Booking data Time: " + bookingData.time);
      console.log("Selected Date: " + selectedDateContext);
      console.log("selectedTimeContext: " + selectedTimeContext);
      if (bookingData.date == selectedDateContext && bookingData.time == selectedTimeContext) {
        console.log(`Provider ${providerId} is not available on the selected date and time.`);

        return false; // Provider is not available
      }
    }
    return true; // Provider is available
  };

  const onChange = async (event, selectedDate) => {
    if (event.type !== "set") {
      setShow(false);
      return;
    }

    const currentDate = selectedDate || date;
    const now = new Date();

    if (
      (currentDate.toDateString() === now.toDateString() && currentDate < now || currentDate < now)
    ) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Time',
        text2: 'Please select a future time.'
      });
      setShow(false); // Hide the time picker
      setPastTimeHandler(true); // Set pastTimeHandler to true when an invalid time is selected
      return;
    }
    const formattedDate = formatDateWithoutDay(currentDate);
    const dt = new Date(currentDate);
    const origTime = dt.toLocaleString("en-US");
    const splitTime = dt.toLocaleString("en-US").split(",");
    const timeParts = splitTime[1].trim().split(":");
    const AM_PM = origTime.match(/\b(?:AM|PM)\b/)[0];
    const selectedTimeString = `${timeParts[0]}:${timeParts[1]} ${AM_PM}`;

    if(bookDirect){
      const isAvailable = await checkProviderTimeAvailability(markerUid, formattedDate, selectedTimeString);
      if (!isAvailable) {
        Toast.show({
          type: "error",
          text1: "Time Unavailable",
          text2: "Service Provider has a booking appointment at this time.",
        });
        setShow(false);
        setPastTimeHandler(true); // Set pastTimeHandler to true when an invalid time is selected
        return;
      }
    }
  
    setDate(currentDate);
    setShow(false); // Hide the time picker
    setSelectedTime(selectedTimeString);
    setTimeVisible(true);
    setPastTimeHandler(false); // Reset pastTimeHandler when a valid time is selected
  };

  const confirmClicked = () => {
    if (bookDirect) {
      setSelectedDateContext(selectedDate);
      setSelectedTimeContext(selectedTime);
      navigation.navigate("ReviewSummary2");
      console.log("Going to Review Summary 2")
      onClose();
    } else {
      setSelectedDateContext(selectedDate);
      setSelectedTimeContext(selectedTime);
      navigation.navigate("MapsConfirmLocation");
      console.log("Maps Confirm Location")

      onClose();
    }
  };

  const isConfirmDisabled = selectedDate === "Select your Date" || selectedTime === "Select your Time" || pastTimeHandler;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Pressable style={styles.dateBg} onPress={onClose} />
        <View style={styles.timeDateModal}>
          <View style={styles.titleParent}>
            <View style={[styles.title, styles.buttonFlexBox1]}>
              <View style={[styles.title1, styles.title1Position]}>
                <View style={styles.tag} />
                <Text style={[styles.selectYourDate, styles.selectTypo]}>
                  Select your Date & Time
                </Text>
              </View>
              <Pressable
                onRequestClose={onClose}
                style={[styles.comment, styles.commentFlexBox]}
                onPress={onClose}
              >
                <Image
                  style={[styles.uiIconcloselight, styles.cheveronIconLayout]}
                  contentFit="cover"
                  source={require("../assets/ui-iconcloselight.png")}
                />
              </Pressable>
            </View>
            <View style={[styles.timeDate, styles.buttonFlexBox1]}>
              <Pressable onPress={showDatePicker}>
                <View style={[styles.date1, styles.date1Layout]}>
                  <Image
                    style={styles.iconOutline}
                    contentFit="cover"
                    source={require("../assets/icon-outline2.png")}
                  />
                  <View style={styles.dateParent}>
                    <Text style={[styles.date2, styles.date2Typo]}>Date</Text>
                    <Text style={[styles.selectYourDate1, styles.textTypo2]}>
                      {selectedDate}
                    </Text>
                  </View>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    minimumDate={new Date()}
                    onConfirm={handleDateConfirm}
                    onCancel={hideDatePicker}
                  />
                </View>
              </Pressable>
              <Pressable
                style={styles.dateAndWeekendBar}
                onPress={() => showMode("time")}
              >
                <View style={[styles.time1, styles.date1Layout]}>
                  <Image
                    style={styles.iconOutline}
                    contentFit="cover"
                    source={require("../assets/icon-outline3.png")}
                  />
                  <View style={styles.dateParent}>
                    <Text style={[styles.date2, styles.date2Typo]}>Time</Text>
                    <Text style={[styles.selectYourDate1, styles.textTypo2]}>
                      {selectedTime}
                    </Text>
                  </View>
                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode={mode}
                      display="spinner"
                      onChange={onChange}
                      minimumDate={date.toDateString() === new Date().toDateString() ? new Date() : undefined}
                      minuteInterval={15}
                      is24Hour={false}
                    />
                  )}
                </View>
              </Pressable>
            </View>
            <View style={[styles.timeDateModal2, styles.buttonFlexBox]}>
              <View style={styles.frameParent10}>
                <View style={styles.frameParent11}>
                  <View style={styles.selfProvidedMaterialsWrapper}>
                    <Text style={styles.text21Typo}>
                      <Text style={styles.totalCost1}>Total Cost</Text>
                      <Text style={styles.text20}>{` `}</Text>
                    </Text>
                  </View>
                  <View style={styles.wrapper}>
                    <Text style={styles.text21Typo}>
                      <Text style={styles.totalCost1}>{content}</Text>
                      <Text style={styles.text20}>{` `}</Text>
                    </Text>
                  </View>
                </View>
                <View style={styles.priceButton1}>
                  <View style={styles.frameParent11}>
                    <Pressable
                      style={[isConfirmDisabled ? styles.button2 : styles.activeButton, styles.buttonFlexBox]}
                      onPress={confirmClicked}
                      disabled={isConfirmDisabled}
                    >
                      <Text style={isConfirmDisabled ? styles.confirm2 : styles.activeConfirm}>Confirm</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <Toast config={{ zIndex: 1000 }} forwardRef={(forwardRef) => Toast.setRef(forwardRef)} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  timeDateModalFlexBox: {
    paddingHorizontal: Padding.p_smi,
    alignItems: "center",
    alignSelf: "stretch",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  timeDateModal: {
    paddingVertical: 12,
    justifyContent: "center",
    backgroundColor: Color.white,
  },
  timeDateModal2: {
    paddingHorizontal: 16,
    alignSelf: "stretch",
    backgroundColor: Color.white,
    marginTop: 5,
  },
  priceButtonWrapper: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  priceButton: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  priceButton1: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  button: {
    backgroundColor: Color.neutral03,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  button2: {
    // backgroundColor: Color.colorDarkslategray_900,
    paddingHorizontal: Padding.p_xl,
    flexDirection: "row",
    flex: 1,
    backgroundColor: Color.neutral03,
    borderRadius: Border.br_xs,
  },
  activeButton: {
    backgroundColor: Color.colorDarkslategray_900,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_xs,
    borderRadius: Border.br_xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  buttonFlexBox: {
    paddingVertical: Padding.p_xs,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonFlexBox1: {
    paddingHorizontal: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    alignSelf: "stretch",
  },
  confirm: {
    fontSize: FontSize.body1Semibold_size,
    lineHeight: 24,
    letterSpacing: -0.1,
    color: Color.neutral07,
    textAlign: "center",
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    flex: 1,
  },
  confirm2: {
    fontSize: FontSize.body1Semibold_size,
    lineHeight: 24,
    letterSpacing: -0.1,
    textAlign: "center",
    color: Color.neutral07,
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    flex: 1,
  },
  activeConfirm: {
    lineHeight: 24,
    letterSpacing: -0.1,
    textAlign: "center",
    color: Color.white,
    fontFamily: FontFamily.title2Bold32,
    fontSize: FontSize.body1Semibold_size,
    fontWeight: "700",
    flex: 1,
  },
  frameParent10: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  frameParent11: {
    flexDirection: "row",
    alignSelf: "stretch",
  },
  selfProvidedMaterialsWrapper: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  text21Typo: {
    letterSpacing: -0.2,
    textAlign: "left",
    color: Color.neutral07,
    fontFamily: FontFamily.buttonBold15,
    fontWeight: "700",
    fontSize: FontSize.title3Bold20_size,
  },
  totalCost1: {
    lineHeight: 24,
  },
  text20: {
    lineHeight: 16,
  },
  wrapper: {
    justifyContent: "flex-end",
    marginLeft: 125,
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  title1Position: {
    // left: 0,
    flexDirection: "row",
  },
  selectTypo: {
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
  },
  commentFlexBox: {
    padding: Padding.p_5xs,
    borderRadius: Border.br_17xl,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cheveronIconLayout: {
    width: 20,
    height: 20,
  },
  date1Layout: {
    borderRadius: Border.br_xs,
    flexDirection: "row",
  },
  date2Typo: {
    fontFamily: FontFamily.level2Medium12,
    fontWeight: "500",
  },
  textTypo2: {
    fontSize: FontSize.body1Semibold_size,
    lineHeight: 24,
    letterSpacing: -0.1,
  },
  textTypo1: {
    textAlign: "center",
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
  },
  calendarSpaceBlock: {
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_9xs,
    borderRadius: Border.br_13xl,
    backgroundColor: Color.neutral01,
    justifyContent: "center",
    alignItems: "center",
  },
  calendarFlexBox1: {
    padding: Padding.p_9xs,
    borderRadius: Border.br_13xl,
    justifyContent: "center",
    alignItems: "center",
  },
  calendarFlexBox: {
    opacity: 0,
    padding: Padding.p_9xs,
    borderRadius: Border.br_13xl,
    justifyContent: "center",
    alignItems: "center",
  },
  calenderSpaceBlock: {
    display: "none",
    marginTop: 20,
  },
  timeLiPosition: {
    top: 0,
    position: "absolute",
  },
  timeFlexBox: {
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_5xs,
    alignSelf: "stretch",
    borderRadius: Border.br_9xs,
    flexDirection: "row",
    alignItems: "center",
  },
  textTypo: {
    width: 44,
    lineHeight: 24,
    letterSpacing: -0.1,
    fontSize: FontSize.body1Semibold_size,
    textAlign: "left",
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
  },
  php8001Typo: {
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
  },
  tag: {
    backgroundColor: Color.colorSteelblue_100,
    width: 4,
    overflow: "hidden",
    height: 20,
    borderRadius: Border.br_9xs,
  },
  selectYourDate: {
    // width: 279,
    marginLeft: 10,
    textAlign: "left",
    color: Color.neutral07,
    letterSpacing: -0.4,
    fontSize: FontSize.title4Regular18_size,
    fontWeight: "600",
  },
  title1: {
    // top: 2,
    // width: 282,
    flexDirection: "row",
    // position: "absolute",
    alignItems: "center",
  },
  uiIconcloselight: {
    overflow: "hidden",
  },
  comment: {
    right: 0,
    width: 35,
    backgroundColor: Color.neutral03,
    top: 0,
    // position: "absolute",
  },
  title: {
    // width: 326,
    // height: 36,
    alignSelf: "stretch",
    flexDirection: "row"
  },
  dateOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  dateBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  iconOutline: {
    height: 24,
    width: 24,
    overflow: "hidden",
    marginBottom: 5,
  },
  date2: {
    fontSize: FontSize.level2Medium12_size,
    letterSpacing: 0.2,
    lineHeight: 12,
    textTransform: "uppercase",
    color: Color.neutral04,
    alignSelf: "stretch",
    textAlign: "left",
  },
  selectYourDate1: {
    marginTop: 4,
    lineHeight: 24,
    letterSpacing: -0.1,
    alignSelf: "stretch",
    textAlign: "left",
    color: Color.neutral07,
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
  },
  dateParent: {
    marginLeft: 12,
    flex: 1,
    justifyContent: "center",
  },
  date1: {
    backgroundColor: "#fbbc05",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: Padding.p_base,
  },
  comment1: {
    backgroundColor: Color.neutral01,
  },
  november2021: {
    textAlign: "left",
    color: Color.neutral07,
    letterSpacing: -0.4,
    fontSize: FontSize.title4Regular18_size,
    fontWeight: "600",
  },
  comment2: {
    backgroundColor: Color.neutral03,
  },
  month: {
    paddingHorizontal: Padding.p_5xs,
    paddingVertical: 0,
    justifyContent: "space-between",
    width: 327,
    flexDirection: "row",
    alignItems: "center",
  },
  su: {
    color: Color.colorSlategray_100,
    lineHeight: 16,
    fontSize: FontSize.m3LabelLarge_size,
    width: 24,
  },
  calendar1: {
    marginLeft: 16,
  },
  weekend: {
    width: 327,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    lineHeight: 24,
    letterSpacing: -0.1,
    fontSize: FontSize.body1Semibold_size,
    width: 24,
    color: Color.neutral07,
  },
  calendar8: {
    marginLeft: 16,
  },
  calendarParent: {
    width: 327,
    flexDirection: "row",
  },
  text7: {
    color: Color.neutral01,
    lineHeight: 24,
    letterSpacing: -0.1,
    fontSize: FontSize.body1Semibold_size,
    width: 24,
  },
  calendar14: {
    backgroundColor: "#3b71fe",
  },
  calendarGroup: {
    marginTop: 16,
    width: 327,
    flexDirection: "row",
  },
  calendar38: {
    marginLeft: 16,
  },
  timeDate: {
    marginTop: 20,
  },
  timeDate1: {
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  dateAndWeekendBar: {
    marginTop: 16,
  },
  timeOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  timeBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  time1: {
    backgroundColor: "#b5e4ca",
    padding: Padding.p_base,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  text35: {
    color: Color.neutral04,
  },
  pm: {
    lineHeight: 24,
    letterSpacing: -0.1,
    fontSize: FontSize.body1Semibold_size,
    color: Color.neutral04,
    marginLeft: 10,
  },
  parent: {
    flexDirection: "row",
  },
  time3: {
    backgroundColor: Color.neutral01,
  },
  text36: {
    color: Color.neutral07,
  },
  pm1: {
    lineHeight: 24,
    letterSpacing: -0.1,
    fontSize: FontSize.body1Semibold_size,
    marginLeft: 10,
    color: Color.neutral07,
  },
  time4: {
    backgroundColor: Color.neutral03,
  },
  timeGroup: {
    flex: 1,
  },
  timeLiChild: {
    borderRadius: 40,
    backgroundColor: Color.neutralShadeDark0440,
    width: 6,
    height: 40,
    marginLeft: 14,
  },
  timeLi: {
    width: 327,
    flexDirection: "row",
    left: 0,
  },
  timeOpenCard: {
    height: 360,
    width: 327,
  },
  total: {
    lineHeight: 24,
  },
  php800: {
    lineHeight: 16,
  },
  totalPhp800Container: {
    fontSize: FontSize.m3LabelLarge_size,
    letterSpacing: -0.1,
    color: Color.neutral04,
    textAlign: "left",
  },
  viewDetails: {
    right: 16,
    color: Color.colorBrandSecondaryOrange,
    textAlign: "right",
    width: 104,
    fontSize: FontSize.m3LabelLarge_size,
    lineHeight: 24,
    letterSpacing: -0.1,
    top: 0,
    position: "absolute",
  },
  viewDetailsBtnChild: {
    top: 7,
    right: -1,
    width: 9,
    height: 5,
    position: "absolute",
  },
  viewDetailsBtn: {
    marginLeft: 125,
    flex: 1,
    height: 24,
  },
  totalPhp800Parent: {
    alignSelf: "stretch",
    flexDirection: "row",
  },
  confirm: {
    lineHeight: 24,
    letterSpacing: -0.1,
    fontSize: FontSize.body1Semibold_size,
    textAlign: "left",
    color: Color.neutral07,
  },
  button: {
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_xs,
    flex: 1,
    backgroundColor: Color.neutral03,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    width: 343,
    marginTop: 16,
    flexDirection: "row",
  },
  titleParent: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  timeDateModal: {
    borderTopLeftRadius: Border.br_base,
    borderTopRightRadius: Border.br_base,
    backgroundColor: Color.white,
    maxWidth: "100%",
    maxHeight: "100%",
    paddingVertical: Padding.p_base,
    alignItems: "center",
    alignSelf: "stretch",
  },
});

export default TimeDateModal;

