const { Chat } = require('../models');

const getChats = async (req, res) => {
  const { id } = req.user;
  const chats = await Chat.find({ user: id });
  res.json({
    chats,
  });
};

const getChat = async (req, res) => {
  const { chatId } = req.params;
  const chat = await Chat.findById(chatId);
  if (!chat) return res.status(400).json({ msg: 'El chat no existe' });
  res.json({
    chat,
  });
};

const createChat = async (req, res) => {
  const { nameChat } = req.body;
  const { id } = req.user;
  const chat = new Chat({ nameChat, user: id });
  await chat.save();
  res.json(chat);
};

const addMessage = async (req, res) => {
  const { chatId } = req.params;
  const { content } = req.body;
  const chat = await Chat.findById(chatId);
  if (!chat) return res.status(400).json({ msg: 'El chat no existe' });
  chat.messages.push({ content });
  await chat.save();
  res.json({
    chat,
  });
};

const deleteChat = async (req, res) => {
  const { chatId } = req.params;
  const chat = await Chat.findByIdAndDelete(chatId);

  res.json({
    msg: 'Chat deleted successfully',
    chat: chat.nameChat,
  });
};

module.exports = {
  getChats,
  getChat,
  createChat,
  deleteChat,
  addMessage,
};
