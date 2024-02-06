import * as React from "react";
import {
  StatusBar,
  StyleSheet,
  Pressable,
  View,
  Text,
  TextInput,
  ImageBackground,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Padding, Border, FontFamily, Color, FontSize } from "../GlobalStyles";

const EditAddress = () => {
    const navigation = useNavigation();

    return(
        <View style={styles.editAddressModal}>
            <View style={styles.frameGroup}>
              <View style={styles.frameContainer}>
                <View style={styles.vectorWrapper}>
                  <Image
                    style={styles.frameChild}
                    contentFit="cover"
                    source={require("../assets/line-763.png")}
                  />
                </View>
                <View
                  style={[styles.editYourAddressWrapper, styles.wrapperFlexBox]}
                >
                  <Text
                    style={[styles.editYourAddress, styles.addALabelFlexBox]}
                  >
                    Edit your address
                  </Text>
                </View>
              </View>
              <Pressable
                style={[styles.editBtn, styles.frameSpaceBlock]}
                onPress={() => navigation.navigate("SearchAddressEditAddress")}
              >
                <View
                  style={[
                    styles.componentsSearchDefault,
                    styles.componentsFlexBox,
                  ]}
                >
                  <View style={styles.iconOutline}>
                    <Image
                      style={styles.locationIcon}
                      contentFit="cover"
                      source={require("../assets/location-icon1.png")}
                    />
                  </View>
                  <View style={styles.barangayNasipitTalambanCeParent}>
                    <Text
                      style={[styles.barangayNasipitTalamban, styles.homeTypo]}
                    >
                      101 Barangay Nasipit, Talamban, Cebu City Cebu. Central
                      Visayas
                    </Text>
                    <Text style={[styles.cebu, styles.cebuClr]}>Cebu</Text>
                  </View>
                  <View style={styles.componentsSearchDefaultInner}>
                    <View
                      style={[styles.pencil1Wrapper, styles.pencil1Position]}
                    >
                      <Image
                        style={styles.pencil1Position}
                        contentFit="cover"
                        source={require("../assets/pencil-11.png")}
                      />
                    </View>
                  </View>
                </View>
              </Pressable>
              <View style={[styles.frameView, styles.frameSpaceBlock]}>
                <View style={styles.streetFrameParent}>
                  <View style={styles.streetFrame}>
                    <View
                      style={[
                        styles.componentsSearchDefault1,
                        styles.componentsFlexBox,
                      ]}
                    >
                      <TextInput
                        style={[styles.noteInput, styles.textTypo]}
                        placeholder="e.g. Meet me at the lobby"
                        placeholderTextColor="#b8b8b8"
                      />
                    </View>
                  </View>
                  <View style={styles.houseNumberFrame}>
                    <View
                      style={[
                        styles.componentsSearchDefault1,
                        styles.componentsFlexBox,
                      ]}
                    >
                      <TextInput
                        style={[styles.noteInput, styles.textTypo]}
                        placeholder="e.g. Meet me at the lobby"
                        placeholderTextColor="#b8b8b8"
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.frameSpaceBlock}>
                  <View
                    style={[
                      styles.componentsSearchDefault1,
                      styles.componentsFlexBox,
                    ]}
                  >
                    <TextInput
                      style={[styles.noteInput, styles.textTypo]}
                      placeholder="e.g. Meet me at the lobby"
                      placeholderTextColor="#b8b8b8"
                    />
                  </View>
                </View>
                <View
                  style={[
                    styles.deliveryInstructionsFrame,
                    styles.frameSpaceBlock,
                  ]}
                >
                  <View style={styles.streetFrame}>
                    <Text style={styles.serviceProviderInstructions}>
                      Service Provider Instructions
                    </Text>
                    <Text style={[styles.giveUsMore, styles.cebuTypo]}>
                      Give us more information about your address.
                    </Text>
                  </View>
                </View>
                <View style={styles.frameSpaceBlock}>
                  <View
                    style={[
                      styles.componentsSearchDefault1,
                      styles.componentsFlexBox,
                    ]}
                  >
                    <TextInput
                      style={[styles.noteInput, styles.textTypo]}
                      placeholder="e.g. Meet me at the lobby"
                      placeholderTextColor="#b8b8b8"
                    />
                  </View>
                  <View style={styles.wrapper}>
                    <Text style={[styles.text, styles.textTypo]}>0/300</Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.deliveryInstructionsFrame,
                    styles.frameSpaceBlock,
                  ]}
                >
                  <View style={styles.streetFrame}>
                    <Text style={[styles.addALabel, styles.addALabelTypo]}>
                      Add a label
                    </Text>
                  </View>
                </View>
                <View
                  style={[styles.addALabelIconsFrame, styles.frameSpaceBlock]}
                >
                  <Pressable style={styles.homeBtn}>
                    <View style={styles.ellipseParentShadowBox}>
                      <Image
                        style={[styles.frameItem, styles.whitePosition]}
                        contentFit="cover"
                        source={require("../assets/ellipse-43.png")}
                      />
                      <View
                        style={[
                          styles.whiteHomeParent,
                          styles.whiteParentPosition,
                        ]}
                      >
                        <Image
                          style={[styles.whiteHomeIcon, styles.whitePosition]}
                          contentFit="cover"
                          source={require("../assets/white-home1.png")}
                        />
                        <Image
                          style={[styles.blueHomeIcon, styles.homeIconPosition]}
                          contentFit="cover"
                          source={require("../assets/blue-home1.png")}
                        />
                      </View>
                    </View>
                    <View style={[styles.homeWrapper, styles.wrapperFlexBox]}>
                      <Text style={[styles.home, styles.homeTypo]}>Home</Text>
                    </View>
                  </Pressable>
                  <Pressable style={styles.apartmentBtn}>
                    <View style={styles.ellipseParentShadowBox}>
                      <Image
                        style={[styles.frameItem, styles.whitePosition]}
                        contentFit="cover"
                        source={require("../assets/ellipse-431.png")}
                      />
                      <View
                        style={[
                          styles.whiteHomeParent,
                          styles.whiteParentPosition,
                        ]}
                      >
                        <Image
                          style={[styles.whiteHomeIcon, styles.whitePosition]}
                          contentFit="cover"
                          source={require("../assets/white-condo1.png")}
                        />
                        <Image
                          style={[styles.blueHomeIcon, styles.homeIconPosition]}
                          contentFit="cover"
                          source={require("../assets/blue-condo1.png")}
                        />
                      </View>
                    </View>
                    <View style={[styles.homeWrapper, styles.wrapperFlexBox]}>
                      <Text style={[styles.home, styles.homeTypo]}>
                        Apartment
                      </Text>
                    </View>
                  </Pressable>
                  <Pressable style={styles.apartmentBtn}>
                    <View style={styles.ellipseParentShadowBox}>
                      <Image
                        style={[styles.frameItem, styles.whitePosition]}
                        contentFit="cover"
                        source={require("../assets/ellipse-432.png")}
                      />
                      <View
                        style={[
                          styles.whiteHomeParent,
                          styles.whiteParentPosition,
                        ]}
                      >
                        <Image
                          style={[styles.whiteHomeIcon, styles.whitePosition]}
                          contentFit="cover"
                          source={require("../assets/white-apartment2.png")}
                        />
                        <Image
                          style={[styles.blueHomeIcon, styles.homeIconPosition]}
                          contentFit="cover"
                          source={require("../assets/blue-apartment1.png")}
                        />
                      </View>
                    </View>
                    <View style={[styles.homeWrapper, styles.wrapperFlexBox]}>
                      <Text style={[styles.home, styles.homeTypo]}>Condo</Text>
                    </View>
                  </Pressable>
                  <Pressable style={styles.apartmentBtn}>
                    <View style={styles.ellipseParentShadowBox}>
                      <Image
                        style={[styles.frameItem, styles.whitePosition]}
                        contentFit="cover"
                        source={require("../assets/ellipse-433.png")}
                      />
                      <View
                        style={[
                          styles.whiteAddParent,
                          styles.whiteParentPosition,
                        ]}
                      >
                        <View style={[styles.whiteAdd, styles.addPosition]}>
                          <Image
                            style={styles.locationIcon}
                            contentFit="cover"
                            source={require("../assets/vector11.png")}
                          />
                        </View>
                        <View style={[styles.blueAdd, styles.addPosition]}>
                          <Image
                            style={styles.locationIcon}
                            contentFit="cover"
                            source={require("../assets/vector12.png")}
                          />
                        </View>
                      </View>
                    </View>
                    <View style={[styles.homeWrapper, styles.wrapperFlexBox]}>
                      <Text style={[styles.home, styles.homeTypo]}>Other</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
              <View style={[styles.frameView, styles.frameSpaceBlock]}>
                <Pressable style={styles.componentsbutton}>
                  <Text style={[styles.viewAllServices, styles.addALabelTypo]}>
                    Save and Continue
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
    )
}


