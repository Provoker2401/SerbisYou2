import React, { useMemo } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { FontFamily, FontSize, Color, Padding, Border } from "../GlobalStyles";
import { Keyboard } from "react-native";
import { SafeAreaView } from "react-native";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const NoInputDefault = ({
  noInputDefaultPosition,
  noInputDefaultZIndex,
  cityAddress,
  specificLocation,
}) => {
  const noInputDefaultStyle = useMemo(() => {
    return {
      ...getStyleValue("position", noInputDefaultPosition),
      ...getStyleValue("zIndex", noInputDefaultZIndex),
    };
  }, [noInputDefaultPosition, noInputDefaultZIndex]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={[
          styles.noInputdefault,
          styles.componentsbuttonFlexBox,
          noInputDefaultStyle,
        ]}
      >
        <View style={styles.frameParent}>
          <View style={styles.nameWrapperFlexBox}>
            <Text style={styles.nameTypo}>
              <Text style={styles.nameTxt}>
                <Text style={styles.name1}>Name</Text>
                <Text style={styles.text}>*</Text>
              </Text>
            </Text>
          </View>
          <View
            style={[styles.componentsSearchDefault, styles.componentsFlexBox]}
          >
            {/* <KeyboardAvoidingView enabled={false}> */}
            <TextInput
              style={styles.nameInput}
              placeholder="e.g. Home, Apartment, Condominium"
              placeholderTextColor="#b8b8b8"
            />
            {/* </KeyboardAvoidingView> */}
          </View>
          <View style={styles.componentsFlexBox}>
            <Text style={[styles.labelThisAddress, styles.talambanLayout]}>
              Label this address for easy reference
            </Text>
          </View>
        </View>

        <View style={styles.parentSpaceBlock}>
          <Text style={styles.nameTypo}>
            <Text style={styles.nameTxt}>
              <Text style={styles.name1}>Address</Text>
              <Text style={styles.text}>*</Text>
            </Text>
          </Text>
          <View
            style={[styles.componentsSearchDefault1, styles.componentsFlexBox]}
          >
            <View style={styles.locationFrame}>
              <Image
                style={styles.icons8Location10022}
                contentFit="cover"
                source={require("../assets/icons8location100-2-1.png")}
              />
            </View>
            <View style={styles.uscTalambanParent}>
              <Text style={[styles.uscTalamban, styles.talambanLayout]}>
                {cityAddress}
              </Text>
              <Text
                style={[styles.barangayNasipitTalamban, styles.talambanLayout]}
              >
                {specificLocation}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.parentSpaceBlock}>
          <Text style={[styles.addressDetails, styles.nameTypo]}>
            Address details
          </Text>
          <View
            style={[styles.componentsSearchDefault, styles.componentsFlexBox]}
          >
            <TextInput
              style={styles.nameInput}
              placeholder="e.g. Floor, unit number"
              placeholderTextColor="#b8b8b8"
            />
          </View>
        </View>
        <View
          style={[styles.noteToServiceProviderParent, styles.parentSpaceBlock]}
        >
          <Text style={[styles.addressDetails, styles.nameTypo]}>
            Note to Service Provider
          </Text>
          <View
            style={[styles.componentsSearchDefault, styles.componentsFlexBox]}
          >
            <TextInput
              style={styles.nameInput}
              placeholder="e.g. Meet me at the lobby"
              placeholderTextColor="#b8b8b8"
            />
          </View>
          <View style={styles.componentsFlexBox}>
            <Text style={[styles.labelThisAddress, styles.talambanLayout]}>
              Put location instructions or directions here
            </Text>
          </View>
        </View>
        <View style={[styles.componentsbuttonWrapper, styles.parentSpaceBlock]}>
          <Pressable
            style={[styles.componentsbutton, styles.nameWrapperFlexBox]}
          >
            <Text style={styles.viewAllServices}>Save Address</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  componentsbuttonFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  componentsFlexBox: {
    marginTop: 5,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  talambanLayout: {
    lineHeight: 15,
    textAlign: "left",
  },
  nameTypo: {
    height: 24,
    width: 253,
    display: "flex",
    textAlign: "left",
    fontFamily: FontFamily.paragraphMedium15,
    fontWeight: "500",
    lineHeight: 32,
    fontSize: FontSize.levelSemibold14_size,
    alignItems: "center",
  },
  parentSpaceBlock: {
    marginTop: 15,
    alignSelf: "stretch",
  },
  nameWrapperFlexBox: {
    flexDirection: "row",
    alignSelf: "stretch",
  },
  name1: {
    color: Color.colorGray_300,
  },
  text: {
    color: Color.colorRed_200,
  },
  nameTxt: {
    width: "100%",
  },
  nameInput: {
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: 0,
    fontSize: FontSize.typographyTaglineSmallRegular_size,
    fontFamily: FontFamily.montserratRegular,
    flex: 1,
    overflow: "hidden",
    alignSelf: "stretch",
    justifyContent: "center",
  },
  componentsSearchDefault: {
    height: 40,
    paddingBottom: Padding.p_3xs,
    paddingRight: Padding.p_3xs,
    paddingTop: Padding.p_3xs,
    paddingLeft: Padding.p_8xs,
    borderWidth: 1,
    borderColor: Color.colorDarkgray_100,
    borderStyle: "solid",
    borderRadius: Border.br_5xs,
    marginTop: 5,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  labelThisAddress: {
    color: Color.colorDimgray_100,
    fontSize: FontSize.size_3xs,
    lineHeight: 15,
    fontFamily: FontFamily.montserratRegular,
  },
  frameParent: {
    paddingTop: Padding.p_xl,
    alignSelf: "stretch",
  },
  icons8Location10022: {
    width: 30,
    height: 30,
  },
  locationFrame: {
    transform: [
      {
        rotate: "180deg",
      },
    ],
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  uscTalamban: {
    fontWeight: "600",
    fontFamily: FontFamily.montserratSemiBold,
    color: Color.colorSilver_300,
    lineHeight: 15,
    fontSize: FontSize.levelSemibold14_size,
  },
  barangayNasipitTalamban: {
    color: Color.colorDarkgray_300,
    fontSize: FontSize.size_3xs,
    lineHeight: 15,
    fontFamily: FontFamily.montserratRegular,
  },
  uscTalambanParent: {
    marginLeft: 10,
    flex: 1,
    overflow: "hidden",
  },
  componentsSearchDefault1: {
    backgroundColor: Color.colorWhitesmoke_300,
    paddingBottom: Padding.p_3xs,
    paddingRight: Padding.p_3xs,
    paddingTop: Padding.p_3xs,
    paddingLeft: Padding.p_8xs,
    borderWidth: 1,
    borderColor: Color.colorDarkgray_100,
    borderStyle: "solid",
    borderRadius: Border.br_5xs,
    marginTop: 5,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  addressDetails: {
    color: Color.colorGray_300,
  },
  noteToServiceProviderParent: {
    paddingBottom: Padding.p_xl,
  },
  viewAllServices: {
    fontSize: FontSize.buttonBold15_size,
    letterSpacing: -0.1,
    lineHeight: 24,
    fontWeight: "700",
    fontFamily: FontFamily.buttonBold15,
    color: Color.colorGray_400,
    textAlign: "center",
  },
  componentsbutton: {
    borderRadius: Border.br_mini,
    backgroundColor: Color.colorSilver_200,
    paddingHorizontal: Padding.p_3xl,
    paddingVertical: Padding.p_xs,
    justifyContent: "center",
    alignItems: "center",
  },
  componentsbuttonWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  noInputdefault: {
    borderTopLeftRadius: Border.br_5xl,
    borderTopRightRadius: Border.br_5xl,
    backgroundColor: "#fff",
    paddingHorizontal: Padding.p_base,
    paddingBottom: Padding.p_xl,
    alignSelf: "stretch",
  },
  contentContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});

export default NoInputDefault;
