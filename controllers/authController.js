exports.authenticateUser = async (req, res) => {
  try {
    const result = 'Hello World'
    res.status(200).json({ message: result })
  } catch (err) {
    res.status(500).send(err.message);
  }
};