// Description: Clean Auth screen with only Google Sign-In (Expo + Supabase)

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  Platform,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { logo } from '@/assets/images';
import { supabase } from '@/utils/supabase';
import HeroSection from './Hero';

WebBrowser.maybeCompleteAuthSession();

const googleWebClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
const googleIosClientId = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;

if (Platform.OS !== 'web') {
  GoogleSignin.configure({
    webClientId: googleWebClientId,
    iosClientId: googleIosClientId,
  });
}

async function signInWithGoogle() {
  if (Platform.OS === 'web') {
    const redirectUrl = AuthSession.makeRedirectUri({
      scheme: 'll',
    });

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        skipBrowserRedirect: true,
      },
    });

    if (error) {
      throw error;
    }

    const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);

    if (result.type !== 'success') {
      return;
    }

    const url = new URL(result.url);
    const code = url.searchParams.get('code');
    const authError =
      url.searchParams.get('error_description') ?? url.searchParams.get('error');

    if (authError) {
      throw new Error(authError);
    }

    if (!code) {
      throw new Error(`No auth code returned from Google OAuth callback: ${result.url}`);
    }

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      throw exchangeError;
    }

    return;
  }

  if (!googleWebClientId) {
    throw new Error('Missing EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID.');
  }

  if (Platform.OS === 'android') {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  }

  const result = await GoogleSignin.signIn();

  if (result.type !== 'success') {
    return;
  }

  const tokens = await GoogleSignin.getTokens();
  const idToken = tokens.idToken ?? result.data.idToken;

  if (!idToken) {
    throw new Error('Google Sign-In did not return an ID token.');
  }

  const { error } = await supabase.auth.signInWithIdToken({
    provider: 'google',
    token: idToken,
    access_token: tokens.accessToken,
  });

  if (error) {
    throw error;
  }
}

export default function AuthScreen() {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const isCompactScreen = height < 760;
  const heroHeight = isCompactScreen
    ? Math.max(96, Math.min(height * 0.14, 126))
    : Math.max(152, Math.min(height * 0.21, 196));

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, () =>
      setIsKeyboardVisible(true)
    );
    const hideSub = Keyboard.addListener(hideEvent, () =>
      setIsKeyboardVisible(false)
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const showAuthError = (error: unknown) => {
    const message =
      error instanceof Error ? error.message : 'Something went wrong.';
    Alert.alert('Google Sign-In failed', message);
  };

  const handleGoogleLogin = async () => {
    try {
      setIsSubmitting(true);
      await signInWithGoogle();
    } catch (error) {
      showAuthError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
        className={`flex-1 bg-white ${
          isKeyboardVisible ? 'rounded-t-none' : 'rounded-t-[32px]'
        }`}
      >
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingTop: isCompactScreen ? 16 : 24,
            paddingBottom: (isCompactScreen ? 20 : 28) + insets.bottom,
            justifyContent: 'center',
          }}
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Text className="mb-2 text-2xl font-semibold text-slate-950 text-center">
              Welcome
            </Text>

            <Text className="mb-6 text-sm text-slate-500 text-center">
              Continue with Google to get started
            </Text>

            <Pressable
              onPress={handleGoogleLogin}
              disabled={isSubmitting}
              className="flex-row items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3.5"
            >
              <MaterialDesignIcons
                name="google"
                size={20}
                color="#ea4335"
              />
              <Text className="ml-3 font-medium text-slate-700">
                {isSubmitting ? 'Signing in...' : 'Continue with Google'}
              </Text>
            </Pressable>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}
