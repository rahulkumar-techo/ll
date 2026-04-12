import React from "react";
import { Text, View } from "react-native";
import { SelectionCard } from "./ui";
import { LEVELS } from "@/constants";

interface LevelStepProps {
  level: string | null;
  setLevel: (value: string) => void;
}

export function LevelStep({ level, setLevel }: LevelStepProps) {
  return (
    <View>
      <Text className="mb-2 text-[28px] font-semibold text-[#0f172a]">
        Choose{"\n"}your level
      </Text>
      <Text className="mb-6 text-[15px] leading-6 text-[#475569]">
        We&apos;ll personalize your path from day one.
      </Text>

      <View className="gap-3">
        {LEVELS.map((item) => (
          <SelectionCard
            key={item.label}
            label={item.label}
            subtitle={item.subtitle}
            icon={item.icon}
            selected={level === item.label}
            onPress={() => setLevel(item.label)}
          />
        ))}
      </View>
    </View>
  );
}
