const { Chat } = require('../models');
const OpenAI = require('openai');
const openai = new OpenAI();

const getChats = async (req, res) => {
	const { id } = req.user;
	const chats = await Chat.find({ user: id });
	res.json({
		chats,
	});
};

const getChat = async (req, res) => {
	const { chatId } = req.params;
	const chat = await Chat.find({ nameChat: chatId });
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
	const { content: message } = req.body;
	const chat = await Chat.findById(chatId);
	if (!chat) return res.status(400).json({ msg: 'El chat no existe' });
	chat.messages.push({ role: message.user, content: message.message });

	const messages = chat.messages.map(message => ({
		role: message.role,
		content: message.content,
	}));
	const botMessage = await botResponse(messages);
	console.log(botMessage);
	chat.messages.push(botMessage);
	await chat.save();
	res.json(chat.messages);
};

const deleteChat = async (req, res) => {
	const { chatId } = req.params;
	const chat = await Chat.findByIdAndDelete(chatId);

	res.json({
		msg: 'Chat deleted successfully',
		chat: chat.nameChat,
	});
};

const botResponse = async messages => {
	const gptResponse = await openai.chat.completions.create({
		messages,
		model: 'gpt-3.5-turbo',
	});

	return gptResponse.choices[0].message;
};

module.exports = {
	getChats,
	getChat,
	createChat,
	deleteChat,
	addMessage,
};
