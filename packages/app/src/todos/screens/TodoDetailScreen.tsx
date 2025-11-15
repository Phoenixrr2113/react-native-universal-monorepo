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
  StyleSheet,
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
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Todo not found</Text>
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
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={[
          styles.header,
          todo.completed ? styles.headerCompleted : styles.headerActive,
        ]}>
          <View style={styles.headerTop}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={styles.backButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.backButtonText}>←</Text>
            </Pressable>

            <View style={styles.headerActions}>
              <Pressable
                onPress={() => toggleTodo(todoId)}
                style={styles.toggleButton}
              >
                <Text style={styles.toggleButtonText}>
                  {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </Text>
              </Pressable>

              <Pressable
                onPress={handleDelete}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </Pressable>
            </View>
          </View>

          <Text style={styles.headerStatus}>
            {todo.completed ? 'Completed Task' : 'Active Task'}
          </Text>
          <Text style={styles.headerTitle}>
            {todo.completed ? '✓ ' : ''}
            {isEditing ? 'Editing Todo' : 'Todo Details'}
          </Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {isEditing ? (
            <>
              {/* Edit Mode */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Title
                </Text>
                <TextInput
                  value={title}
                  onChangeText={setTitle}
                  style={styles.input}
                  autoFocus
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Description
                </Text>
                <TextInput
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  style={[styles.input, styles.textArea]}
                />
              </View>

              <View style={styles.editActions}>
                <Pressable
                  onPress={() => {
                    setTitle(todo.title);
                    setDescription(todo.description || '');
                    setIsEditing(false);
                  }}
                  style={styles.cancelButton}
                >
                  <Text style={styles.cancelButtonText}>
                    Cancel
                  </Text>
                </Pressable>

                <Pressable
                  onPress={handleSave}
                  style={styles.saveButton}
                >
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </Pressable>
              </View>
            </>
          ) : (
            <>
              {/* View Mode */}
              <View style={styles.todoCard}>
                <Text style={[
                  styles.todoTitle,
                  todo.completed && styles.todoTitleCompleted,
                ]}>
                  {todo.title}
                </Text>

                {todo.description && (
                  <Text style={[
                    styles.todoDescription,
                    todo.completed && styles.todoDescriptionCompleted,
                  ]}>
                    {todo.description}
                  </Text>
                )}
              </View>

              {/* Metadata */}
              <View style={styles.metadata}>
                <View style={styles.metadataRow}>
                  <Text style={styles.metadataLabel}>Created:</Text>
                  <Text style={styles.metadataValue}>
                    {formatDate(todo.createdAt)}
                  </Text>
                </View>
                <View style={styles.metadataRow}>
                  <Text style={styles.metadataLabel}>Updated:</Text>
                  <Text style={styles.metadataValue}>
                    {formatDate(todo.updatedAt)}
                  </Text>
                </View>
              </View>

              <Pressable
                onPress={() => setIsEditing(true)}
                style={styles.editButton}
              >
                <Text style={styles.editButtonText}>Edit Todo</Text>
              </Pressable>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  notFoundContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    fontSize: 20,
    color: '#6b7280',
  },
  header: {
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  headerActive: {
    backgroundColor: '#2563eb',
  },
  headerCompleted: {
    backgroundColor: '#16a34a',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 24,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  toggleButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  toggleButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  headerStatus: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    padding: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#111827',
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
  },
  editActions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#374151',
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  todoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  todoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  todoTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  todoDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },
  todoDescriptionCompleted: {
    color: '#9ca3af',
  },
  metadata: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  metadataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metadataLabel: {
    color: '#6b7280',
  },
  metadataValue: {
    color: '#111827',
    fontWeight: '500',
  },
  editButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});
