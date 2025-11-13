import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTodoStore } from '../stores/useTodoStore';
import type { RootStackParamList } from '../navigation/types';

type AddTodoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddTodo'>;

export const AddTodoScreen: React.FC = () => {
  const navigation = useNavigation<AddTodoScreenNavigationProp>();
  const addTodo = useTodoStore((state) => state.addTodo);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (title.trim()) {
      addTodo(title.trim(), description.trim() || undefined);
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-50 dark:bg-gray-900"
    >
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="bg-blue-600 pt-12 pb-6 px-6">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-3xl font-bold text-white mb-1">New Todo</Text>
              <Text className="text-blue-100">Create a new task</Text>
            </View>
            <Pressable
              onPress={() => navigation.goBack()}
              className="p-2"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text className="text-white text-2xl">✕</Text>
            </Pressable>
          </View>
        </View>

        {/* Form */}
        <View className="p-6">
          {/* Title Input */}
          <View className="mb-6">
            <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Title *
            </Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="What needs to be done?"
              placeholderTextColor="#9CA3AF"
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white text-base"
              autoFocus
            />
          </View>

          {/* Description Input */}
          <View className="mb-6">
            <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Description (optional)
            </Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Add more details..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white text-base"
              style={{ minHeight: 100 }}
            />
          </View>

          {/* Actions */}
          <View className="flex-row gap-3">
            <Pressable
              onPress={() => navigation.goBack()}
              className="flex-1 bg-gray-200 dark:bg-gray-700 py-4 rounded-lg items-center"
            >
              <Text className="text-gray-700 dark:text-gray-300 font-semibold text-base">
                Cancel
              </Text>
            </Pressable>

            <Pressable
              onPress={handleSave}
              disabled={!title.trim()}
              className={`flex-1 py-4 rounded-lg items-center ${
                title.trim()
                  ? 'bg-blue-600'
                  : 'bg-gray-300 dark:bg-gray-700'
              }`}
            >
              <Text className={`font-semibold text-base ${
                title.trim() ? 'text-white' : 'text-gray-500'
              }`}>
                Save Todo
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
