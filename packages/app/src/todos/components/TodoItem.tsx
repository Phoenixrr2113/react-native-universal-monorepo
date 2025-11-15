import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
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
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <Pressable
            onPress={onToggle}
            style={[
              styles.checkbox,
              todo.completed && styles.checkboxCompleted,
            ]}
          >
            {todo.completed && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </Pressable>

          <View style={styles.textContainer}>
            <Text
              style={[
                styles.title,
                todo.completed && styles.titleCompleted,
              ]}
              numberOfLines={1}
            >
              {todo.title}
            </Text>
            {todo.description && (
              <Text
                style={[
                  styles.description,
                  todo.completed && styles.descriptionCompleted,
                ]}
                numberOfLines={2}
              >
                {todo.description}
              </Text>
            )}
          </View>
        </View>

        <Pressable
          onPress={onDelete}
          style={styles.deleteButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.deleteIcon}>🗑️</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d1d5db',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  descriptionCompleted: {
    color: '#d1d5db',
  },
  deleteButton: {
    marginLeft: 12,
    padding: 8,
  },
  deleteIcon: {
    fontSize: 18,
  },
});
