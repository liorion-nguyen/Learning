import { Text, TouchableOpacity } from "react-native";
interface ButtonProps {
    title?: string;
    icon?: React.ReactNode;
    onPress?: () => void;
    style?: any;
    disable?: boolean;
}

export default function Button({ title, icon, onPress, style, disable }: ButtonProps) {
    return (
        <TouchableOpacity className="flex-row items-center justify-center bg-teal-500 p-2 rounded-md" onPress={onPress} style={{ ...style }} disabled={disable}>
            {icon}
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}