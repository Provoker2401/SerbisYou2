import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { useState } from "react";
import { Padding, Color, Border, FontSize, FontFamily } from "../GlobalStyles";

const AddMinusStepper = ({ initialValue, onIncrement, onDecrement, onRemove }) => {
  const [value, setValue] = useState(initialValue);

  const handleIncrement = () => {
    setValue(value + 1);
    onIncrement();
  };

  const handleDecrement = () => {
    setValue(value - 1);
    onDecrement();
    if (value === 1) {
      onRemove();
    } 
  };

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
    borderColor: Color.colorSteelblue_100,
    marginLeft: 2,
  },
  minusBtn: {
    borderWidth: 1,
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
