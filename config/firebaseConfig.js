const admin = require("firebase-admin");
const dotenv = require("dotenv");
const serviceAccount = require("../serviceAccountKey.json"); 
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const firestore = admin.firestore();
const auth = admin.auth();
const storage = admin.storage().bucket();
const FieldValue = admin.firestore.FieldValue;
module.exports = {firestore, auth, storage, FieldValue};
