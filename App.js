import * as React from "react";
import * as eva from "@eva-design/eva";
import { IconRegistry, ApplicationProvider } from "@ui-kitten/components";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Toast from "react-native-toast-message";
import { enableLatestRenderer } from "react-native-maps";

// Components
import Frame from "./components/Frame";
import Frame1 from "./components/Frame1";
import Frame2 from "./components/Frame2";

import Header from "./components/Header";
import Header1 from "./components/Header";
import Header11 from "./components/Header1";
import Header2 from "./components/Header2";
import Header3 from "./components/Header3";
import Header4 from "./components/Header4";
import Header5 from "./components/Header5";
import Header6 from "./components/Header6";
import Header7 from "./components/Header7";
import Header8 from "./components/Header8";
import Header9 from "./components/Header9";
import Header91 from "./components/Header9";

import Header10 from "./components/Header10";
import Header111 from "./components/Header11";

import Header12 from "./components/Header12";
import Header13 from "./components/Header13";
import Header14 from "./components/Header14";
import Header15 from "./components/Header15";
import Header16 from "./components/Header16";
import Header17 from "./components/Header17";
import Header171 from "./components/Header17";

import Header18 from "./components/Header18";
import Header181 from "./components/Header18";

import Header19 from "./components/Header19";
import Header191 from "./components/Header19";

import Header20 from "./components/Header20";
import Header201 from "./components/Header20";

import Header21 from "./components/Header21";
import Header22 from "./components/Header22";
import Header23 from "./components/Header23";
import Header24 from "./components/Header24";
import Header25 from "./components/Header25";
import Header26 from "./components/Header26";
import Header27 from "./components/Header27";
import Header28 from "./components/Header28";
import Header29 from "./components/Header29";
import Header30 from "./components/Header30";
import Header31 from "./components/Header31";
import Header32 from "./components/Header32";
import Header33 from "./components/Header33";
import Header34 from "./components/Header34";
import Header35 from "./components/Header35";
import Header36 from "./components/Header36";
import Header37 from "./components/Header37";
import Header38 from "./components/Header38";
import Header39 from "./components/Header39";
import Header40 from "./components/Header40";
import Header41 from "./components/Header41";
import Header42 from "./components/Header42";
import Header43 from "./components/Header43";
import Header44 from "./components/Header44";
import Header45 from "./components/Header45";
import Header46 from "./components/Header46";
import Header47 from "./components/Header47";
import Header48 from "./components/Header48";
import Header49 from "./components/Header49";
import Header50 from "./components/Header50";
import Header51 from "./components/Header51";
import Header52 from "./components/Header52";
import Header53 from "./components/Header53";
import Header54 from "./components/Header54";
import HeaderAddress from "./components/HeaderAddress";
import HeaderLocationAddress from "./components/HeaderLocationAddress";

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
import ComponentsTopNavigation2 from "./components/ComponentsTopNavigation2";
import ComponentsTopNavigation3 from "./components/ComponentsTopNavigation3";
import ComponentsTopNavigation4 from "./components/ComponentsTopNavigation4";
import ComponentsTopNavigation5 from "./components/ComponentsTopNavigation5";
import ComponentsTopNavigation6 from "./components/ComponentsTopNavigation6";

import LogoutModal from "./components/LogoutModal";
import OriginalLocationModal from "./components/OriginalLocationModal";
import MultipleLocationModal from "./components/MultipleLocationModal";
import EditAddress from "./components/EditAddress";
import ModalDatePicker from "./components/ModalDatePicker";
import ModalTimePicker from "./components/ModalTimePicker";
import TimeDateModal from "./components/TimeDateModal";
import BookingTimelineModal from "./components/BookingTimelineModal";
import EditAddressModal from "./components/EditAddressModal";
import SearchAddressModal from "./components/SearchAddressModal";
import EditLocationDetailsModal from "./components/EditLocationDetailsModal";
import SearchingDistanceRadiusModal from "./components/SearchingDistanceRadiusModal";
import SearchingServiceProviderModal from "./components/SearchingServiceProviderModal";
import CancelBookingPrompt from "./components/CancelBookingPrompt";
import CancelBookingSearching from "./components/CancelBookingSearching";

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
import AuthenticationResendCode from "./screens/AuthenticationResendCode";

