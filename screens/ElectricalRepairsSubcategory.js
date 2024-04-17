import * as React from "react";
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
  Modal,
} from "react-native";

import { Image } from "expo-image";
import { FontFamily, Padding, Color, Border, FontSize } from "../GlobalStyles";
import { useState, useCallback, useRef, useEffect } from "react";
import { toggleAnimation } from "../animations/toggleAnimation";
import TimeDateModal from "../components/TimeDateModal";
import AddButton from "../components/AddButton";
import AddMinusStepper from "../components/AddMinusStepper";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore"; // Updated imports
import { useReviewSummaryContext } from "../ReviewSummaryContext";

const ElectricalRepairsSubcategory = () => {
  const [loading, setLoading] = useState(true);

  const [materials, setMaterials] = useState("");
  const [property, setProperty] = useState("");
  const [materialsVisible, setMaterialsVisible] = useState(false);
  const [propertyVisible, setPropertyVisible] = useState(false);
  const [showContent1, setShowContent1] = useState(false);
  const [showContent2, setShowContent2] = useState(false);
  const [area, setArea] = useState("");
  const [dataToPass, setDataToPass] = useState(null);

  const [areaVisible1, setAreaVisible1] = useState(false);
  const [areaVisible2, setAreaVisible2] = useState(false);
  const [areaVisible3, setAreaVisible3] = useState(false);
  const [areaVisible4, setAreaVisible4] = useState(false);
  const [areaVisible5, setAreaVisible5] = useState(false);
  const [areaVisible6, setAreaVisible6] = useState(false);

  const [areaVisible7, setAreaVisible7] = useState(false);
  const [areaVisible8, setAreaVisible8] = useState(false);
  const [areaVisible9, setAreaVisible9] = useState(false);
  const [areaVisible10, setAreaVisible10] = useState(false);
  const [areaVisible11, setAreaVisible11] = useState(false);
  const [areaVisible12, setAreaVisible12] = useState(false);
  const [areaVisible13, setAreaVisible13] = useState(false);

  const [materialFee, setMaterialFee] = useState(0);

  const animationController1 = useRef(new Animated.Value(0)).current;
  const animationController2 = useRef(new Animated.Value(0)).current;

  const [lightFixtures, setlightFixtures] = useState(null);
  const [switchPrice, setswitchPrice] = useState(null);
  const [panelPrice, setpanelPrice] = useState(null);
  const [cctvPrice, setcctvPrice] = useState(null);
  const [fireAlarmPrice, setfireAlarmPrice] = useState(null);
  const [smokePrice, setsmokePrice] = useState(null);
  const [airconPrice, setairconPrice] = useState(null);
  const [fanPrice, setfanPrice] = useState(null);
  const [washingMachine, setwashingMachine] = useState(null);
  const [ovenPrice, setovenPrice] = useState(null);
  const [refPrice, setrefPrice] = useState(null);
  const [gasStove, setgasStove] = useState(null);
  const [tvPrice, settvPrice] = useState(null);

  useEffect(() => {
    // Reference to Firestore
    const db = getFirestore(); // Use getFirestore() to initialize Firestore

    // Reference to the "servicesPrices" collection and "Plumbing" document
    const collectionName = "servicesPrices";
    const documentName = "Electrical";
    const subCollectionName = "SubCategories"; // Name of the subcollection

    // Fetch the "Installation" document under "SubCategories"
    const subCollectionRef = doc(
      db,
      collectionName,
      documentName,
      subCollectionName,
      "Repairs"
    ); // Assuming "Installation" is the document name

    getDoc(subCollectionRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const repairData = docSnapshot.data();

          setlightFixtures(repairData.lightFixtures);
          setswitchPrice(repairData.switch);
          setpanelPrice(repairData.panelUpgrades);
          setcctvPrice(repairData.cctv);
          setfireAlarmPrice(repairData.fireAlarm);
          setsmokePrice(repairData.smoke);
          setairconPrice(repairData.aircon);
          setfanPrice(repairData.electricFan);
          setwashingMachine(repairData.washingMachine);
          setovenPrice(repairData.microwave);
          setrefPrice(repairData.refrigerator);
          setgasStove(repairData.gasStove);
          settvPrice(repairData.television);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      })
      .finally(() => {
        // Set loading to false when data fetching is complete
        setLoading(false);
      });
  }, []);

  const handleCategoryButtonPress = (category, value) => {
    if (category === "Property") {
      setProperty(value);
      setPropertyVisible(true);
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
      setAreaVisible8(true);
      setAreaVisible9(true);
      setAreaVisible10(true);
      setAreaVisible11(true);
      setAreaVisible12(true);
      setAreaVisible13(true);
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
    } else if (value === "seven") {
      setAreaVisible7(true);
    } else if (value === "eight") {
      setAreaVisible8(true);
    } else if (value === "nine") {
      setAreaVisible9(true);
    } else if (value === "ten") {
      setAreaVisible10(true);
    } else if (value === "eleven") {
      setAreaVisible11(true);
    } else if (value === "twelve") {
      setAreaVisible12(true);
    } else if (value === "thirteen") {
      setAreaVisible13(true);
    }
  };

  const isContinueButtonDisabled = !(
    propertyVisible &&
    materialsVisible &&
    (areaVisible1 ||
      areaVisible2 ||
      areaVisible3 ||
      areaVisible4 ||
      areaVisible5 ||
      areaVisible6 ||
      areaVisible7 ||
      areaVisible8 ||
      areaVisible9 ||
      areaVisible10 ||
      areaVisible11 ||
      areaVisible12 ||
      areaVisible13)
  );

  const toggleListItem1 = () => {
    const config = {
      duration: 300,
      toValue: showContent1 ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController1, config).start();
    LayoutAnimation.configureNext(toggleAnimation);
    setShowContent1(!showContent1);
  };
  const toggleListItem2 = () => {
    const config = {
      duration: 300,
      toValue: showContent2 ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController2, config).start();
    LayoutAnimation.configureNext(toggleAnimation);
    setShowContent2(!showContent2);
  };

  const arrowTransform1 = animationController1.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });
  const arrowTransform2 = animationController2.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const [input1Value, setInput1Value] = useState(0);
  const [input2Value, setInput2Value] = useState(0);
  const [input3Value, setInput3Value] = useState(0);
  const [input4Value, setInput4Value] = useState(0);
  const [input5Value, setInput5Value] = useState(0);
  const [input6Value, setInput6Value] = useState(0);

  const [input7Value, setInput7Value] = useState(0);
  const [input8Value, setInput8Value] = useState(0);
  const [input9Value, setInput9Value] = useState(0);
  const [input10Value, setInput10Value] = useState(0);
  const [input11Value, setInput11Value] = useState(0);
  const [input12Value, setInput12Value] = useState(0);
  const [input13Value, setInput13Value] = useState(0);

  const multipliedValue =
    parseInt(input1Value) * lightFixtures +
    parseInt(input2Value) * switchPrice +
    parseInt(input3Value) * panelPrice +
    parseInt(input4Value) * cctvPrice +
    parseInt(input5Value) * fireAlarmPrice +
    parseInt(input6Value) * smokePrice +
    parseInt(input7Value) * airconPrice +
    parseInt(input8Value) * fanPrice +
    parseInt(input9Value) * washingMachine +
    parseInt(input10Value) * ovenPrice +
    parseInt(input11Value) * refPrice +
    parseInt(input12Value) * gasStove +
    parseInt(input13Value) * tvPrice +
    parseInt(materialFee);

  // Define an object to store service prices
  const servicePrices = {
    light: lightFixtures,
    switch: switchPrice,
    panel: panelPrice,
    cctv: cctvPrice,
    fire: fireAlarmPrice,
    smoke: smokePrice,

    aircon: airconPrice,
    fan: fanPrice,
    washing: washingMachine,
    oven: ovenPrice,
    ref: refPrice,
    gas: gasStove,
    tv: tvPrice,
  };

  const inputValues = [
    { name: "Light Fixtures", value: input1Value, service: "light" },
    { name: "Switch and Outlet", value: input2Value, service: "switch" },
    { name: "Electrical Panel Upgrades", value: input3Value, service: "panel" },
    { name: "CCTV", value: input4Value, service: "cctv" },
    { name: "Fire Alarm", value: input5Value, service: "fire" },
    { name: "Smoke Detector", value: input6Value, service: "smoke" },

    { name: "Air Conditioner", value: input7Value, service: "aircon" },
    { name: "Electric Fan", value: input8Value, service: "fan" },
    { name: "Washing Machine", value: input9Value, service: "washing" },
    { name: "Microwave Oven", value: input10Value, service: "oven" },
    { name: "Refrigerator", value: input11Value, service: "ref" },
    { name: "Gas Stove", value: input12Value, service: "gas" },
    { name: "Television", value: input13Value, service: "tv" },
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
        property: property,
        materials: materials,
        inputValues: filteredInputsWithTotalPrice,
        multipliedValue, // Pass the multipliedValue
        category: "Repairs/Replacement", // Add the string here
        logo: "mask-group13.png",
        title: "Electrical",
      });
    } else {
      // Handle the case where there are no input values with totalPrice > 0 (optional)
      // You can display a message to the user or take other actions.
      // For now, let's log an error message.
      console.error("No input values with totalPrice greater than 0");
    }
  };

  return (
    <View style={styles.electricalRepairsSubcategory}>
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
          style={[styles.repairsreplacementWrapper, styles.btnWrapperFlexBox]}
        >
          <Text style={styles.repairsreplacement}>Repairs/Replacement</Text>
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
              <Text
                style={[styles.typeOfProperty, styles.typeOfPropertyFlexBox]}
              >
                Type of Property
              </Text>
            </View>
            <View style={styles.newCustomers}>
              <View style={[styles.customer, styles.btnWrapperFlexBox]}>
                <View style={styles.home}>
                  <View style={[styles.home1, styles.homeFlexBox]}>
                    <Pressable
                      style={[styles.homeBtn, styles.homeFlexBox]}
                      onPress={() =>
                        handleCategoryButtonPress("Property", "home")
                      }
                    >
                      <View
                        style={
                          property == "home"
                            ? styles.propertyClicked
                            : styles.apartment1
                        }
                      />
                      <View style={styles.iconOutline}>
                        {property == "home" ? (
                          <Image
                            style={[
                              styles.whiteHomeIcon,
                              styles.homeIconPosition,
                            ]}
                            contentFit="cover"
                            source={require("../assets/white-home.png")}
                          />
                        ) : (
                          <Image
                            style={[
                              styles.blueHomeIcon,
                              styles.homeIconPosition,
                            ]}
                            contentFit="cover"
                            source={require("../assets/blue-home.png")}
                          />
                        )}
                      </View>
                    </Pressable>
                  </View>
                  <View style={[styles.homeWrapper, styles.btnWrapperFlexBox]}>
                    <Text style={[styles.home2, styles.home2Typo]}>Home</Text>
                  </View>
                </View>
                <View style={styles.home}>
                  <Pressable
                    style={[styles.condoBtn, styles.wrapperFrameFlexBox]}
                    onPress={() =>
                      handleCategoryButtonPress("Property", "condo")
                    }
                  >
                    <View
                      style={
                        property == "condo"
                          ? styles.propertyClicked
                          : styles.apartment1
                      }
                    />
                    <View style={[styles.iconOutline1, styles.iconPosition]}>
                      {property == "condo" ? (
                        <Image
                          style={[
                            styles.whiteCondoIcon,
                            styles.blueIconPosition,
                          ]}
                          contentFit="cover"
                          source={require("../assets/white-condo.png")}
                        />
                      ) : (
                        <Image
                          style={[
                            styles.blueCondoIcon,
                            styles.blueIconPosition,
                          ]}
                          contentFit="cover"
                          source={require("../assets/blue-condo.png")}
                        />
                      )}
                    </View>
                  </Pressable>
                  <View style={[styles.homeWrapper, styles.btnWrapperFlexBox]}>
                    <Text style={[styles.condominium, styles.home2Typo]}>
                      Condominium
                    </Text>
                  </View>
                </View>
                <View style={styles.home}>
                  <Pressable
                    style={[
                      styles.deepCleaningWrapper,
                      styles.wrapperFrameFlexBox,
                    ]}
                    onPress={() =>
                      handleCategoryButtonPress("Property", "apartment")
                    }
                  >
                    <View style={[styles.condoBtn, styles.wrapperFrameFlexBox]}>
                      <View
                        style={
                          property == "apartment"
                            ? styles.propertyClicked
                            : styles.apartment1
                        }
                      />
                      <View style={[styles.iconOutline2, styles.iconPosition]}>
                        {property == "apartment" ? (
                          <Image
                            style={[
                              styles.whiteApartmentIcon,
                              styles.blueIconPosition,
                            ]}
                            contentFit="cover"
                            source={require("../assets/white-apartment.png")}
                          />
                        ) : (
                          <Image
                            style={[
                              styles.blueApartmentIcon,
                              styles.blueIconPosition,
                            ]}
                            contentFit="cover"
                            source={require("../assets/blue-apartment.png")}
                          />
                        )}
                      </View>
                    </View>
                  </Pressable>
                  <View style={[styles.homeWrapper, styles.btnWrapperFlexBox]}>
                    <Text style={[styles.condominium, styles.home2Typo]}>
                      Apartment
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View
            style={[
              styles.componentscleaningMaterials,
              styles.frameParentSpaceBlock,
            ]}
          >
            <View style={styles.titleFlexBox}>
              <View style={[styles.tag, styles.tagLayout]} />
              <Text
                style={[styles.typeOfProperty, styles.typeOfPropertyFlexBox]}
              >
                Electric Materials
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
                    style={[
                      styles.selfProvidedMaterials,
                      styles.perSquareMeterTypo,
                    ]}
                  >
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
              <View style={styles.titleFlexBox}>
                <View style={styles.selfProvidedMaterialsWrapper}>
                  <Text
                    style={[
                      styles.selfProvidedMaterials,
                      styles.perSquareMeterTypo,
                    ]}
                  >
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
                style={[styles.typeOfProperty, styles.typeOfPropertyFlexBox]}
              >
                Type of Repairs/Replacement
              </Text>
            </View>
            <View style={styles.frameContainer}>
              <View
                style={[
                  styles.repairsreplacementWrapper,
                  styles.btnWrapperFlexBox,
                ]}
              >
                <View style={styles.lightFixtures800PerUnitWrapper}>
                  <Text
                    style={[
                      styles.lightFixtures800Container,
                      styles.containerClr,
                    ]}
                  >
                    <Text
                      style={[styles.lightFixtures, styles.cctvTypo]}
                    >{`Light Fixtures
`}</Text>
                    <Text style={[styles.perFixture, styles.perFixtureTypo]}>
                      {loading ? "Loading..." : `₱${lightFixtures} per unit`}
                    </Text>
                  </Text>
                </View>
                {areaVisible1 ? (
                  <View>
                    <AddMinusStepper
                      initialValue={input1Value}
                      onIncrement={() => setInput1Value(input1Value + 1)}
                      onDecrement={() => {
                        setInput1Value(input1Value - 1);
                        if (input1Value === 1) setInput1Value(input1Value - 1);
                      }}
                      onRemove={() => [setArea("ten"), setAreaVisible1(false)]}
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
                    />
                  </View>
                )}
              </View>
              <View style={[styles.frameChild, styles.frameParentSpaceBlock]} />
              <View style={[styles.frameParent1, styles.frameParentSpaceBlock]}>
                <View style={styles.lightFixtures800PerUnitWrapper}>
                  <Text
                    style={[
                      styles.lightFixtures800Container,
                      styles.containerClr,
                    ]}
                  >
                    <Text
                      style={[styles.lightFixtures, styles.cctvTypo]}
                    >{`Switch and Outlet
`}</Text>
                    <Text style={[styles.perFixture, styles.perFixtureTypo]}>
                      {loading ? "Loading..." : `₱${switchPrice} per unit`}
                    </Text>
                  </Text>
                </View>
                {areaVisible2 ? (
                  <View>
                    <AddMinusStepper
                      initialValue={input2Value}
                      onIncrement={() => setInput2Value(input2Value + 1)}
                      onDecrement={() => {
                        setInput2Value(input2Value - 1);
                        if (input2Value === 1) setInput2Value(input2Value - 1);
                      }}
                      onRemove={() => [setArea("ten"), setAreaVisible2(false)]}
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
                    />
                  </View>
                )}
              </View>
              <View style={[styles.frameChild, styles.frameParentSpaceBlock]} />
              <View style={[styles.frameParent1, styles.frameParentSpaceBlock]}>
                <View style={styles.lightFixtures800PerUnitWrapper}>
                  <Text
                    style={[
                      styles.lightFixtures800Container,
                      styles.containerClr,
                    ]}
                  >
                    <Text
                      style={[styles.lightFixtures, styles.cctvTypo]}
                    >{`Electrical Panel Upgrades
`}</Text>
                    <Text style={[styles.perFixture, styles.perFixtureTypo]}>
                      {loading ? "Loading..." : `₱${panelPrice} per unit`}
                    </Text>
                  </Text>
                </View>
                {areaVisible3 ? (
                  <View>
                    <AddMinusStepper
                      initialValue={input3Value}
                      onIncrement={() => setInput3Value(input3Value + 1)}
                      onDecrement={() => {
                        setInput3Value(input3Value - 1);
                        if (input3Value === 1) setInput3Value(input3Value - 1);
                      }}
                      onRemove={() => [setArea("ten"), setAreaVisible3(false)]}
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
                    />
                  </View>
                )}
              </View>
              <View style={[styles.frameChild, styles.frameParentSpaceBlock]} />
              <View style={[styles.frameParent2, styles.frameParentSpaceBlock]}>
                <TouchableOpacity
                  onPress={() => toggleListItem1()}
                  style={[
                    styles.deepCleaningWrapper,
                    styles.wrapperFrameFlexBox,
                  ]}
                >
                  <View style={styles.upholsteryCleaningWrapper}>
                    <Text
                      style={[
                        styles.upholsteryCleaning,
                        styles.perContainerClr,
                      ]}
                    >
                      Security Systems
                    </Text>
                  </View>
                  <Animated.Image
                    style={[
                      styles.collapseArrowIcon,
                      { transform: [{ rotate: arrowTransform1 }] },
                    ]}
                    contentFit="cover"
                    source={require("../assets/collapse-arrow.png")}
                  ></Animated.Image>
                </TouchableOpacity>
              </View>
              {showContent1 && (
                <View
                  style={[
                    styles.selfProvidedMaterialsFrameParent,
                    styles.frameParentSpaceBlock,
                  ]}
                >
                  <View
                    style={[
                      styles.repairsreplacementWrapper,
                      styles.btnWrapperFlexBox,
                    ]}
                  >
                    <View style={styles.perWrapperSpaceBlock}>
                      <Text
                        style={[
                          styles.cctv850PerContainer,
                          styles.containerClr,
                        ]}
                      >
                        <Text style={styles.cctvTypo}>
                          <Text style={styles.cctv1}>CCTV</Text>
                          <Text style={styles.text3}>{` 
 `}</Text>
                        </Text>
                        <Text
                          style={[styles.perFixture, styles.perFixtureTypo]}
                        >
                          {loading ? "Loading..." : `₱${cctvPrice} per unit`}
                        </Text>
                      </Text>
                    </View>
                    {areaVisible4 ? (
                      <View>
                        <AddMinusStepper
                          initialValue={input4Value}
                          onIncrement={() => setInput4Value(input4Value + 1)}
                          onDecrement={() => {
                            setInput4Value(input4Value - 1);
                            if (input4Value === 1)
                              setInput4Value(input4Value - 1);
                          }}
                          onRemove={() => [
                            setArea("ten"),
                            setAreaVisible4(false),
                          ]}
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
                        />
                      </View>
                    )}
                  </View>
                  <View
                    style={[styles.frameParent1, styles.frameParentSpaceBlock]}
                  >
                    <View style={styles.perWrapperSpaceBlock}>
                      <Text
                        style={[
                          styles.cctv850PerContainer,
                          styles.containerClr,
                        ]}
                      >
                        <Text
                          style={[styles.fireAlarm, styles.cctvTypo]}
                        >{`Fire Alarm
 `}</Text>
                        <Text
                          style={[styles.perFixture, styles.perFixtureTypo]}
                        >
                          {loading
                            ? "Loading..."
                            : `₱${fireAlarmPrice} per unit`}
                        </Text>
                      </Text>
                    </View>
                    {areaVisible5 ? (
                      <View>
                        <AddMinusStepper
                          initialValue={input5Value}
                          onIncrement={() => setInput5Value(input5Value + 1)}
                          onDecrement={() => {
                            setInput5Value(input5Value - 1);
                            if (input5Value === 1)
                              setInput5Value(input5Value - 1);
                          }}
                          onRemove={() => [
                            setArea("ten"),
                            setAreaVisible5(false),
                          ]}
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
                        />
                      </View>
                    )}
                  </View>
                  <View
                    style={[styles.frameParent1, styles.frameParentSpaceBlock]}
                  >
                    <View
                      style={[
                        styles.smokeDetector1100PerUnitWrapper,
                        styles.perWrapperSpaceBlock,
                      ]}
                    >
                      <Text
                        style={[
                          styles.lightFixtures800Container,
                          styles.containerClr,
                        ]}
                      >
                        <Text
                          style={[styles.fireAlarm, styles.cctvTypo]}
                        >{`Smoke Detector
 `}</Text>
                        <Text
                          style={[styles.perFixture, styles.perFixtureTypo]}
                        >
                          {loading ? "Loading..." : `₱${smokePrice} per unit`}
                        </Text>
                      </Text>
                    </View>
                    {areaVisible6 ? (
                      <View>
                        <AddMinusStepper
                          initialValue={input6Value}
                          onIncrement={() => setInput6Value(input6Value + 1)}
                          onDecrement={() => {
                            setInput6Value(input6Value - 1);
                            if (input6Value === 1)
                              setInput6Value(input6Value - 1);
                          }}
                          onRemove={() => [
                            setArea("ten"),
                            setAreaVisible6(false),
                          ]}
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
                        />
                      </View>
                    )}
                  </View>
                </View>
              )}
              <View style={[styles.frameChild, styles.frameParentSpaceBlock]} />
              <View style={[styles.frameParent2, styles.frameParentSpaceBlock]}>
                <TouchableOpacity
                  onPress={() => toggleListItem2()}
                  style={[
                    styles.deepCleaningWrapper,
                    styles.wrapperFrameFlexBox,
                  ]}
                >
                  <View style={styles.upholsteryCleaningWrapper}>
                    <Text
                      style={[
                        styles.upholsteryCleaning,
                        styles.perContainerClr,
                      ]}
                    >
                      Electrical Appliances
                    </Text>
                  </View>
                  <Animated.Image
                    style={[
                      styles.collapseArrowIcon,
                      { transform: [{ rotate: arrowTransform2 }] },
                    ]}
                    contentFit="cover"
                    source={require("../assets/collapse-arrow.png")}
                  ></Animated.Image>
                </TouchableOpacity>
              </View>
              {showContent2 && (
                <View
                  style={[
                    styles.selfProvidedMaterialsFrameParent,
                    styles.frameParentSpaceBlock,
                  ]}
                >
                  <View
                    style={[
                      styles.repairsreplacementWrapper,
                      styles.btnWrapperFlexBox,
                    ]}
                  >
                    <View style={styles.perWrapperSpaceBlock}>
                      <Text
                        style={[
                          styles.cctv850PerContainer,
                          styles.containerClr,
                        ]}
                      >
                        <Text
                          style={[styles.fireAlarm, styles.cctvTypo]}
                        >{`Air Conditioner 
`}</Text>
                        <Text
                          style={[styles.perFixture, styles.perFixtureTypo]}
                        >
                          {loading ? "Loading...": `₱${airconPrice} per appliance`}
                        </Text>
                      </Text>
                    </View>
                    {areaVisible7 ? (
                      <View>
                        <AddMinusStepper
                          initialValue={input7Value}
                          onIncrement={() => setInput7Value(input7Value + 1)}
                          onDecrement={() => {
                            setInput7Value(input7Value - 1);
                            if (input7Value === 1)
                              setInput7Value(input7Value - 1);
                          }}
                          onRemove={() => [
                            setArea("ten"),
                            setAreaVisible7(false),
                          ]}
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
                        />
                      </View>
                    )}
                  </View>
                  <View
                    style={[styles.frameParent1, styles.frameParentSpaceBlock]}
                  >
                    <View style={styles.perWrapperSpaceBlock}>
                      <Text
                        style={[
                          styles.cctv850PerContainer,
                          styles.containerClr,
                        ]}
                      >
                        <Text
                          style={[styles.fireAlarm, styles.cctvTypo]}
                        >{`Electric Fan
`}</Text>
                       <Text
                          style={[styles.perFixture, styles.perFixtureTypo]}
                        >
                          {loading
                            ? "Loading..."
                            : `₱${fanPrice} per appliance`}
                        </Text>
                      </Text>
                    </View>
                    {areaVisible8 ? (
                      <View>
                        <AddMinusStepper
                          initialValue={input8Value}
                          onIncrement={() => setInput8Value(input8Value + 1)}
                          onDecrement={() => {
                            setInput8Value(input8Value - 1);
                            if (input8Value === 1)
                              setInput8Value(input8Value - 1);
                          }}
                          onRemove={() => [
                            setArea("ten"),
                            setAreaVisible8(false),
                          ]}
                        />
                      </View>
                    ) : (
                      <View>
                        <AddButton
                          title="Add"
                          onPress={() => {
                            handleCategoryButtonPress("Area", "eight");
                            setInput8Value(1);
                          }}
                        />
                      </View>
                    )}
                  </View>
                  <View
                    style={[styles.frameParent1, styles.frameParentSpaceBlock]}
                  >
                    <View
                      style={[
                        styles.smokeDetector1100PerUnitWrapper,
                        styles.perWrapperSpaceBlock,
                      ]}
                    >
                      <Text
                        style={[
                          styles.lightFixtures800Container,
                          styles.containerClr,
                        ]}
                      >
                        <Text
                          style={[styles.fireAlarm, styles.cctvTypo]}
                        >{`Washing Machine
`}</Text>
                         <Text
                          style={[styles.perFixture, styles.perFixtureTypo]}
                        >
                          {loading
                            ? "Loading..." : `₱${washingMachine} per appliance`}
                        </Text>
                      </Text>
                    </View>
                    {areaVisible9 ? (
                      <View>
                        <AddMinusStepper
                          initialValue={input9Value}
                          onIncrement={() => setInput9Value(input9Value + 1)}
                          onDecrement={() => {
                            setInput9Value(input9Value - 1);
                            if (input9Value === 1)
                              setInput9Value(input9Value - 1);
                          }}
                          onRemove={() => [
                            setArea("ten"),
                            setAreaVisible9(false),
                          ]}
                        />
                      </View>
                    ) : (
                      <View>
                        <AddButton
                          title="Add"
                          onPress={() => {
                            handleCategoryButtonPress("Area", "nine");
                            setInput9Value(1);
                          }}
                        />
                      </View>
                    )}
                  </View>
                  <View
                    style={[styles.frameParent1, styles.frameParentSpaceBlock]}
                  >
                    <View style={styles.perWrapperSpaceBlock}>
                      <Text
                        style={[
                          styles.cctv850PerContainer,
                          styles.containerClr,
                        ]}
                      >
                        <Text
                          style={[styles.fireAlarm, styles.cctvTypo]}
                        >{`Microwave Oven
`}</Text>
                        <Text
                          style={[styles.perFixture, styles.perFixtureTypo]}
                        >
                          {loading
                            ? "Loading..."
                            : `₱${ovenPrice} per appliance`}
                        </Text>
                      </Text>
                    </View>
                    {areaVisible10 ? (
                      <View>
                        <AddMinusStepper
                          initialValue={input10Value}
                          onIncrement={() => setInput10Value(input10Value + 1)}
                          onDecrement={() => {
                            setInput10Value(input10Value - 1);
                            if (input10Value === 1)
                              setInput10Value(input10Value - 1);
                          }}
                          onRemove={() => [
                            setArea("ten"),
                            setAreaVisible10(false),
                          ]}
                        />
                      </View>
                    ) : (
                      <View>
                        <AddButton
                          title="Add"
                          onPress={() => {
                            handleCategoryButtonPress("Area", "ten");
                            setInput10Value(1);
                          }}
                        />
                      </View>
                    )}
                  </View>
                  <View
                    style={[styles.frameParent1, styles.frameParentSpaceBlock]}
                  >
                    <View style={styles.perWrapperSpaceBlock}>
                      <Text
                        style={[
                          styles.cctv850PerContainer,
                          styles.containerClr,
                        ]}
                      >
                        <Text
                          style={[styles.fireAlarm, styles.cctvTypo]}
                        >{`Refrigerator
`}</Text>
                         <Text
                          style={[styles.perFixture, styles.perFixtureTypo]}
                        >
                          {loading
                            ? "Loading..."
                            : `₱${refPrice} per appliance`}
                        </Text>
                      </Text>
                    </View>
                    {areaVisible11 ? (
                      <View>
                        <AddMinusStepper
                          initialValue={input11Value}
                          onIncrement={() => setInput11Value(input11Value + 1)}
                          onDecrement={() => {
                            setInput11Value(input11Value - 1);
                            if (input11Value === 1)
                              setInput11Value(input11Value - 1);
                          }}
                          onRemove={() => [
                            setArea("ten"),
                            setAreaVisible11(false),
                          ]}
                        />
                      </View>
                    ) : (
                      <View>
                        <AddButton
                          title="Add"
                          onPress={() => {
                            handleCategoryButtonPress("Area", "eleven");
                            setInput11Value(1);
                          }}
                        />
                      </View>
                    )}
                  </View>
                  <View
                    style={[styles.frameParent1, styles.frameParentSpaceBlock]}
                  >
                    <View
                      style={[
                        styles.smokeDetector1100PerUnitWrapper,
                        styles.perWrapperSpaceBlock,
                      ]}
                    >
                      <Text
                        style={[
                          styles.lightFixtures800Container,
                          styles.containerClr,
                        ]}
                      >
                        <Text
                          style={[styles.fireAlarm, styles.cctvTypo]}
                        >{`Gas Stove
`}</Text>
                          <Text
                          style={[styles.perFixture, styles.perFixtureTypo]}
                        >
                          {loading
                            ? "Loading..."
                            : `₱${gasStove} per appliance`}
                        </Text>
                      </Text>
                    </View>
                    {areaVisible12 ? (
                      <View>
                        <AddMinusStepper
                          initialValue={input12Value}
                          onIncrement={() => setInput12Value(input12Value + 1)}
                          onDecrement={() => {
                            setInput12Value(input12Value - 1);
                            if (input12Value === 1)
                              setInput12Value(input12Value - 1);
                          }}
                          onRemove={() => [
                            setArea("ten"),
                            setAreaVisible12(false),
                          ]}
                        />
                      </View>
                    ) : (
                      <View>
                        <AddButton
                          title="Add"
                          onPress={() => {
                            handleCategoryButtonPress("Area", "twelve");
                            setInput12Value(1);
                          }}
                        />
                      </View>
                    )}
                  </View>
                  <View
                    style={[styles.frameParent1, styles.frameParentSpaceBlock]}
                  >
                    <View
                      style={[
                        styles.smokeDetector1100PerUnitWrapper,
                        styles.perWrapperSpaceBlock,
                      ]}
                    >
                      <Text
                        style={[
                          styles.lightFixtures800Container,
                          styles.containerClr,
                        ]}
                      >
                        <Text
                          style={[styles.fireAlarm, styles.cctvTypo]}
                        >{`Television
`}</Text>
                           <Text
                          style={[styles.perFixture, styles.perFixtureTypo]}
                        >
                          {loading
                            ? "Loading..."
                            : `₱${tvPrice} per appliance`}
                        </Text>
                      </Text>
                    </View>
                    {areaVisible13 ? (
                      <View>
                        <AddMinusStepper
                          initialValue={input13Value}
                          onIncrement={() => setInput13Value(input13Value + 1)}
                          onDecrement={() => {
                            setInput13Value(input13Value - 1);
                            if (input13Value === 1)
                              setInput13Value(input13Value - 1);
                          }}
                          onRemove={() => [
                            setArea("ten"),
                            setAreaVisible13(false),
                          ]}
                        />
                      </View>
                    ) : (
                      <View>
                        <AddButton
                          title="Add"
                          onPress={() => {
                            handleCategoryButtonPress("Area", "thirteen");
                            setInput13Value(1);
                          }}
                        />
                      </View>
                    )}
                  </View>
                </View>
              )}
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  deepCleaningWrapper: {
    alignItems: "center",
    alignSelf: "stretch",
  },
  wrapperFrameFlexBox: {
    justifyContent: "center",
    flexDirection: "row",
  },
  upholsteryCleaning: {
    letterSpacing: -0.3,
    lineHeight: 22,
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
    fontSize: FontSize.bodyLgBodyLgRegular_size,
  },
  upholsteryCleaningWrapper: {
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    flex: 1,
  },
  perContainerClr: {
    color: Color.colorTypographyContentIconsBlack,
    textAlign: "left",
  },
  collapseArrowIcon: {
    width: 30,
    height: 30,
    marginLeft: 13,
  },
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
  btnWrapperFlexBox: {
    justifyContent: "center",
    flexDirection: "row",
  },
  serviceDetailsTypo: {
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
  typeOfPropertyFlexBox: {
    color: Color.neutral07,
    letterSpacing: -0.4,
    textAlign: "left",
    fontSize: FontSize.title4Regular18_size,
    flex: 1,
  },
  homeFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  btnChildLayout: {
    height: 64,
    borderRadius: Border.br_lg,
    zIndex: 0,
  },
  homeIconPosition: {
    left: 0,
    top: 0,
    position: "absolute",
    height: 24,
    width: 24,
  },
  home2Typo: {
    color: Color.neutral06,
    lineHeight: 18,
    letterSpacing: -0.1,
    fontSize: FontSize.typographyTaglineSmallRegular_size,
    fontFamily: FontFamily.level2Medium12,
    fontWeight: "500",
  },
  iconPosition: {
    padding: Padding.p_12xs,
    top: 18,
    zIndex: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
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
  perUnitTypo: {
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
  containerClr: {
    color: Color.colorTypographyContentIconsBlack,
    textAlign: "left",
  },
  cctvTypo: {
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
  },
  btnFlexBox: {
    padding: Padding.p_2xs,
    borderRadius: Border.br_xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  perWrapperSpaceBlock: {
    paddingLeft: Padding.p_xl,
    flex: 1,
  },
  repairsreplacement: {
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
  repairsreplacementWrapper: {
    alignItems: "center",
    alignSelf: "stretch",
  },
  tag: {
    overflow: "hidden",
  },
  typeOfProperty: {
    marginLeft: 10,
    textAlign: "left",
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
  },
  homeBtnChild: {
    zIndex: 0,
    borderWidth: 2,
    backgroundColor: Color.colorGainsboro_400,
    height: 64,
    borderColor: Color.colorDarkslategray_500,
    borderStyle: "solid",
    borderRadius: Border.br_lg,
    flex: 1,
  },
  whiteHomeIcon: {
    zIndex: 0,
  },
  blueHomeIcon: {
    zIndex: 1,
  },
  iconOutline: {
    top: 20,
    zIndex: 1,
    left: 20,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  homeBtn: {
    flex: 1,
  },
  home1: {
    width: 64,
  },
  home2: {
    textAlign: "left",
  },
  homeWrapper: {
    marginTop: 12,
    alignItems: "center",
    alignSelf: "stretch",
  },
  home: {
    borderRadius: Border.br_xs,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  condoBtnChild: {
    zIndex: 0,
    height: 64,
    borderRadius: Border.br_lg,
    width: 64,
    backgroundColor: Color.colorSteelblue_100,
  },
  whiteCondoIcon: {
    zIndex: 0,
  },
  blueCondoIcon: {
    zIndex: 1,
  },
  iconOutline1: {
    left: 19,
  },
  condoBtn: {
    alignItems: "center",
  },
  condominium: {
    textAlign: "center",
    flex: 1,
  },
  apartment1: {
    zIndex: 0,
    borderWidth: 2,
    backgroundColor: Color.colorGainsboro_400,
    height: 64,
    borderColor: Color.colorDarkslategray_500,
    borderStyle: "solid",
    borderRadius: Border.br_lg,
    width: 64,
  },
  whiteApartmentIcon: {
    zIndex: 0,
  },
  blueApartmentIcon: {
    zIndex: 1,
  },
  iconOutline2: {
    left: 20,
  },
  customer: {
    alignSelf: "stretch",
  },
  newCustomers: {
    marginTop: 16,
    alignItems: "center",
    alignSelf: "stretch",
  },
  componentspropertyType: {
    alignSelf: "stretch",
  },
  selfProvidedMaterials: {
    textAlign: "left",
    color: Color.neutral07,
    letterSpacing: -0.4,
    fontSize: FontSize.title4Regular18_size,
    flex: 1,
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
  componentselectricalMaterial: {
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
  lightFixtures: {
    fontSize: FontSize.bodyLgBodyLgRegular_size,
  },
  perUnit: {
    fontSize: FontSize.level2Medium12_size,
  },
  lightFixtures800Container: {
    flex: 1,
    alignSelf: "stretch",
  },
  lightFixtures800PerUnitWrapper: {
    flexDirection: "row",
    flex: 1,
  },
  add2Child: {
    borderTopWidth: 2.5,
    height: 3,
    width: 14,
    borderColor: Color.colorDarkslategray_500,
    borderStyle: "solid",
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
    fontFamily: FontFamily.title4Regular18,
    color: Color.colorDarkslategray_600,
    marginLeft: 10,
    fontSize: FontSize.title4Regular18_size,
    textAlign: "center",
    letterSpacing: 0.5,
    flex: 1,
  },
  add2Icon: {
    height: 14,
    width: 14,
    overflow: "hidden",
  },
  plusBtn: {
    borderWidth: 1,
    padding: Padding.p_2xs,
    borderColor: Color.colorDarkslategray_500,
    borderStyle: "solid",
    backgroundColor: Color.colorGainsboro_300,
    marginLeft: 10,
  },
  minusBtnParent: {
    alignItems: "center",
    flex: 1,
  },
  frameWrapper: {
    width: 103,
    marginLeft: 13,
  },
  frameChild: {
    borderColor: Color.colorWhitesmoke_500,
    borderTopWidth: 1,
    height: 1,
    borderStyle: "solid",
    marginTop: 8,
  },
  frameParent1: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  frameParent2: {
    justifyContent: "center",
    alignItems: "center",
  },
  securitySystems: {
    letterSpacing: -0.3,
    lineHeight: 22,
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    color: Color.colorTypographyContentIconsBlack,
    textAlign: "left",
  },
  securitySystemsWrapper: {
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    flex: 1,
  },
  collapseArrowIcon: {
    width: 30,
    height: 30,
    marginLeft: 13,
  },
  cctv1: {
    fontSize: FontSize.body1Semibold_size,
  },
  text3: {
    fontSize: FontSize.bodyLgBodyLgRegular_size,
  },
  cctv850PerContainer: {
    alignSelf: "stretch",
  },
  addBtn: {
    marginLeft: 10,
    padding: Padding.p_2xs,
    backgroundColor: Color.colorSteelblue_100,
  },
  fireAlarm: {
    fontSize: FontSize.body1Semibold_size,
  },
  smokeDetector1100PerUnitWrapper: {
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
  electricalRepairsSubcategory: {
    backgroundColor: Color.colorWhitesmoke_200,
    height: 812,
    width: "100%",
    flex: 1,
  },
  propertyClicked: {
    zIndex: 0,
    height: 64,
    borderRadius: Border.br_lg,
    width: 64,
    backgroundColor: Color.colorSteelblue_100,
  },
  componentscleaningMaterials: {
    paddingVertical: Padding.p_base,
    paddingHorizontal: Padding.p_3xs,
    backgroundColor: Color.colorGainsboro_300,
    borderRadius: Border.br_5xs,
    alignItems: "center",
  },
  perSquareMeterTypo: {
    fontFamily: FontFamily.level2Medium12,
    fontWeight: "500",
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

export default ElectricalRepairsSubcategory;
