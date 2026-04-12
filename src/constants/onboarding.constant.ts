// ─── Colors ───────────────────────────────────────────────────────────────────
export const COLORS = {
  background: "#ffffff",
  surface: "#f8fafc",
  border: "#e2e8f0",
  primary: "#4f46e5",
  primaryHover: "#4338ca",
  accent: "#6366f1",
  selectedTint: "#eef2ff",
  textPrimary: "#0f172a",
  textSecondary: "#475569",
  textMuted: "#64748b",
  body: "#334155",
  subtleBody: "#94a3b8",
} as const;

// ─── Data ─────────────────────────────────────────────────────────────────────
export const LEVELS = [
  { label: "Beginner", subtitle: "Just starting out", icon: "🌱" },
  { label: "Intermediate", subtitle: "Know the basics", icon: "📖" },
  { label: "Advanced", subtitle: "Nearly fluent", icon: "🚀" },
] as const;

export const MOTIVATIONS = [
  { label: "Travel", icon: "✈" },
  { label: "Career growth", icon: "💼" },
  { label: "Study abroad", icon: "🎓" },
  { label: "Social conversations", icon: "💬" },
  { label: "Family & culture", icon: "🏠" },
] as const;

export const INTERESTS = [
  { label: "Daily conversations", icon: "🗣" },
  { label: "Business English", icon: "📊" },
  { label: "Movies & entertainment", icon: "🎬" },
  { label: "Technology", icon: "💻" },
  { label: "Travel situations", icon: "🌍" },
  { label: "Food & dining", icon: "🍽" },
] as const;

export const BENEFITS = [
  {
    title: "Unlimited AI conversations",
    description: "Unlimited AI conversations, every day",
  },
  {
    title: "Real-life scenarios",
    description: "Role-play job interviews, travel, social situations",
  },
  {
    title: "Personalized feedback",
    description: "Grammar, pronunciation, fluency scoring",
  },
  {
    title: "Offline mode",
    description: "Practice anywhere, no connection needed",
  },
] as const;

export const PAYWALL_OPTIONS = [
  {
    id: "free",
    title: "Free",
    price: "$0",
    subtitle: "Basic access with limited features",
  },
  {
    id: "monthly",
    title: "Monthly",
    price: "$9.99/mo",
    subtitle: "Flexible billing, cancel anytime",
  },
  {
    id: "yearly",
    title: "Yearly",
    price: "$79.99/yr",
    subtitle: "Best value, save 33%",
  },
] as const;

// ─── Types ────────────────────────────────────────────────────────────────────
export type OnboardingStep = 0 | 1 | 2 | 3 | 4;

export interface OnboardingState {
  step: OnboardingStep;
  level: string | null;
  motivations: string[];
  selectedInterests: string[];
  selectedPaywall: string | null;
  submitting: boolean;
}

export interface OnboardingActions {
  setLevel: (value: string) => void;
  setMotivations: (value: string[]) => void;
  setSelectedInterests: (value: string[]) => void;
  setSelectedPaywall: (value: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  completeOnboarding: () => void;
  continueWithLimitedAccess: () => void;
}
