import { Text, TextInput, View } from "react-native";

interface InputProps {
    label?: string;
    required?: boolean;
    placeholder?: string;
    icon?: React.ReactNode;
    value?: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    styleInput?: any;
    styleLabel?: any;
}

export default function CustomInput({ label, required = false, placeholder = "", icon, value = "", onChangeText, secureTextEntry = false, styleInput, styleLabel }: InputProps) {
    return (
        <View className="flex flex-col gap-2 w-full">
            <View className="flex flex-row gap-1">
                <Text style={{ ...styleLabel }}>{label}</Text>
                {required && <Text className="text-red-500">*</Text>}
            </View>
            <View className="flex flex-row gap-2 items-center border border-gray-300 rounded-md p-2">
                {icon}
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    style={{ ...styleInput }}
                />
            </View>
        </View>
    )
}