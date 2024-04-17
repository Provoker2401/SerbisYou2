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
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Padding, Color, Border, FontFamily, FontSize } from "../GlobalStyles";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { toggleAnimation } from "../animations/toggleAnimation";
import TimeDateModal from "../components/TimeDateModal";
import AddButton from "../components/AddButton";
import AddMinusStepper from "../components/AddMinusStepper";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore"; // Updated imports
import { useReviewSummaryContext } from "../ReviewSummaryContext";

const PetGroomingSubcategoryDog = () => {
  const [materials, setMaterials] = useState("");
  // const [pet, setPet] = useState("");
  const [materialsVisible, setMaterialsVisible] = useState(false);
  const [petVisible, setPetVisible] = useState(false);
  const [materialFee, setMaterialFee] = useState(0);

  const [showContent1, setShowContent1] = useState(false);
  const [showContent2, setShowContent2] = useState(false);
  const [showContent3, setShowContent3] = useState(false);
  const [showContent4, setShowContent4] = useState(false);

  const [pet, setPet] = useState("");
  const [dog, setDog] = useState("");
  const [cat, setCat] = useState("");
  const [bird, setBird] = useState("");
  const [rabbit, setRabbit] = useState("");

  const buttonBackgroundColor = "#007EA7";
  const buttonBorderColor1 = "#2E4460";
  const buttonBorderColor2 = "#D9D9D9";
  const buttonTextColor = "#fff";

  const dogData = [
    { name: "Bathing and Shampooing", value: "one", key: "1" },
    { name: "Brushing and Combing", value: "two", key: "2" },
    { name: "Haircuts and Trims", value: "three", key: "3" },
    { name: "Ear and Teeth Cleaning", value: "four", key: "4" },
    { name: "Nail Trimming", value: "five", key: "5" },
    { name: "Anal Gland Expression", value: "six", key: "6" },
    { name: "Flea and Tick Treatments", value: "seven", key: "7" },
    { name: "Skin and Coat Treatments", value: "eight", key: "8" },
  ];
  const catData = [
    { name: "Bathing and Shampooing", value: "one", key: "1" },
    { name: "Brushing and Combing", value: "two", key: "2" },
    { name: "Haircuts and Trims", value: "three", key: "3" },
    { name: "Ear and Teeth Cleaning", value: "four", key: "4" },
    { name: "Nail Trimming", value: "five", key: "5" },
    { name: "Anal Gland Expression", value: "six", key: "6" },
    { name: "Flea and Tick Treatments", value: "seven", key: "7" },
    { name: "Skin and Coat Treatments", value: "eight", key: "8" },
  ];
  const birdData = [
    { name: "Bathing", value: "one", key: "1" },
    { name: "Beak Trimming", value: "two", key: "2" },
    { name: "Beak Conditioning", value: "three", key: "3" },
    { name: "Nail Trimming", value: "four", key: "4" },
    { name: "Feather Trimming", value: "five", key: "5" },
    { name: "Wing Clipping", value: "six", key: "6" },
    { name: "Feather Conditioning", value: "seven", key: "7" },
  ];
  const rabbitData = [
    { name: "Bathing", value: "one", key: "1" },
    { name: "Brushing and Combing", value: "two", key: "2" },
    { name: "Fur Removal", value: "three", key: "3" },
    { name: "Ear and Teeth Cleaning", value: "four", key: "4" },
    { name: "Nail Trimming", value: "five", key: "5" },
    { name: "Scent Gland Cleaning", value: "six", key: "6" },
    { name: "Eye Cleaning", value: "seven", key: "7" },
  ];

  // const [dogGroomingVisible, setDogGroomingVisible] = useState([false]);
  const [dogGroomingVisible, setDogGroomingVisible] = useState(
    new Array(dogData.length).fill(false)
  );
  const [catGroomingVisible, setCatGroomingVisible] = useState(
    new Array(catData.length).fill(false)
  );
  const [birdGroomingVisible, setBirdGroomingVisible] = useState(
    new Array(birdData.length).fill(false)
  );
  const [rabbitGroomingVisible, setRabbitGroomingVisible] = useState(
    new Array(rabbitData.length).fill(false)
  );

  // const [dogGroomingValue, setDogGroomingValue] = useState([]);
  const [dogGroomingValue, setDogGroomingValue] = useState(
    new Array(dogData.length).fill(0)
  );
  const [catGroomingValue, setCatGroomingValue] = useState(
    new Array(catData.length).fill(0)
  );
  const [birdGroomingValue, setBirdGroomingValue] = useState(
    new Array(birdData.length).fill(0)
  );
  const [rabbitGroomingValue, setRabbitGroomingValue] = useState(
    new Array(rabbitData.length).fill(0)
  );

  const [petVisible1, setPetVisible1] = useState(false);
  const [petVisible2, setPetVisible2] = useState(false);
  const [petVisible3, setPetVisible3] = useState(false);
  const [petVisible4, setPetVisible4] = useState(false);

  const animationController1 = useRef(new Animated.Value(0)).current;
  const animationController2 = useRef(new Animated.Value(0)).current;
  const animationController3 = useRef(new Animated.Value(0)).current;
  const animationController4 = useRef(new Animated.Value(0)).current;

  const [dogGroomingPrice, setDogGroomingPrice] = useState([null]);
  const [catGroomingPrice, setCatGroomingPrice] = useState([null]);
  const [birdGroomingPrice, setBirdGroomingPrice] = useState([null]);
  const [rabbitGroomingPrice, setRabbitGroomingPrice] = useState([null]);

  useEffect(() => {
    // Reference to Firestore
    const db = getFirestore(); // Use getFirestore() to initialize Firestore

    // Reference to the "servicesPrices" collection and "Plumbing" document
    const collectionName = "servicesPrices";
    const documentName = "PetCare";
    const subCollectionName = "SubCategories"; // Name of the subcollection

    // Fetch the "Installation" document under "SubCategories"
    const subCollectionRef1 = doc(
      db,
      collectionName,
      documentName,
      subCollectionName,
      "PetGrooming_d"
    );
    const subCollectionRef2 = doc(
      db,
      collectionName,
      documentName,
      subCollectionName,
      "PetGrooming_c"
    );
    const subCollectionRef3 = doc(
      db,
      collectionName,
      documentName,
      subCollectionName,
      "PetGrooming_b"
    );
    const subCollectionRef4 = doc(
      db,
      collectionName,
      documentName,
      subCollectionName,
      "PetGrooming_r"
    );

    getDoc(subCollectionRef1)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const DeepData = docSnapshot.data();

          setPriceForDogGrooming(0, DeepData.bathing_d);
          setPriceForDogGrooming(1, DeepData.brushing_d);
          setPriceForDogGrooming(2, DeepData.haircut_d);
          setPriceForDogGrooming(3, DeepData.earandteeth_d);
          setPriceForDogGrooming(4, DeepData.nail_d);
          setPriceForDogGrooming(5, DeepData.anal_d);
          setPriceForDogGrooming(6, DeepData.flea_d);
          setPriceForDogGrooming(7, DeepData.skin_d);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });

    getDoc(subCollectionRef2)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const DeepData = docSnapshot.data();

          setPriceForCatGrooming(0, DeepData.bathing_c);
          setPriceForCatGrooming(1, DeepData.brushing_c);
          setPriceForCatGrooming(2, DeepData.haircut_c);
          setPriceForCatGrooming(3, DeepData.earandteeth_c);
          setPriceForCatGrooming(4, DeepData.nail_c);
          setPriceForCatGrooming(5, DeepData.anal_c);
          setPriceForCatGrooming(6, DeepData.flea_c);
          setPriceForCatGrooming(7, DeepData.skin_c);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });

    getDoc(subCollectionRef3)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const DeepData = docSnapshot.data();

          setPriceForBirdGrooming(0, DeepData.bathing_b);
          setPriceForBirdGrooming(1, DeepData.beaktrim_b);
          setPriceForBirdGrooming(2, DeepData.beakcon_b);
          setPriceForBirdGrooming(3, DeepData.nail_b);
          setPriceForBirdGrooming(4, DeepData.feathertrim_b);
          setPriceForBirdGrooming(5, DeepData.wingclip_b);
          setPriceForBirdGrooming(6, DeepData.feathercon_b);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });

    getDoc(subCollectionRef4)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const DeepData = docSnapshot.data();

          setPriceForRabbitGrooming(0, DeepData.bathing_r);
          setPriceForRabbitGrooming(1, DeepData.brushandcomb_r);
          setPriceForRabbitGrooming(2, DeepData.fur_r);
          setPriceForRabbitGrooming(3, DeepData.earandteeth_r);
          setPriceForRabbitGrooming(4, DeepData.nailtrim_r);
          setPriceForRabbitGrooming(5, DeepData.scentgland_r);
          setPriceForRabbitGrooming(6, DeepData.eyecleaning_r);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });
  }, []);

  const setPriceForDogGrooming = (index, price) => {
    setDogGroomingPrice((prevPrices) => {
      const newPrices = [...prevPrices]; // Create a copy of the previous state array
      newPrices[index] = price; // Set the price for the specific element
      return newPrices; // Return the updated array as the new state
    });
  };
  const setPriceForCatGrooming = (index, price) => {
    setCatGroomingPrice((prevPrices) => {
      const newPrices = [...prevPrices]; // Create a copy of the previous state array
      newPrices[index] = price; // Set the price for the specific element
      return newPrices; // Return the updated array as the new state
    });
  };
  const setPriceForBirdGrooming = (index, price) => {
    setBirdGroomingPrice((prevPrices) => {
      const newPrices = [...prevPrices]; // Create a copy of the previous state array
      newPrices[index] = price; // Set the price for the specific element
      return newPrices; // Return the updated array as the new state
    });
  };
  const setPriceForRabbitGrooming = (index, price) => {
    setRabbitGroomingPrice((prevPrices) => {
      const newPrices = [...prevPrices]; // Create a copy of the previous state array
      newPrices[index] = price; // Set the price for the specific element
      return newPrices; // Return the updated array as the new state
    });
  };

  const handleCategoryButtonPress = (category, value) => {
    // if (category === "Pet") {
    //   setPet(value);
    //   setPetVisible(true);
    // }
    if (category === "Materials") {
      if(value == "selfProvidedMaterials"){
        setMaterialFee(0);
      }else{
        setMaterialFee(50);
      }
      setMaterials(value);
      setMaterialsVisible(true);
    } else if (category === "Pet") {
      setPet(value);
      handleAddButtonVisibility(value);
    } else if (category === "DogGrooming") {
      setDog(value);
      handleDogButtonVisibility(value);
    } else if (category === "CatGrooming") {
      setCat(value);
      handleCatButtonVisibility(value);
    } else if (category === "BirdGrooming") {
      setBird(value);
      handleBirdButtonVisibility(value);
    } else if (category === "RabbitGrooming") {
      setRabbit(value);
      handleRabbitButtonVisibility(value);
    } else if (pet === "ten") {
      setPet(value);
      setPetVisible1(true);
      setPetVisible2(true);
      setPetVisible3(true);
      setPetVisible4(true);
    } else if (dog === "ten") {
      setDog(value);
      setDogGroomingVisible(Array(dogGroomingVisible.length).fill(true));
    } else if (cat === "ten") {
      setCat(value);
      setCatGroomingVisible(Array(catGroomingVisible.length).fill(true));
    } else if (bird === "ten") {
      setBird(value);
      setBirdGroomingVisible(Array(birdGroomingVisible.length).fill(true));
    } else if (rabbit === "ten") {
      setRabbit(value);
      setRabbitGroomingVisible(Array(rabbitGroomingVisible.length).fill(true));
    }
  };

  const handleAddButtonVisibility = (value) => {
    if (value === "one") {
      setPetVisible1(true);
    } else if (value === "two") {
      setPetVisible2(true);
    } else if (value === "three") {
      setPetVisible3(true);
    } else if (value === "four") {
      setPetVisible4(true);
    }
  };
  const handleDogButtonVisibility = (value) => {
    const valueToIndex = {
      one: 0,
      two: 1,
      three: 2,
      four: 3,
      five: 4,
      six: 5,
      seven: 6,
      eight: 7,
    };

    const index = valueToIndex[value];

    if (index !== undefined) {
      setDogElementToTrue(index);
    }
  };
  const handleCatButtonVisibility = (value) => {
    const valueToIndex = {
      one: 0,
      two: 1,
      three: 2,
      four: 3,
      five: 4,
      six: 5,
      seven: 6,
      eight: 7,
    };

    const index = valueToIndex[value];

    if (index !== undefined) {
      setCatElementToTrue(index);
    }
  };
  const handleBirdButtonVisibility = (value) => {
    const valueToIndex = {
      one: 0,
      two: 1,
      three: 2,
      four: 3,
      five: 4,
      six: 5,
      seven: 6,
      eight: 7,
    };

    const index = valueToIndex[value];

    if (index !== undefined) {
      setBirdElementToTrue(index);
    }
  };
  const handleRabbitButtonVisibility = (value) => {
    const valueToIndex = {
      one: 0,
      two: 1,
      three: 2,
      four: 3,
      five: 4,
      six: 5,
      seven: 6,
      eight: 7,
    };

    const index = valueToIndex[value];

    if (index !== undefined) {
      setRabbitElementToTrue(index);
    }
  };
  // Function to set a specific element (by index) to true
  const setDogElementToTrue = (index) => {
    setDogGroomingVisible((prevArray) => {
      const newArray = [...prevArray]; // Create a copy of the previous state array
      newArray[index] = true; // Set the specific element to true
      return newArray; // Return the updated array as the new state
    });
  };
  const setCatElementToTrue = (index) => {
    setCatGroomingVisible((prevArray) => {
      const newArray = [...prevArray]; // Create a copy of the previous state array
      newArray[index] = true; // Set the specific element to true
      return newArray; // Return the updated array as the new state
    });
  };
  const setBirdElementToTrue = (index) => {
    setBirdGroomingVisible((prevArray) => {
      const newArray = [...prevArray]; // Create a copy of the previous state array
      newArray[index] = true; // Set the specific element to true
      return newArray; // Return the updated array as the new state
    });
  };
  const setRabbitElementToTrue = (index) => {
    setRabbitGroomingVisible((prevArray) => {
      const newArray = [...prevArray]; // Create a copy of the previous state array
      newArray[index] = true; // Set the specific element to true
      return newArray; // Return the updated array as the new state
    });
  };

  const isContinueButtonDisabled = !(
    (petVisible1 || petVisible2 || petVisible3 || petVisible4) &&
    materialsVisible &&
    [
      dogGroomingVisible,
      catGroomingVisible,
      birdGroomingVisible,
      rabbitGroomingVisible,
    ].some((visibleArray) => {
      return visibleArray.some((isVisible) => isVisible);
    })
  );
  const isRabbitButtonDisabled = {
    petVisible4,
  };


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

  const arrowTransform1 = animationController1.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

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

  const arrowTransform2 = animationController2.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const toggleListItem3 = () => {
    const config = {
      duration: 300,
      toValue: showContent3 ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController3, config).start();
    LayoutAnimation.configureNext(toggleAnimation);
    setShowContent3(!showContent3);
  };

  const arrowTransform3 = animationController3.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const toggleListItem4 = () => {
    const config = {
      duration: 300,
      toValue: showContent4 ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController4, config).start();
    LayoutAnimation.configureNext(toggleAnimation);
    setShowContent4(!showContent4);
  };

  const arrowTransform4 = animationController4.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const [input1Value, setInput1Value] = useState(0);
  const [input2Value, setInput2Value] = useState(0);
  const [input3Value, setInput3Value] = useState(0);
  const [input4Value, setInput4Value] = useState(0);

  const pets = [  
  { dogs: input1Value},
  { cats: input2Value},
  { birds: input3Value},
  { rabbits: input4Value},
  ];  
  
  const calculateTotal = (values, prices) => {
    let total = 0;
    for (let i = 0; i < values.length; i++) {
      total += parseInt(values[i]) * prices[i];
    }
    return total;
  };

  const multipliedValue =
    calculateTotal(dogGroomingValue, dogGroomingPrice) * input1Value +
    calculateTotal(catGroomingValue, catGroomingPrice) * input2Value +
    calculateTotal(birdGroomingValue, birdGroomingPrice) * input3Value +
    calculateTotal(rabbitGroomingValue, rabbitGroomingPrice) * input4Value +
    parseInt(materialFee);

      // Define an object to store service prices
  const servicePrices = {

      //Dog price values
      dogGroomingPrice1: dogGroomingPrice[0],
      dogGroomingPrice2: dogGroomingPrice[1],
      dogGroomingPrice3: dogGroomingPrice[2],
      dogGroomingPrice4: dogGroomingPrice[3],
      dogGroomingPrice5: dogGroomingPrice[4],
      dogGroomingPrice6: dogGroomingPrice[5],
      dogGroomingPrice7: dogGroomingPrice[6],
      dogGroomingPrice8: dogGroomingPrice[7],
      
      //Cat price values
      catGroomingPrice1: catGroomingPrice[0],
      catGroomingPrice2: catGroomingPrice[1],
      catGroomingPrice3: catGroomingPrice[2],
      catGroomingPrice4: catGroomingPrice[3],
      catGroomingPrice5: catGroomingPrice[4],
      catGroomingPrice6: catGroomingPrice[5],
      catGroomingPrice7: catGroomingPrice[6],
      catGroomingPrice8: catGroomingPrice[7],

      //Bird price value
      birdGroomingPrice1: birdGroomingPrice[0],
      birdGroomingPrice2: birdGroomingPrice[1],
      birdGroomingPrice3: birdGroomingPrice[2],
      birdGroomingPrice4: birdGroomingPrice[3],
      birdGroomingPrice5: birdGroomingPrice[4],
      birdGroomingPrice6: birdGroomingPrice[5],
      birdGroomingPrice7: birdGroomingPrice[6],

      //Rabbit price value
      rabbitGroomingPrice1: rabbitGroomingPrice[0],
      rabbitGroomingPrice2: rabbitGroomingPrice[1],
      rabbitGroomingPrice3: rabbitGroomingPrice[2],
      rabbitGroomingPrice4: rabbitGroomingPrice[3],
      rabbitGroomingPrice5: rabbitGroomingPrice[4],
      rabbitGroomingPrice6: rabbitGroomingPrice[5],
      rabbitGroomingPrice7: rabbitGroomingPrice[6],

  };


