import { Text, View, StyleSheet } from "react-native";
import { supabase } from '../utils/supabase';

export default function Index() {
    //  const { data: todos, error } = await supabase.from('todos').select();
  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
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
