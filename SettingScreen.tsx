import { useContext, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { ThemeContext } from './ThemeContext';

export default function SettingsScreen() {
  // 1. GLOBAL STATE: Dark Mode (controlled by ThemeContext so the whole app updates)
    const { isDarkMode, setIsDarkMode, theme } = useContext(ThemeContext);

    // 2. LOCAL STATE: Notifications (controlled right here on this screen)
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

    return (
        // Notice how we inject the theme colors into the style arrays!
        <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.header, { color: theme.text }]}>App Preferences</Text>
        
        {/* Dark Mode Row */}
        <View style={[styles.row, { backgroundColor: theme.card }]}>
            <Text style={[styles.label, { color: theme.text }]}>Dark Mode</Text>
            <Switch
            onValueChange={() => setIsDarkMode(!isDarkMode)}
            value={isDarkMode}
            />
        </View>

        {/* Notifications Row */}
        <View style={[styles.row, { backgroundColor: theme.card }]}>
            <Text style={[styles.label, { color: theme.text }]}>Notifications</Text>
            <Switch
            onValueChange={() => setIsNotificationsEnabled(!isNotificationsEnabled)}
            value={isNotificationsEnabled}
            />
        </View>
        </View>
    );
    }

    // Keep the base structural styles here (margins, padding, flex)
    // The colors are handled dynamically above!
    const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20 
    },
    header: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 20 
    },
    row: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: 20, 
        borderRadius: 10, 
        marginBottom: 10 
    },
    label: { 
        fontSize: 18 
    }
});