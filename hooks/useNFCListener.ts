import { useState, useEffect, useCallback } from "react";
import { NFCSession } from "../types";

export const useNFCListener = (apiUrl?: string) => {
  const [sessions, setSessions] = useState<NFCSession[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock polling function - replace with actual WebSocket or polling logic
  const startListening = useCallback(() => {
    setIsListening(true);
    setError(null);

    // Simulate listening to API
    const interval = setInterval(() => {
      console.log("Listening for NFC sessions...");

      // In a real implementation, you would:
      // 1. Make GET request to your API endpoint
      // 2. Or connect to WebSocket for real-time updates
      // 3. Parse the response and update sessions

      // Mock receiving new session occasionally
      if (Math.random() > 0.8) {
        const newSession: NFCSession = {
          id: Date.now().toString(),
          tag_type: "NTAG215",
          serial_number: Math.random().toString(36).substring(7).toUpperCase(),
          actual_date: new Date().toISOString(),
          location: `Location ${Math.floor(Math.random() * 10) + 1}`,
          timestamp: Date.now(),
        };

        setSessions((prev) => [newSession, ...prev].slice(0, 20)); // Keep last 20 sessions
      }
    }, 5000); // Check every 5 seconds

    return () => {
      clearInterval(interval);
      setIsListening(false);
    };
  }, []);

  const stopListening = useCallback(() => {
    setIsListening(false);
  }, []);

  const addSession = useCallback((session: NFCSession) => {
    setSessions((prev) => [session, ...prev]);
  }, []);

  const clearSessions = useCallback(() => {
    setSessions([]);
  }, []);

  // Auto-start listening when hook is used
  useEffect(() => {
    const cleanup = startListening();
    return cleanup;
  }, [startListening]);

  return {
    sessions,
    isListening,
    error,
    startListening,
    stopListening,
    addSession,
    clearSessions,
  };
};
