// import React, { useState,useEffect } from "react";
// import {
//   StatusBar,
//   StyleSheet,
//   Pressable,
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Image } from "expo-image";
// import { RadioGroup, Radio } from "@ui-kitten/components";
// import { useNavigation } from "@react-navigation/native";
// import { FontFamily, Padding, FontSize, Color } from "../GlobalStyles";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import {
//   getFirestore,
//   collection,
//   query,
//   where,
//   getDoc,
//   doc,
//   updateDoc,
// } from "firebase/firestore";

// const PaymentMethod = () => {

//   const [materials, setMaterials] = useState("");
//   const [materialsVisible, setMaterialsVisible] = useState(false);

//   const [rB1selectedIndex, setRB1selectedIndex] = useState(undefined);
//   const [rB2selectedIndex, setRB2selectedIndex] = useState(undefined);
//   const [rB3selectedIndex, setRB3selectedIndex] = useState(undefined);
//   const navigation = useNavigation();
//   const [selectedPaymentOption, setSelectedPaymentOption] = useState('');


//   useEffect(() => {
//     const initializeMaterials = async () => {
//       try {
//         const auth = getAuth();
//         const user = auth.currentUser;

//         if (user) {
//           const firestore = getFirestore();
//           const userDocRef = doc(firestore, "userProfiles", user.uid);

//           // Get the current document data
//           const userDocSnap = await getDoc(userDocRef);

//           // Check if 'selectedPaymentOption' field is empty, and set 'materials' accordingly
//           const paymentOption = userDocSnap.exists()
//             ? userDocSnap.data().selectedPaymentOption
//             : "Cash";

//           const materialsValue = paymentOption || "Cash";

//           setMaterials(materialsValue);
//           setMaterialsVisible(true);
//           setSelectedPaymentOption(materialsValue);

//           // Update the Firestore document with the selected payment option
//           await updateDoc(userDocRef, {
//             selectedPaymentOption: materialsValue,
//           });

//           console.log("Payment option saved successfully!");
//         } else {
//           console.error("User not signed in.");
//         }
//       } catch (error) {
//         console.error("Error updating payment option: ", error);
//       }
//     };

//     // Call the initialization function
//     initializeMaterials();
//   }, []);

//   const handleCategoryButtonPress = async (category, value) => {
//     if (category === "Property") {
//       // Assuming you have a setProperty function
//       // setProperty(value);
//       // setPropertyVisible(true);
//       console.log("Property category selected");
//     } else if (category === "Materials") {
//       setMaterials(value);
//       setMaterialsVisible(true);
//       setSelectedPaymentOption(value);

//       try {
//         const auth = getAuth();
//         const user = auth.currentUser;

//         if (user) {
//           const firestore = getFirestore();
//           const userDocRef = doc(firestore, "userProfiles", user.uid);

//           // Update the Firestore document with the selected payment option
//           await updateDoc(userDocRef, {
//             selectedPaymentOption: value,
//           });

//           console.log('Payment option saved successfully!');
//         } else {
//           console.error('User not signed in.');
//         }
//       } catch (error) {
//         console.error('Error updating payment option: ', error);
//       }
//     }
//   };


