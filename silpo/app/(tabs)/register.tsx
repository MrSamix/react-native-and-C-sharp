import { ThemedText } from '@/components/themed-text';
import { ThemedTextInput } from '@/components/themed-textinput';
import { ThemedView } from '@/components/themed-view';
import { useRegisterMutation } from '@/services/apiAccount';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, useColorScheme } from 'react-native';

const RegisterPage = () => {
    const colorScheme = useColorScheme();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [register, {isLoading}] = useRegisterMutation();

    const onRegister = async () => {
        try {
            await register({ firstName, lastName, email, password }).unwrap();
            Alert.alert('Success', 'User registered successfully');
        } catch (e: any) {
            Alert.alert('Error', e.data || 'An error occurred during registration');
        }
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.title}>Register</ThemedText>

            <ThemedText style={styles.label}>Firstname</ThemedText>
            <ThemedTextInput
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
                autoCorrect={false}
                placeholder="Enter firstname"
                style={styles.input}
            />

            <ThemedText style={styles.label}>Lastname</ThemedText>
            <ThemedTextInput
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
                autoCorrect={false}
                placeholder="Enter lastname"
                style={styles.input}
            />

            <ThemedText style={styles.label}>E-mail</ThemedText>
            <ThemedTextInput
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
                placeholder="Enter e-mail"
                style={styles.input}
            />

            <ThemedText style={styles.label}>Password</ThemedText>
            <ThemedTextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Enter password"
                style={styles.input}
            />

            <Pressable
                onPress={onRegister}
                disabled={isLoading}
                style={colorScheme === 'dark' ? styles.buttonDark : styles.button}
            >
                <ThemedText style={styles.buttonText}>{isLoading ? 'Registering...' : 'Register'}</ThemedText>
            </Pressable>
        </ThemedView>
    );
};

export default RegisterPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        gap: 10,
        marginTop: 120,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 12,
        textAlign: 'center',
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    button: {
        marginTop: 8,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: '#111',
    },
    buttonDark: {
        marginTop: 8,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        borderColor: '#eee',
        borderWidth: 1,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});