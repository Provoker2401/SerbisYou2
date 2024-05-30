import * as React from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  Text,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Padding, FontSize, Color, FontFamily, Border } from "../GlobalStyles";

const Onboarding3 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.onboarding3}>
      <StatusBar barStyle="default" />
      <ScrollView
        style={styles.body}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.bodyScrollViewContent}
      >
        <View style={styles.frame}>
          <View style={styles.frame1}>
            <View style={[styles.frameInner, styles.frameInnerPosition]}>
              <Image
                style={styles.frameChild}
                contentFit="cover"
                source={require("../assets/ellipse-229.png")}
              />
            </View>
          </View>
        </View>
        <View style={[styles.bodyInner, styles.bodyFlexBox]}>
          <View style={styles.vectorParent}>
            <Image
              style={styles.vectorIcon}
              contentFit="cover"
              source={require("../assets/vector4.png")}
            />
            <Image
              style={styles.plumbingIcon}
              contentFit="cover"
              source={require("../assets/ProfessionalHomeCleaning.png")}
            />
          </View>
        </View>
        <View style={styles.bodyFlexBox}>
          <View style={styles.frameParent}>
            <View style={styles.frame2}>
              <View style={styles.frameGroup}>
                <View style={styles.frameGroup}>
                  <Image
                    style={styles.frameItem}
                    contentFit="cover"
                    source={require("../assets/ellipse-139.png")}
                  />
                </View>
                <View style={styles.ellipseContainer}>
                  <Image
                    style={styles.frameItem}
                    contentFit="cover"
                    source={require("../assets/ellipse-139.png")}
                  />
                </View>
                <View style={styles.ellipseContainer}>
                  <Image
                    style={styles.frameItem}
                    contentFit="cover"
                    source={require("../assets/ellipse-138.png")}
                  />
                </View>
              </View>
              <View style={styles.frameContainer}>
                <View style={styles.frame3}>
                  <Text style={styles.professionalHomeCleaning}>
                    Professional Home Cleaning
                  </Text>
                </View>
                <View style={styles.getDiscoveredRightFromHomeWrapper}>
                  <Text style={[styles.getDiscoveredRight, styles.getTypo]}>
                    Get discovered right from home and get paid for what you
                    love doing
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.buttons}>
              <Pressable
                style={styles.getStartedBtn}
                onPress={() => navigation.navigate("SignIn")}
              >
                <Text style={[styles.getStarted, styles.getTypo]}>
                  Get Started
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  frame: {
    paddingTop: Padding.p_4xl,
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    backgroundColor: Color.white,
  },
  frame1: {
    alignItems: "flex-end",
    paddingRight: Padding.p_mini,
    justifyContent: "center",
    flex: 1,
  },
  skipBtn: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorDeepskyblue_200,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_5xs,
    display: "none",
    zIndex: 0,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  skip: {
    fontSize: FontSize.levelSemibold14_size,
    color: Color.colorGray_600,
    textAlign: "center",
  },
  skipTypo: {
    fontFamily: FontFamily.level2Medium12,
    fontWeight: "500",
    textAlign: "center",
  },
  frameInner: {
    top: -48,
    left: -40,
    flexDirection: "row",
  },
  frameInnerPosition: {
    zIndex: 1,
    position: "absolute",
  },
  frameChild: {
    width: 80,
    height: 80,
  },

  bodyScrollViewContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  bodyFlexBox: {
    paddingBottom: Padding.p_xl,
    alignSelf: "stretch",
    alignItems: "center",
  },
  getTypo: {
    fontSize: FontSize.body1Semibold_size,
    textAlign: "center",
    flex: 1,
  },
  vectorIcon: {
    width: 356,
    height: 367,
    zIndex: 0,
  },
  plumbingIcon: {
    // top: 44,
    // left: 11,
    // width: 335,
    // height: 279,
    zIndex: 1,
    top: 30,
    left: 80,
    width: 200,
    height: 320,
    position: "absolute",
  },
  vectorParent: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  bodyInner: {
    paddingHorizontal: Padding.p_5xs,
    paddingTop: Padding.p_31xl,
    justifyContent: "center",
    flexDirection: "row",
  },
  frameItem: {
    width: 16,
    height: 16,
  },
  frameGroup: {
    flexDirection: "row",
  },
  ellipseContainer: {
    marginLeft: 10,
    flexDirection: "row",
  },
  professionalHomeCleaning: {
    fontSize: FontSize.m3HeadlineLarge_size,
    letterSpacing: -1,
    lineHeight: 41,
    color: Color.neutral07,
    textAlign: "center",
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    alignSelf: "stretch",
  },
  frame3: {
    overflow: "hidden",
    justifyContent: "flex-end",
    alignSelf: "stretch",
    alignItems: "center",
  },
  getDiscoveredRight: {
    lineHeight: 26,
    fontWeight: "500",
    fontFamily: FontFamily.level2Medium12,
    color: Color.colorTypographyContentIconsBlack02,
  },
  getDiscoveredRightFromHomeWrapper: {
    marginTop: 15,
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  frameContainer: {
    marginTop: 25,
    justifyContent: "center",
    alignSelf: "stretch",
    alignItems: "center",
  },
  frame2: {
    alignSelf: "stretch",
    alignItems: "center",
  },
  getStarted: {
    letterSpacing: -0.1,
    lineHeight: 24,
    color: Color.neutral01,
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    fontSize: FontSize.body1Semibold_size,
  },
  getStartedBtn: {
    borderRadius: Border.br_5xs,
    backgroundColor: Color.colorDarkslategray_900,
    width: 167,
    paddingHorizontal: Padding.p_3xl,
    paddingVertical: Padding.p_xs,
    flexDirection: "row",
  },
  buttons: {
    paddingTop: 20,
    marginTop: 20,
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  frameParent: {
    paddingHorizontal: Padding.p_11xl,
    paddingVertical: 0,
    alignSelf: "stretch",
    alignItems: "center",
  },
  body: {
    alignSelf: "stretch",
    flex: 1,
    backgroundColor: Color.white,
  },
  onboarding3: {
    width: "100%",
    height: 812,
    alignItems: "center",
    flex: 1,
    backgroundColor: Color.white,
  },
});

export default Onboarding3;
