import { Text, View, StyleSheet } from "react-native";
import { supabase } from '../utils/supabase';

export default function Index() {
    //  const { data: todos, error } = await supabase.from('todos').select();
  return (
     <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
