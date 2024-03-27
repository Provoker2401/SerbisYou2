import * as React from "react";
import {
  StatusBar,
  StyleSheet,
  Pressable,
  View,
  Text,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, FontSize, FontFamily, Border } from "../GlobalStyles";

const SetNewPassword = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.setNewPassword}>
      <StatusBar barStyle="default" />
      <ScrollView
        style={styles.body}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.bodyScrollViewContent}
      >
        <View style={[styles.textWrapper, styles.textFlexBox]}>
          <View style={[styles.text, styles.textFlexBox]}>
            <View style={styles.setNewPasswordWrapper}>
              <Text style={styles.setNewPassword1}>Set New Password</Text>
            </View>
            <View style={styles.yourNewPasswordMustBeDiffWrapper}>
              <Text style={styles.yourNewPassword}>
                Your new password must be different from previous used password
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.bodyInner, styles.bodyFlexBox]}>
          <View style={styles.frameParent}>
            <View style={styles.inputParent}>
              <View style={styles.input}>
                <TextInput
                  style={styles.newPasswordInput}
                  placeholder="Enter Your New Password"
                  placeholderTextColor="#d0d0d0"
                />
                <View style={styles.eyeOffWrapper}>
                  <Image
                    style={styles.eyeOffIcon}
                    contentFit="cover"
                    source={require("../assets/eye-off1.png")}
                  />
                </View>
              </View>
              <View style={styles.mustBeAtleast8CharactersWrapper}>
                <Text style={styles.mustBeAtleast}>
                  Must be atleast 8 characters
                </Text>
              </View>
            </View>
            <View style={styles.inputGroup}>
              <View style={styles.input}>
                <TextInput
                  style={styles.newPasswordInput}
                  placeholder="Confirm New Password"
                  placeholderTextColor="#d0d0d0"
                />
                <View style={styles.eyeOffWrapper}>
                  <Image
                    style={styles.eyeOffIcon}
                    contentFit="cover"
                    source={require("../assets/eye-off1.png")}
                  />
                </View>
              </View>
              <View style={styles.mustBeAtleast8CharactersWrapper}>
                <Text style={styles.mustBeAtleast}>
                  Both passwords must match
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.bodyChild, styles.bodyFlexBox]}>
          <View style={styles.saveBtnWrapper}>
            <Pressable
              style={styles.frameParent}
              onPress={() => navigation.navigate("ForgotPasswordUpdated")}
            >
              <View style={styles.button}>
                <Text style={[styles.button1, styles.button1Typo]}>Save</Text>
              </View>
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
    paddingTop: 20,
    paddingBottom: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  button1Typo: {
    color: Color.white,
    textAlign: "center",
    fontWeight: "700",
  },
  textFlexBox: {
    paddingHorizontal: Padding.p_3xl,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  bodyFlexBox: {
    marginTop: 40,
    paddingHorizontal: Padding.p_3xl,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  setNewPassword1: {
    fontSize: FontSize.size_5xl,
    lineHeight: 30,
    fontFamily: FontFamily.poppinsBold,
    color: Color.textColorContentSecondary,
    textAlign: "center",
    fontWeight: "700",
  },
  setNewPasswordWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  yourNewPassword: {
    fontSize: FontSize.m3LabelLarge_size,
    lineHeight: 22,
    fontFamily: FontFamily.bodyLgBodyLgRegular,
    color: Color.neutralGray400,
    textAlign: "center",
    flex: 1,
  },
  yourNewPasswordMustBeDiffWrapper: {
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  text: {
    paddingVertical: 0,
  },
  textWrapper: {
    paddingTop: Padding.p_11xl,
  },
  newPasswordInput: {
    fontFamily: FontFamily.poppinsMedium,
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    fontWeight: "500",
    flexDirection: "row",
    flex: 1,
  },
  eyeOffIcon: {
    width: 22,
    opacity: 0.9,
    height: 24,
  },
  eyeOffWrapper: {
    marginLeft: 20,
    justifyContent: "center",
    flexDirection: "row",
  },
  input: {
    borderRadius: Border.br_5xs,
    borderStyle: "solid",
    borderColor: Color.colorSilver_300,
    borderWidth: 1,
    paddingHorizontal: Padding.p_2xs,
    paddingVertical: Padding.p_mid,
    justifyContent: "center",
    overflow: "hidden",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  mustBeAtleast: {
    fontSize: FontSize.level2Medium12_size,
    fontFamily: FontFamily.workSansMedium,
    color: Color.colorCrimson_100,
    textAlign: "left",
    fontWeight: "500",
  },
  mustBeAtleast8CharactersWrapper: {
    marginTop: 2,
    flexDirection: "row",
  },
  inputParent: {
    justifyContent: "center",
    alignSelf: "stretch",
  },
  inputGroup: {
    marginTop: 20,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  frameParent: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  bodyInner: {
    paddingVertical: 0,
  },
  button1: {
    fontFamily: FontFamily.georamaBold,
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    textAlign: "center",
  },
  button: {
    borderRadius: Border.br_xs,
    height: 50,
    paddingHorizontal: Padding.p_5xs,
    paddingVertical: Padding.p_xl,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    backgroundColor: Color.colorDarkslateblue_100,
  },
  saveBtnWrapper: {
    paddingHorizontal: 0,
    paddingVertical: Padding.p_21xl,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  bodyChild: {
    paddingTop: Padding.p_21xl,
  },
  body: {
    backgroundColor: Color.colorWhitesmoke_100,
    alignSelf: "stretch",
    flex: 1,
  },
  setNewPassword: {
    height: 812,
    width: "100%",
    flex: 1,
    backgroundColor: Color.white,
  },
});

export default SetNewPassword;
