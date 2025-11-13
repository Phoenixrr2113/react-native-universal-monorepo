import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTodoStore } from '../stores/useTodoStore';
import type { RootStackParamList } from '../navigation/types';

type TodoDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TodoDetail'>;
type TodoDetailScreenRouteProp = NativeStackScreenProps<RootStackParamList, 'TodoDetail'>['route'];

export const TodoDetailScreen: React.FC = () => {
  const navigation = useNavigation<TodoDetailScreenNavigationProp>();
  const route = useRoute<TodoDetailScreenRouteProp>();
  const { todoId } = route.params;

  const { getTodoById, updateTodo, deleteTodo, toggleTodo } = useTodoStore();
  const todo = getTodoById(todoId);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo?.title || '');
  const [description, setDescription] = useState(todo?.description || '');

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description || '');
    }
  }, [todo]);

  if (!todo) {
    return (
      <View className="flex-1 bg-gray-50 dark:bg-gray-900 items-center justify-center">
        <Text className="text-xl text-gray-500 dark:text-gray-400">Todo not found</Text>
      </View>
    );
  }

  const handleSave = () => {
    if (title.trim()) {
      updateTodo(todoId, {
        title: title.trim(),
        description: description.trim() || undefined,
      });
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Todo',
      'Are you sure you want to delete this todo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteTodo(todoId);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-50 dark:bg-gray-900"
    >
      <ScrollView className="flex-1">
        {/* Header */}
        <View className={`pt-12 pb-6 px-6 ${
          todo.completed ? 'bg-green-600' : 'bg-blue-600'
        }`}>
          <View className="flex-row items-center justify-between mb-4">
            <Pressable
              onPress={() => navigation.goBack()}
              className="p-2"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text className="text-white text-2xl">←</Text>
            </Pressable>

            <View className="flex-row gap-3">
              <Pressable
                onPress={() => toggleTodo(todoId)}
                className="bg-white/20 px-4 py-2 rounded-lg"
              >
                <Text className="text-white font-semibold">
                  {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </Text>
              </Pressable>

              <Pressable
                onPress={handleDelete}
                className="bg-red-500/80 px-4 py-2 rounded-lg"
              >
                <Text className="text-white font-semibold">Delete</Text>
              </Pressable>
            </View>
          </View>

          <Text className="text-white/80 text-sm mb-1">
            {todo.completed ? 'Completed Task' : 'Active Task'}
          </Text>
          <Text className="text-2xl font-bold text-white">
            {todo.completed ? '✓ ' : ''}
            {isEditing ? 'Editing Todo' : 'Todo Details'}
          </Text>
        </View>

        {/* Content */}
        <View className="p-6">
          {isEditing ? (
            <>
              {/* Edit Mode */}
              <View className="mb-6">
                <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Title
                </Text>
                <TextInput
                  value={title}
                  onChangeText={setTitle}
                  className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white text-base"
                  autoFocus
                />
              </View>

              <View className="mb-6">
                <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </Text>
                <TextInput
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white text-base"
                  style={{ minHeight: 100 }}
                />
              </View>

              <View className="flex-row gap-3">
                <Pressable
                  onPress={() => {
                    setTitle(todo.title);
                    setDescription(todo.description || '');
                    setIsEditing(false);
                  }}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 py-4 rounded-lg items-center"
                >
                  <Text className="text-gray-700 dark:text-gray-300 font-semibold">
                    Cancel
                  </Text>
                </Pressable>

                <Pressable
                  onPress={handleSave}
                  className="flex-1 bg-blue-600 py-4 rounded-lg items-center"
                >
                  <Text className="text-white font-semibold">Save Changes</Text>
                </Pressable>
              </View>
            </>
          ) : (
            <>
              {/* View Mode */}
              <View className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 border border-gray-200 dark:border-gray-700">
                <Text className={`text-xl font-bold mb-3 ${
                  todo.completed
                    ? 'line-through text-gray-400 dark:text-gray-500'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {todo.title}
                </Text>

                {todo.description && (
                  <Text className={`text-base leading-6 ${
                    todo.completed
                      ? 'text-gray-400 dark:text-gray-500'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {todo.description}
                  </Text>
                )}
              </View>

              {/* Metadata */}
              <View className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
                <View className="flex-row justify-between mb-2">
                  <Text className="text-gray-600 dark:text-gray-400">Created:</Text>
                  <Text className="text-gray-900 dark:text-white font-medium">
                    {formatDate(todo.createdAt)}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-gray-600 dark:text-gray-400">Updated:</Text>
                  <Text className="text-gray-900 dark:text-white font-medium">
                    {formatDate(todo.updatedAt)}
                  </Text>
                </View>
              </View>

              <Pressable
                onPress={() => setIsEditing(true)}
                className="bg-blue-600 py-4 rounded-lg items-center"
              >
                <Text className="text-white font-semibold text-base">Edit Todo</Text>
              </Pressable>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
