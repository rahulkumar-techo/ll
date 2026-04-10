import { Stack } from "expo-router";
import "../global.css";
import { ActivityIndicator, PaperProvider } from "react-native-paper";
import AuthProvider from "@/providers/Auth.provider";
import { useAuth } from "@/contexts/Auth.context";
import { View } from "react-native";
import { ThemeProvider } from "@/contexts/Theme.context";
import { GestureHandlerRootView } from "react-native-gesture-handler"
import IntroScreen from "@/screens/Intro.screen";
import { SafeAreaProvider } from "react-native-safe-area-context";


function RootLayout_Nav() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#f4511e" />
      </View>
    )
  }

  if (!session) {
    return (
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
        <IntroScreen />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    )
  }

  return (
     <SafeAreaProvider>
    <ThemeProvider>
      <PaperProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: '#f4511e' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="other" />
        </Stack>
      </PaperProvider>
    </ThemeProvider>
     </SafeAreaProvider>

  )
}

// Root_Layout
export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayout_Nav />
    </AuthProvider>
  );
}

/*
Root → SafeAreaProvider
Screens → SafeAreaView
Chat UI → useSafeAreaInsets() (for bottom input)
*/ 
