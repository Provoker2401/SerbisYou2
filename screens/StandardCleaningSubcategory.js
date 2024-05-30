import * as React from "react";
import {
  StatusBar,
  StyleSheet,
  Pressable,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { FontFamily, Padding, Color, Border, FontSize } from "../GlobalStyles";
import { useState, useEffect } from "react";
import TimeDateModal from "../components/TimeDateModal";
import AddButton from "../components/AddButton";
import AddMinusStepper from "../components/AddMinusStepper";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore"; // Updated imports
import { useReviewSummaryContext } from "../ReviewSummaryContext";

const StandardCleaningSubcategory = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const bookDirect = route.params?.bookDirect || false;

  // copied code
  const [materials, setMaterials] = useState("");
  const [property, setProperty] = useState("");
  const [materialsVisible, setMaterialsVisible] = useState(false);
  const [propertyVisible, setPropertyVisible] = useState(false);
  const [area, setArea] = useState("");

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

  const [materialFee, setMaterialFee] = useState(0);

  // prices for the services
  const [living, setLiving] = useState(null);
  const [garage, setGarage] = useState(null);
  const [bath, setBath] = useState(null);
  const [bed, setBed] = useState(null);
  const [kitchen, setKitchen] = useState(null);
  const [dining, setDining] = useState(null);
  const [balcony, setbalcony] = useState(null);
  const [roof, setRoof] = useState(null);
  const [storage, setStorage] = useState(null);
  const [pet, setPet] = useState(null);

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
    } else if (area === "eleven") {
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
      areaVisible10)
  );

  const [modalVisible, setModalVisible] = useState(false);

  const { setReviewData } = useReviewSummaryContext();

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

  const multipliedValue =
    parseInt(input1Value) * living +
    parseInt(input2Value) * garage +
    parseInt(input3Value) * bath +
    parseInt(input4Value) * bed +
    parseInt(input5Value) * kitchen +
    parseInt(input6Value) * dining +
    parseInt(input7Value) * balcony +
    parseInt(input8Value) * roof +
    parseInt(input9Value) * storage +
    parseInt(input10Value) * pet +
    parseInt(materialFee);

  // Define an object to store service prices
  const servicePrices = {
    living: living,
    garage: garage,
    bath: bath,
    bed: bed,
    kitchen: kitchen,
    dining: dining,
    balcony: balcony,
    roof: roof,
    storage: storage,
    pet: pet,
  };

  const inputValues = [
    { name: "Living Room", value: input1Value, service: "living" },
    { name: "Garage and Porch", value: input2Value, service: "garage" },
    { name: "Bathroom", value: input3Value, service: "bath" },
    { name: "Bedroom", value: input4Value, service: "bed" },
    { name: "Kitchen", value: input5Value, service: "kitchen" },
    { name: "Dining Room", value: input6Value, service: "dining" },
    { name: "Balcony", value: input7Value, service: "balcony" },
    { name: "Roof and Gutter", value: input8Value, service: "roof" },
    { name: "Storage Room", value: input9Value, service: "storage" },
    { name: "Pet Area", value: input10Value, service: "pet" },
  ];

  const openModalWithData = () => {
    // setDataToPass(data);
    setModalVisible(true);

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
        category: "Standard Cleaning", // Add the string here
        logo: "mask-group14.png",
        title: "Cleaning",
      });
    } else {
      // Handle the case where there are no input values with totalPrice > 0 (optional)
      // You can display a message to the user or take other actions.
      // For now, let's log an error message.
      console.error("No input values with totalPrice greater than 0");
    }
  };

  useEffect(() => {
    // Reference to Firestore
    const db = getFirestore(); // Use getFirestore() to initialize Firestore

    // Reference to the "servicesPrices" collection and "Plumbing" document
    const collectionName = "servicesPrices";
    const documentName = "Cleaning";
    const subCollectionName = "SubCategories"; // Name of the subcollection

    // Fetch the "Installation" document under "SubCategories"
    const subCollectionRef = doc(
      db,
      collectionName,
      documentName,
      subCollectionName,
      "StandardCleaning"
    );

    getDoc(subCollectionRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const standardData = docSnapshot.data();

          setLiving(standardData.living);
          setGarage(standardData.garage);
          setBath(standardData.bathroom);
          setBed(standardData.bed);
          setKitchen(standardData.kitchen);
          setDining(standardData.dining);
          setbalcony(standardData.balcony);
          setRoof(standardData.roof);
          setStorage(standardData.storage);
          setPet(standardData.pet);
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

  return (
    <>
      <View style={styles.standardCleaningSubcategory}>
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
            style={[styles.standardCleaningWrapper, styles.btnWrapperFlexBox]}
          >
            <Text style={styles.standardCleaning}>Standard Cleaning</Text>
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
                    <View
                      style={[styles.homeWrapper, styles.btnWrapperFlexBox]}
                    >
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
                    <View
                      style={[styles.homeWrapper, styles.btnWrapperFlexBox]}
                    >
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
                      <View
                        style={[styles.condoBtn, styles.wrapperFrameFlexBox]}
                      >
                        <View
                          style={
                            property == "apartment"
                              ? styles.propertyClicked
                              : styles.apartment1
                          }
                        />
                        <View
                          style={[styles.iconOutline2, styles.iconPosition]}
                        >
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
                    <View
                      style={[styles.homeWrapper, styles.btnWrapperFlexBox]}
                    >
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
                  Cleaning Materials
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
                  Type of Area/Space
                </Text>
              </View>
              <View style={styles.frameContainer}>
                <View
                  style={[
                    styles.standardCleaningWrapper,
                    styles.btnWrapperFlexBox,
                  ]}
                >
                  <View style={styles.livingRoom350Wrapper}>
                    <Text style={styles.livingRoom350Container}>
                      <Text style={styles.livingRoom}>{`Living Room 
`}</Text>
                      <Text style={[styles.text, styles.textTypo]}>
                        {loading ? "Loading..." : `₱${living}`}
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
                          if (input1Value === 1)
                            setInput1Value(input1Value - 1);
                        }}
                        onRemove={() => [
                          setArea("eleven"),
                          setAreaVisible1(false),
                        ]}
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
                <View
                  style={[styles.frameChild, styles.frameParentSpaceBlock]}
                />
                <View
                  style={[styles.frameParent1, styles.frameParentSpaceBlock]}
                >
                  <View style={styles.livingRoom350Wrapper}>
                    <Text style={styles.livingRoom350Container}>
                      <Text style={styles.livingRoom}>{`Garage and Porch 
`}</Text>
                      <Text style={[styles.text, styles.textTypo]}>
                        {loading ? "Loading..." : `₱${garage}`}
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
                          if (input2Value === 1)
                            setInput2Value(input2Value - 1);
                        }}
                        onRemove={() => [
                          setArea("eleven"),
                          setAreaVisible2(false),
                        ]}
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
                <View
                  style={[styles.frameChild, styles.frameParentSpaceBlock]}
                />
                <View
                  style={[styles.frameParent1, styles.frameParentSpaceBlock]}
                >
                  <View style={styles.livingRoom350Wrapper}>
                    <Text style={styles.livingRoom350Container}>
                      <Text style={styles.livingRoom}>{`Bathroom 
`}</Text>
                      <Text style={[styles.text, styles.textTypo]}>
                        {loading ? "Loading..." : `₱${bath}`}
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
                          if (input3Value === 1)
                            setInput3Value(input3Value - 1);
                        }}
                        onRemove={() => [
                          setArea("eleven"),
                          setAreaVisible3(false),
                        ]}
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
                <View
                  style={[styles.frameChild, styles.frameParentSpaceBlock]}
                />
                <View
                  style={[styles.frameParent1, styles.frameParentSpaceBlock]}
                >
                  <View style={styles.livingRoom350Wrapper}>
                    <Text style={styles.livingRoom350Container}>
                      <Text style={styles.livingRoom}>{`Bedroom  
`}</Text>
                      <Text style={[styles.text, styles.textTypo]}>
                        {loading ? "Loading..." : `₱${bed}`}
                      </Text>{" "}
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
                          setArea("eleven"),
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
                  style={[styles.frameChild, styles.frameParentSpaceBlock]}
                />
                <View
                  style={[styles.frameParent1, styles.frameParentSpaceBlock]}
                >
                  <View style={styles.livingRoom350Wrapper}>
                    <Text style={styles.livingRoom350Container}>
                      <Text style={styles.livingRoom}>{`Kitchen 
`}</Text>
                      <Text style={[styles.text, styles.textTypo]}>
                        {loading ? "Loading..." : `₱${kitchen}`}
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
                          setArea("eleven"),
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
                  style={[styles.frameChild, styles.frameParentSpaceBlock]}
                />
                <View
                  style={[styles.frameParent1, styles.frameParentSpaceBlock]}
                >
                  <View style={styles.livingRoom350Wrapper}>
                    <Text style={styles.livingRoom350Container}>
                      <Text style={styles.livingRoom}>{`Dining Room 
`}</Text>
                      <Text style={[styles.text, styles.textTypo]}>
                        {loading ? "Loading..." : `₱${dining}`}
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
                          setArea("eleven"),
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
                <View
                  style={[styles.frameChild, styles.frameParentSpaceBlock]}
                />
                <View
                  style={[styles.frameParent1, styles.frameParentSpaceBlock]}
                >
                  <View style={styles.livingRoom350Wrapper}>
                    <Text style={styles.livingRoom350Container}>
                      <Text style={styles.livingRoom}>{`Balcony 
`}</Text>
                      <Text style={[styles.text, styles.textTypo]}>
                        {loading ? "Loading..." : `₱${balcony}`}
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
                          setArea("eleven"),
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
                  style={[styles.frameChild, styles.frameParentSpaceBlock]}
                />
                <View
                  style={[styles.frameParent1, styles.frameParentSpaceBlock]}
                >
                  <View style={styles.livingRoom350Wrapper}>
                    <Text style={styles.livingRoom350Container}>
                      <Text style={styles.livingRoom}>{`Roof and Gutter
`}</Text>
                      <Text style={[styles.text, styles.textTypo]}>
                        {loading ? "Loading..." : `₱${roof}`}
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
                          setArea("eleven"),
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
                  style={[styles.frameChild, styles.frameParentSpaceBlock]}
                />
                <View
                  style={[styles.frameParent1, styles.frameParentSpaceBlock]}
                >
                  <View style={styles.livingRoom350Wrapper}>
                    <Text style={styles.livingRoom350Container}>
                      <Text style={styles.livingRoom}>{`Storage Room 
`}</Text>
                      <Text style={[styles.text, styles.textTypo]}>
                        {loading ? "Loading..." : `₱${storage}`}
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
                          setArea("eleven"),
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
                  style={[styles.frameChild, styles.frameParentSpaceBlock]}
                />
                <View
                  style={[styles.frameParent1, styles.frameParentSpaceBlock]}
                >
                  <View style={styles.livingRoom350Wrapper}>
                    <Text style={styles.livingRoom350Container}>
                      <Text style={styles.livingRoom}>{`Pet Area
`}</Text>
                      <Text style={[styles.text, styles.textTypo]}>
                        {loading ? "Loading..." : `₱${pet}`}
                      </Text>{" "}
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
                          setArea("eleven"),
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
    </>
  );
};

