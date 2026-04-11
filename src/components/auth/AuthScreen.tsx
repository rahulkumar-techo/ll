import { useEffect, useRef, useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    KeyboardEvent,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    useWindowDimensions,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
import HeroSection from './Hero';

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
    const insets = useSafeAreaInsets();
    const isCompactScreen = height < 760;
    // Keep the hero intentionally short so the auth card gets more usable height.
    const heroHeight = isCompactScreen
        ? Math.max(96, Math.min(height * 0.14, 126))
        : Math.max(152, Math.min(height * 0.21, 196));
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [otp, setOtp] = useState(['', '', '', '']);
    const otpRefs = useRef<(TextInput | null)[]>([]);

    useEffect(() => {
        const handleKeyboardShow = (event: KeyboardEvent) => {
            setIsKeyboardVisible(true);
            setKeyboardHeight(event.endCoordinates.height);
        };

        const handleKeyboardHide = () => {
            setIsKeyboardVisible(false);
            setKeyboardHeight(0);
        };

        const showEvent =
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        const hideEvent =
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

        const showSubscription = Keyboard.addListener(showEvent, handleKeyboardShow);
        const hideSubscription = Keyboard.addListener(hideEvent, handleKeyboardHide);

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const closedBottomPadding = isCompactScreen ? 16 : 24;
    const keyboardBottomPadding =
        Platform.OS === 'ios'
            ? Math.max(
                  24,
                  keyboardHeight - insets.bottom + (isCompactScreen ? 20 : 28)
              )
            : isCompactScreen
              ? 20
              : 28;

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
            keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top : 0}
        >
            <View className="flex-1 justify-end bg-black">
                <View className="absolute inset-0 bg-[#0b0f1a]" />
                <View
                    className="absolute inset-x-0 top-0 bg-[#111827]"
                    style={{ height: isKeyboardVisible ? 0 : heroHeight + 56 }}
                />

                <HeroSection
                    isKeyboardVisible={isKeyboardVisible}
                    isCompactScreen={isCompactScreen}
                    heroHeight={heroHeight}
                    logo={logo}
                />
                <View
                    className={`flex-1 bg-white ${isKeyboardVisible ? 'rounded-t-none' : 'rounded-t-[32px]'}`}
                >
                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={{
                            flexGrow: 1,
                            paddingHorizontal: 24,
                            paddingTop: isCompactScreen ? 16 : 24,
                            paddingBottom: isKeyboardVisible
                                ? keyboardBottomPadding
                                : closedBottomPadding + insets.bottom,
                        }}
                        keyboardShouldPersistTaps="handled"
                        keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
                        showsVerticalScrollIndicator={false}
                        automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
                        bounces={false}
                    >
                        {step === 'main' && (
                            <View>
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
                    </ScrollView>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