//   console.log(selectedPaymentOption);
//   return (
//     <View style={styles.paymentMethod}>
//       <StatusBar barStyle="default" />
//       <ScrollView
//         style={styles.body}
//         showsVerticalScrollIndicator={true}
//         showsHorizontalScrollIndicator={true}
//         contentContainerStyle={styles.bodyScrollViewContent}
//       >
//         <View style={[styles.frameParent, styles.frameFlexBox2]}>
//           <View style={[styles.linkedMethodsWrapper, styles.wrapperSpaceBlock]}>
//             <Text style={[styles.linkedMethods, styles.linkedMethodsTypo]}>
//               Linked Methods
//             </Text>
//           </View>
//           <View style={styles.methodsFrameFlexBox}>
//             <View style={styles.frameFlexBox1}>
//               <View style={styles.mastercardJpeg0Wrapper}>
//                 <Image
//                   style={styles.mastercardJpeg0}
//                   contentFit="cover"
//                   source={require("../assets/mastercard--jpeg-0.png")}
//                 />
//               </View>
//               <View style={styles.mastercardXxxx4493Parent}>
//                 <Text
//                   style={[styles.mastercardXxxx4493, styles.linkedMethodsTypo]}
//                 >
//                   Mastercard xxxx 4493
//                 </Text>
//                 <Text style={styles.expires1528}>Expires 15/28</Text>
//               </View>
//               <RadioGroup
//                 style={styles.rb1}
//                 selectedIndex={rB1selectedIndex}
//                 onChange={setRB1selectedIndex}
//               >
//                 <Radio status="primary">
//                   {() => <Text style={styles.rB1Text}> </Text>}
//                 </Radio>
//               </RadioGroup>
//             </View>
//             <View style={[styles.paypalFrame, styles.frameFlexBox]}>
//               <View style={[styles.image2373Wrapper, styles.wrapperSpaceBlock]}>
//                 <Image
//                   style={styles.image2373Icon}
//                   contentFit="cover"
//                   source={require("../assets/image-2373.png")}
//                 />
//               </View>
//               <View style={styles.mastercardXxxx4493Parent}>
//                 <Text
//                   style={[styles.mastercardXxxx4493, styles.linkedMethodsTypo]}
//                 >
//                   PayPal xxxx 690690
//                 </Text>
//                 <Text style={styles.expires1528}>Expires 16/23</Text>
//               </View>
//               <RadioGroup
//                 style={styles.rb1}
//                 selectedIndex={rB2selectedIndex}
//                 onChange={setRB2selectedIndex}
//               >
//                 <Radio status="primary">
//                   {() => <Text style={styles.rB2Text}> </Text>}
//                 </Radio>
//               </RadioGroup>
//             </View>
//             <View style={[styles.cashFrame, styles.frameFlexBox]}>
//               <View style={styles.mastercardJpeg0Wrapper}>
//                 <Image
//                   style={styles.mastercardJpeg0}
//                   contentFit="cover"
//                   source={require("../assets/cash.png")}
//                 />
//               </View>
//               <View style={styles.mastercardXxxx4493Parent}>
//                 <Text
//                   style={[styles.mastercardXxxx4493, styles.linkedMethodsTypo]}
//                 >
//                   Cash
//                 </Text>
//               </View>
//               <View style={styles.radioButton2}>
//                 <TouchableOpacity
//                   onPress={() =>
//                     handleCategoryButtonPress(
//                       "Materials",
//                       "Cash"
//                     )
//                   }
//                 >
//                   {materials == "Cash" ? (
//                     <View style={styles.outerClicked}>
//                       <View style={styles.innerClicked}></View>
//                     </View>
//                   ) : (
//                     <View style={styles.outer} />
//                   )}
//                 </TouchableOpacity>
//               </View>
           
//             </View>
//             <View style={[styles.cashFrame, styles.frameFlexBox]}>
//               <View style={styles.mastercardJpeg0Wrapper}>
//                 <Image
//                   style={styles.mastercardJpeg0}
//                   contentFit="cover"
//                   source={require("../assets/image-2387.png")}
//                 />
//               </View>
//               <View style={styles.mastercardXxxx4493Parent}>
//                 <Text
//                   style={[styles.mastercardXxxx4493, styles.linkedMethodsTypo]}
//                 >
//                   Gcash
//                 </Text>
//               </View>
//               <View style={styles.radioButton2}>
//                 <TouchableOpacity
//                   onPress={() =>
//                     handleCategoryButtonPress(
//                       "Materials",
//                       "Gcash"
//                     )
//                   }
//                 >
//                   {materials == "Gcash" ? (
//                     <View style={styles.outerClicked}>
//                       <View style={styles.innerClicked}></View>
//                     </View>
//                   ) : (
//                     <View style={styles.outer} />
//                   )}
//                 </TouchableOpacity>
//               </View>
       
//             </View>

//             <View style={[styles.cashFrame, styles.frameFlexBox]}>
//               <View style={styles.mastercardJpeg0Wrapper}>
//                 <Image
//                   style={styles.mastercardJpeg0}
//                   contentFit="cover"
//                   source={require("../assets/image-2373.png")}
//                 />
//               </View>
//               <View style={styles.mastercardXxxx4493Parent}>
//                 <Text
//                   style={[styles.mastercardXxxx4493, styles.linkedMethodsTypo]}
//                 >
//                   PayPal
//                 </Text>
//               </View>
//               <View style={styles.radioButton2}>
//                 <TouchableOpacity
//                   onPress={() =>
//                     handleCategoryButtonPress(
//                       "Materials",
//                       "PayPal"
//                     )
//                   }
//                 >
//                   {materials == "PayPal" ? (
//                     <View style={styles.outerClicked}>
//                       <View style={styles.innerClicked}></View>
//                     </View>
//                   ) : (
//                     <View style={styles.outer} />
//                   )}
//                 </TouchableOpacity>
//               </View>
       
