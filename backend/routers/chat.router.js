import express from "express";
import { createNewChat } from "./../controllers/Chats/createNewChats.js";
import { fetchAllChats } from "./../controllers/Chats/fetchAllChats.js";
import { fetchChatMessages } from "./../controllers/Chats/fetchChatMessage.js";
import { getAiResponse } from "./../controllers/Chats/sendReqest.js";
const router = express.Router();
router.post("/create-new", createNewChat);
router.get("/get-chats", fetchAllChats);
router.get("/get-chatMessage", fetchChatMessages);
router.post("/send-request", getAiResponse);

export default router;
