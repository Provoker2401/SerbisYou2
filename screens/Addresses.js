import React, { useState, useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  Pressable,
  View,
  Text,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import {
  getAuth,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const Addresses = () => {
  const navigation = useNavigation();
  const [savedAddressData, setSavedAddressData] = useState([]);
  const [trueFlag, setTrueFlag] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSavedAddressData() {
      try {
        setLoading(true);
        const db = getFirestore();
        const auth = getAuth(); // Use getAuth from Firebase Authentication
        const user = auth.currentUser.uid;
        const manageAddressCollectionRef = collection(
          db,
          "userProfiles",
          user,
          "manageAddress"
        );
        const savedOptionsRef = doc(manageAddressCollectionRef, "savedOptions");

        const savedOptionsSnapshot = await getDoc(savedOptionsRef);

        if (savedOptionsSnapshot.exists()) {
          const savedOptionsData =
            savedOptionsSnapshot.data().savedOptions || [];
          setSavedAddressData(savedOptionsData);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching saved address data:", error);
      }
    }

    fetchSavedAddressData();
  }, []);

  const handleEdit = (address) => {

    navigation.navigate("EditAddressIconComplete", {
      coordinates: address.coordinates,
      city: address.city,
      loc: address.address,
      floor: address.floor,
      houseNumber: address.houseNumber,
      label: address.label,
      otherLabel: address.otherLabel,
      note: address.note,
      street: address.street,
      value: address.value,
    });
  };

  const handleDelete = async (address) => {
  try {
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser.uid;
    const manageAddressCollectionRef = collection(
      db,
      "userProfiles",
      user,
      "manageAddress"
    );
    
    // Assuming the document that contains the saved addresses is named "savedOptions"
    const savedOptionsRef = doc(manageAddressCollectionRef, "savedOptions");

    // Get the current data of saved options
    const savedOptionsSnapshot = await getDoc(savedOptionsRef);
    if (savedOptionsSnapshot.exists()) {
      const savedOptionsData = savedOptionsSnapshot.data();
      const updatedSavedOptions = savedOptionsData.savedOptions || [];
      console.log("Updated Saved Options", updatedSavedOptions);

      // Remove the address to be deleted from the list
      const updatedAddresses = updatedSavedOptions.filter((savedAddress) => savedAddress.address !== address.address);

      // Update the document with the updated address list
      await updateDoc(savedOptionsRef, { savedOptions: updatedAddresses });

      // Update the local state to reflect the change
      setSavedAddressData(updatedAddresses);
    }
  } catch (error) {
    console.error("Error deleting address:", error);
  }
};

  const handleSelectedAddress = async (index) => {
  try {

    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser.uid;
    const manageAddressCollectionRef = collection(
      db,
      "userProfiles",
      user,
      "manageAddress"
    );
    
    // Assuming the document that contains the saved addresses is named "savedOptions"
    const savedOptionsRef = doc(manageAddressCollectionRef, "savedOptions");

    // Get the current data of saved options
    const savedOptionsSnapshot = await getDoc(savedOptionsRef);
    if (savedOptionsSnapshot.exists()) {
      const savedOptionsData = savedOptionsSnapshot.data();
      const selectedLoc = savedOptionsData.savedOptions[index] || [];
      console.log("Selected Location: ", selectedLoc.address);
      console.log("Selected Label: ", selectedLoc.label);
      console.log("Selected Coordinates: ", selectedLoc.coordinates);
      navigation.navigate("MapsConfirmLocation", {
        selectedLoc: selectedLoc.address,
        selectedLabel: selectedLoc.label,
        selectedCoordinates: selectedLoc.coordinates,
        chosenFlag: trueFlag,
      });

    }
  } catch (error) {
    console.error("Error deleting address:", error);
  }
};


  return (
    <View style={styles.container}>
      {loading ? (
         <ActivityIndicator size="large" color="#003459" />
      ) : (
        <View style={styles.container2}>
        {savedAddressData.map((address, index) => (
          <Pressable style={styles.addressContainer} key={index} 
          onPress={() => handleSelectedAddress(index)}
          >
            <View style={styles.row}>
              <Image source={require("../assets/location-1.png")} style={styles.icon} />
            </View>
            <View style={styles.textContainer}>
            <Text style={styles.textLabel}>{address.label}</Text>
              <Text style={styles.text}>{address.address}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.button} onPress={() => handleEdit(address)}>
                <Image source={require("../assets/pencil-1.png")} style={styles.buttonIcon} />
              </Pressable>
              <Pressable style={styles.button} onPress={() => handleDelete(address)}>
                <Image source={require("../assets/delete.png")} style={styles.buttonIcon} />
              </Pressable>
            </View>
          </Pressable>
        ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    padding: 10,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  addressContainer: {
    backgroundColor: 'white',
    marginVertical: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  textContainer: {
    flex: 1,
  flexDirection: 'column',
  marginLeft: 10, // Add left margin for better separation
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
  },
  textLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end', // Align buttons to the right
  },
  button: {
    padding: 10,
  },
  buttonIcon: {
    width: 20,
    height: 20,
  },
});

export default Addresses;
