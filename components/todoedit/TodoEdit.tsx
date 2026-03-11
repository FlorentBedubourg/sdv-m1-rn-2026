import { TodoContext } from "@/data/context/TodoContext";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function TodoEdit({ id }: { id?: string }) {
  const { addTodo, todos, updateTodo } = useContext(TodoContext);
  const todo = todos.find((t) => t.id === parseInt(id!));
  const [title, setTitle] = useState(todo?.todo || "");
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const isCreating = id === "-1";
  const onSubmit = async () => {
    setIsEditing(true);
    if (isCreating) {
      await addTodo(title);
    } else {
      await updateTodo(parseInt(id!), title);
    }
    setIsEditing(false);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text>
        {isCreating
          ? "Titre de la nouvelle TODO :"
          : "Nouveau titre de la TODO"}
      </Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(newTitle) => setTitle(newTitle)}
      />
      {isEditing ? (
        <ActivityIndicator />
      ) : (
        <Button
          title={isCreating ? "Ajouter" : "Modifier"}
          onPress={onSubmit}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
  },
  input: {
    borderWidth: 1,
    padding: 16,
  },
});
