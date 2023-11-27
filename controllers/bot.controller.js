const OpenAI = require('openai');

const botResponse = async (req, res) => {
  const { id } = req.user;
  console.log(req.body);
  res.json({ status: 'success', msg: 'Valores encontrados' });
};

module.exports = {
  botResponse,
};
