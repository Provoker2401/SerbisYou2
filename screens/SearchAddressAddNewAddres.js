import * as React from "react";
import {
  StatusBar,
  StyleSheet,
  Pressable,
  View,
  TextInput,
  Text,
  ImageBackground,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Padding, Border, Color, FontFamily, FontSize } from "../GlobalStyles";

const SearchAddressAddNewAddres = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.searchAddressAddNewAddres}>
      <StatusBar barStyle="default" />
      <View style={styles.body}>
        <ImageBackground
          style={styles.frameParent}
          resizeMode="cover"
          source={require("../assets/frame26085004.png")}
        >
          <View style={[styles.backBtnWrapper, styles.wrapperSpaceBlock]}>
            <Pressable
              style={[styles.backBtn, styles.btnWrapperFlexBox]}
              onPress={() => navigation.goBack()}
            >
              <Image
                style={styles.vectorIcon}
                contentFit="cover"
                source={require("../assets/vector9.png")}
              />
            </Pressable>
          </View>
          <View style={styles.icons8Location10021Wrapper}>
            <Image
              style={styles.icons8Location10021}
              contentFit="cover"
              source={require("../assets/icons8location100-2-2.png")}
            />
          </View>
          <View style={styles.currentLocationBtnWrapper}>
            <Pressable style={styles.currentLocationBtn}>
              <View
                style={[styles.locationTargetWrapper, styles.btnWrapperFlexBox]}
              >
                <Image
                  style={styles.locationTargetIconLayout}
                  contentFit="cover"
                  source={require("../assets/location-target2.png")}
                />
              </View>
            </Pressable>
          </View>
          <View style={styles.searchAdddresModal}>
            <View style={styles.frameGroup}>
              <View style={styles.frameFlexBox}>
                <View style={[styles.vectorWrapper, styles.btnWrapperFlexBox]}>
                  <Image
                    style={styles.frameChild}
                    contentFit="cover"
                    source={require("../assets/line-76.png")}
                  />
                </View>
              </View>
              <View style={styles.frameContainer}>
                <View
                  style={[
                    styles.componentsSearchDefaultWrapper,
                    styles.btnWrapperFlexBox,
                  ]}
                >
                  <View
                    style={[
                      styles.componentsSearchDefault,
                      styles.btnWrapperFlexBox,
                    ]}
                  >
                    <Pressable
                      style={[styles.iconOutline, styles.btnWrapperFlexBox]}
                      onPress={() => navigation.goBack()}
                    >
                      <Image
                        style={[
                          styles.uiIconarrowBackwardfilled,
                          styles.locationTargetIconLayout,
                        ]}
                        contentFit="cover"
                        source={require("../assets/ui-iconarrow-backwardfilled.png")}
                      />
                    </Pressable>
                    <View
                      style={[
                        styles.componentsSearchDefault1,
                        styles.btnWrapperFlexBox,
                      ]}
                    >
                      <View style={styles.addressFrame}>
                        <TextInput
                          style={styles.enterAddressInput}
                          placeholder="Enter your address"
                          placeholderTextColor="#979696"
                        />
                        <Pressable
                          style={[styles.closeBtn, styles.btnWrapperFlexBox]}
                        >
                          <Image
                            style={styles.vectorIcon1}
                            contentFit="cover"
                            source={require("../assets/vector10.png")}
                          />
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={[styles.frameView, styles.frameFlexBox]}>
                <View style={[styles.vectorWrapper, styles.btnWrapperFlexBox]}>
                  <Image
                    style={[styles.frameItem, styles.frameLayout]}
                    contentFit="cover"
                    source={require("../assets/line-762.png")}
                  />
                </View>
              </View>
              <View style={[styles.vectorFrame, styles.frameLayout]}>
                <Image
                  style={[styles.frameInner, styles.frameLayout1]}
                  contentFit="cover"
                  source={require("../assets/line-749.png")}
                />
              </View>
              <View style={[styles.frameParent1, styles.btnWrapperFlexBox]}>
                <View
                  style={[styles.image2397Wrapper, styles.btnWrapperFlexBox]}
                >
                  <Image
                    style={styles.image2397Icon}
                    contentFit="cover"
                    source={require("../assets/image-2397.png")}
                  />
                </View>
                <View
                  style={[
                    styles.enterAnAddressToExploreSeWrapper,
                    styles.btnWrapperFlexBox,
                  ]}
                >
                  <Text
                    style={[styles.enterAnAddress, styles.btnWrapperFlexBox]}
                  >
                    Enter an address to explore service providers around you
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperSpaceBlock: {
    paddingVertical: Padding.p_mini,
    flexDirection: "row",
  },
  btnWrapperFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  locationTargetIconLayout: {
    height: 24,
    width: 24,
  },
  frameFlexBox: {
    paddingTop: Padding.p_5xs,
    height: 8,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  frameLayout: {
    height: 1,
    alignSelf: "stretch",
  },
  frameLayout1: {
    maxWidth: "100%",
    overflow: "hidden",
    width: "100%",
  },
  vectorIcon: {
    width: 15,
    height: 15,
  },
  backBtn: {
    paddingVertical: Padding.p_9xs,
    paddingHorizontal: Padding.p_xs,
    height: 40,
    width: 40,
    borderRadius: Border.br_xl,
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: Color.white,
  },
  backBtnWrapper: {
    top: 0,
    left: 16,
    paddingHorizontal: 0,
    zIndex: 0,
    position: "absolute",
  },
  icons8Location10021: {
    width: 50,
    height: 50,
  },
  icons8Location10021Wrapper: {
    top: 252,
    left: 28,
    padding: Padding.p_3xs,
    zIndex: 1,
    overflow: "hidden",
    position: "absolute",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  locationTargetWrapper: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    paddingVertical: Padding.p_9xs,
    paddingHorizontal: Padding.p_xs,
    height: 40,
    width: 40,
    borderRadius: Border.br_xl,
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: Color.white,
  },
  currentLocationBtn: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  currentLocationBtnWrapper: {
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_xl,
    alignItems: "flex-end",
    zIndex: 2,
    justifyContent: "flex-end",
    alignSelf: "stretch",
  },
  frameChild: {
    width: 41,
    height: 3,
  },
  vectorWrapper: {
    height: 0,
    alignSelf: "stretch",
  },
  uiIconarrowBackwardfilled: {
    overflow: "hidden",
  },
  iconOutline: {
    flexDirection: "row",
  },
  enterAddressInput: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: FontSize.level2Medium12_size,
    flexDirection: "row",
    flex: 1,
  },
  vectorIcon1: {
    width: 16,
    height: 16,
  },
  closeBtn: {
    marginLeft: 5,
    flexDirection: "row",
  },
  addressFrame: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorWhitesmoke_300,
    paddingLeft: Padding.p_3xs,
    paddingTop: Padding.p_8xs,
    paddingRight: Padding.p_5xs,
    paddingBottom: Padding.p_8xs,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  componentsSearchDefault1: {
    borderRadius: Border.br_5xs,
    marginLeft: 10,
    flexDirection: "row",
    flex: 1,
  },
  componentsSearchDefault: {
    overflow: "hidden",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  componentsSearchDefaultWrapper: {
    alignSelf: "stretch",
  },
  frameContainer: {
    paddingHorizontal: Padding.p_mini,
    paddingVertical: Padding.p_3xs,
    marginTop: 3,
    alignSelf: "stretch",
    alignItems: "center",
  },
  frameItem: {
    maxWidth: "100%",
    overflow: "hidden",
    width: "100%",
  },
  frameView: {
    marginTop: 3,
  },
  frameInner: {
    maxHeight: "100%",
    alignSelf: "stretch",
    flex: 1,
  },
  vectorFrame: {
    display: "none",
    marginTop: 3,
    alignItems: "center",
  },
  image2397Icon: {
    width: 150,
    height: 150,
  },
  image2397Wrapper: {
    paddingTop: Padding.p_xl,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  enterAnAddress: {
    fontSize: FontSize.m3LabelLarge_size,
    lineHeight: 15,
    fontWeight: "500",
    fontFamily: FontFamily.montserratMedium,
    color: Color.colorGray_800,
    textAlign: "center",
    display: "flex",
    height: 35,
    flex: 1,
  },
  enterAnAddressToExploreSeWrapper: {
    paddingHorizontal: Padding.p_31xl,
    marginTop: 10,
    paddingVertical: Padding.p_mini,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  frameParent1: {
    marginTop: 3,
    alignSelf: "stretch",
  },
  frameGroup: {
    borderTopLeftRadius: Border.br_5xl,
    borderTopRightRadius: Border.br_5xl,
    paddingBottom: Padding.p_256xl,
    overflow: "hidden",
    alignSelf: "stretch",
    alignItems: "center",
    backgroundColor: Color.white,
  },
  searchAdddresModal: {
    zIndex: 3,
    overflow: "hidden",
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
  searchAddressAddNewAddres: {
    height: 812,
    alignItems: "center",
    width: "100%",
    flex: 1,
    backgroundColor: Color.white,
  },
});

export default SearchAddressAddNewAddres;
