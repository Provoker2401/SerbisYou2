import * as React from "react";
import {
  StatusBar,
  StyleSheet,
  Pressable,
  View,
  Text,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { Color, FontSize, FontFamily, Padding, Border } from "../GlobalStyles";

const PrivacyPolicy = () => {
  return (
    <View style={styles.privacyPolicy}>
      <StatusBar barStyle="default" />
      <ScrollView
        style={styles.body}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.bodyScrollViewContent}
      >
        <View style={[styles.frameParent, styles.frameParentSpaceBlock]}>
          <View
            style={[styles.typesOfDataWeCollectParent, styles.parentFlexBox]}
          >
            <Text
              style={[styles.typesOfData, styles.typesOfDataClr]}
              testID="privacy-policy-text"
            >
              1. Types of Data We Collect
            </Text>
            <Text style={[styles.policy1Description, styles.typesOfDataClr]}>
              We collect a range of data to provide you with the best experience
              on our home service mobile app. This includes personal information
              like your name and contact details, location data to connect you
              with local service providers, usage information to understand how
              you use the app, device information for compatibility, payment
              details for transactions, communication data for app-related
              messages, and user-generated content such as reviews or images you
              share. Rest assured, we prioritize the security and privacy of
              your data at all times.
            </Text>
          </View>
          <View
            style={[styles.useOfYourPersonalDataParent, styles.parentFlexBox]}
          >
            <Text
              style={[styles.typesOfData, styles.typesOfDataClr]}
              testID="personal-data-title"
            >
              2. Use of Your Personal Data
            </Text>
            <Text style={[styles.policy1Description, styles.typesOfDataClr]}>
              Your personal data is employed to ensure seamless services on our
              home service app. This involves utilizing the information you
              provide to offer and personalize services according to your
              preferences, communicating updates and notifications, enhancing
              the app through analysis of user behavior, and meeting legal
              obligations when necessary. We respect your privacy and strive to
              offer you a tailored and secure experience.
            </Text>
          </View>
          <View
            style={[styles.useOfYourPersonalDataParent, styles.parentFlexBox]}
          >
            <Text
              style={[styles.typesOfData, styles.typesOfDataClr]}
              testID="data-disclosure-title"
            >
              3. Disclosure of your Personal Data
            </Text>
            <Text
              style={[styles.policy1Description, styles.typesOfDataClr]}
              testID="data-disclosure-description"
            >
              We understand the importance of safeguarding your data. While we
              may share your data with trusted service providers for essential
              app operations such as hosting and analytics, rest assured that
              your data is never sold or shared for marketing purposes. In
              situations where legal compliance or partnerships necessitate data
              sharing, we ensure stringent measures to protect your information.
              Additionally, in the event of any change in ownership or business
              structure, we commit to upholding the security of your data
              throughout the transition.
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.navigationBarHome, styles.frameParentSpaceBlock]}>
        <View style={styles.segment1}>
          <View style={styles.iconContainerFlexBox}>
            <View style={styles.stateFlexBox}>
              <Image
                style={styles.iconLayout}
                contentFit="cover"
                source={require("../assets/icon1.png")}
              />
            </View>
          </View>
          <Text style={[styles.labelText, styles.labelTypo]}>Home</Text>
        </View>
        <View style={[styles.segment2, styles.segmentSpaceBlock]}>
          <View style={styles.iconContainerFlexBox}>
            <View style={styles.stateFlexBox}>
              <Image
                style={styles.icon2}
                contentFit="cover"
                source={require("../assets/icon2.png")}
              />
            </View>
          </View>
          <Text style={[styles.labelText1, styles.labelTypo]}>Bookings</Text>
        </View>
        <View style={styles.segmentSpaceBlock}>
          <View style={styles.iconContainerFlexBox}>
            <View style={styles.stateFlexBox}>
              <Image
                style={styles.iconLayout}
                contentFit="cover"
                source={require("../assets/icon3.png")}
              />
            </View>
          </View>
          <Text style={[styles.labelText1, styles.labelTypo]}>
            Notifications
          </Text>
        </View>
        <View style={styles.segment1}>
          <View style={[styles.iconContainer3, styles.iconContainerFlexBox]}>
            <View style={styles.stateFlexBox}>
              <Image
                style={[styles.icon4, styles.iconLayout]}
                contentFit="cover"
                source={require("../assets/icon4.png")}
              />
              <View style={styles.badge}>
                <Text style={styles.badgeLabel}>3</Text>
              </View>
            </View>
          </View>
          <Text style={[styles.labelText3, styles.labelTypo]}>Account</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1a244d",
  },
  bodyScrollViewContent: {
    flexDirection: "column",
    paddingHorizontal: 0,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  parentFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  frameParentSpaceBlock: {
    paddingVertical: 0,
    alignSelf: "stretch",
  },
  typesOfDataClr: {
    color: Color.colorGray_1000,
    alignSelf: "stretch",
  },
  labelTypo: {
    marginTop: 4,
    fontSize: FontSize.level2Medium12_size,
    fontFamily: FontFamily.m3LabelLarge,
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 1,
    textAlign: "center",
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
    justifyContent: "center",
    overflow: "hidden",
    alignItems: "center",
  },
  iconLayout: {
    height: 30,
    width: 26,
    overflow: "hidden",
  },
  typesOfData: {
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    lineHeight: 24,
    textAlign: "left",
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    color: Color.colorGray_1000,
  },
  policy1Description: {
    fontSize: FontSize.typographyTaglineSmallRegular_size,
    letterSpacing: 0,
    lineHeight: 14,
    fontFamily: FontFamily.title4Regular18,
    textAlign: "justify",
    marginTop: 10,
  },
  typesOfDataWeCollectParent: {
    alignSelf: "stretch",
  },
  useOfYourPersonalDataParent: {
    marginTop: 20,
    alignSelf: "stretch",
  },
  frameParent: {
    paddingHorizontal: Padding.p_3xl,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    backgroundColor: Color.colorWhitesmoke_100,
    alignSelf: "stretch",
    flex: 1,
  },
  stateFlexBox: {
    paddingVertical: Padding.p_9xs,
    paddingHorizontal: Padding.p_xl,
    height: 32,
    width: 64,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  labelText: {
    color: Color.colorDimgray_200,
  },
  segment1: {
    paddingBottom: Padding.p_base,
    paddingTop: Padding.p_xs,
    width: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  icon2: {
    height: 26,
    overflow: "hidden",
    width: 24,
  },
  labelText1: {
    color: Color.colorDarkslategray_100,
  },
  segment2: {
    height: 80,
  },
  icon4: {
    zIndex: 0,
  },
  badgeLabel: {
    marginTop: -7,
    marginLeft: -7,
    top: "50%",
    left: "50%",
    fontSize: FontSize.size_2xs,
    display: "flex",
    width: 14,
    height: 14,
    position: "absolute",
    fontFamily: FontFamily.m3LabelLarge,
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 1,
    textAlign: "center",
    color: Color.white,
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    top: 2,
    left: 35,
    borderRadius: Border.br_81xl,
    backgroundColor: Color.colorFirebrick_100,
    width: 12,
    height: 12,
    display: "none",
    zIndex: 1,
    position: "absolute",
    overflow: "hidden",
  },
  iconContainer3: {
    backgroundColor: Color.colorLightblue,
  },
  labelText3: {
    color: Color.colorDarkslateblue_200,
  },
  navigationBarHome: {
    borderTopLeftRadius: Border.br_9xs,
    borderTopRightRadius: Border.br_9xs,
    paddingHorizontal: Padding.p_5xs,
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: Color.white,
  },
  privacyPolicy: {
    height: 812,
    width: "100%",
    flex: 1,
    backgroundColor: Color.white,
  },
});

export default PrivacyPolicy;
