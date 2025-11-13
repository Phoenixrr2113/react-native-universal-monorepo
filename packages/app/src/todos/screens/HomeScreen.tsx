import React, { useEffect } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTodoStore } from '../stores/useTodoStore';
import { TodoItem } from '../components/TodoItem';
import type { RootStackParamList } from '../navigation/types';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { todos, toggleTodo, deleteTodo, loadTodos } = useTodoStore();

  useEffect(() => {
    loadTodos();
  }, []);

  const activeTodos = todos.filter(t => !t.completed);
  const completedTodos = todos.filter(t => t.completed);

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="bg-blue-600 pt-12 pb-6 px-6">
        <Text className="text-3xl font-bold text-white mb-2">My Todos</Text>
        <Text className="text-blue-100">
          {activeTodos.length} active • {completedTodos.length} completed
        </Text>
      </View>

      {/* Todo List */}
      <View className="flex-1 px-4 pt-4">
        {todos.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-6xl mb-4">📝</Text>
            <Text className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No todos yet
            </Text>
            <Text className="text-gray-500 dark:text-gray-400 text-center">
              Tap the + button to create your first todo
            </Text>
          </View>
        ) : (
          <FlatList
            data={todos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TodoItem
                todo={item}
                onPress={() => navigation.navigate('TodoDetail', { todoId: item.id })}
                onToggle={() => toggleTodo(item.id)}
                onDelete={() => deleteTodo(item.id)}
              />
            )}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* Add Button */}
      <Pressable
        onPress={() => navigation.navigate('AddTodo')}
        className="absolute bottom-6 right-6 w-16 h-16 bg-blue-600 rounded-full items-center justify-center shadow-lg"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 8,
        }}
      >
        <Text className="text-white text-3xl font-light">+</Text>
      </Pressable>
    </View>
  );
};
