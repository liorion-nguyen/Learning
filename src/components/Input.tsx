import { StyleSheet, TextInput } from "react-native";

interface InputProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    style?: any;
}

export default function Input({ placeholder, value, onChangeText, secureTextEntry, style }: InputProps) {
    return (
        <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            style={{ ...styles.input, ...style }}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        minWidth: 200,
        width: "100%",
        borderWidth: 1,
        borderColor: "green",
        borderRadius: 10,
        padding: 10
    },
});