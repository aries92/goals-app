import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { IGoal, IGoalsMapped } from "../types";

export function useStorage<T>(key: string) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({} as T);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const item = await AsyncStorage.getItem(key);
        setData(({ [key]: item } as unknown) as T);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [key]);

  return { ...data, loading };
}

export function mapGoals(goals: IGoal[]) {
  const newGoals: IGoalsMapped = { done: [], todo: [] };
  goals.forEach(g => {
    g.complete ? newGoals.done.push(g) : newGoals.todo.push(g);
  });
  return newGoals;
}
