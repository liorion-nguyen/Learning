import { View, Text} from "native-base";
import { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import HeaderAI from "../../../components/ChatBot/Header";
import InputAI from "../../../components/ChatBot/ChatInput";
import OutputAI from "../../../components/ChatBot/ChatOutput";

export default function ChatBot() {
    const [msg, setMsg] = useState<string>("");
    return (
        <View className="flex-col flex-1 flex bg-slate-0">
            <HeaderAI />
            <OutputAI />
            <InputAI />
        </View>
    )
}