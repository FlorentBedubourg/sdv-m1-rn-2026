import TodoList from "@/components/todolist/TodoList";
import { Stack, useRouter } from "expo-router";
import { Button } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <>
      <Stack.Screen
        options={{
          title: "TODO-list",
          headerRight: () => (
            <Button
              onPress={() => {
                router.navigate("/list/-1");
              }}
              title="Créer"
            />
          ),
        }}
      />
      <TodoList />
    </>
  );
}
