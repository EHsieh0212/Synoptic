const OpenAI = require('openai');


require('dotenv').config();
const openai = new OpenAI({ apiKey: process.env.CHAT_GPT_TOKEN });

const recommendationAboutSynoptic = async (fashionPrompt) => {
    const runner = openai.beta.chat.completions
        .runTools({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: fashionPrompt }],
            tools: [
                {
                    type: 'function',
                    function: {
                        function: getOccasion,
                        parse: JSON.parse,
                        parameters: {
                            type: 'object',
                            properties: {
                                location: { type: 'string' },
                            },
                        },
                    },
                },
            ],
        })
        .on('message', (message) => console.log(message));
    const finalContent = await runner.finalContent();
    console.log();
    console.log('Final content:', finalContent);
};

async function getTargetGarmet(args) {
    const { location } = args;
    const gender = 'a man';
    const targetClothesToBuy = "want to buy a skirt"
    return { gender, targetClothesToBuy };
}


consulAboutFashion();

module.exports = {
    recommendationAboutSynoptic,
}