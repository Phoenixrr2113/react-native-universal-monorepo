import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Todo, TodoStore } from '../types';

const STORAGE_KEY = '@todos';

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],

  addTodo: (title: string, description?: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    set((state) => ({
      todos: [newTodo, ...state.todos],
    }));

    // Save to AsyncStorage
    get().saveTodos();
  },

  toggleTodo: (id: string) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: Date.now() }
          : todo
      ),
    }));

    get().saveTodos();
  },

  deleteTodo: (id: string) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));

    get().saveTodos();
  },

  updateTodo: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? { ...todo, ...updates, updatedAt: Date.now() }
          : todo
      ),
    }));

    get().saveTodos();
  },

  getTodoById: (id: string) => {
    return get().todos.find((todo) => todo.id === id);
  },

  loadTodos: async () => {
    try {
      const todosJson = await AsyncStorage.getItem(STORAGE_KEY);
      if (todosJson) {
        const todos = JSON.parse(todosJson);
        set({ todos });
      }
    } catch (error) {
      console.error('Failed to load todos:', error);
    }
  },

  saveTodos: async () => {
    try {
      const { todos } = get();
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos:', error);
    }
  },
}));
