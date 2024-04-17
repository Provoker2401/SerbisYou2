import * as React from "react";
import * as eva from "@eva-design/eva";
import { IconRegistry, ApplicationProvider } from "@ui-kitten/components";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  View,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Toast from "react-native-toast-message";
import { enableLatestRenderer } from "react-native-maps";

// Components
import ProfileHeader from "./components/ProfileHeader";
import AccountHeader from "./components/AccountHeader";
import ReviewSummaryHeader from "./components/ReviewSummaryHeader";
import SearchAndFoundServiceProvidersHeader from "./components/SearchAndFoundServiceProvidersHeader";
import CurrentLocationHeader from "./components/CurrentLocationHeader";
import SubcategoryHeader from "./components/SubcategoryHeader";

import Segment1 from "./components/Segment1";
import Segment2 from "./components/Segment2";
import Segment3 from "./components/Segment3";
import Segment4 from "./components/Segment4";

import Segment11 from "./components/Segment11";
import Segment21 from "./components/Segment21";
import Segment31 from "./components/Segment31";
import Segment41 from "./components/Segment41";

import Tab1 from "./components/Tab1";
import Tab2 from "./components/Tab2";

import Tab11 from "./components/Tab11";
import Tab12 from "./components/Tab12";
import Tab13 from "./components/Tab13";

import Tab21 from "./components/Tab21";
import Tab22 from "./components/Tab22";
import Tab23 from "./components/Tab23";

import ComponentsTopNavigation from "./components/ComponentsTopNavigation";
import ComponentsTopNavigation1 from "./components/ComponentsTopNavigation1";
import ComponentsTopNavigation3 from "./components/ComponentsTopNavigation3";
import ComponentsTopNavigation4 from "./components/ComponentsTopNavigation4";
import ComponentsTopNavigation5 from "./components/ComponentsTopNavigation5";
import ComponentsTopNavigation6 from "./components/ComponentsTopNavigation6";

import LogoutModal from "./components/LogoutModal";
import MultipleLocationModal from "./components/MultipleLocationModal";
import TimeDateModal from "./components/TimeDateModal";
import EditAddressModal from "./components/EditAddressModal";
import EditLocationDetailsModal from "./components/EditLocationDetailsModal";
import SearchingDistanceRadiusModal from "./components/SearchingDistanceRadiusModal";
import SearchingServiceProviderModal from "./components/SearchingServiceProviderModal";
import CancelBookingSearchingPrompt from "./components/CancelBookingSearchingPrompt";
import CancelBookingPrompt from "./components/CancelBookingPrompt";
import CancelBookingSuccessful from "./components/CancelBookingSuccessful";
import NoProvidersFound from "./components/NoProvidersFound";

import AboutUsFrame from "./components/AboutUsFrame";
import FAQsFrame from "./components/FAQsFrame";

import ActiveBookings from "./components/ActiveBookings";
import HistoryBookings from "./components/HistoryBookings";

// Screens
import Splash from "./screens/Splash";
import Onboarding1 from "./screens/Onboarding1";
import Onboarding2 from "./screens/Onboarding2";
import Onboarding3 from "./screens/Onboarding3";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import Authentication from "./screens/Authentication";

import Homepage from "./screens/Homepage";
import BookingsActive from "./screens/BookingsActive";
import Notifications from "./screens/Notifications";
import UserProfile from "./screens/UserProfile";

import EditProfile from "./screens/EditProfile";
import ChangePassword from "./screens/ChangePassword";
import ChangePasswordUpdated from "./screens/ChangePasswordUpdated";
import PaymentOptions from "./screens/PaymentOptions";
import AddCard from "./screens/AddCard";
import NotificationsSettings from "./screens/NotificationsSettings";
import HelpCenterFAQ from "./screens/HelpCenterFAQ";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import TermsAndConditions from "./screens/TermsAndConditions";
import Addresses from "./screens/Addresses";
import AddressesProfile from "./screens/AddressesProfile";

// Categories Screens
import PlumbingSubcategory from "./screens/PlumbingSubcategory";
import ElectricalSubcategory from "./screens/ElectricalSubcategory";
import CleaningSubcategory from "./screens/CleaningSubcategory";
import PetCareSubcategory from "./screens/PetCareSubcategory";
import GardeningSubcategory from "./screens/GardeningSubcategory";
import CarpentrySubcategory from "./screens/CarpentrySubcategory";

