import { Bot, CircleUser } from "lucide-react-native";
import { Text, View } from "native-base";

export default function MessagesAI({ msg, from } : { msg: string; from: string }) {
    return (
        <View
            className={
                from === 'bot'
                    ? 'flex-row items-start mb-3'
                    : 'flex-row-reverse items-end mb-3'
            }
        >
            <View
                className={
                    from === 'bot'
                        ? 'bg-blue-500 rounded-full p-2 mr-2'
                        : 'bg-blue-400 rounded-full p-2 ml-2'
                }
            >
                {from === 'bot' ? (
                    <Bot size={22} color="#fff" />
                ) : (
                    <CircleUser size={22} color="#fff" />
                )}
            </View>
            <View
                className={
                    from === 'bot'
                        ? 'bg-white rounded-xl px-4 py-2 max-w-[75%] shadow'
                        : 'bg-blue-100 rounded-xl px-4 py-2 max-w-[75%] shadow'
                }
            >
                <Text
                    className={
                        from === 'bot'
                            ? 'text-gray-800 text-base'
                            : 'text-blue-900 text-base'
                    }
                >
                    {msg}
                </Text>
            </View>
        </View>
    );
}