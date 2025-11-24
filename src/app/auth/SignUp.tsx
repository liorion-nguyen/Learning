import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import Button from "../../components/Button";
import Input from "../../components/Input";

export default function SignUp() {
  const navigation = useNavigation<any>();
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleSignUp() {
    const data = await fetch("https://nestjs-lms-production.up.railway.app/auth/sign-up", {
      "headers": {
        "content-type": "application/json",
        "x-tenant-id": "THINKLAB"
      },
      "body": JSON.stringify({ fullName, email, password }),
      "method": "POST",
    });
    const user = await data.json();
    if (user.userId) {
      Alert.alert("Sign Up Successful", `Welcome, ${fullName}!`);
      navigation.navigate("OTPVerify", { userId: user.userId }); // navigate verify otp
    } else {
      Alert.alert("Sign Up Failed", user.message);
    }
  }
  return (
    <View className="flex-1 items-center justify-center bg-slate-400">
      <Text className="text-white text-2xl font-bold">Sign Up</Text>
      <Input placeholder="Full Name" onChangeText={setFullName} value={fullName} />
      <Input placeholder="Email" onChangeText={setEmail} value={email} />
      <Input placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />
      <Button title="Sign Up" onPress={handleSignUp} icon={<Image source={require("../../../assets/icon.png")} style={{ width: 20, height: 20 }} />}/>
    </View>
  );
}