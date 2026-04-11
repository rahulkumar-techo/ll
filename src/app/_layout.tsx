import { Stack } from "expo-router";
import "../global.css";
import { ActivityIndicator, PaperProvider } from "react-native-paper";
import AuthProvider from "@/providers/Auth.provider";
import { useAuth } from "@/contexts/Auth.context";
import { View } from "react-native";
import { ThemeProvider } from "@/contexts/Theme.context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

function RootLayout_Nav() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#f4511e" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <PaperProvider>
            <Stack
              screenOptions={{
                headerTintColor: "#fff",
                contentStyle: { backgroundColor: "#0f172a" },
                headerStyle: { backgroundColor: "#f4511e" },
                headerTitleStyle: { fontWeight: "bold" },
              }}
            >
              {!session ? (
                // 🔐 NOT LOGGED IN
                <Stack.Screen
                  name="intro"
                  options={{ headerShown: false }}
                />
              ) : (
                // ✅ LOGGED IN
                <>
                  <Stack.Screen
                    name="index"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen name="other" />
                </>
              )}
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