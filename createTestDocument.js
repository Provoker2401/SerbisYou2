const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json'); // Update with your service account key path
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://testingauth-9126f.firebaseio.com', // Replace with your Firebase project URL
});

// Reference to Firestore
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue; // Add this line to access FieldValue

// Create a test document
const createTestDocument = async () => {
  try {
    const todayDate = new Date().toLocaleDateString('en-US', { timeZone: 'UTC' });
    const docRef = db.collection('userProfiles').doc('raWF3ZZ31mbqPzJGLTGKjoG11Ts1').collection('notifications').doc('April 8, 2024');
    const bookingID = "SDFNKJS";
    const bookingID2 = "AB12I3UH";
    const bookingID3 = "FJ324JI";

    // const bookingDataNotif = {
    // // Using bookingID as the key for the map inside the document
    // [bookingID]: {
    //     subTitle: `Your booking ${bookingID} has been completed`,
    //     title: "Booking Completed",
    //     // You can add more fields here if needed
    // },
    // };
    const bookingDataNotif = {
      // Using bookingID as the key for the map inside the document
      [bookingID]: {
          subTitle: `kINSAY BAYOT`,
          title: "SI TOME",
          // You can add more fields here if needed
      },
      [bookingID2]: {
          subTitle: `test`,
          title: "rhasta",
          // You can add more fields here if needed
      },
      [bookingID3]: {
          subTitle: `test3`,
          title: "SI john wick",
          // You can add more fields here if needed
      },
      date: FieldValue.serverTimestamp(),
    };

    // const notificationDocRef = doc(notifCollection, formattedDate);

    // try {
    // const notificationDoc = await getDoc(notificationDocRef);
    // if (notificationDoc.exists()) {
    //     // Document exists, update it
    //     await setDoc(notificationDocRef, bookingDataNotif, {
    //     merge: true,
    //     });
    //     console.log("Notification updated successfully!");
    // } else {
    //     // Document doesn't exist, create it
    //     await setDoc(notificationDocRef, bookingDataNotif);
    //     console.log("New notification document created!");
    // }
    // } catch (error) {
    // console.error("Error updating notification:", error);
    // }

    await docRef.set( bookingDataNotif, {
        merge: true,
    });
    
    // await docRef.set({
    //   title: 'WE GOT THIS FAM?',
    //   subTitle: 'NIGGAS!',
    // });

    console.log('Test document created successfully.');
  } catch (error) {
    console.error('Error creating test document:', error);
  }
};

// Call the function to create the test document
createTestDocument();
