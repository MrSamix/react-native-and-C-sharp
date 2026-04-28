import { ThemedText } from '@/components/themed-text';
import { ThemedTextInput } from '@/components/themed-textinput';
import { ThemedView } from '@/components/themed-view';
import { useRegisterMutation } from '@/services/apiAccount';
import React, { useState } from 'react';
import { Alert, Pressable, useColorScheme } from 'react-native';

const RegisterPage = () => {
    const colorScheme = useColorScheme();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [register, { isLoading }] = useRegisterMutation();

    const onRegister = async () => {
        try {
            await register({ firstName, lastName, email, password }).unwrap();
            Alert.alert('Success', 'User registered successfully');
        } catch (e: any) {
            Alert.alert('Error', e.data || 'An error occurred during registration');
        }
    };

    return (
        <ThemedView className="flex-1 p-4 mt-[120px] gap-2.5">
            <ThemedText className="text-2xl font-semibold mb-3 text-center">Register</ThemedText>

            <ThemedText className="text-sm font-medium">Firstname</ThemedText>
            <ThemedTextInput
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
                autoCorrect={false}
                placeholder="Enter firstname"
                className="border border-[#ccc] rounded-lg px-3 py-2.5"
            />

            <ThemedText className="text-sm font-medium">Lastname</ThemedText>
            <ThemedTextInput
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
                autoCorrect={false}
                placeholder="Enter lastname"
                className="border border-[#ccc] rounded-lg px-3 py-2.5"
            />

            <ThemedText className="text-sm font-medium">E-mail</ThemedText>
            <ThemedTextInput
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
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
                onPress={onRegister}
                disabled={isLoading}
                className={`mt-2 py-3 rounded-lg items-center ${colorScheme === 'dark' ? 'border border-[#eee]' : 'bg-[#111]'} ${isLoading ? 'opacity-60' : ''}`}
            >
                <ThemedText className="text-base font-semibold text-white">{isLoading ? 'Registering...' : 'Register'}</ThemedText>
            </Pressable>
        </ThemedView>
    );
};

export default RegisterPage;
