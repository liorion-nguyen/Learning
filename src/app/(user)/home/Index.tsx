import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Home() {
    let data = [
        1,2,3,4,5,6,7,8
    ];
    let newData = data.map((item, index) => {
        if (item % 2 == 0) {
            return item * 4;
        } else {
            return item * 2;
        }
    })
    let oldData = data.filter((item) => item % 2 == 0);
    console.log(newData);
    // Cho mảng điểm[điểm số học sinh là số nguyên]. Tạo ra mảng mới với quy tắc:
    // Nếu điểm > 5 thì sẽ cộng thêm 1
    // Nếu điểm < 5 thì sẽ giảm đi 1.
    // Render Ui lên màn hình mảng điểm mới đã tạo.
    const [users, setUSers] = useState([
        { id: 1, name: "Nguyen Van A", age: 18, status: "active" },
        { id: 2, name: "Nguyen Van B", age: 17, status: "inactive" },
        { id: 3, name: "Nguyen Van C", age: 20, status: "active" },
        { id: 4, name: "Nguyen Van D", age: 15, status: "inactive" },
        { id: 5, name: "Nguyen Van E", age: 30, status: "active" },
    ]);
    function handleActive() {
        return users.filter(user => user.status == "active");
        
    }
    function handleFind() {
        return users.find(user => user.age == 20);
    }
    async function getUserActive() {
        let user = await AsyncStorage.getItem("userActive");
        if (user) {
            console.log(JSON.parse(user));
        }
    }
    getUserActive();


    const route = useRoute<any>();
    const { user } = route.params;
    console.log(user);
    
    return (
        <View className="flex-1 items-center justify-center bg-slate-950">
            <Text>Home</Text>
            {
                handleActive().map((user) => (
                    <Text key={user.id} className="text-white text-lg">{user.name} - {user.age} - {user.status}</Text>
                ))
            }
            <Text className="text-white text-lg">{handleFind()?.name}</Text>
        </View>
    )
}