import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ImageBackground,
} from "react-native";
import { Image } from "expo-image";
import { Padding, Border, Color, FontFamily, FontSize } from "../GlobalStyles";

const OriginalLocationModal = ({ onClose }) => {
  return (
    <View style={styles.originalLocationModal}>
      <View style={styles.lineFrame}>
        <View style={styles.lineFrameInner}>
          <View style={styles.frameChild} />
        </View>
      </View>
      <View style={styles.useMyCurrentLocationFrame}>
        <View style={styles.currentLocationBtn}>
          <View style={[styles.frameParent, styles.frameParentFlexBox]}>
            <Image
              style={styles.frameItemLayout}
              contentFit="cover"
              source={require("../assets/frame-26085027.png")}
            />
            <View style={styles.homeParentSpaceBlock}>
              <Text style={styles.useMyCurrent}>Use my current location</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.chooseLocationFrameParent}>
        <View style={[styles.chooseLocationFrame, styles.frameFlexBox]}>
          <Pressable
            style={[styles.chooseLocationBtn, styles.frameParentFlexBox]}
          >
            <View style={styles.lineFrameInner}>
              <ImageBackground
                style={[styles.frameWrapper, styles.frameLayout]}
                resizeMode="cover"
                source={require("../assets/frame26085032.png")}
              >
                <View
                  style={[
                    styles.icons8Location10021Wrapper,
                    styles.editBtnPosition,
                  ]}
                >
                  <Image
                    style={[
                      styles.icons8Location10021,
                      styles.pencil1IconPosition,
                    ]}
                    contentFit="cover"
                    source={require("../assets/icons8location100-2-1.png")}
                  />
                </View>
              </ImageBackground>
            </View>
            <View style={styles.lineFrameInner}>
              <View style={[styles.frameGroup, styles.frameSpaceBlock]}>
                <View style={styles.radioButton1Wrapper}>
                  <Image
                    style={styles.radioButton1}
                    contentFit="cover"
                    source={require("../assets/radio-button-1.png")}
                  />
                </View>
                <View style={styles.homeParentSpaceBlock}>
                  <Text style={styles.homeTypo}>Current Location</Text>
                  <Text style={styles.barangayTypo}>
                    Barangay Nasipit, Talamban, Cebu City, Cebu, Central
                    Visayas, Philippines
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        </View>
        <View style={[styles.addressFrame, styles.frameFlexBox]}>
          <Pressable
            style={[styles.chooseLocationBtn, styles.frameParentFlexBox]}
          >
            <View style={styles.lineFrameInner}>
              <Image
                style={[styles.frameInner, styles.frameLayout]}
                contentFit="cover"
                source={require("../assets/frame26085032.png")}
              />
            </View>
            <View style={styles.lineFrameInner}>
              <View style={[styles.frameGroup, styles.frameSpaceBlock]}>
                <View style={styles.radioButton1Wrapper}>
                  <View style={styles.radioButton11}>
                    <Image
                      style={styles.frameItemLayout}
                      contentFit="cover"
                      source={require("../assets/frame-31.png")}
                    />
                  </View>
                </View>
                <View style={styles.homeParentSpaceBlock}>
                  <Text style={[styles.home, styles.homeTypo]}>Home</Text>
                  <Text style={[styles.barangaySambagP, styles.barangayTypo]}>
                    Barangay Sambag, P. Del Rosario St., Cebu City, Cebu,
                    Central Visayas, Philippines
                  </Text>
                  <Pressable style={[styles.editBtn, styles.editBtnPosition]}>
                    <Image
                      style={[styles.pencil1Icon, styles.pencil1IconPosition]}
                      contentFit="cover"
                      source={require("../assets/pencil-1.png")}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={[styles.addNewAddressFrame, styles.frameSpaceBlock]}>
        <Pressable style={styles.currentLocationBtn}>
          <View style={[styles.frameParent, styles.frameParentFlexBox]}>
            <View style={styles.radioButton1Wrapper}>
              <Image
                style={styles.add2Icon}
                contentFit="cover"
                source={require("../assets/add-21.png")}
              />
            </View>
            <View style={styles.homeParentSpaceBlock}>
              <Text style={styles.useMyCurrent}>Add New Address</Text>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameParentFlexBox: {
    flex: 1,
    alignItems: "center",
  },
  frameFlexBox: {
    padding: Padding.p_3xs,
    borderRadius: Border.br_8xs,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  frameLayout: {
    height: 95,
    borderRadius: Border.br_8xs,
    alignSelf: "stretch",
  },
  editBtnPosition: {
    position: "absolute",
    padding: Padding.p_3xs,
    alignItems: "center",
  },
  pencil1IconPosition: {
    left: 0,
    top: 0,
    zIndex: 0,
    position: "absolute",
  },
  frameSpaceBlock: {
    paddingHorizontal: 0,
    alignSelf: "stretch",
  },
  homeTypo: {
    width: 253,
    display: "flex",
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratBold,
    lineHeight: 32,
    fontSize: FontSize.body1Semibold_size,
    height: 24,
    textAlign: "left",
    fontWeight: "700",
    alignItems: "center",
  },
  barangayTypo: {
    color: Color.colorDarkgray_200,
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "500",
    lineHeight: 20,
    fontSize: FontSize.typographyTaglineSmallRegular_size,
    textAlign: "left",
    alignSelf: "stretch",
  },
  frameChild: {
    borderStyle: "solid",
    borderColor: Color.colorDarkgray_400,
    borderTopWidth: 2,
    width: 40,
    height: 2,
  },
  lineFrameInner: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  lineFrame: {
    paddingTop: Padding.p_5xs,
    paddingBottom: Padding.p_6xs,
    alignSelf: "stretch",
  },
  frameItemLayout: {
    height: 20,
    width: 20,
  },
  useMyCurrent: {
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    lineHeight: 21,
    fontFamily: FontFamily.title2Bold32,
    color: Color.colorDarkslategray_900,
    textAlign: "left",
    fontWeight: "700",
  },
  homeParentSpaceBlock: {
    marginLeft: 10,
    flex: 1,
  },
  frameParent: {
    flexDirection: "row",
  },
  currentLocationBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
  },
  useMyCurrentLocationFrame: {
    paddingBottom: Padding.p_5xs,
    marginTop: 5,
    alignSelf: "stretch",
  },
  icons8Location10021: {
    width: 30,
    height: 30,
  },
  icons8Location10021Wrapper: {
    top: 20,
    left: 58,
    zIndex: 0,
    justifyContent: "center",
  },
  frameWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButton1: {
    width: 24,
    height: 24,
  },
  radioButton1Wrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  frameGroup: {
    paddingVertical: Padding.p_8xs,
    flexDirection: "row",
    alignItems: "center",
  },
  chooseLocationBtn: {
    justifyContent: "center",
  },
  chooseLocationFrame: {
    backgroundColor: Color.colorSteelblue_200,
  },
  frameInner: {
    width: "100%",
    overflow: "hidden",
    maxWidth: "100%",
  },
  radioButton11: {
    flexDirection: "row",
  },
  home: {
    zIndex: 0,
  },
  barangaySambagP: {
    zIndex: 1,
  },
  pencil1Icon: {
    height: 20,
    width: 20,
  },
  editBtn: {
    top: 3,
    left: 250,
    zIndex: 2,
  },
  addressFrame: {
    display: "none",
    marginTop: 5,
    backgroundColor: Color.white,
  },
  chooseLocationFrameParent: {
    marginTop: 5,
    alignSelf: "stretch",
  },
  add2Icon: {
    width: 18,
    height: 18,
    overflow: "hidden",
  },
  addNewAddressFrame: {
    paddingVertical: Padding.p_3xs,
    marginTop: 5,
  },
  originalLocationModal: {
    borderRadius: Border.br_5xl,
    width: 355,
    paddingHorizontal: Padding.p_base,
    paddingBottom: Padding.p_xl,
    maxHeight: "100%",
    maxWidth: "100%",
    backgroundColor: Color.white,
  },
});

export default OriginalLocationModal;
