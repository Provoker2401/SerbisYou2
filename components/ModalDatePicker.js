import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Padding, Border, FontSize, FontFamily, Color } from "../GlobalStyles";

const ModalDatePicker = ({ onClose }) => {
  return (
    <View style={styles.modalDatePicker}>
      <View style={[styles.header, styles.headerFlexBox]}>
        <View style={styles.labelAndDate}>
          <Text style={styles.supportingText}>Select date</Text>
          <Text style={styles.weekDayDay}>Mon, Aug 17</Text>
        </View>
        <View style={[styles.iconButton, styles.iconLayout]}>
          <View style={[styles.container, styles.containerLayout1]}>
            <View style={styles.stateLayer}>
              <Image
                style={styles.iconsmodeEdit24pxLayout}
                contentFit="cover"
                source={require("../assets/iconsmode-edit-24px.png")}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.localSelectionRow}>
        <View>
          <View style={[styles.stateLayer1, styles.containerLayout1]}>
            <Text style={[styles.labelText, styles.labelTypo]}>
              August 2023
            </Text>
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require("../assets/icon15.png")}
            />
          </View>
        </View>
        <View style={styles.controls}>
          <View style={[styles.iconButton1, styles.iconLayout]}>
            <View style={[styles.container, styles.containerLayout1]}>
              <View style={styles.stateLayer}>
                <Image
                  style={[
                    styles.iconsnavigateBefore,
                    styles.iconsmodeEdit24pxLayout,
                  ]}
                  contentFit="cover"
                  source={require("../assets/iconsnavigate-before.png")}
                />
              </View>
            </View>
          </View>
          <View style={[styles.iconButton1, styles.iconLayout]}>
            <View style={[styles.container, styles.containerLayout1]}>
              <View style={styles.stateLayer}>
                <Image
                  style={[
                    styles.iconsnavigateBefore,
                    styles.iconsmodeEdit24pxLayout,
                  ]}
                  contentFit="cover"
                  source={require("../assets/iconsnavigate-next.png")}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.localCalendarGrid}>
        <View style={styles.daysOfTheWeek}>
          <View style={styles.sunday}>
            <Text style={[styles.date, styles.dateFlexBox]}>S</Text>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <Text style={[styles.date, styles.dateFlexBox]}>M</Text>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <Text style={[styles.date, styles.dateFlexBox]}>T</Text>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <Text style={[styles.date, styles.dateFlexBox]}>W</Text>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <Text style={[styles.date, styles.dateFlexBox]}>T</Text>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <Text style={[styles.date, styles.dateFlexBox]}>F</Text>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <Text style={[styles.date, styles.dateFlexBox]}>S</Text>
          </View>
        </View>
        <View style={styles.daysOfTheWeek}>
          <View style={styles.sunday1}>
            <Text style={styles.date7}>00</Text>
          </View>
          <View style={styles.mondayFlexBox}>
            <Text style={styles.date7}>00</Text>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <View style={[styles.container3, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={[styles.date, styles.dateFlexBox]}>1</Text>
              </View>
            </View>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <View style={[styles.container3, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={[styles.date, styles.dateFlexBox]}>2</Text>
              </View>
            </View>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <View style={[styles.container3, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={[styles.date, styles.dateFlexBox]}>3</Text>
              </View>
            </View>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <View style={[styles.container3, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={[styles.date, styles.dateFlexBox]}>4</Text>
              </View>
            </View>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <View style={[styles.container7, styles.containerLayout]}>
              <View style={[styles.stateLayer8, styles.containerLayout]}>
                <Text style={[styles.date13, styles.date13Clr]}>5</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.daysOfTheWeek}>
          <View style={styles.sunday}>
            <View style={[styles.container3, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={[styles.date, styles.dateFlexBox]}>6</Text>
              </View>
            </View>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <View style={[styles.container3, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={[styles.date, styles.dateFlexBox]}>7</Text>
              </View>
            </View>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <View style={[styles.container3, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={[styles.date, styles.dateFlexBox]}>8</Text>
              </View>
            </View>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <View style={[styles.container3, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={[styles.date, styles.dateFlexBox]}>9</Text>
              </View>
            </View>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <View style={[styles.container3, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={[styles.date, styles.dateFlexBox]}>10</Text>
              </View>
            </View>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <View style={[styles.container3, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={[styles.date, styles.dateFlexBox]}>11</Text>
              </View>
            </View>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <View style={[styles.container3, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={[styles.date, styles.dateFlexBox]}>12</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.daysOfTheWeek}>
          <View style={styles.sunday}>
            <View style={[styles.container3, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={[styles.date, styles.dateFlexBox]}>13</Text>
              </View>
            </View>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <View style={[styles.container3, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={[styles.date, styles.dateFlexBox]}>14</Text>
              </View>
            </View>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <View style={[styles.container3, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={[styles.date, styles.dateFlexBox]}>15</Text>
              </View>
            </View>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <View style={[styles.container3, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={[styles.date, styles.dateFlexBox]}>16</Text>
              </View>
            </View>
          </View>
          <View style={[styles.wednesdsay7, styles.mondayFlexBox]}>
            <View style={[styles.rangeHighlightEnd, styles.rangePosition]} />
            <View style={[styles.rangeHighlightStart, styles.rangePosition]} />
            <View style={[styles.container19, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={styles.date25}>17</Text>
              </View>
            </View>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <View style={[styles.container3, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={[styles.date, styles.dateFlexBox]}>18</Text>
              </View>
            </View>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <View style={[styles.container3, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={[styles.date, styles.dateFlexBox]}>19</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.daysOfTheWeek}>
          <View style={styles.sunday}>
            <View style={[styles.container3, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={[styles.date, styles.dateFlexBox]}>20</Text>
              </View>
            </View>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <View style={[styles.container3, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={[styles.date, styles.dateFlexBox]}>21</Text>
              </View>
            </View>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <View style={[styles.container3, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={[styles.date, styles.dateFlexBox]}>22</Text>
              </View>
            </View>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <View style={[styles.container3, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={[styles.date, styles.dateFlexBox]}>23</Text>
              </View>
            </View>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <View style={[styles.container3, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={[styles.date, styles.dateFlexBox]}>24</Text>
              </View>
            </View>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <View style={[styles.container3, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={[styles.date, styles.dateFlexBox]}>25</Text>
              </View>
            </View>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <View style={[styles.container3, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={[styles.date, styles.dateFlexBox]}>26</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.daysOfTheWeek}>
          <View style={styles.sunday}>
            <View style={[styles.container3, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={[styles.date, styles.dateFlexBox]}>27</Text>
              </View>
            </View>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <View style={[styles.container3, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={[styles.date, styles.dateFlexBox]}>28</Text>
              </View>
            </View>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <View style={[styles.container3, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={[styles.date, styles.dateFlexBox]}>29</Text>
              </View>
            </View>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <View style={[styles.container3, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={[styles.date, styles.dateFlexBox]}>30</Text>
              </View>
            </View>
          </View>
          <View style={[styles.monday, styles.mondayFlexBox]}>
            <View style={[styles.container3, styles.containerLayout]}>
              <View style={[styles.stateLayer4, styles.containerLayout]}>
                <Text style={[styles.date, styles.dateFlexBox]}>31</Text>
              </View>
            </View>
          </View>
          <View style={styles.mondayFlexBox}>
            <Text style={styles.date7}>28</Text>
          </View>
          <View style={styles.mondayFlexBox}>
            <Text style={styles.date7}>24</Text>
          </View>
        </View>
        <View style={styles.daysOfTheWeek}>
          <View style={styles.sunday1}>
            <Text style={styles.date7}>30</Text>
          </View>
          <View style={styles.mondayFlexBox}>
            <Text style={styles.date7}>31</Text>
          </View>
          <View style={styles.mondayFlexBox}>
            <Text style={styles.date7}>00</Text>
          </View>
          <View style={styles.mondayFlexBox}>
            <Text style={styles.date7}>00</Text>
          </View>
          <View style={styles.mondayFlexBox}>
            <Text style={styles.date7}>00</Text>
          </View>
          <View style={styles.mondayFlexBox}>
            <Text style={styles.date7}>00</Text>
          </View>
          <View style={styles.mondayFlexBox}>
            <Text style={styles.date7}>00</Text>
          </View>
        </View>
      </View>
      <View style={[styles.actions, styles.headerFlexBox]}>
        <View style={styles.controls}>
          <View
            style={[styles.buttontextenabledfalse, styles.containerLayout1]}
          >
            <View style={styles.stateLayer35}>
              <Text style={[styles.labelText1, styles.date13Clr]}>Cancel</Text>
            </View>
          </View>
          <View
            style={[styles.buttontextenabledfalse1, styles.containerLayout1]}
          >
            <View style={styles.stateLayer35}>
              <Text style={[styles.labelText1, styles.date13Clr]}>OK</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerFlexBox: {
    paddingBottom: Padding.p_xs,
    alignItems: "flex-end",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  iconLayout: {
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  containerLayout1: {
    borderRadius: Border.br_81xl,
    overflow: "hidden",
  },
  labelTypo: {
    lineHeight: 20,
    fontSize: FontSize.m3LabelLarge_size,
    fontFamily: FontFamily.m3LabelLarge,
    fontWeight: "500",
  },
  iconsmodeEdit24pxLayout: {
    height: 24,
    width: 24,
  },
  dateFlexBox: {
    letterSpacing: 0,
    textAlign: "center",
  },
  mondayFlexBox: {
    marginLeft: 4,
    flex: 1,
    alignSelf: "stretch",
  },
  containerLayout: {
    width: 40,
    height: 40,
    flexDirection: "row",
  },
  date13Clr: {
    color: Color.colorDarkslateblue_100,
    textAlign: "center",
    letterSpacing: 0,
  },
  rangePosition: {
    backgroundColor: Color.m3SysLightSecondaryContainer,
    top: "50%",
    width: "80%",
    marginTop: -20,
    display: "none",
    position: "absolute",
    height: 40,
  },
  supportingText: {
    height: 16,
    textAlign: "left",
    color: Color.colorDarkslategray_100,
    fontFamily: FontFamily.m3LabelLarge,
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 1,
    fontSize: FontSize.level2Medium12_size,
    alignSelf: "stretch",
  },
  weekDayDay: {
    fontSize: FontSize.m3HeadlineLarge_size,
    lineHeight: 40,
    marginTop: 36,
    height: 40,
    color: Color.m3SysLightOnSurface,
    fontFamily: FontFamily.m3BodySmall,
    textAlign: "left",
    alignSelf: "stretch",
  },
  labelAndDate: {
    flex: 1,
  },
  stateLayer: {
    padding: Padding.p_5xs,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  container: {
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 8,
    alignItems: "center",
  },
  header: {
    borderColor: Color.colorSilver_100,
    borderBottomWidth: 1,
    paddingLeft: Padding.p_5xl,
    paddingTop: Padding.p_base,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: Padding.p_xs,
    borderStyle: "solid",
  },
  labelText: {
    textAlign: "center",
    letterSpacing: 0,
    color: Color.colorDarkslategray_100,
    lineHeight: 20,
    fontSize: FontSize.m3LabelLarge_size,
  },
  icon: {
    width: 18,
    height: 18,
    marginLeft: 8,
  },
  stateLayer1: {
    paddingLeft: Padding.p_5xs,
    paddingTop: Padding.p_3xs,
    paddingRight: Padding.p_9xs,
    paddingBottom: Padding.p_3xs,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  iconsnavigateBefore: {
    overflow: "hidden",
  },
  iconButton1: {
    alignItems: "center",
  },
  controls: {
    flexDirection: "row",
  },
  localSelectionRow: {
    paddingLeft: Padding.p_base,
    paddingTop: Padding.p_9xs,
    paddingBottom: Padding.p_9xs,
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: Padding.p_xs,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  date: {
    textAlign: "center",
    color: Color.m3SysLightOnSurface,
    letterSpacing: 0,
    fontFamily: FontFamily.m3BodySmall,
    lineHeight: 16,
    fontSize: FontSize.level2Medium12_size,
  },
  sunday: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  monday: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  daysOfTheWeek: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  date7: {
    height: "100%",
    width: "100%",
    top: "0%",
    left: "0%",
    display: "none",
    position: "absolute",
    textAlign: "center",
    letterSpacing: 0,
    alignItems: "center",
    fontFamily: FontFamily.m3BodySmall,
    color: Color.colorDarkslategray_100,
    lineHeight: 16,
    fontSize: FontSize.level2Medium12_size,
    justifyContent: "center",
  },
  sunday1: {
    flex: 1,
    alignSelf: "stretch",
  },
  stateLayer4: {
    alignItems: "center",
    justifyContent: "center",
  },
  container3: {
    overflow: "hidden",
    borderRadius: Border.br_81xl,
    alignItems: "center",
    justifyContent: "center",
  },
  date13: {
    fontFamily: FontFamily.m3BodySmall,
    color: Color.colorDarkslateblue_100,
    lineHeight: 16,
    fontSize: FontSize.level2Medium12_size,
  },
  stateLayer8: {
    padding: Padding.p_3xs,
    alignItems: "center",
    justifyContent: "center",
  },
  container7: {
    borderColor: Color.colorDarkslateblue_100,
    borderWidth: 1,
    overflow: "hidden",
    borderRadius: Border.br_81xl,
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "solid",
  },
  rangeHighlightEnd: {
    right: "48.75%",
    left: "-28.75%",
    zIndex: 0,
  },
  rangeHighlightStart: {
    right: "-31.25%",
    left: "51.25%",
    zIndex: 1,
  },
  date25: {
    color: Color.white,
    textAlign: "center",
    fontFamily: FontFamily.m3LabelLarge,
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 1,
    fontSize: FontSize.level2Medium12_size,
  },
  container19: {
    backgroundColor: Color.colorDarkslateblue_100,
    zIndex: 2,
    marginTop: 10,
    overflow: "hidden",
    borderRadius: Border.br_81xl,
  },
  wednesdsay7: {
    alignItems: "center",
    justifyContent: "center",
  },
  localCalendarGrid: {
    paddingVertical: 0,
    paddingHorizontal: Padding.p_xs,
    alignItems: "center",
    flex: 1,
    alignSelf: "stretch",
  },
  labelText1: {
    lineHeight: 20,
    fontSize: FontSize.m3LabelLarge_size,
    fontFamily: FontFamily.m3LabelLarge,
    fontWeight: "500",
  },
  stateLayer35: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_xs,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttontextenabledfalse: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  buttontextenabledfalse1: {
    overflow: "hidden",
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  actions: {
    paddingTop: Padding.p_5xs,
    justifyContent: "flex-end",
    paddingHorizontal: Padding.p_xs,
    alignItems: "flex-end",
  },
  modalDatePicker: {
    borderRadius: Border.br_9xl,
    backgroundColor: Color.white,
    width: 328,
    height: 516,
    maxWidth: "100%",
    maxHeight: "100%",
  },
});

export default ModalDatePicker;
