import * as React from "react";
import {
  StatusBar,
  StyleSheet,
  Pressable,
  TextInput,
  View,
  ScrollView,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";

const GardeningSubcategory = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.gardeningSubcategory, styles.uiIconlistfilledLayout]}>
      <StatusBar barStyle="default" />
      <ScrollView
        style={styles.body}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.bodyScrollViewContent}
      >
        <View style={styles.componentsserviceList}>
          <View style={styles.componentsserviceListInner}>
            <View style={[styles.frameGroup, styles.backFrameFlexBox]}>
              <View style={[styles.backBtnParent, styles.backFrameFlexBox]}>
                <View style={styles.tag} />
                <Text style={[styles.gardening, styles.gardeningTypo]}>
                  Gardening
                </Text>
              </View>
              <View style={[styles.grid, styles.gridFlexBox]}>
                <View
                  style={[styles.uiIconlistfilledWrapper, styles.gridFlexBox]}
                >
                  <Image
                    style={[
                      styles.uiIconlistfilled,
                      styles.uiIconlistfilledLayout,
                    ]}
                    contentFit="cover"
                    source={require("../assets/ui-iconlistfilled.png")}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.stFrameWrapper}>
            <View style={styles.stFrame}>
              <View style={styles.dividerLayout} />
              <Pressable
                style={[styles.gardenMaintenanceBtn, styles.backFrameFlexBox]}
                onPress={() =>
                  navigation.navigate("GardenMaintenanceSubcategory")
                }
              >
                <View style={styles.frame}>
                  <Image
                    style={styles.maskGroupIcon}
                    contentFit="cover"
                    source={require("../assets/mask-group3.png")}
                  />
                </View>
                <View style={styles.frameContainer}>
                  <View style={styles.stFrame}>
                    <View style={styles.backFrameFlexBox}>
                      <Text
                        style={[styles.gardenMaintenance, styles.gardeningTypo]}
                      >
                        Garden Maintenance
                      </Text>
                    </View>
                  </View>
                  <View style={styles.frameView}>
                    <View style={styles.backFrameFlexBox}>
                      <Text style={[styles.startsFrom, styles.php200Typo]}>
                        Starts From
                      </Text>
                    </View>
                    <View style={[styles.number, styles.numberFlexBox]}>
                      <Text style={[styles.php200, styles.php200Typo]}>
                        Php 200
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
              <View style={[styles.divider1, styles.dividerLayout]} />
            </View>
          </View>
          <View style={styles.stFrameWrapper}>
            <View style={styles.stFrame}>
              <Pressable
                style={[styles.frameGroup, styles.backFrameFlexBox]}
                onPress={() =>
                  navigation.navigate("LandscapeDesignSubcategory")
                }
              >
                <View style={styles.frame}>
                  <Image
                    style={styles.maskGroupIcon}
                    contentFit="cover"
                    source={require("../assets/mask-group4.png")}
                  />
                </View>
                <View style={styles.frameContainer}>
                  <View style={styles.stFrame}>
                    <View style={styles.backFrameFlexBox}>
                      <Text
                        style={[styles.gardenMaintenance, styles.gardeningTypo]}
                      >
                        Landscape Design and Planning
                      </Text>
                    </View>
                  </View>
                  <View style={styles.frameView}>
                    <View style={styles.backFrameFlexBox}>
                      <Text style={[styles.startsFrom, styles.php200Typo]}>
                        Starts From
                      </Text>
                    </View>
                    <View style={[styles.number1, styles.numberFlexBox]}>
                      <Text style={[styles.php200, styles.php200Typo]}>
                        Php 1000
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
              <View style={[styles.divider1, styles.dividerLayout]} />
            </View>
          </View>
          <View style={styles.stFrameWrapper}>
            <View style={styles.stFrame}>
              <Pressable
                style={[styles.frameGroup, styles.backFrameFlexBox]}
                onPress={() =>
                  navigation.navigate("IrrigationSystemSubcategory")
                }
              >
                <View style={styles.frame}>
                  <Image
                    style={styles.maskGroupIcon}
                    contentFit="cover"
                    source={require("../assets/mask-group5.png")}
                  />
                </View>
                <View style={styles.frameContainer}>
                  <View style={styles.stFrame}>
                    <View style={styles.backFrameFlexBox}>
                      <Text
                        style={[styles.gardenMaintenance, styles.gardeningTypo]}
                      >
                        Irrigation System Installation / Repairs
                      </Text>
                    </View>
                  </View>
                  <View style={styles.frameView}>
                    <View style={styles.backFrameFlexBox}>
                      <Text style={[styles.startsFrom, styles.php200Typo]}>
                        Starts From
                      </Text>
                    </View>
                    <View style={[styles.number1, styles.numberFlexBox]}>
                      <Text style={[styles.php200, styles.php200Typo]}>
                        Php 2250
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
              <View style={[styles.divider1, styles.dividerLayout]} />
            </View>
          </View>
          <View style={styles.stFrameWrapper}>
            <View style={styles.stFrame}>
              <Pressable
                style={[styles.frameGroup, styles.backFrameFlexBox]}
                onPress={() => navigation.navigate("PestDiseaseManagementSubc")}
              >
                <View style={styles.frame}>
                  <Image
                    style={styles.maskGroupIcon}
                    contentFit="cover"
                    source={require("../assets/mask-group6.png")}
                  />
                </View>
                <View style={styles.frameContainer}>
                  <View style={styles.stFrame}>
                    <View style={styles.backFrameFlexBox}>
                      <Text
                        style={[styles.gardenMaintenance, styles.gardeningTypo]}
                      >
                        Pest and Disease Management
                      </Text>
                    </View>
                  </View>
                  <View style={styles.frameView}>
                    <View style={styles.backFrameFlexBox}>
                      <Text style={[styles.startsFrom, styles.php200Typo]}>
                        Starts From
                      </Text>
                    </View>
                    <View style={[styles.number, styles.numberFlexBox]}>
                      <Text style={[styles.php200, styles.php200Typo]}>
                        Php 750
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  componentstopNavigation: {
    backgroundColor: "#18244d",
  },
  bodyScrollViewContent: {
    flexDirection: "column",
    paddingHorizontal: 0,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  uiIconlistfilledLayout: {
    width: "100%",
    flex: 1,
  },
  backFrameFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  gardeningTypo: {
    textAlign: "left",
    color: Color.neutral07,
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
  },
  gridFlexBox: {
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  php200Typo: {
    fontSize: FontSize.level2Medium12_size,
    textAlign: "left",
  },
  numberFlexBox: {
    paddingHorizontal: Padding.p_7xs,
    backgroundColor: Color.colorDeepskyblue_200,
    borderRadius: Border.br_7xs,
    paddingVertical: 0,
    overflow: "hidden",
    height: 24,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  dividerLayout: {
    height: 3,
    backgroundColor: Color.neutral03,
    borderRadius: Border.br_11xs,
    overflow: "hidden",
    alignSelf: "stretch",
  },
  tag: {
    borderRadius: Border.br_9xs,
    width: 3,
    height: 20,
    backgroundColor: Color.colorSteelblue_100,
    overflow: "hidden",
  },
  gardening: {
    fontSize: FontSize.title4Regular18_size,
    marginLeft: 9,
    letterSpacing: -0.4,
    textAlign: "left",
    flex: 1,
  },
  backBtnParent: {
    flex: 1,
  },
  uiIconlistfilled: {
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
    alignSelf: "stretch",
  },
  uiIconlistfilledWrapper: {
    backgroundColor: Color.neutral01,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    elevation: 8,
    shadowOpacity: 1,
    width: 36,
    height: 36,
    padding: Padding.p_5xs,
    borderRadius: Border.br_5xs,
  },
  grid: {
    marginLeft: 96,
    alignItems: "center",
    flex: 1,
  },
  frameGroup: {
    alignSelf: "stretch",
  },
  componentsserviceListInner: {
    alignSelf: "stretch",
    alignItems: "center",
  },
  maskGroupIcon: {
    width: 115,
    height: 132,
  },
  frame: {
    height: 132,
    overflow: "hidden",
    alignItems: "center",
  },
  gardenMaintenance: {
    letterSpacing: -0.1,
    fontSize: FontSize.m3LabelLarge_size,
  },
  stFrame: {
    alignSelf: "stretch",
  },
  startsFrom: {
    letterSpacing: -0.2,
    lineHeight: 17,
    fontWeight: "500",
    fontFamily: FontFamily.level2Medium12,
    color: Color.neutralShades0475,
  },
  php200: {
    color: Color.neutral07,
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
    fontSize: FontSize.level2Medium12_size,
    letterSpacing: -0.4,
  },
  number: {
    width: 61,
  },
  frameView: {
    marginTop: 12,
    alignSelf: "stretch",
  },
  frameContainer: {
    paddingHorizontal: Padding.p_6xs,
    marginLeft: 16,
    paddingVertical: 0,
    justifyContent: "center",
    flex: 1,
  },
  gardenMaintenanceBtn: {
    marginTop: 10,
    alignSelf: "stretch",
  },
  divider1: {
    marginTop: 10,
  },
  stFrameWrapper: {
    marginTop: 10,
    alignSelf: "stretch",
    alignItems: "center",
  },
  number1: {
    width: 65,
  },
  componentsserviceList: {
    padding: Padding.p_base,
    borderRadius: Border.br_5xs,
    justifyContent: "center",
    alignSelf: "stretch",
    alignItems: "center",
    backgroundColor: Color.white,
  },
  body: {
    alignSelf: "stretch",
    flex: 1,
    backgroundColor: Color.white,
  },
  gardeningSubcategory: {
    height: 812,
    alignItems: "center",
    backgroundColor: Color.white,
  },
});

export default GardeningSubcategory;
