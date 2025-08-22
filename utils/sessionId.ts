/**
 * Utilities for managing session IDs in the URL hash
 */

/**
 * Generate a random session ID
 */
export const generateSessionId = (): string => {
  return crypto.randomUUID().slice(0, 8); // Use first 8 characters for shorter URLs
};

/**
 * Get the current session ID from the URL hash
 */
export const getSessionIdFromUrl = (): string | null => {
  const hash = window.location.hash;
  if (hash.startsWith('#')) {
    const sessionId = hash.slice(1);
    return sessionId || null;
  }
  return null;
};

/**
 * Set the session ID in the URL hash
 */
export const setSessionIdInUrl = (sessionId: string): void => {
  window.location.hash = sessionId;
};

/**
 * Get the current session ID, generating and setting one if it doesn't exist
 */
export const ensureSessionId = (): string => {
  let sessionId = getSessionIdFromUrl();
  
  if (!sessionId) {
    sessionId = generateSessionId();
    setSessionIdInUrl(sessionId);
  }
  
  return sessionId;
};