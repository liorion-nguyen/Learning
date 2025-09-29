import { useNavigation } from "@react-navigation/native";
import { Image } from "native-base";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Home() {
    const navigation = useNavigation<any>();

    const [courses, setCourses] = useState([
        {id: 1, title: "Course 1", description: "Description 1", thumbnail: "https://www.studytienganh.vn/upload/2021/06/106292.jpg"},
        {id: 2, title: "Course 2", description: "Description 2", thumbnail: "https://www.studytienganh.vn/upload/2021/06/106292.jpg"},
        {id: 3, title: "Course 3", description: "Description 3", thumbnail: "https://www.studytienganh.vn/upload/2021/06/106292.jpg"}
    ]);

    return (
        <View className="flex-1 items-center justify-center bg-slate-950">
            <Text>Home</Text>
            {
                courses.map((course, index) => (
                    <View key={index} className="bg-black p-4 m-2 rounded-lg w-80 items-center">
                        <Image source={{uri: course.thumbnail}} className="w-full h-32 rounded-md"/>
                        <Text>{course.title}</Text>
                        <Text>{course.description}</Text>
                    </View>
                ))
            }
        </View>
    )
}