import * as React from "react";
import {
  StatusBar,
  StyleSheet,
  Pressable,
  Text,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Padding, FontSize, Color, Border } from "../GlobalStyles";

const Onboarding1 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.onboarding1}>
      <StatusBar barStyle="default" />
      <ScrollView
        style={styles.body}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.bodyScrollViewContent}
      >
        <View style={[styles.bodyInner, styles.bodyFlexBox]}>
          <View style={styles.vectorParent}>
            <Image
              style={styles.vectorIcon}
              contentFit="cover"
              source={require("../assets/vector4.png")}
            />
            <Image
              style={[
                styles.greenAndYellowSimpleCleani,
                styles.frameInnerPosition,
              ]}
              contentFit="cover"
              source={require("../assets/green-and-yellow-simple-cleaning-service-poster-1.png")}
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
                    source={require("../assets/ellipse-138.png")}
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
                    source={require("../assets/ellipse-139.png")}
                  />
                </View>
              </View>
              <View style={styles.frameContainer}>
                <View style={styles.frame3}>
                  <Text style={styles.wereHereFor}>
                    We’re here for your household needs!
                  </Text>
                </View>
                <View style={styles.getQualityAndProfessionalSWrapper}>
                  <Text style={[styles.getQualityAnd, styles.skipTypo]}>
                    Get quality and professional service right to your doorsteps
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.buttons}>
              <Pressable
                style={styles.nextBtn}
                onPress={() => navigation.navigate("SignIn")}
                // onPress={() => navigation.navigate("BottomTabsRoot", { screen: "Homepage" })}
              >
                <Image
                  style={styles.iconFilled}
                  contentFit="cover"
                  source={require("../assets/icon-filled.png")}
                />
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
    backgroundColor: "#fff",
  },
  bodyScrollViewContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  skipTypo: {
    fontFamily: FontFamily.level2Medium12,
    fontWeight: "500",
    textAlign: "center",
  },
  frameInnerPosition: {
    zIndex: 1,
    position: "absolute",
  },
  bodyFlexBox: {
    paddingBottom: Padding.p_xl,
    alignSelf: "stretch",
    alignItems: "center",
  },
  vectorIcon: {
    width: 356,
    height: 367,
    zIndex: 0,
  },
  greenAndYellowSimpleCleani: {
    top: 29,
    left: 38,
    width: 280,
    height: 309,
  },
  vectorParent: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  bodyInner: {
    paddingHorizontal: Padding.p_5xs,
    paddingTop: Padding.p_xl,
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
  wereHereFor: {
    fontSize: FontSize.m3HeadlineLarge_size,
    letterSpacing: -1,
    lineHeight: 41,
    fontWeight: "700",
    fontFamily: FontFamily.title2Bold32,
    color: Color.neutral07,
    textAlign: "center",
    alignSelf: "stretch",
  },
  frame3: {
    justifyContent: "flex-end",
    overflow: "hidden",
    alignSelf: "stretch",
    alignItems: "center",
  },
  getQualityAnd: {
    fontSize: FontSize.body1Semibold_size,
    lineHeight: 26,
    color: Color.colorTypographyContentIconsBlack02,
    textAlign: "center",
    flex: 1,
  },
  getQualityAndProfessionalSWrapper: {
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
  iconFilled: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
  nextBtn: {
    borderRadius: Border.br_81xl,
    backgroundColor: Color.colorSteelblue_100,
    padding: Padding.p_xs,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  buttons: {
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
  onboarding1: {
    width: "100%",
    height: 812,
    alignItems: "center",
    flex: 1,
    backgroundColor: Color.white,
  },
});

export default Onboarding1;
