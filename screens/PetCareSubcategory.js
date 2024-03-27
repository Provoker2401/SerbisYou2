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
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";

const PetCareSubcategory = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.petCareSubcategory, styles.uiIconlistfilledLayout]}>
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
                <Text style={[styles.petCare, styles.petCareTypo]}>
                  Pet Care
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
                style={[styles.dogTrainingBtn, styles.backFrameFlexBox]}
                onPress={() =>
                  navigation.navigate("DogTrainingSubcategoryBlue")
                }
              >
                <View style={styles.frame}>
                  <Image
                    style={styles.maskGroupIcon}
                    contentFit="cover"
                    source={require("../assets/mask-group.png")}
                  />
                </View>
                <View style={[styles.frameContainer, styles.numberSpaceBlock]}>
                  <View style={styles.stFrame}>
                    <View style={styles.backFrameFlexBox}>
                      <Text style={[styles.dogTraining, styles.petCareTypo]}>
                        Dog Training
                      </Text>
                    </View>
                  </View>
                  <View style={styles.frameView}>
                    <View style={styles.backFrameFlexBox}>
                      <Text style={[styles.startsFrom, styles.php750Typo]}>
                        Starts From
                      </Text>
                    </View>
                    <View style={[styles.number, styles.numberSpaceBlock]}>
                      <Text style={[styles.php750, styles.php750Typo]}>
                        Php 750
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
                onPress={() => navigation.navigate("PetGroomingSubcategoryDog")}
              >
                <View style={styles.frame}>
                  <Image
                    style={styles.maskGroupIcon}
                    contentFit="cover"
                    source={require("../assets/mask-group1.png")}
                  />
                </View>
                <View style={[styles.frameContainer, styles.numberSpaceBlock]}>
                  <View style={styles.stFrame}>
                    <View style={styles.backFrameFlexBox}>
                      <Text style={[styles.dogTraining, styles.petCareTypo]}>
                        Pet Grooming
                      </Text>
                    </View>
                  </View>
                  <View style={styles.frameView}>
                    <View style={styles.backFrameFlexBox}>
                      <Text style={[styles.startsFrom, styles.php750Typo]}>
                        Starts From
                      </Text>
                    </View>
                    <View style={[styles.number, styles.numberSpaceBlock]}>
                      <Text style={[styles.php750, styles.php750Typo]}>
                        Php 250
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
                onPress={() => navigation.navigate("PetSittingSubcategoryDog")}
              >
                <View style={styles.frame}>
                  <Image
                    style={styles.maskGroupIcon}
                    contentFit="cover"
                    source={require("../assets/mask-group2.png")}
                  />
                </View>
                <View style={[styles.frameContainer, styles.numberSpaceBlock]}>
                  <View style={styles.stFrame}>
                    <View style={styles.backFrameFlexBox}>
                      <Text style={[styles.dogTraining, styles.petCareTypo]}>
                        Pet Sitting
                      </Text>
                    </View>
                  </View>
                  <View style={styles.frameView}>
                    <View style={styles.backFrameFlexBox}>
                      <Text style={[styles.startsFrom, styles.php750Typo]}>
                        Starts From
                      </Text>
                    </View>
                    <View style={[styles.number, styles.numberSpaceBlock]}>
                      <Text style={[styles.php750, styles.php750Typo]}>
                        Php 100
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
  numberLayout: {
    height: 24,
    overflow: "hidden",
  },
  petCareTypo: {
    textAlign: "left",
    color: Color.neutral07,
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
  },
  gridFlexBox: {
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  numberSpaceBlock: {
    paddingVertical: 0,
    justifyContent: "center",
  },
  php750Typo: {
    fontSize: FontSize.level2Medium12_size,
    textAlign: "left",
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
  petCare: {
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
  dogTraining: {
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
  php750: {
    color: Color.neutral07,
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
    fontSize: FontSize.level2Medium12_size,
    letterSpacing: -0.4,
  },
  number: {
    borderRadius: Border.br_7xs,
    backgroundColor: Color.colorDeepskyblue_200,
    width: 61,
    paddingHorizontal: Padding.p_7xs,
    overflow: "hidden",
    height: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  frameView: {
    marginTop: 12,
    alignSelf: "stretch",
  },
  frameContainer: {
    paddingHorizontal: Padding.p_6xs,
    marginLeft: 16,
    flex: 1,
  },
  dogTrainingBtn: {
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
  petCareSubcategory: {
    height: 812,
    alignItems: "center",
    backgroundColor: Color.white,
  },
});

export default PetCareSubcategory;
