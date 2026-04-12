import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function WelcomeStep() {
  return (
    <View className="flex-1 justify-center px-1 pb-10 pt-6">
      <View className="items-center">
        <View className="mb-10 h-[240px] w-full items-center justify-center">
          <View style={styles.glowCircle} />
          <View style={styles.glowCircleInner} />

          <View style={styles.cardShell}>
            <View className="mb-4 flex-row items-center justify-between">
              <View className="rounded-full bg-[#eef2ff] px-3 py-1">
                <Text className="text-xs font-semibold text-[#4f46e5]">
                  AI Lesson
                </Text>
              </View>
              <View className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </View>

            <View className="gap-3">
              <View className="h-3 w-[72%] rounded-full bg-slate-200" />
              <View className="h-3 w-full rounded-full bg-slate-200" />
              <View className="h-3 w-[82%] rounded-full bg-slate-200" />
            </View>

            <View className="mt-5 flex-row items-center">
              <View className="mr-3 h-11 w-11 items-center justify-center rounded-2xl bg-[#4f46e5]">
                <Text className="text-lg font-bold text-white">L</Text>
              </View>
              <View className="flex-1">
                <View className="mb-2 h-2.5 w-20 rounded-full bg-[#c7d2fe]" />
                <View className="h-2.5 w-28 rounded-full bg-[#e2e8f0]" />
              </View>
            </View>
          </View>

          <View style={styles.floatingBadge}>
            <View className="flex-row items-center gap-2">
              <View className="h-2.5 w-2.5 rounded-full bg-[#818cf8]" />
              <View className="h-2.5 w-2.5 rounded-full bg-[#6366f1]" />
              <View className="h-2.5 w-2.5 rounded-full bg-[#4f46e5]" />
            </View>
            <Text className="mt-2 text-xs font-semibold text-[#334155]">
              Ready to chat
            </Text>
          </View>
        </View>

        <View className="w-full max-w-[320px] items-center">
          <View className="mb-4 rounded-full bg-[#eef2ff] px-4 py-2">
            <Text className="text-xs font-semibold uppercase tracking-[1px] text-[#4f46e5]">
              English Coach
            </Text>
          </View>

          <Text className="mb-3 text-center text-[32px] font-semibold leading-10 text-[#0f172a]">
            Welcome to Lexa
          </Text>

          <Text className="mb-8 text-center text-base leading-7 text-[#475569]">
            Practice real conversations, get instant feedback, and build confidence every day.
          </Text>

          <View className="w-full gap-3">
            <View className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3">
              <Text className="text-sm font-medium text-[#0f172a]">
                Real conversation practice
              </Text>
              <Text className="mt-1 text-[13px] leading-5 text-[#64748b]">
                Natural back-and-forth lessons that feel like chatting with a tutor.
              </Text>
            </View>

            <View className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3">
              <Text className="text-sm font-medium text-[#0f172a]">
                Instant feedback
              </Text>
              <Text className="mt-1 text-[13px] leading-5 text-[#64748b]">
                Improve pronunciation, grammar, and fluency as you go.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  glowCircle: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: "#eef2ff",
  },
  glowCircleInner: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 999,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#dbeafe",
  },
  cardShell: {
    width: 250,
    borderRadius: 28,
    backgroundColor: "#ffffff",
    padding: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#4f46e5",
    shadowOpacity: 0.08,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  floatingBadge: {
    position: "absolute",
    right: 18,
    bottom: 6,
    borderRadius: 18,
    backgroundColor: "#ffffff",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    alignItems: "center",
    shadowColor: "#0f172a",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
});