const styles = StyleSheet.create({
    whiteParentPosition: {
      padding: Padding.p_3xs,
      zIndex: 1,
      position: "absolute",
      alignItems: "center",
    },
    wrapperFlexBox: {
      marginTop: 10,
      flexDirection: "row",
      alignSelf: "stretch",
    },
    addALabelFlexBox: {
      textAlign: "left",
      lineHeight: 32,
    },
    frameSpaceBlock: {
      marginTop: 15,
      alignSelf: "stretch",
    },
    componentsFlexBox: {
      paddingBottom: Padding.p_3xs,
      paddingTop: Padding.p_3xs,
      paddingLeft: Padding.p_8xs,
      borderRadius: Border.br_5xs,
      overflow: "hidden",
      justifyContent: "center",
      flexDirection: "row",
      alignSelf: "stretch",
      alignItems: "center",
    },
    homeTypo: {
      fontFamily: FontFamily.montserratSemiBold,
      fontWeight: "600",
      lineHeight: 15,
      textAlign: "left",
    },
    cebuClr: {
      color: Color.colorSilver_300,
      lineHeight: 15,
    },
    pencil1Position: {
      height: 20,
      width: 20,
      left: 0,
      top: 0,
      position: "absolute",
    },
    textTypo: {
      fontFamily: FontFamily.montserratRegular,
      fontSize: FontSize.typographyTaglineSmallRegular_size,
    },
    cebuTypo: {
      fontFamily: FontFamily.montserratMedium,
      fontWeight: "500",
      textAlign: "left",
    },
    addALabelTypo: {
      fontFamily: FontFamily.title2Bold32,
      fontSize: FontSize.body1Semibold_size,
      fontWeight: "700",
    },
    whitePosition: {
      display: "none",
      zIndex: 0,
    },
    homeIconPosition: {
      left: 0,
      height: 30,
      width: 30,
      top: 0,
      position: "absolute",
    },
    addPosition: {
      left: 2,
      top: 2,
      overflow: "hidden",
      justifyContent: "center",
      flexDirection: "row",
      position: "absolute",
      alignItems: "center",
    },
    uiIconarrowBackwardfilled: {
      width: 24,
      height: 24,
    },
    backBtn: {
      borderRadius: Border.br_xl,
      width: 40,
      height: 40,
      paddingHorizontal: Padding.p_xs,
      paddingVertical: Padding.p_9xs,
      justifyContent: "center",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: Color.white,
    },
    backBtnWrapper: {
      left: 16,
      paddingVertical: Padding.p_mini,
      zIndex: 0,
      paddingHorizontal: 0,
      flexDirection: "row",
      top: 0,
      position: "absolute",
    },
    frameItemLayout: {
      height: 50,
      width: 50,
    },
    icons8Location10021Wrapper: {
      top: 252,
      left: 28,
      zIndex: 1,
      overflow: "hidden",
      justifyContent: "flex-end",
    },
    frameChild: {
      width: 41,
      height: 3,
    },
    vectorWrapper: {
      width: 342,
      height: 2,
      justifyContent: "center",
      alignItems: "center",
    },
    editYourAddress: {
      fontSize: FontSize.size_mid,
      fontFamily: FontFamily.montserratBold,
      display: "flex",
      width: 253,
      color: Color.colorGray_800,
      fontWeight: "700",
      textAlign: "left",
      lineHeight: 32,
      height: 24,
      alignItems: "center",
    },
    editYourAddressWrapper: {
      alignItems: "center",
    },
    frameContainer: {
      paddingTop: Padding.p_5xs,
      justifyContent: "flex-end",
      alignSelf: "stretch",
    },
    locationIcon: {
      height: 30,
      width: 30,
    },
    iconOutline: {
      justifyContent: "center",
      flexDirection: "row",
      alignItems: "center",
    },
    barangayNasipitTalamban: {
      color: Color.colorDarkgray_300,
      fontSize: FontSize.m3LabelLarge_size,
      fontFamily: FontFamily.montserratSemiBold,
      alignSelf: "stretch",
    },
    cebu: {
      fontSize: FontSize.size_3xs,
      fontFamily: FontFamily.montserratMedium,
      fontWeight: "500",
      textAlign: "left",
      alignSelf: "stretch",
    },
    barangayNasipitTalambanCeParent: {
      marginLeft: 10,
      overflow: "hidden",
      flex: 1,
    },
    pencil1Wrapper: {
      zIndex: 0,
    },
    componentsSearchDefaultInner: {
      marginLeft: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    componentsSearchDefault: {
      paddingRight: Padding.p_10xs,
    },
    editBtn: {
      justifyContent: "flex-end",
    },
    noteInput: {
      paddingHorizontal: Padding.p_3xs,
      paddingVertical: 0,
      fontSize: FontSize.typographyTaglineSmallRegular_size,
      overflow: "hidden",
      justifyContent: "center",
      alignSelf: "stretch",
      flex: 1,
    },
    componentsSearchDefault1: {
      borderStyle: "solid",
      borderColor: Color.colorDarkgray_100,
      borderWidth: 1,
      height: 48,
      paddingRight: Padding.p_3xs,
    },
    streetFrame: {
      flex: 1,
    },
    houseNumberFrame: {
      marginLeft: 15,
      flex: 1,
    },
    streetFrameParent: {
      justifyContent: "center",
      flexDirection: "row",
      alignSelf: "stretch",
    },
    serviceProviderInstructions: {
      fontFamily: FontFamily.level2Semibold12,
      fontWeight: "600",
      lineHeight: 15,
      fontSize: FontSize.m3LabelLarge_size,
      textAlign: "left",
      color: Color.colorGray_800,
    },
    giveUsMore: {
      fontSize: FontSize.level2Medium12_size,
      color: Color.colorDimgray_100,
      marginTop: 3,
      lineHeight: 15,
      fontFamily: FontFamily.montserratMedium,
      fontWeight: "500",
    },
    deliveryInstructionsFrame: {
      justifyContent: "center",
      flexDirection: "row",
      alignItems: "center",
    },
    text: {
      textAlign: "right",
      fontSize: FontSize.typographyTaglineSmallRegular_size,
      color: Color.colorSilver_300,
      lineHeight: 15,
    },
    wrapper: {
      marginTop: 1,
      flexDirection: "row",
      justifyContent: "flex-end",
      alignSelf: "stretch",
    },
    addALabel: {
      color: Color.colorBlack,
      textAlign: "left",
      lineHeight: 32,
      fontFamily: FontFamily.title2Bold32,
      fontSize: FontSize.body1Semibold_size,
      alignSelf: "stretch",
    },
    frameItem: {
      height: 50,
      width: 50,
    },
    whiteHomeIcon: {
      left: 0,
      height: 30,
      width: 30,
      top: 0,
      position: "absolute",
    },
    blueHomeIcon: {
      zIndex: 1,
    },
    whiteHomeParent: {
      top: 10,
      left: 10,
      zIndex: 1,
      justifyContent: "center",
    },
    ellipseParentShadowBox: {
      shadowOpacity: 1,
      elevation: 4,
      shadowRadius: 4,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowColor: "rgba(0, 0, 0, 0.25)",
      borderRadius: Border.br_11xl,
      height: 50,
      width: 50,
      justifyContent: "center",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: Color.white,
    },
    home: {
      fontSize: FontSize.typographyTaglineSmallRegular_size,
      color: Color.colorGray_800,
    },
    homeWrapper: {
      paddingVertical: Padding.p_8xs,
      justifyContent: "center",
      paddingHorizontal: 0,
    },
    homeBtn: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    apartmentBtn: {
      marginLeft: 10,
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    whiteAdd: {
      display: "none",
      zIndex: 0,
    },
    blueAdd: {
      zIndex: 1,
    },
    whiteAddParent: {
      top: 9,
      left: 8,
      zIndex: 1,
      justifyContent: "center",
    },
    addALabelIconsFrame: {
      flexDirection: "row",
      alignItems: "center",
    },
    frameView: {
      justifyContent: "flex-end",
      alignItems: "center",
    },
    viewAllServices: {
      letterSpacing: -0.1,
      lineHeight: 24,
      color: Color.neutral01,
      textAlign: "center",
    },
    componentsbutton: {
      borderRadius: Border.br_mini,
      backgroundColor: Color.colorDarkslategray_900,
      width: 343,
      paddingHorizontal: Padding.p_3xl,
      paddingVertical: Padding.p_xs,
      justifyContent: "center",
      flexDirection: "row",
      alignItems: "center",
    },
    frameGroup: {
      borderTopLeftRadius: Border.br_5xl,
      borderTopRightRadius: Border.br_5xl,
      paddingHorizontal: Padding.p_base,
      paddingBottom: Padding.p_mini,
      alignSelf: "stretch",
      alignItems: "center",
      backgroundColor: Color.white,
    },
    editAddressModal: {
      zIndex: 2,
      justifyContent: "flex-end",
      alignSelf: "stretch",
      alignItems: "center",
    },
    frameParent: {
      justifyContent: "flex-end",
      alignSelf: "stretch",
      alignItems: "center",
      flex: 1,
    },
    body: {
      justifyContent: "flex-end",
      alignSelf: "stretch",
      alignItems: "center",
      flex: 1,
    },
    editAddressIconComplete: {
      width: "100%",
      height: 812,
      alignItems: "center",
      flex: 1,
      backgroundColor: Color.white,
    },
  });
  
export default EditAddress;
  