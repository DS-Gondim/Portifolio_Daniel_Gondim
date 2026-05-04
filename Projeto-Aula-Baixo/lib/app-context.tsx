import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Lesson, UserProfile } from "./types";
import { MOCK_USER } from "./mock-data";

const LESSONS_KEY = "@bassclass:lessons";
const USER_KEY = "@bassclass:user";

interface AppState {
  lessons: Lesson[];
  user: UserProfile;
  isLoading: boolean;
}

type AppAction =
  | { type: "SET_LESSONS"; payload: Lesson[] }
  | { type: "ADD_LESSON"; payload: Lesson }
  | { type: "UPDATE_LESSON"; payload: Lesson }
  | { type: "CANCEL_LESSON"; payload: string }
  | { type: "SET_USER"; payload: UserProfile }
  | { type: "SET_LOADING"; payload: boolean };

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_LESSONS":
      return { ...state, lessons: action.payload };
    case "ADD_LESSON":
      return { ...state, lessons: [action.payload, ...state.lessons] };
    case "UPDATE_LESSON":
      return {
        ...state,
        lessons: state.lessons.map((l) =>
          l.id === action.payload.id ? action.payload : l
        ),
      };
    case "CANCEL_LESSON":
      return {
        ...state,
        lessons: state.lessons.map((l) =>
          l.id === action.payload ? { ...l, status: "cancelada" as const } : l
        ),
      };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  addLesson: (lesson: Lesson) => Promise<void>;
  updateLesson: (lesson: Lesson) => Promise<void>;
  cancelLesson: (lessonId: string) => Promise<void>;
  updateUser: (user: UserProfile) => Promise<void>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, {
    lessons: [],
    user: MOCK_USER,
    isLoading: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [lessonsJson, userJson] = await Promise.all([
        AsyncStorage.getItem(LESSONS_KEY),
        AsyncStorage.getItem(USER_KEY),
      ]);
      if (lessonsJson) {
        dispatch({ type: "SET_LESSONS", payload: JSON.parse(lessonsJson) });
      }
      if (userJson) {
        dispatch({ type: "SET_USER", payload: JSON.parse(userJson) });
      }
    } catch (e) {
      console.error("Failed to load data", e);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  async function addLesson(lesson: Lesson) {
    dispatch({ type: "ADD_LESSON", payload: lesson });
    const updated = [lesson, ...state.lessons];
    await AsyncStorage.setItem(LESSONS_KEY, JSON.stringify(updated));
  }

  async function updateLesson(lesson: Lesson) {
    dispatch({ type: "UPDATE_LESSON", payload: lesson });
    const updated = state.lessons.map((l) =>
      l.id === lesson.id ? lesson : l
    );
    await AsyncStorage.setItem(LESSONS_KEY, JSON.stringify(updated));
  }

  async function cancelLesson(lessonId: string) {
    dispatch({ type: "CANCEL_LESSON", payload: lessonId });
    const updated = state.lessons.map((l) =>
      l.id === lessonId ? { ...l, status: "cancelada" as const } : l
    );
    await AsyncStorage.setItem(LESSONS_KEY, JSON.stringify(updated));
  }

  async function updateUser(user: UserProfile) {
    dispatch({ type: "SET_USER", payload: user });
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  return (
    <AppContext.Provider
      value={{ state, addLesson, updateLesson, cancelLesson, updateUser }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
