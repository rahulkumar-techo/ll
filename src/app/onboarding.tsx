import React, { useState } from "react";

import type { OnboardingStep } from "@/constants";
import OnboardingScreen from "@/screens/OnboardingScreen";

const clampStep = (value: number): OnboardingStep =>
  Math.max(0, Math.min(value, 4)) as OnboardingStep;

export default function Onboarding() {
  const [step, setStep] = useState<OnboardingStep>(0);
  const [level, setLevel] = useState<string | null>(null);
  const [motivations, setMotivations] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedPaywall, setSelectedPaywall] = useState<string | null>(null);
  const submitting = false;

  const nextStep = () => setStep((prev) => clampStep(prev + 1));
  const prevStep = () => setStep((prev) => clampStep(prev - 1));

  const completeOnboarding = async () => {
    console.log({
      step,
      level,
      motivations,
      selectedInterests,
      selectedPaywall,
    });
  };

  return (
    <OnboardingScreen
      step={step}
      level={level}
      motivations={motivations}
      selectedInterests={selectedInterests}
      selectedPaywall={selectedPaywall}
      submitting={submitting}
      setLevel={setLevel}
      setMotivations={setMotivations}
      setSelectedInterests={setSelectedInterests}
      setSelectedPaywall={setSelectedPaywall}
      nextStep={nextStep}
      prevStep={prevStep}
      completeOnboarding={completeOnboarding}
      continueWithLimitedAccess={completeOnboarding}
    />
  );
}
