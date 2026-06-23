import { useContext, useState } from 'react';
// 1. We remove SafeAreaView from the 'react-native' import
import { StyleSheet, Switch, Text, View } from 'react-native';
// 2. We import it from our new modern library instead!
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from './ThemeContext';

export default function SettingsScreen() {
    const { isDarkMode, setIsDarkMode, theme } = useContext(ThemeContext);
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

    return (
        // 2. Change the outermost <View> to <SafeAreaView>
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        
        <Text style={[styles.header, { color: theme.text }]}>App Preferences</Text>
        
        <View style={[styles.row, { backgroundColor: theme.card }]}>
            <Text style={[styles.label, { color: theme.text }]}>Dark Mode</Text>
            <Switch
            onValueChange={() => setIsDarkMode(!isDarkMode)}
            value={isDarkMode}
            />
        </View>

        <View style={[styles.row, { backgroundColor: theme.card }]}>
            <Text style={[styles.label, { color: theme.text }]}>Notifications</Text>
            <Switch
            onValueChange={() => setIsNotificationsEnabled(!isNotificationsEnabled)}
            value={isNotificationsEnabled}
            />
        </View>
        
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderRadius: 10, marginBottom: 10 },
    label: { fontSize: 18 }
});