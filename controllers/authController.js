const { firestore, auth } = require('../config/firebaseConfig');

// exports.authenticateUser = async (req, res) => {
//   try {
//     const result = 'Hello World'
//     res.status(200).json({ message: result })
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };

// exports.socialAuth = async (req, res) => {
//   const { idToken } = req.body; // Frontend sends Firebase ID token

//   if (!idToken) {
//     return res.status(400).json({ error: "ID Token required" });
//   }

//   try {
//     // Verify token with Firebase Admin SDK
//     const decodedToken = await auth.verifyIdToken(idToken);
//     const { uid, email, name, picture, provider_id } = decodedToken;

//     // Check if user already exists in Firestore
//     const userRef = db.collection("users").doc(uid);
//     const userDoc = await userRef.get();

//     if (!userDoc.exists) {
//       // New user → create in Firestore
//       await userRef.set({
//         uid,
//         email: email || null,
//         name: name || null,
//         photoURL: picture || null,
//         provider: provider_id || decodedToken.firebase.sign_in_provider,
//         createdAt: new Date(),
//       });

//       return res.status(201).json({
//         message: "User registered successfully",
//         user: { uid, email, name, photoURL: picture },
//       });
//     } else {
//       // Existing user → login
//       return res.status(200).json({
//         message: "Login successful",
//         user: userDoc.data(),
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     return res.status(401).json({ error: "Invalid ID Token" });
//   }
// };



exports.socialAuth = async (req, res) => {
 
  const { idToken } = req.body; // Firebase ID token from frontend

  if (!idToken) {
    return res.status(400).json({ error: "ID Token required" });
  }

  try {
    // Verify Firebase token
    const decodedToken = await auth.verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;

    let firstName = "";
    let lastName = "";

    if (name) {
      const parts = name.split(" ");
      firstName = parts[0];
      lastName = parts.slice(1).join(" ");
    }

    const provider = decodedToken.firebase?.sign_in_provider || "unknown";

    console.log(uid, email, name, picture);

    // Check if user exists
    const userRef = firestore.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      // New user → create in Firestore
      // await userRef.set({
      //   uid,
      //   email: email || null,
      //   firstName: firstName || null,
      //   lastName: lastName || null,
      //   photoURL: picture || null,
      //   provider,
      //   createdAt: new Date(),
      // });

      return res.status(200).json({
        message: "New User",
        response: { 
          user: { 
            uid, 
            email: email || null,
            firstName: firstName || null,
            lastName: lastName || null,
            photoURL: picture || null,
            provider,
          },
          "profileComplete": false,
        }
      });
    } else {
      // Existing user → login

      return res.status(200).json({
        message: "Login successful",
        response: {
          user: userDoc.data(),
          "profileComplete": true,
        }
      });
    }
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ error: "Invalid ID Token" });
  }
};

exports.authenticateUser = async (req, res) => {
  const { idToken } = req.body; // Firebase ID token from frontend

  if (!idToken) {
    return res.status(400).json({ error: "ID Token required" });
  }

  console.log(idToken);
  

  try {
    // Verify Firebase token
    const decodedToken = await auth.verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;

    let firstName = "";
    let lastName = "";

    if (name) {
      const parts = name.split(" ");
      firstName = parts[0];
      lastName = parts.slice(1).join(" ");
    }

    const provider = decodedToken.firebase?.sign_in_provider || "unknown";

    const userRef = firestore.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(200).json({
        message: "New User",
        response: {
          user: { 
            uid, 
            email: email || null,
            firstName: firstName || null,
            lastName: lastName || null,
            photoURL: picture || null,
            provider,
          },
          "profileComplete": false,
        }
      });
    } else {
      return res.status(200).json({
        message: "Login Successful",
        response: {
          user: userDoc.data(),
          "profileComplete": true,
        }
      });
    }
    
  } catch (error) {
    console.log("Auth error:", error);
    return res.status(401).json({ error: "Invalid ID Token" });
  }

}