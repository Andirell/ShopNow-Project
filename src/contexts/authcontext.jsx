"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { sendRequest } from "@/lib/api";

const AuthContext = createContext();

// We save the logged-in user and their tokens here so they stay logged in
// after a page refresh
const STORAGE_KEY = "shopnow-session";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setSession(JSON.parse(saved));
      }
    } catch (error) {
      localStorage.removeItem(STORAGE_KEY);
    }
    setLoading(false);
  }, []);

  function saveSession(newSession) {
    setSession(newSession);
    if (newSession) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  async function login(email, password) {
    const result = await sendRequest("/users/login/", {
      method: "POST",
      body: { email, password },
    });
    if (result.ok) {
      saveSession({
        user: result.data.user,
        access: result.data.access,
        refresh: result.data.refresh,
      });
    }
    return result;
  }

  async function register(details) {
    const result = await sendRequest("/users/register/", {
      method: "POST",
      body: details,
    });
    if (result.ok) {
      saveSession({
        user: result.data.user,
        access: result.data.access,
        refresh: result.data.refresh,
      });
    }
    return result;
  }

  function logout() {
    saveSession(null);
  }

  // Use this for anything that needs the user to be logged in.
  // The access token only lasts an hour, so if the API says 401 we get a
  // new one with the refresh token and try again once.
  async function authRequest(path, options = {}) {
    if (!session) {
      return { ok: false, status: 401, data: { detail: "Please log in first." } };
    }

    let result = await sendRequest(path, { ...options, token: session.access });
    if (result.status !== 401) {
      return result;
    }

    const refreshed = await sendRequest("/users/token/refresh/", {
      method: "POST",
      body: { refresh: session.refresh },
    });
    if (!refreshed.ok) {
      // The refresh token has expired too, so they need to log in again
      logout();
      return { ok: false, status: 401, data: { detail: "Your session has ended. Please log in again." } };
    }

    const newSession = { ...session, access: refreshed.data.access };
    if (refreshed.data.refresh) {
      newSession.refresh = refreshed.data.refresh;
    }
    saveSession(newSession);

    result = await sendRequest(path, { ...options, token: newSession.access });
    return result;
  }

  const user = session ? session.user : null;

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, authRequest }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
