import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Pressable,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import {
  getAuth,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Color, Padding, FontFamily, FontSize, Border } from "../GlobalStyles";
import Toast from "react-native-toast-message";

const AddressesProfile = () => {
  const navigation = useNavigation();
  const [savedAddressData, setSavedAddressData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

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
        const savedOptionsData = savedOptionsSnapshot.data()?.savedOptions || [];

        if (savedOptionsData.length > 0) {
          console.log("True");
          setSavedAddressData(savedOptionsData);
          setLoadingData(true);
        } else {
          console.log("False");
          setSavedAddressData([]);
          setLoadingData(false);
        }
        console.log("Loading Data Value: " ,loadingData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching saved address data:", error);
      }
    }

    fetchSavedAddressData();
  }, []);

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

      const savedOptionsRef = doc(manageAddressCollectionRef, "savedOptions");

      // Get the current data of saved options
      const savedOptionsSnapshot = await getDoc(savedOptionsRef);
      if (savedOptionsSnapshot.exists()) {
        const savedOptionsData = savedOptionsSnapshot.data();
        const updatedSavedOptions = savedOptionsData.savedOptions || [];
        console.log("Updated Saved Options", updatedSavedOptions);

        // Remove the address to be deleted from the list
        const updatedAddresses = updatedSavedOptions.filter(
          (savedAddress) => savedAddress.address !== address.address
        );

        // Update the document with the updated address list
        await updateDoc(savedOptionsRef, { savedOptions: updatedAddresses });

        // Update the local state to reflect the change
        setSavedAddressData(updatedAddresses);
      }
      Toast.show({
        type: "success",
        position: "top",
        text1: "Address Deleted✅",
        text2: "Address is removed from the Saved Addresses List",
        visibilityTime: 5000,
      });
    } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error❗",
          text2: "Address can not be removed from the Saved Addresses List",
          visibilityTime: 5000,
        });
    }
  };

  const handleEdit = (address) => {
    navigation.navigate("EditAddressIconComplete", {
      coordinates: address.coordinates,
      city: address.city,
      loc: address.address,
      floor: address.floor,
      houseNumber: address.houseNumber,
      label: address.label,
      note: address.note,
      street: address.street,
      value: address.value,
    });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#003459" />
      ) : (
        <ScrollView style={styles.scrollView}>
          <View style={styles.container2}>
            {savedAddressData.length > 0 && loadingData && (
              <View style={styles.bodyInner}>
                {savedAddressData.map((address, index) => (
                  <View
                    style={styles.addressContainer}
                    key={index}
                  >
                    <View style={styles.row}>
                      <Image
                        source={require("../assets/location-1.png")}
                        style={styles.icon}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.textLabel}>{address.label}</Text>
                      <Text style={styles.text}>{address.address}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                      <Pressable
                        style={styles.button}
                        onPress={() => handleEdit(address)}
                      >
                        <Image
                          source={require("../assets/pencil-1.png")}
                          style={styles.buttonIcon}
                        />
                      </Pressable>
                      <Pressable
                        style={styles.button}
                        onPress={() => handleDelete(address)}
                      >
                        <Image
                          source={require("../assets/delete.png")}
                          style={styles.buttonIcon}
                        />
                      </Pressable>
                    </View>
                  </View>
                ))}
              </View>
            )}
            {savedAddressData.length == 0 && !loadingData && (
              <View style={[styles.noNotifications, styles.noNotificationsSpaceBlock]}>
                <View style={styles.viewParentFlexBox}>
                  <Image
                    style={styles.frameItem}
                    contentFit="cover"
                    source={require("../assets/NoAddressesState.png")}
                  />
                  <View style={[styles.noNotificationsParent, styles.viewParentFlexBox]}>
                    <Text style={styles.noNotifications1}>No Saved Addresses!</Text>
                    <View
                      style={[
                        styles.youDontHaveAnyNotificatioWrapper,
                        styles.navigationBarHomeFlexBox,
                      ]}
                    >
                      <Text style={[styles.youDontHave, styles.youDontHaveLayout]}>
                        You don’t have any saved addresses yet. Start adding locations for quick access.
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: '100%',
  },

  bodyInner: {
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "stretch",
  },

  // Empty State Styles
  noNotifications: {
    paddingVertical: 110,
    borderRadius: Border.br_5xs,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  noNotifications1: {
    lineHeight: 26,
    textAlign: "center",
    color: Color.neutral07,
    fontFamily: FontFamily.title2Bold32,
    fontWeight: "700",
    fontSize: FontSize.title3Bold20_size,
  },
  noNotificationsSpaceBlock: {
    paddingHorizontal: Padding.p_xl,
    alignItems: "center",
  },
  viewParentFlexBox: {
    alignItems: "center",
    alignSelf: "stretch",
  },
  frameItem: {
    height: 150,
    width: 150,
  },
  noNotificationsParent: {
    marginTop: 32,
    overflow: "hidden",
  },
  youDontHaveAnyNotificatioWrapper: {
    marginTop: 10,
    paddingHorizontal: Padding.p_xl,
    alignItems: "center",
  },
  navigationBarHomeFlexBox: {
    paddingVertical: 0,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  youDontHave: {
    fontSize: FontSize.m3LabelLarge_size,
    color: "#b0b0b0",
    fontFamily: FontFamily.level2Medium12,
    fontWeight: "500",
    flex: 1,
  },
  youDontHaveLayout: {
    lineHeight: 24,
    letterSpacing: -0.1,
    textAlign: "center",
  },

  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  addressContainer: {
    backgroundColor: "white",
    marginVertical: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 10, // Add left margin for better separation
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
  },
  textLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end", // Align buttons to the right
  },
  button: {
    padding: 10,
  },
  buttonIcon: {
    width: 20,
    height: 20,
  },
});

export default AddressesProfile;
