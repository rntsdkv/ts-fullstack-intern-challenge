import axios, {AxiosResponse} from 'axios';

console.log(import.meta.env.VITE_API_BASE_URL)

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  timeout: 10000,
});

export const getUserLikes = (token: string): Promise<AxiosResponse<any>> =>
  api.get('/likes', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

export const postLike = (data: { cat_id: string, cat_url: string }, token: string) =>
  api.post('/likes', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

export const deleteLike = (cat_id: string, token: string) =>
  api.delete(`likes/${cat_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const signIn = (data: { login: string; password: string }): Promise<AxiosResponse<any>> =>
  api.post('/auth/login', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const signUp = (data: { login: string; password: string }): Promise<AxiosResponse<any>> =>
  api.post('/user', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });