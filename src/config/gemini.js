import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold
} from "@google/generative-ai";

const MODEL_NAME = "gemini-2.5-flash"; // The correct model name for text generation
const API_KEY = "AIzaSyAjVczdHDro1f4Vf41ZHvzRrwNkzlTYJZg";

async function runChat(prompt) {
  try {
    if (!API_KEY) {
      throw new Error('API key not found. Please check your API key configuration.');
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048
    };

    const chat = model.startChat({
      generationConfig,
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_LOW
        },
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_LOW
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_LOW
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_LOW
        },
        {
          category: HarmCategory.HARM_CATEGORY_CIVIC_INTEGRITY,
          threshold: HarmBlockThreshold.BLOCK_LOW
        }
      ],
      history: []
    });

    try {
      const chatResult = await chat.sendMessage(prompt);
      const response = chatResult.response;
      const text = await response.text();
      console.log('API Response:', text);
      return text;
    } catch (error) {
      console.error('Error in chat:', error);
      if (error.message.includes('404')) {
        throw new Error('Unable to connect to the AI model. Please try again later.');
      } else {
        throw new Error('Failed to get a response. Please try again.');
      }
    }
  } catch (error) {
    console.error('Error in Gemini API:', error);
    throw new Error(error.message || 'An error occurred while processing your request.');
  }
}

export default runChat;