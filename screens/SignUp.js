import * as React from "react";
import {
  StatusBar,
  StyleSheet,
  ScrollView,
  View,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { FontSize, FontFamily, Color, Padding, Border } from "../GlobalStyles";
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
// import {getApp } from "../App";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc, // Import getDoc for checking if a user with the same phone number exists
  collection,
  addDoc,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import { useUserDetailsContext } from "../UserDetailsContext";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const eyeIconSource = showPassword
    ? require("../assets/hide-pass.png")
    : require("../assets/-icon-eye-empty.png");

  const { addUserDetails, setAddUserDetails } = useUserDetailsContext();

  const isValidPhilippinePhoneNumber = (phoneNumber) => {
    // Clean the input by removing non-digit characters
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

    // Check if the cleaned phone number is exactly 10 digits
    if (cleanedPhoneNumber.length !== 10) {
      return false;
    }

    // Check if the first digit is 9
    if (cleanedPhoneNumber.charAt(0) !== "9") {
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    // if empty fields
    if (name === "" || email === "" || password === "" || phone === "") {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "Please fill in all required fields❗",
        visibilityTime: 5000,
      });
      return;
    }

    // if not valid phone format
    if (!isValidPhilippinePhoneNumber(phone)) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "Enter a valid 10-digit phone number starting with 9❗",
        visibilityTime: 5000,
      });
      return;
    }

    const db = getFirestore();
    const usersCollectionRef = collection(db, "userProfiles");

    const phoneQuery = query(
      usersCollectionRef,
      where("phone", "==", `+63${phone}`)
    );
    const querySnapshot = await getDocs(phoneQuery);

    if (!querySnapshot.empty) {
      // Phone number already exists, show an error message
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "Phone number already exists❗",
        visibilityTime: 5000,
      });
      return; // Stop the sign-up process
    }

    // Check if email already exists in Firebase Authentication
    const emailQuery = query(usersCollectionRef, where("email", "==", email));
    const emailQuerySnapshot = await getDocs(emailQuery);

    if (!emailQuerySnapshot.empty) {
      // Email already exists, show an error message
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "Email already exists❗",
        visibilityTime: 5000,
      });
      return; // Stop the sign-up process
    }

    const auth = getAuth();
    try {

      navigation.navigate("Authentication", {
        name: name,
        phone: `+63${phone}`,
        email: email,
        password: password,
      });

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error",
          text2: "Email already exists❗",
          visibilityTime: 5000,
        });
      } else {
        // Handle other possible errors
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error",
          text2: error.message,
          visibilityTime: 5000,
        });
      }
      return; // Stop the sign-up process if an error occurs
    }
  };

  return (
    <View style={styles.signUp}>
      <StatusBar barStyle="default" />
      <ScrollView
        style={styles.body}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.bodyScrollViewContent}
      >
        <View style={styles.frame}>
          <View style={styles.componentstopNavigation}>
            <View
              style={[styles.componentstopNavigationChild, styles.iconLayout]}
            />
            <View style={styles.menuWrapper}>
              <View style={styles.menu}>
                <View
                  style={[
                    styles.uiIconarrowBackwardfilled,
                    styles.image2354IconLayout,
                  ]}
                >
                  <Pressable
                    style={styles.union}
                    onPress={() => navigation.goBack()}
                  >
                    <Image
                      style={[styles.icon, styles.iconLayout]}
                      contentFit="cover"
                      source={require("../assets/union.png")}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
          <Image
            style={styles.frameIcon}
            contentFit="cover"
            source={require("../assets/frame.png")}
          />
        </View>
        <View style={styles.signInWrapper}>
          <View style={styles.signIn}>
            <View style={styles.content}>
              <Text style={styles.signUp1}>Sign Up</Text>
              <View style={styles.componentsinputFieldParent}>
                <View style={styles.componentsinputField}>
                  <Text style={[styles.phoneNumber, styles.mrTypo]}>Name</Text>
                  <View style={styles.fullNameInputWrapper}>
                    <TextInput
                      style={[styles.fullNameInput, styles.inputTypo]}
                      placeholder="Name"
                      placeholderTextColor="#d1d3d4"
                      value={name}
                      onChangeText={(text) => setName(text)}
                    />
                  </View>
                </View>
                <View style={styles.frame1SpaceBlock}>
                  <Text style={[styles.phoneNumber, styles.mrTypo]}>Email</Text>
                  <View style={styles.fullNameInputWrapper}>
                    <TextInput
                      style={[styles.fullNameInput, styles.inputTypo]}
                      placeholder="Email"
                      keyboardType="email-address"
                      placeholderTextColor="#d1d3d4"
                      value={email}
                      onChangeText={(text) => setEmail(text)}
                    />
                  </View>
                </View>
                <View style={styles.frame1SpaceBlock}>
                  <Text style={[styles.phoneNumber, styles.mrTypo]}>
                    Phone Number
                  </Text>
                  <View style={styles.fullNameInputWrapper}>
                    <View style={styles.leftNumberParent}>
                      <View style={styles.leftNumber}>
                        <Image
                          style={[
                            styles.image2354Icon,
                            styles.image2354IconLayout,
                          ]}
                          contentFit="cover"
                          source={require("../assets/image-2354.png")}
                        />
                        <Text style={styles.text}>+63</Text>
                        <Image
                          style={[
                            styles.leftNumberChild,
                            styles.leftChildLayout,
                          ]}
                          contentFit="cover"
                          source={require("../assets/vector-3.png")}
                        />
                      </View>
                      <View style={styles.leftName}>
                        <Text style={[styles.mr, styles.mrTypo]}>Mr.</Text>
                        <Image
                          style={styles.leftChildLayout}
                          contentFit="cover"
                          source={require("../assets/vector-3.png")}
                        />
                      </View>
                      <View style={styles.right}>
                        <View style={styles.rightChild} />
                        <TextInput
                          style={styles.phoneNumber3}
                          placeholder="  Phone Number"
                          keyboardType="numeric"
                          placeholderTextColor="#d1d3d4"
                          value={phone}
                          onChangeText={(text) => setPhone(text)}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.frame1SpaceBlock}>
                  <Text style={[styles.phoneNumber, styles.mrTypo]}>
                    Password
                  </Text>
                  <View style={styles.fullNameInputWrapper}>
                    <View style={styles.leftNumberGroup}>
                      <TextInput
                        style={[styles.passwordInput, styles.leftName1FlexBox]}
                        placeholder="Password"
                        keyboardType="default"
                        secureTextEntry={!showPassword}
                        placeholderTextColor="#d1d3d4"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                      />

                      <TouchableWithoutFeedback
                        onPress={togglePasswordVisibility}
                      >
                        <View style={styles.leftNumber}>
                          <Image
                            style={styles.iconEyeEmpty}
                            contentFit="cover"
                            source={eyeIconSource}
                          />
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.signUpButtonParent}>
              <Pressable style={styles.signUpButton} onPress={handleSignUp}>
                <Text style={[styles.signIn1, styles.signIn1FlexBox]}>
                  Sign Up
                </Text>
              </Pressable>
              <View
                style={[
                  styles.bySigningUpYouAgreeToOuWrapper,
                  styles.frame1SpaceBlock,
                ]}
              >
                <Text
                  style={[styles.bySigningUpContainer, styles.signIn1FlexBox]}
                >
                  <Text
                    style={styles.bySigningUp}
                  >{`By signing up, you agree to our
`}</Text>
                  <View style={styles.termsOfServiceTypo1}>
                    <Pressable onPress={() => navigation.navigate("TermsAndConditions")}>
                      <Text
                        style={[styles.termsOfServiceTypo]}
                      >
                        Terms of Service
                      </Text>
                    </Pressable>
                    <Text style={styles.bySigningUp}>{`, and `}</Text>
                    <Pressable onPress={() => navigation.navigate("PrivacyPolicy")}>
                      <Text
                        style={[styles.termsOfServiceTypo]}
                      >
                      Privacy Policy
                      </Text>
                    </Pressable>
                  </View>
                </Text>
              </View>
              <View style={[styles.frame1, styles.frame1SpaceBlock]}>
                <View style={styles.alreadyHaveAnAccountParent}>
                  <Text style={[styles.alreadyHaveAn, styles.text4Typo]}>
                    Already have an Account?
                  </Text>
                  <Pressable
                    style={styles.signIn2}
                    onPress={() => navigation.navigate("SignIn")}
                  >
                    <Text style={[styles.text3, styles.text3Layout]}>
                      <Text style={styles.text4Typo}>{` `}</Text>
                      <Text style={[styles.signIn3, styles.signTypo]}>
                        Sign in
                      </Text>
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyScrollViewContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  image2354IconLayout: {
    height: 24,
    width: 24,
  },
  mrTypo: {
    lineHeight: 24,
    letterSpacing: -0.1,
    fontSize: FontSize.body1Semibold_size,
    textAlign: "left",
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
  },
  inputTypo: {
    fontSize: FontSize.m3LabelLarge_size,
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
  },
  leftChildLayout: {
    height: 4,
    width: 8,
    marginLeft: 8,
  },
  leftName1FlexBox: {
    marginLeft: 12,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  signIn1FlexBox: {
    textAlign: "center",
    lineHeight: 24,
    flex: 1,
  },
  frame1SpaceBlock: {
    marginTop: 20,
    alignSelf: "stretch",
  },
  termsOfServiceTypo: {
    fontFamily: FontFamily.robotoBold,
    fontWeight: "600",
    fontSize: 16,
    color: Color.colorDarkslateblue_100,
        // lineHeight: 20,
  },
  termsOfServiceTypo1: {
    // marginTop: 100,
    // paddingTop: 100,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    // lineHeight: 50,
  },
  text4Typo: {
    color: Color.neutralShades0475,
    fontSize: FontSize.typographyTaglineSmallRegular_size,
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
  },
  text3Layout: {
    lineHeight: 16,
    textAlign: "center",
  },
  signTypo: {
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
  },
  componentstopNavigationChild: {
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    position: "absolute",
  },
  icon: {
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
  },
  union: {
    left: "12.14%",
    top: "18.75%",
    right: "12.5%",
    bottom: "18.75%",
    width: "75.36%",
    height: "62.5%",
    position: "absolute",
  },
  uiIconarrowBackwardfilled: {
    overflow: "hidden",
  },
  menu: {
    padding: Padding.p_xs,
    flexDirection: "row",
    flex: 1,
  },
  menuWrapper: {
    height: "94.12%",
    width: "91.47%",
    top: "2.94%",
    right: "4.27%",
    bottom: "2.94%",
    left: "4.27%",
    flexDirection: "row",
    position: "absolute",
  },
  componentstopNavigation: {
    height: 51,
    alignSelf: "stretch",
  },
  frameIcon: {
    width: 110,
    height: 108,
    marginTop: -12,
    overflow: "hidden",
  },
  frame: {
    justifyContent: "flex-end",
    overflow: "hidden",
    alignSelf: "stretch",
    alignItems: "center",
  },
  signUp1: {
    fontSize: FontSize.m3HeadlineLarge_size,
    letterSpacing: -1,
    lineHeight: 48,
    textAlign: "left",
    color: Color.colorTypographyContentIconsBlack,
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
    alignSelf: "stretch",
  },
  phoneNumber: {
    color: Color.neutral07,
    alignSelf: "stretch",
  },
  fullNameInput: {
    flexDirection: "row",
    alignSelf: "stretch",
  },
  fullNameInputWrapper: {
    borderRadius: Border.br_5xs,
    backgroundColor: Color.colorInputDefault,
    marginTop: 8,
    justifyContent: "center",
    padding: Padding.p_xs,
    alignSelf: "stretch",
  },
  componentsinputField: {
    alignSelf: "stretch",
  },
  image2354Icon: {
    borderRadius: Border.br_181xl,
  },
  text: {
    marginLeft: 8,
    fontSize: FontSize.m3LabelLarge_size,
    letterSpacing: -0.1,
    textAlign: "left",
    color: Color.colorTypographyContentIconsBlack,
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
  },
  leftNumberChild: {
    display: "none",
  },
  leftNumber: {
    flexDirection: "row",
    alignItems: "center",
  },
  mr: {
    color: Color.colorTypographyContentIconsBlack,
    lineHeight: 24,
  },
  leftName: {
    display: "none",
    flexDirection: "row",
    alignItems: "center",
  },
  rightChild: {
    borderRadius: Border.br_11xs,
    backgroundColor: Color.colorMediumslateblue,
    height: 20,
    display: "none",
    flex: 1,
  },
  phoneNumber3: {
    marginLeft: 1,
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
    flex: 1,
  },
  right: {
    paddingLeft: Padding.p_3xs,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  leftNumberParent: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  leftNumber1: {
    display: "none",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  leftName1: {
    display: "none",
  },
  passwordInput: {
    fontSize: FontSize.m3LabelLarge_size,
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
  },
  leftNumberGroup: {
    flexDirection: "row",
    alignSelf: "stretch",
  },
  componentsinputFieldParent: {
    marginTop: 24,
    alignSelf: "stretch",
  },
  content: {
    justifyContent: "center",
    alignSelf: "stretch",
  },
  signIn1: {
    color: Color.white,
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    letterSpacing: -0.1,
    fontSize: FontSize.body1Semibold_size,
    textAlign: "center",
  },
  signUpButton: {
    borderRadius: Border.br_xs,
    backgroundColor: Color.colorDarkslateblue_100,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_xs,
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  bySigningUp: {
    fontFamily: FontFamily.m3BodySmall,
    color: Color.colorBlack,
  },
  termsOfService: {
    color: Color.colorDarkslateblue_100,
  },
  text2: {
    fontWeight: "500",
    fontFamily: FontFamily.m3LabelLarge,
  },
  privacyPolicy: {
    color: Color.colorDarkslateblue_100,
  },
  bySigningUpContainer: {
    letterSpacing: 1,
    fontSize: FontSize.bodyLgBodyLgRegular_size,
  },
  bySigningUpYouAgreeToOuWrapper: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  alreadyHaveAn: {
    width: 275,
    lineHeight: 16,
    textAlign: "center",
    letterSpacing: -0.1,
  },
  signIn3: {
    fontSize: FontSize.level2Medium12_size,
    color: Color.colorDarkslateblue_100,
  },
  text3: {
    width: 173,
  },
  signIn2: {
    marginLeft: -116,
  },
  alreadyHaveAnAccountParent: {
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  frame1: {
    alignItems: "center",
  },
  signUpButtonParent: {
    marginTop: 39,
    justifyContent: "center",
    alignSelf: "stretch",
    alignItems: "center",
  },
  signIn: {
    justifyContent: "center",
    flex: 1,
  },
  signInWrapper: {
    paddingHorizontal: Padding.p_lg,
    paddingTop: Padding.p_3xs,
    paddingBottom: Padding.p_6xl,
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  body: {
    alignSelf: "stretch",
    flex: 1,
    backgroundColor: Color.white,
  },
  signUp: {
    height: 812,
    alignItems: "center",
    width: "100%",
    flex: 1,
    backgroundColor: Color.white,
  },
  leftNumber: {
    marginLeft: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconEyeEmpty: {
    width: 20,
    height: 17,
  },
});

export default SignUp;
