import * as React from "react";
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { useState, useEffect, useRef } from "react";
import AddButton from "./AddButton";
import { Padding, Color, Border, FontSize, FontFamily } from "../GlobalStyles";

const AddMinusStepper = ({ initialValue, onIncrement, onDecrement, onRemove }) => {
  const [value, setValue] = useState(initialValue);

  const handleIncrement = () => {
    setValue(value + 1);
    onIncrement();
  };

  const handleDecrement = () => {
    // if (value >= 1) {
    //   setValue(value - 1);
    //   onDecrement();
    // } else if(value == 0){
    //   onRemove();
    // 
    setValue(value - 1);
    onDecrement();
    if (value === 1) {
      onRemove();
    } 
  };
  //   if (value > 1) {
  //     setValue(value - 1);
  //     onDecrement();
  //   } 
  //   else{
  //     onRemove();
  //   }
  // };

  return (
    <View style={styles.frameWrapper}>
      <View style={[styles.minusBtnParent, styles.add2FlexBox]}>
        <TouchableOpacity
          onPress={handleDecrement}
          style={[styles.minusBtn, styles.btnBorder]}
        >
          <View style={[styles.add2, styles.add2FlexBox]}>
            <View style={styles.add2Child} />
          </View>
        </TouchableOpacity>
        <Text style={styles.text}>{value}</Text>
        <TouchableOpacity
          onPress={handleIncrement}
          style={[styles.plusBtn, styles.btnBorder]}
        >
          <Image
            style={styles.add2Icon}
            contentFit="cover"
            source={require("../assets/add-22.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// const AddMinusStepper = ({ initialValue, onValueChange }) => {
//   const [value, setValue] = useState(initialValue);

//   const incrementValue = () => {
//     setValue(value + 1);
//     onValueChange(value + 1);
//   };

//   const decrementValue = () => {
//     if (value > 1) {
//       setValue(value - 1);
//       onValueChange(value - 1);
//     } else {
//       onValueChange(0);
//     }
//   };

//   return (
//     <View style={styles.frameWrapper}>
//       <View style={[styles.minusBtnParent, styles.add2FlexBox]}>
//         <TouchableOpacity
//           onPress={decrementValue}
//           style={[styles.minusBtn, styles.btnBorder]}
//         >
//           <View style={[styles.add2, styles.add2FlexBox]}>
//             <View style={styles.add2Child} />
//           </View>
//         </TouchableOpacity>
//         <Text style={styles.text}>{value}</Text>
//         <TouchableOpacity
//           onPress={incrementValue}
//           style={[styles.plusBtn, styles.btnBorder]}
//         >
//           <Image
//             style={styles.add2Icon}
//             contentFit="cover"
//             source={require("../assets/add-22.png")}
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };
// const AddMinusStepper = ({ initialValue}) => {
//   const [value, setValue] = useState(initialValue);
//   const [isVisible, setIsVisible] = useState(true);

//   const incrementValue = () => {
//     setValue(value + 1);
//   };

//   const decrementValue = () => {
//     if (value > 1) {
//       setValue(value - 1);
//     } else {
//       setIsVisible(false);
//     }
//   };

//   const toggleVisibility = () => {
//     setIsVisible(!isVisible);
//   };

//   return isVisible? (
//     <View>
//     <AddButton onPress={toggleVisibility}></AddButton>
//     <View style={styles.frameWrapper}>
//       <View style={[styles.minusBtnParent, styles.add2FlexBox]}>
//         <TouchableOpacity
//           onPress={decrementValue}
//           style={[styles.minusBtn, styles.btnBorder]}
//         >
//           <View style={[styles.add2, styles.add2FlexBox]}>
//             <View style={styles.add2Child} />
//           </View>
//         </TouchableOpacity>
//         <Text style={styles.text}>{value}</Text>
//         <TouchableOpacity
//           onPress={incrementValue}
//           style={[styles.plusBtn, styles.btnBorder]}
//         >
//           <Image
//             style={styles.add2Icon}
//             contentFit="cover"
//             source={require("../assets/add-22.png")}
//           />
//         </TouchableOpacity>
//       </View>
      
//     </View>

//     </View>

//   ) : null;
// };

// const AddMinusStepper = ({ initialValue, onValueChange}) => {
//   const [value, setValue] = useState(initialValue);
//   const [isVisible, setIsVisible] = useState(true);

//   const incrementValue = () => {
//     setValue(value + 1);
//     onValueChange(value + 1);
//   };

//   const decrementValue = () => {
//     if (value > 1) {
//       setValue(value - 1);
//       onValueChange(value - 1);
//     } else {
//       setIsVisible(false);
//       onValueChange(0);
//     }
//   };

//   const toggleVisibility = () => {
//     setIsVisible(!isVisible);
//   };


//   return isVisible? (
//     <View>
//     <AddButton onPress={toggleVisibility}></AddButton>
//     <View style={styles.frameWrapper}>
//       <View style={[styles.minusBtnParent, styles.add2FlexBox]}>
//         <TouchableOpacity
//           onPress={decrementValue}
//           style={[styles.minusBtn, styles.btnBorder]}
//         >
//           <View style={[styles.add2, styles.add2FlexBox]}>
//             <View style={styles.add2Child} />
//           </View>
//         </TouchableOpacity>
//         <Text style={styles.text}>{value}</Text>
//         <TouchableOpacity
//           onPress={incrementValue}
//           style={[styles.plusBtn, styles.btnBorder]}
//         >
//           <Image
//             style={styles.add2Icon}
//             contentFit="cover"
//             source={require("../assets/add-22.png")}
//           />
//         </TouchableOpacity>
//       </View>
      
//     </View>

//     </View>

//   ) : null;
// };


const styles = StyleSheet.create({
  add2FlexBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  btnBorder: {
    padding: Padding.p_2xs,
    borderRadius: Border.br_xs,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  add2Child: {
    borderTopWidth: 2.5,
    height: 3,
    width: 13,
    borderColor: Color.colorDarkslategray_500,
    borderStyle: "solid",
  },
  add2: {
    paddingHorizontal: 0,
    paddingVertical: 5,
  },
  text: {
    fontSize: FontSize.title4Regular18_size,
    letterSpacing: 0.5,
    fontFamily: FontFamily.title4Regular18,
    color: Color.colorDarkslategray_600,
    textAlign: "center",
    marginLeft: 2,
    flex: 1,
  },
  add2Icon: {
    height: 14,
    overflow: "hidden",
    width: 14,
  },
  plusBtn: {
    borderWidth: 1,
    backgroundColor: Color.colorSteelblue_100,
    // backgroundColor: Color.colorGainsboro_300,
    borderColor: Color.colorSteelblue_100,
    // borderStyle: "solid",
    marginLeft: 2,
  },
  minusBtn: {
    borderWidth: 1,
    // backgroundColor: Color.colorSteelblue_100,
    backgroundColor: Color.colorGainsboro_300,
    borderColor: Color.colorDarkslategray_500,
    borderStyle: "solid",
  },
  minusBtnParent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  frameWrapper: {
    width: 105,
    marginLeft: 13,
    justifyContent: "center",
    flexDirection: "row",
  },
});

export default AddMinusStepper;
