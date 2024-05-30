import * as React from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Animated,
  LayoutAnimation,
  Pressable,
  Platform,
} from "react-native";
import { useState, useRef } from "react";
import { Image } from "expo-image";
import { toggleAnimation } from "../animations/toggleAnimation";
import { Padding, Border, FontFamily, FontSize, Color } from "../GlobalStyles";

const FAQsFrame = ({ style }) => {
  const animationController1 = useRef(new Animated.Value(0)).current;
  const animationController2 = useRef(new Animated.Value(0)).current;
  const animationController3 = useRef(new Animated.Value(0)).current;
  const animationController4 = useRef(new Animated.Value(0)).current;

  const [category, setCategory] = useState("");

  const [inquiry, setInquiry] = useState([
    {
      Question: "How to use SerbisYou?",
      Answer: `To use SerbisYou, first, choose your desired home service category from options like Plumbing, Electrical, Cleaning, and more. Each category will have its own set of subcategories; for instance, under Cleaning, you'll find options like Standard Cleaning, Deep Cleaning, and more. After selecting a subcategory, input your service preferences and details. The app will then provide a list of available service providers for you to browse through and select. Finally, confirm your booking details, choose a suitable appointment time, and your selected service provider will be on their way to assist you!`,
    },
    {
      Question: "How do I cancel a booking?",
      Answer: `To use SerbisYou, first, choose your desired home service category from options like Plumbing, Electrical, Cleaning, and more. Each category will have its own set of subcategories; for instance, under Cleaning, you'll find options like Standard Cleaning, Deep Cleaning, and more. After selecting a subcategory, input your service preferences and details. The app will then provide a list of available service providers for you to browse through and select. Finally, confirm your booking details, choose a suitable appointment time, and your selected service provider will be on their way to assist you!`,
    },
    {
      Question: "How to use SerbisYou?",
      Answer: `To use SerbisYou, first, choose your desired home service category from options like Plumbing, Electrical, Cleaning, and more. Each category will have its own set of subcategories; for instance, under Cleaning, you'll find options like Standard Cleaning, Deep Cleaning, and more. After selecting a subcategory, input your service preferences and details. The app will then provide a list of available service providers for you to browse through and select. Finally, confirm your booking details, choose a suitable appointment time, and your selected service provider will be on their way to assist you!`,
    },
    {
      Question: "How do I cancel a booking?",
      Answer: `To use SerbisYou, first, choose your desired home service category from options like Plumbing, Electrical, Cleaning, and more. Each category will have its own set of subcategories; for instance, under Cleaning, you'll find options like Standard Cleaning, Deep Cleaning, and more. After selecting a subcategory, input your service preferences and details. The app will then provide a list of available service providers for you to browse through and select. Finally, confirm your booking details, choose a suitable appointment time, and your selected service provider will be on their way to assist you!`,
    },
  ]);
  const [account, setAccount] = useState([
    {
      Question: "What personal data does SerbisYou collect about me?",
      Answer: `When you create an account on SerbisYou, we collect only the information that is necessary to provide you with our services. This includes your name, email address, phone number, and payment information. We do not share your personal information with any third parties without your explicit consent.`,
    },
    {
      Question: "How is my account data stored and secured?",
      Answer: `SerbisYou uses Firestore database security, a fully managed, scalable, and serverless NoSQL document database provided by Google Cloud.Your account data is protected by customizable identity-based security access controls and data validation via a configuration language, integrated with Firebase Authentication and Identity Platform.`,
    },
    {
      Question: "Can I trust SerbisYou with my personal information?",
      Answer: `Yes, you can trust SerbisYou with your personal information. We take the privacy and security of our users' data seriously and have implemented robust measures to protect your information. Additionally, we adhere to industry best practices and comply with relevant data protection regulations to ensure the safety of your personal data.`,
    },
    {
      Question: "How can I update my account information in SerbisYou?",
      Answer: `To update your account information, simply log in to your SerbisYou account and navigate to the "Account Settings" or "Profile" section of the app. From there, you can edit your name, contact information, and other relevant details. Make sure to save your changes before exiting the page.`,
    },
    {
      Question: "Can I access my account from different mobile phones?",
      Answer: `Yes, you can access your account from multiple devices. Firestore and Firebase handle user authentication and session management, allowing you to maintain your user presence across different devices.`,
    },
  ]);
  const [service, setService] = useState([
    {
      Question: "How long does it take to schedule a service?",
      Answer: `Users can schedule a service as soon as they need it or up to a month in advance, depending on availability. The scheduling process typically takes less than five minutes`,
    },
    {
      Question: "What is the cancellation policy?",
      Answer: `Users can cancel their service up to 24 hours before the scheduled appointment time without incurring any fees. If they cancel within 24 hours of the appointment time, they will be charged a cancellation fee.`,
    },
    {
      Question: "How do I choose a service provider on SerbisYou's mobile application?",
      Answer: `To choose a service provider on SerbisYou's mobile application, users have to wait for a service provider to accept their service requests. The acceptance rate and the time for the request to be accepted will depend on the location and given schedule of the user.`,
    },
    {
      Question: "Can I trust the service providers on SerbisYou?",
      Answer: `We carefully vet all service providers before they can join our platform. They undergo a thorough background check to ensure their credibility and expertise.`,
    },
    {
      Question: "What happens if I'm not satisfied with the service I received?",
      Answer: `If you're not satisfied with the service, please contact our customer support team, and we will work with you and the service provider to resolve the issue.`,
    },
    {
      Question: "How do I provide feedback on the service I received?",
      Answer: `After each service, you will have the opportunity to rate and provide feedback on the service provider. Your feedback helps us maintain a high standard of service quality.`,
    },
  ]);
  const [payment, setPayment] = useState([
    {
      Question: "How can I pay for the services I book through SerbisYou?",
      Answer: `You can pay for the services you book through SerbisYou using various payment methods, including credit/debit cards, digital wallets, and online banking, GCash, and Cash on Service. We support major payment providers to ensure a seamless and secure payment experience for our users.`,
    },
    {
      Question: "Is my payment information secure on SerbisYou?",
      Answer: `SerbisYou uses Firestore database and security to store data and sensitive personal information. Firestore offers robust access management and authentication through Firebase Authentication and Firestore Security Rules to handle serverless authentication, authorization, and data validation.`,
    },
    {
      Question: "Can I get a refund if I am not satisfied with the service?",
      Answer: `We understand that sometimes things may not go as planned. If you are not satisfied with the service you received, please contact our customer support team within 24 hours of the service completion. We will review your case and, if necessary, provide a refund or credit to your SerbisYou account.`,
    },
    {
      Question: "Are there any additional fees or charges for using SerbisYou?",
      Answer: `SerbisYou does not charge any additional fees for using our platform to book home services. However, some service providers may have their own fees or charges, which will be clearly stated in the service description. Please review the service details before booking to avoid any surprises.`,
    },
    {
      Question: "What are the best practices for preventing refund fraud in SerbisYou?",
      Answer: `SerbisYou can prevent refund fraud by asking drivers to verify deliveries when possible, identifying and blocking repeat offenders, and limiting cash refunds unless requests meet certain criteria.`,
    },
    {
      Question: "How can SerbisYou protect mobile banking transactions?",
      Answer: `SerbisYou can protect mobile banking transactions by removing static passwords and moving to strong customer authentication, using contextual authentication with behavioral analysis, and applying a secure communication protocol.`,
    },
  ]);

  const [expanded1, setExpanded1] = useState(
    new Array(inquiry.length).fill(false)
  );
  const [expanded2, setExpanded2] = useState(
    new Array(inquiry.length).fill(false)
  );
  const [expanded3, setExpanded3] = useState(
    new Array(inquiry.length).fill(false)
  );
  const [expanded4, setExpanded4] = useState(
    new Array(inquiry.length).fill(false)
  );

  const handleCategoryButtonPress = (category, value) => {
    // setCategory(value);
    if (category === "Property") {
      setCategory(value);
    }
  };

  const toggleListItem1 = (index) => {
    const config = {
      duration: 300,
      toValue: expanded1[index] ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController1, config).start();
    console.log(animationController1);
    LayoutAnimation.configureNext(toggleAnimation);
    // Create a copy of the expanded state array and toggle the item at the specified index
    const newExpanded = [...expanded1];
    newExpanded[index] = !expanded1[index];
    setExpanded1(newExpanded);
  };
  const toggleListItem2 = (index) => {
    const config = {
      duration: 300,
      toValue: expanded2[index] ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController2, config).start();
    console.log(animationController2);
    LayoutAnimation.configureNext(toggleAnimation);
    // Create a copy of the expanded state array and toggle the item at the specified index
    const newExpanded = [...expanded2];
    newExpanded[index] = !expanded2[index];
    setExpanded2(newExpanded);
  };
  const toggleListItem3 = (index) => {
    const config = {
      duration: 300,
      toValue: expanded3[index] ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController3, config).start();
    console.log(animationController3);
    LayoutAnimation.configureNext(toggleAnimation);
    // Create a copy of the expanded state array and toggle the item at the specified index
    const newExpanded = [...expanded3];
    newExpanded[index] = !expanded3[index];
    setExpanded3(newExpanded);
  };
  const toggleListItem4 = (index) => {
    const config = {
      duration: 300,
      toValue: expanded4[index] ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController4, config).start();
    console.log(animationController4);
    LayoutAnimation.configureNext(toggleAnimation);
    // Create a copy of the expanded state array and toggle the item at the specified index
    const newExpanded = [...expanded4];
    newExpanded[index] = !expanded4[index];
    setExpanded4(newExpanded);
  };

  return (
    <ScrollView
      style={[styles.faqsFrame]}
      contentContainerStyle={styles.frameFlexBox}
    >
      <View style={[styles.faqsFrame, style, styles.frameFlexBox]}>
        <ScrollView
          style={styles.chipsLayout}
          horizontal={true}
          contentContainerStyle={styles.containerParentFlexBox1}
        >
          <Pressable
            onPress={() => handleCategoryButtonPress("Property", "General")}
          >
            <View
              style={
                category == "General"
                  ? [styles.view, styles.viewFlexBox8]
                  : [styles.view1, styles.viewFlexBox8]
              }
            >
              <Text
                style={
                  category == "General"
                    ? [styles.general, styles.generalTypo]
                    : [styles.account, styles.generalTypo]
                }
              >
                General
              </Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => handleCategoryButtonPress("Property", "Account")}
          >
            <View
              style={
                category == "Account"
                  ? [styles.view, styles.viewFlexBox8]
                  : [styles.view1, styles.viewFlexBox8]
              }
            >
              <Text
                style={
                  category == "Account"
                    ? [styles.general, styles.generalTypo]
                    : [styles.account, styles.generalTypo]
                }
              >
                Account
              </Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => handleCategoryButtonPress("Property", "Service")}
          >
            <View
              style={
                category == "Service"
                  ? [styles.view, styles.viewFlexBox8]
                  : [styles.view1, styles.viewFlexBox8]
              }
            >
              <Text
                style={
                  category == "Service"
                    ? [styles.general, styles.generalTypo]
                    : [styles.account, styles.generalTypo]
                }
              >
                Service
              </Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => handleCategoryButtonPress("Property", "Payment")}
          >
            <View
              style={
                category == "Payment"
                  ? [styles.view, styles.viewFlexBox8]
                  : [styles.view1, styles.viewFlexBox8]
              }
            >
              <Text
                style={
                  category == "Payment"
                    ? [styles.general, styles.generalTypo]
                    : [styles.account, styles.generalTypo]
                }
              >
                Payment
              </Text>
            </View>
          </Pressable>
        </ScrollView>
        {category === "General" &&
          inquiry.map((item, index) => {
            return (
              <View
                style={[styles.firstQuestion1, styles.firstSpaceBlock]}
                key={index}
              >
                <View style={styles.totalShadowBox}>
                  <View
                    style={[styles.frameParent, styles.containerParentFlexBox]}
                  >
                    <Pressable
                      style={[
                        styles.titleLabelWrapper,
                        styles.containerParentFlexBox,
                      ]}
                      onPress={() => toggleListItem1(index)}
                    >
                      <View
                        style={[
                          styles.titleLabelWrapper,
                          styles.containerParentFlexBox,
                        ]}
                      >
                        <Text style={[styles.titleLabel, styles.labelLayout]}>
                          {item.Question}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.polygonDownGroup,
                          styles.containerParentFlexBox,
                        ]}
                      >
                        <Animated.Image
                          style={[
                            styles.polygonIconLayout,
                            {
                              transform: [
                                { rotate: expanded1[index] ? "180deg" : "0deg" },
                              ],
                            },
                          ]}
                          contentFit="cover"
                          source={require("../assets/polygon-up.png")}
                        ></Animated.Image>
                      </View>
                    </Pressable>
                  </View>

                  {expanded1[index] && (
                    <View style={styles.answerFrameFlexBox}>
                      <View
                        style={[styles.answerFrameInner, styles.frameFlexBox]}
                      >
                        <Image
                          style={styles.frameChild}
                          contentFit="cover"
                          source={require("../assets/line-13.png")}
                        />
                      </View>
                      <View
                        style={[
                          styles.titleLabelContainer,
                          styles.containerParentFlexBox,
                        ]}
                      >
                        <Text style={styles.titleLabel1}>{item.Answer}</Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        {category === "Account" &&
          account.map((item, index) => {
            return (
              <View
                style={[styles.firstQuestion1, styles.firstSpaceBlock]}
                key={index}
              >
                <View style={styles.totalShadowBox}>
                  <View
                    style={[styles.frameParent, styles.containerParentFlexBox]}
                  >
                    <Pressable
                      style={[
                        styles.titleLabelWrapper,
                        styles.containerParentFlexBox,
                      ]}
                      onPress={() => toggleListItem2(index)}
                    >
                      <View
                        style={[
                          styles.titleLabelWrapper,
                          styles.containerParentFlexBox,
                        ]}
                      >
                        <Text style={[styles.titleLabel, styles.labelLayout]}>
                          {item.Question}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.polygonDownGroup,
                          styles.containerParentFlexBox,
                        ]}
                      >
                        <Animated.Image
                          style={[
                            styles.polygonIconLayout,
                            {
                              transform: [
                                { rotate: expanded2[index] ? "180deg" : "0deg" },
                              ],
                            },
                          ]}
                          contentFit="cover"
                          source={require("../assets/polygon-up.png")}
                        ></Animated.Image>
                      </View>
                    </Pressable>
                  </View>

                  {expanded2[index] && (
                    <View style={styles.answerFrameFlexBox}>
                      <View
                        style={[styles.answerFrameInner, styles.frameFlexBox]}
                      >
                        <Image
                          style={styles.frameChild}
                          contentFit="cover"
                          source={require("../assets/line-13.png")}
                        />
                      </View>
                      <View
                        style={[
                          styles.titleLabelContainer,
                          styles.containerParentFlexBox,
                        ]}
                      >
                        <Text style={styles.titleLabel1}>{item.Answer}</Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
          {category === "Service" &&
          service.map((item, index) => {
            return (
              <View
                style={[styles.firstQuestion1, styles.firstSpaceBlock]}
                key={index}
              >
                <View style={styles.totalShadowBox}>
                  <View
                    style={[styles.frameParent, styles.containerParentFlexBox]}
                  >
                    <Pressable
                      style={[
                        styles.titleLabelWrapper,
                        styles.containerParentFlexBox,
                      ]}
                      onPress={() => toggleListItem3(index)}
                    >
                      <View
                        style={[
                          styles.titleLabelWrapper,
                          styles.containerParentFlexBox,
                        ]}
                      >
                        <Text style={[styles.titleLabel, styles.labelLayout]}>
                          {item.Question}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.polygonDownGroup,
                          styles.containerParentFlexBox,
                        ]}
                      >
                        <Animated.Image
                          style={[
                            styles.polygonIconLayout,
                            {
                              transform: [
                                { rotate: expanded3[index] ? "180deg" : "0deg" },
                              ],
                            },
                          ]}
                          contentFit="cover"
                          source={require("../assets/polygon-up.png")}
                        ></Animated.Image>
                      </View>
                    </Pressable>
                  </View>

                  {expanded3[index] && (
                    <View style={styles.answerFrameFlexBox}>
                      <View
                        style={[styles.answerFrameInner, styles.frameFlexBox]}
                      >
                        <Image
                          style={styles.frameChild}
                          contentFit="cover"
                          source={require("../assets/line-13.png")}
                        />
                      </View>
                      <View
                        style={[
                          styles.titleLabelContainer,
                          styles.containerParentFlexBox,
                        ]}
                      >
                        <Text style={styles.titleLabel1}>{item.Answer}</Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
          {category === "Payment" &&
          payment.map((item, index) => {
            return (
              <View
                style={[styles.firstQuestion1, styles.firstSpaceBlock]}
                key={index}
              >
                <View style={styles.totalShadowBox}>
                  <View
                    style={[styles.frameParent, styles.containerParentFlexBox]}
                  >
                    <Pressable
                      style={[
                        styles.titleLabelWrapper,
                        styles.containerParentFlexBox,
                      ]}
                      onPress={() => toggleListItem4(index)}
                    >
                      <View
                        style={[
                          styles.titleLabelWrapper,
                          styles.containerParentFlexBox,
                        ]}
                      >
                        <Text style={[styles.titleLabel, styles.labelLayout]}>
                          {item.Question}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.polygonDownGroup,
                          styles.containerParentFlexBox,
                        ]}
                      >
                        <Animated.Image
                          style={[
                            styles.polygonIconLayout,
                            {
                              transform: [
                                { rotate: expanded4[index] ? "180deg" : "0deg" },
                              ],
                            },
                          ]}
                          contentFit="cover"
                          source={require("../assets/polygon-up.png")}
                        ></Animated.Image>
                      </View>
                    </Pressable>
                  </View>

                  {expanded4[index] && (
                    <View style={styles.answerFrameFlexBox}>
                      <View
                        style={[styles.answerFrameInner, styles.frameFlexBox]}
                      >
                        <Image
                          style={styles.frameChild}
                          contentFit="cover"
                          source={require("../assets/line-13.png")}
                        />
                      </View>
                      <View
                        style={[
                          styles.titleLabelContainer
                        ]}
                      >
                        <Text style={styles.titleLabel1}>{item.Answer}</Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  chipsLayout: {
    width: "100%",
    alignSelf: "stretch",
  },
  frameFlexBox: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  containerParentFlexBox: {
    flexDirection: "row",
  },
  containerParentFlexBox1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "justify",
  },
  viewFlexBox8: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_mini,
    borderRadius: Border.br_13xl,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  generalTypo: {
    textAlign: "justify",
    fontFamily: FontFamily.level2Semibold12,
    fontWeight: "600",
    lineHeight: 22,
    fontSize: FontSize.body1Semibold_size,
  },
  firstSpaceBlock: {
    marginTop: 20,
    alignSelf: "stretch",
  },
  stateLayerPosition: {
    borderTopRightRadius: Border.br_9xs,
    borderTopLeftRadius: Border.br_9xs,
  },
  labelLayout: {
    lineHeight: 24,
    textAlign: "justify",
    flex: 1,
  },
  polygonIconLayout: {
    height: 10,
    width: 12,
    borderRadius: Border.br_12xs,
  },
  answerFrameFlexBox: {
    paddingTop: Padding.p_3xs,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  general: {
    color: Color.white,
  },
  view: {
    backgroundColor: Color.colorDarkslateblue_100,
    borderStyle: "solid",
    borderColor: Color.colorDarkslateblue_100,
    borderWidth: 2,
    marginRight: 8,
  },
  account: {
    color: Color.colorDarkslateblue_100,
  },
  view1: {
    borderStyle: "solid",
    borderColor: Color.colorDarkslateblue_100,
    borderWidth: 2,
    marginRight: 8,
  },
  chips: {
    alignSelf: "stretch",
    alignItems: "center",
  },
  iconssearch24px: {
    width: 24,
    height: 24,
  },
  stateLayer1: {
    padding: Padding.p_5xs,
    justifyContent: "center",
  },
  container: {
    borderRadius: Border.br_81xl,
    overflow: "hidden",
    justifyContent: "center",
  },
  leadingIcon: {
    width: 48,
    height: 48,
    justifyContent: "center",
  },
  labelText1: {
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    letterSpacing: 1,
    fontFamily: FontFamily.m3BodySmall,
    color: Color.colorGray_900,
  },
  content: {
    height: 40,
    flex: 1,
    justifyContent: "center",
  },
  stateLayer: {
    paddingRight: Padding.p_3xs,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
  },
  textField: {
    borderRadius: Border.br_5xs,
    backgroundColor: Color.colorDarkslateblue_300,
    alignSelf: "stretch",
  },
  textFieldSearch: {
    borderTopRightRadius: Border.br_9xs,
    borderTopLeftRadius: Border.br_9xs,
  },
  titleLabel: {
    fontSize: FontSize.title4Regular18_size,
    fontWeight: "700",
    fontFamily: FontFamily.title2Bold32,
    color: Color.colorGray_1000,
  },
  titleLabelWrapper: {
    flex: 1,
  },
  polygonDownIcon: {
    top: 15,
    left: 15,
    zIndex: 0,
    position: "absolute",
    width: 15,
  },
  polygonUpIcon: {
    top: 0,
    left: 0,
    zIndex: 1,
    position: "absolute",
    width: 15,
    display: "none",
  },
  polygonDownParent: {
    marginLeft: 10,
    justifyContent: "center",
  },
  frameParent: {
    justifyContent: "center",
    alignSelf: "stretch",
  },
  frameChild: {
    maxWidth: "100%",
    maxHeight: "100%",
    width: "100%",
    opacity: 0.3,
    overflow: "hidden",
    flex: 1,
    alignSelf: "stretch",
  },
  answerFrameInner: {
    height: 1,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  titleLabel1: {
    fontSize: FontSize.level2Medium12_size,
    letterSpacing: 0,
    lineHeight: 14,
    fontWeight: "500",
    fontFamily: FontFamily.level2Medium12,
    textAlign: Platform.OS === 'android' ? 'justify' : 'left', // Justify on Android only
  },
  titleLabelContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  answerFrame: {
    display: "none",
  },
  totalShadowBox: {
    padding: Padding.p_mini,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 10,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 1)",
    backgroundColor: Color.white,
    borderRadius: Border.br_xl,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  firstQuestion: {
    display: "none",
    justifyContent: "center",
    alignItems: "center",
  },
  polygonDownIcon1: {
    width: 12,
    height: 10,
    borderRadius: Border.br_12xs,
  },
  polygonUpIcon1: {
    // marginLeft: 10,
  },
  polygonDownGroup: {
    marginTop: 6,
    marginLeft: 10,
    justifyContent: "center",
  },
  firstQuestion1: {
    justifyContent: "center",
    alignItems: "center",
  },
  faqsFrame: {
    paddingHorizontal: 3,
    paddingTop: Padding.p_3xs,
    marginBottom: 20,
    paddingBottom: 10,
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: Color.colorWhitesmoke_100,
  },
});

export default FAQsFrame;
