const { Router } = require('express');
const router = Router();
const { asyncHandler } = require('../utils/asyncHandler');
const OpenAI = require('openai');

router.get('/chatroomResp', asyncHandler(async (req, res) => {
    const customerReq = req.body.customerReq;
    const openai = new OpenAI({ apiKey: process.env.CHAT_GPT_TOKEN });
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: customerReq }],
        model: 'gpt-3.5-turbo',
    });
    const resp = chatCompletion.choices[0]?.message?.content;
    res.json({ response: resp });
}));


// require('dotenv').config();
// console.log(process.env.CHAT_GPT_TOKEN)
// const openai = new OpenAI({ apiKey: process.env.CHAT_GPT_TOKEN });
// async function main() {
//     const chatCompletion = await openai.chat.completions.create({
//         messages: [{ role: 'user', content: 'Hi i am elaine, nice to meet you' }],
//         model: 'gpt-3.5-turbo',
//     });
//     console.log(chatCompletion.choices[0]?.message?.content);
// }
// main();