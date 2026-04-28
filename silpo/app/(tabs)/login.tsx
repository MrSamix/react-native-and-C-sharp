import { ThemedText } from '@/components/themed-text';
import { ThemedTextInput } from '@/components/themed-textinput';
import { ThemedView } from '@/components/themed-view';
import React, { useState } from 'react'
import { Alert, Pressable, useColorScheme, StyleSheet } from 'react-native';

const LoginPage = () => {
    const colorScheme = useColorScheme();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onLogin = () => {
        Alert.alert('Login', `E-mail: ${email}\nPassword: ${password}`)
    }

    return (
        <ThemedView className="flex-1 p-4 mt-[120px] gap-2.5">
            <ThemedText className="text-2xl font-semibold mb-3 text-center">Login</ThemedText>

            <ThemedText className="text-sm font-medium">E-mail</ThemedText>
            <ThemedTextInput
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType='emailAddress'
                placeholder="Enter e-mail"
                className="border border-[#ccc] rounded-lg px-3 py-2.5"
            />

            <ThemedText className="text-sm font-medium">Password</ThemedText>
            <ThemedTextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Enter password"
                className="border border-[#ccc] rounded-lg px-3 py-2.5"
            />

            <Pressable
                onPress={onLogin}
                className={`mt-2 py-3 rounded-lg items-center ${colorScheme === 'dark' ? 'border border-[#eee]' : 'bg-[#111]'}`}
            >
                <ThemedText style={styles.buttonText}>Login</ThemedText>
            </Pressable>
        </ThemedView>
    )
}

export default LoginPage;

const styles = StyleSheet.create({
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    }
});