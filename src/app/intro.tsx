import { useState } from "react";

import IntroScreen from "@/screens/Intro";

export default function IntroRoute() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [step, setStep] = useState<"main" | "forgot" | "otp">("main");

  return (
    <IntroScreen tab={tab} setTab={setTab} step={step} setStep={setStep} />
  );
}
