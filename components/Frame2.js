import * as React from "react";
import { View, StyleProp, ViewStyle, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Color, Padding } from "../GlobalStyles";

const Frame2 = ({ style }) => {
  return (
    <SafeAreaView style={[styles.frame, style]}>
      <View style={styles.view}>
        <View style={styles.inner}>
          <Image
            style={styles.frameChild}
            contentFit="cover"
            source={require("../assets/ellipse-229.png")}
          />
        </View>
        <View style={styles.frame1} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  frame: {
    backgroundColor: Color.white,
  },
  frameChild: {
    width: 80,
    height: 80,
  },
  inner: {
    position: "absolute",
    top: -25,
    left: -40,
    zIndex: 0,
    flexDirection: "row",
  },
  frame1: {
    flex: 1,
    alignItems: "flex-end",
    zIndex: 1,
    justifyContent: "center",
  },
  view: {
    alignSelf: "stretch",
    paddingTop: Padding.p_4xl,
    paddingBottom: Padding.p_14xl,
    justifyContent: "center",
    flexDirection: "row",
  },
});

export default Frame2;
