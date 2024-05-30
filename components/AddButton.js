import * as React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Border, Padding } from "../GlobalStyles";

const AddButton = ({ title, onPress, backgroundColor, borderColor, color }) => {
  return (
    <View style={[styles.addBtnWrapper, styles.btnWrapperFlexBox]}>
      <Pressable
        style={[styles.minusBtnParent, styles.petParentFlexBox]}
        onPress={onPress}
      >
        <View style={[{backgroundColor, borderColor}, styles.addBtnInner, styles.addInnerFlexBox]}>
          <View style={[styles.minusBtnParent, styles.petParentFlexBox]}>
            <Text style={[styles.addTypo, {color}]}>{title}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  addBtnWrapper: {
    paddingLeft: 10,
  },
  petParentFlexBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  btnWrapperFlexBox: {
    marginLeft: 13,
    width: 103,
    justifyContent: "center",
    flexDirection: "row",
  },
  minusBtnParent: {
    flexDirection: "row",
    flex: 1,
  },
  addInnerFlexBox: {
    paddingHorizontal: Padding.p_2xs,
    borderRadius: Border.br_xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  addTypo: {
    fontFamily: FontFamily.title4Regular18,
    fontSize: FontSize.title4Regular18_size,
    textAlign: "center",
    letterSpacing: 0.5,
    flex: 1,
  },
  addBtnInner: {
    borderWidth: 1,
    padding: 6,
    borderStyle: "solid",
    flex: 1,
  },
});

export default AddButton;
