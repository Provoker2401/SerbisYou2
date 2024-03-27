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
import { Image } from "expo-image";
import { Color, Padding, FontFamily, FontSize, Border } from "../GlobalStyles";

const NotificationsEmpty = () => {
  return (
    <View style={[styles.notificationsEmpty, styles.iconOutlineLayout]}>
      <StatusBar barStyle="default" />
      <ScrollView
        style={styles.body}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.bodyScrollViewContent}
      >
        <View style={[styles.notification, styles.viewParentFlexBox]}>
          <View style={styles.tag} />
          <Text style={styles.notification1}>Notification</Text>
          <View style={styles.right}>
            <Pressable style={[styles.recentBtn, styles.viewSpaceBlock]}>
              <Text style={styles.recent}>Recent</Text>
              <Image
                style={[styles.iconOutline, styles.iconOutlineLayout]}
                contentFit="cover"
                source={require("../assets/icon-outline.png")}
              />
            </Pressable>
          </View>
        </View>
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
    paddingHorizontal: 0,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  iconOutlineLayout: {
    width: "100%",
    flex: 1,
  },
  viewParentFlexBox: {
    alignItems: "center",
    alignSelf: "stretch",
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
  viewSpaceBlock: {
    paddingVertical: Padding.p_5xs,
    flexDirection: "row",
  },
  noNotificationsSpaceBlock: {
    paddingHorizontal: Padding.p_xl,
    alignItems: "center",
  },
  navigationBarHomeFlexBox: {
    paddingVertical: 0,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  youDontHaveLayout: {
    lineHeight: 24,
    letterSpacing: -0.1,
    textAlign: "center",
  },
  labelTypo: {
    marginTop: 4,
    fontFamily: FontFamily.m3LabelLarge,
    lineHeight: 16,
    letterSpacing: 1,
    textAlign: "center",
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
    marginLeft: 10,
    color: Color.neutral07,
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
    maxWidth: "100%",
    maxHeight: "100%",
    marginLeft: 4,
    overflow: "hidden",
    alignSelf: "stretch",
  },
  recentBtn: {
    paddingHorizontal: Padding.p_3xs,
    borderRadius: Border.br_81xl,
    alignItems: "flex-end",
    alignSelf: "stretch",
    backgroundColor: Color.white,
  },
  right: {
    width: 77,
    marginLeft: 10,
    alignItems: "flex-end",
  },
  notification: {
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_3xs,
    flexDirection: "row",
  },
  frameItem: {
    height: 95,
    width: 90,
  },
  noNotifications1: {
    lineHeight: 26,
    textAlign: "center",
    color: Color.neutral07,
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    fontSize: FontSize.title3Bold20_size,
  },
  youDontHave: {
    fontSize: FontSize.m3LabelLarge_size,
    color: "#b0b0b0",
    fontFamily: FontFamily.level2Medium12,
    fontWeight: "500",
    flex: 1,
  },
  youDontHaveAnyNotificatioWrapper: {
    marginTop: 10,
    paddingHorizontal: Padding.p_xl,
    alignItems: "center",
  },
  noNotificationsParent: {
    marginTop: 32,
    overflow: "hidden",
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
  viewAllServicesBtn: {
    backgroundColor: Color.colorDarkslategray_900,
    paddingHorizontal: Padding.p_3xl,
    paddingVertical: Padding.p_xs,
    borderRadius: Border.br_5xs,
    flexDirection: "row",
  },
  viewAllServicesBtnWrapper: {
    marginTop: 40,
    justifyContent: "center",
  },
  noNotifications: {
    paddingVertical: 135,
    marginTop: 15,
    borderRadius: Border.br_5xs,
    justifyContent: "center",
    alignSelf: "stretch",
    backgroundColor: Color.white,
  },
  body: {
    alignSelf: "stretch",
    flex: 1,
  },
  notificationsEmpty: {
    height: 812,
    backgroundColor: Color.white,
  },
});

export default NotificationsEmpty;
