import { useEffect, useMemo, useState } from 'react';
import type { ImageSource } from 'expo-image';
import { Image } from 'expo-image';
import { Text, View } from 'react-native';
import Animated, {
    Easing,
    cancelAnimation,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';

const WORDS = ['Learn', 'Practice', 'Improve', 'Speak'];

type HeroSectionProps = {
    heroHeight: number;
    isCompactScreen: boolean;
    isKeyboardVisible: boolean;
    logo: ImageSource;
};

export default function HeroSection({
    heroHeight,
    isCompactScreen,
    isKeyboardVisible,
    logo,
}: HeroSectionProps) {
    const [wordIndex, setWordIndex] = useState(0);
    const glowShift = useSharedValue(0);
    const wordOpacity = useSharedValue(1);
    const wordTranslateY = useSharedValue(0);

    const currentWord = useMemo(() => WORDS[wordIndex], [wordIndex]);

    useEffect(() => {
        if (isKeyboardVisible) {
            return;
        }

        glowShift.value = withRepeat(
            withSequence(
                withTiming(1, { duration: 3200, easing: Easing.inOut(Easing.ease) }),
                withTiming(0, { duration: 3200, easing: Easing.inOut(Easing.ease) })
            ),
            -1,
            false
        );

        return () => {
            cancelAnimation(glowShift);
        };
    }, [glowShift, isKeyboardVisible]);

    useEffect(() => {
        if (isKeyboardVisible) {
            return;
        }

        wordOpacity.value = 1;
        wordTranslateY.value = 0;
        let nextWordTimeout: ReturnType<typeof setTimeout> | null = null;
        const interval = setInterval(() => {
            wordOpacity.value = withTiming(0, { duration: 180 });
            wordTranslateY.value = withTiming(10, { duration: 180 });

            nextWordTimeout = setTimeout(() => {
                setWordIndex((current) => (current + 1) % WORDS.length);
                wordTranslateY.value = -10;
                wordOpacity.value = 0;
                wordOpacity.value = withTiming(1, { duration: 260 });
                wordTranslateY.value = withTiming(0, { duration: 260 });
            }, 200);
        }, 2200);

        return () => {
            clearInterval(interval);
            if (nextWordTimeout) {
                clearTimeout(nextWordTimeout);
            }
            cancelAnimation(wordOpacity);
            cancelAnimation(wordTranslateY);
        };
    }, [isKeyboardVisible, wordOpacity, wordTranslateY]);

    const wordAnimatedStyle = useAnimatedStyle(() => ({
        opacity: wordOpacity.value,
        transform: [{ translateY: wordTranslateY.value }],
    }));

    const glowAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: glowShift.value * 22 - 11 }],
    }));

    if (isKeyboardVisible) {
        return null;
    }

    return (
        <View
            className="px-6"
            style={{
                paddingTop: isCompactScreen ? 24 : 46,
                paddingBottom: isCompactScreen ? 10 : 18,
                minHeight: heroHeight,
                justifyContent: 'center',
            }}
        >
            <View
                className="absolute left-6 top-2 h-20 w-20 rounded-full bg-sky-500/10"
                style={{ transform: [{ scale: isCompactScreen ? 0.9 : 1.2 }] }}
            />
            <Animated.View
                className="absolute right-8 top-5 h-16 w-16 rounded-full bg-cyan-300/10"
                style={glowAnimatedStyle}
            />

            <View
                className={`items-center justify-center rounded-[24px] border border-white/10 bg-white/5 ${isCompactScreen ? 'mb-3 h-12 w-12' : 'mb-4 h-[68px] w-[68px]'
                    }`}
            >
                <Image
                    source={logo}
                    accessibilityLabel="Lexa logo"
                    contentFit="contain"
                    transition={300}
                    style={{
                        width: isCompactScreen ? 30 : 46,
                        height: isCompactScreen ? 30 : 46,
                    }}
                />
            </View>

            <View className="max-w-[340px]">
                <Text
                    className={`font-bold text-white ${isCompactScreen ? 'text-[24px] leading-8' : 'text-[30px] leading-[38px]'
                        }`}
                >
                    Start to
                </Text>

                <Animated.View style={wordAnimatedStyle}>
                    <Text
                        className={`font-bold ${isCompactScreen
                                ? "text-[24px] leading-8"
                                : "text-[30px] leading-[38px]"
                            }`}
                    >
                        <Text style={{ color: "#22c55e" }}>
                            {currentWord}
                        </Text>
                    </Text>
                </Animated.View>
                <Text
                    className={`max-w-[320px] text-slate-300 ${isCompactScreen
                            ? 'mt-2 text-[12px] leading-4'
                            : 'mt-3 text-sm leading-6'
                        }`}
                >
                    Build confidence with guided speaking, focused practice, and
                    smarter daily progress.
                </Text>

                <View
                    className={`mt-3 flex-row gap-2 ${isCompactScreen ? 'flex-wrap' : 'items-center'}`}
                >
                    <View className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                        <Text className="text-xs font-medium text-slate-200">
                            AI coach
                        </Text>
                    </View>
                    <View className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                        <Text className="text-xs font-medium text-slate-200">
                            Daily streaks
                        </Text>
                    </View>
                    <View className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                        <Text className="text-xs font-medium text-slate-200">
                            Real practice
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
