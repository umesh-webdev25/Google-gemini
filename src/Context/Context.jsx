import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        const currentPrompt = prompt || input;
        setRecentPrompt(currentPrompt);
        setPrevPrompts(prev => {
            if (!prev.includes(currentPrompt)) {
                return [...prev, currentPrompt];
            }
            return prev;
        });
        
        try {
            const response = await runChat(currentPrompt);
            let cleanedResponse = response
                .replace(/\*\*/g, '')
                .replace(/\*/g, '')
                .replace(/'/g, '')
                .replace(/"/g, '')
                .replace(/`/g, '');

            const words = cleanedResponse.split(/\s+/);

            setResultData("");
            for (let i = 0; i < words.length; i++) {
                delayPara(i, words[i] + (i < words.length - 1 ? " " : ""));
            }

        } catch (error) {
            console.error("Error in onSent:", error);
            setResultData("Error getting response");
        } finally {
            setLoading(false);
            setInput("");
        }
    }

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        loadPrompt
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;