const inputValues = [

  //Dog Services
  { name: "Bathing and Shampooing (DOG)", value: dogGroomingValue[0] ? + (input1Value) : 0, service: "dogGroomingPrice1"},
  { name: "Brushing and Combing (DOG)", value: dogGroomingValue[1] ? + (input1Value) : 0, service: "dogGroomingPrice2" },
  { name: "Haircuts and Trims (DOG)", value: dogGroomingValue[2] ? + (input1Value) : 0, service: "dogGroomingPrice3" },
  { name: "Ear and Teeth Cleaning (DOG)", value: dogGroomingValue[3] ? + (input1Value) : 0, service: "dogGroomingPrice4" },
  { name: "Nail Trimming (DOG)", value: dogGroomingValue[4] ? + (input1Value) : 0, service: "dogGroomingPrice5" },
  { name: "Anal Gland Expression (DOG)", value: dogGroomingValue[5] ? + (input1Value) : 0, service: "dogGroomingPrice6" },
  { name: "Flea and Tick Treatments (DOG)", value: dogGroomingValue[6] ? + (input1Value) : 0, service: "dogGroomingPrice7" },
  { name: "Skin and Coat Treatments (DOG)", value: dogGroomingValue[7] ? + (input1Value) : 0, service: "dogGroomingPrice8" },

  //Cat Services
  { name: "Bathing and Shampooing (CAT)", value: catGroomingValue[0] ? + (input2Value) : 0, service: "catGroomingPrice1" },
  { name: "Brushing and Combing (CAT)", value: catGroomingValue[1] ? + (input2Value) : 0, service: "catGroomingPrice2" },
  { name: "Haircuts and Trims (CAT)", value: catGroomingValue[2] ? + (input2Value) : 0, service: "catGroomingPrice3" },
  { name: "Ear and Teeth Cleaning (CAT)", value: catGroomingValue[3] ? + (input2Value) : 0, service: "catGroomingPrice4" },
  { name: "Nail Trimming (CAT)", value:  catGroomingValue[4] ? + (input2Value) : 0, service: "catGroomingPrice5" },
  { name: "Anal Gland Expression (CAT)", value:  catGroomingValue[5] ? + (input2Value) : 0, service: "catGroomingPrice6" },
  { name: "Flea and Tick Treatments (CAT)", value:  catGroomingValue[6] ? + (input2Value) : 0, service: "catGroomingPrice7" },
  { name: "Skin and Coat Treatments (CAT)", value:  catGroomingValue[7] ? + (input2Value) : 0, service: "catGroomingPrice8" },

  //Bird Services
  { name: "Bathing (BIRD)", value: birdGroomingValue[0] ? + (input3Value) : 0, service: "birdGroomingPrice1" },
  { name: "Beak Trimming (BIRD)", value: birdGroomingValue[1] ? + (input3Value) : 0, service: "birdGroomingPrice2" },
  { name: "Beak Conditioning (BIRD)", value: birdGroomingValue[2] ? + (input3Value) : 0, service: "birdGroomingPrice3" },
  { name: "Nail Trimming (BIRD)", value: birdGroomingValue[3] ? + (input3Value) : 0, service: "birdGroomingPrice4" },
  { name: "Feather Trimming (BIRD)", value:  birdGroomingValue[4] ? + (input3Value) : 0, service: "birdGroomingPrice5" },
  { name: "Wing Clipping (BIRD)", value:  birdGroomingValue[5] ? + (input3Value) : 0, service: "birdGroomingPrice6" },
  { name: "Feather Conditioning (BIRD)", value:  birdGroomingValue[6] ? + (input3Value) : 0, service: "birdGroomingPrice7" },

  //Rabbit Services
  { name: "Bathing (RABBIT)", value: rabbitGroomingValue[0] ? + (input4Value) : 0, service: "rabbitGroomingPrice1" },
  { name: "Brushing and Combing (RABBIT)", value: rabbitGroomingValue[1] ? + (input4Value) : 0, service: "rabbitGroomingPrice2" },
  { name: "Fur Removal (RABBIT)", value: rabbitGroomingValue[2] ? + (input4Value) : 0, service: "rabbitGroomingPrice3" },
  { name: "Ear and Teeth Removal (RABBIT)", value: rabbitGroomingValue[3] ? + (input4Value) : 0, service: "rabbitGroomingPrice4" },
  { name: "Nail Trimming (RABBIT)", value:  rabbitGroomingValue[4] ? + (input4Value) : 0, service: "rabbitGroomingPrice5" },
  { name: "Scent Gland Cleaning (RABBIT)", value:  rabbitGroomingValue[5] ? + (input4Value) : 0, service: "rabbitGroomingPrice6" },
  { name: "Eye Cleaning (RABBIT)", value: rabbitGroomingValue[6] ? + (input4Value) : 0, service: "rabbitGroomingPrice7" },

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
      property: pets,
      materials: materials,
      inputValues: filteredInputsWithTotalPrice,
      multipliedValue, // Pass the multipliedValue
      category: "Pet Grooming", // Add the string here
      logo: "mask-group1.png",
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
    <View style={styles.petGroomingSubcategoryDog}>
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
                <View style={[styles.customer2, styles.frameParentSpaceBlock]}>
                  <View style={[styles.home, styles.homeFlexBox]}>
                    <View
                      style={
                        petVisible1
                          ? [styles.homeChild, styles.childLayout]
                          : [styles.frameChild, styles.childBorder]
                      }
                    />
                    <View style={styles.iconOutline}>
                      {petVisible1 ? (
                        <Image
                          style={[
                            styles.whiteBeagleIcon,
                            styles.beagleIconPosition,
                          ]}
                          contentFit="cover"
                          source={require("../assets/white-beagle.png")}
                        />
                      ) : (
                        <Image
                          style={[styles.blueCatIcon, styles.iconPosition]}
                          contentFit="cover"
                          source={require("../assets/blue-beagle.png")}
                        />
                      )}
                    </View>
                  </View>
                  <View style={styles.dogWrapper}>
                    <Text style={[styles.dog, styles.dogTypo]}>Dog</Text>
                  </View>
                  <View style={styles.customerInner}>
                    <View
                      style={[styles.minusBtnParent, styles.petParentFlexBox]}
                    >
                      {petVisible1 ? (
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
                              setPet("ten"),
                              setPetVisible1(false),
                            ]}
                          />
                        </View>
                      ) : (
                        <View>
                          <AddButton
                            title="Add"
                            onPress={() => {
                              handleCategoryButtonPress("Pet", "one");
                              setInput1Value(1);
                            }}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                </View>
                <View style={[styles.customer2, styles.frameParentSpaceBlock]}>
                  <View style={[styles.home, styles.homeFlexBox]}>
                    <View
                      style={
                        petVisible2
                          ? [styles.homeChild, styles.childLayout]
                          : [styles.frameChild, styles.childBorder]
                      }
                    />
                    <View style={styles.iconOutline}>
                      {petVisible2 ? (
                        <Image
                          style={[styles.whiteCatIcon, styles.iconPosition]}
                          contentFit="cover"
                          source={require("../assets/white-cat.png")}
                        />
                      ) : (
                        <Image
                          style={[styles.blueCatIcon, styles.iconPosition]}
                          contentFit="cover"
                          source={require("../assets/blue-cat.png")}
                        />
                      )}
                    </View>
                  </View>
                  <View style={styles.dogWrapper}>
                    <Text style={[styles.dog, styles.dogTypo]}>Cat</Text>
                  </View>
                  <View style={styles.customerInner}>
                    <View
                      style={[styles.minusBtnParent, styles.petParentFlexBox]}
                    >
                      {petVisible2 ? (
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
                              setPet("ten"),
                              setPetVisible2(false),
                            ]}
                          />
                        </View>
                      ) : (
                        <View>
                          <AddButton
                            title="Add"
                            onPress={() => {
                              handleCategoryButtonPress("Pet", "two");
                              setInput2Value(1);
                            }}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                </View>
                <View style={[styles.customer2, styles.frameParentSpaceBlock]}>
                  <View style={[styles.home, styles.homeFlexBox]}>
                    <View
                      style={
                        petVisible3
                          ? [styles.homeChild, styles.childLayout]
                          : [styles.frameChild, styles.childBorder]
                      }
                    />
                    <View style={[styles.iconOutline2, styles.iconPosition1]}>
                      {petVisible3 ? (
                        <Image
                          style={[styles.whiteCatIcon, styles.iconPosition]}
                          contentFit="cover"
                          source={require("../assets/white-bird.png")}
                        />
                      ) : (
                        <Image
                          style={[styles.blueCatIcon, styles.iconPosition]}
                          contentFit="cover"
                          source={require("../assets/blue-bird.png")}
                        />
                      )}
                    </View>
                  </View>
                  <View style={styles.dogWrapper}>
                    <Text style={[styles.dog, styles.dogTypo]}>Bird</Text>
                  </View>
                  <View style={styles.customerInner}>
                    <View
                      style={[styles.minusBtnParent, styles.petParentFlexBox]}
                    >
                      {petVisible3 ? (
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
                              setPet("ten"),
                              setPetVisible3(false),
                            ]}
                          />
                        </View>
                      ) : (
                        <View>
                          <AddButton
                            title="Add"
                            onPress={() => {
                              handleCategoryButtonPress("Pet", "three");
                              setInput3Value(1);
                            }}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                </View>
                <View style={[styles.customer2, styles.frameParentSpaceBlock]}>
                  <View style={[styles.home, styles.homeFlexBox]}>
                    <View
                      style={
                        petVisible4
                          ? [styles.homeChild, styles.childLayout]
                          : [styles.frameChild, styles.childBorder]
                      }
                    />
                    <View style={[styles.iconOutline2, styles.iconPosition1]}>
                      {petVisible4 ? (
                        <Image
                          style={[styles.whiteRabbitIcon, styles.iconPosition]}
                          // style={[styles.whiteCatIcon, styles.iconPosition]}
                          contentFit="cover"
                          source={require("../assets/white-rabbit.png")}
                        />
                      ) : (
                        <Image
                          style={[styles.blueCatIcon, styles.iconPosition]}
                          contentFit="cover"
                          source={require("../assets/blue-rabbit.png")}
                        />
                      )}
                    </View>
                    
                  </View>
                  <View style={styles.dogWrapper}>
                    <Text style={[styles.dog, styles.dogTypo]}>Rabbit</Text>
                  </View>
                  <View style={styles.customerInner}>
                    <View
                      style={[styles.minusBtnParent, styles.petParentFlexBox]}
                    >
                      {petVisible4 ? (
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
                              setPet("ten"),
                              setPetVisible4(false),
                            ]}
                          />
                        </View>
                      ) : (
                        <View>
                          <AddButton
                            title="Add"
                            onPress={() => {
                              handleCategoryButtonPress("Pet", "four");
                              setInput4Value(1);
                            }}
                          />
                        </View>
                      )}
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
                    style={[styles.selfProvidedMaterials, styles.perPetTypo]}
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
              <Text style={[styles.typeOfPet, styles.dogFlexBox]}>
                Type of Grooming
              </Text>
            </View>
            <View style={styles.frameContainer}>
              <View disabled={!petVisible1} style={[styles.petGroomingWrapper2, styles.petParentFlexBox2]}>
                {!petVisible1 ?
                (
                  <View
                style={[styles.petGroomingWrapper, styles.petParentFlexBox]}
              >
                <View style={styles.bathingAndShampooing600PeWrapper}>
                  <Text
                    style={[
                      styles.bathingAndShampooingContainer,
                      styles.dogFlexBox,
                    ]}
                  >{`Dog Grooming `}</Text>
                </View>
                <Animated.Image
                  style={[
                    styles.collapseArrowIcon,
                    { transform: [{ rotate: arrowTransform1 }] },
                  ]}
                  contentFit="cover"
                  source={require("../assets/collapse-arrow.png")}
                ></Animated.Image>
              </View>
                ):(
                  <View style={[
                    styles.petGroomingWrapper4,
                    styles.petParentFlexBox,
                  ]}>
                                      <TouchableOpacity
                onPress={() => toggleListItem1()}
                style={[styles.petGroomingWrapper, styles.petParentFlexBox]}
              >
                <View style={styles.bathingAndShampooing600PeWrapper}>
                  <Text
                    style={[
                      styles.bathingAndShampooingContainer,
                      styles.dogFlexBox,
                    ]}
                  >{`Dog Grooming `}</Text>
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
              {showContent1 && (
                <View style={styles.dropDownFrame}>
                  {dogData.map((item, index) => {
                    const { name, key, value } = item;
                    return (
                      <View
                        key={key}
                        style={[
                          styles.frameParent2,
                          styles.frameParentSpaceBlock,
                        ]}
                      >
                        <View style={styles.bathingAndShampooing600PeWrapper1}>
                          <Text
                            style={[
                              styles.bathingAndShampooingContainer,
                              styles.dogFlexBox,
                            ]}
                          >
                            <View style={styles.rowContainer}>
                              <Text style={styles.dogTypo}>{name}</Text>
                              <Text style={[styles.perPet, styles.perPetTypo]}>
                                ₱{dogGroomingPrice[index]} per pet
                              </Text>
                            </View>
                          </Text>
                        </View>
                        {dogGroomingVisible[index] ? (
                          <View>
                            <AddButton
                              title="Added"
                              onPress={() => {
                                handleCategoryButtonPress("DogGrooming", value);
                                const updatedDogGroomingValues = [
                                  ...dogGroomingValue,
                                ];
                                updatedDogGroomingValues[index] = 0;
                                setDogGroomingValue(updatedDogGroomingValues);

                                const updatedDogGroomingVisible = [
                                  ...dogGroomingVisible,
                                ];
                                updatedDogGroomingVisible[index] = false;
                                setDogGroomingVisible(
                                  updatedDogGroomingVisible
                                );
                               
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
                                handleCategoryButtonPress("DogGrooming", value);
                                const updatedDogGroomingValues = [
                                  ...dogGroomingValue,
                                ];
                                updatedDogGroomingValues[index] = 1;
                                setDogGroomingValue(updatedDogGroomingValues);
                                // setAreaVisible1(true);
                              }}
                              borderColor={buttonBorderColor1}
                            />
                          </View>
                        )}
                      </View>
                    );
                  })}
                </View>
              )}
                  </View>
                )}
              </View>
              <View style={[styles.frameItem, styles.frameParentSpaceBlock]} />
              <View disabled={!petVisible2} style={[styles.petGroomingWrapper2, styles.petParentFlexBox2]}>
                {!petVisible2 ? 
                (
                                <View
                                style={[styles.petGroomingWrapper, styles.petParentFlexBox]}
                              >
                                <View style={styles.bathingAndShampooing600PeWrapper}>
                                  <Text
                                    style={[
                                      styles.bathingAndShampooingContainer,
                                      styles.dogFlexBox,
                                    ]}
                                  >{`Cat Grooming `}</Text>
                                </View>
                                <Animated.Image
                                  style={[
                                    styles.collapseArrowIcon,
                                    { transform: [{ rotate: arrowTransform2 }] },
                                  ]}
                                  contentFit="cover"
                                  source={require("../assets/collapse-arrow.png")}
                                ></Animated.Image>
                              </View>
                ) : (
                  <View style={[
                    styles.petGroomingWrapper4,
                    styles.petParentFlexBox,
                  ]}>
                                      <TouchableOpacity
                  onPress={() => toggleListItem2()}
                  style={[styles.petGroomingWrapper, styles.petParentFlexBox]}
                >
                  <View style={styles.bathingAndShampooing600PeWrapper}>
                    <Text
                      style={[
                        styles.bathingAndShampooingContainer,
                        styles.dogFlexBox,
                      ]}
                    >{`Cat Grooming `}</Text>
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
                {showContent2 && (
                  <View style={styles.dropDownFrame}>
                    {catData.map((item, index) => {
                      const { name, key, value } = item;
                      return (
                        <View
                          key={key}
                          style={[
                            styles.frameParent2,
                            styles.frameParentSpaceBlock,
                          ]}
                        >
                          <View style={styles.bathingAndShampooing600PeWrapper1}>
                            <Text
                              style={[
                                styles.bathingAndShampooingContainer,
                                styles.dogFlexBox,
                              ]}
                            >
                              <View style={styles.rowContainer}>
                                <Text style={styles.dogTypo}>{name}</Text>
                                <Text style={[styles.perPet, styles.perPetTypo]}>
                                  ₱{catGroomingPrice[index]} per pet
                                </Text>
                              </View>
                            </Text>
                          </View>
                          {catGroomingVisible[index] ? (
                            <View>
                              <AddButton
                                title="Added"
                                onPress={() => {
                                  handleCategoryButtonPress("CatGrooming", value);
                                  const updatedCatGroomingValues = [
                                    ...catGroomingValue,
                                  ];
                                  updatedCatGroomingValues[index] = 0;
                                  setCatGroomingValue(updatedCatGroomingValues);
  
                                  const updatedCatGroomingVisible = [
                                    ...catGroomingVisible,
                                  ];
                                  updatedCatGroomingVisible[index] = false;
                                  setCatGroomingVisible(
                                    updatedCatGroomingVisible
                                  );
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
                                  handleCategoryButtonPress("CatGrooming", value);
                                  const updatedCatGroomingValues = [
                                    ...catGroomingValue,
                                  ];
                                  updatedCatGroomingValues[index] = 1;
                                  setCatGroomingValue(updatedCatGroomingValues);
                                }}
                                borderColor={buttonBorderColor1}
                              />
                            </View>
                          )}
                        </View>
                      );
                    })}
                  </View>
                )}
                  </View>
                )}
              </View>
              <View style={[styles.frameItem, styles.frameParentSpaceBlock]} />
              <View disabled={!petVisible3} style={[styles.petGroomingWrapper2, styles.petParentFlexBox2]}>
                {!petVisible3 ? (
                  <View
                  style={[styles.petGroomingWrapper, styles.petParentFlexBox]}
                >
                  <View style={styles.bathingAndShampooing600PeWrapper}>
                    <Text
                      style={[
                        styles.bathingAndShampooingContainer,
                        styles.dogFlexBox,
                      ]}
                    >{`Bird Grooming `}</Text>
                  </View>
                  <Animated.Image
                    style={[
                      styles.collapseArrowIcon,
                      { transform: [{ rotate: arrowTransform3 }] },
                    ]}
                    contentFit="cover"
                    source={require("../assets/collapse-arrow.png")}
                  ></Animated.Image>
                </View>
                ) : (
                  <View style={[
                    styles.petGroomingWrapper4,
                    styles.petParentFlexBox,
                  ]}>
                    <TouchableOpacity
                      onPress={() => toggleListItem3()}
                      style={[
                        styles.petGroomingWrapper,
                        styles.petParentFlexBox,
                      ]}
                    >
                      <View style={styles.bathingAndShampooing600PeWrapper}>
                        <Text
                          style={[
                            styles.bathingAndShampooingContainer,
                            styles.dogFlexBox,
                          ]}
                        >{`Bird Grooming `}</Text>
                      </View>
                      <Animated.Image
                        style={[
                          styles.collapseArrowIcon,
                          { transform: [{ rotate: arrowTransform3 }] },
                        ]}
                        contentFit="cover"
                        source={require("../assets/collapse-arrow.png")}
                      ></Animated.Image>
                    </TouchableOpacity>
                    {showContent3 && (
                      <View style={styles.dropDownFrame}>
                        {birdData.map((item, index) => {
                          const { name, key, value } = item;
                          return (
                            <View
                              key={key}
                              style={[
                                styles.frameParent2,
                                styles.frameParentSpaceBlock,
                              ]}
                            >
                              <View
                                style={styles.bathingAndShampooing600PeWrapper1}
                              >
                                <Text
                                  style={[
                                    styles.bathingAndShampooingContainer,
                                    styles.dogFlexBox,
                                  ]}
                                >
                                  <View style={styles.rowContainer}>
                                    <Text style={styles.dogTypo}>{name}</Text>
                                    <Text
                                      style={[styles.perPet, styles.perPetTypo]}
                                    >
                                      ₱{birdGroomingPrice[index]} per pet
                                    </Text>
                                  </View>
                                </Text>
                              </View>
                              {birdGroomingVisible[index] ? (
                                <View>
                                  <AddButton
                                    title="Added"
                                    onPress={() => {
                                      handleCategoryButtonPress(
                                        "BirdGrooming",
                                        value
                                      );
                                      const updatedBirdGroomingValues = [
                                        ...birdGroomingValue,
                                      ];
                                      updatedBirdGroomingValues[index] = 0;
                                      setBirdGroomingValue(
                                        updatedBirdGroomingValues
                                      );

                                      const updatedBirdGroomingVisible = [
                                        ...birdGroomingVisible,
                                      ];
                                      updatedBirdGroomingVisible[index] = false;
                                      setBirdGroomingVisible(
                                        updatedBirdGroomingVisible
                                      );
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
                                      handleCategoryButtonPress(
                                        "BirdGrooming",
                                        value
                                      );
                                      const updatedBirdGroomingValues = [
                                        ...birdGroomingValue,
                                      ];
                                      updatedBirdGroomingValues[index] = 1;
                                      setBirdGroomingValue(
                                        updatedBirdGroomingValues
                                      );
                                    }}
                                    borderColor={buttonBorderColor1}
                                  />
                                </View>
                              )}
                            </View>
                          );
                        })}
                      </View>
                    )}
                  </View>
                )}
              </View>
              <View style={[styles.frameItem, styles.frameParentSpaceBlock]} />
              <View
                disabled={!petVisible4}
                style={[styles.petGroomingWrapper2, styles.petParentFlexBox2]}
              >
                {!petVisible4 ? (
                  <View
                    style={[styles.petGroomingWrapper, styles.petParentFlexBox]}
                  >
                    <View style={styles.bathingAndShampooing600PeWrapper}>
                      <Text
                        style={[
                          styles.bathingAndShampooingContainer,
                          styles.dogFlexBox,
                        ]}
                      >{`Rabbit Grooming `}</Text>
                    </View>
                    <Animated.Image
                      style={[
                        styles.collapseArrowIcon,
                        { transform: [{ rotate: arrowTransform4 }] },
                      ]}
                      contentFit="cover"
                      source={require("../assets/collapse-arrow.png")}
                    ></Animated.Image>
                  </View>
                ) : (
                  <View
                    style={[
                      styles.petGroomingWrapper4,
                      styles.petParentFlexBox,
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() => toggleListItem4()}
                      style={[
                        styles.petGroomingWrapper,
                        styles.petParentFlexBox,
                      ]}
                    >
                      <View style={styles.bathingAndShampooing600PeWrapper}>
                        <Text
                          style={[
                            styles.bathingAndShampooingContainer,
                            styles.dogFlexBox,
                          ]}
                        >{`Rabbit Grooming `}</Text>
                      </View>
                      <Animated.Image
                        style={[
                          styles.collapseArrowIcon,
                          { transform: [{ rotate: arrowTransform4 }] },
                        ]}
                        contentFit="cover"
                        source={require("../assets/collapse-arrow.png")}
                      ></Animated.Image>
                    </TouchableOpacity>
                    <View
                      style={[
                        styles.petGroomingWrapper,
                        styles.petParentFlexBox,
                      ]}
                    >
                      {showContent4 && (
                        <View
                          style={[
                            styles.petGroomingWrapper3,
                            styles.petParentFlexBox3,
                          ]}
                        >
                          {rabbitData.map((item, index) => {
                            const { name, key, value } = item;
                            return (
                              <View key={key} style={[styles.frameParent4]}>
                                <View style={styles.dogWrapper2}>
                                  <Text
                                    style={[
                                      styles.bathingAndShampooingContainer,
                                      styles.dogFlexBox2,
                                    ]}
                                  >
                                    <View style={styles.rowContainer}>
                                      <Text style={styles.dogTypo}>{name}</Text>
                                      <Text
                                        style={[
                                          styles.perPet,
                                          styles.perPetTypo,
                                        ]}
                                      >
                                        ₱{rabbitGroomingPrice[index]} per pet
                                      </Text>
                                    </View>
                                  </Text>
                                </View>
                                {rabbitGroomingVisible[index] ? (
                                  <View>
                                    <AddButton
                                      title="Added"
                                      onPress={() => {
                                        handleCategoryButtonPress(
                                          "RabbitGrooming",
                                          value
                                        );
                                        const updatedRabbitGroomingValues = [
                                          ...rabbitGroomingValue,
                                        ];
                                        updatedRabbitGroomingValues[index] = 0;
                                        setRabbitGroomingValue(
                                          updatedRabbitGroomingValues
                                        );

                                        const updatedRabbitGroomingVisible = [
                                          ...rabbitGroomingVisible,
                                        ];
                                        updatedRabbitGroomingVisible[
                                          index
                                        ] = false;
                                        setRabbitGroomingVisible(
                                          updatedRabbitGroomingVisible
                                        );
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
                                        handleCategoryButtonPress(
                                          "RabbitGrooming",
                                          value
                                        );
                                        const updatedRabbitGroomingValues = [
                                          ...rabbitGroomingValue,
                                        ];
                                        updatedRabbitGroomingValues[index] = 1;
                                        setRabbitGroomingValue(
                                          updatedRabbitGroomingValues
                                        );
                                      }}
                                      borderColor={buttonBorderColor1}
                                    />
                                  </View>
                                )}
                              </View>
                            );
                          })}
                        </View>
                      )}
                    </View>
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "column", // Arrange children horizontally
    alignItems: "center", // Center children vertically
  },
  blueBeagleIcon: {
    height: 47,
    zIndex: 1,
  },
  whiteCatIcon: {
    zIndex: 1,
  },
  iconPosition: {
    left: -2,
    height: 50,
    width: 50,
    top: 0,
    position: "absolute",
  },
  whiteRabbitIcon: {
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
  dogFlexBox: {
    textAlign: "left",
    letterSpacing: -0.3,
    lineHeight: 22,
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    flex: 1,
  },
  dogFlexBox2: {
    textAlign: "left",
    letterSpacing: -0.3,
    lineHeight: 22,
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    flex: 1,
  },
  collapseArrowIcon: {
    width: 30,
    height: 30,
    marginLeft: 13,
    // marginLeft: 42,
  },
  // Dropdown styles
  dropDownFrame: {
    alignItems: "center",
    // marginTop: 8,
    alignSelf: "stretch",
  },
  bathingFrame: {
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
    flexDirection: "row",
  },
  bathingTextFrame: {
    paddingLeft: Padding.p_3xs,
    flex: 1,
  },
  pricesTextStyle: {
    alignSelf: "stretch",
    color: Color.colorTypographyContentIconsBlack,
    textAlign: "left",
  },
  bathingTextFrame: {
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
  },
  bathingTextStyle: {
    fontSize: FontSize.body1Semibold_size,
  },
  textSpacing: {
    fontSize: FontSize.title4Regular18_size,
    letterSpacing: 0.5,
    fontFamily: FontFamily.title4Regular18,
    color: Color.colorDarkslategray_600,
    textAlign: "center",
    marginLeft: 0,
    flex: 1,
  },
  bathingPriceStyle: {
    // fontSize: FontSize.level2Medium12_size,
    // fontFamily: FontFamily.level2Medium12,
    // fontWeight: "500",
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
  petParentFlexBox2: {
    justifyContent: "center",
    alignItems: "center",
  },
  petParentFlexBox3: {
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
  childLayout: {
    height: 64,
    borderRadius: Border.br_lg,
    zIndex: 0,
    flex: 1,
  },
  beagleIconPosition: {
    width: 55,
    left: -5,
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
  iconPosition1: {
    padding: Padding.p_12xs,
    top: 6,
    zIndex: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  perPetTypo: {
    fontFamily: FontFamily.level2Medium12,
    fontWeight: "500",
    alignSelf: "flex-start",
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
  petGroomingWrapper2: {
    // flexDirection: "row",
    alignSelf: "stretch",
    marginTop: 5,
  },
  petGroomingWrapper3: {
    flexDirection: "column",
    alignSelf: "center",
  },
  petGroomingWrapper4: {
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
    zIndex: 0,
    backgroundColor: Color.colorSteelblue_100,
  },
  whiteBeagleIcon: {
    height: 50,
    zIndex: 0,
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
    marginLeft: 10,
    backgroundColor: Color.colorSteelblue_100,
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
  frameChild: {
    backgroundColor: Color.colorGainsboro_400,
    borderWidth: 2,
    zIndex: 0,
    height: 64,
    borderRadius: Border.br_lg,
    flex: 1,
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
  addBtn1: {
    borderWidth: 1,
    padding: Padding.p_2xs,
    borderColor: Color.colorDarkslategray_500,
    borderStyle: "solid",
    marginLeft: 10,
    backgroundColor: Color.colorGainsboro_300,
  },
  customer2: {
    borderRadius: Border.br_xs,
    alignItems: "center",
    flexDirection: "row",
  },
  iconOutline2: {
    left: 7,
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
  bathingAndShampooingContainer: {
    color: Color.colorTypographyContentIconsBlack,
  },
  bathingAndShampooing600PeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    flex: 1,
  },
  bathingAndShampooing600PeWrapper1: {
    flexDirection: "row",
    alignItems: "flex-end",
    alignSelf: "stretch",
    flex: 1,
  },
  dogWrapper2: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    alignContent: "center",
    paddingLeft: 125,
    // flex: 1,
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
    paddingLeft: 10,
    paddingTop: 3,
  },
  frameParent3: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // paddingLeft: 10,
    // paddingTop: 3,
  },
  frameParent4: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 8,
    alignSelf: "center",
    // paddingLeft: 10,
    // paddingTop: 3,
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
  petGroomingSubcategoryDog: {
    backgroundColor: Color.colorWhitesmoke_200,
    height: 812,
    width: "100%",
    flex: 1,
  },

  obedienceTraining750PerSeWrapper: {
    paddingRight: 25,
    flexDirection: "row",
    flex: 1,
  },
  frameParent1: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  obedienceTraining750Container: {
    color: Color.colorTypographyContentIconsBlack,
  },
  typeOfDogFlexBox: {
    textAlign: "left",
    flex: 1,
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
  small9kgTypo: {
    fontFamily: FontFamily.level2Medium12,
    fontWeight: "500",
  },
});

export default PetGroomingSubcategoryDog;
