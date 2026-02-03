const getConversationId = async (a, b) => {
  return [a, b].sort().join('_');
}

module.exports = {
  getConversationId
};

