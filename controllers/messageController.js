const { firestore, FieldValue } = require("../config/firebaseConfig");
const { getConversationId } = require("../utils/messageUtils");


exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;

    if (!senderId || !receiverId || !text) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const conversationId = await getConversationId(senderId, receiverId);
    const convoRef = firestore.collection("conversations").doc(conversationId);

    // Create or update conversation
    await convoRef.set(
      {
        members: [senderId, receiverId],
        lastMessage: text,
        updatedAt: FieldValue.serverTimestamp()
      },
      { merge: true }
    );

    // Add message
    await convoRef.collection("messages").add({
      senderId,
      receiverId,
      text,
      createdAt: FieldValue.serverTimestamp()
    });

    res.status(200).json({ message: "Message sent successfully" });

  } catch (error) {
    console.error("sendMessage error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET MESSAGES BETWEEN TWO USERS
 * GET /messages?userA=A&userB=B
 */
exports.getMessages = async (req, res) => {
  try {
    const { userA, userB } = req.body;

    if (!userA || !userB) {
      return res.status(400).json({ message: "Missing users" });
    }

    const conversationId = await getConversationId(userA, userB);

    const snapshot = await firestore
      .collection("conversations")
      .doc(conversationId)
      .collection("messages")
      .orderBy("createdAt", "asc")
      .get();

    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json(messages);

  } catch (error) {
    console.error("getMessages error:", error);
    res.status(500).json({ message: "Error fetching messages" });
  }
};

/**
 * GET CHAT LIST (INBOX)
 * GET /chats?userId=A
 */
exports.getChats = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const snapshot = await firestore
      .collection("conversations")
      .where("members", "array-contains", userId)
      .orderBy("updatedAt", "desc")
      .get();

    const chats = snapshot.docs.map(doc => {
      const data = doc.data();

      // Get the other user (important for frontend)
      const otherUserId = data.members.find(id => id !== userId);

      return {
        conversationId: doc.id,
        otherUserId,
        lastMessage: data.lastMessage || "",
        updatedAt: data.updatedAt
      };
    });

    res.status(200).json(chats);

  } catch (error) {
    console.error("getChats error:", error);
    res.status(500).json({ message: "Failed to fetch chats" });
  }
};