import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import PrivacyPolicy from "../screens/PrivacyPolicy";

describe("Privacy Policy component", () => {
  test("renders correctly", () => {
    render(<PrivacyPolicy />);
  });

  // Renders a ScrollView with contentContainerStyle set to styles.bodyScrollViewContent

  test("contains privacy policy text", () => {
    const tree = render(<PrivacyPolicy />);
    const privacyPolicyText = tree.root.findByProps({ testID: "privacy-policy-text" });
    expect(privacyPolicyText.props.children).toBeTruthy();
  });

  
  test("contains  Use of Your Personal Data", () => {
    const tree = render(<PrivacyPolicy />);
    const personaldatatitle = tree.root.findByProps({ testID: "personal-data-title" });
    expect(personaldatatitle.props.children).toBeTruthy();
  });

  test("contains disclosure title", () => {
    const tree = render(<PrivacyPolicy />);
    const disclosureTitle = tree.root.findByProps({ testID: "data-disclosure-title" });
    expect(disclosureTitle.props.children).toBe("3. Disclosure of your Personal Data");
  });

  test("contains disclosure description", () => {
    const tree = render(<PrivacyPolicy />);
    const disclosureDescription = tree.root.findByProps({ testID: "data-disclosure-description" });
    const expectedDescription = "We understand the importance of safeguarding your data. While we may share your data with trusted service providers for essential app operations such as hosting and analytics, rest assured that your data is never sold or shared for marketing purposes. In situations where legal compliance or partnerships necessitate data sharing, we ensure stringent measures to protect your information. Additionally, in the event of any change in ownership or business structure, we commit to upholding the security of your data throughout the transition.";
    expect(disclosureDescription.props.children).toBe(expectedDescription);
  });
});
