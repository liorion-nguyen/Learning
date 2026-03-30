import { Bot, CircleUser, Copy } from "lucide-react-native";
import { Text, View } from "native-base";
import { TouchableOpacity } from "react-native";
import Markdown from "react-native-markdown-display";
import * as Clipboard from "expo-clipboard";

export default function MessagesAI({ msg, from } : { msg: string; from: string}) {

    const markdownStyles = {
        body: {
            color: from === 'bot' ? '#1f2937' : '#1e3a8a',
            fontSize: 16,
            fontFamily: 'System',
        },
        paragraph: {
            marginTop: 0,
            marginBottom: 8,
        },
        heading1: {
            fontSize: 20,
            fontWeight: 'bold' as const,
            marginBottom: 8,
        },
        heading2: {
            fontSize: 18,
            fontWeight: 'bold' as const,
            marginBottom: 6,
        },
        heading3: {
            fontSize: 16,
            fontWeight: 'bold' as const,
            marginBottom: 4,
        },
        code_inline: {
            backgroundColor: from === 'bot' ? '#f3f4f6' : '#e0e7ff',
            color: from === 'bot' ? '#dc2626' : '#7c3aed',
            paddingHorizontal: 4,
            paddingVertical: 2,
            borderRadius: 4,
            fontFamily: 'monospace',
        },
        code_block: {
            backgroundColor: from === 'bot' ? '#f3f4f6' : '#e0e7ff',
            padding: 12,
            borderRadius: 8,
            marginVertical: 8,
        },
        fence: {
            backgroundColor: from === 'bot' ? '#f3f4f6' : '#e0e7ff',
            padding: 12,
            borderRadius: 8,
            marginVertical: 8,
        },
        list_item: {
            marginBottom: 4,
        },
        bullet_list: {
            marginBottom: 8,
        },
        ordered_list: {
            marginBottom: 8,
        },
        link: {
            color: from === 'bot' ? '#2563eb' : '#1e40af',
            textDecorationLine: 'underline' as const,
        },
        strong: {
            fontWeight: 'bold' as const,
        },
        em: {
            fontStyle: 'italic' as const,
        },
        blockquote: {
            borderLeftWidth: 4,
            borderLeftColor: from === 'bot' ? '#9ca3af' : '#60a5fa',
            paddingLeft: 12,
            marginVertical: 8,
            backgroundColor: from === 'bot' ? '#f9fafb' : '#eff6ff',
        },
    };

    async function copy() {
        await Clipboard.setStringAsync(msg);
    }

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
                <Markdown style={markdownStyles}>
                    {msg}
                </Markdown>
            </View>
            <TouchableOpacity className="ml-2" onPress={copy}>
                <Copy size={16} color="#9ca3af"/>
            </TouchableOpacity>
        </View>
    );
}