import { Text, View } from "native-base";
import { TouchableOpacity } from "react-native";

export default function HeaderAI() {
    return (
        <View className="flex-row margin-top-20 w-full bg-white py-20">
            <TouchableOpacity onPress={() => {}}>
                <Text> {'<'} </Text>
            </TouchableOpacity>   
            <Text className="text-black text-5xl font-bold"> Chat Bot </Text>
            <TouchableOpacity onPress={() => {}}>
                <Text> ⚙️ </Text>
            </TouchableOpacity>
        </View>
    )
}