// Subcategories Screens
import PlumbingInstallationSubcateg from "./screens/PlumbingInstallationSubcateg";
import PlumbingRepairsSubcategory from "./screens/PlumbingRepairsSubcategory";

import ElectricalInstallationSubcat from "./screens/ElectricalInstallationSubcat";
import ElectricalRepairsSubcategory from "./screens/ElectricalRepairsSubcategory";

import StandardCleaningSubcategory from "./screens/StandardCleaningSubcategory";
import DeepCleaningSubcategory from "./screens/DeepCleaningSubcategory";
import ElectronicApplianceCleaning from "./screens/ElectronicApplianceCleaning";
import PestControlSubcategory from "./screens/PestControlSubcategory";

import DogTrainingSubcategoryBlue from "./screens/DogTrainingSubcategoryBlue";
import PetGroomingSubcategoryDog from "./screens/PetGroomingSubcategoryDog";
import PetSittingSubcategoryDog from "./screens/PetSittingSubcategoryDog";

import GardenMaintenanceSubcategory from "./screens/GardenMaintenanceSubcategory";
import LandscapeDesignSubcategory from "./screens/LandscapeDesignSubcategory";
import IrrigationSystemSubcategory from "./screens/IrrigationSystemSubcategory";
import PestDiseaseManagementSubc from "./screens/PestDiseaseManagementSubc";

import CarpentryInstallationSubcate from "./screens/CarpentryInstallationSubcate";
import CarpentryRepairsSubcategory from "./screens/CarpentryRepairsSubcategory";
import CarpentryFurnitureSubcategor from "./screens/CarpentryFurnitureSubcategor";

// Other Screens

// Forgot Password
import ForgotPasswordConfirmation from "./screens/ForgotPasswordConfirmation";
import ForgotPasswordCode from "./screens/ForgotPasswordCode";
import ForgotPasswordResendCode from "./screens/ForgotPasswordResendCode";
import SetNewPassword from "./screens/SetNewPassword";
import ForgotPasswordUpdated from "./screens/ForgotPasswordUpdated";

// Locations
import EditAddressIconComplete from "./screens/EditAddressIconComplete";
import AddNewAddress from "./screens/AddNewAddress";
import MapsConfirmLocation from "./screens/MapsConfirmLocation";
import MapsEditLocationDetailsNo from "./screens/MapsEditLocationDetailsNo";
import SearchingDistanceRadius from "./screens/SearchingDistanceRadius";

// Review Summary
import ReviewSummary from "./screens/ReviewSummary";
import PaymentMethod from "./screens/PaymentMethod";
import SearchingServiceProviders from "./screens/SearchingServiceProviders";
import ServiceProvidersFound from "./screens/ServiceProvidersFound";

// Receipt
import EReceipt from "./screens/EReceipt";
import BookingDetails from "./screens/BookingDetails";
import NavigationHomeService from "./screens/NavigationHomeService";

import { DateTimeProvider } from "./DateTimeContext"; // Import DateTimeProvider
import { ReviewSummaryProvider } from "./ReviewSummaryContext";
import { AddAddressProvider } from "./AddAddressContext";
import { AddressSelectedProvider } from "./AddressSelectedContext";
import { UserDetailsProvider } from "./UserDetailsContext";
import { EditLocationProvider } from './EditLocationContext';
import { SelectedBookingAddressProvider } from './SelectedBookingAddressContext';
import { SearchingContextProvider } from './SearchingContext';


const firebaseConfig = {
  apiKey: "AIzaSyDWQablgpC3ElsqOQuVhQU2YFsri1VmCss",
  authDomain: "testingauth-9126f.firebaseapp.com",
  projectId: "testingauth-9126f",
  storageBucket: "testingauth-9126f.appspot.com",
  messagingSenderId: "211063140592",
  appId: "1:211063140592:web:6d7047e844df66f1565235",
};

enableLatestRenderer();

