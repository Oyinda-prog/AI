import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(express.json());
app.use(cors()); 

require('dotenv').config()
const PORT=process.env.port
const apikey=process.env.apikey
const client = new OpenAI({
    apiKey:apikey, 
});

app.post("/chat", async (req, res) => {
    try {
        const userPrompt = req.body.prompt;
        if (!userPrompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: userPrompt }],
        });

        res.json({ ai: completion.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

// const PORT = 3400;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
