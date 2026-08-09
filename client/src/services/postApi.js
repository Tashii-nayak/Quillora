import axios from 'axios';
import { normalizeGenreName } from '../constants/genres';
import { getDefaultStoriesByGenre, getDefaultStoryById } from '../constants/defaultStories';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchPostsByGenre(genre) {
  const normalizedGenre = normalizeGenreName(genre);
  const defaults = getDefaultStoriesByGenre(normalizedGenre);

  try {
    const response = await api.get(`/api/posts/genre/${encodeURIComponent(normalizedGenre)}`);
    const apiPosts = Array.isArray(response.data) ? response.data : [];
    
    // Combine API posts with defaults, avoiding duplicates by ID or title
    const combined = [...apiPosts];
    const existingTitles = new Set(apiPosts.map(p => p.title.toLowerCase()));

    defaults.forEach(def => {
      if (!existingTitles.has(def.title.toLowerCase())) {
        combined.push(def);
      }
    });

    return combined.length > 0 ? combined : defaults;
  } catch (error) {
    console.warn(`API unavailable for genre ${genre}, returning default stories.`, error.message);
    return defaults;
  }
}

export async function fetchPostById(id) {
  const defaultPost = getDefaultStoryById(id);

  try {
    const response = await api.get(`/api/posts/${id}`);
    return response.data;
  } catch (error) {
    if (defaultPost) {
      return defaultPost;
    }
    throw error;
  }
}
