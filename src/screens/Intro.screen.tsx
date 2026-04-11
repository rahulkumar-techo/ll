// IntroScreen.tsx
// Controls auth flow (login, signup, forgot, otp)

import { useState } from 'react';
import { View } from 'react-native';
import AuthScreen from '@/components/auth/AuthScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function IntroScreen() {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [step, setStep] = useState<'main' | 'forgot' | 'otp'>('main');

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'right', 'bottom', 'left']}>
      <View style={{ flex: 1 }}>
        <AuthScreen
          tab={tab}
          setTab={setTab}
          step={step}
          setStep={setStep}
        />
      </View>
    </SafeAreaView>
  );
}
