import * as React from "react";
import {
  StatusBar,
  StyleSheet,
  Pressable,
  View,
  Text,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Padding, Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const PetGroomingSubcategoryBird = () => {
  return (
    <View style={styles.petGroomingSubcategoryBird}>
      <StatusBar barStyle="default" />
      <ScrollView
        style={styles.frameParent}
        indicatorStyle="default"
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={false}
        contentContainerStyle={styles.frameScrollViewContent}
      >
        <View style={[styles.petGroomingWrapper, styles.petParentFlexBox]}>
          <Text style={[styles.petGrooming, styles.petGroomingTypo]}>
            Pet Grooming
          </Text>
        </View>
        <View style={styles.componentspropertyTypeParent}>
          <View
            style={[
              styles.componentspropertyType,
              styles.componentspropertyTypeSpaceBlock,
            ]}
          >
            <View style={styles.titleFlexBox}>
              <View style={[styles.tag, styles.tagLayout]} />
              <Text style={[styles.typeOfPet, styles.dogFlexBox]}>
                Type of Pet
              </Text>
            </View>
            <View style={styles.newCustomers}>
              <View style={styles.customer}>
                <View style={[styles.customer1, styles.customerFlexBox]}>
                  <View style={[styles.home, styles.homeFlexBox]}>
                    <View style={[styles.home1, styles.homeFlexBox]}>
                      <View
                        style={[styles.homeChild, styles.homeChildLayout]}
                      />
                      <View style={styles.iconOutline}>
                        <Image
                          style={[
                            styles.whiteBeagleIcon,
                            styles.whiteIconPosition,
                          ]}
                          contentFit="cover"
                          source={require("../assets/white-beagle.png")}
                        />
                        <Image
                          style={[
                            styles.blueBeagleIcon,
                            styles.beagleIconPosition,
                          ]}
                          contentFit="cover"
                          source={require("../assets/blue-beagle.png")}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.dogWrapper}>
                    <Text style={[styles.dog, styles.dogTypo]}>Dog</Text>
                  </View>
                  <View style={styles.customerInner}>
                    <View
                      style={[styles.minusBtnParent, styles.petParentFlexBox]}
                    >
                      <Pressable
                        style={[styles.minusBtn, styles.addInnerFlexBox]}
                      >
                        <View style={styles.add2}>
                          <View
                            style={[styles.add2Child, styles.childBorder]}
                          />
                        </View>
                      </Pressable>
                      <Text style={[styles.text, styles.addTypo]}>0</Text>
                      <Pressable
                        style={[styles.addBtn, styles.addInnerFlexBox]}
                      >
                        <Image
                          style={styles.add2Icon}
                          contentFit="cover"
                          source={require("../assets/add-2.png")}
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
                <View style={[styles.customer2, styles.frameParentSpaceBlock]}>
                  <View
                    style={[styles.rectangleParent, styles.petParentFlexBox]}
                  >
                    <View style={[styles.homeChild, styles.homeChildLayout]} />
                    <View style={[styles.iconOutline1, styles.iconPosition2]}>
                      <Image
                        style={[styles.whiteCatIcon, styles.iconPosition1]}
                        contentFit="cover"
                        source={require("../assets/white-cat.png")}
                      />
                      <Image
                        style={[styles.blueCatIcon, styles.iconPosition]}
                        contentFit="cover"
                        source={require("../assets/blue-cat.png")}
                      />
                    </View>
                  </View>
                  <View style={styles.dogWrapper}>
                    <Text style={[styles.dog, styles.dogTypo]}>Cat</Text>
                  </View>
                  <View style={styles.customerInner}>
                    <View
                      style={[styles.minusBtnParent, styles.petParentFlexBox]}
                    >
                      <Pressable
                        style={[styles.minusBtn, styles.addInnerFlexBox]}
                      >
                        <View style={styles.add2}>
                          <View
                            style={[styles.add2Child, styles.childBorder]}
                          />
                        </View>
                      </Pressable>
                      <Text style={[styles.text, styles.addTypo]}>0</Text>
                      <Pressable
                        style={[styles.addBtn, styles.addInnerFlexBox]}
                      >
                        <Image
                          style={styles.add2Icon}
                          contentFit="cover"
                          source={require("../assets/add-2.png")}
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
                <View style={[styles.customer2, styles.frameParentSpaceBlock]}>
                  <View style={[styles.home, styles.homeFlexBox]}>
                    <View
                      style={[styles.rectangleParent, styles.petParentFlexBox]}
                    >
                      <View
                        style={[styles.apartment, styles.homeChildLayout]}
                      />
                      <View style={[styles.iconOutline2, styles.iconPosition2]}>
                        <Image
                          style={[styles.whiteBirdIcon, styles.iconPosition]}
                          contentFit="cover"
                          source={require("../assets/white-bird.png")}
                        />
                        <Image
                          style={[styles.blueBirdIcon, styles.iconPosition1]}
                          contentFit="cover"
                          source={require("../assets/blue-bird.png")}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.dogWrapper}>
                    <Text style={[styles.dog, styles.dogTypo]}>Bird</Text>
                  </View>
                  <View style={styles.customerInner}>
                    <View
                      style={[styles.minusBtnParent, styles.petParentFlexBox]}
                    >
                      <Pressable
                        style={[styles.minusBtn, styles.addInnerFlexBox]}
                      >
                        <View style={styles.add2}>
                          <View
                            style={[styles.add2Child, styles.childBorder]}
                          />
                        </View>
                      </Pressable>
                      <Text style={[styles.text, styles.addTypo]}>2</Text>
                      <Pressable
                        style={[styles.addBtn2, styles.addInnerFlexBox]}
                      >
                        <Image
                          style={styles.add2Icon}
                          contentFit="cover"
                          source={require("../assets/add-22.png")}
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
                <View style={[styles.customer2, styles.frameParentSpaceBlock]}>
                  <View style={[styles.home, styles.homeFlexBox]}>
                    <View
                      style={[styles.rectangleParent, styles.petParentFlexBox]}
                    >
                      <View
                        style={[styles.homeChild, styles.homeChildLayout]}
                      />
                      <View style={[styles.iconOutline2, styles.iconPosition2]}>
                        <Image
                          style={[styles.whiteRabbitIcon, styles.iconPosition]}
                          contentFit="cover"
                          source={require("../assets/white-rabbit.png")}
                        />
                        <Image
                          style={[styles.blueCatIcon, styles.iconPosition]}
                          contentFit="cover"
                          source={require("../assets/blue-rabbit.png")}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.dogWrapper}>
                    <Text style={[styles.dog, styles.dogTypo]}>Rabbit</Text>
                  </View>
                  <View style={styles.customerInner}>
                    <View
                      style={[styles.minusBtnParent, styles.petParentFlexBox]}
                    >
                      <Pressable
                        style={[styles.minusBtn, styles.addInnerFlexBox]}
                      >
                        <View style={styles.add2}>
                          <View
                            style={[styles.add2Child, styles.childBorder]}
                          />
                        </View>
                      </Pressable>
                      <Text style={[styles.text, styles.addTypo]}>0</Text>
                      <Pressable
                        style={[styles.addBtn, styles.addInnerFlexBox]}
                      >
                        <Image
                          style={styles.add2Icon}
                          contentFit="cover"
                          source={require("../assets/add-2.png")}
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View
            style={[
              styles.componentsgroomingMaterials,
              styles.frameParentSpaceBlock,
            ]}
          >
            <View style={styles.titleFlexBox}>
              <View style={[styles.tag, styles.tagLayout]} />
              <Text style={[styles.typeOfPet, styles.dogFlexBox]}>
                Grooming Materials
              </Text>
            </View>
            <View
              style={[
                styles.selfProvidedMaterialsFrameParent,
                styles.frameParentSpaceBlock,
              ]}
            >
              <View style={styles.titleFlexBox}>
                <View style={styles.selfProvidedMaterialsWrapper}>
                  <Text
                    style={[styles.selfProvidedMaterials, styles.perPetTypo]}
                  >
                    Self-Provided Materials
                  </Text>
                </View>
                <View style={styles.radioButton2}>
                  <Image
                    style={styles.backBtnLayout}
                    contentFit="cover"
                    source={require("../assets/frame-3.png")}
                  />
                </View>
              </View>
              <View
                style={[styles.useProviderMaterialsFrame, styles.titleFlexBox]}
              >
                <View style={styles.selfProvidedMaterialsWrapper}>
                  <Text
                    style={[styles.selfProvidedMaterials, styles.perPetTypo]}
                  >
                    Use Provider’s Materials
                  </Text>
                </View>
                <Image
                  style={[styles.radioButton21, styles.backBtnLayout]}
                  contentFit="cover"
                  source={require("../assets/radio-button-2.png")}
                />
              </View>
            </View>
          </View>
          <View style={[styles.frameGroup, styles.frameParentSpaceBlock]}>
            <View style={styles.tagParent}>
              <View style={styles.tagLayout} />
              <Text style={[styles.typeOfPet, styles.dogFlexBox]}>
                Type of Grooming
              </Text>
            </View>
            <View style={styles.frameContainer}>
              <View
                style={[styles.petGroomingWrapper, styles.petParentFlexBox]}
              >
                <View style={styles.bathing250PerPetWrapper}>
                  <Text
                    style={[styles.bathing250PerContainer, styles.dogFlexBox]}
                  >
                    <Text style={styles.dogTypo}>{`Bathing 
`}</Text>
                    <Text style={[styles.perPet, styles.perPetTypo]}>
                      ₱250 per pet
                    </Text>
                  </Text>
                </View>
                <View
                  style={[styles.addedBtnWrapper, styles.btnWrapperFlexBox]}
                >
                  <Pressable
                    style={[styles.minusBtnParent, styles.petParentFlexBox]}
                  >
                    <View
                      style={[styles.addedBtnInner, styles.addInnerFlexBox]}
                    >
                      <View
                        style={[styles.minusBtnParent, styles.petParentFlexBox]}
                      >
                        <Text style={styles.added}>Added</Text>
                      </View>
                    </View>
                  </Pressable>
                </View>
              </View>
              <View style={[styles.frameItem, styles.frameParentSpaceBlock]} />
              <View style={[styles.frameParent2, styles.frameParentSpaceBlock]}>
                <View style={styles.bathing250PerPetWrapper}>
                  <Text
                    style={[styles.bathing250PerContainer, styles.dogFlexBox]}
                  >
                    <Text style={styles.dogTypo}>{`Beak Trimming
`}</Text>
                    <Text style={[styles.perPet, styles.perPetTypo]}>
                      ₱650 per pet
                    </Text>
                  </Text>
                </View>
                <View style={[styles.addBtnWrapper, styles.btnWrapperFlexBox]}>
                  <Pressable
                    style={[styles.minusBtnParent, styles.petParentFlexBox]}
                  >
                    <View style={[styles.addBtnInner, styles.addInnerFlexBox]}>
                      <View
                        style={[styles.minusBtnParent, styles.petParentFlexBox]}
                      >
                        <Text style={styles.addTypo}>Add</Text>
                      </View>
                    </View>
                  </Pressable>
                </View>
              </View>
              <View style={[styles.frameItem, styles.frameParentSpaceBlock]} />
              <View style={[styles.frameParent2, styles.frameParentSpaceBlock]}>
                <View style={styles.bathing250PerPetWrapper}>
                  <Text
                    style={[styles.bathing250PerContainer, styles.dogFlexBox]}
                  >
                    <Text style={styles.dogTypo}>{`Beak Conditioning
`}</Text>
                    <Text style={[styles.perPet, styles.perPetTypo]}>
                      ₱600 per pet
                    </Text>
                  </Text>
                </View>
                <View style={[styles.addBtnWrapper, styles.btnWrapperFlexBox]}>
                  <Pressable
                    style={[styles.minusBtnParent, styles.petParentFlexBox]}
                  >
                    <View style={[styles.addBtnInner, styles.addInnerFlexBox]}>
                      <View
                        style={[styles.minusBtnParent, styles.petParentFlexBox]}
                      >
                        <Text style={styles.addTypo}>Add</Text>
                      </View>
                    </View>
                  </Pressable>
                </View>
              </View>
              <View style={[styles.frameItem, styles.frameParentSpaceBlock]} />
              <View style={[styles.frameParent2, styles.frameParentSpaceBlock]}>
                <View style={styles.bathing250PerPetWrapper}>
                  <Text
                    style={[styles.bathing250PerContainer, styles.dogFlexBox]}
                  >
                    <Text style={styles.dogTypo}>{`Nail Trimming
`}</Text>
                    <Text style={[styles.perPet, styles.perPetTypo]}>
                      ₱450 per pet
                    </Text>
                  </Text>
                </View>
                <View style={[styles.addBtnWrapper, styles.btnWrapperFlexBox]}>
                  <Pressable
                    style={[styles.minusBtnParent, styles.petParentFlexBox]}
                  >
                    <View style={[styles.addBtnInner, styles.addInnerFlexBox]}>
                      <View
                        style={[styles.minusBtnParent, styles.petParentFlexBox]}
                      >
                        <Text style={styles.addTypo}>Add</Text>
                      </View>
                    </View>
                  </Pressable>
                </View>
              </View>
              <View style={[styles.frameItem, styles.frameParentSpaceBlock]} />
              <View style={[styles.frameParent2, styles.frameParentSpaceBlock]}>
                <View style={styles.bathing250PerPetWrapper}>
                  <Text
                    style={[styles.bathing250PerContainer, styles.dogFlexBox]}
                  >
                    <Text style={styles.dogTypo}>{`Feather Trimming
`}</Text>
                    <Text style={[styles.perPet, styles.perPetTypo]}>
                      ₱450 per pet
                    </Text>
                  </Text>
                </View>
                <View style={[styles.addBtnWrapper, styles.btnWrapperFlexBox]}>
                  <Pressable
                    style={[styles.minusBtnParent, styles.petParentFlexBox]}
                  >
                    <View style={[styles.addBtnInner, styles.addInnerFlexBox]}>
                      <View
                        style={[styles.minusBtnParent, styles.petParentFlexBox]}
                      >
                        <Text style={styles.addTypo}>Add</Text>
                      </View>
                    </View>
                  </Pressable>
                </View>
              </View>
              <View style={[styles.frameItem, styles.frameParentSpaceBlock]} />
              <View style={[styles.frameParent2, styles.frameParentSpaceBlock]}>
                <View style={styles.bathing250PerPetWrapper}>
                  <Text
                    style={[styles.bathing250PerContainer, styles.dogFlexBox]}
                  >
                    <Text style={styles.dogTypo}>{`Wing Clipping
`}</Text>
                    <Text style={[styles.perPet, styles.perPetTypo]}>
                      ₱400 per pet
                    </Text>
                  </Text>
                </View>
                <View style={[styles.addBtnWrapper, styles.btnWrapperFlexBox]}>
                  <Pressable
                    style={[styles.minusBtnParent, styles.petParentFlexBox]}
                  >
                    <View style={[styles.addBtnInner, styles.addInnerFlexBox]}>
                      <View
                        style={[styles.minusBtnParent, styles.petParentFlexBox]}
                      >
                        <Text style={styles.addTypo}>Add</Text>
                      </View>
                    </View>
                  </Pressable>
                </View>
              </View>
              <View style={[styles.frameItem, styles.frameParentSpaceBlock]} />
              <View style={[styles.frameParent2, styles.frameParentSpaceBlock]}>
                <View style={styles.bathing250PerPetWrapper}>
                  <Text
                    style={[styles.bathing250PerContainer, styles.dogFlexBox]}
                  >
                    <Text style={styles.dogTypo}>{`Feather Conditioning
`}</Text>
                    <Text style={[styles.perPet, styles.perPetTypo]}>
                      ₱500 per pet
                    </Text>
                  </Text>
                </View>
                <View style={[styles.addBtnWrapper, styles.btnWrapperFlexBox]}>
                  <Pressable
                    style={[styles.minusBtnParent, styles.petParentFlexBox]}
                  >
                    <View style={[styles.addBtnInner, styles.addInnerFlexBox]}>
                      <View
                        style={[styles.minusBtnParent, styles.petParentFlexBox]}
                      >
                        <Text style={styles.addTypo}>Add</Text>
                      </View>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
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
  frameScrollViewContent: {
    flexDirection: "column",
    paddingTop: 15,
    paddingBottom: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  petParentFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  petGroomingTypo: {
    textAlign: "center",
    fontWeight: "700",
  },
  componentspropertyTypeSpaceBlock: {
    paddingVertical: Padding.p_base,
    paddingHorizontal: Padding.p_3xs,
    backgroundColor: Color.colorGainsboro_300,
    borderRadius: Border.br_5xs,
    alignItems: "center",
  },
  tagLayout: {
    width: 4,
    borderRadius: Border.br_9xs,
    backgroundColor: Color.colorSteelblue_100,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  dogFlexBox: {
    textAlign: "left",
    flex: 1,
  },
  customerFlexBox: {
    borderRadius: Border.br_xs,
    alignItems: "center",
    flexDirection: "row",
  },
  homeFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  homeChildLayout: {
    height: 64,
    borderRadius: Border.br_lg,
    zIndex: 0,
    flex: 1,
  },
  whiteIconPosition: {
    display: "none",
    zIndex: 0,
  },
  beagleIconPosition: {
    width: 45,
    left: 0,
    top: 0,
    position: "absolute",
  },
  dogTypo: {
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
    fontSize: FontSize.bodyLgBodyLgRegular_size,
  },
  addInnerFlexBox: {
    padding: Padding.p_2xs,
    borderRadius: Border.br_xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  childBorder: {
    borderColor: Color.colorDarkslategray_500,
    borderStyle: "solid",
  },
  addTypo: {
    color: Color.colorDarkslategray_600,
    fontFamily: FontFamily.title4Regular18,
    fontSize: FontSize.title4Regular18_size,
    textAlign: "center",
    letterSpacing: 0.5,
    flex: 1,
  },
  frameParentSpaceBlock: {
    marginTop: 8,
    alignSelf: "stretch",
  },
  iconPosition2: {
    padding: Padding.p_12xs,
    top: 6,
    zIndex: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  iconPosition1: {
    height: 50,
    width: 50,
    left: 51,
    top: 1,
    display: "none",
    position: "absolute",
  },
  iconPosition: {
    left: 1,
    height: 50,
    width: 50,
    top: 1,
    position: "absolute",
  },
  perPetTypo: {
    fontFamily: FontFamily.level2Medium12,
    fontWeight: "500",
  },
  titleFlexBox: {
    paddingVertical: Padding.p_8xs,
    paddingHorizontal: 0,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  backBtnLayout: {
    height: 24,
    width: 24,
  },
  btnWrapperFlexBox: {
    marginLeft: 13,
    width: 103,
    justifyContent: "center",
    flexDirection: "row",
  },
  petGrooming: {
    fontSize: FontSize.m3HeadlineLarge_size,
    textTransform: "capitalize",
    fontFamily: FontFamily.workSansBold,
    color: Color.colorDarkslateblue_100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    flex: 1,
  },
  petGroomingWrapper: {
    flexDirection: "row",
    alignSelf: "stretch",
  },
  tag: {
    overflow: "hidden",
  },
  typeOfPet: {
    marginLeft: 10,
    color: Color.neutral07,
    letterSpacing: -0.4,
    fontSize: FontSize.title4Regular18_size,
    textAlign: "left",
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
  },
  homeChild: {
    backgroundColor: Color.colorGainsboro_400,
    borderWidth: 2,
    zIndex: 0,
    borderColor: Color.colorDarkslategray_500,
    borderStyle: "solid",
  },
  whiteBeagleIcon: {
    height: 45,
    width: 45,
    left: 0,
    top: 0,
    position: "absolute",
  },
  blueBeagleIcon: {
    height: 42,
    zIndex: 1,
  },
  iconOutline: {
    top: 11,
    left: 10,
    zIndex: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  home1: {
    flex: 1,
  },
  home: {
    width: 64,
  },
  dog: {
    letterSpacing: -0.2,
    lineHeight: 22,
    color: Color.neutral06,
    textAlign: "left",
    flex: 1,
  },
  dogWrapper: {
    marginLeft: 12,
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  add2Child: {
    borderTopWidth: 2.5,
    height: 3,
    width: 14,
  },
  add2: {
    paddingVertical: Padding.p_7xs,
    paddingHorizontal: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  minusBtn: {
    borderWidth: 1,
    padding: Padding.p_2xs,
    borderColor: Color.colorDarkslategray_500,
    borderStyle: "solid",
    backgroundColor: Color.colorGainsboro_300,
  },
  text: {
    marginLeft: 10,
  },
  add2Icon: {
    height: 14,
    width: 14,
    overflow: "hidden",
  },
  addBtn: {
    borderWidth: 1,
    padding: Padding.p_2xs,
    borderColor: Color.colorDarkslategray_500,
    borderStyle: "solid",
    marginLeft: 10,
    backgroundColor: Color.colorGainsboro_300,
  },
  minusBtnParent: {
    flexDirection: "row",
    flex: 1,
  },
  customerInner: {
    width: 103,
    marginLeft: 12,
    justifyContent: "center",
    flexDirection: "row",
  },
  customer1: {
    alignSelf: "stretch",
  },
  whiteCatIcon: {
    zIndex: 0,
  },
  blueCatIcon: {
    zIndex: 1,
  },
  iconOutline1: {
    left: 6,
  },
  rectangleParent: {
    width: 64,
    flexDirection: "row",
  },
  customer2: {
    borderRadius: Border.br_xs,
    alignItems: "center",
    flexDirection: "row",
  },
  apartment: {
    zIndex: 0,
    backgroundColor: Color.colorSteelblue_100,
  },
  whiteBirdIcon: {
    zIndex: 0,
  },
  blueBirdIcon: {
    zIndex: 1,
  },
  iconOutline2: {
    left: 7,
  },
  addBtn2: {
    marginLeft: 10,
    backgroundColor: Color.colorSteelblue_100,
  },
  whiteRabbitIcon: {
    display: "none",
    zIndex: 0,
  },
  customer: {
    alignSelf: "stretch",
  },
  newCustomers: {
    marginTop: 16,
    alignSelf: "stretch",
  },
  componentspropertyType: {
    height: 360,
    alignSelf: "stretch",
  },
  selfProvidedMaterials: {
    textAlign: "left",
    flex: 1,
    color: Color.neutral07,
    letterSpacing: -0.4,
    fontSize: FontSize.title4Regular18_size,
  },
  selfProvidedMaterialsWrapper: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  radioButton2: {
    marginLeft: 10,
    flexDirection: "row",
  },
  radioButton21: {
    marginLeft: 10,
  },
  useProviderMaterialsFrame: {
    marginTop: 5,
  },
  selfProvidedMaterialsFrameParent: {
    alignItems: "center",
  },
  componentsgroomingMaterials: {
    paddingVertical: Padding.p_base,
    paddingHorizontal: Padding.p_3xs,
    backgroundColor: Color.colorGainsboro_300,
    borderRadius: Border.br_5xs,
    alignItems: "center",
  },
  tagParent: {
    padding: Padding.p_3xs,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  perPet: {
    fontSize: FontSize.level2Medium12_size,
  },
  bathing250PerContainer: {
    color: Color.colorTypographyContentIconsBlack,
  },
  bathing250PerPetWrapper: {
    flexDirection: "row",
    flex: 1,
  },
  added: {
    color: Color.colorGray_100,
    fontFamily: FontFamily.title4Regular18,
    fontSize: FontSize.title4Regular18_size,
    textAlign: "center",
    letterSpacing: 0.5,
    flex: 1,
  },
  addedBtnInner: {
    backgroundColor: Color.colorSteelblue_100,
    flex: 1,
  },
  addedBtnWrapper: {
    paddingLeft: Padding.p_3xs,
  },
  frameItem: {
    borderColor: Color.colorWhitesmoke_500,
    borderTopWidth: 1,
    height: 1,
    borderStyle: "solid",
    marginTop: 8,
  },
  addBtnInner: {
    borderWidth: 1,
    padding: Padding.p_2xs,
    borderColor: Color.colorDarkslategray_500,
    borderStyle: "solid",
    flex: 1,
  },
  addBtnWrapper: {
    paddingLeft: Padding.p_11xl,
  },
  frameParent2: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  frameContainer: {
    paddingBottom: Padding.p_3xs,
    paddingHorizontal: Padding.p_3xs,
    alignItems: "center",
    alignSelf: "stretch",
  },
  frameGroup: {
    backgroundColor: Color.colorGainsboro_300,
    borderRadius: Border.br_5xs,
    marginTop: 8,
    justifyContent: "center",
  },
  componentspropertyTypeParent: {
    paddingHorizontal: Padding.p_smi,
    paddingVertical: 0,
    marginTop: 15,
    alignItems: "center",
    alignSelf: "stretch",
  },
  frameParent: {
    alignSelf: "stretch",
    flex: 1,
  },
  petGroomingSubcategoryBird: {
    backgroundColor: Color.colorWhitesmoke_200,
    height: 812,
    width: "100%",
    flex: 1,
  },
});

export default PetGroomingSubcategoryBird;