import Homepage from "./screens/Homepage";
import BookingsActive from "./screens/BookingsActive";
import BookingsHistory from "./screens/BookingsHistory";
import EmptyBookingsActive from "./screens/EmptyBookingsActive";
import EmptyBookingsHistory from "./screens/EmptyBookingsHistory";
import Notifications from "./screens/Notifications";
import NotificationsEmpty from "./screens/NotificationsEmpty";
import UserProfile from "./screens/UserProfile";

import EditProfile from "./screens/EditProfile";
import ChangePassword from "./screens/ChangePassword";
import ChangePasswordUpdated from "./screens/ChangePasswordUpdated";
import PaymentOptions from "./screens/PaymentOptions";
import AddCard from "./screens/AddCard";
import NotificationsSettings from "./screens/NotificationsSettings";
import HelpCenterFAQ from "./screens/HelpCenterFAQ";
import HelpCenterAboutUs from "./screens/HelpCenterAboutUs";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import TermsAndConditions from "./screens/TermsAndConditions";
import ChangeAddresses from "./screens/ChangeAddresses";
import EditLocationAddresses from "./screens/EditLocationAddresses";
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
import ForgotPasswordConfirmation1 from "./screens/ForgotPasswordConfirmation1";
import ForgotPasswordCode from "./screens/ForgotPasswordCode";
import ForgotPasswordResendCode from "./screens/ForgotPasswordResendCode";
import SetNewPassword from "./screens/SetNewPassword";
import ForgotPasswordUpdated from "./screens/ForgotPasswordUpdated";

// Locations
import EditAddressIconComplete from "./screens/EditAddressIconComplete";
import SearchAddressEditAddress from "./screens/SearchAddressEditAddress";
import AddNewAddress from "./screens/AddNewAddress";
import SearchAddressAddNewAddres from "./screens/SearchAddressAddNewAddres";

import MapsConfirmLocation from "./screens/MapsConfirmLocation";
import MapsEditLocationDetailsNo from "./screens/MapsEditLocationDetailsNo";
import SavedPlacesNoInput from "./screens/SavedPlacesNoInput";
import SearchingDistanceRadius from "./screens/SearchingDistanceRadius";

// Review Summary
import ReviewSummary from "./screens/ReviewSummary";
import PaymentMethod from "./screens/PaymentMethod";
import SearchingServiceProviders from "./screens/SearchingServiceProviders";
import ServiceProvidersFound from "./screens/ServiceProvidersFound";

// Receipt
import EReceipt from "./screens/EReceipt";
import BookingDetails from "./screens/BookingDetails";
import BookingDetailsViewTimeline from "./screens/BookingDetailsViewTimeline";
import NavigationHomeService from "./screens/NavigationHomeService";

