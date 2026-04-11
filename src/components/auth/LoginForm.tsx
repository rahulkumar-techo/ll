import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

import type { FormErrors, TouchedFields } from './useAuthForm';
import type { LoginSchemaType } from './validation/auth.validation';

type LoginFormProps = {
    values: LoginSchemaType;
    errors: FormErrors<LoginSchemaType>;
    touched: TouchedFields<LoginSchemaType>;
    onChange: (field: keyof LoginSchemaType, value: string) => void;
    onBlur: (field: keyof LoginSchemaType) => void;
    onSubmit: () => void;
    onForgotPassword: () => void;
    compact?: boolean;
};

const getInputClassName = (hasError: boolean) =>
    `rounded-2xl border px-4 py-3.5 text-[15px] text-slate-900 ${
        hasError ? 'border-rose-400 bg-rose-50' : 'border-slate-200 bg-slate-50'
    }`;

export default function LoginForm({
    values,
    errors,
    touched,
    onChange,
    onBlur,
    onSubmit,
    onForgotPassword,
    compact = false,
}: LoginFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <View>
            <View className={compact ? 'mb-2.5' : 'mb-3'}>
                <Text className="mb-2 text-sm font-medium text-slate-700">
                    Email
                </Text>
                <TextInput
                    placeholder="you@example.com"
                    placeholderTextColor="#94a3b8"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={values.email}
                    onChangeText={(text) => onChange('email', text)}
                    onBlur={() => onBlur('email')}
                    className={getInputClassName(Boolean(touched.email && errors.email))}
                />
                {touched.email && errors.email ? (
                    <Text className="mt-2 text-xs text-rose-500">{errors.email}</Text>
                ) : null}
            </View>

            <View className={compact ? 'mb-2.5' : 'mb-3'}>
                <Text className="mb-2 text-sm font-medium text-slate-700">
                    Password
                </Text>
                <View className="relative">
                    <TextInput
                        placeholder="Enter your password"
                        placeholderTextColor="#94a3b8"
                        secureTextEntry={!showPassword}
                        value={values.password}
                        onChangeText={(text) => onChange('password', text)}
                        onBlur={() => onBlur('password')}
                        className={`${getInputClassName(
                            Boolean(touched.password && errors.password)
                        )} pr-12`}
                    />
                    <Pressable
                        className="absolute right-4 top-0 bottom-0 justify-center"
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
                {touched.password && errors.password ? (
                    <Text className="mt-2 text-xs text-rose-500">
                        {errors.password}
                    </Text>
                ) : null}
            </View>

            <View className={`flex-row items-center justify-between ${compact ? 'mb-3' : 'mb-4'}`}>
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
                onPress={onSubmit}
            >
                <Text className="text-center font-semibold text-white">Log In</Text>
            </Pressable>

            <View className={`flex-row items-center ${compact ? 'mb-3' : 'mb-4'}`}>
                <View className="h-px flex-1 bg-slate-200" />
                <Text className="mx-3 text-sm text-slate-400">Or</Text>
                <View className="h-px flex-1 bg-slate-200" />
            </View>

            <Pressable
                className={`flex-row items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 ${
                    compact ? 'mb-2.5 py-3' : 'mb-3 py-3.5'
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
