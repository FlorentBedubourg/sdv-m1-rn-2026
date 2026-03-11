import TodoDetail from "@/components/tododetail/TodoDetail";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Button } from "react-native";

export default function TodoDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          title: `TODO #${id}`,
          headerRight: () => (
            <Button
              onPress={() => {
                router.navigate(`/list/${id}`);
              }}
              title="Modifier"
            />
          ),
        }}
      />
      <TodoDetail id={id as string} />
    </>
  );
}
