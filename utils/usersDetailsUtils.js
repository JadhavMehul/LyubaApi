const { firestore } = require("../config/firebaseConfig");

const profileByGender = async (targetGender, targetCity) => {
    try {
        if (!targetGender) {
            return { status: 400, message: "The 'gender' parameter is required." };
        }
        
        if (!targetCity) {
            return { status: 400, message: "The 'gender' parameter is required." };
        }
        
        const userRef = firestore.collection("users").where("city", "==", targetCity).where("gender", "==", targetGender);
        const snapshot = await userRef.get();

        if (snapshot.empty) {
            return { status: 404, message: "No users found with this gender" };
        }

        const users = [];
        snapshot.forEach(doc => {
            users.push({ id: doc.id, ...doc.data() });
        });

        return { status: 200, data: users };
    } catch (error) {
        console.error("Error getting documents:", error);
        return { status: 500, error: error.message };
    }
};

const getMatchScore = (userA, userB) => {
    let score = 0;

    if (userA.personalData.genderPreference?.toLowerCase() === userB.gender?.toLowerCase() &&
        userB.personalData.genderPreference?.toLowerCase() === userA.gender?.toLowerCase()
    ) {
        score += 30;
    }

    if (userA.city?.toLowerCase() === userB.city?.toLowerCase()) {
        score += 20;
    }

    // Shared interests
    const sameInterests = userA.interests?.filter(i => userB.interests?.includes(i)) || [];
    score += sameInterests.length * 10; // up to 30 points

    // Religion / Education
    if (userA.personalData.religion === userB.personalData.religion) score += 5;
    if (userA.personalData.education === userB.personalData.education) score += 5;

    // Recency
    const diff = Math.abs((userA.createdAt?._seconds || 0) - (userB.createdAt?._seconds || 0));
    if (diff < 86400 * 30) score += 10;

    return Math.min(100, score);
};

module.exports = { profileByGender, getMatchScore };
