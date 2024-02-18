import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ActiveBookings from "../components/ActiveBookings";
import HistoryBookings from "../components/HistoryBookings";
import Tab13 from "../components/Tab13";
import Tab12 from "../components/Tab12";
import Tab23 from "../components/Tab23";
import Tab22 from "../components/Tab22";
import { Color, FontFamily, Padding, Border, FontSize } from "../GlobalStyles";

const TopTab = createMaterialTopTabNavigator();
const screenHeight = Dimensions.get('window').height;
const BookingsActive = () => {
  const [isNavigatorActive, setIsNavigatorActive] = useState(false);
  return (
    <View style={styles.bookingsActive}>
      <StatusBar style={styles.barLayout} barStyle="default" />
      <ScrollView
        style={styles.body}
        scrollEnabled={isNavigatorActive}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        // contentContainerStyle={styles.bodyScrollViewContent}
      >
        <View style={styles.bookings}>
          <View style={styles.tag} />
          <Text style={[styles.bookings1, styles.serbisyouTypo]}>Bookings</Text>
          <Pressable style={[styles.searchBtn, styles.btnWrapperFlexBox]}>
            <Image
              style={styles.vectorIcon}
              contentFit="cover"
              source={require("../assets/vector7.png")}
            />
          </Pressable>
        </View>
        <View style={[styles.activeTabs, styles.activeFlexBox]}>
          <TopTab.Navigator
            style={styles.tabGroupToptabs}
            tabBar={({ state, descriptors, navigation, position }) => {
              const [activeItems] = React.useState([<Tab13 />, <Tab23 />]);
              const [normalItems] = React.useState([<Tab12 />, <Tab22 />]);
              const activeIndex = state.index;
              console.log("Active Tab: " ,activeIndex);
              
              // Update the state based on tab navigator's activity
              React.useEffect(() => {
                if(activeIndex === 1){
                  setIsNavigatorActive(activeIndex === 0); // Assuming index 1 is where the tab navigator is active
                }else{
                  setIsNavigatorActive(activeIndex === 1); // Assuming index 1 is where the tab navigator is active
                }
                
              }, [activeIndex]);
              return (
                <View style={styles.topTabBarStyle}>
                  {normalItems.map((item, index) => {
                    const isFocused = state.index === index;
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{ flex: 1 }}
                        onPress={() => {
                          navigation.navigate({
                            name: state.routes[index].name,
                            merge: true,
                          });
                        }}
                      >
                        {activeIndex === index ? activeItems[index] : item}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            }}
          >
            <TopTab.Screen name="Active Bookings" component={ActiveBookings} />
            <TopTab.Screen
              name="History Bookings"
              component={HistoryBookings}
            />
          </TopTab.Navigator>
          {/* <View style={styles.divider}>
            <View style={[styles.divider1, styles.divider1Layout]} />
          </View> */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1a244d",
  },
  tabGroupToptabs: {
    width: "100%",
    height: screenHeight * 0.7, // 80% of the screen height
  },
  topTabBarStyle: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    minHeight: 48,
    zIndex: 1,
  },
  bodyScrollViewContent: {
    flexDirection: "column",
    paddingHorizontal: 0,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  barLayout: {
    width: 375,
    backgroundColor: Color.white,
  },
  viewFlexBox: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  serbisyouTypo: {
    textAlign: "left",
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
  },
  btnWrapperFlexBox: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  locationBtnFlexBox: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  currentLocationFlexBox: {
    textAlign: "right",
    color: Color.white,
    flex: 1,
  },
  activeFlexBox: {
    marginTop: 15,
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: Color.white,
  },
  divider1Layout: {
    height: 1,
    alignSelf: "stretch",
  },
  rectangleFrameShadowBox: {
    padding: Padding.p_3xs,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: Border.br_3xs,
    alignItems: "center",
    alignSelf: "stretch",
  },
  parentSpaceBlock: {
    marginLeft: 5,
    justifyContent: "center",
  },
  messageBtnSpaceBlock: {
    marginTop: 9,
    alignSelf: "stretch",
  },
  pendingFlexBox: {
    paddingVertical: Padding.p_7xs,
    paddingHorizontal: Padding.p_3xs,
    borderRadius: Border.br_6xs,
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  iconPosition: {
    zIndex: 1,
    position: "absolute",
    overflow: "hidden",
  },
  frameSpaceBlock: {
    paddingTop: Padding.p_xl,
    alignSelf: "stretch",
  },
  dateTimeTypo: {
    color: Color.colorTypographyContentIconsBlack02,
    fontFamily: FontFamily.title4Regular18,
    lineHeight: 24,
    letterSpacing: -0.1,
    textAlign: "left",
  },
  textTypo: {
    color: Color.colorDarkslategray_400,
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
    fontSize: FontSize.typographyTaglineSmallRegular_size,
    textAlign: "right",
  },
  frameGroupFlexBox: {
    paddingHorizontal: Padding.p_8xs,
    paddingVertical: 0,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  btnBorder: {
    borderWidth: 1.6,
    borderColor: Color.colorSteelblue_100,
    borderRadius: Border.br_xs,
    borderStyle: "solid",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  viewDetailsTypo: {
    textAlign: "center",
    fontSize: FontSize.level2Medium12_size,
    lineHeight: 24,
    letterSpacing: -0.1,
    fontFamily: FontFamily.level2Medium12,
    fontWeight: "500",
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
    paddingBottom: Padding.p_base,
    paddingTop: Padding.p_xs,
    width: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainerFlexBox: {
    borderRadius: Border.br_base,
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
    width: 4,
    backgroundColor: Color.colorSteelblue_100,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  bookings1: {
    fontSize: FontSize.size_5xl,
    letterSpacing: -0.5,
    color: Color.neutral07,
    marginLeft: 10,
    flex: 1,
  },
  vectorIcon: {
    width: 20,
    height: 20,
  },
  searchBtn: {
    marginLeft: 10,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  bookings: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_base,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  divider1: {
    borderColor: Color.m3SysLightSurfaceVariant,
    borderTopWidth: 1,
    borderStyle: "solid",
    height: 1,
  },
  divider: {
    justifyContent: "center",
    alignSelf: "stretch",
  },
  activeTabs: {
    paddingVertical: 0,
    paddingHorizontal: Padding.p_base,
    justifyContent: "center",
  },
  body: {
    alignSelf: "stretch",
    paddingVertical: 15,
    flex: 1,
    backgroundColor: Color.white,
  },
  bookingsActive: {
    height: 812,
    width: "100%",
    flex: 1,
    backgroundColor: Color.white,
  },
});

export default BookingsActive;
