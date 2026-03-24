import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Note: SDK does not have a native listModels method in all versions, 
// using REST to be safe
fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`)
  .then(res => res.json())
  .then(data => {
     console.log(data.models.map(m => m.name));
  })
  .catch(console.error);
