import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthScreen from "@/components/auth/AuthScreen";

type IntroViewProps = {
  tab: "login" | "register";
  setTab: (tab: "login" | "register") => void;
  step: "main" | "forgot" | "otp";
  setStep: (step: "main" | "forgot" | "otp") => void;
};

export default function IntroView({ tab, setTab, step, setStep }: IntroViewProps) {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "right", "bottom", "left"]}>
      <View style={{ flex: 1 }}>
        <AuthScreen tab={tab} setTab={setTab} step={step} setStep={setStep} />
      </View>
    </SafeAreaView>
  );
}
