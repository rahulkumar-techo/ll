import { useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

import {
    loginInitialValues,
    LoginSchemaType,
    validateLoginFieldValue,
} from './validation/auth.validation';

type LoginFormProps = {
    onSubmit: (values: LoginSchemaType) => void;
    onForgotPassword: () => void;
    compact?: boolean;
};

const getInputClassName = (hasError: boolean) =>
    `rounded-2xl border px-4 py-3.5 text-[15px] text-slate-900 ${
        hasError ? 'border-rose-400 bg-rose-50' : 'border-slate-200 bg-slate-50'
    }`;

export default function LoginForm({
    onSubmit,
    onForgotPassword,
    compact = false,
}: LoginFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const passwordRef = useRef<TextInput | null>(null);
    const {
        control,
        handleSubmit,
    } = useForm<LoginSchemaType>({
        defaultValues: loginInitialValues,
        mode: 'onBlur',
        reValidateMode: 'onChange',
    });

    return (
        <View>
            <Controller
                control={control}
                name="email"
                rules={{
                    validate: (value) => validateLoginFieldValue('email', value),
                }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <View className={compact ? 'mb-2.5' : 'mb-3'}>
                        <Text className="mb-2 text-sm font-medium text-slate-700">
                            Email
                        </Text>
                        <TextInput
                            placeholder="you@example.com"
                            placeholderTextColor="#94a3b8"
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                            returnKeyType="next"
                            textContentType="emailAddress"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            onSubmitEditing={() => passwordRef.current?.focus()}
                            className={getInputClassName(Boolean(error))}
                        />
                        {error ? (
                            <Text className="mt-2 text-xs text-rose-500">
                                {error.message}
                            </Text>
                        ) : null}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="password"
                rules={{
                    validate: (value) => validateLoginFieldValue('password', value),
                }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <View className={compact ? 'mb-2.5' : 'mb-3'}>
                        <Text className="mb-2 text-sm font-medium text-slate-700">
                            Password
                        </Text>
                        <View className="relative">
                            <TextInput
                                ref={passwordRef}
                                placeholder="Enter your password"
                                placeholderTextColor="#94a3b8"
                                secureTextEntry={!showPassword}
                                returnKeyType="done"
                                textContentType="password"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                onSubmitEditing={handleSubmit(onSubmit)}
                                className={`${getInputClassName(Boolean(error))} pr-12`}
                            />
                            <Pressable
                                className="absolute bottom-0 right-4 top-0 justify-center"
                                onPress={() => setShowPassword((current) => !current)}
                                hitSlop={8}
                            >
                                <MaterialDesignIcons
                                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                    size={22}
                                    color="#64748b"
                                />
                            </Pressable>
                        </View>
                        {error ? (
                            <Text className="mt-2 text-xs text-rose-500">
                                {error.message}
                            </Text>
                        ) : null}
                    </View>
                )}
            />

            <View
                className={`flex-row items-center justify-between ${compact ? 'mb-3' : 'mb-4'}`}
            >
                <Pressable
                    className="flex-row items-center"
                    onPress={() => setRememberMe((current) => !current)}
                >
                    <View className="mr-2">
                        <MaterialDesignIcons
                            name={
                                rememberMe
                                    ? 'checkbox-marked-outline'
                                    : 'checkbox-blank-outline'
                            }
                            size={20}
                            color={rememberMe ? '#2563eb' : '#94a3b8'}
                        />
                    </View>
                    <Text className="text-sm text-slate-500">Remember me</Text>
                </Pressable>
                <Pressable onPress={onForgotPassword}>
                    <Text className="text-sm font-medium text-sky-600">
                        Forgot password?
                    </Text>
                </Pressable>
            </View>

            <Pressable
                className={`rounded-2xl bg-blue-600 px-4 ${compact ? 'mb-3 py-3' : 'mb-4 py-3.5'}`}
                onPress={handleSubmit(onSubmit)}
            >
                <Text className="text-center font-semibold text-white">Log In</Text>
            </Pressable>

            <View className={`flex-row items-center ${compact ? 'mb-3' : 'mb-4'}`}>
                <View className="h-px flex-1 bg-slate-200" />
                <Text className="mx-3 text-sm text-slate-400">Or</Text>
                <View className="h-px flex-1 bg-slate-200" />
            </View>

            <Pressable
                className={`mb-3 flex-row items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 ${
                    compact ? 'py-3' : 'py-3.5'
                }`}
            >
                <MaterialDesignIcons name="google" size={20} color="#ea4335" />
                <Text className="ml-3 text-center font-medium text-slate-700">
                    Continue with Google
                </Text>
            </Pressable>
            <Pressable
                className={`flex-row items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 ${
                    compact ? 'py-3' : 'py-3.5'
                }`}
            >
                <MaterialDesignIcons name="apple" size={20} color="#111827" />
                <Text className="ml-3 text-center font-medium text-slate-700">
                    Continue with Apple
                </Text>
            </Pressable>
        </View>
    );
}
