import { Image, Text, View, Button as RNButton, TextInput, Button, Alert } from "react-native";
// import Button from "../../components/Button";
// import Input from "../../components/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function Login() {
  const navigation = useNavigation<any>();
  const handleRouter = () => {
    navigation.navigate("SignUp");
  };

  function handlePress() {
    console.log(email, password);
    navigation.navigate("Home");
  }

  function handleChangeEmail(text: string) {
    console.log("Email changed:", text);
  }

  const [count, setCount] = useState(0);
  function handleIncrement() {
    setCount(count + 1);
  }

  function handleDecrement() {
    setCount(count - 1);
  }

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <View className="flex-1 items-center justify-center bg-slate-400">
      <Text className="text-blue-300 text-2xl font-bold">Login</Text>
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} style={{ borderWidth: 1, borderColor: 'gray', padding: 10, margin: 5, borderRadius: 5 }} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} style={{ borderWidth: 1, borderColor: 'gray', padding: 10, margin: 5, borderRadius: 5 }} />
      <RNButton title="Login" onPress={handlePress} />
      <Button title="Click Me" onPress={() => console.log("hello world")} />
      <RNButton title="Sign Up" onPress={handleRouter} />

      <Button title="+" onPress={handleIncrement} />
      <Text className={`${count >= 10 ? "text-green-500" : count <= -10 ? "text-red-500" : "text-white"} text-2xl font-bold`}>{count}</Text>
      <Button title="-" onPress={handleDecrement} />
    </View>
  );
}