import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import "../global.css";
import { ActivityIndicator, PaperProvider } from "react-native-paper";
import AuthProvider from "@/providers/Auth.provider";
import { useAuth } from "@/contexts/Auth.context";
import { View } from "react-native";
import { ThemeProvider } from "@/contexts/Theme.context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

function RootLayout_Nav() {
  const { profile, session, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const currentRoute = segments?.[0] ?? "";
  const isIntro = currentRoute === "Intro";
  const isOnboarding = currentRoute === "onboarding";

  // useEffect(() => {
  //   if (loading) return;

  //   // 🔐 Not logged in
  //   if (!session) {
  //     if (!isIntro) {
  //       router.replace("/Intro");
  //     }
  //     return;
  //   }

  //   // 👤 Logged in but onboarding not done
  //   if (!profile?.is_onboarding_completed) {
  //     if (!isOnboarding) {
  //       router.replace("/onboarding");
  //     }
  //     return;
  //   }

  //   // ✅ Fully onboarded user
  //   if (isIntro || isOnboarding) {
  //     router.replace("/");
  //   }
  // }, [loading, session, profile?.is_onboarding_completed, isIntro, isOnboarding]);

useEffect(() => {
  if (loading) return;

  // 🔥 FORCE ONBOARDING
  router.replace("/onboarding");
}, [loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#006100" />
      </View>
    );
  }



  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <PaperProvider>
            <Stack
              screenOptions={
                {
                  headerShown: false
                }
              }
            >
              <Stack.Screen name="index" />
              <Stack.Screen name="Intro" />
              <Stack.Screen name="onboarding" />
            </Stack>
          </PaperProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayout_Nav />
    </AuthProvider>
  );
}
