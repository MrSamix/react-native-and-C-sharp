import { Text, View } from "react-native";
import { Control, Controller, FieldError, FieldValues } from "react-hook-form";
import React from "react";
import { ThemedTextInput } from "@/components/themed-textinput";
import { ThemedText } from "@/components/themed-text";
import { IAccountRegister } from "@/types/account/IAccountRegister";

interface Props<T extends FieldValues> {
    control: Control<IAccountRegister, any, IAccountRegister> | undefined;
    isLoading: boolean;
    error: FieldError | undefined;
    label: string;
}

//@ts-ignore
export const EmailInput: React.FC<Props<IAccountRegister>> = ({ control, error, isLoading, label }) => {
    return (
        <View className="gap-2">
            <ThemedText className="text-sm font-medium ml-1">{label}</ThemedText>
            <Controller
                control={control}
                name="email"
                rules={{
                    required: 'Email є обов\'язковим',
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Введіть коректний email',
                    },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <View className={`flex-row justify-between items-center border-2 rounded-xl ${error
                            ? 'border-red-400 dark:border-red-500'
                            : 'border-slate-200 dark:border-slate-700'
                            }`}>
                            <ThemedTextInput
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                autoCapitalize="none"
                                autoCorrect={false}
                                textContentType='emailAddress'
                                placeholder="Enter e-mail"
                                className={`rounded-lg flex-1`}
                                style={{ borderWidth: 0 }}
                                editable={!isLoading}
                            />
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