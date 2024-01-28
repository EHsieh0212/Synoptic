const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.CHAT_GPT_TOKEN });
const db = require('./db')

const functions = [
    {
        name: 'list',
        description: 'list queries products by category, and returns a list of title of products',
        parameters: {
            type: 'object',
            properties: {
                category: { type: 'string', enum: ['women', 'men'] },
            },
        },
        function: list,
        parse: JSON.parse,
    },
    {
        name: 'search',
        description: 'search queries products by their title and returns a list of product titles and their ids',
        parameters: {
            type: 'object',
            properties: {
                title: { type: 'string' },
            },
        },
        function: search,
        parse: JSON.parse,
    },
    {
        name: 'get',
        description:
            "get returns a product's detailed information based on the id of the product. Note that this does not accept titles, and only IDs, which you can get by using search.",
        parameters: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
            },
        },
        function: get,
        parse: JSON.parse,
    },
];

async function recommendationByChatbot(userQuestion) {
    const runner = await openai.beta.chat.completions
        .runFunctions({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'Please use our Synoptic product database, which you can access using functions to answer the following questions.',
                },
                {
                    role: 'user',
                    content: userQuestion,
                },
            ],
            functions,
        });

    const result = await runner.finalContent();
    console.log('=============')
    console.log(result)
    return result;
}


async function list({ category }) {
    return db.filter((item) => item.category === category).map((item) => ({ title: item.title, id: item.id }));
}

async function search({ title }) {
    return db.filter((item) => item.title.toLowerCase().includes(title.toLowerCase())).map((item) => ({ title: item.title, id: item.id }));
}

async function get({ id }) {
    return db.find((item) => item.id === id);
}

module.exports = recommendationByChatbot;
