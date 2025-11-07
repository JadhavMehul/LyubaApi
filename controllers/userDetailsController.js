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


exports.addUserInLoop = async (req, res) => {
    // const users =  // Expecting JSON array please add data in array of object as shown below

    // [
    //     {
    //         "id": "8l5kvaeQCnAG8c4vROYtV7nfaeAy",
    //         "lastName": "Lee",
    //         "pincode": "E1 6AN",
    //         "birthdate": "14/03/1983",
    //         "gender": "male",
    //         "city": "London",
    //         "personalData": {
    //             "profession": "Lawyer",
    //             "feet": "4 Feet",
    //             "drinking": "No",
    //             "education": "Primary School",
    //             "genderPreference": "Both",
    //             "sign": "Sagittarius",
    //             "workingAt": "",
    //             "religion": "Judaism",
    //             "workout": "Active",
    //             "smoking": "Yes",
    //             "looking": "Marriage",
    //             "inch": "0 Inch",
    //             "kids": "No",
    //             "status": "Unmarried"
    //         },
    //         "pictures": [
    //             "https://firebasestorage.googleapis.com/v0/b/lyuba-dating-app.firebasestorage.app/o/users%2Fk1Tn5aUks8WWTq5m8aYc4thWI8z2%2Fphotos%2Fphoto_0.jpg?alt=media&token=f0105f13-7b54-4eac-96e7-c237d5542984",
    //             "https://firebasestorage.googleapis.com/v0/b/lyuba-dating-app.firebasestorage.app/o/users%2FHx5bjizIdTRKFssDl0SJSP12RnR2%2Fphotos%2Fphoto_0.jpg?alt=media&token=2fad6650-ea59-4771-83c5-516a279e1528"
    //         ],
    //         "createdAt": "October 22, 2025 at 11:03:55 AM UTC+5:30",
    //         "firstName": "Vikram",
    //         "uid": "8l5kvaeQCnAG8c4vROYtV7nfaeAy",
    //         "provider": "facebook.com",
    //         "interests": [
    //             "Movie",
    //             "Football",
    //             "Stock Market",
    //             "Cricket"
    //         ],
    //         "email": "vikram.lee839@example.com"
    //     },
    // ]

    if (!Array.isArray(users)) {
        return res.status(400).send({ error: "Request body must be an array of users" });
    }

    try {
        for (const user of users) {
            await firestore.collection("users").doc(user.uid).set(user);
            
        }
        res.status(200).send({ message: "All users uploaded successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to upload users", details: error.message });
    }

}