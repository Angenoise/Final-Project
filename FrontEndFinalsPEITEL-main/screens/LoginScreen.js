// frontend/screens/LoginScreen.js (FULL, UPDATED CODE)

import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext'; // Assuming you use this for styling

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    // FIX: Ensure you destructure all necessary functions from AuthContext
    const { isLoading, login, setAuthError } = useContext(AuthContext); 
    const { theme } = useTheme();

    const handleLogin = () => {
        // Clear any previous error before attempting a new login
        if (setAuthError) { // Check if setAuthError exists before calling (safer)
            setAuthError(null); 
        }
        login(username, password);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.title, { color: theme.primary }]}>Digital Dietitian</Text>

            <TextInput
                style={[styles.input, { borderColor: theme.border, color: theme.text, backgroundColor: theme.card }]}
                placeholder="Username"
                placeholderTextColor={theme.subtext}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                style={[styles.input, { borderColor: theme.border, color: theme.text, backgroundColor: theme.card }]}
                placeholder="Password"
                placeholderTextColor={theme.subtext}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity 
                style={[styles.button, { backgroundColor: theme.primary }]} 
                onPress={handleLogin}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Login</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={[styles.registerText, { color: theme.subtext }]}>
                    Don't have an account? Register
                </Text>
            </TouchableOpacity>
            
            {/* Display Auth Error if it exists (assuming authError is in AuthContext) */}
            {/* {authError && <Text style={[styles.errorText, { color: theme.error }]}>{authError}</Text>} */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 40,
        letterSpacing: 0.5,
    },
    input: {
        width: '100%',
        maxWidth: 320,
        padding: 14,
        borderWidth: 1.5,
        borderRadius: 10,
        marginBottom: 12,
        fontSize: 16,
        fontWeight: '500',
    },
    button: {
        width: '100%',
        maxWidth: 320,
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    registerText: {
        marginTop: 15,
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '500',
    },
    errorText: {
        marginTop: 10,
        textAlign: 'center',
    }
});

export default LoginScreen;