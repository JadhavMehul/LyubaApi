const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("🔌 User connected:", socket.id);

    // ✅ JOIN CHAT ROOM
    socket.on("joinChat", (chatId) => {
      socket.join(chatId);
      console.log("👥 Joined room:", chatId);
    });

    // ✅ SEND MESSAGE
    socket.on("sendMessage", async (messageData) => {
      try {
        if (!messageData?.chatId || !messageData?.text) return;

        console.log("📩 Message:", messageData);

        // TODO: save in DB here if needed

        // 🔥 Emit to same chat room
        io.to(messageData.chatId).emit("newMessage", messageData);

      } catch (err) {
        console.error("Socket error:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected:", socket.id);
    });
  });

  return io;
};

module.exports = { initSocket };
