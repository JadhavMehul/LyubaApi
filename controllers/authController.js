const { firestore, auth } = require('../config/firebaseConfig');
exports.authenticateUser = async (req, res) => {
  try {
    const result = 'Hello World';
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.googleAuth = async (req, res) => {
  const { idToken } = req.body; // Frontend sends Firebase ID token

  if (!idToken) {
    return res.status(400).json({ error: 'ID Token required' });
  }

  try {
    // Verify token with Firebase Admin SDK
    const decodedToken = await auth.verifyIdToken(idToken);
    const { uid, email, name, picture, provider_id } = decodedToken;

    // Check if user already exists in Firestore
    const userRef = firestore.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      // New user → create in Firestore
      await userRef.set({
        uid,
        email: email || null,
        name: name || null,
        photoURL: picture || null,
        provider: provider_id || decodedToken.firebase.sign_in_provider,
        createdAt: new Date(),
      });

      return res.status(201).json({
        message: 'User registered successfully',
        user: { uid, email, name, photoURL: picture },
      });
    } else {
      // Existing user → login
      return res.status(200).json({
        message: 'Login successful',
        user: userDoc.data(),
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Invalid ID Token' });
  }
};
