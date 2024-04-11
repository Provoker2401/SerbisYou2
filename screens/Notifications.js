import * as React from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { Color, Padding, FontFamily, FontSize, Border } from "../GlobalStyles";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  onSnapshot
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Notifications = () => {

  const db = getFirestore();
  const auth = getAuth();
  const [notifications, setNotifications] = useState([]);

  const userAuth = auth.currentUser.uid;

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const userDocRef = doc(db, "userProfiles", userAuth);

        // Reference to the notifications collection within the user's document
        const notificationsCollectionRef = collection(
          userDocRef,
          "notifications"
        );

        // Set up a real-time listener for the notifications collection
        const unsubscribe = onSnapshot(notificationsCollectionRef, (snapshot) => {
          const notificationsData = [];

          // Iterate over each document in the notifications collection
          snapshot.forEach((doc) => {
            console.log("Notification Document ID:", doc.id);
            console.log("Notification Document Data:", doc.data());

            notificationsData.push({
              id: doc.id,
              data: doc.data(),
            });
          });

          // Update the state with the new notifications data
          setNotifications(notificationsData);
        });

        // Return a cleanup function to unsubscribe from the listener when component unmounts
        return () => unsubscribe();
      } catch (error) {
        console.log("Error fetching notifications:", error);
      }
    };

    getNotifications();
  }, []);



  return (
    <View style={styles.notifications}>
      <StatusBar barStyle="default" />

      <View style={styles.notification}>
        <View style={styles.tag} />
        <Text style={styles.notification1}>Notification</Text>
      </View>
      <ScrollView
        style={styles.body}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.bodyScrollViewContent}
      >
        {notifications?.length === 0 ? (
          <View
          style={[styles.noNotifications, styles.noNotificationsSpaceBlock]}
          >
            <View style={styles.viewParentFlexBox}>
              <Image
                style={styles.frameItem}
                contentFit="cover"
                source={require("../assets/frame-34615.png")}
              />
              <View
                style={[styles.noNotificationsParent, styles.viewParentFlexBox]}
              >
                <Text style={styles.noNotifications1}>No Notifications!</Text>
                <View
                  style={[
                    styles.youDontHaveAnyNotificatioWrapper,
                    styles.navigationBarHomeFlexBox,
                  ]}
                >
                  <Text style={[styles.youDontHave, styles.youDontHaveLayout]}>
                    You don’t have any notification yet. Please place order
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={[styles.viewAllServicesBtnWrapper, styles.viewParentFlexBox]}
            >
              <Pressable style={styles.viewAllServicesBtn}>
                <Text style={[styles.viewAllServices, styles.youDontHaveLayout]}>
                  View all services
                </Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.bodyInner}>
            {notifications.map((notification) => (
              <View
                key={notification.id}
                style={[styles.frameParent, styles.frameParentFlexBox]}
              >
                <View style={[styles.yesterdayWrapper, styles.orderSpaceBlock]}>
                  <Text style={[styles.today, styles.todayFlexBox]}>
                    {notification.id} {/* Display notification date */}
                  </Text>
                </View>
                {Object.keys(notification.data).map((key) => (
                  <View
                    key={key}
                    style={[styles.orderCanceled, styles.orderSpaceBlock]}
                  >
                    <View style={[styles.iconWrapper, styles.frameParentFlexBox]}>
                      <Image
                        style={styles.iconLayout1}
                        contentFit="cover"
                        source={require("../assets/icon13.png")}
                      />
                    </View>
                    <View style={styles.bookingAcceptedParent}>
                      <Text style={[styles.bookingAccepted, styles.todayFlexBox]}>
                        {notification.data[key].title}{" "}
                        {/* Display notification title */}
                      </Text>
                      <Text style={styles.yourBookingWas}>
                        {notification.data[key].subTitle}{" "}
                        {/* Display notification subtitle */}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // No Notification styles
  noNotifications: {
    paddingVertical: 135,
    marginTop: 15,
    borderRadius: Border.br_5xs,
    justifyContent: "center",
    alignSelf: "stretch",
    backgroundColor: Color.white,
  },
  noNotifications1: {
    lineHeight: 26,
    textAlign: "center",
    color: Color.neutral07,
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    fontSize: FontSize.title3Bold20_size,
  },
  noNotificationsSpaceBlock: {
    paddingHorizontal: Padding.p_xl,
    alignItems: "center",
  },
  viewParentFlexBox: {
    alignItems: "center",
    alignSelf: "stretch",
  },
  frameItem: {
    height: 95,
    width: 90,
  },
  noNotificationsParent: {
    marginTop: 32,
    overflow: "hidden",
  },
  youDontHaveAnyNotificatioWrapper: {
    marginTop: 10,
    paddingHorizontal: Padding.p_xl,
    alignItems: "center",
  },
  navigationBarHomeFlexBox: {
    paddingVertical: 0,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  youDontHave: {
    fontSize: FontSize.m3LabelLarge_size,
    color: "#b0b0b0",
    fontFamily: FontFamily.level2Medium12,
    fontWeight: "500",
    flex: 1,
  },
  youDontHaveLayout: {
    lineHeight: 24,
    letterSpacing: -0.1,
    textAlign: "center",
  },
  viewAllServicesBtnWrapper: {
    marginTop: 40,
    justifyContent: "center",
  },
  viewAllServicesBtn: {
    backgroundColor: Color.colorDarkslategray_900,
    paddingHorizontal: Padding.p_3xl,
    paddingVertical: Padding.p_xs,
    borderRadius: Border.br_5xs,
    flexDirection: "row",
  },
  viewAllServices: {
    fontSize: FontSize.body1Semibold_size,
    color: Color.neutral01,
    width: 122,
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    lineHeight: 24,
    letterSpacing: -0.1,
  },



  header: {
    backgroundColor: "#1a244d",
  },
  bodyScrollViewContent: {
    flexDirection: "column",
    paddingHorizontal: 0,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  locationWrapperFlexBox: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  currentLocationFlexBox: {
    textAlign: "right",
    color: Color.white,
    flex: 1,
  },
  iconLayout1: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    alignSelf: "stretch",
    width: "100%",
    flex: 1,
  },
  frameParentFlexBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  todayFlexBox: {
    color: Color.colorGray90,
    textAlign: "left",
    alignSelf: "stretch",
  },
  orderSpaceBlock: {
    marginTop: 8,
    alignSelf: "stretch",
  },
  tripleSpaceBlock: {
    paddingVertical: Padding.p_9xs,
    paddingHorizontal: Padding.p_5xs,
    marginLeft: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  frameLayout: {
    height: 2,
    width: 2,
  },
  labelTypo: {
    marginTop: 4,
    textAlign: "center",
    fontFamily: FontFamily.m3LabelLarge,
    lineHeight: 16,
    letterSpacing: 1,
    fontSize: FontSize.level2Medium12_size,
    fontWeight: "500",
    alignSelf: "stretch",
  },
  segmentSpaceBlock: {
    opacity: 0.8,
    paddingBottom: Padding.p_base,
    paddingTop: Padding.p_xs,
    width: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainerFlexBox: {
    borderRadius: Border.br_base,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  iconLayout: {
    height: 30,
    width: 26,
    overflow: "hidden",
  },
  tag: {
    borderRadius: Border.br_9xs,
    backgroundColor: Color.colorSteelblue_100,
    width: 4,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  notification1: {
    fontSize: FontSize.size_5xl,
    letterSpacing: -0.5,
    color: Color.neutral07,
    marginLeft: 10,
    textAlign: "left",
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    flex: 1,
  },
  recent: {
    letterSpacing: -0.2,
    lineHeight: 17,
    color: Color.colorSteelblue_100,
    fontSize: FontSize.level2Medium12_size,
    fontFamily: FontFamily.level2Medium12,
    fontWeight: "500",
    textAlign: "left",
  },
  iconOutline: {
    marginLeft: 4,
  },
  recentBtn: {
    paddingHorizontal: Padding.p_3xs,
    borderRadius: Border.br_81xl,
    alignItems: "flex-end",
    paddingVertical: Padding.p_5xs,
    flexDirection: "row",
    alignSelf: "stretch",
    backgroundColor: Color.white,
  },
  right: {
    width: 77,
    marginLeft: 10,
    alignItems: "flex-end",
  },
  notification: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_base,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  today: {
    fontSize: FontSize.title4Regular18_size,
    letterSpacing: 0.9,
    fontWeight: "600",
    fontFamily: FontFamily.georamaSemiBold,
  },
  todayWrapper: {
    paddingBottom: Padding.p_3xs,
    alignSelf: "stretch",
  },
  iconWrapper: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorWhitesmoke_600,
    width: 34,
    height: 34,
    padding: Padding.p_6xs,
    justifyContent: "center",
    flexDirection: "row",
  },
  bookingAccepted: {
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    fontFamily: FontFamily.typographyParagraphSmallMedium,
    fontWeight: "500",
    color: Color.colorGray90,
  },
  yourBookingWas: {
    fontFamily: FontFamily.typographyTaglineSmallRegular,
    color: Color.colorGray60,
    marginTop: 2,
    fontSize: FontSize.typographyTaglineSmallRegular_size,
    textAlign: "left",
    alignSelf: "stretch",
  },
  bookingAcceptedParent: {
    marginLeft: 16,
    justifyContent: "center",
    flex: 1,
  },
  frameInner: {
    marginTop: 2,
  },
  ellipseParent: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  tripleDotBtn: {
    overflow: "hidden",
  },
  orderAccepted: {
    padding: Padding.p_xs,
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Color.colorLightskyblue,
  },
  yesterdayWrapper: {
    paddingVertical: Padding.p_3xs,
    marginTop: 8,
    paddingHorizontal: 0,
  },
  orderCanceled: {
    padding: Padding.p_xs,
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Color.white,
  },
  frameParent: {
    justifyContent: "center",
    alignSelf: "stretch",
  },
  bodyInner: {
    marginTop: -15,
    // marginTop: 15,
    // paddingVertical: 0,
    paddingHorizontal: Padding.p_base,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  body: {
    alignSelf: "stretch",
    flex: 1,
  },
  notifications: {
    height: 812,
    width: "100%",
    flex: 1,
    backgroundColor: Color.white,
  },
});

export default Notifications;



