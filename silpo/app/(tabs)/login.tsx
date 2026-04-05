import React, { useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onLogin = () => {
        Alert.alert('Login', `E-mail: ${email}\nPassword: ${password}`)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <Text style={styles.label}>E-mail</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType='emailAddress'
                placeholder="Enter e-mail"
                style={styles.input}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Enter password"
                style={styles.input}
            />

            <Pressable onPress={onLogin} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>
        </View>
    )
}

export default LoginPage;

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
        textAlign: 'center'
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
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
})