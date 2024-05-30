import { useState, useRef, useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  Pressable,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { FontFamily, Padding, Color, Border, FontSize } from "../GlobalStyles";
import { toggleAnimation } from "../animations/toggleAnimation";
import TimeDateModal from "../components/TimeDateModal";
import AddButton from "../components/AddButton";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore"; // Updated imports
import { useReviewSummaryContext } from "../ReviewSummaryContext";

const LandscapeDesignSubcategory = ({ route }) => {
  const bookDirect = route.params?.bookDirect || [];
  const [materials, setMaterials] = useState("");
  const [garden, setGarden] = useState("");
  const [materialsVisible, setMaterialsVisible] = useState(false);
  const [gardenVisible, setGardenVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [area, setArea] = useState("");
  const [dataToPass, setDataToPass] = useState(null);
  const buttonBackgroundColor = '#007EA7';
  const buttonBorderColor1 = '#2E4460';
  const buttonBorderColor2 = '#D9D9D9';
  const buttonTextColor = '#fff';

  const [areaVisible1, setAreaVisible1] = useState(false);
  const [areaVisible2, setAreaVisible2] = useState(false);
  const [areaVisible3, setAreaVisible3] = useState(false);
  const [areaVisible4, setAreaVisible4] = useState(false);
  const [areaVisible5, setAreaVisible5] = useState(false);
  const [areaVisible6, setAreaVisible6] = useState(false);
  const [areaVisible7, setAreaVisible7] = useState(false);

  const [materialFee, setMaterialFee] = useState(0);

  const animationController = useRef(new Animated.Value(0)).current;

  const [commercial, setcommercial] = useState(null);
  const [gardentheme, setgardentheme] = useState(null);
  const [hardscape, sethardscape] = useState(null);
  const [residential, setresidential] = useState(null);
  const [therapeutic, settherapeutic] = useState(null);
  const [waterfeature, setwaterfeature] = useState(null);
  const [xeriscape, setxeriscape] = useState(null);

  useEffect(() => {
    // Reference to Firestore
    const db = getFirestore(); // Use getFirestore() to initialize Firestore

    // Reference to the "servicesPrices" collection and "Plumbing" document
    const collectionName = "servicesPrices";
    const documentName = "Gardening";
    const subCollectionName = "SubCategories"; // Name of the subcollection

    // Fetch the "Installation" document under "SubCategories"
    const subCollectionRef = doc(
      db,
      collectionName,
      documentName,
      subCollectionName,
      "LandscapeDesignPlanning"
    );

    getDoc(subCollectionRef)
    .then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const LandscapeDesignPlanningData = docSnapshot.data();

        setcommercial(LandscapeDesignPlanningData.commercial);
        setgardentheme(LandscapeDesignPlanningData.gardentheme);
        sethardscape(LandscapeDesignPlanningData.hardscape);
        setresidential(LandscapeDesignPlanningData.residential);
        settherapeutic(LandscapeDesignPlanningData.therapeutic);
        setwaterfeature(LandscapeDesignPlanningData.waterfeature);
        setxeriscape(LandscapeDesignPlanningData.xeriscape);

      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.error("Error getting document:", error);
    });
  }, [])

  const handleCategoryButtonPress = (category, value) => {
    if (category === "Garden") {
      setGarden(value);
      setGardenVisible(true);
    } else if (category === "Materials") {
      if(value == "selfProvidedMaterials"){
        setMaterialFee(0);
      }else{
        setMaterialFee(50);
      }  
      setMaterials(value);
      setMaterialsVisible(true);
    } else if (category === "Area") {
      setArea(value);
      handleAddButtonVisibility(value);
    } else if (area === "ten") {
      setArea(value);
      setAreaVisible1(true);
      setAreaVisible2(true);
      setAreaVisible3(true);
      setAreaVisible4(true);
      setAreaVisible5(true);
      setAreaVisible6(true);
      setAreaVisible7(true);
    }
  };

  const handleAddButtonVisibility = (value) => {
    if (value === "one") {
      setAreaVisible1(true);
    } else if (value === "two") {
      setAreaVisible2(true);
    } else if (value === "three") {
      setAreaVisible3(true);
    } else if (value === "four") {
      setAreaVisible4(true);
    } else if (value === "five") {
      setAreaVisible5(true);
    } else if (value === "six") {
      setAreaVisible6(true);
    }else if (value === "seven") {
      setAreaVisible7(true);
    }
  };

  const isContinueButtonDisabled = !(
    gardenVisible &&
    materialsVisible &&
    (areaVisible1 ||
      areaVisible2 ||
      areaVisible3 ||
      areaVisible4 ||
      areaVisible5 ||
      areaVisible6 ||
      areaVisible7)
  );

  const [input1Value, setInput1Value] = useState(0);
  const [input2Value, setInput2Value] = useState(0);
  const [input3Value, setInput3Value] = useState(0);
  const [input4Value, setInput4Value] = useState(0);
  const [input5Value, setInput5Value] = useState(0);
  const [input6Value, setInput6Value] = useState(0);
  const [input7Value, setInput7Value] = useState(0);

  const multipliedValue =
    parseInt(input1Value) * residential +
    parseInt(input2Value) * commercial +
    parseInt(input3Value) * gardentheme +
    parseInt(input4Value) * hardscape +
    parseInt(input5Value) * waterfeature +
    parseInt(input6Value) * xeriscape +
    parseInt(input7Value) * therapeutic +
    parseInt(materialFee);

  // Define an object to store service prices
  const servicePrices = {
    residential: residential,
    commercial: commercial,
    gardentheme: gardentheme,
    hardscape: hardscape,
    waterfeature: waterfeature,
    xeriscape: xeriscape,
    therapeutic: therapeutic,
  };

  const inputValues = [
    { name: "Residential Design", value: input1Value, service: "residential" },
    { name: "Commercial Design", value: input2Value, service: "commercial" },
    { name: "Garden Theme Design", value: input3Value, service: "gardentheme" },
    { name: "Hardscape Design", value: input4Value, service: "hardscape" },
    { name: "Water Feature Design", value: input5Value, service: "waterfeature" },
    { name: "Xeriscape Design", value: input6Value, service: "xeriscape" },
    { name: "Therapeutic Garden Design", value: input7Value, service: "therapeutic" },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const { setReviewData } = useReviewSummaryContext();

  const openModalWithData = () => {
    // Calculate the total price for each input
    const inputsWithTotalPrice = inputValues.map((item) => ({
      ...item,
      totalPrice: item.value * servicePrices[item.service],
    }));

    // Filter the inputsWithTotalPrice array to include only values with totalPrice > 0
    const filteredInputsWithTotalPrice = inputsWithTotalPrice.filter(
      (item) => item.totalPrice > 0
    );

    if (filteredInputsWithTotalPrice.length > 0) {
      setModalVisible(true);

      // Pass the filteredInputsWithTotalPrice to the "ReviewSummary" screen
      setReviewData({
        property: garden,
        materials: materials,
        inputValues: filteredInputsWithTotalPrice,
        multipliedValue, // Pass the multipliedValue
        category: "Landscape Design and Planning", // Add the string here
        logo: "mask-group4.png",
        title: "Gardening"
      });
    } else {
      // Handle the case where there are no input values with totalPrice > 0 (optional)
      // You can display a message to the user or take other actions.
      // For now, let's log an error message.
      console.error("No input values with totalPrice greater than 0");
    }
  };  

  return (
    <View style={styles.landscapeDesignSubcategory}>
      <StatusBar barStyle="default" />
      <ScrollView
        style={styles.frameParent}
        indicatorStyle="default"
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={false}
        contentContainerStyle={styles.frameScrollViewContent}
      >
        <View
          style={[
            styles.landscapeDesignAndPlanningWrapper,
            styles.wrapperFlexBox,
          ]}
        >
          <Text style={styles.landscapeDesignAnd}>{`Landscape Design
and Planning`}</Text>
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
              <Text style={[styles.gardenSize, styles.gardenSizeFlexBox]}>
                Garden Size
              </Text>
            </View>
            <View style={styles.newCustomers}>
              <View style={styles.customer}>
                <View style={styles.smallGarden}>
                <View style={[styles.home, styles.homeFlexBox]}>
                    <Pressable
                      style={[styles.smallPlantBtn, styles.homeFlexBox]}
                      onPress={() =>
                        handleCategoryButtonPress("Garden", "small")
                      }
                    >
                      <View
                        style={[
                          garden == "small"
                            ? [
                                styles.mediumFlowersPlantChild,
                                styles.plantChildLayout,
                              ]
                            : [
                                styles.smallPlantBtnChild,
                                styles.plantChildLayout,
                              ],
                        ]}
                      />
                      <View style={[styles.iconOutline, styles.iconFlexBox]}>
                        {garden == "small" ? (
                          <Image
                            style={[
                              styles.whitePlantIcon,
                              styles.blueIconPosition,
                            ]}
                            contentFit="cover"
                            source={require("../assets/white-plant.png")}
                          />
                        ) : (
                          <Image
                            style={[
                              styles.bluePlantIcon,
                              styles.plantIconPosition,
                            ]}
                            contentFit="cover"
                            source={require("../assets/blue-plant.png")}
                          />
                        )}
                      </View>
                    </Pressable>
                  </View>
                  <View style={[styles.sqMWrapper, styles.wrapperFlexBox]}>
                    <Text
                      style={[styles.sqM, styles.sqMTypo]}
                    >{`<10 sq. m`}</Text>
                  </View>
                </View>
                <View style={styles.smallGarden}>
                  <Pressable
                    style={[styles.mediumFlowersPlant, styles.wrapperFlexBox]}
                    onPress={() =>
                      handleCategoryButtonPress("Garden", "medium")
                    }
                  >
                    <View
                      style={[
                        garden == "medium"
                          ? [
                              styles.mediumFlowersPlantChild,
                              styles.plantChildLayout,
                            ]
                          : [
                              styles.smallPlantBtnChild,
                              styles.plantChildLayout,
                            ],
                      ]}
                    />
                    <View style={[styles.iconOutline, styles.iconFlexBox]}>
                      {garden == "medium" ? (
                        <Image
                          style={[
                            styles.whiteFlowersIcon,
                            styles.blueIconPosition,
                          ]}
                          contentFit="cover"
                          source={require("../assets/white-flowers.png")}
                        />
                      ) : (
                        <Image
                          style={[
                            styles.blueFlowersIcon,
                            styles.blueIconPosition,
                          ]}
                          contentFit="cover"
                          source={require("../assets/blue-flowers.png")}
                        />
                      )}
                    </View>
                  </Pressable>
                  <View style={[styles.sqMWrapper, styles.wrapperFlexBox]}>
                    <Text style={[styles.sqM, styles.sqMTypo]}>
                      10 - 50 sq. m
                    </Text>
                  </View>
                </View>
                <View style={styles.smallGarden}>
                  <View
                    style={[
                      styles.gardenMaintenanceWrapper,
                      styles.wrapperFlexBox,
                    ]}
                  >
                    <Pressable
                      style={[styles.mediumFlowersPlant, styles.wrapperFlexBox]}
                      onPress={() =>
                        handleCategoryButtonPress("Garden", "large")
                      }
                    >
                      <View
                        style={[
                          garden == "large"
                            ? [
                                styles.mediumFlowersPlantChild,
                                styles.plantChildLayout,
                              ]
                            : [
                                styles.smallPlantBtnChild,
                                styles.plantChildLayout,
                              ],
                        ]}
                      />
                      <View style={[styles.iconOutline, styles.iconFlexBox]}>
                        {garden == "large" ? (
                          <Image
                            style={[
                              styles.whiteTreesIcon,
                              styles.blueIconPosition,
                            ]}
                            contentFit="cover"
                            source={require("../assets/white-trees.png")}
                          />
                        ) : (
                          <Image
                            style={[
                              styles.blueTreesIcon,
                              styles.blueIconPosition,
                            ]}
                            contentFit="cover"
                            source={require("../assets/blue-trees.png")}
                          />
                        )}
                      </View>
                    </Pressable>
                  </View>
                  <View style={[styles.sqMWrapper, styles.wrapperFlexBox]}>
                    <Text
                      style={[styles.sqM, styles.sqMTypo]}
                    >{`>50 sq. m`}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View
            style={[
              styles.componentslandscapingMateria,
              styles.frameParentSpaceBlock,
            ]}
          >
            <View style={styles.titleFlexBox}>
              <View style={[styles.tag, styles.tagLayout]} />
              <Text style={[styles.gardenSize, styles.gardenSizeFlexBox]}>
                Landscaping Materials
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
                  <Text style={[styles.selfProvidedMaterials, styles.sqMTypo]}>
                    Self-Provided Materials
                  </Text>
                </View>
                <View style={styles.radioButton2}>
                  <TouchableOpacity
                    onPress={() =>
                      handleCategoryButtonPress(
                        "Materials",
                        "selfProvidedMaterials"
                      )
                    }
                  >
                    {materials == "selfProvidedMaterials" ? (
                      <View style={styles.outerClicked}>
                        <View style={styles.innerClicked}></View>
                      </View>
                    ) : (
                      <View style={styles.outer} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={[styles.useProviderMaterialsFrame, styles.titleFlexBox]}
              >
                <View style={styles.selfProvidedMaterialsWrapper}>
                  <Text style={[styles.selfProvidedMaterials, styles.sqMTypo]}>
                    Use Provider’s Materials
                  </Text>
                </View>
                <View style={styles.radioButton2}>
                  <TouchableOpacity
                    onPress={() =>
                      handleCategoryButtonPress(
                        "Materials",
                        "useProviderMaterials"
                      )
                    }
                  >
                    {materials == "useProviderMaterials" ? (
                      <View style={styles.outerClicked}>
                        <View style={styles.innerClicked}></View>
                      </View>
                    ) : (
                      <View style={styles.outer} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.frameGroup, styles.frameParentSpaceBlock]}>
            <View style={styles.tagParent}>
              <View style={styles.tagLayout} />
              <Text
                style={[styles.gardenSize, styles.gardenSizeFlexBox]}
              >{`Type of Landscape Design & Planning`}</Text>
            </View>
            <View style={styles.frameContainer}>
              <View
                style={[
                  styles.landscapeDesignAndPlanningWrapper,
                  styles.wrapperFlexBox,
                ]}
              >
                <View style={styles.residentialDesign1500PerSWrapper}>
                  <Text
                    style={[
                      styles.residentialDesign1500Container,
                      styles.gardenSizeFlexBox,
                    ]}
                  >
                    <Text style={styles.residentialDesign}>{`Residential Design
`}</Text>
                    <Text style={[styles.perService, styles.sqMTypo]}>
                      ₱{residential} per service
                    </Text>
                  </Text>
                  {areaVisible1 ? (
                      <View>
                        <AddButton
                          title="Added"
                          onPress={() => {
                            handleCategoryButtonPress("Area", "one");
                            setInput1Value(0);
                            setAreaVisible1(false);
                          }}
                          backgroundColor={buttonBackgroundColor}
                          borderColor={buttonBorderColor2}
                          color={buttonTextColor}
                          
                        />
                      </View>
                    ) : (
                      <View>
                        <AddButton
                          title="Add"
                          onPress={() => {
                            handleCategoryButtonPress("Area", "one");
                            setInput1Value(1);
                          }}
                          borderColor={buttonBorderColor1}
                        />
                      </View>
                    )}
                </View>
              </View>
              <View style={[styles.frameChild, styles.frameParentSpaceBlock]} />
              <View style={[styles.frameParent1, styles.frameParentSpaceBlock]}>
                <View style={styles.residentialDesign1500PerSWrapper}>
                  <Text
                    style={[
                      styles.residentialDesign1500Container,
                      styles.gardenSizeFlexBox,
                    ]}
                  >
                    <Text style={styles.residentialDesign}>{`Commercial Design
`}</Text>
                    <Text style={[styles.perService, styles.sqMTypo]}>
                      ₱{commercial} per service
                    </Text>
                  </Text>
                  {areaVisible2 ? (
                      <View>
                        <AddButton
                          title="Added"
                          onPress={() => {
                            handleCategoryButtonPress("Area", "two");
                            setInput2Value(0);
                            setAreaVisible2(false);
                          }}
                          backgroundColor={buttonBackgroundColor}
                          borderColor={buttonBorderColor2}
                          color={buttonTextColor}
                          
                        />
                      </View>
                    ) : (
                      <View>
                        <AddButton
                          title="Add"
                          onPress={() => {
                            handleCategoryButtonPress("Area", "two");
                            setInput2Value(1);
                          }}
                          borderColor={buttonBorderColor1}
                        />
                      </View>
                    )}
                </View>
              </View>
              <View style={[styles.frameChild, styles.frameParentSpaceBlock]} />
              <View style={[styles.frameParent1, styles.frameParentSpaceBlock]}>
                <View style={styles.residentialDesign1500PerSWrapper}>
                  <Text
                    style={[
                      styles.residentialDesign1500Container,
                      styles.gardenSizeFlexBox,
                    ]}
                  >
                    <Text style={styles.residentialDesign}>{`Garden Theme Design
`}</Text>
                    <Text style={[styles.perService, styles.sqMTypo]}>
                      ₱{gardentheme} per service
                    </Text>
                  </Text>
                  {areaVisible3 ? (
                      <View>
                        <AddButton
                          title="Added"
                          onPress={() => {
                            handleCategoryButtonPress("Area", "three");
                            setInput3Value(0);
                            setAreaVisible3(false);
                          }}
                          backgroundColor={buttonBackgroundColor}
                          borderColor={buttonBorderColor2}
                          color={buttonTextColor}
                          
                        />
                      </View>
                    ) : (
                      <View>
                        <AddButton
                          title="Add"
                          onPress={() => {
                            handleCategoryButtonPress("Area", "three");
                            setInput3Value(1);
                          }}
                          borderColor={buttonBorderColor1}
                        />
                      </View>
                    )}
                </View>
              </View>
              <View style={[styles.frameChild, styles.frameParentSpaceBlock]} />
              <View style={[styles.frameParent1, styles.frameParentSpaceBlock]}>
                <View style={styles.residentialDesign1500PerSWrapper}>
                  <Text
                    style={[
                      styles.residentialDesign1500Container,
                      styles.gardenSizeFlexBox,
                    ]}
                  >
                    <Text style={styles.residentialDesign}>{`Hardscape Design
`}</Text>
                    <Text style={[styles.perService, styles.sqMTypo]}>
                      ₱{hardscape} per service
                    </Text>
                  </Text>
                  {areaVisible4 ? (
                      <View>
                        <AddButton
                          title="Added"
                          onPress={() => {
                            handleCategoryButtonPress("Area", "four");
                            setInput4Value(0);
                            setAreaVisible4(false);
                          }}
                          backgroundColor={buttonBackgroundColor}
                          borderColor={buttonBorderColor2}
                          color={buttonTextColor}
                          
                        />
                      </View>
                    ) : (
                      <View>
                        <AddButton
                          title="Add"
                          onPress={() => {
                            handleCategoryButtonPress("Area", "four");
                            setInput4Value(1);
                          }}
                          borderColor={buttonBorderColor1}
                        />
                      </View>
                    )}
                </View>
              </View>
              <View style={[styles.frameChild, styles.frameParentSpaceBlock]} />
              <View style={[styles.frameParent1, styles.frameParentSpaceBlock]}>
                <View style={styles.residentialDesign1500PerSWrapper}>
                  <Text
                    style={[
                      styles.residentialDesign1500Container,
                      styles.gardenSizeFlexBox,
                    ]}
                  >
                    <Text
                      style={styles.residentialDesign}
                    >{`Water Feature Design
`}</Text>
                    <Text style={[styles.perService, styles.sqMTypo]}>
                      ₱{waterfeature} per service
                    </Text>
                  </Text>
                  {areaVisible5 ? (
                      <View>
                        <AddButton
                          title="Added"
                          onPress={() => {
                            handleCategoryButtonPress("Area", "five");
                            setInput5Value(0);
                            setAreaVisible5(false);
                          }}
                          backgroundColor={buttonBackgroundColor}
                          borderColor={buttonBorderColor2}
                          color={buttonTextColor}
                          
                        />
                      </View>
                    ) : (
                      <View>
                        <AddButton
                          title="Add"
                          onPress={() => {
                            handleCategoryButtonPress("Area", "five");
                            setInput5Value(1);
                          }}
                          borderColor={buttonBorderColor1}
                        />
                      </View>
                    )}
                </View>
              </View>
              <View style={[styles.frameChild, styles.frameParentSpaceBlock]} />
              <View style={[styles.frameParent1, styles.frameParentSpaceBlock]}>
                <View style={styles.residentialDesign1500PerSWrapper}>
                  <Text
                    style={[
                      styles.residentialDesign1500Container,
                      styles.gardenSizeFlexBox,
                    ]}
                  >
                    <Text style={styles.residentialDesign}>{`Xeriscape Design
`}</Text>
                    <Text style={[styles.perService, styles.sqMTypo]}>
                      ₱{xeriscape} per service
                    </Text>
                  </Text>
                  {areaVisible6 ? (
                      <View>
                        <AddButton
                          title="Added"
                          onPress={() => {
                            handleCategoryButtonPress("Area", "six");
                            setInput6Value(0);
                            setAreaVisible6(false);
                          }}
                          backgroundColor={buttonBackgroundColor}
                          borderColor={buttonBorderColor2}
                          color={buttonTextColor}
                          
                        />
                      </View>
                    ) : (
                      <View>
                        <AddButton
                          title="Add"
                          onPress={() => {
                            handleCategoryButtonPress("Area", "six");
                            setInput6Value(1);
                          }}
                          borderColor={buttonBorderColor1}
                        />
                      </View>
                    )}
                </View>
              </View>
              <View style={[styles.frameChild, styles.frameParentSpaceBlock]} />
              <View style={[styles.frameParent1, styles.frameParentSpaceBlock]}>
                <View style={styles.residentialDesign1500PerSWrapper}>
                  <Text
                    style={[
                      styles.residentialDesign1500Container,
                      styles.gardenSizeFlexBox,
                    ]}
                  >
                    <Text
                      style={styles.residentialDesign}
                    >{`Therapeutic Garden Design
`}</Text>
                    <Text style={[styles.perService, styles.sqMTypo]}>
                      ₱{therapeutic} per service
                    </Text>
                  </Text>
               </View>
                  {areaVisible7 ? (
                      <View>
                        <AddButton
                          title="Added"
                          onPress={() => {
                            handleCategoryButtonPress("Area", "seven");
                            setInput7Value(0);
                            setAreaVisible7(false);
                          }}
                          backgroundColor={buttonBackgroundColor}
                          borderColor={buttonBorderColor2}
                          color={buttonTextColor}
                          
                        />
                      </View>
                    ) : (
                      <View>
                        <AddButton
                          title="Add"
                          onPress={() => {
                            handleCategoryButtonPress("Area", "seven");
                            setInput7Value(1);
                          }}
                          borderColor={buttonBorderColor1}
                        />
                      </View>
                    )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View disabled={isContinueButtonDisabled}>
        {isContinueButtonDisabled ? (
          <View style={[styles.timeDateModal, styles.timeDateModalFlexBox]}>
            <View style={styles.priceButtonWrapper}>
              <View style={styles.priceButton}>
                <View style={styles.buttons}>
                  <View style={styles.button}>
                    <Text style={styles.confirm}>Continue</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View style={[styles.timeDateModal2, styles.buttonFlexBox]}>
            <View style={styles.frameParent10}>
              <View style={styles.frameParent11}>
                <View style={styles.selfProvidedMaterialsWrapper}>
                  <Text style={styles.text21Typo}>
                    <Text style={styles.totalCost1}>Total Cost</Text>
                    <Text style={styles.text20}>{` `}</Text>
                  </Text>
                </View>
                <View style={styles.wrapper}>
                  <Text style={[styles.totalCost1, styles.text21Typo]}>
                    ₱{multipliedValue}
                  </Text>
                </View>
              </View>
              <Pressable
                style={styles.priceButton1}
                onPress={() => openModalWithData("₱500")}
              >
                <View style={styles.frameParent11}>
                  <View style={[styles.button2, styles.buttonFlexBox]}>
                    <Text style={styles.confirm2}>Continue</Text>
                  </View>
                </View>
              </Pressable>
            </View>
          </View>
        )}
      </View>
      <TimeDateModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        content={`₱${multipliedValue}`}
        bookDirect = {bookDirect}
      />
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
  wrapperFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  gardenSizeTypo1: {
    fontFamily: FontFamily.title2Bold32,
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
  gardenSizeFlexBox: {
    textAlign: "left",
    flex: 1,
  },
  homeFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  plantChildLayout: {
    height: 64,
    borderRadius: Border.br_lg,
    zIndex: 0,
    flex: 1,
  },
  iconFlexBox: {
    position: "absolute",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  plantIconPosition: {
    left: 0,
    top: 0,
    position: "absolute",
    height: 24,
    width: 24,
  },
  sqMTypo: {
    fontFamily: FontFamily.level2Medium12,
    fontWeight: "500",
  },
  blueIconPosition: {
    left: 1,
    top: 1,
    position: "absolute",
    height: 24,
    width: 24,
  },
  frameParentSpaceBlock: {
    marginTop: 8,
    alignSelf: "stretch",
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
  addFlexBox1: {
    marginLeft: 13,
    width: 103,
    justifyContent: "center",
    flexDirection: "row",
  },
  addFlexBox: {
    padding: Padding.p_2xs,
    borderRadius: Border.br_xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  addTypo: {
    fontFamily: FontFamily.title4Regular18,
    fontSize: FontSize.title4Regular18_size,
    textAlign: "center",
    letterSpacing: 0.5,
    flex: 1,
  },
  landscapeDesignAnd: {
    fontSize: FontSize.m3HeadlineLarge_size,
    textTransform: "capitalize",
    fontFamily: FontFamily.workSansBold,
    color: Color.colorDarkslateblue_100,
    display: "flex",
    textAlign: "center",
    fontWeight: "700",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    flex: 1,
  },
  landscapeDesignAndPlanningWrapper: {
    alignSelf: "stretch",
  },
  tag: {
    overflow: "hidden",
  },
  gardenSize: {
    marginLeft: 10,
    color: Color.neutral07,
    letterSpacing: -0.4,
    fontSize: FontSize.title4Regular18_size,
    textAlign: "left",
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
  },
  smallPlantBtnChild: {
    backgroundColor: Color.colorGainsboro_400,
    borderWidth: 2,
    zIndex: 0,
    borderColor: Color.colorDarkslategray_500,
    borderStyle: "solid",
  },
  whitePlantIcon: {
  //  display: "none",
    zIndex: 0,
  },
  bluePlantIcon: {
    zIndex: 1,
  },
  iconOutline: {
    top: 20,
    left: 20,
    zIndex: 1,
  },
  smallPlantBtn: {
    flex: 1,
  },
  home: {
    width: 64,
  },
  sqM: {
    letterSpacing: -0.1,
    lineHeight: 17,
    color: Color.neutral06,
    fontSize: FontSize.level2Medium12_size,
    fontWeight: "500",
    textAlign: "center",
    flex: 1,
  },
  sqMWrapper: {
    marginTop: 12,
    alignSelf: "stretch",
  },
  smallGarden: {
    borderRadius: Border.br_xs,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  mediumFlowersPlantChild: {
    zIndex: 0,
    backgroundColor: Color.colorSteelblue_100,
  },
  whiteFlowersIcon: {
    zIndex: 0,
  },
  blueFlowersIcon: {
    //display: "none",
    zIndex: 1,
  },
  iconOutline1: {
    top: 19,
    left: 19,
    padding: Padding.p_12xs,
    zIndex: 1,
  },
  mediumFlowersPlant: {
    width: 64,
  },
  whiteTreesIcon: {
    //display: "none",
    zIndex: 0,
  },
  blueTreesIcon: {
    zIndex: 1,
  },
  customer: {
    flexDirection: "row",
    alignSelf: "stretch",
  },
  newCustomers: {
    marginTop: 16,
    alignSelf: "stretch",
  },
  componentspropertyType: {
    height: 174,
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
  componentslandscapingMateria: {
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
  residentialDesign: {
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    fontWeight: "600",
    fontFamily: FontFamily.level2Semibold12,
  },
  perService: {
    fontSize: FontSize.level2Medium12_size,
    fontWeight: "500",
  },
  residentialDesign1500Container: {
    color: Color.colorTypographyContentIconsBlack,
  },
  residentialDesign1500PerSWrapper: {
    flexDirection: "row",
    flex: 1,
  },
  added: {
    color: Color.colorGray_100,
  },
  addBtn: {
    flex: 1,
  },
  addBtnInner: {
    backgroundColor: Color.colorSteelblue_100,
  },
  addBtnWrapper: {
    paddingLeft: Padding.p_3xs,
  },
  frameChild: {
    borderColor: Color.colorWhitesmoke_500,
    borderTopWidth: 1,
    height: 1,
    borderStyle: "solid",
    marginTop: 8,
  },
  add: {
    color: Color.colorDarkslategray_600,
  },
  addBtnChild: {
    borderWidth: 1,
    borderColor: Color.colorDarkslategray_500,
    borderStyle: "solid",
  },
  frameParent1: {
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
  landscapeDesignSubcategory: {
    backgroundColor: Color.colorWhitesmoke_200,
    height: 812,
    width: "100%",
    flex: 1,
  }, smallPlantBtnChild: {
    backgroundColor: Color.colorGainsboro_400,
    borderWidth: 2,
    zIndex: 0,
    borderColor: Color.colorDarkslategray_500,
    borderStyle: "solid",
  },
  plantChildLayout: {
    height: 64,
    borderRadius: Border.br_lg,
    flex: 1,
  },
  mediumFlowersPlantChild: {
    zIndex: 0,
    backgroundColor: Color.colorSteelblue_100,
  },
  whitePlantIcon: {
    zIndex: 0,
  },
  blueFlowersIcon: {
    zIndex: 1,
  },
  whiteTreesIcon: {
    zIndex: 0,
  },
  outerClicked: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Color.colorSteelblue_100,
  },
  innerClicked: {
    width: 17,
    height: 17,
    backgroundColor: Color.colorSteelblue_100,
    borderRadius: 10,
  },
  outer: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  addBtnInner1: {
    borderWidth: 1,
    padding: 6,
    borderColor: Color.colorBlack,
    // backgroundColor: Color.colorSteelblue_100,
    borderStyle: "solid",
    flex: 1,
  },
    // Continue Buttonddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    timeDateModalFlexBox: {
      paddingHorizontal: Padding.p_smi,
      alignItems: "center",
      alignSelf: "stretch",
    },
    timeDateModal: {
      paddingVertical: 12,
      justifyContent: "center",
      backgroundColor: Color.white,
    },
    timeDateModal2: {
      paddingHorizontal: Padding.p_smi,
      alignSelf: "stretch",
      backgroundColor: Color.white,
    },
    priceButtonWrapper: {
      height: 48,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "stretch",
    },
    priceButton: {
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "stretch",
    },
    priceButton1: {
      marginTop: 20,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "stretch",
    },
    button: {
      backgroundColor: Color.neutral03,
      paddingHorizontal: Padding.p_xl,
      paddingVertical: Padding.p_xs,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      flex: 1,
    },
    button2: {
      backgroundColor: Color.colorDarkslategray_900,
      paddingHorizontal: Padding.p_xl,
      flexDirection: "row",
      flex: 1,
    },
    buttonFlexBox: {
      paddingVertical: Padding.p_xs,
      justifyContent: "center",
      alignItems: "center",
    },
    buttons: {
      flexDirection: "row",
      alignSelf: "stretch",
    },
    confirm: {
      fontSize: FontSize.paragraphMedium15_size,
      lineHeight: 24,
      letterSpacing: -0.1,
      color: Color.neutral07,
      textAlign: "center",
      fontFamily: FontFamily.buttonBold15,
      fontWeight: "700",
      flex: 1,
    },
    confirm2: {
      fontSize: FontSize.paragraphMedium15_size,
      lineHeight: 24,
      letterSpacing: -0.1,
      textAlign: "center",
      color: Color.white,
      fontFamily: FontFamily.buttonBold15,
      fontWeight: "700",
      flex: 1,
    },
    frameParent10: {
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "stretch",
    },
    frameParent11: {
      flexDirection: "row",
      alignSelf: "stretch",
    },
    selfProvidedMaterialsWrapper: {
      alignItems: "center",
      flexDirection: "row",
      flex: 1,
    },
    text21Typo: {
      letterSpacing: -0.2,
      textAlign: "left",
      color: Color.neutral07,
      fontFamily: FontFamily.buttonBold15,
      fontWeight: "700",
      fontSize: FontSize.title3Bold20_size,
    },
    totalCost1: {
      lineHeight: 24,
    },
    text20: {
      lineHeight: 16,
    },
    wrapper: {
      justifyContent: "flex-end",
      marginLeft: 125,
      alignItems: "center",
      flexDirection: "row",
      flex: 1,
    },
  
    // Date and Time Modal Styles
    plusBtnOverlay: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-end",
      backgroundColor: "rgba(113, 113, 113, 0.3)",
    },
    plusBtnBg: {
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
    },
});

export default LandscapeDesignSubcategory;