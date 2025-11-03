const { firestore } = require("../config/firebaseConfig");
const { profileByGender, getMatchScore } = require("../utils/usersDetailsUtils");

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

exports.profileProfileData = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId required" });
    }

    const userRef = firestore.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = userDoc.data();
    const myPreference = userData.personalData?.genderPreference;

    const result = await profileByGender(myPreference);

    if (!result.data || result.data.length === 0) {
      return res.status(404).json({ message: "No matching users found" });
    }

    // Calculate match scores for each candidate
    const matches = result.data.map(otherUser => ({
      user: otherUser,
      score: getMatchScore(userData, otherUser)
    }));

    
    matches.sort((a, b) => b.score - a.score);

    return res.status(200).json({ matches });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
};