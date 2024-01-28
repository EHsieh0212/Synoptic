const { Router } = require('express');
const router = Router();
const { asyncHandler } = require('../utils/asyncHandler');
const recommendationByChatbot = require('../services/chatbot')

router.post('/chatroomRecommend', asyncHandler(async (req, res) => {
    const customerReq = req.body.customerReq;
    console.log(customerReq)
    const recommendationFromChatbot = await recommendationByChatbot(customerReq); // await!!
    res.json({ response: recommendationFromChatbot });
}));

module.exports = router;
