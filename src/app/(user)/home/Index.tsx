import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from "native-base";
import { use, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Accessibility } from "lucide-react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/auth";

export default function Home() {
    const { user } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState<any>([]);

    useEffect(() => {
        setLoading(true);
        fetchStats();
        setLoading(false);
    }, [])

    async function getToken() {
        const token = await AsyncStorage.getItem("user");
        const user = token ? JSON.parse(token) : null;
        return user.access_token;
    }

    async function fetchStats() {
        const stats = await fetch("https://nestjs-lms-production.up.railway.app/admin/dashboard/stats", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "authorization": `Bearer ${await getToken()}`,
                "x-tenant-id": "THINKLAB"
            },
            "method": "GET",
        });

        const data = await stats.json();
        console.log(data);
        
        setStats([
            {
                "value": data.overview.newEnrollmentsToday.value,
                "label": data.overview.newEnrollmentsToday.label,
                "icon": <Accessibility color={"white"}/>
            },
            {
                "value": data.overview.totalCourses.value,
                "label": data.overview.totalCourses.label,
                "icon": <Accessibility color={"white"} />
            },
            {
                "value": data.overview.totalEnrollments.value,
                "label": data.overview.totalEnrollments.label,
                "icon": <Accessibility color={"white"} />
            },
            {
                "value": data.overview.totalReviews.value,
                "label": data.overview.totalReviews.label,
                "icon": <Accessibility color={"white"} />
            },
            {
                "value": data.overview.totalUsers.value,
                "label": data.overview.totalUsers.label,
                "icon": <Accessibility color={"white"} />
            }
        ]);

    }

    return (
        <View className="flex-1 items-center justify-center bg-slate-950">
            <Text className="text-white text-2xl font-bold">
                Welcome back, {user?.fullName}
            </Text>
            <TouchableOpacity onPress={() => dispatch(logout())} className="mt-4 px-4 py-2 bg-red-600 rounded">
                <Text className="text-white">Logout</Text>
            </TouchableOpacity>
           {
            loading ? <Text>Loading....</Text> : (
                <View>
                    {stats?.map((stat: any) => (
                        <View key={stat.label}>
                            <View>
                                <Text className="text-white">{stat.value}</Text>
                                <Text className="text-white">{stat.label}</Text>
                            </View>
                            {stat.icon}
                        </View>
                    ))}
                </View>
            )
           }
        </View>
    )
}