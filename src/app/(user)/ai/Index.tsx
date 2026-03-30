import { View, Text } from "native-base";
import { useEffect, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import HeaderAI from "../../../components/ChatBot/Header";
import InputAI from "../../../components/ChatBot/ChatInput";
import OutputAI from "../../../components/ChatBot/ChatOutput";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Message {
  from: string;
  message: string;
}

interface ChatBotContent {
  role: string;
  parts: [
    {
      text: string;
    },
  ];
}
interface ChatBotRequest {
  contents: ChatBotContent[];
  generationConfig: {
    temperature: number;
    topK: number;
    topP: number;
    maxOutputTokens: number;
  };
}

export default function ChatBot() {
  async function sendMessage() {
    if (msg.trim() === "") return;
    const usermsg = msg.trim();

    let updateMsgs = [...msgs, { from: "user", message: usermsg }];
    
    setMsgs(updateMsgs);
    setMsg("");
    let newRequest: ChatBotRequest = {
      contents: [
        ...request.contents,
        { role: "user", parts: [{ text: usermsg }] },
      ],
      generationConfig: request.generationConfig,
    };

    setRequest(newRequest);
    setLoading(true);
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": "AIzaSyCXCgWIlUTFnT-aSLo4W-fZyoujYzxbgPY",
        },
        body: JSON.stringify(newRequest),
      },
    );
    setLoading(false);
    if (!res.ok) {
      throw new Error("Gemini API error");
    }

    const json = await res.json();

    const responsetext = json.candidates[0].content.parts[0].text || "Error. No response.";
    
    updateMsgs = [...updateMsgs, { from: "bot", message: responsetext }];
    newRequest = {
      ...newRequest,
      contents: [
        ...newRequest.contents,
        {
          role: "model",
          parts: [{text: responsetext}]
        }
      ]
    };

    setMsgs(updateMsgs);
    setRequest(newRequest);

    await AsyncStorage.setItem("chat_history", JSON.stringify(updateMsgs));
    await AsyncStorage.setItem("request_history", JSON.stringify(newRequest));
  }


  const [request, setRequest] = useState<ChatBotRequest>({
    contents: [],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 8192,
    },
  });

  const [msg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [msgs, setMsgs] = useState<Message[]>([]);

  useEffect(() => {
    async function loadChatHistory() {
      const history = await AsyncStorage.getItem("chat_history");
      if (history) {
        setMsgs(JSON.parse(history));
      }
    }
    async function loadRequestHistory() {
      const history = await AsyncStorage.getItem("request_history");
      if (history) {
        setRequest(JSON.parse(history));
      }
    }
    loadChatHistory();
    loadRequestHistory();
  }, []);

  async function deleteChat() {
    setMsgs([]);
    async function clearStorage() {
      await AsyncStorage.removeItem("chat_history");
      await AsyncStorage.removeItem("request_history");
    }
    await clearStorage();

    setRequest({
      contents: [],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
      },
    });
  }
  
  function handleSuggestion(suggestion: string) {
    setMsg(suggestion);
    sendMessage();
  }
  
  return (
    <View className="flex-col flex-1 flex bg-slate-0">
      <HeaderAI deleteChat={deleteChat}/>
      <OutputAI msgs={msgs} loading={loading} handleSuggestion={handleSuggestion} />
      <InputAI sendMessage={sendMessage} msg={msg} setMsg={setMsg} />
    </View>
  );
}
