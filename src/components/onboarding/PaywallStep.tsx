import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CheckBenefit } from "./ui";
import { BENEFITS, PAYWALL_OPTIONS } from "@/constants";

interface PaywallStepProps {
  selectedPaywall: string | null;
  setSelectedPaywall: (value: string) => void;
}

export function PaywallStep({
  selectedPaywall,
  setSelectedPaywall,
}: PaywallStepProps) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="pb-2">
        {/* Header row */}
        <View className="mb-[18px] flex-row items-center gap-3">
          <View className="h-9 w-9 items-center justify-center rounded-[10px] border border-[#4f46e5] bg-[#eef2ff]">
            <Ionicons name="star" size={16} color="#6366f1" />
          </View>
          <View>
            <Text className="text-[15px] font-medium text-[#0f172a]">
              Unlock Lexa Pro
            </Text>
            <Text className="mt-[3px] text-[11px] text-[#475569]">
              Everything to become fluent, faster
            </Text>
          </View>
        </View>

        {/* Price card */}
        <View className="mb-2 rounded-2xl border border-[#4f46e5] bg-[#f8fafc] px-5 py-[18px]">
          {/* Trial badge */}
          <View className="mb-[14px] self-start rounded-full border border-[#4f46e5] bg-[#eef2ff] px-[10px] py-[5px]">
            <Text className="text-[11px] font-medium text-[#6366f1]">
              7-day free trial
            </Text>
          </View>

          {/* Price */}
          <View className="mb-[5px] flex-row items-end gap-[5px]">
            <Text className="text-[28px] font-semibold text-[#0f172a]">
              $9.99
            </Text>
            <Text className="mb-1 text-sm text-[#475569]">/mo</Text>
          </View>
          <Text className="text-[13px] text-[#475569]">
            Billed monthly · cancel anytime
          </Text>

          {/* Divider */}
          <View className="my-[14px] h-px bg-[#e2e8f0]" />

          <Text className="text-xs text-[#475569]">
            or $79.99/year - save 33%
          </Text>

          <View className="mt-5 gap-3">
            {PAYWALL_OPTIONS.map((option) => {
              const isSelected = selectedPaywall === option.id;

              return (
                <Pressable
                  key={option.id}
                  onPress={() => setSelectedPaywall(option.id)}
                  className={`rounded-2xl border px-4 py-3 ${
                    isSelected
                      ? "border-[#4f46e5] bg-[#eef2ff]"
                      : "border-[#e2e8f0] bg-white"
                  }`}
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1 pr-4">
                      <Text
                        className={`text-sm font-semibold ${
                          isSelected ? "text-[#312e81]" : "text-[#0f172a]"
                        }`}
                      >
                        {option.title}
                      </Text>
                      <Text className="mt-1 text-[13px] text-[#64748b]">
                        {option.subtitle}
                      </Text>
                    </View>
                    <View className="items-end">
                      <Text className="text-sm font-semibold text-[#4f46e5]">
                        {option.price}
                      </Text>
                      <View
                        className={`mt-2 h-5 w-5 items-center justify-center rounded-full border ${
                          isSelected
                            ? "border-[#4f46e5] bg-[#4f46e5]"
                            : "border-[#cbd5e1] bg-white"
                        }`}
                      >
                        {isSelected ? (
                          <Ionicons name="checkmark" size={12} color="#ffffff" />
                        ) : null}
                      </View>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>

          {/* Benefits */}
          <View className="mt-5 gap-4">
            {BENEFITS.map((item) => (
              <CheckBenefit
                key={item.title}
                title={item.title}
                description={item.description}
              />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
