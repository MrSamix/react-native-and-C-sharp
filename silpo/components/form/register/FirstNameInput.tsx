import { Text, TextInput, View } from "react-native";
import React from "react";
import { Control, Controller, FieldError, FieldValues } from "react-hook-form";
import { ThemedText } from "@/components/themed-text";
import { IAccountRegister } from "@/types/account/IAccountRegister";
import { ThemedTextInput } from "@/components/themed-textinput";

interface Props<T extends FieldValues> {
    control: Control<T> | undefined;
    isLoading: boolean;
    error: FieldError | undefined;
    label: string;
}

export const FirstNameInput: React.FC<Props<IAccountRegister>> = ({ control, error, isLoading, label }) => {
    return (
        <View className="gap-2">
            <ThemedText className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                {label}
            </ThemedText>
            <Controller
                control={control}
                name="firstName"
                rules={{
                    required: "Ім'я є обов'язковим",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <View className={`flex-row justify-between items-center border-2 rounded-xl ${error
                            ? 'border-red-400 dark:border-red-500'
                            : 'border-slate-200 dark:border-slate-700'
                            }`}>

                            <ThemedTextInput
                                className={`rounded-lg flex-1`}
                                style={{ borderWidth: 0 }}
                                placeholder="Sasha"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                keyboardType="default"
                                autoCapitalize="words"
                                autoCorrect={true}
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