const admin = require("firebase-admin");
const dotenv = require("dotenv");
const serviceAccount = require("../serviceAccountKey.json"); 
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();
module.exports = firestore;
