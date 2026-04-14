import { storageKeys } from "@/lib/constants";
import type { FavoriteState, QuizAnswers, ScoreVector } from "@/types";

const fallbackFavorites: FavoriteState = { cameras: [], lenses: [], films: [] };

export function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function readQuiz(fallback: QuizAnswers): QuizAnswers {
  return readJson<QuizAnswers>(storageKeys.quiz, fallback);
}

export function saveQuiz(value: QuizAnswers) {
  writeJson(storageKeys.quiz, value);
}

export function readTasteScore() {
  return readJson<ScoreVector>(storageKeys.tasteScore, {});
}

export function saveTasteScore(value: ScoreVector) {
  writeJson(storageKeys.tasteScore, value);
}

export function readFilmTasteScore() {
  return readJson<ScoreVector>(storageKeys.filmTasteScore, {});
}

export function saveFilmTasteScore(value: ScoreVector) {
  writeJson(storageKeys.filmTasteScore, value);
}

export function readFavorites() {
  const stored = readJson<Partial<FavoriteState>>(storageKeys.favorites, fallbackFavorites);
  return {
    cameras: stored.cameras ?? [],
    lenses: stored.lenses ?? [],
    films: stored.films ?? []
  };
}

export function saveFavorites(value: FavoriteState) {
  writeJson(storageKeys.favorites, value);
}

export function toggleFavorite(type: keyof FavoriteState, id: string) {
  const current = readFavorites();
  const list = current[type] ?? [];
  const exists = list.includes(id);
  const next = {
    ...current,
    [type]: exists ? list.filter((item) => item !== id) : [...list, id]
  };

  saveFavorites(next);
  return next;
}
