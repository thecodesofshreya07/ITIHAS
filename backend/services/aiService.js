const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const generateExplanation = async (question, correctAnswer) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: `Explain this historical question simply in 2-3 lines.

Question: ${question}
Correct Answer: ${correctAnswer}`,
                },
            ],
            max_tokens: 100,
        });

        return response.choices[0].message.content;
    } catch (err) {
        console.error("AI ERROR:", err.message);
        return "Explanation not available";
    }
};

module.exports = { generateExplanation };