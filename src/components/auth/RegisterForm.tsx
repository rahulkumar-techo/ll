import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

import type { FormErrors, TouchedFields } from './useAuthForm';
import type { RegisterSchemaType } from './validation/auth.validation';

type RegisterFormProps = {
    values: RegisterSchemaType;
    errors: FormErrors<RegisterSchemaType>;
    touched: TouchedFields<RegisterSchemaType>;
    onChange: (field: keyof RegisterSchemaType, value: string) => void;
    onBlur: (field: keyof RegisterSchemaType) => void;
    onSubmit: () => void;
    compact?: boolean;
};

const getInputClassName = (hasError: boolean) =>
    `rounded-2xl border px-4 py-3.5 text-[15px] text-slate-900 ${
        hasError ? 'border-rose-400 bg-rose-50' : 'border-slate-200 bg-slate-50'
    }`;

export default function RegisterForm({
    values,
    errors,
    touched,
    onChange,
    onBlur,
    onSubmit,
    compact = false,
}: RegisterFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <View>
            <View className={compact ? 'mb-2.5' : 'mb-3'}>
                <Text className="mb-2 text-sm font-medium text-slate-700">
                    Full name
                </Text>
                <TextInput
                    placeholder="John Doe"
                    placeholderTextColor="#94a3b8"
                    value={values.fullName}
                    onChangeText={(text) => onChange('fullName', text)}
                    onBlur={() => onBlur('fullName')}
                    className={getInputClassName(
                        Boolean(touched.fullName && errors.fullName)
                    )}
                />
                {touched.fullName && errors.fullName ? (
                    <Text className="mt-2 text-xs text-rose-500">
                        {errors.fullName}
                    </Text>
                ) : null}
            </View>

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
                        placeholder="At least 6 characters"
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

            <View className={compact ? 'mb-3' : 'mb-4'}>
                <Text className="mb-2 text-sm font-medium text-slate-700">
                    Confirm password
                </Text>
                <View className="relative">
                    <TextInput
                        placeholder="Re-enter your password"
                        placeholderTextColor="#94a3b8"
                        secureTextEntry={!showConfirmPassword}
                        value={values.confirm_password}
                        onChangeText={(text) => onChange('confirm_password', text)}
                        onBlur={() => onBlur('confirm_password')}
                        className={`${getInputClassName(
                            Boolean(
                                touched.confirm_password && errors.confirm_password
                            )
                        )} pr-12`}
                    />
                    <Pressable
                        className="absolute right-4 top-0 bottom-0 justify-center"
                        onPress={() =>
                            setShowConfirmPassword((current) => !current)
                        }
                        hitSlop={8}
                    >
                        <MaterialDesignIcons
                            name={
                                showConfirmPassword
                                    ? 'eye-off-outline'
                                    : 'eye-outline'
                            }
                            size={22}
                            color="#64748b"
                        />
                    </Pressable>
                </View>
                {touched.confirm_password && errors.confirm_password ? (
                    <Text className="mt-2 text-xs text-rose-500">
                        {errors.confirm_password}
                    </Text>
                ) : null}
            </View>

            <Pressable
                className={`mt-5 rounded-2xl bg-blue-600 px-4 ${compact ? 'mb-2 py-3' : 'mb-1 py-3.5'}`}
                onPress={onSubmit}
            >
                <Text className="text-center font-semibold text-white">
                    Create Account
                </Text>
            </Pressable>
        </View>
    );
}
