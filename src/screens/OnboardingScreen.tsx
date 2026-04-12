import React, { useMemo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { OnboardingActions, OnboardingState } from "@/constants";
import {
  BackButton,
  DotIndicators,
  PrimaryButton,
  ProgressBar,
} from "../components/onboarding/ui";
import { WelcomeStep } from "../components/onboarding/WelcomeStep";
import { LevelStep } from "../components/onboarding/LevelStep";
import { GoalStep } from "../components/onboarding/GoalStep";
import { InterestStep } from "../components/onboarding/InterestStep";
import { PaywallStep } from "../components/onboarding/PaywallStep";

type Props = OnboardingState & OnboardingActions;

export default function OnboardingScreen({
  step,
  level,
  motivations,
  selectedInterests,
  selectedPaywall,
  submitting,
  setLevel,
  setMotivations,
  setSelectedInterests,
  setSelectedPaywall,
  nextStep,
  prevStep,
  completeOnboarding,
  continueWithLimitedAccess,
}: Props) {
  // ─── Can continue guard ───────────────────────────────────────────────────
  const canContinue = useMemo(() => {
    if (step === 1) return !!level;
    if (step === 2) return motivations.length > 0;
    if (step === 3) return selectedInterests.length > 0;
    if (step === 4) return !!selectedPaywall;
    return true;
  }, [level, motivations.length, selectedInterests.length, selectedPaywall, step]);

  // ─── CTA label ───────────────────────────────────────────────────────────
  const primaryLabel =
    step === 0
      ? "Get started"
      : step === 4
        ? submitting
          ? "Starting..."
          : "Finish setup"
        : "Continue";

  const handlePrimary = () => {
    if (step === 4) {
      completeOnboarding();
    } else {
      nextStep();
    }
  };

  return (
    <SafeAreaView edges={["top", "right", "left", "bottom"]} className="flex-1 bg-white">
      <View className="flex-1 bg-white px-5">
        {/* ── Progress bar (steps 1–4) ────────────────────────────────────── */}
        {step > 0 && <ProgressBar step={step} />}

        {/* ── Main content ───────────────────────────────────────────────── */}
        <View className="flex-1 pt-5">
          {/* Back + dot indicators */}
          {step > 0 && (
            <View className="flex-row items-center justify-between mb-[18px]">
              <BackButton onPress={prevStep} />
              <DotIndicators step={step} total={4} />
              {/* Spacer to balance back button */}
              <View className="w-9" />
            </View>
          )}

          {/* Step content */}
          <View key={step} className="flex-1">
            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
              <View className={step === 4 ? "flex-grow pb-40" : "flex-grow pb-[116px]"}>
                {step === 0 && <WelcomeStep />}

                {step === 1 && (
                  <LevelStep level={level} setLevel={setLevel} />
                )}

                {step === 2 && (
                  <GoalStep
                    motivations={motivations}
                    setMotivations={setMotivations}
                  />
                )}

                {step === 3 && (
                  <InterestStep
                    selectedInterests={selectedInterests}
                    setSelectedInterests={setSelectedInterests}
                  />
                )}

                {step === 4 && (
                  <PaywallStep
                    selectedPaywall={selectedPaywall}
                    setSelectedPaywall={setSelectedPaywall}
                  />
                )}
              </View>
            </ScrollView>
          </View>
        </View>

        {/* ── Bottom zone ────────────────────────────────────────────────── */}
        <View className="absolute bottom-0 left-0 right-0 border-t border-[#e2e8f0] bg-white px-5 pb-7 pt-4 shadow-lg shadow-black/5">
          <PrimaryButton
            label={primaryLabel}
            onPress={handlePrimary}
            disabled={!canContinue || submitting}
            useGradient={step === 4}
          />

          {step === 4 && (
            <Pressable
              onPress={continueWithLimitedAccess}
              className="mt-2.5 min-h-10 w-full items-center justify-center"
            >
              <Text className="text-[13px] font-semibold text-[#4f46e5]">
                Continue with limited access
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
