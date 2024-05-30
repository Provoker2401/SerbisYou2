import { Image } from "expo-image";
import {
    collection,
    getDocs,
    getFirestore,
    writeBatch,
} from "firebase/firestore";
import React, { useCallback, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Border, Color, FontFamily, FontSize, Padding } from "../GlobalStyles";
import { useSearchingContext } from "../SearchingContext";
import CancelBookingSuccessful from "./CancelBookingSuccessful";

const BookingBackSearchingPrompt = ({ onClose, stopBooking }) => {
    const [yesBtnVisible, setYesBtnVisible] = useState(false);

    const { firstProviderIds } = useSearchingContext();

    const openYesBtn = useCallback(async () => {
        setYesBtnVisible(true);

        // Call the callback function to stop searching
        stopBooking();
        try {
            const db = getFirestore();
            const providerProfilesCollection = collection(db, "providerProfiles");

            // Fetch all documents in the providerProfiles collection
            const providerProfilesSnapshot = await getDocs(providerProfilesCollection);

            // Create a batch instance
            const batch = writeBatch(db);
            providerProfilesSnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.availability === "onHold") {
                    batch.update(doc.ref, {
                        availability: "available",
                        bookingID: "",
                        bookingIndex: "",
                        bookingMatched: false,
                    });
                }
            });

            // Commit the batch
            await batch.commit();

        } catch (error) {
            console.error("Error updating availability data:", error);
        }
    }, [stopBooking]);

    const closeYesBtn = useCallback(() => {
        setYesBtnVisible(false);
    }, []);


    return (
        <>
            <View style={styles.cancelBookingPrompt}>
                <Image
                    style={styles.cancel11Icon}
                    contentFit="cover"
                    source={require("../assets/edit-details.png")}
                />
                <View style={styles.content}>
                    <View style={styles.text}>
                        <Text style={styles.cancelBooking}>Edit Booking Details</Text>
                        <Text style={styles.areYouSure}>{`Are you sure you want to edit your booking details?`}</Text>
                    </View>
                    <View style={styles.button}>
                        <View style={styles.btn}>
                            <Pressable
                                style={[styles.noBtn, styles.btnSpaceBlock]}
                                onPress={onClose}
                            >
                                <Text style={[styles.no, styles.noTypo]}>No</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.yesBtn, styles.btnSpaceBlock]}
                                onPress={openYesBtn}
                            >
                                <Text style={[styles.yes, styles.noTypo]}>Yes</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>

            <Modal animationType="fade" transparent visible={yesBtnVisible}>
                <View style={styles.yesBtnOverlay}>
                    <Pressable style={styles.yesBtnBg} onPress={closeYesBtn} />
                    <CancelBookingSuccessful onClose={closeYesBtn} />
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    btnSpaceBlock: {
        paddingVertical: Padding.p_smi,
        paddingHorizontal: Padding.p_3xs,
        width: 134,
        borderRadius: Border.br_5xs,
        justifyContent: "center",
        flexDirection: "row",
    },
    noTypo: {
        textAlign: "left",
        fontSize: FontSize.bodyLgBodyLgRegular_size,
        fontFamily: FontFamily.workSansMedium,
        fontWeight: "500",
    },
    cancel11Icon: {
        width: 150,
        height: 150,
    },
    cancelBooking: {
        fontSize: FontSize.size_3xl,
        textTransform: "capitalize",
        fontWeight: "600",
        fontFamily: FontFamily.workSansSemiBold,
        color: "#00a8e8",
        textAlign: "center",
    },
    areYouSure: {
        fontSize: FontSize.m3LabelLarge_size,
        lineHeight: 20,
        color: Color.bg,
        marginTop: 12,
        fontFamily: FontFamily.workSansMedium,
        fontWeight: "500",
        textAlign: "center",
    },
    text: {
        alignItems: "center",
    },
    no: {
        color: Color.heading,
    },
    noBtn: {
        backgroundColor: Color.colorGainsboro_300,
    },
    yesBtnOverlay: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 48, 0.29)",
    },
    yesBtnBg: {
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
    },
    yes: {
        color: Color.white,
    },
    yesBtn: {
        backgroundColor: Color.colorDarkslateblue_100,
        marginLeft: 20,
    },
    btn: {
        flexDirection: "row",
    },
    button: {
        width: 287,
        marginTop: 40,
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: Border.br_xs,
    },
    content: {
        marginTop: 20,
        alignItems: "center",
    },
    cancelBookingPrompt: {
        backgroundColor: Color.white,
        paddingHorizontal: Padding.p_5xl,
        paddingVertical: Padding.p_21xl,
        maxWidth: "100%",
        maxHeight: "100%",
        alignItems: "center",
        borderRadius: Border.br_xs,
    },
});

export default BookingBackSearchingPrompt;