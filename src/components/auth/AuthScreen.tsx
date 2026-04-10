import { useEffect, useRef, useState } from 'react';
import { Image } from 'expo-image';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    useWindowDimensions,
    View,
} from 'react-native';

import { logo } from '@/assets/images';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useAuthForm } from './useAuthForm';
import {
    loginInitialValues,
    LoginSchemaType,
    registerInitialValues,
    RegisterSchemaType,
    validateLoginField,
    validateLoginForm,
    validateRegisterField,
    validateRegisterForm,
} from './validation/auth.validation';

type AuthScreenProps = {
    tab: 'login' | 'register';
    setTab: (tab: 'login' | 'register') => void;
    step: 'main' | 'forgot' | 'otp';
    setStep: (step: 'main' | 'forgot' | 'otp') => void;
};

export default function AuthScreen({
    tab,
    setTab,
    step,
    setStep,
}: AuthScreenProps) {
    const { height } = useWindowDimensions();
    const isCompactScreen = height < 760;
    const heroHeight = isCompactScreen
        ? Math.max(150, Math.min(height * 0.22, 190))
        : Math.max(220, Math.min(height * 0.34, 320));
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '']);
    const otpRefs = useRef<Array<TextInput | null>>([]);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setIsKeyboardVisible(true);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardVisible(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const registerForm = useAuthForm<RegisterSchemaType>({
        initialValues: registerInitialValues,
        validateField: validateRegisterField,
        validateForm: validateRegisterForm,
        onSubmit: (values) => {
            console.log('Register data:', values);
        },
    });

    const loginForm = useAuthForm<LoginSchemaType>({
        initialValues: loginInitialValues,
        validateField: validateLoginField,
        validateForm: validateLoginForm,
        onSubmit: (values) => {
            console.log('Login data:', values);
        },
    });

    const handleOtpChange = (index: number, value: string) => {
        const sanitizedValue = value.replace(/[^0-9]/g, '');
        const digit = sanitizedValue.slice(-1);
        const nextOtp = [...otp];
        nextOtp[index] = digit;
        setOtp(nextOtp);

        if (digit && index < otpRefs.current.length - 1) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyPress = (
        index: number,
        key: string
    ) => {
        if (key !== 'Backspace') {
            return;
        }

        if (otp[index]) {
            const nextOtp = [...otp];
            nextOtp[index] = '';
            setOtp(nextOtp);
            return;
        }

        if (index > 0) {
            otpRefs.current[index - 1]?.focus();
            const nextOtp = [...otp];
            nextOtp[index - 1] = '';
            setOtp(nextOtp);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="flex-1 justify-end bg-black">
                    <View className="absolute inset-0 bg-[#0b0f1a]" />
                    <View
                        className="absolute inset-x-0 top-0 bg-[#111827]"
                        style={{ height: isKeyboardVisible ? 0 : heroHeight + 56 }}
                    />


                    {!isKeyboardVisible ? (
                        <View
                            className="px-6"
                            style={{
                                paddingTop: isCompactScreen ? 52 : 80,
                                paddingBottom: isCompactScreen ? 14 : 24,
                                minHeight: heroHeight,
                                justifyContent: 'center',
                            }}
                        >
                            <View
                                className={`items-center justify-center rounded-[28px] border border-white/10 bg-white/5 ${
                                    isCompactScreen ? 'mb-3 h-14 w-14' : 'mb-5 h-20 w-20'
                                }`}
                            >
                                <Image
                                    source={logo}
                                    accessibilityLabel="Lexa logo"
                                    transition={300}
                                    style={{
                                        width: isCompactScreen ? 36 : 56,
                                        height: isCompactScreen ? 36 : 56,
                                    }}
                                    contentFit="contain"
                                />
                            </View>

                            <Text
                                className={`font-bold text-white ${
                                    isCompactScreen ? 'text-[28px]' : 'text-3xl'
                                }`}
                            >
                                Get Started now
                            </Text>
                            <Text
                                className={`max-w-[320px] text-slate-300 ${
                                    isCompactScreen
                                        ? 'mt-1 text-[13px] leading-5'
                                        : 'mt-2 text-sm leading-6'
                                }`}
                            >
                                Create an account or log in to explore our app.
                            </Text>
                        </View>
                    ) : null}

                    <View
                        className={`flex-1 bg-white ${isKeyboardVisible ? 'rounded-t-none' : 'rounded-t-[32px]'}`}
                    >
                        <View
                            className={`flex-1 px-6 ${isCompactScreen ? 'pt-4' : 'pt-6'}`}
                            style={{
                                paddingBottom: isKeyboardVisible ? 120 : isCompactScreen ? 18 : 28,
                            }}
                        >
                            {step === 'main' && (
                                <View className="flex-1">
                                    <View
                                        className={`flex-row rounded-2xl bg-slate-100 p-1 ${
                                            isCompactScreen ? 'mb-4' : 'mb-6'
                                        }`}
                                    >
                                        <Pressable
                                            onPress={() => setTab('login')}
                                            className={`flex-1 rounded-2xl px-4 ${
                                                tab === 'login' ? 'bg-white' : ''
                                            } ${isCompactScreen ? 'py-2.5' : 'py-3'}
                                            }`}
                                        >
                                            <Text
                                                className={`text-center text-sm ${
                                                    tab === 'login'
                                                        ? 'font-semibold text-slate-950'
                                                        : 'text-slate-500'
                                                }`}
                                            >
                                                Log In
                                            </Text>
                                        </Pressable>

                                        <Pressable
                                            onPress={() => setTab('register')}
                                            className={`flex-1 rounded-2xl px-4 ${
                                                tab === 'register' ? 'bg-white' : ''
                                            } ${isCompactScreen ? 'py-2.5' : 'py-3'}
                                            }`}
                                        >
                                            <Text
                                                className={`text-center text-sm ${
                                                    tab === 'register'
                                                        ? 'font-semibold text-slate-950'
                                                        : 'text-slate-500'
                                                }`}
                                            >
                                                Sign Up
                                            </Text>
                                        </Pressable>
                                    </View>

                                    {tab === 'login' ? (
                                        <LoginForm
                                            values={loginForm.values}
                                            errors={loginForm.errors}
                                            touched={loginForm.touched}
                                            onChange={loginForm.handleChange}
                                            onBlur={loginForm.handleBlur}
                                            onSubmit={loginForm.handleSubmit}
                                            onForgotPassword={() => setStep('forgot')}
                                            compact={isCompactScreen}
                                        />
                                    ) : (
                                        <RegisterForm
                                            values={registerForm.values}
                                            errors={registerForm.errors}
                                            touched={registerForm.touched}
                                            onChange={registerForm.handleChange}
                                            onBlur={registerForm.handleBlur}
                                            onSubmit={registerForm.handleSubmit}
                                            compact={isCompactScreen}
                                        />
                                    )}
                                </View>
                            )}

                            {step === 'forgot' && (
                                <View className="pt-2">
                                    <Text className="mb-2 text-2xl font-semibold text-slate-950">
                                        Reset password
                                    </Text>
                                    <Text className="mb-5 text-sm leading-6 text-slate-500">
                                        Enter your email and we&apos;ll send you a one-time
                                        verification code.
                                    </Text>
                                    <TextInput
                                        placeholder="you@example.com"
                                        placeholderTextColor="#94a3b8"
                                        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-[15px] text-slate-900"
                                    />

                                    <Pressable
                                        onPress={() => setStep('otp')}
                                        className="mt-5 rounded-2xl bg-slate-950 px-4 py-4"
                                    >
                                        <Text className="text-center font-semibold text-white">
                                            Send OTP
                                        </Text>
                                    </Pressable>
                                </View>
                            )}

                            {step === 'otp' && (
                                <View className="pt-2">
                                    <Text className="mb-2 text-2xl font-semibold text-slate-950">
                                        Verify code
                                    </Text>
                                    <Text className="mb-5 text-sm leading-6 text-slate-500">
                                        Enter the 4-digit code sent to your email.
                                    </Text>

                                    <View className="mb-6 flex-row justify-between">
                                        {[...Array(4)].map((_, index) => (
                                            <TextInput
                                                key={index}
                                                ref={(ref) => {
                                                    otpRefs.current[index] = ref;
                                                }}
                                                maxLength={1}
                                                keyboardType="number-pad"
                                                value={otp[index]}
                                                onChangeText={(value) =>
                                                    handleOtpChange(index, value)
                                                }
                                                onKeyPress={({ nativeEvent }) =>
                                                    handleOtpKeyPress(index, nativeEvent.key)
                                                }
                                                textContentType="oneTimeCode"
                                                className="h-14 w-14 rounded-2xl border border-slate-200 bg-slate-50 text-center text-lg font-semibold text-slate-950"
                                            />
                                        ))}
                                    </View>

                                    <Pressable
                                        onPress={() => setStep('main')}
                                        className="mb-3 rounded-2xl bg-slate-950 px-4 py-4"
                                    >
                                        <Text className="text-center font-semibold text-white">
                                            Verify
                                        </Text>
                                    </Pressable>

                                    <Text className="text-center text-sm text-slate-400">
                                        Resend OTP
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
