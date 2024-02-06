import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Color, FontSize, FontFamily, Border, Padding } from "../GlobalStyles";

const ModalTimePicker = ({ onClose }) => {
  return (
    <View style={styles.modalTimePicker}>
      <View style={styles.header}>
        <Text style={styles.title}>Select time</Text>
      </View>
      <View style={[styles.inputSelection, styles.actionsFlexBox]}>
        <View style={styles.input}>
          <View style={styles.input}>
            <View style={[styles.hourInput, styles.defaultFlexBox]}>
              <View style={[styles.selected, styles.amFlexBox]}>
                <Text style={[styles.timeText, styles.timeFlexBox]}>07</Text>
              </View>
            </View>
            <Text style={[styles.separator, styles.hourClr]}>:</Text>
            <View style={[styles.minuteInput, styles.selectedLayout]}>
              <View style={[styles.default, styles.defaultFlexBox]}>
                <Text style={[styles.timeText1, styles.hourClr]}>00</Text>
              </View>
            </View>
          </View>
          <View style={[styles.buildingBlocksperiodSelecto, styles.amBorder]}>
            <View style={[styles.am, styles.amBorder]}>
              <View style={[styles.stateLayer, styles.stateFlexBox]}>
                <Text style={[styles.label, styles.hourTypo]}>AM</Text>
              </View>
            </View>
            <View style={[styles.pm, styles.amBorder]}>
              <View style={[styles.stateLayer, styles.stateFlexBox]}>
                <Text style={[styles.label1, styles.hourTypo]}>PM</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.clockFace12Hour}>
          <Image
            style={[styles.centerEllipseIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/center-ellipse.png")}
          />
          <View style={[styles.hour12, styles.hourPosition11]}>
            <View style={[styles.container, styles.stateFlexBox]}>
              <View style={[styles.stateLayer2, styles.stateFlexBox]}>
                <Text style={[styles.hour, styles.hourTypo]}>12</Text>
              </View>
            </View>
          </View>
          <View style={[styles.hour11, styles.hourPosition8]}>
            <View style={[styles.container, styles.stateFlexBox]}>
              <View style={[styles.stateLayer2, styles.stateFlexBox]}>
                <Text style={[styles.hour, styles.hourTypo]}>11</Text>
              </View>
            </View>
          </View>
          <View style={[styles.hour10, styles.hourPosition5]}>
            <View style={[styles.container, styles.stateFlexBox]}>
              <View style={[styles.stateLayer2, styles.stateFlexBox]}>
                <Text style={[styles.hour, styles.hourTypo]}>10</Text>
              </View>
            </View>
          </View>
          <View style={[styles.hour9, styles.hourPosition4]}>
            <View style={[styles.container, styles.stateFlexBox]}>
              <View style={[styles.stateLayer2, styles.stateFlexBox]}>
                <Text style={[styles.hour, styles.hourTypo]}>9</Text>
              </View>
            </View>
          </View>
          <View style={[styles.hour8, styles.hourPosition3]}>
            <View style={[styles.container, styles.stateFlexBox]}>
              <View style={[styles.stateLayer2, styles.stateFlexBox]}>
                <Text style={[styles.hour, styles.hourTypo]}>8</Text>
              </View>
            </View>
          </View>
          <View style={[styles.hour7, styles.hourPosition2]}>
            <Image
              style={[styles.buildingBlockshourLineIcon, styles.iconLayout]}
              contentFit="cover"
              source={require("../assets/building-blockshourline.png")}
            />
            <View style={[styles.container5, styles.containerFlexBox]}>
              <View style={[styles.stateLayer2, styles.stateFlexBox]}>
                <Text style={[styles.hour5, styles.hourTypo]}>7</Text>
              </View>
            </View>
          </View>
          <View style={[styles.hour6, styles.hourPosition11]}>
            <View style={[styles.container, styles.stateFlexBox]}>
              <View style={[styles.stateLayer2, styles.stateFlexBox]}>
                <Text style={[styles.hour, styles.hourTypo]}>6</Text>
              </View>
            </View>
          </View>
          <View style={[styles.hour51, styles.hourPosition1]}>
            <View style={[styles.container, styles.stateFlexBox]}>
              <View style={[styles.stateLayer2, styles.stateFlexBox]}>
                <Text style={[styles.hour, styles.hourTypo]}>5</Text>
              </View>
            </View>
          </View>
          <View style={[styles.hour41, styles.hourPosition]}>
            <View style={[styles.container, styles.stateFlexBox]}>
              <View style={[styles.stateLayer2, styles.stateFlexBox]}>
                <Text style={[styles.hour, styles.hourTypo]}>4</Text>
              </View>
            </View>
          </View>
          <View style={[styles.hour31, styles.hourPosition4]}>
            <View style={[styles.container, styles.stateFlexBox]}>
              <View style={[styles.stateLayer2, styles.stateFlexBox]}>
                <Text style={[styles.hour, styles.hourTypo]}>3</Text>
              </View>
            </View>
          </View>
          <View style={[styles.hour21, styles.hourPosition]}>
            <View style={[styles.container, styles.stateFlexBox]}>
              <View style={[styles.stateLayer2, styles.stateFlexBox]}>
                <Text style={[styles.hour, styles.hourTypo]}>2</Text>
              </View>
            </View>
          </View>
          <View style={[styles.hour18, styles.hourPosition1]}>
            <View style={[styles.container, styles.stateFlexBox]}>
              <View style={[styles.stateLayer2, styles.stateFlexBox]}>
                <Text style={[styles.hour, styles.hourTypo]}>1</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.actions, styles.actionsFlexBox]}>
        <View style={[styles.stateLayer2, styles.stateFlexBox]}>
          <View style={[styles.container12, styles.containerFlexBox]}>
            <View style={[styles.stateLayer14, styles.stateFlexBox]}>
              <Image
                style={styles.iconskeyboard24px}
                contentFit="cover"
                source={require("../assets/iconskeyboard-24px.png")}
              />
            </View>
          </View>
        </View>
        <View style={styles.input}>
          <View style={styles.containerFlexBox}>
            <View style={[styles.stateLayer15, styles.stateFlexBox]}>
              <Text style={[styles.labelText, styles.labelTypo]}>Cancel</Text>
            </View>
          </View>
          <View
            style={[styles.buttontextenabledfalse1, styles.containerFlexBox]}
          >
            <View style={[styles.stateLayer15, styles.stateFlexBox]}>
              <Text style={[styles.labelText, styles.labelTypo]}>OK</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionsFlexBox: {
    marginTop: 20,
    alignSelf: "stretch",
    alignItems: "center",
  },
  defaultFlexBox: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  amFlexBox: {
    backgroundColor: Color.colorSteelblue_100,
    alignSelf: "stretch",
    alignItems: "center",
  },
  timeFlexBox: {
    display: "flex",
    lineHeight: 64,
    fontSize: FontSize.size_38xl,
    height: 80,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  hourClr: {
    color: Color.m3SysLightOnSurface,
    fontFamily: FontFamily.m3BodySmall,
  },
  selectedLayout: {
    borderRadius: Border.br_5xs,
    overflow: "hidden",
  },
  amBorder: {
    borderColor: Color.colorGray_500,
    borderStyle: "solid",
  },
  stateFlexBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  hourTypo: {
    lineHeight: 24,
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    textAlign: "center",
  },
  iconLayout: {
    position: "absolute",
    overflow: "hidden",
    maxHeight: "100%",
    maxWidth: "100%",
  },
  hourPosition11: {
    left: "40.63%",
    right: "40.63%",
    width: "18.75%",
    height: "18.75%",
    position: "absolute",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  hourPosition8: {
    left: "21.09%",
    right: "60.16%",
    width: "18.75%",
    height: "18.75%",
    position: "absolute",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  hourPosition5: {
    left: "6.25%",
    right: "75%",
    width: "18.75%",
    height: "18.75%",
    position: "absolute",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  hourPosition4: {
    bottom: "40.63%",
    top: "40.63%",
    width: "18.75%",
    height: "18.75%",
    position: "absolute",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  hourPosition3: {
    bottom: "21.09%",
    top: "60.16%",
  },
  hourPosition2: {
    bottom: "6.25%",
    top: "75%",
  },
  containerFlexBox: {
    borderRadius: Border.br_81xl,
    justifyContent: "center",
    overflow: "hidden",
    alignItems: "center",
  },
  hourPosition1: {
    left: "60.16%",
    right: "21.09%",
    width: "18.75%",
    height: "18.75%",
    position: "absolute",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  hourPosition: {
    left: "75%",
    right: "6.25%",
    width: "18.75%",
    height: "18.75%",
    position: "absolute",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  labelTypo: {
    letterSpacing: 0,
    fontFamily: FontFamily.m3LabelLarge,
    fontWeight: "500",
  },
  title: {
    fontSize: FontSize.level2Medium12_size,
    lineHeight: 16,
    textAlign: "left",
    color: Color.colorDarkslategray_100,
    fontFamily: FontFamily.m3LabelLarge,
    fontWeight: "500",
    letterSpacing: 1,
  },
  header: {
    paddingTop: Padding.p_5xl,
    paddingHorizontal: Padding.p_5xl,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  timeText: {
    height: 80,
    color: Color.colorDarkslateblue_100,
    display: "flex",
    fontFamily: FontFamily.m3BodySmall,
    lineHeight: 64,
    fontSize: FontSize.size_38xl,
    width: 96,
  },
  selected: {
    borderRadius: Border.br_5xs,
    overflow: "hidden",
  },
  hourInput: {
    justifyContent: "center",
    width: 96,
  },
  separator: {
    width: 24,
    height: 80,
    display: "flex",
    lineHeight: 64,
    fontSize: FontSize.size_38xl,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    color: Color.m3SysLightOnSurface,
  },
  timeText1: {
    width: 97,
    height: 80,
    display: "flex",
    lineHeight: 64,
    fontSize: FontSize.size_38xl,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    color: Color.m3SysLightOnSurface,
  },
  default: {
    backgroundColor: Color.m3SysLightSurfaceVariant,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  minuteInput: {
    justifyContent: "center",
    width: 96,
    alignItems: "center",
  },
  input: {
    flexDirection: "row",
  },
  label: {
    color: Color.m3SysLightOnTertiaryContainer,
    letterSpacing: 0,
    fontFamily: FontFamily.m3LabelLarge,
    fontWeight: "500",
  },
  stateLayer: {
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: Padding.p_5xs,
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  am: {
    borderBottomWidth: 1,
    backgroundColor: Color.colorSteelblue_100,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  label1: {
    letterSpacing: 0,
    fontFamily: FontFamily.m3LabelLarge,
    fontWeight: "500",
    color: Color.colorDarkslategray_100,
  },
  pm: {
    borderTopWidth: 1,
    justifyContent: "center",
    flex: 1,
    alignSelf: "stretch",
    alignItems: "center",
  },
  buildingBlocksperiodSelecto: {
    borderWidth: 1,
    width: 52,
    marginLeft: 12,
    height: 80,
    borderRadius: Border.br_5xs,
    overflow: "hidden",
    backgroundColor: Color.white,
    borderStyle: "solid",
  },
  centerEllipseIcon: {
    height: "3.13%",
    width: "3.13%",
    top: "48.44%",
    right: "48.44%",
    bottom: "48.44%",
    left: "48.44%",
  },
  hour: {
    color: Color.m3SysLightOnSurface,
    fontFamily: FontFamily.m3BodySmall,
    letterSpacing: 1,
    fontSize: FontSize.bodyLgBodyLgRegular_size,
  },
  stateLayer2: {
    width: 48,
    height: 48,
    justifyContent: "center",
  },
  container: {
    justifyContent: "center",
    flexDirection: "row",
  },
  hour12: {
    top: "0.78%",
    bottom: "80.47%",
  },
  hour11: {
    bottom: "75%",
    top: "6.25%",
  },
  hour10: {
    bottom: "60.16%",
    top: "21.09%",
  },
  hour9: {
    right: "80.47%",
    left: "0.78%",
  },
  hour8: {
    left: "6.25%",
    right: "75%",
    width: "18.75%",
    height: "18.75%",
    position: "absolute",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  buildingBlockshourLineIcon: {
    height: "234.38%",
    width: "155.21%",
    top: "-134.37%",
    right: "-55.21%",
    bottom: "0%",
    left: "0%",
    zIndex: 0,
  },
  hour5: {
    color: Color.white,
    fontFamily: FontFamily.m3BodySmall,
    fontSize: FontSize.bodyLgBodyLgRegular_size,
    letterSpacing: 1,
  },
  container5: {
    backgroundColor: Color.colorDarkslateblue_100,
    zIndex: 1,
    flexDirection: "row",
  },
  hour7: {
    left: "21.09%",
    right: "60.16%",
    width: "18.75%",
    height: "18.75%",
    position: "absolute",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  hour6: {
    top: "80.47%",
    bottom: "0.78%",
  },
  hour51: {
    bottom: "6.25%",
    top: "75%",
  },
  hour41: {
    bottom: "21.09%",
    top: "60.16%",
  },
  hour31: {
    right: "0.78%",
    left: "80.47%",
  },
  hour21: {
    bottom: "60.16%",
    top: "21.09%",
  },
  hour18: {
    bottom: "75%",
    top: "6.25%",
  },
  clockFace12Hour: {
    borderRadius: 500,
    width: 256,
    height: 256,
    marginTop: 36,
    backgroundColor: Color.m3SysLightSurfaceVariant,
  },
  inputSelection: {
    paddingVertical: 0,
    flex: 1,
    paddingHorizontal: Padding.p_5xl,
  },
  iconskeyboard24px: {
    height: 24,
    width: 24,
  },
  stateLayer14: {
    padding: Padding.p_5xs,
    justifyContent: "center",
    flexDirection: "row",
  },
  container12: {
    flexDirection: "row",
  },
  labelText: {
    fontSize: FontSize.m3LabelLarge_size,
    lineHeight: 20,
    textAlign: "center",
    letterSpacing: 0,
    color: Color.colorDarkslateblue_100,
  },
  stateLayer15: {
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_3xs,
    justifyContent: "center",
    flexDirection: "row",
  },
  buttontextenabledfalse1: {
    marginLeft: 8,
  },
  actions: {
    paddingLeft: Padding.p_xs,
    paddingRight: Padding.p_5xl,
    paddingBottom: Padding.p_xl,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  modalTimePicker: {
    borderRadius: Border.br_9xl,
    width: 328,
    height: 520,
    maxHeight: "100%",
    maxWidth: "100%",
    alignItems: "center",
    backgroundColor: Color.white,
  },
});

export default ModalTimePicker;
