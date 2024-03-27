import * as React from "react";
import {
  View,
  StyleProp,
  ViewStyle,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, FontFamily, FontSize, Border } from "../GlobalStyles";

const ComponentsTopNavigation3 = ({ style }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.componentstopNavigation, style]}>
      <View style={[styles.view, styles.backParentFlexBox]}>
        <View style={[styles.frameParent, styles.backParentFlexBox]}>
          <View style={[styles.backBtnParent, styles.backParentFlexBox]}>
            <Pressable
              style={[styles.backBtn, styles.backParentFlexBox]}
              onPress={() => navigation.goBack()}
            >
              <Image
                style={styles.icon24pxbackArrow}
                contentFit="cover"
                source={require("../assets/icon24pxback-arrow1.png")}
              />
            </Pressable>
            <View style={styles.searchCategoryWrapper}>
              <TextInput
                style={styles.searchCategory}
                placeholder="Search Category"
                placeholderTextColor="#9b9e9f"
              />
            </View>
          </View>
          <Pressable style={[styles.searchBtn, styles.backParentFlexBox]}>
            <View style={styles.searchBtnChild} />
            <Image
              style={styles.icon16pxsearch}
              contentFit="cover"
              source={require("../assets/icon16pxsearch.png")}
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  componentstopNavigation: {
    backgroundColor: Color.colorDarkslateblue_200,
  },
  backParentFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  icon24pxbackArrow: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
  backBtn: {
    width: 48,
    padding: Padding.p_xs,
    justifyContent: "center",
  },
  searchCategory: {
    fontFamily: FontFamily.title4Regular18,
    fontSize: FontSize.m3LabelLarge_size,
    alignSelf: "stretch",
  },
  searchCategoryWrapper: {
    marginLeft: 7,
    justifyContent: "center",
    flex: 1,
  },
  backBtnParent: {
    flex: 1,
  },
  searchBtnChild: {
    borderRadius: Border.br_5xs,
    backgroundColor: Color.colorSteelblue_100,
    width: 32,
    height: 32,
    zIndex: 0,
  },
  icon16pxsearch: {
    position: "absolute",
    // marginTop: -8,
    top: 8,
    right: 8,
    width: 16,
    height: 16,
    zIndex: 1,
  },
  searchBtn: {
    marginLeft: 8,
  },
  frameParent: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorGray_200,
    borderStyle: "solid",
    borderColor: Color.colorWhitesmoke_400,
    borderWidth: 0.9,
    paddingRight: Padding.p_5xs,
    flex: 1,
  },
  view: {
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_xs,
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
});

export default ComponentsTopNavigation3;
