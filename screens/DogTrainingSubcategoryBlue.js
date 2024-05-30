import React, { useState, useEffect, useRef } from "react";
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
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { FontFamily, Padding, Color, Border, FontSize } from "../GlobalStyles";
import { toggleAnimation } from "../animations/toggleAnimation";
import TimeDateModal from "../components/TimeDateModal";
import AddButton from "../components/AddButton";
import AddMinusStepper from "../components/AddMinusStepper";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore"; // Updated imports
import { useReviewSummaryContext } from "../ReviewSummaryContext";

const DogTrainingSubcategoryBlue = ({ route }) => {
  const bookDirect = route.params?.bookDirect || false;

  const [materials, setMaterials] = useState("");
  const [type, setType] = useState("");
  const [materialsVisible, setMaterialsVisible] = useState(false);
  const [propertyVisible, setPropertyVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
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

  const [materialFee, setMaterialFee] = useState(0);

  const animationController = useRef(new Animated.Value(0)).current;

  //database const
  const [obedience, setobedience] = useState(null);
  const [socialization, setsocialization] = useState(null);
  const [behavior, setbehavior] = useState(null);
  const [agility, setagility] = useState(null);
  const [goodciti, setgoodciti] = useState(null);
  const [scentdetect, setscentdetect] = useState(null);
  const [seachandres, setseachandres] = useState(null);
  const [servicetrain, setservicetrain] = useState(null);

  useEffect(() => {

    // Reference to Firestore
    const db = getFirestore(); // Use getFirestore() to initialize Firestore

    // Reference to the "servicesPrices" collection and "Plumbing" document
    const collectionName = "servicesPrices";
    const documentName = "PetCare";
    const subCollectionName = "SubCategories"; // Name of the subcollection

    // Fetch the "Installation" document under "SubCategories"
    const subCollectionRef = doc(
      db,
      collectionName,
      documentName,
      subCollectionName,
      "DogTraining"
    );

    getDoc(subCollectionRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const DogTrainingData = docSnapshot.data();

          setobedience(DogTrainingData.obedience);
          setsocialization(DogTrainingData.socialization);
          setbehavior(DogTrainingData.behavior);
          setagility(DogTrainingData.agility);
          setgoodciti(DogTrainingData.goodciti);
          setscentdetect(DogTrainingData.scentdetect);
          setseachandres(DogTrainingData.seachandres);
          setservicetrain(DogTrainingData.servicetrain);

        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });
  }, [])

  const handleCategoryButtonPress = (category, value) => {
    if (category === "Type") {
      setType(value);
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
    }else if (value === "eight") {
      setAreaVisible8(true);
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
      areaVisible8)
  );

  const [input1Value, setInput1Value] = useState(0);
  const [input2Value, setInput2Value] = useState(0);
  const [input3Value, setInput3Value] = useState(0);
  const [input4Value, setInput4Value] = useState(0);
  const [input5Value, setInput5Value] = useState(0);
  const [input6Value, setInput6Value] = useState(0);
  const [input7Value, setInput7Value] = useState(0);
  const [input8Value, setInput8Value] = useState(0);

  const multipliedValue =
    parseInt(input1Value) * obedience +
    parseInt(input2Value) * socialization +
    parseInt(input3Value) * behavior +
    parseInt(input4Value) * goodciti +
    parseInt(input5Value) * servicetrain +
    parseInt(input6Value) * agility +
    parseInt(input7Value) * seachandres +
    parseInt(input8Value) * scentdetect +
    parseInt(materialFee);

  // Define an object to store service prices
  const servicePrices = {
    obs: obedience,
    social: socialization,
    behave: behavior,
    goodc: goodciti,
    servet: servicetrain,
    agile: agility,
    sandr: seachandres,
    scenty: scentdetect,
  };
  
  const inputValues = [
    { name: "Obedience Training", value: input1Value, service: "obs" },
    { name: "Socialization Training", value: input2Value, service: "social" },
    { name: "Behavior Training", value: input3Value, service: "behave" },
    { name: "Good Citizen Training", value: input4Value, service: "goodc" },
    { name: "Service Training", value: input5Value, service: "servet" },
    { name: "Agility Training", value: input6Value, service: "agile" },
    { name: "Search & Rescue Training", value: input7Value, service: "sandr" },
    { name: "Scent Detection Training", value: input8Value, service: "scenty" },
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
        property: type,
        materials: materials,
        inputValues: filteredInputsWithTotalPrice,
        multipliedValue, // Pass the multipliedValue
        category: "Dog Training", // Add the string here
        logo: "mask-group.png",
        title: "Pet Care"
      });
    } else {
      // Handle the case where there are no input values with totalPrice > 0 (optional)
      // You can display a message to the user or take other actions.
      // For now, let's log an error message.
      console.error("No input values with totalPrice greater than 0");
    }
  };  

  return (
    <View style={styles.dogTrainingSubcategoryBlue}>
      <StatusBar barStyle="default" />
      <ScrollView
        style={styles.frameParent}
        indicatorStyle="default"
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={false}
        contentContainerStyle={styles.frameScrollViewContent}
      >
        <View style={[styles.dogTrainingWrapper, styles.btnFrameFlexBox]}>
          <Text style={styles.dogTraining}>Dog Training</Text>
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
              <Text style={[styles.typeOfDog, styles.typeOfDogFlexBox]}>
                Type of Dog
              </Text>
            </View>
            <View style={styles.newCustomers}>
              <View style={styles.customer}>
                <View style={styles.small}>
                  <View style={[styles.home, styles.homeFlexBox]}>
                    <Pressable style={[styles.smallBtn, styles.homeFlexBox]} 
                    onPress={() =>
                        handleCategoryButtonPress("Type", "small")
                      }>
                    <View
                        style={
                          type == "small"
                            ? styles.typeClicked
                            : styles.smallBtnChild
                        }
                      />
                      <View style={styles.iconOutline}>
                      {type == "small" ? (
                          <Image
                            style={[
                            styles.whiteBeagleIcon,
                            styles.whiteIconPosition,
                            ]}
                            contentFit="cover"
                            source={require("../assets/white-beagle.png")}
                          />
                        ) : (
                          <Image
                            style={[
                              styles.blueBeagleIcon,
                              styles.whiteIconPosition,
                            ]}
                            contentFit="cover"
                            source={require("../assets/blue-beagle.png")}
                          />
                        )}
                      </View>
                    </Pressable>
                  </View>
                  <View
                    style={[styles.small9kgWrapper, styles.btnFrameFlexBox]}
                  >
                    <Text
                      style={[styles.small9kg, styles.small9kgTypo]}
                    >{`Small (<9kg)`}</Text>
                  </View>
                </View>
                <View style={styles.small}>
                  <Pressable style={[styles.mediumBtn, styles.btnFrameFlexBox]}
                  onPress={() =>
                      handleCategoryButtonPress("Type", "medium")
                    }>
                    <View
                        style={
                          type == "medium"
                            ? styles.typeClicked
                            : styles.smallBtnChild
                        }
                      />
                    <View style={[styles.iconOutline1, styles.iconFlexBox]}>
                      {type == "medium" ? (
                          <Image
                            style={[
                              styles.whiteBoxerIcon,
                              styles.boxerIconPosition,
                            ]}
                            contentFit="cover"
                            source={require("../assets/white-boxer.png")}
                          />
                        ) : (
                          <Image
                            style={[
                              styles.blueBoxerIcon,
                              styles.boxerIconPosition,
                            ]}
                            contentFit="cover"
                            source={require("../assets/blue-boxer.png")}
                          />
                        )}
                    </View> 
                  </Pressable>
                  <View
                    style={[styles.mediumWrapper, styles.btnFrameFlexBox]}
                  >
                    <Text style={[styles.small9kg, styles.small9kgTypo]}>
                      Medium (10-19 kg)
                    </Text>
                  </View>
                </View>
                <View style={styles.small}>
                  <View
                    style={[styles.dogTrainingWrapper, styles.btnFrameFlexBox]}
                  >
                    <Pressable
                      style={[styles.mediumBtn, styles.btnFrameFlexBox]}
                      onPress={() =>
                      handleCategoryButtonPress("Type", "large")
                    }>
                     <View
                        style={
                          type == "large"
                            ? styles.typeClicked
                            : styles.smallBtnChild
                        }
                      />
                      <View style={[styles.iconOutline2, styles.iconFlexBox]}>
                        {type == "large" ? (
                          <Image
                            style={[
                              styles.whiteMalamuteIcon,
                              styles.malamuteIconLayout,
                            ]}
                            contentFit="cover"
                            source={require("../assets/white-malamute.png")}
                          />
                        ) : (
                          <Image
                            style={[
                              styles.blueMalamuteIcon,
                              styles.malamuteIconLayout,
                            ]}
                            contentFit="cover"
                            source={require("../assets/blue-malamute.png")}
                          />
                        )}
                      </View>
                    </Pressable>
                  </View>
                  <View
                    style={[styles.small9kgWrapper, styles.btnFrameFlexBox]}
                  >
                    <Text
                      style={[styles.small9kg, styles.small9kgTypo]}
                    >{`Large (>20 kg)`}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View
            style={[
              styles.componentstrainingMaterials,
              styles.frameParentSpaceBlock,
            ]}
          >
            <View style={styles.titleFlexBox}>
              <View style={[styles.tag, styles.tagLayout]} />
              <Text style={[styles.typeOfDog, styles.typeOfDogFlexBox]}>
                Training Materials
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
                    style={[styles.selfProvidedMaterials, styles.small9kgTypo]}
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
              <View
                style={[styles.useProviderMaterialsFrame, styles.titleFlexBox]}
              >
                <View style={styles.selfProvidedMaterialsWrapper}>
                  <Text
                    style={[styles.selfProvidedMaterials, styles.small9kgTypo]}
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
              <Text style={[styles.typeOfDog, styles.typeOfDogFlexBox]}>
                Type of Training
              </Text>
            </View>
            <View style={styles.frameContainer}>
              <View style={[styles.dogTrainingWrapper, styles.btnFrameFlexBox]}>
                <View style={styles.obedienceTraining750PerSeWrapper}>
                  <Text
                    style={[
                      styles.obedienceTraining750Container,
                      styles.typeOfDogFlexBox,
                    ]}
                  >
                    <Text style={styles.obedienceTraining}>{`Obedience Training
`}</Text>
                    <Text style={[styles.perSession, styles.small9kgTypo]}>
                      ₱{obedience} per session
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
                            setArea("ten"),
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
              <View style={[styles.frameChild, styles.frameParentSpaceBlock]} />
              <View style={[styles.frameParent1, styles.frameParentSpaceBlock]}>
                <View style={styles.obedienceTraining750PerSeWrapper}>
                  <Text
                    style={[
                      styles.obedienceTraining750Container,
                      styles.typeOfDogFlexBox,
                    ]}
                  >
                    <Text
                      style={styles.obedienceTraining}
                    >{`Socialization Training
`}</Text>
                    <Text style={[styles.perSession, styles.small9kgTypo]}>
                      ₱{socialization} per session
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
                            setArea("ten"),
                            setAreaVisible2(false),
                          ]}
                        />
                      </View>
                    ) : (
                      <View>
                        <AddButton
                          title="Add"
                          onPress={() =>{
                            handleCategoryButtonPress("Area", "two");
                            setInput2Value(1);
                          }}
                        />
                      </View>
                    )}
              </View>
              <View style={[styles.frameChild, styles.frameParentSpaceBlock]} />
              <View style={[styles.frameParent1, styles.frameParentSpaceBlock]}>
                <View style={styles.obedienceTraining750PerSeWrapper}>
                  <Text
                    style={[
                      styles.obedienceTraining750Container,
                      styles.typeOfDogFlexBox,
                    ]}
                  >
                    <Text style={styles.obedienceTraining}>{`Behavior Training
`}</Text>
                    <Text style={[styles.perSession, styles.small9kgTypo]}>
                      ₱{behavior} per session
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
                            setArea("ten"),
                            setAreaVisible3(false),
                          ]}
                        />
                      </View>
                    ) : (
                      <View>
                        <AddButton
                          title="Add"
                          onPress={() =>{
                            handleCategoryButtonPress("Area", "three");
                            setInput3Value(1);
                          }}
                        />
                      </View>
                    )}
              </View>
              <View style={[styles.frameChild, styles.frameParentSpaceBlock]} />
              <View style={[styles.frameParent1, styles.frameParentSpaceBlock]}>
                <View style={styles.obedienceTraining750PerSeWrapper}>
                  <Text
                    style={[
                      styles.obedienceTraining750Container,
                      styles.typeOfDogFlexBox,
                    ]}
                  >
                    <Text
                      style={styles.obedienceTraining}
                    >{`Good Citizen Training
`}</Text>
                    <Text style={[styles.perSession, styles.small9kgTypo]}>
                      ₱{goodciti} per session
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
                      onRemove={() => [setArea("ten"), setAreaVisible4(false)]}
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
              <View style={[styles.frameChild, styles.frameParentSpaceBlock]} />
              <View style={[styles.frameParent1, styles.frameParentSpaceBlock]}>
                <View style={styles.obedienceTraining750PerSeWrapper}>
                  <Text
                    style={[
                      styles.obedienceTraining750Container,
                      styles.typeOfDogFlexBox,
                    ]}
                  >
                    <Text style={styles.obedienceTraining}>{`Service Training
`}</Text>
                    <Text style={[styles.perSession, styles.small9kgTypo]}>
                      ₱{servicetrain} per session
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
                      onRemove={() => [setArea("ten"), setAreaVisible5(false)]}
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
              <View style={[styles.frameChild, styles.frameParentSpaceBlock]} />
              <View style={[styles.frameParent1, styles.frameParentSpaceBlock]}>
                <View style={styles.obedienceTraining750PerSeWrapper}>
                  <Text
                    style={[
                      styles.obedienceTraining750Container,
                      styles.typeOfDogFlexBox,
                    ]}
                  >
                    <Text style={styles.obedienceTraining}>{`Agility Training
`}</Text>
                    <Text style={[styles.perSession, styles.small9kgTypo]}>
                      ₱{agility} per session
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
                      onRemove={() => [setArea("ten"), setAreaVisible6(false)]}
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
              <View style={[styles.frameChild, styles.frameParentSpaceBlock]} />
              <View style={[styles.frameParent1, styles.frameParentSpaceBlock]}>
                <View style={styles.obedienceTraining750PerSeWrapper}>
                  <Text
                    style={[
                      styles.obedienceTraining750Container,
                      styles.typeOfDogFlexBox,
                    ]}
                  >
                    <Text
                      style={styles.obedienceTraining}
                    >{`Search & Rescue Training
`}</Text>
                    <Text style={[styles.perSession, styles.small9kgTypo]}>
                      ₱{seachandres} per session
                    </Text>
                  </Text>
                </View>
                {areaVisible7 ? (
                  <View>
                    <AddMinusStepper
                      initialValue={input7Value}
                      onIncrement={() => setInput7Value(input6Value + 1)}
                      onDecrement={() => {
                        setInput7Value(input7Value - 1);
                        if (input7Value === 1)
                          setInput7Value(input7Value - 1);
                      }}
                      onRemove={() => [setArea("ten"), setAreaVisible7(false)]}
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
              <View style={[styles.frameChild, styles.frameParentSpaceBlock]} />
              <View style={[styles.frameParent1, styles.frameParentSpaceBlock]}>
                <View style={styles.obedienceTraining750PerSeWrapper}>
                  <Text
                    style={[
                      styles.obedienceTraining750Container,
                      styles.typeOfDogFlexBox,
                    ]}
                  >
                    <Text
                      style={styles.obedienceTraining}
                    >{`Scent Detection Training
`}</Text>
                    <Text style={[styles.perSession, styles.small9kgTypo]}>
                      ₱{scentdetect} per session
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
                      onRemove={() => [setArea("ten"), setAreaVisible8(false)]}
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
  frameScrollViewContent: {
    flexDirection: "column",
    paddingTop: 15,
    paddingBottom: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  btnFrameFlexBox: {
    justifyContent: "center",
    flexDirection: "row",
  },
  typeOfDogTypo1: {
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
  typeOfDogFlexBox: {
    textAlign: "left",
    flex: 1,
  },
  homeFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  whiteIconPosition: {
    left: 0,
    top: 0,
    position: "absolute",
    height: 45,
    width: 45,
  },
  small9kgTypo: {
    fontFamily: FontFamily.level2Medium12,
    fontWeight: "500",
  },
  iconFlexBox: {
    padding: Padding.p_12xs,
    zIndex: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  boxerIconPosition: {
    top: 1,
    height: 45,
    width: 45,
    position: "absolute",
  },
  malamuteIconLayout: {
    height: 47,
    width: 47,
    top: 2,
    position: "absolute",
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
  dogTraining: {
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
  dogTrainingWrapper: {
    alignItems: "center",
    alignSelf: "stretch",
  },
  tag: {
    overflow: "hidden",
  },
  typeOfDog: {
    marginLeft: 10,
    color: Color.neutral07,
    letterSpacing: -0.4,
    textAlign: "left",
    fontSize: FontSize.title4Regular18_size,
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
  },
  smallBtnChild: {
    zIndex: 0,
    borderWidth: 2,
    backgroundColor: Color.colorGainsboro_400,
    height: 64,
    borderColor: Color.colorDarkslategray_500,
    borderStyle: "solid",
    borderRadius: Border.br_lg,
    width: 64,
  },
  whiteBeagleIcon: {
    zIndex: 0,
  },
  blueBeagleIcon: {
    zIndex: 1,
  },
  iconOutline: {
    top: 10,
    zIndex: 1,
    left: 10,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  smallBtn: {
    flex: 1,
  },
  home: {
    width: 64,
  },
  small9kg: {
    letterSpacing: -0.1,
    lineHeight: 17,
    color: Color.neutral06,
    fontSize: FontSize.level2Medium12_size,
    fontWeight: "500",
    textAlign: "center",
    flex: 1,
  },
  small9kgWrapper: {
    marginTop: 12,
    alignItems: "center",
    alignSelf: "stretch",
  }, mediumWrapper: {
    paddingRight:10,
    marginTop: 12,
    alignItems: "center",
    alignSelf: "stretch",
  },
  small: {
    borderRadius: Border.br_xs,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  whiteBoxerIcon: {
    zIndex: 0,
  },
  blueBoxerIcon: {
    zIndex: 1,
  },
  iconOutline1: {
    top: 8,
    left: 30.7,
  },
  mediumBtn: {
    width: 64,
    alignItems: "center",
  },
  whiteMalamuteIcon: {
    zIndex: 0,
  },
  blueMalamuteIcon: {
    zIndex: 1,
  },
  iconOutline2: {
    top: 6,
    left: 32.4,
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
  componentstrainingMaterials: {
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
  obedienceTraining: {
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    fontWeight: "600",
    fontFamily: FontFamily.level2Semibold12,
  },
  perSession: {
    fontSize: FontSize.level2Medium12_size,
    fontWeight: "500",
  },
  obedienceTraining750Container: {
    color: Color.colorTypographyContentIconsBlack,
  },
  obedienceTraining750PerSeWrapper: {
    paddingRight:25,
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
  dogTrainingSubcategoryBlue: {
    backgroundColor: Color.colorWhitesmoke_200,
    height: 812,
    width: "100%",
    flex: 1,
  },typeClicked: {
    zIndex: 0,
    height: 64,
    borderRadius: Border.br_lg,
    width: 64,
    backgroundColor: Color.colorSteelblue_100,
  },
  
  // Add Minus Stepper Input Component
  add2FlexBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  btnBorder: {
    padding: Padding.p_2xs,
    borderRadius: Border.br_xs,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  add2Child: {
    borderTopWidth: 2.5,
    height: 3,
    width: 13,
    borderColor: Color.colorDarkslategray_500,
    borderStyle: "solid",
  },
  add2: {
    paddingHorizontal: 0,
    paddingVertical: 5,
  },
  text: {
    fontSize: FontSize.title4Regular18_size,
    letterSpacing: 0.5,
    fontFamily: FontFamily.title4Regular18,
    color: Color.colorDarkslategray_600,
    textAlign: "center",
    marginLeft: 2,
    flex: 1,
  },
  add2Icon: {
    height: 14,
    overflow: "hidden",
    width: 14,
  },
  plusBtn: {
    borderWidth: 1,
    backgroundColor: Color.colorSteelblue_100,
    // backgroundColor: Color.colorGainsboro_300,
    borderColor: Color.colorSteelblue_100,
    // borderStyle: "solid",
    marginLeft: 2,
  },
  minusBtn: {
    borderWidth: 1,
    // backgroundColor: Color.colorSteelblue_100,
    backgroundColor: Color.colorGainsboro_300,
    borderColor: Color.colorDarkslategray_500,
    borderStyle: "solid",
  },
  minusBtnParent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  frameWrapper: {
    width: 105,
    marginLeft: 13,
    justifyContent: "center",
    flexDirection: "row",
  },
  //Continue Button
  timeDateModalFlexBox: {
    paddingHorizontal: Padding.p_smi,
    alignItems: "center",
    alignSelf: "stretch",
  },timeDateModal: {
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

export default DogTrainingSubcategoryBlue;