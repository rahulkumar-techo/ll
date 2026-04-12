import React from "react";
import { Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";

// ─── Chip ─────────────────────────────────────────────────────────────────────
interface ChipProps {
  label: string;
  icon: string;
  selected: boolean;
  onPress: () => void;
}

export function Chip({ label, icon, selected, onPress }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center gap-2 rounded-xl border px-[14px] py-[10px] active:scale-[0.97] ${
        selected
          ? "border-[#4f46e5] bg-[#eef2ff]"
          : "border-[#e2e8f0] bg-[#f8fafc]"
      }`}
    >
      <Text className="text-[14px]">{icon}</Text>
      <View
        className={`h-2 w-2 rounded-full ${
          selected ? "bg-[#6366f1]" : "bg-[#e2e8f0]"
        }`}
      />
      <Text className={`text-[13px] ${selected ? "text-[#4f46e5]" : "text-[#334155]"}`}>
        {label}
      </Text>
    </Pressable>
  );
}

// ─── SelectionCard ────────────────────────────────────────────────────────────
interface SelectionCardProps {
  label: string;
  subtitle: string;
  icon: string;
  selected: boolean;
  onPress: () => void;
}

export function SelectionCard({
  label,
  subtitle,
  icon,
  selected,
  onPress,
}: SelectionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center gap-3 rounded-2xl border px-4 py-[14px] active:scale-[0.98] ${
        selected
          ? "border-[#4f46e5] bg-[#eef2ff]"
          : "border-[#e2e8f0] bg-[#f8fafc]"
      }`}
    >
      <View
        className={`h-8 w-8 items-center justify-center rounded-[10px] ${
          selected ? "bg-[#4f46e5]" : "bg-[#e2e8f0]"
        }`}
      >
        <Text className="text-base">{icon}</Text>
      </View>

      <View className="flex-1">
        <Text className="mb-[2px] text-base font-semibold text-[#0f172a]">
          {label}
        </Text>
        <Text className="text-[11px] text-[#475569]">{subtitle}</Text>
      </View>
    </Pressable>
  );
}

// ─── CheckBenefit ─────────────────────────────────────────────────────────────
interface CheckBenefitProps {
  title: string;
  description: string;
}

export function CheckBenefit({ title, description }: CheckBenefitProps) {
  return (
    <View className="flex-row items-start gap-3">
      <View className="mt-px h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[8px] border border-[#4f46e5] bg-[#eef2ff]">
        <Ionicons name="checkmark" size={13} color="#6366f1" />
      </View>
      <View className="flex-1">
        <Text className="mb-[3px] text-[15px] font-medium text-[#0f172a]">
          {title}
        </Text>
        <Text className="text-[13px] leading-5 text-[#334155]">
          {description}
        </Text>
      </View>
    </View>
  );
}

// ─── ProgressBar ──────────────────────────────────────────────────────────────
interface ProgressBarProps {
  step: number;
}

export function ProgressBar({ step }: ProgressBarProps) {
  const widthClass =
    step === 1 ? "w-1/4" : step === 2 ? "w-1/2" : step === 3 ? "w-3/4" : "w-full";

  return (
    <View className="mt-[14px] h-1 overflow-hidden rounded-full bg-[#e2e8f0]">
      <LinearGradient
        colors={["#4f46e5", "#6366f1"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        className={`h-1 rounded-full ${widthClass}`}
      />
    </View>
  );
}

// ─── DotIndicators ────────────────────────────────────────────────────────────
interface DotIndicatorsProps {
  step: number;
  total?: number;
}

export function DotIndicators({ step, total = 4 }: DotIndicatorsProps) {
  return (
    <View className="flex-row items-center gap-[6px]">
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <View
          key={n}
          className={
            n === step
              ? "h-[6px] w-[18px] rounded-[3px] bg-[#4f46e5]"
              : "h-[6px] w-[6px] rounded-full bg-[#e2e8f0]"
          }
        />
      ))}
    </View>
  );
}

// ─── BackButton ───────────────────────────────────────────────────────────────
interface BackButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export function BackButton({ onPress, disabled }: BackButtonProps) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      className={`h-9 w-9 items-center justify-center rounded-[10px] border border-[#e2e8f0] bg-[#f8fafc] ${
        disabled ? "opacity-0" : "opacity-100"
      }`}
    >
      <Ionicons name="chevron-back" size={18} color="#64748b" />
    </Pressable>
  );
}

// ─── PrimaryButton ────────────────────────────────────────────────────────────
interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  useGradient?: boolean;
}

export function PrimaryButton({
  label,
  onPress,
  disabled,
  useGradient,
}: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`h-[54px] w-full overflow-hidden rounded-2xl ${
        disabled ? "bg-[#cbd5e1]" : "bg-[#4f46e5]"
      } active:scale-[0.98]`}
    >
      {useGradient && !disabled ? (
        <LinearGradient
          colors={["#4338ca", "#4f46e5"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          className="flex-1 items-center justify-center"
        >
          <Text className="text-base font-semibold text-white">{label}</Text>
        </LinearGradient>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-base font-semibold text-white">{label}</Text>
        </View>
      )}
    </Pressable>
  );
}
