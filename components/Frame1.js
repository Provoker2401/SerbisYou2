import * as React from "react";
import {
  View,
  StyleProp,
  ViewStyle,
  Pressable,
  Text,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontSize, FontFamily, Border, Padding } from "../GlobalStyles";

const Frame1 = ({ style }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.frame, style]}>
      <View style={styles.view}>
        <View style={styles.frame1}>
          <Pressable
            style={styles.skipBtn}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text style={styles.skip}>Skip</Text>
          </Pressable>
          <View style={styles.frameInner}>
            <Image
              style={styles.frameChild}
              contentFit="cover"
              source={require("../assets/ellipse-229.png")}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  frame: {
    backgroundColor: Color.white,
  },
  skip: {
    fontSize: FontSize.m3LabelLarge_size,
    fontWeight: "500",
    fontFamily: FontFamily.level2Medium12,
    color: Color.colorGray_600,
    textAlign: "center",
  },
  skipBtn: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorDeepskyblue_200,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_5xs,
    alignItems: "center",
    zIndex: 0,
    justifyContent: "center",
    flexDirection: "row",
  },
  frameChild: {
    width: 80,
    height: 80,
  },
  frameInner: {
    position: "absolute",
    top: -48,
    left: -40,
    zIndex: 1,
    flexDirection: "row",
  },
  frame1: {
    flex: 1,
    paddingRight: Padding.p_mini,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  view: {
    alignSelf: "stretch",
    paddingTop: Padding.p_4xl,
    justifyContent: "center",
    flexDirection: "row",
  },
});

export default Frame1;
