import React from "react";
import { Text, View } from "react-native";
import { Chip } from "./ui";
import { INTERESTS } from "@/constants";

interface InterestStepProps {
  selectedInterests: string[];
  setSelectedInterests: (value: string[]) => void;
}

export function InterestStep({
  selectedInterests,
  setSelectedInterests,
}: InterestStepProps) {
  const toggle = (label: string) => {
    if (selectedInterests.includes(label)) {
      setSelectedInterests(selectedInterests.filter((v) => v !== label));
    } else {
      setSelectedInterests([...selectedInterests, label]);
    }
  };

  return (
    <View>
      <Text className="mb-2 text-[28px] font-semibold text-[#0f172a]">
        What interests{"\n"}you?
      </Text>
      <Text className="mb-6 text-[15px] leading-6 text-[#475569]">
        We&apos;ll build conversations around your world.
      </Text>

      <View className="flex-row flex-wrap gap-[10px]">
        {INTERESTS.map((item) => (
          <Chip
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={selectedInterests.includes(item.label)}
            onPress={() => toggle(item.label)}
          />
        ))}
      </View>
    </View>
  );
}
