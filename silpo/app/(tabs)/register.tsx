import { EmailInput } from '@/components/form/register/EmailInput';
import { FirstNameInput } from '@/components/form/register/FirstNameInput';
import { LastNameInput } from '@/components/form/register/LastNameInput';
import { PasswordInput } from '@/components/form/register/PasswordInput';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRegisterMutation } from '@/services/apiAccount';
import { IAccountRegister } from '@/types/account/IAccountRegister';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Text, Pressable, useColorScheme, StyleSheet, View } from 'react-native';

const RegisterPage = () => {
    const colorScheme = useColorScheme();

    const [register, { isLoading, error }] = useRegisterMutation();

    const { control, handleSubmit, formState: { errors } } = useForm<IAccountRegister>({
        defaultValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
        },
        mode: 'onBlur',
    });

    const onRegister = async (data: IAccountRegister) => {
        try {
            await register(data).unwrap();
        } catch (e: any) {
            console.log("Registration error", e);
        }
    };

    return (
        <ThemedView className="flex-1 p-4 mt-[120px] gap-2.5">
            <ThemedText className="text-2xl font-semibold mb-3 text-center">Register</ThemedText>

            {error && (
                <View className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-xl p-4">
                    <Text className="text-red-700 dark:text-red-200 text-sm font-medium">
                        {error.data ? error.data : 'Помилка реєстрації'}
                    </Text>
                </View>
            )}

            {/* Firstname Field */}
            <FirstNameInput control={control} error={errors.firstName} isLoading={isLoading} label="Firstname" />

            {/* Lastname Field */}
            <LastNameInput control={control} error={errors.lastName} isLoading={isLoading} label="Lastname" />

            {/* Email Field */}
            <EmailInput control={control} error={errors.email} isLoading={isLoading} label="E-mail" />
            
            {/* Password Field */}
            <PasswordInput control={control} error={errors.password} isLoading={isLoading} label="Password" />

            <Pressable
                onPress={handleSubmit(onRegister)}
                disabled={isLoading}
                className={`mt-2 py-3 rounded-lg items-center ${colorScheme === 'dark' ? 'border border-[#eee]' : 'bg-[#111]'} ${isLoading ? 'opacity-60' : ''}`}
            >
                <ThemedText style={styles.buttonText}>{isLoading ? 'Registering...' : 'Register'}</ThemedText>
            </Pressable>
        </ThemedView>
    );
};

export default RegisterPage;


const styles = StyleSheet.create({
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    }
});
