import * as React from "react";
import { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Padding, Color, FontSize, FontFamily, Border } from "../GlobalStyles";
import Toast from "react-native-toast-message";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase Authentication functions
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"; // Import Firestore functions
import messaging from '@react-native-firebase/messaging';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const eyeIconSource = showPassword
    ? require("../assets/hide-pass.png")
    : require("../assets/-icon-eye-empty.png");

  const handleSignIn = () => {
    console.log("Sign In clicked");

    const auth = getAuth(); // Get the Firebase auth instance

    console.log("Sign in Auth: ", auth);

    // Sign in the user with email and password
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const db = getFirestore(); // Get the Firestore instance
        const userProfilesRef = doc(db, "userProfiles", user.uid);
        console.log("User Credentials ", userCredential);

        try {
          const docSnapshot = await getDoc(userProfilesRef);
          if (docSnapshot.exists()) {
            const userProfileData = docSnapshot.data();
            // User's UID is found in userProfiles
            console.log("User signed in");
            Toast.show({
              type: "success",
              position: "top",
              text1: "Sign In Successful",
              text2: "You have successfully signed in✅",
              visibilityTime: 3000,
            });
            console.log("Email: ", userProfileData.email);
            console.log("Password: ", userProfileData.password);
            console.log("Phone: ", userProfileData.phone);

            const authStatus = await messaging().requestPermission();
            const enabled =
              authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
              authStatus === messaging.AuthorizationStatus.PROVISIONAL;
          
            if (enabled) {
              console.log('Authorization status:', authStatus);
              const fcmToken = await messaging().getToken();
              if(userProfileData.fcmToken !== fcmToken) {
                await updateDoc(userProfilesRef, {
                  fcmToken: fcmToken,
                });
                console.log("Updated fcmToken for this user: ", fcmToken);
              }else{
                console.log("fcmToken is still the same");
              }
            }

            // Continue with navigation
            navigation.navigate("BottomTabsRoot", { screen: "Homepage" });
          } else {
            // User's UID not found in providerProfiles
            console.error("User not found!");
            Toast.show({
              type: "error",
              position: "top",
              text1: "User not found❗",
              visibilityTime: 5000,
            });
          }
        } catch (error) {
          console.error("Firestore error:", error);
          Toast.show({
            type: "error",
            position: "top",
            text1: "Error while checking user profile❗",
            visibilityTime: 5000,
          });
        }
      })
      .catch((error) => {
        // Handle authentication errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Authentication error:", errorCode, errorMessage);
        Toast.show({
          type: "error",
          position: "top",
          text1: "Sign In Error",
          text2: "Wrong email or password❗",
          visibilityTime: 5000,
        });
      });
  };

  return (
    <View style={styles.signIn}>
      <StatusBar barStyle="default" />
      <ScrollView
        style={styles.body}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.bodyScrollViewContent}
      >
        <View style={[styles.serbisyoublue1Parent, styles.signIn1FlexBox]}>
          <Image
            style={styles.serbisyoublue1Icon}
            contentFit="cover"
            source={require("../assets/frame.png")}
          />
          <Text style={styles.serbisyou}>SerbisYou</Text>
        </View>
        <View style={styles.frameWrapper}>
          <View style={styles.frame}>
            <Text style={styles.welcomeBack}>Welcome back!</Text>
            <View style={[styles.signIn1, styles.signIn1FlexBox]}>
              <View style={styles.content}>
                <Text style={styles.signIn2}>Sign In</Text>
                <View style={styles.frameParent}>
                  <View style={styles.frame1}>
                    <View style={styles.content}>
                      <Text style={[styles.email, styles.emailClr]}>Email</Text>
                      <View
                        style={[
                          styles.componentsinputFieldInner,
                          styles.frameFlexBox,
                        ]}
                      >
                        <View style={styles.emailSigninInputWrapper}>
                          <TextInput
                            style={styles.emailSigninInput}
                            placeholder="email@gmail.com"
                            keyboardType="email-address"
                            placeholderTextColor="#d1d3d4"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                          />
                        </View>
                      </View>
                    </View>
                    <View style={[styles.frame2, styles.frameFlexBox]}>
                      <View style={styles.frame3}>
                        <View style={styles.componentsinputField1}>
                          <Text style={[styles.email, styles.emailClr]}>
                            Password
                          </Text>
                          <View
                            style={[
                              styles.componentsinputFieldInner,
                              styles.frameFlexBox,
                            ]}
                          >
                            <View style={styles.passwordSigninInputParent}>
                              <TextInput
                                style={styles.emailSigninInput}
                                placeholder="Password"
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
                  </View>
                  <View style={styles.frame4}>
                    <View style={[styles.frame5, styles.frameFlexBox]}>
                      <Pressable
                        style={styles.forgotPasswordWrapper}
                        onPress={() =>
                          navigation.navigate("ForgotPasswordConfirmation")
                        }
                      >
                        <Text style={[styles.forgotPassword, styles.emailClr]}>
                          Forgot password?
                        </Text>
                      </Pressable>
                    </View>
                    <View style={[styles.signInButton, styles.frameFlexBox]}>
                      <Pressable
                        style={[styles.signInButton1, styles.frameFlexBox]}
                        onPress={
                          handleSignIn
                          // () =>
                          // navigation.navigate("BottomTabsRoot", {
                          //   screen: "Homepage",
                          // })
                        }
                      >
                        <Text style={[styles.signIn3, styles.signTypo]}>
                          Sign In
                        </Text>
                      </Pressable>
                      <View style={[styles.frame6, styles.frameFlexBox]}>
                        <View
                          style={[styles.signInButton2, styles.frameFlexBox]}
                        >
                          <Image
                            style={styles.signInButtonChild}
                            contentFit="cover"
                            source={require("../assets/rectangle-4375.png")}
                          />
                          <Text style={[styles.signIn4, styles.signTypo]}>
                            Sign In
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.frameContainer, styles.frameFlexBox]}>
                    <View style={styles.frame7}>
                      <View style={styles.alreadyHaveAnAccountParent}>
                        <Text style={[styles.alreadyHaveAn, styles.text1Typo]}>
                          Create a new Account?
                        </Text>
                        <Pressable
                          style={styles.signUpAccountContainer}
                          onPress={() => navigation.navigate("SignUp")}
                        >
                          <Text style={[styles.text, styles.textLayout]}>
                            <Text style={styles.text1Typo}>{` `}</Text>
                            <Text style={[styles.signUp, styles.signUpTypo]}>
                              Sign up
                            </Text>
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
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
  signIn1FlexBox: {
    paddingTop: Padding.p_11xl,
    alignItems: "center",
    alignSelf: "stretch",
  },
  emailClr: {
    color: Color.neutral07,
    lineHeight: 24,
    letterSpacing: -0.1,
  },
  frameFlexBox: {
    justifyContent: "center",
    alignSelf: "stretch",
  },
  signTypo: {
    color: Color.white,
    lineHeight: 24,
    fontSize: FontSize.body1Semibold_size,
    letterSpacing: -0.1,
    textAlign: "center",
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
  },
  text1Typo: {
    color: Color.neutralShades0475,
    fontSize: FontSize.typographyTaglineSmallRegular_size,
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
  },
  textLayout: {
    lineHeight: 16,
    textAlign: "center",
  },
  signUpTypo: {
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
  },
  serbisyoublue1Icon: {
    width: 110,
    height: 108,
  },
  serbisyou: {
    letterSpacing: 0.8,
    color: Color.colorDarkslategray_900,
    marginTop: 10,
    textAlign: "center",
    fontSize: FontSize.m3HeadlineLarge_size,
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    alignSelf: "stretch",
  },
  serbisyoublue1Parent: {
    paddingBottom: Padding.p_3xs,
    alignItems: "center",
  },
  welcomeBack: {
    lineHeight: 25,
    color: "#787676",
    letterSpacing: -0.1,
    fontSize: FontSize.m3LabelLarge_size,
    textAlign: "center",
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    alignSelf: "stretch",
  },
  signIn2: {
    letterSpacing: -1,
    lineHeight: 48,
    color: Color.colorTypographyContentIconsBlack,
    textAlign: "left",
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
    fontSize: FontSize.m3HeadlineLarge_size,
    alignSelf: "stretch",
  },
  email: {
    fontSize: FontSize.body1Semibold_size,
    color: Color.neutral07,
    lineHeight: 24,
    textAlign: "left",
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
    alignSelf: "stretch",
  },
  emailSigninInput: {
    flexDirection: "row",
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
    fontSize: FontSize.m3LabelLarge_size,
    alignItems: "center",
    flex: 1,
  },
  emailSigninInputWrapper: {
    flexDirection: "row",
    alignSelf: "stretch",
  },
  componentsinputFieldInner: {
    borderRadius: Border.br_5xs,
    backgroundColor: Color.colorInputDefault,
    padding: Padding.p_xs,
    marginTop: 8,
  },
  content: {
    alignSelf: "stretch",
  },
  iconEyeEmpty: {
    width: 21,
    height: 17,
  },
  leftNumber: {
    marginLeft: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  passwordSigninInputParent: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
  },
  componentsinputField1: {
    flex: 1,
  },
  frame3: {
    flexDirection: "row",
    overflow: "hidden",
    alignSelf: "stretch",
  },
  frame2: {
    marginTop: 35,
    overflow: "hidden",
    alignItems: "center",
  },
  frame1: {
    justifyContent: "flex-end",
    overflow: "hidden",
    alignSelf: "stretch",
  },
  forgotPassword: {
    fontSize: FontSize.size_2xs,
    textAlign: "right",
    opacity: 0.75,
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    flex: 1,
  },
  forgotPasswordWrapper: {
    width: 95,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  frame5: {
    alignItems: "flex-end",
    overflow: "hidden",
  },
  signIn3: {
    flex: 1,
  },
  signInButton1: {
    backgroundColor: Color.colorDarkslateblue_100,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_xs,
    borderRadius: Border.br_xs,
    flexDirection: "row",
    alignItems: "center",
  },
  signInButtonChild: {
    width: 335,
    height: 48,
    zIndex: 0,
    borderRadius: Border.br_xs,
  },
  signIn4: {
    position: "absolute",
    marginTop: -12,
    marginLeft: -24,
    top: "50%",
    left: "50%",
    zIndex: 1,
  },
  signInButton2: {
    paddingHorizontal: 0,
    paddingVertical: Padding.p_12xs,
    alignItems: "center",
  },
  frame6: {
    display: "none",
    overflow: "hidden",
    alignItems: "center",
  },
  signInButton: {
    marginTop: 40,
    overflow: "hidden",
    alignItems: "center",
  },
  frame4: {
    overflow: "hidden",
    alignSelf: "stretch",
  },
  alreadyHaveAn: {
    width: 283,
    lineHeight: 16,
    textAlign: "center",
    letterSpacing: -0.1,
  },
  signUp: {
    fontSize: FontSize.level2Medium12_size,
    color: Color.colorDarkslateblue_100,
  },
  text: {
    width: 157,
  },
  signUpAccountContainer: {
    marginLeft: -116,
  },
  alreadyHaveAnAccountParent: {
    width: 332,
    flexDirection: "row",
    alignItems: "center",
  },
  frame7: {
    overflow: "hidden",
    alignItems: "center",
    alignSelf: "stretch",
  },
  frameContainer: {
    paddingTop: Padding.p_41xl,
    alignItems: "center",
  },
  frameParent: {
    paddingBottom: Padding.p_11xl,
    marginTop: 30,
    alignSelf: "stretch",
  },
  signIn1: {
    alignItems: "center",
  },
  frame: {
    alignItems: "center",
    alignSelf: "stretch",
  },
  frameWrapper: {
    paddingHorizontal: Padding.p_lg,
    paddingVertical: Padding.p_3xs,
    alignItems: "center",
    alignSelf: "stretch",
  },
  body: {
    alignSelf: "stretch",
    flex: 1,
    backgroundColor: Color.white,
  },
  signIn: {
    width: "100%",
    height: 812,
    flex: 1,
    backgroundColor: Color.white,
  },
});

export default SignIn;
