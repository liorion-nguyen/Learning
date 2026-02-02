import { Text, View } from "native-base";
import { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";

export default function InputAI() {
    const [msg, setMsg] = useState<string>("");

    return (
        <View className="flex-row w-full items-center justify-between padding-4 bg-green-400">
            <TextInput style={{display: 'flex', flexDirection: 'column', marginBottom: 16,}} placeholder="Type your message..." className="w-4/5 mt-4" value={msg} onChangeText={setMsg} />
            <TouchableOpacity onPress={() => {}}>
                <Text> Send </Text>
            </TouchableOpacity>
        </View>
    )
}