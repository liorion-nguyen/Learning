import { Pressable, Text, View } from "native-base";
import { TouchableOpacity } from "react-native";
import { Box, ChevronLeft, MenuIcon, Settings } from "lucide-react-native";
import Menu, { MenuItem } from "../Menu";
import { useState } from "react";

export default function HeaderAI({deleteChat} : { deleteChat: () => void }) {
  const [showMenu, setShowMenu] = useState(false);

  const fontOptions: MenuItem[] = [
    { label: "Delete chat", value: "delete" },
  ];

  const handleFontSelect = (item: MenuItem) => {
    if (item.value === "delete") {
        deleteChat();
    }
  };

  return (
    <View className="flex-row items-center justify-between w-full bg-white py-4 px-4 border-b border-gray-200 shadow-sm">
      <TouchableOpacity
        onPress={() => {}}
        className="p-2 rounded-full bg-gray-100"
      >
        <ChevronLeft size={22} color="#222" />
      </TouchableOpacity>
      <Text className="text-black text-2xl font-bold tracking-wide">
        Chat Bot
      </Text>
      <Pressable
        onPress={() => setShowMenu(true)}
        className="p-2 rounded-full bg-gray-100"
        accessibilityLabel="More options menu"
      >
        <Settings size={22} color="#222" />
      </Pressable>

      <Menu
        visible={showMenu}
        onClose={() => setShowMenu(false)}
        items={fontOptions}
        onItemPress={handleFontSelect}
        position="top-right"
        width={190}
      />
    </View>
  );
}
