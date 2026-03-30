import { ScrollView, Text, View } from "native-base";
import { useState } from "react";
import MessagesAI from "./Messeges";
import LottieView from "lottie-react-native";
import { TouchableOpacity } from "react-native";
interface OutputAIProps {
  from: string;
  message: string;
}

export default function OutputAI({ msgs, loading, handleSuggestion }: { msgs: OutputAIProps[]; loading: boolean; handleSuggestion: (suggestion: string) => void }) {

  const [suggestions] = useState<string[]>([
    "What is the capital of France?",
    "How does photosynthesis work?",
    "Can you explain quantum computing in simple terms?",
    "What are the benefits of meditation?",
    "How do I make a perfect cup of coffee?"
  ]);

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1 px-4 py-2 bg-blue-50"
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        {msgs.length === 0 && (
          suggestions.map((suggestion: string, index: number) => (
            <TouchableOpacity key={index} onPress={() => handleSuggestion(suggestion)} activeOpacity={0.7}>
              <View className="bg-white rounded-lg px-4 py-3 mb-3 shadow-sm">
                <Text className="text-gray-700 text-base">{suggestion}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}

        {msgs.map((msg: any, index: number) => (
          <MessagesAI key={index} msg={msg.message} from={msg.from} />
        ))}

        {loading && (<LottieView
          source={require("../../../assets/typing.json")}
          autoPlay
          loop
          style={{ width: 50, height: 50 }}
        />)}

      </ScrollView>
    </View>
  );
}
