import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from './ThemeContext';
import { supabase } from './supabase';

export default function SignUpScreen({ navigation }: any) {
    const { theme } = useContext(ThemeContext);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        setLoading(true);
        
        // This connects to Supabase to register the new user
        const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
        });

        if (error) {
        Alert.alert('Registration Failed', error.message);
        } else {
        Alert.alert(
            'Success! 🚀', 
            'Your account has been created. If email confirmations are on, check your inbox. Otherwise, you can now log in.',
            [{ text: "OK", onPress: () => navigation.navigate('Login') }] // Sends them back to Login when they click OK
        );
        }
        setLoading(false);
    };

    return (
        <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.container, { backgroundColor: theme.background }]}
        >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color={theme.text} />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
            <Ionicons name="person-add" size={80} color="#D50032" />
            <Text style={[styles.title, { color: theme.text }]}>Create Account</Text>
            <Text style={styles.subtitle}>Join the squad today</Text>
        </View>

        <View style={styles.inputContainer}>
            <TextInput
            style={[styles.input, { backgroundColor: theme.card, color: theme.text }]}
            placeholder="Email"
            placeholderTextColor="gray"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            />
            <TextInput
            style={[styles.input, { backgroundColor: theme.card, color: theme.text }]}
            placeholder="Password (min 6 chars)"
            placeholderTextColor="gray"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            />
            {loading ? (
            <ActivityIndicator size="large" color="#D50032" style={{ marginTop: 10 }} />
            ) : (
            <TouchableOpacity style={styles.primaryButton} onPress={handleSignUp} activeOpacity={0.8}>
                <Text style={styles.primaryButtonText}>Sign Up</Text>
            </TouchableOpacity>
            )}
        </View>
        </KeyboardAvoidingView>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    backButton: { position: 'absolute', top: 60, left: 20, zIndex: 10 },
    logoContainer: { alignItems: 'center', marginBottom: 40 },
    title: { fontSize: 32, fontWeight: 'bold', marginTop: 10 },
    subtitle: { fontSize: 16, color: 'gray', marginTop: 5, textAlign: 'center', paddingHorizontal: 20 },
    inputContainer: { width: '100%' },
    input: { padding: 15, borderRadius: 10, fontSize: 16, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
    primaryButton: { backgroundColor: '#D50032', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
    primaryButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});