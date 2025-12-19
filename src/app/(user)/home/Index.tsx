import AsyncStorage from "@react-native-async-storage/async-storage";
import { BookOpen, Users } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function Home() {
    const { user } = useSelector((state: any) => state.auth);
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState<{ label: string, value: number, icon: React.ReactNode }[]>([]);
    useEffect(() => {
        setLoading(true);
        getStats();
        setLoading(false);
    }, [])

    async function getAccessToken() {
        const token = await AsyncStorage.getItem("user");
        const user = JSON.parse(token || "{}");
        return user.access_token;
    }

    async function getStats() {
        const stats = await fetch("https://nestjs-lms-production.up.railway.app/admin/dashboard/stats", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "authorization": `Bearer ${await getAccessToken()}`,
                "x-tenant-id": "THINKLAB"
            },
            "method": "GET"
        });
        const data = await stats.json();
        setStats([
            {
                label: data.overview.newEnrollmentsToday.label,
                value: data.overview.newEnrollmentsToday.value,
                icon: <BookOpen color="white" />
            },
            {
                label: data.overview.totalCourses.label,
                value: data.overview.totalCourses.value,
                icon: <Users color="white" />
            },
            {
                label: data.overview.totalEnrollments.label,
                value: data.overview.totalEnrollments.value,
                icon: <BookOpen color="white" />
            },
            {
                label: data.overview.totalReviews.label,
                value: data.overview.totalReviews.value,
                icon: <BookOpen color="white" />
            },
            {
                label: data.overview.totalUsers.label,
                value: data.overview.totalUsers.value,
                icon: <BookOpen color="white" />
            }
        ]);
    }
    return (
        <View className="flex-1 items-center justify-center bg-slate-950">
            <Text className="text-white text-2xl font-bold">
                {user.fullName}
            </Text>
            {
                loading ? <Text>Loading....</Text> : (
                    <View>
                        {
                            stats?.map((stat: any) => (
                                <View key={stat.label}>
                                    <View>
                                        <Text className="text-white">{stat.label}</Text>
                                        <Text className="text-white">{stat.value}</Text>
                                    </View>
                                    {stat.icon}
                                </View>
                            ))
                        }
                    </View>
                )
            }
        </View>
    )
}