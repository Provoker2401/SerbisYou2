import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { FontFamily, Color, Padding } from "../GlobalStyles";

const Splash = () => {
  return (
    <View style={[styles.splash, styles.splashFlexBox]}>
      <View style={[styles.serbisyouwhite1Parent, styles.splashFlexBox]}>
        <Image
          style={[styles.serbisyouwhite1Icon]}
          contentFit="cover"
          source={require("../assets/serbisyouwhite-1.png")}
        />
        <Text style={styles.serbisyou}>SerbisYou</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  splashFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  serbisyouwhite1Icon: {
    height: 150,
    width: 150,

  },
  serbisyou: {
    fontSize: 36,
    letterSpacing: 0.9,
    fontWeight: "700",
    fontFamily: FontFamily.title2Bold32,
    color: Color.white,
    textAlign: "center",
    alignSelf: "stretch",
  },
  serbisyouwhite1Parent: {
    width: 190,
    height: 254,
    paddingHorizontal: 0,
    paddingVertical: Padding.p_11xl,
  },
  splash: {
    backgroundColor: Color.colorDarkslategray_900,
    height: 812,
    flexDirection: "row",
    paddingLeft: 92,
    paddingRight: 93,
    overflow: "hidden",
    width: "100%",
    flex: 1,
  },
});

export default Splash;
