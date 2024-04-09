/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();
const fcm = admin.messaging();

// exports.sendNotificationOnUpdate = functions.firestore
//     .document("/userProfiles/{userId}/notifications/{notificationId}")
//     .onCreate(async (snapshot, context) => {
//       const userId = context.params.userId;

//       // Send the notification
//       try {
//         // Check if the user is active (e.g., within the last 30 minutes)
//         const userDoc = await db.collection("userProfiles").doc(userId).get();
//         if (!userDoc.exists) {
//           console.log("User not found");
//           return null;
//         }

//         const userData = userDoc.data();
//         const lastActive = userData.lastActive;

//         // If the user was active in the last 30 minutes, don't send notificatio
//         if (lastActive && lastActive.toMillis() > Date.now() - 30 * 60 * 1000) {
//           console.log("User is active, skipping notification.");
//           return null;
//         }

//         // Check if userData has fcmToken
//         if (!userData.fcmToken) {
//           console.log("FCM Token not found for user:", userId);
//           return null;
//         }

//         // Get the notification data
//         const notificationData = snapshot.data();
//         console.log("User Notification Data", notificationData);

//         // Construct the notification message
//         const message = {
//           notification: {
//             title: notificationData.title,
//             body: notificationData.subTitle,
//           },
//           token: userData.fcmToken,
//         };

//         // Send the notification
//         const response = await fcm.send(message);
//         console.log("Notification sent successfully:", response);
//         return response;
//       } catch (error) {
//         console.error("Error sending notification:", error);
//         return null;
//       }
// });


exports.sendNotificationOnUpdate = functions.firestore
    .document("/userProfiles/{userId}/notifications/{notificationId}")
    .onWrite(async (change, context) => {
      const userId = context.params.userId;

      // Send the notification
      try {
        // Check if the user is active (e.g., within the last 30 minutes)
        const userDoc = await db.collection("userProfiles").doc(userId).get();
        if (!userDoc.exists) {
          console.log("User not found");
          return null;
        }

        const userData = userDoc.data();
        const lastActive = userData.lastActive;
        console.log("Notification Data", userData);

        // If the user was active in the last 30 minutes, don't send notificatio
        if (lastActive && lastActive.toMillis() > Date.now() - 30 * 60 * 1000) {
          console.log("User is active, skipping notification.");
          return null;
        }

        // Check if userData has fcmToken
        if (!userData.fcmToken) {
          console.log("FCM Token not found for user:", userId);
          return null;
        }

        // Get the notification data
        const updatedNotificationData = change.after.exists ? change.after.data() : null;
        const previousNotificationData = change.before.exists ? change.before.data() : null;
        console.log("Before Notification Data: ", previousNotificationData);
        console.log("After Notification Data: ", updatedNotificationData);

        // Compare previous and updated data to find changes
        const difference = {};
        let title = "";
        let subTitle = "";

        if (previousNotificationData != null) {
            // Compare keys in updatedNotificationData with previousNotificationData
            Object.keys(updatedNotificationData).forEach(key => {
                if (!previousNotificationData.hasOwnProperty(key)) {
                difference[key] = updatedNotificationData[key];
                }
            });
        } else {
            Object.keys(updatedNotificationData).forEach(key => {
                difference[key] = updatedNotificationData[key];
            });
        }
        // Print the difference (You can store this in another variable as needed)
        console.log('Difference:', difference);

        Object.keys(difference).forEach(key => {
            title = difference[key].title;
            subTitle = difference[key].subTitle;
        });

        const message = {
            notification: {
                title: title,
                body: subTitle,
            },
            token: userData.fcmToken,
        };

        // Send the notification
        const response = await fcm.send(message);
        console.log("Notification sent successfully:", response);
        
      } catch (error) {
        console.error("Error sending notification:", error);
        return null;
      }
    });

exports.sendNotificationOnProvider = functions.firestore
    .document("/providerProfiles/{providerId}/notifications/{notificationId}")
    .onWrite(async (change, context) => {
      const providerId = context.params.providerId;

      // Send the notification
      try {
        // Check if the service provider is active (e.g., within the last 30 minutes)
        const providerDoc = await db.collection("providerProfiles").doc(providerId).get();
        if (!providerDoc.exists) {
          console.log("Provider not found");
          return null;
        }

        const providerData = providerDoc.data();
        const lastActive = providerData.lastActive;
        console.log("Notification Data", providerData);

        // If the service provider was active in the last 30 minutes, don't send notificatio
        if (lastActive && lastActive.toMillis() > Date.now() - 30 * 60 * 1000) {
          console.log("Provider is active, skipping notification.");
          return null;
        }

        // Check if providerData has fcmToken
        if (!providerData.fcmToken) {
          console.log("FCM Token not found for user:", userId);
          return null;
        }

        // Get the notification data
        const updatedNotificationData = change.after.exists ? change.after.data() : null;
        const previousNotificationData = change.before.exists ? change.before.data() : null;
        console.log("Before Notification Data: ", previousNotificationData);
        console.log("After Notification Data: ", updatedNotificationData);

        // Compare previous and updated data to find changes
        const difference = {};
        let title = "";
        let subTitle = "";

        if (previousNotificationData != null) {
            // Compare keys in updatedNotificationData with previousNotificationData
            Object.keys(updatedNotificationData).forEach(key => {
                if (!previousNotificationData.hasOwnProperty(key)) {
                difference[key] = updatedNotificationData[key];
                }
            });
        } else {
            Object.keys(updatedNotificationData).forEach(key => {
                difference[key] = updatedNotificationData[key];
            });
        }
        // Print the difference (You can store this in another variable as needed)
        console.log('Difference:', difference);

        Object.keys(difference).forEach(key => {
            title = difference[key].title;
            subTitle = difference[key].subTitle;
        });

        const message = {
            notification: {
                title: title,
                body: subTitle,
            },
            token: providerData.fcmToken,
        };

        // Send the notification
        const response = await fcm.send(message);
        console.log("Notification sent successfully:", response);
        
      } catch (error) {
        console.error("Error sending notification:", error);
        return null;
      }
    });