import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

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

  enableLatestRenderer();


  
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
          header: () => <Header42 />,
        })}
      />
      <Tab.Screen
        name="BookingsActive"
        component={BookingsActive}
        options={(props) => ({
          headerShown: true,
          header: () => <Header42 />,
        })}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={(props) => ({
          headerShown: true,
          header: () => <Header42 />,
        })}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={(props) => ({
          headerShown: true,
          header: () => <Header1 />,
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
    }, 10000);
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
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Frame />,
                              })}
                            />
                            <Stack.Screen
                              name="Header"
                              component={Header}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header />,
                              })}
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
                              name="Header1"
                              component={Header1}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header1 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header11"
                              component={Header11}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header11 />,
                              })}
                            />
                            <Stack.Screen
                              name="EditProfile"
                              component={EditProfile}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header11 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header2"
                              component={Header2}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header2 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header3"
                              component={Header3}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header3 />,
                              })}
                            />
                            <Stack.Screen
                              name="ChangePasswordUpdated"
                              component={ChangePasswordUpdated}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header3 />,
                              })}
                            />
                            <Stack.Screen
                              name="ChangePassword"
                              component={ChangePassword}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header2 />,
                              })}
                            />
                            <Stack.Screen
                              name="Addresses"
                              component={Addresses}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <HeaderLocationAddress />,
                              })}
                            />
                            <Stack.Screen
                              name="AddressesProfile"
                              component={AddressesProfile}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <HeaderLocationAddress />,
                              })}
                            />
                            <Stack.Screen
                              name="ChangeAddresses"
                              component={ChangeAddresses}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <HeaderAddress />,
                              })}
                            />
                            <Stack.Screen
                              name="EditLocationAddresses"
                              component={EditLocationAddresses}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <HeaderAddress />,
                              })}
                            />
                            <Stack.Screen
                              name="Header4"
                              component={Header4}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header4 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header5"
                              component={Header5}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header5 />,
                              })}
                            />
                            <Stack.Screen
                              name="AddCard"
                              component={AddCard}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header5 />,
                              })}
                            />
                            <Stack.Screen
                              name="PaymentOptions"
                              component={PaymentOptions}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header4 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header6"
                              component={Header6}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header6 />,
                              })}
                            />
                            <Stack.Screen
                              name="NotificationsSettings"
                              component={NotificationsSettings}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header6 />,
                              })}
                            />
                            <Stack.Screen
                              name="TermsAndConditions"
                              component={TermsAndConditions}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header54 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header7"
                              component={Header7}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header7 />,
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
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header7 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header8"
                              component={Header8}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header8 />,
                              })}
                            />
                            <Stack.Screen
                              name="PrivacyPolicy"
                              component={PrivacyPolicy}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header8 />,
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
                              name="Header9"
                              component={Header9}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header9 />,
                              })}
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
                              name="SearchAddressAddNewAddres"
                              component={SearchAddressAddNewAddres}
                              options={{ headerShown: false }}
                            />
                            <Stack.Screen
                              name="EditAddress"
                              component={EditAddress}
                              options={{ headerShown: false }}
                            />
                            <Stack.Screen
                              name="EditAddressModal"
                              component={EditAddressModal}
                              options={{ headerShown: false }}
                            />
                            <Stack.Screen
                              name="SearchAddressModal"
                              component={SearchAddressModal}
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
                              name="Header42"
                              component={Header42}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header42 />,
                              })}
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
                              name="Header43"
                              component={Header43}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header43 />,
                              })}
                            />
                            <Stack.Screen
                              name="PlumbingInstallationSubcateg"
                              component={PlumbingInstallationSubcateg}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header43 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header44"
                              component={Header44}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header44 />,
                              })}
                            />
                            <Stack.Screen
                              name="PlumbingRepairsSubcategory"
                              component={PlumbingRepairsSubcategory}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header44 />,
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
                              name="Header45"
                              component={Header45}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header45 />,
                              })}
                            />
                            <Stack.Screen
                              name="ElectricalInstallationSubcat"
                              component={ElectricalInstallationSubcat}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header45 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header46"
                              component={Header46}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header46 />,
                              })}
                            />
                            <Stack.Screen
                              name="ElectricalRepairsSubcategory"
                              component={ElectricalRepairsSubcategory}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header46 />,
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
                              name="Header47"
                              component={Header47}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header47 />,
                              })}
                            />
                            <Stack.Screen
                              name="ModalDatePicker"
                              component={ModalDatePicker}
                              options={{ headerShown: false }}
                            />
                            <Stack.Screen
                              name="ModalTimePicker"
                              component={ModalTimePicker}
                              options={{ headerShown: false }}
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
                                header: () => <Header47 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header48"
                              component={Header48}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header48 />,
                              })}
                            />
                            <Stack.Screen
                              name="DeepCleaningSubcategory"
                              component={DeepCleaningSubcategory}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header48 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header49"
                              component={Header49}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header49 />,
                              })}
                            />
                            <Stack.Screen
                              name="ElectronicApplianceCleaning"
                              component={ElectronicApplianceCleaning}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header49 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header50"
                              component={Header50}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header50 />,
                              })}
                            />
                            <Stack.Screen
                              name="PestControlSubcategory"
                              component={PestControlSubcategory}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header50 />,
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
                              name="Header51"
                              component={Header51}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header51 />,
                              })}
                            />
                            <Stack.Screen
                              name="DogTrainingSubcategoryBlue"
                              component={DogTrainingSubcategoryBlue}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header51 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header52"
                              component={Header52}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header52 />,
                              })}
                            />
                            <Stack.Screen
                              name="PetGroomingSubcategoryDog"
                              component={PetGroomingSubcategoryDog}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header52 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header53"
                              component={Header53}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header53 />,
                              })}
                            />
                            <Stack.Screen
                              name="PetSittingSubcategoryDog"
                              component={PetSittingSubcategoryDog}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header53 />,
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
                              name="Header10"
                              component={Header10}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header10 />,
                              })}
                            />
                            <Stack.Screen
                              name="GardenMaintenanceSubcategory"
                              component={GardenMaintenanceSubcategory}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header10 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header111"
                              component={Header111}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header111 />,
                              })}
                            />
                            <Stack.Screen
                              name="LandscapeDesignSubcategory"
                              component={LandscapeDesignSubcategory}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header111 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header12"
                              component={Header12}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header12 />,
                              })}
                            />
                            <Stack.Screen
                              name="IrrigationSystemSubcategory"
                              component={IrrigationSystemSubcategory}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header12 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header13"
                              component={Header13}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header13 />,
                              })}
                            />
                            <Stack.Screen
                              name="PestDiseaseManagementSubc"
                              component={PestDiseaseManagementSubc}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header13 />,
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
                              name="Header14"
                              component={Header14}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header14 />,
                              })}
                            />
                            <Stack.Screen
                              name="CarpentryInstallationSubcate"
                              component={CarpentryInstallationSubcate}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header14 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header15"
                              component={Header15}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header15 />,
                              })}
                            />
                            <Stack.Screen
                              name="CarpentryRepairsSubcategory"
                              component={CarpentryRepairsSubcategory}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header15 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header16"
                              component={Header16}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header16 />,
                              })}
                            />
                            <Stack.Screen
                              name="CarpentryFurnitureSubcategor"
                              component={CarpentryFurnitureSubcategor}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header16 />,
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
                              name="CancelBookingSearching"
                              component={CancelBookingSearching}
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
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header35 />,
                              })}
                            />
                            <Stack.Screen
                              name="BookingsHistory"
                              component={BookingsHistory}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header />,
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
                              name="Frame"
                              component={Frame}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Frame />,
                              })}
                            />
                            <Stack.Screen
                              name="Frame1"
                              component={Frame1}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Frame1 />,
                              })}
                            />
                            <Stack.Screen
                              name="Frame2"
                              component={Frame2}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Frame2 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header36"
                              component={Header36}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header36 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header37"
                              component={Header37}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header37 />,
                              })}
                            />
                            <Stack.Screen
                              name="ForgotPasswordConfirmation"
                              component={ForgotPasswordConfirmation}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header37 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header38"
                              component={Header38}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header38 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header39"
                              component={Header39}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header39 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header40"
                              component={Header40}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header40 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header41"
                              component={Header41}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header41 />,
                              })}
                            />
                            <Stack.Screen
                              name="ForgotPasswordUpdated"
                              component={ForgotPasswordUpdated}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header41 />,
                              })}
                            />
                            <Stack.Screen
                              name="SetNewPassword"
                              component={SetNewPassword}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header40 />,
                              })}
                            />
                            <Stack.Screen
                              name="ForgotPasswordResendCode"
                              component={ForgotPasswordResendCode}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header39 />,
                              })}
                            />
                            <Stack.Screen
                              name="ForgotPasswordCode"
                              component={ForgotPasswordCode}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header38 />,
                              })}
                            />
                            <Stack.Screen
                              name="ForgotPasswordConfirmation1"
                              component={ForgotPasswordConfirmation1}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header36 />,
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
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Frame2 />,
                              })}
                            />
                            <Stack.Screen
                              name="Onboarding2"
                              component={Onboarding2}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Frame1 />,
                              })}
                            />
                            <Stack.Screen
                              name="Splash"
                              component={Splash}
                              options={{ headerShown: false }}
                            />
                            <Stack.Screen
                              name="OriginalLocationModal"
                              component={OriginalLocationModal}
                              options={{ headerShown: false }}
                            />
                            <Stack.Screen
                              name="Header17"
                              component={Header17}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header17 />,
                              })}
                            />
                            <Stack.Screen
                              name="Tab22"
                              component={Tab22}
                              options={{ headerShown: false }}
                            />
                            <Stack.Screen
                              name="Header34"
                              component={Header34}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header34 />,
                              })}
                            />
                            <Stack.Screen
                              name="EReceipt"
                              component={EReceipt}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header34 />,
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
                              name="Header35"
                              component={Header35}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header35 />,
                              })}
                            />
                            <Stack.Screen
                              name="BookingTimelineModal"
                              component={BookingTimelineModal}
                              options={{ headerShown: false }}
                            />
                            <Stack.Screen
                              name="SearchAddressEditAddress"
                              component={SearchAddressEditAddress}
                              options={{ headerShown: false }}
                            />
                            <Stack.Screen
                              name="NotificationsEmpty"
                              component={NotificationsEmpty}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header18 />,
                              })}
                            />
                            <Stack.Screen
                              name="EmptyBookingsHistory"
                              component={EmptyBookingsHistory}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header19 />,
                              })}
                            />
                            <Stack.Screen
                              name="EmptyBookingsActive"
                              component={EmptyBookingsActive}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header20 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header18"
                              component={Header18}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header18 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header19"
                              component={Header19}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header19 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header20"
                              component={Header20}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header20 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header91"
                              component={Header91}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header91 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header171"
                              component={Header171}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header171 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header181"
                              component={Header181}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header181 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header191"
                              component={Header191}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header191 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header201"
                              component={Header201}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header201 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header21"
                              component={Header21}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header21 />,
                              })}
                            />
                            <Stack.Screen
                              name="ComponentsTopNavigation2"
                              component={ComponentsTopNavigation2}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <ComponentsTopNavigation2 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header22"
                              component={Header22}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header22 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header23"
                              component={Header23}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header23 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header24"
                              component={Header24}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header24 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header25"
                              component={Header25}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header25 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header26"
                              component={Header26}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header26 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header27"
                              component={Header27}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header27 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header28"
                              component={Header28}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header28 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header29"
                              component={Header29}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header29 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header30"
                              component={Header30}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header30 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header31"
                              component={Header31}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header31 />,
                              })}
                            />
                            <Stack.Screen
                              name="Header32"
                              component={Header32}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header32 />,
                              })}
                            />
                            <Stack.Screen
                              name="ServiceProvidersFound"
                              component={ServiceProvidersFound}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header23 />,
                              })}
                            />
                            <Stack.Screen
                              name="BookingDetailsViewTimeline"
                              component={BookingDetailsViewTimeline}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header181 />,
                              })}
                            />
                            <Stack.Screen
                              name="SearchingServiceProviders"
                              component={SearchingServiceProviders}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header23 />,
                              })}
                            />
                            <Stack.Screen
                              name="PaymentMethod"
                              component={PaymentMethod}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header22 />,
                              })}
                            />
                            <Stack.Screen
                              name="ReviewSummary"
                              component={ReviewSummary}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header21 />,
                              })}
                            />
                            <Stack.Screen
                              name="HelpCenterAboutUs"
                              component={HelpCenterAboutUs}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header191 />,
                              })}
                            />
                            <Stack.Screen
                              name="MapsConfirmLocation"
                              component={MapsConfirmLocation}
                              // initialParams={{ latitudeHeader: null, longitudeHeader: null }}
                              // options={(props) => ({
                              //   headerShown: true,
                              //   header: () => <ComponentsTopNavigation2 />,
                              // })}
                            />

                            <Stack.Screen
                              name="SearchingDistanceRadius"
                              component={SearchingDistanceRadius}
                              options={{ headerShown: false }}
                            />
                            <Stack.Screen
                              name="SavedPlacesNoInput"
                              component={SavedPlacesNoInput}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header24 />,
                              })}
                            />
                            <Stack.Screen
                              name="MapsEditLocationDetailsNo"
                              component={MapsEditLocationDetailsNo}
                              options={{ headerShown: false }}
                            />
                            <Stack.Screen
                              name="Header33"
                              component={Header33}
                              options={(props) => ({
                                headerShown: true,
                                header: () => <Header33 />,
                              })}
                            />
                            <Stack.Screen
                              name="Authentication"
                              component={Authentication}
                              options={{ headerShown: false }}
                            />
                            <Stack.Screen
                              name="AuthenticationResendCode"
                              component={AuthenticationResendCode}
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