//             </View>
//           </View>
//         </View>
//         <View style={[styles.frameGroup, styles.frameFlexBox2]}>
//           <View style={[styles.linkedMethodsWrapper, styles.wrapperSpaceBlock]}>
//             <Text style={[styles.linkedMethods, styles.linkedMethodsTypo]}>
//               Add methods
//             </Text>
//           </View>
//           <View style={[styles.addMethodsFrame, styles.methodsFrameFlexBox]}>
//             <Pressable style={[styles.bankAccountFrame, styles.frameFlexBox1]}>
//               <View style={styles.vectorWrapper}>
//                 <Image
//                   style={styles.vectorIcon}
//                   contentFit="cover"
//                   source={require("../assets/vector1.png")}
//                 />
//               </View>
//               <View style={styles.mastercardXxxx4493Parent}>
//                 <Text
//                   style={[styles.mastercardXxxx4493, styles.linkedMethodsTypo]}
//                 >
//                   Bank Account
//                 </Text>
//               </View>
//               <View style={styles.vectorContainer}>
//                 <Image
//                   style={styles.vectorIcon1}
//                   contentFit="cover"
//                   source={require("../assets/vector6.png")}
//                 />
//               </View>
//             </Pressable>
//             <Pressable
//               style={[styles.cardsFrame, styles.frameFlexBox]}
//               onPress={() => navigation.navigate("AddCard")}
//             >
//               <View style={styles.vectorWrapper}>
//                 <Image
//                   style={styles.vectorIcon2}
//                   contentFit="cover"
//                   source={require("../assets/vector2.png")}
//                 />
//               </View>
//               <View style={styles.cardsWrapper}>
//                 <Text
//                   style={[styles.mastercardXxxx4493, styles.linkedMethodsTypo]}
//                 >
//                   Cards
//                 </Text>
//               </View>
//               <View style={styles.vectorContainer}>
//                 <Image
//                   style={styles.vectorIcon1}
//                   contentFit="cover"
//                   source={require("../assets/vector6.png")}
//                 />
//               </View>
//             </Pressable>
//             <Pressable style={[styles.gcashFrame, styles.frameFlexBox]}>
//               <View style={styles.vectorWrapper}>
//                 <Image
//                   style={styles.vectorIcon}
//                   contentFit="cover"
//                   source={require("../assets/image-2387.png")}
//                 />
//               </View>
//               <View style={styles.cardsWrapper}>
//                 <Text
//                   style={[styles.mastercardXxxx4493, styles.linkedMethodsTypo]}
//                 >
//                   Gcash
//                 </Text>
//               </View>
//               <View style={styles.vectorContainer}>
//                 <Image
//                   style={styles.vectorIcon1}
//                   contentFit="cover"
//                   source={require("../assets/vector6.png")}
//                 />
//               </View>
//             </Pressable>
//             <Pressable style={[styles.gcashFrame, styles.frameFlexBox]}>
//               <View style={[styles.image2373Wrapper, styles.wrapperSpaceBlock]}>
//                 <Image
//                   style={styles.image2373Icon}
//                   contentFit="cover"
//                   source={require("../assets/image-2373.png")}
//                 />
//               </View>
//               <View style={styles.mastercardXxxx4493Parent}>
//                 <Text
//                   style={[styles.mastercardXxxx4493, styles.linkedMethodsTypo]}
//                 >
//                   PayPal
//                 </Text>
//               </View>
//               <View style={styles.vectorContainer}>
//                 <Image
//                   style={styles.vectorIcon1}
//                   contentFit="cover"
//                   source={require("../assets/vector6.png")}
//                 />
//               </View>
//             </Pressable>
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
//   rB1Text: {},
//   rB1Radio: {
//     padding: 10,
//   },
//   rB2Text: {},
//   rB2Radio: {
//     padding: 10,
//   },
//   rB3Text: {},
//   rB3Radio: {
//     padding: 10,
//   },
//   bodyScrollViewContent: {
//     flexDirection: "column",
//     paddingHorizontal: 0,
//     paddingVertical: 15,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   linkedMethodsTypo1: {
//     fontFamily: FontFamily.title2Bold32,
//     fontWeight: "700",
//     flex: 1,
//   },
//   frameFlexBox2: {
//     paddingHorizontal: Padding.p_3xl,
//     paddingVertical: Padding.p_3xs,
//     justifyContent: "center",
//     alignItems: "center",
//     alignSelf: "stretch",
//   },
//   wrapperSpaceBlock: {
//     paddingHorizontal: 0,
//     alignItems: "center",
//   },
//   linkedMethodsTypo: {
//     fontSize: FontSize.bodyLgBodyLgRegular_size,
//     textAlign: "left",
//   },
//   frameFlexBox: {
//     marginTop: 20,
//     paddingHorizontal: Padding.p_xs,
//     alignItems: "center",
//     flexDirection: "row",
//     alignSelf: "stretch",
//   },
//   methodsFrameFlexBox: {
//     marginTop: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     alignSelf: "stretch",
//   },
//   frameFlexBox1: {
//     paddingHorizontal: Padding.p_xs,
//     paddingVertical: Padding.p_3xs,
//     alignItems: "center",
//     flexDirection: "row",
//     alignSelf: "stretch",
//   },
//   linkedMethods: {
//     color: Color.colorGray80,
//     textAlign: "left",
//     fontFamily: FontFamily.title2Bold32,
//     fontWeight: "700",
//     flex: 1,
//   },
//   linkedMethodsWrapper: {
//     paddingVertical: Padding.p_3xs,
//     justifyContent: "center",
//     flexDirection: "row",
//     alignSelf: "stretch",
//   },
//   mastercardJpeg0: {
//     width: 40,
//     height: 40,
//   },
//   mastercardJpeg0Wrapper: {
//     padding: Padding.p_8xs,
//     justifyContent: "center",
//     flexDirection: "row",
//   },
//   mastercardXxxx4493: {
//     fontWeight: "500",
//     fontFamily: FontFamily.typographyParagraphSmallMedium,
//     color: Color.colorGray90,
//     width: 250,
//     textAlign: "left",
//   },
//   expires1528: {
//     fontSize: FontSize.typographyTaglineSmallRegular_size,
//     fontFamily: FontFamily.typographyTaglineSmallRegular,
//     color: Color.colorGray60,
//     width: 256,
//     marginTop: 2,
//     textAlign: "left",
//   },
//   mastercardXxxx4493Parent: {
//     marginLeft: 16,
//     justifyContent: "center",
//     flex: 1,
//   },
//   rb1: {
//     marginLeft: 16,
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   image2373Icon: {
//     width: 50,
//     height: 38,
//   },
//   image2373Wrapper: {
//     paddingVertical: Padding.p_7xs,
//   },
//   paypalFrame: {
//     display: "none",
//     paddingVertical: Padding.p_3xs,
//     backgroundColor: Color.white,
//   },
//   cashFrame: {
//     paddingVertical: Padding.p_3xs,
//   },
//   frameParent: {
//     paddingVertical: Padding.p_3xs,
//   },
//   vectorIcon: {
//     height: 30,
//     width: 30,
//   },
//   vectorWrapper: {
//     padding: Padding.p_3xs,
//     alignItems: "center",
//   },
//   vectorIcon1: {
//     width: 12,
//     height: 20,
//   },
//   vectorContainer: {
//     marginLeft: 16,
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   bankAccountFrame: {
//     backgroundColor: Color.white,
//   },
//   vectorIcon2: {
//     height: 28,
//     width: 30,
//   },
//   cardsWrapper: {
//     paddingLeft: Padding.p_12xs_5,
//     marginLeft: 16,
//     justifyContent: "center",
//     flex: 1,
//   },
//   cardsFrame: {
//     paddingVertical: Padding.p_2xs,
//     backgroundColor: Color.white,
//   },
//   gcashFrame: {
//     paddingVertical: Padding.p_3xs,
//     backgroundColor: Color.white,
//   },
//   addMethodsFrame: {
//     paddingBottom: Padding.p_xl,
//   },
//   frameGroup: {
//     marginTop: 15,
//     paddingVertical: Padding.p_3xs,
//   },
//   body: {
//     backgroundColor: Color.colorWhitesmoke_100,
//     alignSelf: "stretch",
//     flex: 1,
//   },
//   paymentMethod: {
//     height: 812,
//     width: "100%",
//     flex: 1,
//     backgroundColor: Color.white,
//   },
//   radioButton2: {
//     marginLeft: 10,
//     flexDirection: "row",
//   },
//   outerClicked: {
//     width: 25,
//     height: 25,
//     borderWidth: 2,
//     borderRadius: 20,
//     alignItems: "center",
//     justifyContent: "center",
//     borderColor: Color.colorSteelblue_100,
//   },
//   inner: {
//     width: 17,
//     height: 17,
//     backgroundColor: Color.colorSteelblue_100,
//     borderRadius: 10,
//   },
//   innerClicked: {
//     width: 17,
//     height: 17,
//     backgroundColor: Color.colorSteelblue_100,
//     borderRadius: 10,
//   },
//   outer: {
//     width: 25,
//     height: 25,
//     borderWidth: 2,
//     borderRadius: 20,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export default PaymentMethod;

import React, { useState,useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  Pressable,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { RadioGroup, Radio } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Padding, FontSize, Color } from "../GlobalStyles";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";




const PaymentMethod = () => {

  const [materials, setMaterials] = useState("");
  const [materialsVisible, setMaterialsVisible] = useState(false);

  const [rB1selectedIndex, setRB1selectedIndex] = useState(undefined);
  const [rB2selectedIndex, setRB2selectedIndex] = useState(undefined);
  const [rB3selectedIndex, setRB3selectedIndex] = useState(undefined);
  const navigation = useNavigation();
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('');


  useEffect(() => {
    const initializeMaterials = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const firestore = getFirestore();
          const userDocRef = doc(firestore, "userProfiles", user.uid);

          // Get the current document data
          const userDocSnap = await getDoc(userDocRef);

          // Check if 'selectedPaymentOption' field is empty, and set 'materials' accordingly
          const paymentOption = userDocSnap.exists()
            ? userDocSnap.data().selectedPaymentOption
            : "Cash";

          const materialsValue = paymentOption || "Cash";

          setMaterials(materialsValue);
          setMaterialsVisible(true);
          setSelectedPaymentOption(materialsValue);

          // Update the Firestore document with the selected payment option
          await updateDoc(userDocRef, {
            selectedPaymentOption: materialsValue,
          });

          console.log("Payment option saved successfully!");
        } else {
          console.error("User not signed in.");
        }
      } catch (error) {
        console.error("Error updating payment option: ", error);
      }
    };

    // Call the initialization function
    initializeMaterials();
  }, []);

  const handleCategoryButtonPress = async (category, value) => {
    if (category === "Property") {
      // Assuming you have a setProperty function
      // setProperty(value);
      // setPropertyVisible(true);
      console.log("Property category selected");
    } else if (category === "Materials") {
      setMaterials(value);
      setMaterialsVisible(true);
      setSelectedPaymentOption(value);

      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const firestore = getFirestore();
          const userDocRef = doc(firestore, "userProfiles", user.uid);

          // Update the Firestore document with the selected payment option
          await updateDoc(userDocRef, {
            selectedPaymentOption: value,
          });

          console.log('Payment option saved successfully!');
        } else {
          console.error('User not signed in.');
        }
      } catch (error) {
        console.error('Error updating payment option: ', error);
      }
    }
  };


  console.log(selectedPaymentOption);
  return (
    <View style={styles.paymentMethod}>
      <StatusBar barStyle="default" />
      <ScrollView
        style={styles.body}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.bodyScrollViewContent}
      >
        <View style={[styles.frameParent, styles.frameFlexBox2]}>
          <View style={[styles.linkedMethodsWrapper, styles.wrapperSpaceBlock]}>
            <Text style={[styles.linkedMethods, styles.linkedMethodsTypo]}>
              Linked Methods
            </Text>
          </View>
          <View style={styles.methodsFrameFlexBox}>
            <View style={[styles.paypalFrame, styles.frameFlexBox]}>
              <View style={[styles.image2373Wrapper, styles.wrapperSpaceBlock]}>
                <Image
                  style={styles.image2373Icon}
                  contentFit="cover"
                  source={require("../assets/image-2373.png")}
                />
              </View>
              <View style={styles.mastercardXxxx4493Parent}>
                <Text
                  style={[styles.mastercardXxxx4493, styles.linkedMethodsTypo]}
                >
                  PayPal xxxx 690690
                </Text>
                <Text style={styles.expires1528}>Expires 16/23</Text>
              </View>
              <RadioGroup
                style={styles.rb1}
                selectedIndex={rB2selectedIndex}
                onChange={setRB2selectedIndex}
              >
                <Radio status="primary">
                  {() => <Text style={styles.rB2Text}> </Text>}
                </Radio>
              </RadioGroup>
            </View>
            <View style={[styles.cashFrame, styles.frameFlexBox]}>
              <View style={styles.mastercardJpeg0Wrapper}>
                <Image
                  style={styles.mastercardJpeg0}
                  contentFit="cover"
                  source={require("../assets/cash.png")}
                />
              </View>
              <View style={styles.mastercardXxxx4493Parent}>
                <Text
                  style={[styles.mastercardXxxx4493, styles.linkedMethodsTypo]}
                >
                  Cash
                </Text>
              </View>
              <View style={styles.radioButton2}>
                <TouchableOpacity
                  onPress={() =>
                    handleCategoryButtonPress(
                      "Materials",
                      "Cash"
                    )
                  }
                >
                  {materials == "Cash" ? (
                    <View style={styles.outerClicked}>
                      <View style={styles.innerClicked}></View>
                    </View>
                  ) : (
                    <View style={styles.outer} />
                  )}
                </TouchableOpacity>
              </View>
           
            </View>
            <View style={[styles.cashFrame, styles.frameFlexBox]}>
              <View style={styles.mastercardJpeg0Wrapper}>
                <Image
                  style={styles.mastercardJpeg0}
                  contentFit="cover"
                  source={require("../assets/image-2387.png")}
                />
              </View>
              <View style={styles.mastercardXxxx4493Parent}>
                <Text
                  style={[styles.mastercardXxxx4493, styles.linkedMethodsTypo]}
                >
                  Gcash
                </Text>
              </View>
              <View style={styles.radioButton2}>
                <TouchableOpacity
                  onPress={() =>
                    handleCategoryButtonPress(
                      "Materials",
                      "Gcash"
                    )
                  }
                >
                  {materials == "Gcash" ? (
                    <View style={styles.outerClicked}>
                      <View style={styles.innerClicked}></View>
                    </View>
                  ) : (
                    <View style={styles.outer} />
                  )}
                </TouchableOpacity>
              </View>
       
            </View>

            <View style={[styles.cashFrame, styles.frameFlexBox]}>
              <View style={styles.mastercardJpeg0Wrapper}>
                <Image
                  style={styles.mastercardJpeg0}
                  contentFit="cover"
                  source={require("../assets/image-2373.png")}
                />
              </View>
              <View style={styles.mastercardXxxx4493Parent}>
                <Text
                  style={[styles.mastercardXxxx4493, styles.linkedMethodsTypo]}
                >
                  PayPal
                </Text>
              </View>
              <View style={styles.radioButton2}>
                <TouchableOpacity
                  onPress={() =>
                    handleCategoryButtonPress(
                      "Materials",
                      "PayPal"
                    )
                  }
                >
                  {materials == "PayPal" ? (
                    <View style={styles.outerClicked}>
                      <View style={styles.innerClicked}></View>
                    </View>
                  ) : (
                    <View style={styles.outer} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.cashFrame, styles.frameFlexBox]}>
              <View style={styles.mastercardJpeg0Wrapper}>
                <Image
                  style={styles.mastercardJpeg0}
                  contentFit="cover"
                  source={require("../assets/maya.png")}
                />
              </View>
              <View style={styles.mastercardXxxx4493Parent}>
                <Text
                  style={[styles.mastercardXxxx4493, styles.linkedMethodsTypo]}
                >
                  PayMaya
                </Text>
              </View>
              <View style={styles.radioButton2}>
                <TouchableOpacity
                  onPress={() =>
                    handleCategoryButtonPress(
                      "Materials",
                      "PayMaya"
                    )
                  }
                >
                  {materials == "PayMaya" ? (
                    <View style={styles.outerClicked}>
                      <View style={styles.innerClicked}></View>
                    </View>
                  ) : (
                    <View style={styles.outer} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.cashFrame, styles.frameFlexBox]}>
              <View style={styles.mastercardJpeg0Wrapper}>
                <Image
                  style={styles.mastercardJpeg0}
                  contentFit="cover"
                  source={require("../assets/grab-pay.png")}
                />
              </View>
              <View style={styles.mastercardXxxx4493Parent}>
                <Text
                  style={[styles.mastercardXxxx4493, styles.linkedMethodsTypo]}
                >
                  GrabPay
                </Text>
              </View>
              <View style={styles.radioButton2}>
                <TouchableOpacity
                  onPress={() =>
                    handleCategoryButtonPress(
                      "Materials",
                      "GrabPay"
                    )
                  }
                >
                  {materials == "GrabPay" ? (
                    <View style={styles.outerClicked}>
                      <View style={styles.innerClicked}></View>
                    </View>
                  ) : (
                    <View style={styles.outer} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {/* <View style={[styles.frameGroup, styles.frameFlexBox2]}>
          <View style={[styles.linkedMethodsWrapper, styles.wrapperSpaceBlock]}>
            <Text style={[styles.linkedMethods, styles.linkedMethodsTypo]}>
              Add methods
            </Text>
          </View>
          <View style={[styles.addMethodsFrame, styles.methodsFrameFlexBox]}>
            <Pressable style={[styles.bankAccountFrame, styles.frameFlexBox1]}>
              <View style={styles.vectorWrapper}>
                <Image
                  style={styles.vectorIcon}
                  contentFit="cover"
                  source={require("../assets/vector1.png")}
                />
              </View>
              <View style={styles.mastercardXxxx4493Parent}>
                <Text
                  style={[styles.mastercardXxxx4493, styles.linkedMethodsTypo]}
                >
                  Bank Account
                </Text>
              </View>
              <View style={styles.vectorContainer}>
                <Image
                  style={styles.vectorIcon1}
                  contentFit="cover"
                  source={require("../assets/vector6.png")}
                />
              </View>
            </Pressable>
            <Pressable
              style={[styles.cardsFrame, styles.frameFlexBox]}
              onPress={() => navigation.navigate("AddCard")}
            >
              <View style={styles.vectorWrapper}>
                <Image
                  style={styles.vectorIcon2}
                  contentFit="cover"
                  source={require("../assets/vector2.png")}
                />
              </View>
              <View style={styles.cardsWrapper}>
                <Text
                  style={[styles.mastercardXxxx4493, styles.linkedMethodsTypo]}
                >
                  Cards
                </Text>
              </View>
              <View style={styles.vectorContainer}>
                <Image
                  style={styles.vectorIcon1}
                  contentFit="cover"
                  source={require("../assets/vector6.png")}
                />
              </View>
            </Pressable>
            <Pressable style={[styles.gcashFrame, styles.frameFlexBox]}>
              <View style={styles.vectorWrapper}>
                <Image
                  style={styles.vectorIcon}
                  contentFit="cover"
                  source={require("../assets/image-2387.png")}
                />
              </View>
              <View style={styles.cardsWrapper}>
                <Text
                  style={[styles.mastercardXxxx4493, styles.linkedMethodsTypo]}
                >
                  Gcash
                </Text>
              </View>
              <View style={styles.vectorContainer}>
                <Image
                  style={styles.vectorIcon1}
                  contentFit="cover"
                  source={require("../assets/vector6.png")}
                />
              </View>
            </Pressable>
            <Pressable style={[styles.gcashFrame, styles.frameFlexBox]}>
              <View style={[styles.image2373Wrapper, styles.wrapperSpaceBlock]}>
                <Image
                  style={styles.image2373Icon}
                  contentFit="cover"
                  source={require("../assets/image-2373.png")}
                />
              </View>
              <View style={styles.mastercardXxxx4493Parent}>
                <Text
                  style={[styles.mastercardXxxx4493, styles.linkedMethodsTypo]}
                >
                  PayPal
                </Text>
              </View>
              <View style={styles.vectorContainer}>
                <Image
                  style={styles.vectorIcon1}
                  contentFit="cover"
                  source={require("../assets/vector6.png")}
                />
              </View>
            </Pressable>
          </View>
        </View> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1a244d",
  },
  rB1Text: {},
  rB1Radio: {
    padding: 10,
  },
  rB2Text: {},
  rB2Radio: {
    padding: 10,
  },
  rB3Text: {},
  rB3Radio: {
    padding: 10,
  },
  bodyScrollViewContent: {
    flexDirection: "column",
    paddingHorizontal: 0,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  linkedMethodsTypo1: {
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    flex: 1,
  },
  frameFlexBox2: {
    paddingHorizontal: Padding.p_3xl,
    paddingVertical: Padding.p_3xs,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  wrapperSpaceBlock: {
    paddingHorizontal: 0,
    alignItems: "center",
  },
  linkedMethodsTypo: {
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    textAlign: "left",
  },
  frameFlexBox: {
    marginTop: 20,
    paddingHorizontal: Padding.p_xs,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  methodsFrameFlexBox: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  frameFlexBox1: {
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_3xs,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  linkedMethods: {
    color: Color.colorGray80,
    textAlign: "left",
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    flex: 1,
  },
  linkedMethodsWrapper: {
    paddingVertical: Padding.p_3xs,
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  mastercardJpeg0: {
    width: 40,
    height: 40,
  },
  mastercardJpeg0Wrapper: {
    padding: Padding.p_8xs,
    justifyContent: "center",
    flexDirection: "row",
  },
  mastercardXxxx4493: {
    fontWeight: "500",
    fontFamily: FontFamily.typographyParagraphSmallMedium,
    color: Color.colorGray90,
    width: 250,
    textAlign: "left",
  },
  expires1528: {
    fontSize: FontSize.typographyTaglineSmallRegular_size,
    fontFamily: FontFamily.typographyTaglineSmallRegular,
    color: Color.colorGray60,
    width: 256,
    marginTop: 2,
    textAlign: "left",
  },
  mastercardXxxx4493Parent: {
    marginLeft: 16,
    justifyContent: "center",
    flex: 1,
  },
  rb1: {
    marginLeft: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  image2373Icon: {
    width: 50,
    height: 38,
  },
  image2373Wrapper: {
    paddingVertical: Padding.p_7xs,
  },
  paypalFrame: {
    display: "none",
    paddingVertical: Padding.p_3xs,
    backgroundColor: Color.white,
  },
  cashFrame: {
    paddingVertical: Padding.p_3xs,
  },
  frameParent: {
    paddingVertical: Padding.p_3xs,
  },
  vectorIcon: {
    height: 30,
    width: 30,
  },
  vectorWrapper: {
    padding: Padding.p_3xs,
    alignItems: "center",
  },
  vectorIcon1: {
    width: 12,
    height: 20,
  },
  vectorContainer: {
    marginLeft: 16,
    alignItems: "center",
    flexDirection: "row",
  },
  bankAccountFrame: {
    backgroundColor: Color.white,
  },
  vectorIcon2: {
    height: 28,
    width: 30,
  },
  cardsWrapper: {
    paddingLeft: Padding.p_12xs_5,
    marginLeft: 16,
    justifyContent: "center",
    flex: 1,
  },
  cardsFrame: {
    paddingVertical: Padding.p_2xs,
    backgroundColor: Color.white,
  },
  gcashFrame: {
    paddingVertical: Padding.p_3xs,
    backgroundColor: Color.white,
  },
  addMethodsFrame: {
    paddingBottom: Padding.p_xl,
  },
  frameGroup: {
    marginTop: 15,
    paddingVertical: Padding.p_3xs,
  },
  body: {
    backgroundColor: Color.colorWhitesmoke_100,
    alignSelf: "stretch",
    flex: 1,
  },
  paymentMethod: {
    height: 812,
    width: "100%",
    flex: 1,
    backgroundColor: Color.white,
  },
  radioButton2: {
    marginLeft: 10,
    flexDirection: "row",
  },
  outerClicked: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Color.colorSteelblue_100,
  },
  inner: {
    width: 17,
    height: 17,
    backgroundColor: Color.colorSteelblue_100,
    borderRadius: 10,
  },
  innerClicked: {
    width: 17,
    height: 17,
    backgroundColor: Color.colorSteelblue_100,
    borderRadius: 10,
  },
  outer: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PaymentMethod;

