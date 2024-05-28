/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react';
import { useNavigate } from 'react-router';

export const useAuth = () => {
  const navigate = useNavigate();

  const userData = sessionStorage.getItem('cookieman');
  let cookieman = null;

  if (userData && userData !== 'undefined') {
    try {
      cookieman = JSON.parse(userData);
    } catch (e) {
      console.error('Error parsing JSON', e);
    }
  }

  const saveUserToLocalStorage = async (_cookieman) => {
    sessionStorage.setItem('cookieman', JSON.stringify(_cookieman));
  };

  const logout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return useMemo(
    () => ({
      cookieman,
      saveUserToLocalStorage,
      logout
    }),
    [cookieman, saveUserToLocalStorage, logout]
  );
};
