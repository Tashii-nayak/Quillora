import axios from 'axios';
import { normalizeGenreName } from '../constants/genres';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchPostsByGenre(genre) {
  const normalizedGenre = normalizeGenreName(genre);
  const response = await api.get(`/api/posts/genre/${encodeURIComponent(normalizedGenre)}`);
  return response.data;
}

export async function fetchPostById(id) {
  const response = await api.get(`/api/posts/${id}`);
  return response.data;
}
