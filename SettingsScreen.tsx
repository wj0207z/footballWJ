import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from './ThemeContext';
import { supabase } from './supabase';

export default function SettingScreen() {
    const { isDarkMode, setIsDarkMode, theme } = useContext(ThemeContext);
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

    const handleLogOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
        Alert.alert("Error logging out", error.message);
        }
        // App.tsx will automatically detect the sign out and throw the user back to the Login Screen!
    };

    return (
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

        <TouchableOpacity 
            style={styles.logoutButton} 
            onPress={handleLogOut}
            activeOpacity={0.8}
        >
            <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
        
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderRadius: 10, marginBottom: 10 },
    label: { fontSize: 18 },
    logoutButton: {
        backgroundColor: '#ff3b30', 
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 30,
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});