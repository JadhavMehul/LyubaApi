const { firestore } = require("../config/firebaseConfig");

exports.profileData = async (req, res) => {

    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: "userId required" });
    }

    const userRef = firestore.collection("users").doc(userId);
    const userDoc = await userRef.get()

    if (!userDoc.exists) {
        return res.status(400).json({ message: "user not found" });
    }
    return res.status(200).json({
        foundData: true,
        message: "User Found",
        response: {
          user: userDoc.data(),
        }
    });

}