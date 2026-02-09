import { Bot, CircleUser } from "lucide-react-native";
import { ScrollView, Text, View } from "native-base";
import { useState } from "react";
import MessagesAI from "./Messeges";
import { LoadingDots } from '@mrakesh0608/react-native-loading-dots';
interface OutputAIProps {
    from: string;
    message: string;
}

export default function OutputAI({ msgs } : { msgs: OutputAIProps[] }) {

    return (
        <View className="flex-1">
            <ScrollView className="flex-1 px-4 py-2 bg-blue-50" contentContainerStyle={{ paddingBottom: 16 }}>    
                {msgs.map((msg: any, index: number) => (
                    <MessagesAI key={index} msg={msg.message} from={msg.from} />
                ))}
            </ScrollView>

            <View className="bg-blue-50 py-2">
                <Bot size={22} color="#fff" />
            </View>
        </View>
    );
}