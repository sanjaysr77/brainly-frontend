import { auth } from '../config/firebase';

export async function getAuthToken(): Promise<string | null> {
  try {
    const user = auth.currentUser;
    if (user) {
      return await user.getIdToken();
    }
    return null;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
}

export function getAuthHeaders(): Promise<{ Authorization: string } | {}> {
  return getAuthToken().then(token => {
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
    return {};
  });
}