const styles = StyleSheet.create({
  wrapperFrameFlexBox: {
    justifyContent: "center",
    flexDirection: "row",
  },
  propertyClicked: {
    zIndex: 0,
    height: 64,
    borderRadius: Border.br_lg,
    width: 64,
    backgroundColor: Color.colorSteelblue_100,
  },
  outer: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
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
  inner: {
    width: 17,
    height: 17,
    backgroundColor: Color.colorSteelblue_100,
    borderRadius: 10,
  },
  innerClicked: {
    width: 17,
    height: 17,
    backgroundColor: Color.colorSteelblue_100,
    borderRadius: 10,
  },
  header: {
    backgroundColor: "#1a244d",
  },
  radioButton2Text: {},
  radioButton2Radio: {
    padding: 10,
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
    backgroundColor: Color.colorSteelblue_100,
    borderRadius: Border.br_9xs,
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
  textTypo: {
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
  btnBorder: {
    padding: Padding.p_2xs,
    borderWidth: 1,
    borderColor: Color.colorDarkslategray_500,
    borderStyle: "solid",
    borderRadius: Border.br_xs,
    backgroundColor: Color.colorGainsboro_300,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  standardCleaning: {
    fontSize: FontSize.m3HeadlineLarge_size,
    textTransform: "capitalize",
    fontFamily: FontFamily.workSansBold,
    color: Color.colorDarkslateblue_100,
    display: "flex",
    width: 291,
    textAlign: "center",
    fontWeight: "700",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  standardCleaningWrapper: {
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
  componentscleaningMaterials: {
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
  livingRoom: {
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    fontWeight: "600",
    fontFamily: FontFamily.level2Semibold12,
  },
  text: {
    fontSize: FontSize.level2Medium12_size,
  },
  livingRoom350Container: {
    color: Color.colorTypographyContentIconsBlack,
    textAlign: "left",
    flex: 1,
  },
  livingRoom350Wrapper: {
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
  text1: {
    fontFamily: FontFamily.title4Regular18,
    color: Color.colorDarkslategray_600,
    marginLeft: 10,
    fontSize: FontSize.title4Regular18_size,
    textAlign: "center",
    letterSpacing: 0.5,
    flex: 1,
  },
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
  add2Icon: {
    height: 14,
    width: 14,
    overflow: "hidden",
  },
  plusBtn: {
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
  standardCleaningSubcategory: {
    backgroundColor: Color.colorWhitesmoke_200,
    height: 1001,
    width: "100%",
    flex: 1,
  },
  perSquareMeterTypo: {
    fontFamily: FontFamily.level2Medium12,
    fontWeight: "500",
  },
  // Continue Button
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

export default StandardCleaningSubcategory;
