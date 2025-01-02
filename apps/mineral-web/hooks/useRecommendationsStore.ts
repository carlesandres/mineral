import { create } from 'zustand';
import localforage from 'localforage';

const RECOMMENDATIONS_KEY = 'USER_RECOMMENDATIONS';
const saveRecommendations = (recommendations: StoreState) =>
  localforage.setItem(RECOMMENDATIONS_KEY, recommendations);

interface StoreState {
  lastBackup: number;
}

export const hardCodedDefaults: StoreState = {
  lastBackup: 0,
};

const useRecommendationsStore = create<StoreState>(() => hardCodedDefaults);

export const setSetting = (key: keyof StoreState, value: any) => {
  useRecommendationsStore.setState((state) => {
    const validKeys = Object.keys(hardCodedDefaults) as (keyof StoreState)[];
    const recommendations = {} as StoreState;
    for (const k of validKeys) {
      recommendations[k] = state[k];
    }
    recommendations[key] = value;
    saveRecommendations(recommendations);
    return { [key]: value };
  });
};

export const loadRecommendations = async () => {
  const recommendations =
    await localforage.getItem<StoreState>(RECOMMENDATIONS_KEY);
  useRecommendationsStore.setState((state) => {
    return recommendations || state;
  });
};

export default useRecommendationsStore;
