import {
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  Button,
  Alert,
  FlatList,
} from "react-native";
import { ITodo } from "./types/Todo";
import { useState } from "react";

export default function App() {
  const [todolist, setTodolist] = useState<ITodo[]>([]);

  const [value, setValue] = useState<string>("");

  const handleAddTodo = () => {
    if (!value) return Alert.alert("Empty todo.");
    const todo = {
      text: value,
      id: todolist.length + 1,
    };
    setTodolist((v: ITodo[]) => [...v, todo]);
    setValue("");
  };

  const handleOnChange = (text: string) => {
    setValue(text);
  };

  const handleDeleteTodo = (id: number) => {
    setTodolist((v: ITodo[]) => v.filter((t: ITodo) => t.id !== id));
  };

  return (
    <View className="w-full py-9 px-2">
      <View className="w-full flex items-center flex-col">
        <Text className="w-full text-center text-xl mt-5 font-bold">
          Type your todolist right now !
        </Text>
        <Image source={require("./assets/photo-top.jpg")} />
      </View>

      <View className="w-full flex flex-row justify-between px-2 gap-1">
        <TextInput
          className="border w-[75%] rounded px-2"
          placeholder="Enter your todo..."
          onChangeText={handleOnChange}
          value={value}
        />
        <Text
          className="bg-cyan-500 p-1 text-white rounded w-[25%] text-center cursor-pointer"
          onPress={() => handleAddTodo()}
        >
          ADD
        </Text>
      </View>
      <Text className="w-full text-center font-bold text-2xl">TODOLIST</Text>
      {/* <ScrollView className="w-full flex flex-col gap-2 h-[300px] mt-2 px-2 overflow-y-scroll"> */}
      <FlatList
        data={todolist}
        renderItem={({ item }) => (
          <View className="border rounded mt-1 p-1 flex flex-row justify-between items-center">
            <Text>{item.text}</Text>
            <Button
              title="DELETE"
              color={"red"}
              onPress={() => handleDeleteTodo(item.id)}
            />
          </View>
        )}
      />
      {/* </ScrollView> */}
    </View>
  );
}
