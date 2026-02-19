import { useEffect, useState } from 'react';

/**
 * Custom hook for managing authentication state
 * Syncs with localStorage JWT token
 */
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize from localStorage
    return !!localStorage.getItem('jwtToken');
  });

  // Listen for storage changes (e.g., from other tabs/windows)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('jwtToken'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return { isAuthenticated, setIsAuthenticated };
}
