import React from 'react';
import { Pressable, View, Text } from 'react-native';
import type { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onPress: () => void;
  onToggle: () => void;
  onDelete: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onPress,
  onToggle,
  onDelete,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-3 border border-gray-200 dark:border-gray-700"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1 flex-row items-center">
          <Pressable
            onPress={onToggle}
            className={`w-6 h-6 rounded border-2 mr-3 items-center justify-center ${
              todo.completed
                ? 'bg-green-500 border-green-500'
                : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            {todo.completed && (
              <Text className="text-white text-xs font-bold">✓</Text>
            )}
          </Pressable>

          <View className="flex-1">
            <Text
              className={`text-base font-semibold ${
                todo.completed
                  ? 'line-through text-gray-400 dark:text-gray-500'
                  : 'text-gray-900 dark:text-white'
              }`}
              numberOfLines={1}
            >
              {todo.title}
            </Text>
            {todo.description && (
              <Text
                className={`text-sm mt-1 ${
                  todo.completed
                    ? 'text-gray-300 dark:text-gray-600'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
                numberOfLines={2}
              >
                {todo.description}
              </Text>
            )}
          </View>
        </View>

        <Pressable
          onPress={onDelete}
          className="ml-3 p-2"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text className="text-red-500 text-lg">🗑️</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};
