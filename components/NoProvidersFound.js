import * as React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Padding, Border } from "../GlobalStyles";

const NoProvidersFound = ({ onClose }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.cancelBookingSuccessful}>

      <View style={styles.content}>
      <Image
          style={styles.checkIcon}
          contentFit="cover"
          source={require("../assets/notfound.png")}
        />
        <View style={styles.text}>
          <View style={styles.text}>
            <Text
              style={[
                styles.cancelBookingSuccessful1,
                styles.youHaveSuccessfullyFlexBox,
              ]}
            >
              No Service Providers Found Nearby
            </Text>
            <Text
              style={[
                styles.youHaveSuccessfully,
                styles.youHaveSuccessfullyFlexBox,
              ]}
            >
              Oops! It looks like there are no service providers available in
              your area at the moment. Please try again later or expand your
              search radius.
            </Text>
          </View>
          <Pressable
            style={styles.okBtn}
            onPress={() =>
              navigation.navigate("BottomTabsRoot", { screen: "Homepage" })
            }
          >
            <View style={styles.button}>
              <Text style={[styles.buttonText, styles.buttonTextTypo]}>OK</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  youHaveSuccessfullyFlexBox: {
    textAlign: "center",
    alignSelf: "stretch",
  },
  buttonTextTypo: {
    fontFamily: FontFamily.workSansMedium,
    fontWeight: "500",
  },
  checkIcon: {
    width: 200,
    height: 200,
  },
  checkWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  cancelBookingSuccessful1: {
    fontSize: 21,
    textTransform: "capitalize",
    color: Color.heading,
    fontFamily: FontFamily.workSansMedium,
    fontWeight: "500",
  },
  youHaveSuccessfully: {
    fontSize: FontSize.m3LabelLarge_size,
    lineHeight: 20,
    fontFamily: FontFamily.workSansRegular,
    color: Color.bg,
    marginTop: 12,
  },
  text: {
    alignSelf: "stretch",
    alignItems: "center",
  },
  buttonText: {
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    color: Color.white,
    textAlign: "left",
  },
  button: {
    backgroundColor: Color.colorDarkslateblue_100,
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: Padding.p_smi,
    marginBottom:20,
    justifyContent: "center",
    alignSelf: "stretch",
    flexDirection: "row",
    borderRadius: Border.br_xs,
  },
  okBtn: {
    marginTop: 45,
    alignSelf: "stretch",
    alignItems: "center",
  },
  content: {
    paddingHorizontal: 50,
    marginTop: "auto",
    marginBottom: "auto",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
  },
  cancelBookingSuccessful: {
    backgroundColor: 'rgba(128, 128, 128, 0.8)', // Adjust the alpha value (0.8) as needed
    width: "100%",
    height: "100%",
    paddingHorizontal: Padding.p_xl,
    paddingTop: Padding.p_21xl,
    paddingBottom: Padding.p_14xl,
    maxWidth: "100%",
    maxHeight: "100%",
    alignItems: "center",
    borderRadius: Border.br_xs,
  },
});

export default NoProvidersFound;