// initialize Firebase App
const app = initializeApp(firebaseConfig);
// initialize Firebase Auth for that app immediately
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabsRoot({ navigation }) {
  const [bottomTabItemsNormal] = React.useState([
    <Segment1 />,
    <Segment2 />,
    <Segment3 />,
    <Segment4 />,
  ]);
  const [bottomTabItemsActive] = React.useState([
    <Segment11 />,
    <Segment21 />,
    <Segment31 />,
    <Segment41 />,
  ]);
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={({ state, descriptors, navigation }) => {
        const activeIndex = state.index;
        return (
          <View
            style={{
              alignSelf: "stretch",
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              backgroundColor: "#fff",
              flexDirection: "row",
              paddingHorizontal: 8,
              paddingVertical: 0,
              alignItems: "center",
              justifyContent: "space-between",
              height: 80,
            }}
          >
            {bottomTabItemsNormal.map((item, index) => {
              const isFocused = state.index === index;
              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    navigation.navigate({
                      name: state.routes[index].name,
                      merge: true,
                    });
                  }}
                >
                  {activeIndex === index
                    ? bottomTabItemsActive[index] || item
                    : item}
                </Pressable>
              );
            })}
          </View>
        );
      }}
    >
      <Tab.Screen
        name="Homepage"
        component={Homepage}
        options={(props) => ({
          headerShown: true,
          header: () => <CurrentLocationHeader />,
        })}
      />
      <Tab.Screen
        name="BookingsActive"
        component={BookingsActive}
        options={(props) => ({
          headerShown: true,
          header: () => <CurrentLocationHeader />,
        })}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={(props) => ({
          headerShown: true,
          header: () => <CurrentLocationHeader />,
        })}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={(props) => ({
          headerShown: true,
          header: () => <ProfileHeader />,
        })}
      />
    </Tab.Navigator>
  );
}

