import * as React from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from "react-native";
import { Color, FontSize, FontFamily, Padding, Border } from "../GlobalStyles";

const TermsAndConditions = () => {
  return (
    <View style={styles.termsAndConditions}>
      <StatusBar barStyle="default" />
      <ScrollView
        style={styles.body}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.bodyScrollViewContent}
      >
        <View style={[styles.frameParent, styles.frameParentSpaceBlock]}>
          <View
            style={[
              styles.typesOfDataWeCollectParent,
              styles.frameParentFlexBox,
            ]}
          >
            <Text style={[styles.typesOfData2, styles.policy3Clr]}>
              AGREEMENT TO OUR LEGAL TERMS
            </Text>
            <Text
              style={[styles.policy1Description, styles.descriptionSpaceBlock]}
            >{`We are SerbisYOU, a company registered in the Philippines at University of San Carlos, Talamban, Cebu City 6000. We operate the mobile application SerbisYOU Provider, as well as any other related products and services that refer or link to these legal terms.

The Legal Terms form a binding agreement between the user, whether as an individual or representing an entity, and the SerbisYOU Provider. This agreement governs the user's use of and access to the mobile app services. By using the services, the user confirms having read, comprehended, and accepted all the Legal Terms. If the user does not agree to all the Legal Terms, they are explicitly prohibited from using the services and must stop using them immediately.

Supplemental terms and conditions or documents that may be posted on the Services from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Legal Terms at any time and for any reason. We will alert you about any changes by updating the "Last updated" date of these Legal Terms, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Legal Terms to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Legal Terms by your continued use of the Services after the date such revised Legal Terms are posted.

The Services are intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Services.`}</Text>
          </View>
          <View
            style={[
              styles.useOfYourPersonalDataParent,
              styles.frameParentFlexBox,
            ]}
          >
            <Text style={[styles.typesOfData, styles.policy3Clr]}>
              TABLE OF CONTENTS
            </Text>
            <Text
              style={[styles.policy2Description, styles.descriptionSpaceBlock]}
            >{`1. OUR SERVICES
2. INTELLECTUAL PROPERTY RIGHTS
3. USER REGISTRATION
4. PURCHASES AND PAYMENT
5. POLICY
6. USER DATA
7. CONTACT US`}</Text>
          </View>
          <View
            style={[
              styles.useOfYourPersonalDataParent,
              styles.frameParentFlexBox,
            ]}
          >
            <Text style={[styles.typesOfData, styles.policy3Clr]}>
              1. OUR SERVICES
            </Text>
            <Text
              style={[styles.policy1Description, styles.descriptionSpaceBlock]}
            >
              The information provided when using the Services is not intended
              for distribution to or use by any person or entity in any
              jurisdiction or country where such distribution or use would be
              contrary to law or regulation or which would subject us to any
              registration requirement within such jurisdiction or country.
              Accordingly, those persons who choose to access the Services from
              other locations do so on their own initiative and are solely
              responsible for compliance with local laws, if and to the extent
              local laws are applicable.
            </Text>
          </View>
          <View
            style={[
              styles.useOfYourPersonalDataParent,
              styles.frameParentFlexBox,
            ]}
          >
            <Text style={[styles.typesOfData, styles.policy3Clr]}>
              2. INTELLECTUAL PROPERTY RIGHTS
            </Text>
            <Text
              style={[
                styles.policy3DescriptionContainer,
                styles.descriptionSpaceBlock,
              ]}
            >
              <Text
                style={styles.ourIntellectualProperty}
              >{`Our intellectual property 
`}</Text>
              <Text style={styles.weAreThe}>{`
We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the "Content"), as well as the trademarks, service marks, and logos contained therein (the "Marks"). Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world. The Content and Marks are provided in or through the Services "AS IS" for your personal, non-commercial use or internal business purpose only.`}</Text>
            </Text>
            <Text
              style={[
                styles.policy3DescriptionContainer,
                styles.descriptionSpaceBlock,
              ]}
            >
              <Text
                style={styles.ourIntellectualProperty}
              >{`Your use of our Services
`}</Text>
              <Text style={styles.weAreThe}>{`
Subject to your compliance with these Legal Terms, including the "PROHIBITED ACTIVITIES" section below, we grant you a non-exclusive, non-transferable, revocable license to:

\u2022 access the Services; 
\u2022 and download or print a copy of any portion of the Content to which you have properly gained access.

solely for your personal, non-commercial use or internal business purpose.

Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.

If you wish to make any use of the Services, Content, or Marks other than as set out in this section or elsewhere in our Legal Terms, please address your request to: serbisyouapp@gmail.com. If we ever grant you the permission to post, reproduce, or publicly display any part of our Services or Content, you must identify us as the owners or licensors of the Services, Content, or Marks and ensure that any copyright or proprietary notice appears or is visible on posting, reproducing, or displaying our Content.

We reserve all rights not expressly granted to you in and to the Services, Content, and Marks.

Any breach of these Intellectual Property Rights will constitute a material breach of our Legal Terms and your right to use our Services will terminate immediately.`}</Text>
            </Text>
          </View>
          <View
            style={[
              styles.frameParentFlexBox,
            ]}
          >
            <Text
              style={[
                styles.policy3DescriptionContainer2,
                styles.policy3ContainerTypo,
              ]}
            >
              <Text
                style={styles.ourIntellectualProperty}
              >{`Your submissions and contributions
`}</Text>
              <Text style={styles.weAreThe}>{`
Please review this section and the "PROHIBITED ACTIVITIES" section carefully prior to using our Services to understand the (a) rights you give us and (b) obligations you have when you post or upload any content through the Services.

`}</Text>
              <Text style={styles.ourIntellectualProperty}>Submissions:</Text>
              <Text
                style={styles.weAreThe}
              >{` By directly sending us any question, comment, suggestion, idea, feedback, or other information about the Services ("Submissions"), you agree to assign to us all intellectual property rights in such Submission. You agree that we shall own this Submission and be entitled to its unrestricted use and dissemination for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you. 

`}</Text>
              <Text style={styles.ourIntellectualProperty}>Contributions:</Text>
              <Text
                style={styles.weAreThe}
              >{` The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality during which you may create, submit, post, display, transmit, publish, distribute, or broadcast content and materials to us or through the Services, including but not limited to text, writings, video, audio, photographs, music, graphics, comments, reviews, rating suggestions, personal information, or other material ("Contributions"). Any Submission that is publicly posted shall also be treated as a Contribution. You understand that Contributions may be viewable by other users of the Services.

`}</Text>
              <Text style={styles.ourIntellectualProperty}>
                You are responsible for what you post or upload:
              </Text>
              <Text
                style={styles.weAreThe}
              >{` By sending us Submissions and/or posting Contributions through any part of the Services or making Contributions accessible through the Services by linking your account through the Services to any of your social networking accounts, you:

\u2022 confirm that you have read and agree with our "PROHIBITED ACTIVITIES" and will not post, send, publish, upload, or transmit through the Services any Submission nor post any Contribution that is illegal, harassing, hateful, harmful, defamatory, obscene, bullying, abusive, discriminatory, threatening to any person or group, sexually explicit, false, inaccurate, deceitful, or misleading;
\u2022 to the extent permissible by applicable law, waive any and all moral rights to any such Submission and/or Contribution; 
\u2022 warrant that any such Submission and/or Contributions are original to you or that you have the necessary rights and licenses to submit such Submissions and/or Contributions and that you have full authority to grant us the abovementioned rights in relation to your Submissions and/or Contributions; 
\u2022 and warrant and represent that your Submissions and/or Contributions do not constitute confidential information.`}</Text>
            </Text>
          </View>
          <Text style={[styles.typesOfData, styles.policy3Clr]}>
3. USER REGISTRATION
          </Text>
          <View
            style={[
              styles.useOfYourPersonalDataParent,
              styles.frameParentFlexBox,
            ]}
          >
            <Text
              style={[styles.policy3Description1, styles.policy3ContainerTypo]}
            >
              You may be required to register to use the Services. You agree to
              keep your password confidential and will be responsible for all
              use of your account and password. We reserve the right to remove,
              reclaim, or change a username you select if we determine, in our
              sole discretion, that such username is inappropriate, obscene, or
              otherwise objectionable.
            </Text>
          </View>
          
        <Text style={[styles.disclosureOfYour3, styles.policy3Clr]}>
          4. PURCHASES AND PAYMENT
        </Text>
        <View style={[styles.useOfYourPersonalDataParent, styles.frameParentFlexBox]}>
          <Text
            style={[styles.policy3Description2, styles.disclosureLayout]}
          >{`We accept the following forms of payment:

- Visa 
- Mastercard 
- PayPal 
- GCash
 - Cash On Hand

You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed. Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time. All payments shall be in Pesos.

You agree to pay all charges at the prices then in effect for your purchases and any applicable shipping fees, and you authorize us to charge your chosen payment provider for any such amounts upon placing your order. If your order is subject to recurring charges, then you consent to our charging your payment method on a recurring basis without requiring your prior approval for each recurring charge, until such time as you cancel the applicable order. We reserve the right to correct any errors or mistakes in pricing, even if we have already requested or received payment.

We reserve the right to refuse any order placed through the Services. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. These restrictions may include orders placed by or under the same customer account, the same payment method, and/or orders that use the same billing or shipping address. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers, or distributors.`}</Text>
        </View>
        <Text style={[styles.disclosureOfYour4, styles.policy3Clr]}>
          5. POLICY
        </Text>
        <View
            style={[
              styles.useOfYourPersonalDataParent,
              styles.frameParentFlexBox,
            ]}
        >
          <Text style={[styles.policy3Description1, styles.policy3ContainerTypo]}>
            All sales are final and no refund will be issued.
          </Text>
        </View>
        <Text style={[styles.disclosureOfYour3, styles.policy3Clr]}>
          6. USER DATA
        </Text>
        <View
            style={[
              styles.useOfYourPersonalDataParent,
              styles.frameParentFlexBox,
            ]}
        >
          <Text style={[styles.policy3Description1, styles.policy3ContainerTypo]}>
            We will maintain certain data that you transmit to the Services for
            the purpose of managing the performance of the Services, as well as
            data relating to your use of the Services. Although we perform regular
            routine backups of data, you are solely responsible for all data that
            you transmit or that relates to any activity you have undertaken using
            the Services. You agree that we shall have no liability to you for any
            loss or corruption of any such data, and you hereby waive any right of
            action against us arising from any such loss or corruption of such
            data.
          </Text>
        </View>
        <Text style={[styles.disclosureOfYour3, styles.policy3Clr]}>
          7. CONTACT US
        </Text>
        <View
            style={[
              styles.useOfYourPersonalDataParent,
              styles.frameParentFlexBox,
            ]}
        >
          <Text
            style={[styles.policy3Description1, styles.policy3ContainerTypo]}
          >
            <Text
              style={styles.weAreThe}
            >
            {`In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at: 
  `}</Text>
        <Text style={styles.ourIntellectualProperty}>{
`
SerbisYOU 
University of San Carlos 
Talamban 
Cebu City 6000 
Philippines 
Phone: 09457955547 
serbisyouapp@gmail.com`}</Text>
          </Text>
        </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1a244d",
  },
  bodyScrollViewContent: {
    flexDirection: "column",
    paddingHorizontal: 0,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  frameParentFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  frameParentSpaceBlock: {
    paddingVertical: 0,
    alignSelf: "stretch",
  },
  policy3Clr: {
    color: Color.colorGray_1000,
    alignSelf: "stretch",
  },
  descriptionSpaceBlock: {
    marginTop: 10,
    lineHeight: 14,
    letterSpacing: 0,
    fontSize: FontSize.typographyTaglineSmallRegular_size,
    color: Color.colorGray_1000,
    alignSelf: "stretch",
  },
  policy3ContainerTypo: {
    lineHeight: 14,
    letterSpacing: 0,
    fontSize: FontSize.typographyTaglineSmallRegular_size,
    textAlign: "justify",
  },
  disclosureLayout: {
    // width: 331,
    color: Color.colorGray_1000,
  },
  labelTypo: {
    marginTop: 4,
    fontSize: FontSize.level2Medium12_size,
    fontFamily: FontFamily.m3LabelMedium,
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 1,
    textAlign: "center",
    alignSelf: "stretch",
  },
  segmentSpaceBlock: {
    opacity: 0.8,
    paddingBottom: Padding.p_base,
    paddingTop: Padding.p_xs,
    width: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainerFlexBox: {
    borderRadius: Border.br_base,
    justifyContent: "center",
    overflow: "hidden",
    alignItems: "center",
  },
  iconLayout: {
    height: 30,
    width: 26,
    overflow: "hidden",
  },
  typesOfData: {
    textAlign: "left",
    lineHeight: 24,
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    fontFamily: FontFamily.title2Bold32,
    // fontWeight: "700",
  },
  typesOfData2: {
    textAlign: "center",
    lineHeight: 24,
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    fontFamily: FontFamily.interExtraBold,
    // fontWeight: "700",
  },
  policy1Description: {
    textAlign: "justify",
    fontFamily: FontFamily.title4Regular18,
  },
  typesOfDataWeCollectParent: {
    alignSelf: "stretch",
  },
  policy2Description: {
    fontFamily: FontFamily.title4Regular18,
    textAlign: "left",
  },
  useOfYourPersonalDataParent: {
    marginTop: 20,
    alignSelf: "stretch",
  },
  useOfYourPersonalDataParent1: {
    marginBottom: 20,
    alignSelf: "stretch",
  },
  ourIntellectualProperty: {
    fontFamily: FontFamily.title2Bold32,
    // fontWeight: "700",
  },
  weAreThe: {
    fontFamily: FontFamily.title4Regular18,
  },
  policy3DescriptionContainer: {
    textAlign: "justify",
  },
  policy3DescriptionContainer2: {
    textAlign: "justify",
    color: Color.colorGray_1000,
    alignSelf: "stretch",
  },
  disclosureOfYour2: {
    marginTop: 20,
    textAlign: "left",
    lineHeight: 24,
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    fontFamily: FontFamily.title2Bold32,
    // fontWeight: "700",
  },
  policy3Description1: {
    textAlign: "justify",
    fontFamily: FontFamily.title4Regular18,
    color: Color.colorGray_1000,
    alignSelf: "stretch",
  },
  frameParent: {
    paddingHorizontal: Padding.p_3xl,
    justifyContent: "center",
    alignItems: "center",
  },
  disclosureOfYour3: {
    marginTop: 15,
    textAlign: "left",
    lineHeight: 24,
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    fontFamily: FontFamily.title2Bold32,
    // fontWeight: "700",
  },
  disclosureOfYour4: {
    // marginTop: ,
    textAlign: "left",
    lineHeight: 24,
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    fontFamily: FontFamily.title2Bold32,
    // fontWeight: "700",
  },
  policy3Description2: {
    textAlign: "justify",
    fontFamily: FontFamily.title4Regular18,
    lineHeight: 14,
    letterSpacing: 0,
    fontSize: FontSize.typographyTaglineSmallRegular_size,
  },
  frameView: {
    width: 338,
    marginTop: 15,
  },
  policy3Description3: {
    marginTop: 15,
    textAlign: "justify",
    fontFamily: FontFamily.title4Regular18,
    lineHeight: 14,
    letterSpacing: 0,
    fontSize: FontSize.typographyTaglineSmallRegular_size,
  },
  policy3DescriptionContainer3: {
    marginTop: 15,
    textAlign: "justify",
    lineHeight: 14,
    letterSpacing: 0,
    fontSize: FontSize.typographyTaglineSmallRegular_size,
  },
  body: {
    backgroundColor: Color.colorWhitesmoke_100,
    alignSelf: "stretch",
    flex: 1,
  },
  stateFlexBox: {
    paddingVertical: Padding.p_9xs,
    paddingHorizontal: Padding.p_xl,
    height: 32,
    width: 64,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  labelText: {
    color: Color.colorDimgray_200,
  },
  segment1: {
    paddingBottom: Padding.p_base,
    paddingTop: Padding.p_xs,
    width: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  icon2: {
    height: 26,
    overflow: "hidden",
    width: 24,
  },
  labelText1: {
    color: Color.m3SysLightOnSurfaceVariant,
  },
  segment2: {
    height: 80,
  },
  icon4: {
    zIndex: 0,
  },
  badgeLabel: {
    marginTop: -7,
    marginLeft: -7,
    top: "50%",
    left: "50%",
    fontSize: FontSize.m3LabelSmall_size,
    display: "flex",
    width: 14,
    height: 14,
    position: "absolute",
    fontFamily: FontFamily.m3LabelMedium,
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 1,
    textAlign: "center",
    color: Color.colorBackgroundSurfaceWhite,
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    top: 2,
    left: 35,
    borderRadius: Border.br_81xl,
    backgroundColor: Color.m3SysLightError,
    width: 12,
    height: 12,
    display: "none",
    zIndex: 1,
    position: "absolute",
    overflow: "hidden",
  },
  iconContainer3: {
    backgroundColor: Color.colorLightblue,
  },
  labelText3: {
    color: Color.colorDarkslateblue_200,
  },
  navigationBarHome: {
    borderTopLeftRadius: Border.br_9xs,
    borderTopRightRadius: Border.br_9xs,
    justifyContent: "space-between",
    paddingHorizontal: Padding.p_5xs,
    flexDirection: "row",
    backgroundColor: Color.colorBackgroundSurfaceWhite,
  },
  termsAndConditions: {
    height: 812,
    width: "100%",
    flex: 1,
    backgroundColor: Color.colorBackgroundSurfaceWhite,
  },
});

export default TermsAndConditions;
