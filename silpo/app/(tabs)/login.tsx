import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { EmailInput } from '@/constants/form/EmailInput';
import { PasswordInput } from '@/constants/form/PasswordInput';
import { useLoginMutation } from '@/services/apiAccount';
import { IAccountLogin } from '@/types/account/IAccountLogin';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useColorScheme, StyleSheet, View, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';

const LoginPage = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<IAccountLogin>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur',
    });

    const colorScheme = useColorScheme();
    const [login, {isLoading, error}] = useLoginMutation();


    const onSubmit = async (data: IAccountLogin) => {
        try {
            console.log('Form data:', data);
            // send to API
        }
        catch (ex) {
            console.log("Error occured", ex);
        }
    };

    return (
        <KeyboardAvoidingView
            className='flex-1'
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ThemedView className="flex-1 p-4 mt-[120px] gap-2.5">
                    <ThemedText className="text-2xl font-semibold mb-3 text-center">Login</ThemedText>

                    {error && (
                        <View className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-xl p-4">
                            <Text className="text-red-700 dark:text-red-200 text-sm font-medium">
                                Не вірно вказано дані
                            </Text>
                        </View>
                    )}

                    {/* Email Field */}
                    <EmailInput control={control} error={errors.email} isLoading={isLoading} label="E-mail" />

                    {/* Password Field */}
                    <PasswordInput control={control} error={errors.password} isLoading={isLoading} label="Password" />

                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        className={`mt-2 py-3 rounded-lg items-center ${colorScheme === 'dark' ? 'border border-[#eee]' : 'bg-[#111]'}`}
                    >
                        <ThemedText style={styles.buttonText}>Login</ThemedText>
                    </TouchableOpacity>
                </ThemedView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        
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