# LL Auth Setup

This app uses native Google Sign-In with Supabase Auth.

Google uses `@react-native-google-signin/google-signin` on iOS and Android, and a Supabase OAuth flow on web.

## Environment variables

Add these to `.env.local`:

```bash
EXPO_PUBLIC_SUPABASE_URL=...
EXPO_PUBLIC_SUPABASE_KEY=...

EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=...
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=...
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=...
```

## Expo config

The app config includes:

- `@react-native-google-signin/google-signin`
- `scheme: "ll"`

The Google config plugin needs the reversed iOS client ID as `iosUrlScheme`.

## Supabase setup

In the Supabase dashboard:

1. Enable Google under Auth -> Sign In / Providers.
2. Add your Google web client ID and web client secret.

For native Google sign-in with Supabase, the web client ID is required so Google returns an ID token. The Google web client secret is configured in Supabase, not used by the app runtime.

## Local and device testing

- `@react-native-google-signin/google-signin` does not work in Expo Go.
- Use a development build or production build for Google Sign-In testing.

## Run the app

```bash
pnpm install
npx expo prebuild
pnpm ios
# or
pnpm android
```
