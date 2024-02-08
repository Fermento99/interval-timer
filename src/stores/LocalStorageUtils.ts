import type { Period, TableConfig } from '@/stores/ExerciseStore';

type StorageKeys = 'interval-timer_default-config' | 'interval-timer_saved-configs';
export type ExerciseDetails = Pick<Period, 'name' | 'notes'>;
export type SavedConfig = TableConfig & { exercises: ExerciseDetails[] };

const getKey = (key: StorageKeys) => JSON.parse(localStorage.getItem(key) || 'false');

const setKey = (key: StorageKeys, value: any) => localStorage.setItem(key, JSON.stringify(value));

export const getDefaultConfig = () => {
  const config = getKey('interval-timer_default-config');
  if (!config) throw Error('default config not found');

  return config as SavedConfig;
};

export const saveDefaultConfig = (config: Partial<SavedConfig>) => {
  try {
    const savedConfig = getDefaultConfig();
    config.exercises?.forEach((exercise, index) => (savedConfig.exercises[index] = exercise));
    const tempExerciseTable = [...savedConfig.exercises];
    Object.assign(savedConfig, config);
    savedConfig.exercises = tempExerciseTable;
    setKey('interval-timer_default-config', savedConfig);
  } catch (err) {
    setKey('interval-timer_default-config', config);
  }
};
