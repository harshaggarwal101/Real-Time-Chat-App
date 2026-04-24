const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");
const User = require("../models/user.model");

exports.sendMessage = async (req, res) => {
  try {
    const { recieverId, text } = req.body;
    const senderId = req.user.userId;

    if (!recieverId || !senderId || !text) {
      return res.status(400).json({
        success: false,
        message: "Data fetch failed",
      });
    }

    let convo = await Conversation.findOne({
      members: { $all: [senderId, recieverId] },
    });

    if (!convo) {
      convo = await Conversation.create({
        members: [senderId, recieverId],
      });
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      message: text,
    });

    convo.messages.push(newMessage._id);

    await Promise.all([convo.save(), newMessage.save()]);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      newMessage,
    });
  } catch (error) {
    console.log("SEND MSG ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const currentUserId = req.user.userId;
    const chatUserId = req.params.chatUserId;

    if (!chatUserId || !currentUserId) {
      return res.status(400).json({
        success: false,
        message: "something went wrong",
      });
    }

    const chatUser = await User.findById(chatUserId);
    if (!chatUser) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    const convo = await Conversation.findOne({
      members: { $all: [currentUserId, chatUserId] },
    }).populate("messages").populate("members","-password");

    return res.status(200).json({
      success: true,
      message: "All messages fetched successfully",
      conversation: convo,
    });
  } catch (error) {
    console.log("GET MSG ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
