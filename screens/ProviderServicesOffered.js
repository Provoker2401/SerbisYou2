import React, { useState, useEffect } from "react";
import { View, Pressable, StyleSheet, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, FontSize, FontFamily } from "../GlobalStyles";
import {
  SelectList,
  MultipleSelectList,
} from "react-native-dropdown-select-list";

const ProviderServicesOffered = ({ route, style }) => {
  const { tailoredCategory, providerName } = route.params;

  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedSubcategory, setSelectedSubcategory] = React.useState("");
  const [selected, setSelected] = React.useState("");
  const [subcategories, setSubcategories] = React.useState([]);
  const [selectedServices, setSelectedServices] = React.useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const mainService = Object.keys(tailoredCategory);

  useEffect(() => {
    console.log("Tailored Category:", mainService);

    // Extracting subcategories for each service
    mainService.forEach((service) => {
      const subcategories = tailoredCategory[service];
      console.log(`Subcategories for ${service}:`, subcategories);
    });
  }, [tailoredCategory]); // Depend on tailoredCategory for updates

  // Update subcategories when a category is selected
  useEffect(() => {
    if (selectedCategory) {
      const subcategories = tailoredCategory[selectedCategory];
      setSubcategories(Object.keys(subcategories));

      // Clear selected subcategory only if it's already selected
      setSelectedSubcategory("");
    } else {
      // Clear subcategories if no category is selected
      setSubcategories([]);
    }
  }, [selectedCategory, tailoredCategory]);

  const mainTitle = mainService.map((service, index) => ({
    key: `${index}`,
    value: service,
  }));

  const categories = subcategories.map((subcategory, index) => ({
    key: `${index}`,
    value: subcategory,
  }));

  const servicesDropdownData = selectedServices.map((service, index) => ({
    key: `${index}`,
    value: service,
  }));

  const getServicesBySubcategory = (subcategory) => {
    const services = [];
    for (const category in tailoredCategory) {
      const subcategories = tailoredCategory[category];
      if (subcategory in subcategories) {
        services.push(...subcategories[subcategory]);
      }
    }
    return services;
  };

  useEffect(() => {
    if (selectedSubcategory) {
      const services = getServicesBySubcategory(selectedSubcategory);
      setSelectedServices(services);
      console.log("Selected Services:", services);
    } else {
      setSelectedServices([]);
      console.log("Selected Services: []");
    }
  }, [selectedSubcategory]);

  useEffect(() => {
    // Disable button if no category or subcategory is selected
    setIsButtonDisabled(!(selectedCategory && selectedSubcategory));
  }, [selectedCategory, selectedSubcategory]);

  const handleContinue = () => {
    // Define a variable to store the destination screen
    let destinationScreen = "";

    // Determine the destination screen based on selectedCategory and selectedSubcategory
    if (selectedCategory === "Cleaning") {
      switch (selectedSubcategory) {
        case "Deep Cleaning":
          destinationScreen = "DeepCleaningSubcategory";
          break;
        case "Standard Cleaning":
          destinationScreen = "StandardCleaningSubcategory";
          break;
        case "Electronic Appliance Cleaning":
          destinationScreen = "ElectronicApplianceCleaning";
          break;
        case "Pest Control":
          destinationScreen = "PestControlSubcategory";
          break;
        default:
          // Handle other cases if needed
          break;
      }
    } else if (selectedCategory === "Plumbing") {
      switch (selectedSubcategory) {
        case "Installation":
          destinationScreen = "PlumbingInstallationSubcateg";
          break;
        case "Repairs/Replacement":
          destinationScreen = "PlumbingRepairsSubcategory";
          break;
        default:
          // Handle other cases if needed
          break;
      }
    } else if (selectedCategory === "Electrical") {
      switch (selectedSubcategory) {
        case "Installation":
          destinationScreen = "ElectricalInstallationSubcat";
          break;
        case "Repairs/Replacement":
          destinationScreen = "ElectricalRepairsSubcategory";
          break;
        default:
          // Handle other cases if needed
          break;
      }
    } else if (selectedCategory === "Gardening") {
      switch (selectedSubcategory) {
        case "Garden Maintenance":
          destinationScreen = "GardenMaintenanceSubcategory";
          break;
        case "Landscape Design and Planning":
          destinationScreen = "LandscapeDesignSubcategory";
          break;
        case "Irrigation System Installation & Repairs":
          destinationScreen = "IrrigationSystemSubcategory";
          break;
        case "Pest & Disease Management":
          destinationScreen = "PestDiseaseManagementSubc";
          break;
        default:
          // Handle other cases if needed
          break;
      }
    } else if (selectedCategory === "Pet Care") {
      switch (selectedSubcategory) {
        case "Dog Training":
          destinationScreen = "DogTrainingSubcategoryBlue";
          break;
        case "Pet Grooming":
          destinationScreen = "PetGroomingSubcategoryDog";
          break;
        case "Pet Sitting":
          destinationScreen = "PetSittingSubcategoryDog";
          break;
        default:
          // Handle other cases if needed
          break;
      }
    } else if (selectedCategory === "Carpentry") {
      switch (selectedSubcategory) {
        case "Installation":
          destinationScreen = "CarpentryInstallationSubcate";
          break;
        case "Repairs/Replacement":
          destinationScreen = "CarpentryRepairsSubcategory";
          break;
        case "Furniture Assembly And Disassembly":
          destinationScreen = "CarpentryFurnitureSubcategor";
          break;
        default:
          // Handle other cases if needed
          break;
      }
    }

    // Navigate to the destination screen with selectedServices as a parameter
    if (destinationScreen) {
      navigation.navigate(destinationScreen, {
        bookDirect: true,
      });
    }

    // Logging for debugging
    console.log("Category", selectedCategory);
    console.log("Subcategory", selectedSubcategory);
    console.log("Services", selectedServices);
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={[styles.header, style]}>
        <View style={[styles.view, styles.viewFlexBox2]}>
          <View style={styles.backBtnWrapper}>
            <Pressable
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <Image
                style={styles.icon}
                contentFit="cover"
                source={require("../assets/back-btn.png")}
              />
            </Pressable>
          </View>
          <View style={[styles.changePasswordWrapper, styles.viewFlexBox2]}>
            <Text style={styles.changePassword}>{providerName}</Text>
          </View>
        </View>
      </SafeAreaView>

      <View style={styles.applicationForm3}>
        <View style={styles.enterYouServiceContainer}>
          <Text style={[styles.enterYouService]}>Choose Your Service</Text>
        </View>
        <View style={styles.listboxComponentWrapper}>
          <View style={styles.listboxTitle1}>
            <Text style={styles.titleText}>Category (Only One)</Text>
            <SelectList
              setSelected={(val) => {
                setSelectedCategory(val);
                // Clear selected subcategory when a new category is selected
                setSelectedSubcategory("");
              }}
              data={mainTitle}
              save="value"
              label="Category"
              boxStyles={styles.selectListBox}
            />
          </View>

          {selectedCategory && (
            <View style={styles.listboxTitle1}>
              <Text style={styles.titleText}>Subcategory (Only One)</Text>
              <SelectList
                setSelected={(val) => setSelectedSubcategory(val)}
                data={categories}
                save="value"
                label="Subcategory"
                boxStyles={styles.selectListBox}
              />
            </View>
          )}

  
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Continue"
          onPress={handleContinue}
          style={[styles.button, styles.roundedButton]}
          disabled={isButtonDisabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between', // Aligns children with space between them
  },
  header: {
    backgroundColor: Color.colorDarkslateblue_100,
  },
  applicationForm3: {
    flex: 1, // Takes remaining space between header and buttonContainer
    // Other styles for your application form
  },
  buttonContainer: {
    paddingVertical: 20, // Adjust the padding vertically to move the button higher
    paddingHorizontal: 5,
    alignSelf: 'stretch',
  },
  selectListBox: {
    marginVertical: 10,
  },

  listboxComponentWrapper: {
    padding: 10,
    marginVertical: 10,
  },
  enterYouServiceContainer: {
    padding: 10,
    marginTop: 20,
  },
  titleText: {
    fontWeight: "500",
    fontFamily: FontFamily.montserratMedium,
    color: Color.colorDarkslategray_500,
  },
  viewFlexBox2: {
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  backBtn: {
    width: 24,
    height: 24,
  },
  backBtnWrapper: {
    paddingLeft: Padding.p_3xl,
    paddingTop: Padding.p_7xs,
    paddingBottom: Padding.p_7xs,
  },
  changePassword: {
    fontSize: FontSize.title3Bold20_size,
    letterSpacing: 0.5,
    fontWeight: "700",
    fontFamily: FontFamily.title2Bold32,
    color: "white",
    textAlign: "center",
    flex: 1,
  },
  changePasswordWrapper: {
    justifyContent: "center",
    paddingRight: Padding.p_5xl,
    flex: 1,
  },
  view: {
    alignSelf: "stretch",
    height: 72,
    paddingTop: Padding.p_5xs,
    paddingRight: Padding.p_3xl,
    paddingBottom: Padding.p_5xs,
  },
  enterYouService: {
    letterSpacing: -0.4,
    color: Color.neutral07,
    textAlign: "left",
    fontWeight: "600",
    fontSize: FontSize.title3Bold20_size,
  },
});

export default ProviderServicesOffered;
