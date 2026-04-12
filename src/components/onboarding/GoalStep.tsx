import React from "react";
import { Text, View } from "react-native";
import { Chip } from "./ui";
import { MOTIVATIONS } from "@/constants";

interface GoalStepProps {
  motivations: string[];
  setMotivations: (value: string[]) => void;
}

export function GoalStep({ motivations, setMotivations }: GoalStepProps) {
  const toggle = (label: string) => {
    if (motivations.includes(label)) {
      setMotivations(motivations.filter((v) => v !== label));
    } else {
      setMotivations([...motivations, label]);
    }
  };

  return (
    <View>
      <Text className="mb-2 text-[28px] font-semibold text-[#0f172a]">
        Why are you{"\n"}learning?
      </Text>
      <Text className="mb-6 text-[15px] leading-6 text-[#475569]">
        Choose all that apply.
      </Text>

      <View className="flex-row flex-wrap gap-[10px]">
        {MOTIVATIONS.map((item) => (
          <Chip
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={motivations.includes(item.label)}
            onPress={() => toggle(item.label)}
          />
        ))}
      </View>
    </View>
  );
}
