


import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { View, Text, Spinner, Box, Avatar, VStack, HStack, Pressable, Divider, ScrollView, Image } from "native-base";



export default function Profile() {
  const { user } = useSelector((state: any) => state.auth);
  const [profile, setProfile] = useState<{
    fullName?: string;
    email?: string;
    role?: string;
    createdAt?: string;
    avatar?: string | null;
    grade?: string | null;
  } | null>(user || null);
  const [lessonStats, setLessonStats] = useState<{
    totalEnrolledLessons?: number;
    inProgressLessons?: number;
    completedLessons?: number;
  } | null>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<string>("overview");



  const getToken = async (): Promise<string | null> => {
    try {
      const token = await AsyncStorage.getItem("user");
      const userObj = token ? JSON.parse(token) : null;
      return userObj?.access_token || null;
    } catch {
      return null;
    }
  };



  useEffect(() => {
    const fetchProfileAndStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await getToken();
        if (!token) {
          setError("No token found. Please login.");
          setLoading(false);
          return;
        }

        // Fetch profile
        const profileRes = await fetch("https://nestjs-lms-production.up.railway.app/users/me", {
          headers: {
            accept: "application/json, text/plain, */*",
            authorization: `Bearer ${token}`,
            "x-tenant-id": "THINKLAB"
          },
          method: "GET"
        });
        if (!profileRes.ok) throw new Error("Failed to fetch profile");
        const profileData = await profileRes.json();
        setProfile(profileData);

        // Fetch lesson stats
        const statsRes = await fetch("https://nestjs-lms-production.up.railway.app/users/lesson-stats", {
          headers: {
            accept: "application/json, text/plain, */*",
            authorization: `Bearer ${token}`,
            "x-tenant-id": "THINKLAB"
          },
          method: "GET"
        });
        if (!statsRes.ok) throw new Error("Failed to fetch lesson stats");
        const statsData = await statsRes.json();
        setLessonStats(statsData);

        // Fetch enrolled courses
        const coursesRes = await fetch("https://nestjs-lms-production.up.railway.app/enrollments/my", {
          headers: {
            accept: "application/json, text/plain, */*",
            authorization: `Bearer ${token}`,
            "x-tenant-id": "THINKLAB"
          },
          method: "GET"
        });
        if (!coursesRes.ok) throw new Error("Failed to fetch courses");
        const coursesData = await coursesRes.json();
        setCourses(Array.isArray(coursesData) ? coursesData : []);
      } catch (err: any) {
        setError(err?.message || "Unknown error");
      }
      setLoading(false);
    };
    fetchProfileAndStats();
  }, []);



  // Fallbacks for demo/mockup if user is not set
  const fallbackProfile = {
    fullName: "Nguyen Van A",
    email: "nguyenvana@example.com",
    role: "user",
    createdAt: "2022-01-01",
    avatar: null,
    grade: "Học sinh"
  };
  const displayProfile = profile || fallbackProfile;

  // Sidebar menu items
  const menuItems = [
    { key: "overview", label: "Tổng quan", icon: "🏠" },
    { key: "profile", label: "Hồ sơ", icon: "👤" },
    { key: "courses", label: "Khóa học đã đăng ký", icon: "📚" },
    { key: "reviews", label: "Đánh giá", icon: "⭐" },
    { key: "achievements", label: "Thành tích cá nhân", icon: "📈" },
    { key: "settings", label: "Cài đặt", icon: "⚙️" },
    { key: "logout", label: "Đăng xuất", icon: "🚪" },
  ];


    return (
      <ScrollView className="flex-1 bg-slate-50">
        {/* Header with background image */}
        <Box className="w-full h-44 relative mb-16">
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" }}
            alt="Header Background"
            className="w-full h-44 rounded-b-2xl"
          />
          <Box className="absolute left-6 -bottom-12 flex-row items-center">
            <Avatar
              size="xl"
              source={displayProfile.avatar ? { uri: displayProfile.avatar } : undefined}
              bg="gray.300"
            >{displayProfile.fullName?.charAt(0)}</Avatar>
            <VStack ml={4}>
              <Text className="text-xl font-bold text-white drop-shadow-lg">{displayProfile.fullName}</Text>
              <Text className="text-white text-base">0 Khóa học đã đăng ký</Text>
            </VStack>
          </Box>
        </Box>

        {/* Responsive layout: stack on small screens, row on large */}
        <Box className="flex-col md:flex-row w-full px-2 md:px-4">
          {/* Sidebar menu */}
          <VStack className="bg-white rounded-xl shadow p-4 w-full md:w-40 mb-4 md:mb-0 md:mr-4" space={2}>
            <Text className="text-xs text-gray-500 mb-2">CHÀO MỪNG, {displayProfile.fullName?.toUpperCase()}</Text>
            {menuItems.slice(0, 5).map(item => (
              <Pressable
                key={item.key}
                onPress={() => setSelectedMenu(item.key)}
                className={selectedMenu === item.key ? "bg-orange-100 rounded px-2 py-2 flex-row items-center" : "px-2 py-2 flex-row items-center"}
              >
                <Text className={selectedMenu === item.key ? "text-orange-500 mr-2" : "text-gray-700 mr-2"}>{item.icon}</Text>
                <Text className={selectedMenu === item.key ? "text-orange-500" : "text-gray-700"}>{item.label}</Text>
              </Pressable>
            ))}
            <Divider my={2} />
            {menuItems.slice(5, 6).map(item => (
              <Pressable key={item.key} className="px-2 py-2 flex-row items-center">
                <Text className="text-gray-700 mr-2">{item.icon}</Text>
                <Text className="text-gray-700">{item.label}</Text>
              </Pressable>
            ))}
            {/* Logout button at the bottom for mobile */}
            <Pressable className="px-2 py-2 flex-row items-center mt-4 bg-red-100 rounded" onPress={() => {/* TODO: handle logout */}}>
              <Text className="text-red-500 mr-2">🚪</Text>
              <Text className="text-red-500 font-bold">Đăng xuất</Text>
            </Pressable>
          </VStack>

          {/* Main content */}
          <Box className="flex-1">
            {/* Overview */}
            {selectedMenu === "overview" && (
              <Box className="bg-white rounded-xl shadow p-4 md:p-6 mb-4">
                <Text className="text-lg font-bold mb-4">Tổng quan</Text>
                <HStack space={2} flexWrap="wrap" justifyContent="flex-start">
                  <Box className="bg-blue-50 rounded-lg p-4 flex-1 min-w-[120px] items-center mb-2">
                    <Text className="text-blue-500 text-2xl md:text-3xl font-bold">{lessonStats?.totalEnrolledLessons ?? 0}</Text>
                    <Text className="text-blue-500 mt-2 text-xs md:text-base">Khóa học đã đăng ký</Text>
                  </Box>
                  <Box className="bg-red-50 rounded-lg p-4 flex-1 min-w-[120px] items-center mb-2">
                    <Text className="text-red-500 text-2xl md:text-3xl font-bold">{lessonStats?.inProgressLessons ?? 0}</Text>
                    <Text className="text-red-500 mt-2 text-xs md:text-base">Khóa học Đang học</Text>
                  </Box>
                  <Box className="bg-green-50 rounded-lg p-4 flex-1 min-w-[120px] items-center mb-2">
                    <Text className="text-green-500 text-2xl md:text-3xl font-bold">{lessonStats?.completedLessons ?? 0}</Text>
                    <Text className="text-green-500 mt-2 text-xs md:text-base">Khóa học Hoàn thành</Text>
                  </Box>
                </HStack>
                {loading && (
                  <View className="flex-row items-center mt-4"><Spinner color="orange.400" size="sm" mr={2} /><Text className="text-orange-400 ml-2">Đang tải...</Text></View>
                )}
                {error && (
                  <Text className="text-red-400 mt-2">{error}</Text>
                )}
              </Box>
            )}

            {/* Profile */}
            {selectedMenu === "profile" && (
              <Box className="bg-white rounded-xl shadow p-4 md:p-6 mb-4">
                <Text className="text-lg font-bold mb-4">Hồ sơ</Text>
                <HStack flexWrap="wrap" justifyContent="space-between">
                  <VStack space={2} minW="48%">
                    <Text className="text-gray-500">Ngày đăng ký</Text>
                    <Text className="font-semibold">{displayProfile.createdAt ? new Date(displayProfile.createdAt).toLocaleString() : "-"}</Text>
                    <Text className="text-gray-500 mt-2">Email</Text>
                    <Text className="font-semibold">{displayProfile.email}</Text>
                  </VStack>
                  <VStack space={2} minW="48%">
                    <Text className="text-gray-500">Họ và tên</Text>
                    <Text className="font-semibold">{displayProfile.fullName}</Text>
                    <Text className="text-gray-500 mt-2">Kỹ năng/Nghề nghiệp</Text>
                    <Text className="font-semibold">{displayProfile.grade || "-"}</Text>
                  </VStack>
                </HStack>
                <Pressable className="mt-6 bg-orange-500 rounded py-2 px-4 items-center" onPress={() => {/* TODO: handle update profile */}}>
                  <Text className="text-white font-bold">Cập nhật hồ sơ</Text>
                </Pressable>
              </Box>
            )}

            {/* Courses */}
            {selectedMenu === "courses" && (
              <Box className="bg-white rounded-xl shadow p-4 md:p-6 mb-4">
                <Text className="text-lg font-bold mb-4">Khóa học đã đăng ký</Text>
                {loading ? (
                  <View className="flex-row items-center"><Spinner color="orange.400" size="sm" mr={2} /><Text className="text-orange-400 ml-2">Đang tải...</Text></View>
                ) : error ? (
                  <Text className="text-red-400">{error}</Text>
                ) : courses.length === 0 ? (
                  <Text className="text-gray-500">Bạn chưa đăng ký khóa học nào.</Text>
                ) : (
                  <VStack space={4}>
                    {courses.map((enrollment, idx) => (
                      <Box key={enrollment.id || idx} className="flex-col md:flex-row items-center bg-slate-100 rounded-lg p-4">
                        <Image
                          source={{ uri: enrollment.product?.thumbnail || "https://via.placeholder.com/80x60" }}
                          alt={enrollment.product?.title || "Course thumbnail"}
                          className="w-full md:w-20 h-32 md:h-16 rounded-lg mb-2 md:mb-0 md:mr-4"
                        />
                        <VStack flex={1} className="w-full md:w-auto">
                          <Text className="font-bold text-base mb-1">{enrollment.product?.title}</Text>
                          <Text className="text-gray-600 text-xs mb-1" numberOfLines={2}>{enrollment.product?.short_description}</Text>
                          <HStack space={2} alignItems="center" flexWrap="wrap">
                            <Text className="text-xs text-gray-500">Bắt đầu: {enrollment.enrolledAt ? new Date(enrollment.enrolledAt).toLocaleDateString() : "-"}</Text>
                            <Text className="text-xs text-gray-500">Tiến độ: {enrollment.completionPercentage ?? 0}%</Text>
                            {enrollment.isCompleted && <Text className="text-xs text-green-600 font-semibold">Đã hoàn thành</Text>}
                          </HStack>
                          <Pressable className="mt-2 bg-blue-500 rounded py-1 px-3 w-32 items-center self-end" onPress={() => {/* TODO: handle view details */}}>
                            <Text className="text-white text-xs font-bold">Xem chi tiết</Text>
                          </Pressable>
                        </VStack>
                      </Box>
                    ))}
                  </VStack>
                )}
              </Box>
            )}
            {/* Other menu content can be added here */}
          </Box>
        </Box>
      </ScrollView>
    );
  }