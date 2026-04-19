import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthScreen from "@/components/auth/AuthScreen";

export default function IntroView() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "right", "bottom", "left"]}>
      <View style={{ flex: 1 }}>
        <AuthScreen />
      </View>
    </SafeAreaView>
  );
}
