import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { ThemeContext } from './ThemeContext';
import { supabase } from './supabase';

    export default function LoginScreen({ navigation }: any) {
    const { theme } = useContext(ThemeContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) Alert.alert('Login Failed', error.message);
        setLoading(false);
    };

    return (
        <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={[styles.container, { backgroundColor: theme.background }]}
        >
        <View style={styles.logoContainer}>
            <Ionicons name="football" size={100} color="#D50032" />
            <Text style={[styles.title, { color: theme.text }]}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to manage your squad</Text>
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
            placeholder="Password"
            placeholderTextColor="gray"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            />

            {loading ? (
            <ActivityIndicator size="large" color="#D50032" style={{ marginTop: 10 }} />
            ) : (
            <>
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.8}>
                <Text style={styles.loginButtonText}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.registerButton}
                onPress={() => navigation.navigate('SignUp')}
                >
                <Text style={[styles.registerText, { color: theme.text }]}>
                    Don't have an account? <Text style={styles.registerLink}>Sign Up</Text>
                </Text>
                </TouchableOpacity>
            </>
            )}
        </View>
        </KeyboardAvoidingView>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 40
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 10
    },
    subtitle: {
        fontSize: 16,
        color: 'gray',
        marginTop: 5
    },
    inputContainer: {
        width: '100%'
    },
    input: {
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2
    },
    loginButton: {
        backgroundColor: '#D50032',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10
    },
    loginButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    registerButton: {
        marginTop: 20,
        alignItems: 'center'
    },
    registerText: {
        fontSize: 15
    },
    registerLink: {
        fontWeight: 'bold',
        color: '#D50032'
    }
    });