export { firebaseConfig, auth, app };

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(false);
  const [fontsLoaded, error] = useFonts({
    "AbhayaLibre-ExtraBold": require("./assets/fonts/AbhayaLibre-ExtraBold.ttf"),
    "Inter-Light": require("./assets/fonts/Inter-Light.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Inter-ExtraBold": require("./assets/fonts/Inter-ExtraBold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "WorkSans-Regular": require("./assets/fonts/WorkSans-Regular.ttf"),
    "WorkSans-Medium": require("./assets/fonts/WorkSans-Medium.ttf"),
    "WorkSans-SemiBold": require("./assets/fonts/WorkSans-SemiBold.ttf"),
    "WorkSans-Bold": require("./assets/fonts/WorkSans-Bold.ttf"),
    "Georama-Light": require("./assets/fonts/Georama-Light.ttf"),
    "Georama-Regular": require("./assets/fonts/Georama-Regular.ttf"),
    "Georama-Medium": require("./assets/fonts/Georama-Medium.ttf"),
    "Georama-SemiBold": require("./assets/fonts/Georama-SemiBold.ttf"),
    "Georama-Bold": require("./assets/fonts/Georama-Bold.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Galdeano-Regular": require("./assets/fonts/Galdeano-Regular.ttf"),
  });

  React.useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(true);
    }, 8000);
  }, []);

  function MaterialIcon({ name, style }) {
    const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
    return (
      <MIcon name={name} size={height} color={tintColor} style={iconStyle} />
    );
  }

  const IconProvider = (name) => ({
    toReactElement: (props) => MaterialIcon({ name, ...props }),
  });

  function createIconsMap() {
    return new Proxy(
      {},
      {
        get(target, name) {
          return IconProvider(name);
        },
      }
    );
  }
  const MaterialIconsPack = {
    name: "material",
    icons: createIconsMap(),
  };

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <IconRegistry icons={[MaterialIconsPack]} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <AddAddressProvider>
          <DateTimeProvider>
            <SearchingContextProvider>
              <SelectedBookingAddressProvider>
                <EditLocationProvider>
                  <UserDetailsProvider>
                    <AddressSelectedProvider>
                      <ReviewSummaryProvider>
                        <NavigationContainer>
                          {hideSplashScreen ? (
                            <Stack.Navigator
                              initialRouteName="Onboarding1"
                              screenOptions={{ headerShown: false }}
                            >
                              <Stack.Screen
                                name="BottomTabsRoot"
                                component={BottomTabsRoot}
                              />
                              <Stack.Screen
                                name="Onboarding1"
                                component={Onboarding1}
                                options={{ headerShown: false }}
                                // options={(props) => ({
                                //   headerShown: true,
                                //   header: () => <Frame />,
                                // })}
                              />
                              <Stack.Screen
                                name="Segment4"
                                component={Segment4}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="LogoutModal"
                                component={LogoutModal}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="EditProfile"
                                component={EditProfile}
                                options={({ route }) => ({
                                  headerShown: true,
                                  header: () => <AccountHeader title="Edit Profile"/>,
                                })}
                              />
                              <Stack.Screen
                                name="ChangePasswordUpdated"
                                component={ChangePasswordUpdated}
                                options={({ route }) => ({
                                  headerShown: true,
                                  header: () => <AccountHeader title="Change Password"/>,
                                })}
                              />
                              <Stack.Screen
                                name="ChangePassword"
                                component={ChangePassword}
                                options={({ route }) => ({
                                  headerShown: true,
                                  header: () => <AccountHeader title="Change Password"/>,
                                })}
                              />
                              <Stack.Screen
                                name="Addresses"
                                component={Addresses}
                                options={({ route }) => ({
                                  headerShown: true,
                                  header: () => <AccountHeader title="Addresses"/>,
                                })}
                              />
                              <Stack.Screen
                                name="AddressesProfile"
                                component={AddressesProfile}
                                options={({ route }) => ({
                                  headerShown: true,
                                  header: () => <AccountHeader title="Addresses"/>,
                                })}
                              />
                              <Stack.Screen
                                name="AddCard"
                                component={AddCard}
                                options={({ route }) => ({
                                  headerShown: true,
                                  header: () => <AccountHeader title="Add Card"/>,
                                })}
                              />
                              <Stack.Screen
                                name="PaymentOptions"
                                component={PaymentOptions}
                                options={({ route }) => ({
                                  headerShown: true,
                                  header: () => <AccountHeader title="Payment Options"/>,
                                })}
                              />
                              <Stack.Screen
                                name="NotificationsSettings"
                                component={NotificationsSettings}
                                options={({ route }) => ({
                                  headerShown: true,
                                  header: () => <AccountHeader title="Notifications"/>,
                                })}
                              />
                              <Stack.Screen
                                name="TermsAndConditions"
                                component={TermsAndConditions}
                                options={({ route }) => ({
                                  headerShown: true,
                                  header: () => <AccountHeader title="Terms and Conditions"/>,
                                })}
                              />
                              <Stack.Screen
                                name="Tab2"
                                component={Tab2}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="AboutUsFrame"
                                component={AboutUsFrame}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="Tab21"
                                component={Tab21}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="Tab1"
                                component={Tab1}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="FAQsFrame"
                                component={FAQsFrame}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="Tab11"
                                component={Tab11}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="HelpCenterFAQ"
                                component={HelpCenterFAQ}
                                options={({ route }) => ({
                                  headerShown: true,
                                  header: () => <AccountHeader title="Help Center"/>,
                                })}
                              />
                              <Stack.Screen
                                name="PrivacyPolicy"
                                component={PrivacyPolicy}
                                options={({ route }) => ({
                                  headerShown: true,
                                  header: () => <AccountHeader title="Privacy Policy"/>,
                                })}
                              />
                              <Stack.Screen
                                name="Segment41"
                                component={Segment41}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="Segment3"
                                component={Segment3}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="Segment31"
                                component={Segment31}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="Segment2"
                                component={Segment2}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="Segment21"
                                component={Segment21}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="EditAddressIconComplete"
                                component={EditAddressIconComplete}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="EditAddressModal"
                                component={EditAddressModal}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="EditLocationDetailsModal"
                                component={EditLocationDetailsModal}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="SearchingDistanceRadiusModal"
                                component={SearchingDistanceRadiusModal}
                                options={{ headerShown: false }}
                              />
                                <Stack.Screen
                                name="SearchingServiceProviderModal"
                                component={SearchingServiceProviderModal}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="AddNewAddress"
                                component={AddNewAddress}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="MultipleLocationModal"
                                component={MultipleLocationModal}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="ComponentsTopNavigation3"
                                component={ComponentsTopNavigation3}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <ComponentsTopNavigation3 />,
                                })}
                              />
                              <Stack.Screen
                                name="PlumbingInstallationSubcateg"
                                component={PlumbingInstallationSubcateg}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <SubcategoryHeader />,
                                })}
                              />
                              <Stack.Screen
                                name="PlumbingRepairsSubcategory"
                                component={PlumbingRepairsSubcategory}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <SubcategoryHeader />,
                                })}
                              />
                              <Stack.Screen
                                name="PlumbingSubcategory"
                                component={PlumbingSubcategory}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <ComponentsTopNavigation3 />,
                                })}
                              />
                              <Stack.Screen
                                name="ComponentsTopNavigation4"
                                component={ComponentsTopNavigation4}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <ComponentsTopNavigation4 />,
                                })}
                              />
                              <Stack.Screen
                                name="ElectricalInstallationSubcat"
                                component={ElectricalInstallationSubcat}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <SubcategoryHeader />,
                                })}
                              />
                              <Stack.Screen
                                name="ElectricalRepairsSubcategory"
                                component={ElectricalRepairsSubcategory}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <SubcategoryHeader />,
                                })}
                              />
                              <Stack.Screen
                                name="ElectricalSubcategory"
                                component={ElectricalSubcategory}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <ComponentsTopNavigation4 />,
                                })}
                              />
                              <Stack.Screen
                                name="ComponentsTopNavigation5"
                                component={ComponentsTopNavigation5}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <ComponentsTopNavigation5 />,
                                })}
                              />
                              <Stack.Screen
                                name="TimeDateModal"
                                component={TimeDateModal}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="StandardCleaningSubcategory"
                                component={StandardCleaningSubcategory}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <SubcategoryHeader />,
                                })}
                              />
                              <Stack.Screen
                                name="DeepCleaningSubcategory"
                                component={DeepCleaningSubcategory}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <SubcategoryHeader />,
                                })}
                              />
                              <Stack.Screen
                                name="ElectronicApplianceCleaning"
                                component={ElectronicApplianceCleaning}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <SubcategoryHeader />,
                                })}
                              />
                              <Stack.Screen
                                name="PestControlSubcategory"
                                component={PestControlSubcategory}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <SubcategoryHeader />,
                                })}
                              />
                              <Stack.Screen
                                name="CleaningSubcategory"
                                component={CleaningSubcategory}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <ComponentsTopNavigation5 />,
                                })}
                              />
                              <Stack.Screen
                                name="ComponentsTopNavigation6"
                                component={ComponentsTopNavigation6}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <ComponentsTopNavigation6 />,
                                })}
                              />
                              <Stack.Screen
                                name="DogTrainingSubcategoryBlue"
                                component={DogTrainingSubcategoryBlue}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <SubcategoryHeader />,
                                })}
                              />
                              <Stack.Screen
                                name="PetGroomingSubcategoryDog"
                                component={PetGroomingSubcategoryDog}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <SubcategoryHeader />,
                                })}
                              />
                              <Stack.Screen
                                name="PetSittingSubcategoryDog"
                                component={PetSittingSubcategoryDog}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <SubcategoryHeader />,
                                })}
                              />
                              <Stack.Screen
                                name="PetCareSubcategory"
                                component={PetCareSubcategory}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <ComponentsTopNavigation6 />,
                                })}
                              />
                              <Stack.Screen
                                name="ComponentsTopNavigation"
                                component={ComponentsTopNavigation}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <ComponentsTopNavigation />,
                                })}
                              />
                              <Stack.Screen
                                name="GardenMaintenanceSubcategory"
                                component={GardenMaintenanceSubcategory}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <SubcategoryHeader />,
                                })}
                              />
                              <Stack.Screen
                                name="LandscapeDesignSubcategory"
                                component={LandscapeDesignSubcategory}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <SubcategoryHeader />,
                                })}
                              />
                              <Stack.Screen
                                name="IrrigationSystemSubcategory"
                                component={IrrigationSystemSubcategory}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <SubcategoryHeader />,
                                })}
                              />
                              <Stack.Screen
                                name="PestDiseaseManagementSubc"
                                component={PestDiseaseManagementSubc}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <SubcategoryHeader />,
                                })}
                              />
                              <Stack.Screen
                                name="GardeningSubcategory"
                                component={GardeningSubcategory}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <ComponentsTopNavigation />,
                                })}
                              />
                              <Stack.Screen
                                name="ComponentsTopNavigation1"
                                component={ComponentsTopNavigation1}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <ComponentsTopNavigation1 />,
                                })}
                              />
                              <Stack.Screen
                                name="CarpentryInstallationSubcate"
                                component={CarpentryInstallationSubcate}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <SubcategoryHeader />,
                                })}
                              />
                              <Stack.Screen
                                name="CarpentryRepairsSubcategory"
                                component={CarpentryRepairsSubcategory}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <SubcategoryHeader />,
                                })}
                              />
                              <Stack.Screen
                                name="CarpentryFurnitureSubcategor"
                                component={CarpentryFurnitureSubcategor}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <SubcategoryHeader />,
                                })}
                              />
                              <Stack.Screen
                                name="CarpentrySubcategory"
                                component={CarpentrySubcategory}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <ComponentsTopNavigation1 />,
                                })}
                              />
                              <Stack.Screen
                                name="CancelBookingSuccessful"
                                component={CancelBookingSuccessful}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="NoProvidersFound"
                                component={NoProvidersFound}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="CancelBookingPrompt"
                                component={CancelBookingPrompt}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="CancelBookingSearchingPrompt"
                                component={CancelBookingSearchingPrompt}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="NavigationHomeService"
                                component={NavigationHomeService}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="BookingDetails"
                                component={BookingDetails}
                                options={({ route }) => ({
                                  headerShown: true,
                                  header: () => <AccountHeader title="Booking Details"/>,
                                })}
                              />
                              <Stack.Screen
                                name="Segment1"
                                component={Segment1}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="Segment11"
                                component={Segment11}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="ForgotPasswordConfirmation"
                                component={ForgotPasswordConfirmation}
                                options={({ route }) => ({
                                  headerShown: true,
                                  header: () => <AccountHeader title="Forgot Password"/>,
                                })}
                              />
                              <Stack.Screen
                                name="ForgotPasswordUpdated"
                                component={ForgotPasswordUpdated}
                                options={({ route }) => ({
                                  headerShown: true,
                                  header: () => <AccountHeader title="Forgot Password"/>,
                                })}
                              />
                              <Stack.Screen
                                name="SetNewPassword"
                                component={SetNewPassword}
                                options={({ route }) => ({
                                  headerShown: true,
                                  header: () => <AccountHeader title="Forgot Password"/>,
                                })}
                              />
                              <Stack.Screen
                                name="ForgotPasswordResendCode"
                                component={ForgotPasswordResendCode}
                                options={({ route }) => ({
                                  headerShown: true,
                                  header: () => <AccountHeader title="Forgot Password"/>,
                                })}
                              />
                              <Stack.Screen
                                name="ForgotPasswordCode"
                                component={ForgotPasswordCode}
                                options={({ route }) => ({
                                  headerShown: true,
                                  header: () => <AccountHeader title="Forgot Password"/>,
                                })}
                              />
                              <Stack.Screen
                                name="SignUp"
                                component={SignUp}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="SignIn"
                                component={SignIn}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="Onboarding3"
                                component={Onboarding3}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="Onboarding2"
                                component={Onboarding2}
                                options={{ headerShown: false }}
                                // options={(props) => ({
                                //   headerShown: true,
                                //   header: () => <Frame1 />,
                                // })}
                              />
                              <Stack.Screen
                                name="Splash"
                                component={Splash}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="Tab22"
                                component={Tab22}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="EReceipt"
                                component={EReceipt}
                                options={({ route }) => ({
                                  headerShown: true,
                                  header: () => <AccountHeader title="EReceipt"/>,
                                })}
                              />
                              <Stack.Screen
                                name="HistoryBookings"
                                component={HistoryBookings}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="Tab23"
                                component={Tab23}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="Tab12"
                                component={Tab12}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="ActiveBookings"
                                component={ActiveBookings}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="Tab13"
                                component={Tab13}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="ServiceProvidersFound"
                                component={ServiceProvidersFound}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <SearchAndFoundServiceProvidersHeader />,
                                })}
                              />
                              <Stack.Screen
                                name="SearchingServiceProviders"
                                component={SearchingServiceProviders}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <SearchAndFoundServiceProvidersHeader />,
                                })}
                              />
                              <Stack.Screen
                                name="PaymentMethod"
                                component={PaymentMethod}
                                options={({ route }) => ({
                                  headerShown: true,
                                  header: () => <AccountHeader title="Payment Method"/>,
                                })}
                              />
                              <Stack.Screen
                                name="ReviewSummary"
                                component={ReviewSummary}
                                options={(props) => ({
                                  headerShown: true,
                                  header: () => <ReviewSummaryHeader />,
                                })}
                              />
                              <Stack.Screen
                                name="MapsConfirmLocation"
                                component={MapsConfirmLocation}
                              />

                              <Stack.Screen
                                name="SearchingDistanceRadius"
                                component={SearchingDistanceRadius}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="MapsEditLocationDetailsNo"
                                component={MapsEditLocationDetailsNo}
                                options={{ headerShown: false }}
                              />
                              <Stack.Screen
                                name="Authentication"
                                component={Authentication}
                                options={{ headerShown: false }}
                              />
                            </Stack.Navigator>
                          ) : (
                            <Splash />
                          )}
                        </NavigationContainer>
                        <Toast ref={(ref) => Toast.setRef(ref)} />
                      </ReviewSummaryProvider>
                    </AddressSelectedProvider>
                  </UserDetailsProvider>
                </EditLocationProvider>
              </SelectedBookingAddressProvider>
            </SearchingContextProvider>
          </DateTimeProvider>
        </AddAddressProvider>
      </ApplicationProvider>
    </>
  );
};
export default App;

