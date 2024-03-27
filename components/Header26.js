import React, { useState, useCallback } from "react";
import {
  View,
  StyleProp,
  ViewStyle,
  StyleSheet,
  Text,
  Pressable,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import MultipleLocationModal from "./MultipleLocationModal";
import { Color, Padding, FontSize, FontFamily, Border } from "../GlobalStyles";

const Header26 = ({ style }) => {
  const [locationBtnVisible, setLocationBtnVisible] = useState(false);

  const openLocationBtn = useCallback(() => {
    setLocationBtnVisible(true);
  }, []);

  const closeLocationBtn = useCallback(() => {
    setLocationBtnVisible(false);
  }, []);

  return (
    <>
      <SafeAreaView style={[styles.header, style]}>
        <View style={[styles.view, styles.locationFlexBox]}>
          <View style={styles.serbisyouwhite2Wrapper}>
            <Image
              style={styles.serbisyouwhite2Icon}
              contentFit="cover"
              source={require("../assets/serbisyouwhite-2.png")}
            />
          </View>
          <Text style={[styles.serbisyou, styles.serbisyouFlexBox]}>
            SerbisYou
          </Text>
          <View style={styles.frame}>
            <Pressable style={styles.locationBtn} onPress={openLocationBtn}>
              <View
                style={[styles.currentLocationWrapper, styles.locationFlexBox]}
              >
                <Text style={[styles.currentLocation, styles.serbisyouFlexBox]}>
                  Current Location
                </Text>
              </View>
              <View style={[styles.locationBtn1, styles.locationFlexBox]}>
                <View style={styles.talambanCebuCityWrapper}>
                  <Text style={styles.talambanCebuCity}>
                    Talamban, Cebu City
                  </Text>
                </View>
                <View style={styles.locationBtnInner}>
                  <Image
                    style={styles.frameChild}
                    contentFit="cover"
                    source={require("../assets/vector-4.png")}
                  />
                </View>
              </View>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>

      <Modal animationType="fade" transparent visible={locationBtnVisible}>
        <View style={styles.locationBtnOverlay}>
          <Pressable style={styles.locationBtnBg} onPress={closeLocationBtn} />
          <MultipleLocationModal onClose={closeLocationBtn} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.colorDarkslateblue_100,
  },
  locationFlexBox: {
    alignSelf: "stretch",
    alignItems: "center",
    flexDirection: "row",
  },
  serbisyouFlexBox: {
    textAlign: "left",
    color: Color.white,
  },
  serbisyouwhite2Icon: {
    width: 63,
    height: 49,
  },
  serbisyouwhite2Wrapper: {
    paddingLeft: Padding.p_xs,
    paddingTop: Padding.p_7xs,
    paddingBottom: Padding.p_7xs,
  },
  serbisyou: {
    fontSize: FontSize.title3Bold20_size,
    letterSpacing: 0.5,
    fontWeight: "700",
    fontFamily: FontFamily.title2Bold32,
    width: 131,
  },
  locationBtnOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  locationBtnBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  currentLocation: {
    fontSize: FontSize.size_4xs,
    letterSpacing: 0.6,
    lineHeight: 12,
    textTransform: "uppercase",
    fontWeight: "500",
    fontFamily: FontFamily.level2Medium12,
    display: "flex",
    width: 101,
    height: 18,
    alignItems: "center",
  },
  currentLocationWrapper: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  talambanCebuCity: {
    fontSize: FontSize.typographyTaglineSmallRegular_size,
    fontFamily: FontFamily.abhayaLibreExtraBold,
    textAlign: "center",
    color: Color.white,
  },
  talambanCebuCityWrapper: {
    justifyContent: "flex-end",
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  frameChild: {
    borderRadius: Border.br_12xs,
    width: 11,
    height: 6,
  },
  locationBtnInner: {
    marginLeft: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  locationBtn1: {
    marginTop: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  locationBtn: {
    alignItems: "flex-end",
    justifyContent: "center",
    flex: 1,
  },
  frame: {
    paddingHorizontal: Padding.p_smi,
    paddingVertical: 0,
    justifyContent: "flex-end",
    flex: 1,
    flexDirection: "row",
  },
  view: {
    paddingHorizontal: 0,
    paddingVertical: Padding.p_5xs,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default Header26;
