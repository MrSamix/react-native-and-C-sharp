import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Control, Controller, FieldError, FieldValues } from "react-hook-form";
import { Eye, EyeOff } from 'lucide-react-native';
import { ThemedTextInput } from "@/components/themed-textinput";
import { IAccountRegister } from "@/types/account/IAccountRegister";
import { ThemedText } from "@/components/themed-text";

interface Props<T extends FieldValues> {
    control: Control<T> | undefined;
    isLoading: boolean;
    error: FieldError | undefined;
    label: string;
}

export const PasswordInput: React.FC<Props<IAccountRegister>> = ({ control, error, isLoading, label }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <View className="gap-2">
            <ThemedText className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                {label}
            </ThemedText>
            <Controller
                control={control}
                name="password"
                rules={{
                    required: 'Пароль є обов\'язковим',
                    minLength: {
                        value: 6,
                        message: 'Пароль має бути не менше 6 символів',
                    },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <View className={`flex-row justify-between items-center border-2 rounded-xl pr-4 ${error
                            ? 'border-red-400 dark:border-red-500'
                            : 'border-slate-200 dark:border-slate-700'
                            }`}>
                            <ThemedTextInput
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                secureTextEntry={!showPassword}
                                editable={!isLoading}
                                placeholder="Enter password"
                                className="flex-1 align-middle"
                                style={{borderWidth: 0}}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                disabled={isLoading}
                                className="pl-2"
                            >
                                {showPassword ? (
                                    <EyeOff size={20} className="text-slate-500 dark:text-red-500" />
                                ) : (
                                    <Eye size={20} className="text-slate-500 dark:text-red-500" />
                                )}
                            </TouchableOpacity>
                        </View>
                        {error && (
                            <Text className="text-sm text-red-500 dark:text-red-400 ml-1">
                                {error.message}
                            </Text>
                        )}
                    </>
                )}
            />
        </View>
    )
}