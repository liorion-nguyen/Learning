import { View, Text } from "native-base";
import { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import HeaderAI from "../../../components/ChatBot/Header";
import InputAI from "../../../components/ChatBot/ChatInput";
import OutputAI from "../../../components/ChatBot/ChatOutput";

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
    console.log("Send message:", msg);
    if (msg.trim() === "") return;
    setMsgs((prev) => [...prev, { from: "user", message: msg }]);
    setMsg("");
    const newRequest: ChatBotRequest = {
      contents: [...request.contents, { role: "user", parts: [{ text: msg }] }],
      generationConfig: request.generationConfig,
    };

    setRequest(newRequest);
    console.log("Request sent:", request);

    const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": "AIzaSyCXCgWIlUTFnT-aSLo4W-fZyoujYzxbgPY"
      },
      body: JSON.stringify(newRequest),
    }
  );

  if (!res.ok) {
    throw new Error("Gemini API error");
  }

  const json = await res.json();
  console.log("Response received:", json);
  
    setMsgs((prev) => [
      ...prev,
      {
        from: "bot",
        message:
          "I'm a bot, so I can't tell jokes, but I can help you with other questions!",
      },
    ]);
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

  const [msgs, setMsgs] = useState<Message[]>([]);

  return (
    <View className="flex-col flex-1 flex bg-slate-0">
      <HeaderAI />
      <OutputAI msgs={msgs} />
      <InputAI sendMessage={sendMessage} msg={msg} setMsg={setMsg} />
    </View>
  );
}
