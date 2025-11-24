import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Mail } from "lucide-react-native";
import { useState } from "react";
import { Alert, Button as RNButton, Text, TextInput, View } from "react-native";
import CustomInput from "../../components/Input";

export default function Login() {
  const navigation = useNavigation<any>();
  const handleRouter = () => {
    navigation.navigate("SignUp");
  };
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  async function handlePress() {
    const data = await fetch("https://nestjs-lms-production.up.railway.app/auth/sign-in", {
      "headers": {
        "content-type": "application/json",
        "x-tenant-id": "THINKLAB"
      },
      "body": JSON.stringify({ email, password }),
      "method": "POST",
    });
    const user = await data.json();

    if (user.access_token) {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      Alert.alert("Login Successful", `Welcome back, ${user.fullName}!`);
      navigation.navigate("Home");
    } else {
      Alert.alert("Login Failed", "Invalid email or password.");
    }
  }

  function buttonActive() {
    // false là vẫn đang active, true là đã inactive
    return false;
  }

  return (
    <View className="flex-1 items-center justify-center bg-slate-400">
      <Text className="text-blue-300 text-2xl font-bold">Login</Text>
      <CustomInput icon={<Mail size={20} color="gray" />} label="Email" placeholder="Enter your email" onChangeText={setEmail} value={email} required />
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} style={{ borderWidth: 1, borderColor: 'gray', padding: 10, margin: 5, borderRadius: 5 }} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} style={{ borderWidth: 1, borderColor: 'gray', padding: 10, margin: 5, borderRadius: 5 }} />
      <RNButton title="Login" onPress={handlePress} />
      <RNButton title="Sign Up" onPress={handleRouter} />
    </View>
  );
}