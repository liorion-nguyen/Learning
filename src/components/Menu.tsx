import { Text, View } from "native-base";
import { Modal, Pressable, StyleSheet, ViewStyle } from "react-native";

export interface MenuItem {
    label: string;
    value: string;
    disabled?: boolean;
}

interface MenuProps {
    visible: boolean;
    onClose: () => void;
    items: MenuItem[];
    onItemPress: (item: MenuItem) => void;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    width?: number;
}

export default function Menu({
    visible,
    onClose,
    items,
    onItemPress,
    position = 'top-right',
    width = 190,
}: MenuProps) {
    const getPositionStyle = (): ViewStyle => {
        switch (position) {
            case 'top-right':
                return {
                    justifyContent: 'flex-start',
                    alignItems: 'flex-end',
                    paddingTop: 60,
                    paddingRight: 16,
                };
            case 'top-left':
                return {
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    paddingTop: 60,
                    paddingLeft: 16,
                };
            case 'bottom-right':
                return {
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    paddingBottom: 60,
                    paddingRight: 16,
                };
            case 'bottom-left':
                return {
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                    paddingBottom: 60,
                    paddingLeft: 16,
                };
            default:
                return {
                    justifyContent: 'flex-start',
                    alignItems: 'flex-end',
                    paddingTop: 60,
                    paddingRight: 16,
                };
        }
    };

    const handleItemPress = (item: MenuItem) => {
        if (!item.disabled) {
            onItemPress(item);
            onClose();
        }
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable 
                style={[styles.modalOverlay, getPositionStyle()]}
                onPress={onClose}
            >
                <View style={[styles.menuContainer, { minWidth: width }]}>
                    {items.map((item, index) => (
                        <Pressable
                            key={item.value || index}
                            style={[
                                styles.menuItem,
                                item.disabled && styles.menuItemDisabled,
                                index === items.length - 1 && styles.menuItemLast,
                            ]}
                            onPress={() => handleItemPress(item)}
                            disabled={item.disabled}
                        >
                            <Text style={[
                                styles.menuItemText,
                                item.disabled && styles.menuItemTextDisabled,
                            ]}>
                                {item.label}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    menuContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    menuItem: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    menuItemLast: {
        borderBottomWidth: 0,
    },
    menuItemDisabled: {
        opacity: 0.5,
    },
    menuItemText: {
        fontSize: 16,
        color: '#1f2937',
    },
    menuItemTextDisabled: {
        color: '#9ca3af',
    },
});
