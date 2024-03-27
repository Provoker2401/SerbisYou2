import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { FontFamily, Color, Padding } from "../GlobalStyles";

const window = Dimensions.get('window').width;

const Splash = () => {
  return (
    <View style={[styles.splash]}>
      <View style={[styles.splashFlexBox]}>
        <Image
          alt="SerbisYou Logo" // Add alt attribute here
          style={[styles.splashLayout]}
          contentFit="cover"
          testID="serbisyou-logo" 
          source={require("../assets/SerbisYouLogo1.png")}
        />
        <Text style={styles.serbisyou}>SerbisYou</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  splashFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  splashLayout: {
    width: 200, // Set your desired logo width
    height: 200, // Set your desired logo height
    // width: window - 40, // Take the screen width and subtract the padding
    // height: (window - 40) * (200 / 200), // Adjust the height based on your image's aspect ratio
    // maxWidth: '100%', // Ensure the image does not exceed the container's width
    // maxHeight: '100%', // Adjust the maximum height as needed
    resizeMode: 'contain',
  },
  serbisyouwhite1Icon: {
    maxWidth: "100%",
    maxHeight: "100%",
    alignSelf: "stretch",
    // height: 150,
    // width: 250,
  },
  serbisyou: {
    fontSize: 36,
    letterSpacing: 0.9,
    fontWeight: "700",
    fontFamily: FontFamily.title2Bold32,
    color: Color.white,
    textAlign: "center",
    alignSelf: "stretch",
  },
  serbisyouwhite1Parent: {
    width: 190,
    height: 254,
    paddingHorizontal: 0,
    paddingVertical: Padding.p_11xl,
  },
  splash: {
    backgroundColor: Color.colorDarkslategray_900,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    // paddingHorizontal: 20,
  },
});

export default Splash;
// import * as React from "react";
// import { Image } from "expo-image";
// import { StyleSheet, Text, View } from "react-native";
// import { FontFamily, Color, Padding } from "../GlobalStyles";

// const Splash = () => {
//   return (
//     <View style={[styles.splash, styles.splashFlexBox]}>
//       <View style={[styles.serbisyouwhite1Parent, styles.splashFlexBox]}>
//         <Image
//           style={[styles.serbisyouwhite1Icon, styles.splashLayout]}
//           contentFit="cover"
//           source={require("../assets/SerbisYouLogo.png")}
//         />
//         <Text style={styles.serbisyou}>SerbisYou</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   splashFlexBox: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   splashLayout: {
//     overflow: "hidden",
//     width: "100%",
//     height: "100%",
//     flex: 1,
//   },
//   serbisyouwhite1Icon: {
//     maxWidth: "100%",
//     maxHeight: "100%",
//     alignSelf: "stretch",
//     // height: 150,
//     // width: 250,
//   },
//   serbisyou: {
//     fontSize: 36,
//     letterSpacing: 0.9,
//     fontWeight: "700",
//     fontFamily: FontFamily.title2Bold32,
//     color: Color.white,
//     textAlign: "center",
//     alignSelf: "stretch",
//   },
//   serbisyouwhite1Parent: {
//     width: 190,
//     height: 254,
//     paddingHorizontal: 0,
//     paddingVertical: Padding.p_11xl,
//   },
//   splash: {
//     backgroundColor: Color.colorDarkslategray_900,
//     height: 812,
//     flexDirection: "row",
//     paddingLeft: 92,
//     paddingRight: 93,
//     overflow: "hidden",
//     width: "100%",
//     flex: 1,
//   },
// });

// export default Splash;
