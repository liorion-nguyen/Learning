import { SendHorizontal } from "lucide-react-native";
import { Text, View } from "native-base";
import { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";

export default function InputAI({sendMessage, msg, setMsg} : { sendMessage: () => void; msg: string; setMsg: (msg: string) => void }) {

    return (
        <View className="flex-row items-center w-full px-3 py-2 bg-white border-t border-gray-200">
            <View className="flex-1 mr-2">
                <TextInput
                    placeholder="Type your message..."
                    className="bg-gray-100 rounded-full px-4 py-2 text-base text-gray-900"
                    value={msg}
                    onChangeText={setMsg}
                    multiline
                    style={{ minHeight: 40, maxHeight: 100 }}
                />
            </View>
            <TouchableOpacity
                onPress={sendMessage}
                className="bg-blue-500 rounded-full p-3 active:bg-blue-600"
                activeOpacity={0.7}
            >
                <SendHorizontal size={20} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}