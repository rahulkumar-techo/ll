import { useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

import {
    registerInitialValues,
    RegisterSchemaType,
    validateConfirmPasswordValue,
    validateRegisterFieldValue,
} from './validation/auth.validation';

type RegisterFormProps = {
    onSubmit: (values: RegisterSchemaType) => void;
    compact?: boolean;
};

const getInputClassName = (hasError: boolean) =>
    `rounded-2xl border px-4 py-3.5 text-[15px] text-slate-900 ${
        hasError ? 'border-rose-400 bg-rose-50' : 'border-slate-200 bg-slate-50'
    }`;

export default function RegisterForm({
    onSubmit,
    compact = false,
}: RegisterFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const emailRef = useRef<TextInput | null>(null);
    const passwordRef = useRef<TextInput | null>(null);
    const confirmPasswordRef = useRef<TextInput | null>(null);
    const {
        control,
        handleSubmit,
        getValues,
        trigger,
    } = useForm<RegisterSchemaType>({
        defaultValues: registerInitialValues,
        mode: 'onBlur',
        reValidateMode: 'onChange',
    });

    return (
        <View>
            <Controller
                control={control}
                name="fullName"
                rules={{
                    validate: (value) =>
                        validateRegisterFieldValue('fullName', value),
                }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <View className={compact ? 'mb-2.5' : 'mb-3'}>
                        <Text className="mb-2 text-sm font-medium text-slate-700">
                            Full name
                        </Text>
                        <TextInput
                            placeholder="John Doe"
                            placeholderTextColor="#94a3b8"
                            returnKeyType="next"
                            textContentType="name"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            onSubmitEditing={() => emailRef.current?.focus()}
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
                name="email"
                rules={{
                    validate: (value) => validateRegisterFieldValue('email', value),
                }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <View className={compact ? 'mb-2.5' : 'mb-3'}>
                        <Text className="mb-2 text-sm font-medium text-slate-700">
                            Email
                        </Text>
                        <TextInput
                            ref={emailRef}
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
                    validate: (value) => validateRegisterFieldValue('password', value),
                }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <View className={compact ? 'mb-2.5' : 'mb-3'}>
                        <Text className="mb-2 text-sm font-medium text-slate-700">
                            Password
                        </Text>
                        <View className="relative">
                            <TextInput
                                ref={passwordRef}
                                placeholder="At least 6 characters"
                                placeholderTextColor="#94a3b8"
                                secureTextEntry={!showPassword}
                                returnKeyType="next"
                                textContentType="newPassword"
                                value={value}
                                onChangeText={(text) => {
                                    onChange(text);

                                    if (getValues('confirm_password')) {
                                        void trigger('confirm_password');
                                    }
                                }}
                                onBlur={onBlur}
                                onSubmitEditing={() =>
                                    confirmPasswordRef.current?.focus()
                                }
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

            <Controller
                control={control}
                name="confirm_password"
                rules={{
                    validate: (value) =>
                        validateConfirmPasswordValue(value, getValues('password')),
                }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <View className={compact ? 'mb-3' : 'mb-4'}>
                        <Text className="mb-2 text-sm font-medium text-slate-700">
                            Confirm password
                        </Text>
                        <View className="relative">
                            <TextInput
                                ref={confirmPasswordRef}
                                placeholder="Re-enter your password"
                                placeholderTextColor="#94a3b8"
                                secureTextEntry={!showConfirmPassword}
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
                        {error ? (
                            <Text className="mt-2 text-xs text-rose-500">
                                {error.message}
                            </Text>
                        ) : null}
                    </View>
                )}
            />

            <Pressable
                className={`mt-5 rounded-2xl bg-blue-600 px-4 ${compact ? 'mb-2 py-3' : 'mb-1 py-3.5'}`}
                onPress={handleSubmit(onSubmit)}
            >
                <Text className="text-center font-semibold text-white">
                    Create Account
                </Text>
            </Pressable>
        </View>
    );
}
