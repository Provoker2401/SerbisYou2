import * as React from "react";
import { useState, useEffect, useRef} from "react";
import { Image } from "expo-image";
import { StatusBar, StyleSheet, Text, View, TextInput, Pressable, ActivityIndicator, Alert} from "react-native";
import { FontSize, FontFamily, Padding, Border, Color } from "../GlobalStyles";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import {
  getAuth,
  onAuthStateChanged,
  PhoneAuthProvider,
  signInWithCredential,
  linkWithCredential,
} from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, getDoc, getDocs,setDoc, query, where, collection, addDoc } from "firebase/firestore";
import Toast from 'react-native-toast-message';
// import * as FirebaseRecaptcha from "expo-firebase-recaptcha";


const firebaseConfig = {
  apiKey: "AIzaSyDWQablgpC3ElsqOQuVhQU2YFsri1VmCss",
  authDomain: "testingauth-9126f.firebaseapp.com",
  projectId: "testingauth-9126f",
  storageBucket: "testingauth-9126f.appspot.com",
  messagingSenderId: "211063140592",
  appId: "1:211063140592:web:6d7047e844df66f1565235"
};

try {
  if (firebaseConfig.apiKey) {
    initializeApp(firebaseConfig);
  }
} catch (err) {
  // Ignore app already initialized error on snack
}

