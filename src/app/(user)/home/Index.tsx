import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Home() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        // call api
        setLoading(false);
    }, [])
    return (
        <View className="flex-1 items-center justify-center bg-slate-950">
           {
            loading ? <Text>Loading....</Text> : (
                <Text>Hello World</Text>
            )
           }
        </View>
    )
}