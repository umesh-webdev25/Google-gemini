import { createContext, useState, useEffect } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

// Get theme from localStorage or default to 'light'
const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
};

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [theme, setTheme] = useState(getInitialTheme);

    // Update theme in localStorage and document when it changes
    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const saveApiKey = (key) => {
        localStorage.setItem('gemini_api_key', key);
        setApiKey(key);
        setShowApiKeyForm(false);
    };

    const removeApiKey = () => {
        localStorage.removeItem('gemini_api_key');
        setApiKey('');
        setShowApiKeyForm(true);
    };

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
        if (!prompt && !input) {
            console.log("No input provided");
            return;
        }

        setResultData("");
        setLoading(true);
        setShowResult(true);

        const currentPrompt = prompt || input;
        console.log("Sending prompt:", currentPrompt);
        
        setRecentPrompt(currentPrompt);
        setPrevPrompts(prev => {
            if (!prev.includes(currentPrompt)) {
                return [...prev, currentPrompt];
            }
            return prev;
        });
        
        try {
            console.log("Calling runChat with prompt:", currentPrompt);
            const response = await runChat(currentPrompt);
            console.log("Received response:", response);

            if (!response) {
                throw new Error("Empty response received");
            }

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
            setResultData("Error: " + (error.message || "Failed to get response from Gemini"));
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
        loadPrompt,
        theme,
        toggleTheme
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;