const Authentication = ({route}) => {
  const { name, email, phone, verificationId, userUid } = route.params;
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState(""); // Add user email state
  const [resendTimer, setResendTimer] = useState(20);
  const recaptchaVerifier = useRef(null);
  const verificationCodeTextInput = useRef(null);
  const [userPhone, setUserPhone] = useState("");
  // const [userPhone, setUserPhone] = useState('');
  // const [verificationId, setVerificationId] = useState("");
  const [verifyError, setVerifyError] = useState();
  const [verifyInProgress, setVerifyInProgress] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmError, setConfirmError] = useState();
  const [confirmInProgress, setConfirmInProgress] = useState(false);
  const [isUserDataFetched, setIsUserDataFetched] = useState(false);

  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(60); // 60 seconds countdown

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((currentTimer) => {
        if (currentTimer <= 1) {
          clearInterval(interval);
          return 0; // Stop the countdown
        } else {
          return currentTimer - 1;
        }
      });
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (authUser) => {
  //     console.log('Old Auth', authUser);
  //     console.log('Old Email', email);
  //     console.log('Old Password', password);
  //     if (authUser.email) {
  //       // User is signed in
  //       setUser(auth);
        

  //       // Fetch the user's profile information
  //       fetchUserProfile(authUser.email);
  //     } else {
  //       // User is signed out
  //       setUser(null);
  //     }
  //   });

  //   return () => {
  //     // Clean up the subscription when the component unmounts
  //     unsubscribe();
  //   };
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (authUser) => {
  //     console.log('Old Auth', authUser);
  //     console.log('Old Email', email);
  //     console.log('Old Password', password);
  //     if (authUser && authUser.email && !isUserDataFetched) {
  //       // User is signed in
  //       setUser(auth);
  //       // Fetch the user's profile information only if it hasn't been fetched
  //       fetchUserProfile(authUser.email);
  //       setIsUserDataFetched(true);
  //     } else if (!authUser) {
  //       // Reset states if user is signed out
  //       setUser(null);
  //       setIsUserDataFetched(false);
  //     }
  //   });
  
  //   return () => unsubscribe();
  // }, [isUserDataFetched]);

  // const fetchUserProfile = async (userEmail) => {
  //   const db = getFirestore();
  //   const userProfileCollection = collection(db, 'userProfiles');
  //   console.log('Auth Email', userEmail);

  //   // Create a query to find the user based on their email
  //   const q = query(userProfileCollection, where('email', '==', userEmail));

  //   try {
  //     const querySnapshot = await getDocs(q);

  //     if (!querySnapshot.empty) {
  //       // Assuming there's only one user with the same email, retrieve the first document
  //       const userProfile = querySnapshot.docs[0].data();

  //       // Now you have the user's additional information
  //       const { name, phone, email } = userProfile;

  //       console.log('User Profile', userProfile);
  //       console.log('Auth Name', name);
  //       console.log('Auth Phone', phone);
  //       // Set the user's name and phone in the state
  //       setUserEmail(email);
  //       setUserName(name);
  //       setUserPhone(phone);
  //     } else {
  //       console.log('User profile not found.');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user profile:', error);
  //   }
  // };


  // const handleConfirmVerificationCode = async () => {
  //   try {
  //     const auth = getAuth();
  //     setConfirmError(undefined);
  //     setConfirmInProgress(true);
  //     console.log('Verification ID', verificationId);
  //     console.log('Verification Code', verificationCode);

  //     if (!verificationId || !verificationCode) {
  //       throw new Error("Verification ID and code are required.");
  //     }
  //     // const auth = getAuth();

  //     const credential = PhoneAuthProvider.credential(
  //       verificationId,
  //       verificationCode
  //     );
  //     console.log("Credential", credential);
  //     console.log("Auth", auth);
  //     // console.log("User", user);

  //     const authResult = await signInWithCredential(auth, credential);
  //     console.log("Signing in with credential", authResult);

  //     // Fetch the currently signed-in user
  //     const currentUser = auth.currentUser;
  //     console.log("Current User", currentUser);
  //     console.log("Current User Email", currentUser.email);

  //     console.log("AuthResult User", authResult.user);
  //     console.log("AuthResult User Email", authResult.user.email);

  //     // Check if the signed-in user matches the expected email
  //     if (authResult.user.email) {
  //       setUser(authResult.user);
  //       // Since the user has been signed in, fetchUserProfile will be called by useEffect
  //     } else {
  //       throw new Error("Sign-in failed or no email associated with this user.");
  //     }

  //     // console.log("Email: ", email);
  //     // console.log("Password: ", password);

  //     setVerificationCode("");
  //     setConfirmInProgress(false);
  //     navigation.navigate("BottomTabsRoot", { screen: "Homepage" });
  //     // If an email is provided, link it to the account
  //     // if (email && password) {
  //     //   const emailCredential = EmailAuthProvider.credential(email, password);
  //     //   const linkResult = await linkWithCredential(authResult.user, emailCredential);
  //     //   console.log("Email linked to phone auth user:", linkResult);
  //     // }

  //   } catch (err) {
  //     console.error(err);
  //     setConfirmError(err);
  //     setConfirmInProgress(false);
  //   }
  // };
  const handleConfirmVerificationCode = async () => {
    try {
      if (timer === 0) {
        Alert.alert("Error", "Verification code has expired. Please request a new code.");
        // navigation.goBack(); // Navigate back to send code screen
        return;
      }

      const auth = getAuth();
      setConfirmError(undefined);
      setConfirmInProgress(true);
      console.log('Verification ID', verificationId);
      console.log('Verification Code', verificationCode);

      if (!verificationId || !verificationCode) {
        throw new Error("Verification ID and code are required.");
      }
      // const auth = getAuth();

      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      console.log("Credential", credential);
      console.log("Auth", auth);
      // console.log("User", user);

      const currentUser = auth.currentUser;
      console.log("Current User", auth.currentUser);
      console.log("Current User Email", auth.currentUser.email);

      // If there's already a user signed in, link the phone number
      if (auth.currentUser) {
        const linkResult = await linkWithCredential(auth.currentUser, credential);
        console.log("Credential Linked: ", linkResult);
      } else {
        // No user signed in, so sign in with the phone credential
        const authResult = await signInWithCredential(auth, credential);
        console.log("Signing in with credential", authResult);
      }

      // Initialize Firestore and reference the 'userProfiles' collection
      const db = getFirestore();
      const userDocRef = doc(db, 'userProfiles', userUid);
    
      // Check if a document with the same UID already exists
      const userDoc = await getDoc(userDocRef);
    
      if (userDoc.exists()) {
        // User signed up successfully, but a document with the same UID already exists
        console.log('A user with this UID already exists');
        // Handle this case as needed
        return;
      }
    
      // Save user data to Firestore using the UID as the document ID
      await setDoc(userDocRef, {
        name: name,
        email: email,
        phone: `+63${phone}`,
      });
      
      // Create subcollections for activeBookings and historyBookings
      const activeBookingsRef = collection(db, 'serviceBookings', userUid, "activeBookings");
      const historyBookingsRef = collection(db, 'serviceBookings', userUid, "historyBookings");

      // const activeBookings = collection(userBookingsRef, "activeBookings"); 
      await addDoc(activeBookingsRef, {});

      // const historyBookings = collection(userBookingsRef, "historyBookings"); 
      await addDoc(historyBookingsRef, {});
      // console.log("Authentication Current User: ", signUpAuth);

      // Fetch the currently signed-in user
      // console.log("AuthResult User", authResult.user);
      // console.log("AuthResult User Email", authResult.user.email);

      // Check if the signed-in user matches the expected email
      // if (auth) {
      //   // setUser(authResult.user);
      //   // const linkResult = await linkWithCredential(auth, credential);
      //   console.log("Phone number linked to user:", linkResult);
      //   // Since the user has been signed in, fetchUserProfile will be called by useEffect
      // } else {
      //   throw new Error("Sign-in failed or no email associated with this user.");
      // }

      // console.log("Email: ", email);
      // console.log("Password: ", password);

      setVerificationCode("");
      setConfirmInProgress(false);

      // User signed up successfully
      console.log('Account is now authenticated!');

      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Account Authentication Successful',
        text2: 'You have successfully authenticated your account✅',
        visibilityTime: 3000,
      });

      navigation.navigate("SignIn");
      // If an email is provided, link it to the account
      // if (email && password) {
      //   const emailCredential = EmailAuthProvider.credential(email, password);
      //   const linkResult = await linkWithCredential(authResult.user, emailCredential);
      //   console.log("Email linked to phone auth user:", linkResult);
      // }

    } catch (err) {
      console.error(err);
      setConfirmError(err);
      setConfirmInProgress(false);
    }
  };

  return (
    <View style={[styles.authentication, styles.frameFlexBox]}>
      {/* <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      /> */}
      <View style={[styles.frame, styles.frameFlexBox]}>

        <StatusBar barStyle="default" />
        {/* <View style={styles.statusBarLight}>
          <Image
            style={styles.icons}
            contentFit="cover"
            source={require("../assets/icons.png")}
          />
          <Text style={styles.time}>9:41</Text>
        </View> */}
        <View style={[styles.frame1, styles.frameFlexBox]}>
          <View style={[styles.body, styles.frameFlexBox]}>
            <View style={[styles.body, styles.frameFlexBox]}>
              <View style={styles.frameFlexBox}>
                <View style={styles.frame3}>
                  <Text
                    style={styles.authentication1}
                  >{`    Authentication `}</Text>
                  <Text style={styles.weveSentA}>{`We’ve sent a code to the phone number provided.
Enter the code in that message to continue.`}</Text>
                  <View style={[styles.otpframe, styles.frameFlexBox]}>
                    <OTPInputView
                      autoFocusOnLoad
                      style={styles.otpInput}
                      pinCount={6}
                      editable
                      codeInputFieldStyle={styles.codeInputField}
                      codeInputHighlightStyle={styles.underlineStyleHighLighted}
                      onCodeChanged={setVerificationCode}
                    />
                  </View>
                  <Text style={styles.weveSentA}>Entered OTP: {verificationCode}</Text>
                  {/* <View style={styles.code1Parent}>
                    <TextInput
                      style={[styles.code1, styles.codeFlexBox]}
                      keyboardType="number-pad"
                      autoCapitalize="none"
                      placeholderTextColor="#1a1d1f"
                    />
                    <TextInput
                      style={[styles.code2, styles.codeFlexBox]}
                      keyboardType="number-pad"
                      autoCapitalize="none"
                      placeholderTextColor="#1a1d1f"
                    />
                    <TextInput
                      style={[styles.code2, styles.codeFlexBox]}
                      keyboardType="number-pad"
                      autoCapitalize="none"
                      placeholderTextColor="#1a1d1f"
                    />
                    <TextInput
                      style={[styles.code2, styles.codeFlexBox]}
                      keyboardType="number-pad"
                      autoCapitalize="none"
                      placeholderTextColor="#1a1d1f"
                    />
                    <TextInput
                      style={[styles.code2, styles.codeFlexBox]}
                      keyboardType="number-pad"
                      autoCapitalize="none"
                      placeholderTextColor="#1a1d1f"
                    />
                    <TextInput
                      style={[styles.code2, styles.codeFlexBox]}
                      keyboardType="number-pad"
                      autoCapitalize="none"
                      placeholderTextColor="#1a1d1f"
                    />
                  </View> */}
                </View>
              </View>
              {/* <View
                style={[styles.group34600buttonprimary, styles.frameFlexBox]}
              >
                <Pressable style={styles.componentsbutton}           
                onPress={async () => {
                  const phoneProvider = new PhoneAuthProvider(auth);
                  try {
                    setVerifyError(undefined);
                    setVerifyInProgress(true);
                    const verificationId = await phoneProvider.verifyPhoneNumber(
                      userPhone,
                      recaptchaVerifier.current
                    );
                    setVerifyInProgress(false);
                    setVerificationId(verificationId);
                    verificationCodeTextInput.current?.focus();
                  } catch (err) {
                    setVerifyError(err);
                    setVerifyInProgress(false);
                  }
                }}>
                  <Text style={styles.signIn}>Send Code</Text>
                </Pressable>
              </View>
              <View style={styles.statusContainer}>
                {verifyError && (
                  <Text style={styles.error}>{`Error: ${verifyError.message}`}</Text>
                )}
                {verifyInProgress && <ActivityIndicator style={styles.loader} />}
                {verificationId ? (
                  <Text style={styles.success}>
                    A verification code has been sent to your phone
                  </Text>
                ) : undefined}
              </View> */}
              <View
                style={[styles.verifyframe, styles.frameFlexBox]}
              >
                <Pressable style={styles.componentsbutton} onPress={handleConfirmVerificationCode}>
                  <Text style={styles.signIn}>Verify</Text>
                </Pressable>
                {confirmError && (
                  <Text style={styles.error}>{`Error: ${confirmError.message}`}</Text>
                )}
                {confirmInProgress && <ActivityIndicator style={styles.loader} />}
              </View>
            </View>
            <View style={[styles.group34600reSendCodeIn0, styles.frameFlexBox]}>
              <Text
                style={[styles.didntReceiveCode, styles.codeTypo]}
              >{`Didn’t receive code? `}</Text>
              <Text style={[styles.resendCode, styles.codeTypo]}>
                Resend code
              </Text>
            </View>
            <View style={[styles.group34600reSendCodeIn0, styles.frameFlexBox]}>
              {timer > 0 && <Text>Time remaining to enter the code: {timer} seconds</Text>}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  codeFlexBox: {
    fontSize: FontSize.size_19xl,
    fontFamily: FontFamily.level2Semibold12,
    paddingHorizontal: Padding.p_5xs,
    height: 64,
    paddingVertical: Padding.p_xs,
    borderRadius: Border.br_xs,
    flexDirection: "row",
    fontWeight: "600",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    flex: 1,
  },
  codeTypo: {
    lineHeight: 22,
    letterSpacing: -0.3,
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    fontFamily: FontFamily.level2Medium12,
    fontWeight: "500",
    textAlign: "center",
  },
  icons: {
    top: 18,
    right: 14,
    width: 67,
    height: 11,
    position: "absolute",
  },
  time: {
    marginTop: -8,
    top: "50%",
    left: 32,
    letterSpacing: 0,
    lineHeight: 20,
    fontFamily: FontFamily.robotoBold,
    color: Color.colorBlack,
    textAlign: "left",
    fontWeight: "600",
    fontSize: FontSize.body1Semibold_size,
    position: "absolute",
  },
  statusBarLight: {
    width: 375,
    height: 44,
    backgroundColor: Color.white,
  },
  authentication1: {
    fontSize: FontSize.m3HeadlineLarge_size,
    letterSpacing: -1,
    lineHeight: 41,
    color: Color.neutral07,
    textAlign: "center",
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    alignSelf: "stretch",
  },
  code1: {
    backgroundColor: Color.neutral01,
    borderStyle: "solid",
    borderColor: Color.neutralShades0475,
    borderWidth: 2,
  },
  code2: {
    backgroundColor: Color.neutral03,
    marginLeft: 10,
  },
  code1Parent: {
    marginTop: 81,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  frame3: {
    zIndex: 0,
    width: 335,
    justifyContent: "center",
    alignItems: "center",
  },
  weveSentA: {
    marginTop: 10,
    fontSize: FontSize.m3LabelLarge_size,
    letterSpacing: -0.1,
    lineHeight: 24,
    color: Color.colorTypographyContentIconsBlack02,
    textAlign: "center",
    fontFamily: FontFamily.level2Medium12,
    fontWeight: "500",
    alignSelf: "stretch",
  },
  otpInput: {
    width: "90%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  codeInputField: {
    // marginTop: -20,
    fontFamily: "Inter-Bold",
    fontWeight: "semibold",
    width: 45,
    height: 64,
    // borderWidth: 0,
    // borderBottomWidth: 0,
    // borderColor: "gray",
    backgroundColor: Color.neutral03,
    borderRadius: 10,
    color: "black",
    textAlign: "center",
    fontSize: 40,
    // marginHorizontal: -30,
  },
  underlineStyleHighLighted: {
    borderColor: Color.neutralShades0475,
    backgroundColor: Color.neutral01,
  },
  signIn: {
    color: Color.white,
    lineHeight: 24,
    letterSpacing: -0.1,
    textAlign: "center",
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    fontSize: FontSize.body1Semibold_size,
    flex: 1,
  },
  componentsbutton: {
    backgroundColor: Color.colorDarkslateblue_200,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_xs,
    borderRadius: Border.br_xs,
    flexDirection: "row",
    width: 335,
    justifyContent: "center",
    alignItems: "center",
  },
  group34600buttonprimary: {
    marginTop: 60,
    flexDirection: "row",
  },
  verifyframe: {
    marginTop: 60,
    flexDirection: "column",
  },
  otpframe: {
    paddingVertical: Padding.p_5xs,
    // paddingHorizontal: Padding.title3Bold20_size,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  statusContainer: {
    marginTop: 20,
  },
  loader: {
    marginTop: 10,
  },
  success: {
    color: "green",
    fontSize: 14,
  },
  error: {
    color: "red",
    fontSize: 14,
  },
  body: {
    alignSelf: "stretch",
  },
  didntReceiveCode: {
    color: Color.colorGray_1100,
  },
  resendCode: {
    color: Color.colorSteelblue_100,
    marginLeft: 10,
  },
  group34600reSendCodeIn0: {
    paddingHorizontal: Padding.p_10xs,
    paddingVertical: Padding.p_12xs,
    marginTop: 24,
    flexDirection: "row",
  },
  frame1: {
    alignSelf: "stretch",
    flex: 1,
    alignItems: "center",
  },
  frame: {
    alignSelf: "stretch",
    overflow: "hidden",
    alignItems: "center",
    flex: 1,
  },
  authentication: {
    width: "100%",
    height: 812,
    overflow: "hidden",
    alignItems: "center",
    flex: 1,
    backgroundColor: Color.white,
  },
});

export default Authentication;
