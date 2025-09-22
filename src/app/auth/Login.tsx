import { Image, Text, View } from "react-native";
// import Button from "../../components/Button";
import Input from "../../components/Input";
import { useNavigation } from "@react-navigation/native";
import { Button } from "native-base";

export default function Login() {
  const navigation = useNavigation<any>();
  const handleRouter = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View className="flex-1 items-center justify-center bg-slate-400">
      <Text className="text-white text-2xl font-bold">Login</Text>
      <Input placeholder="Email" onChangeText={() => { }} />
      <Input placeholder="Password" secureTextEntry onChangeText={() => { }} />
      <Button title="Login" onPress={() => { }} icon={<Image source={require("../../../assets/icon.png")} style={{ width: 20, height: 20 }} />} />
      <Button onPress={() => console.log("hello world")}>Click Me</Button>
      <Button title="Sign Up" onPress={handleRouter} />
    </View>
  );
}