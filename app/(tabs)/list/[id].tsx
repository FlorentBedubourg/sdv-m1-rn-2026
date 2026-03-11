import TodoEdit from "@/components/todoedit/TodoEdit";
import { Stack, useLocalSearchParams } from "expo-router";

export default function TodoEditScreen() {
  const { id } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen
        options={{
          title:
            typeof id === "string" && id.toString() !== "-1"
              ? `Modifier #${id}`
              : "Créer une TODO",
        }}
      />
      <TodoEdit id={id as string} />
    </>
  );
}
