import { Image, Text, View } from "react-native";
import Button from "../../components/Button";
import Input from "../../components/Input";

export default function SignUp() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-400">
      <Text className="text-white text-2xl font-bold">Sign Up</Text>
      <Input placeholder="Email" onChangeText={() => {}} />
      <Input placeholder="Password" secureTextEntry onChangeText={() => {}} />
      <Button title="Login" onPress={() => {}} icon={<Image source={require("../../../assets/icon.png")} style={{ width: 20, height: 20 }} />}/>
    </View>
  );
}