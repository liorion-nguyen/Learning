import { Text, View } from "native-base";
import { TouchableOpacity } from "react-native";
import { ChevronLeft, Settings } from "lucide-react-native";

export default function HeaderAI() {
    return (
        <View className="flex-row items-center justify-between w-full bg-white py-4 px-4 border-b border-gray-200 shadow-sm">
            <TouchableOpacity onPress={() => {}} className="p-2 rounded-full bg-gray-100">
                <ChevronLeft size={22} color="#222" />
            </TouchableOpacity>
            <Text className="text-black text-2xl font-bold tracking-wide">Chat Bot</Text>
            <TouchableOpacity onPress={() => {}} className="p-2 rounded-full bg-gray-100">
                <Settings size={22} color="#222" />
            </TouchableOpacity>
        </View>
    );
}