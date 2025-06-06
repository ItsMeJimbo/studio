
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  LOCAL_STORAGE_PASSWORD_HASH_KEY,
  LOCAL_STORAGE_SECURITY_QUESTION_KEY,
  LOCAL_STORAGE_SECURITY_ANSWER_KEY,
  LOCAL_STORAGE_PASSWORD_SET_KEY,
  LOCAL_STORAGE_SINS_KEY,
  LOCAL_STORAGE_LAST_CONFESSION_KEY,
  LOCAL_STORAGE_THEME_KEY,
  TEMP_EXAMINATION_SINS_KEY
} from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  isPasswordSet: boolean;
  isLoading: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  setupPassword: (password: string, question: string, answer: string) => void;
  resetPasswordWithSecurityAnswer: (answer: string, newPassword: string) => boolean;
  changePassword: (oldPassword: string, newPassword: string) => boolean;
  getSecurityQuestion: () => string | null;
  resetApp: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOAST_DURATION = 5000; // Default duration for auth toasts

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPasswordSet, setIsPasswordSet] = useState(false);
  const [passwordHash, setPasswordHash] = useState<string | null>(null);
  const [securityQuestion, setSecurityQuestion] = useState<string | null>(null);
  const [securityAnswer, setSecurityAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedPasswordSet = localStorage.getItem(LOCAL_STORAGE_PASSWORD_SET_KEY);
      const storedPasswordHash = localStorage.getItem(LOCAL_STORAGE_PASSWORD_HASH_KEY);
      const storedSecurityQuestion = localStorage.getItem(LOCAL_STORAGE_SECURITY_QUESTION_KEY);
      const storedSecurityAnswer = localStorage.getItem(LOCAL_STORAGE_SECURITY_ANSWER_KEY);

      if (storedPasswordSet === 'true') {
        setIsPasswordSet(true);
        setPasswordHash(storedPasswordHash);
        setSecurityQuestion(storedSecurityQuestion);
        setSecurityAnswer(storedSecurityAnswer);
      } else {
        setIsPasswordSet(false);
      }
    } catch (error) {
      console.error("Error loading auth data from localStorage:", error);
      toast({ title: "Error", description: "Could not load security settings. Please try again.", variant: "destructive", duration: TOAST_DURATION });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const login = useCallback((password: string): boolean => {
    if (password === passwordHash) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, [passwordHash]);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const setupPassword = useCallback((password: string, question: string, answer: string) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PASSWORD_HASH_KEY, password);
      localStorage.setItem(LOCAL_STORAGE_SECURITY_QUESTION_KEY, question);
      localStorage.setItem(LOCAL_STORAGE_SECURITY_ANSWER_KEY, answer);
      localStorage.setItem(LOCAL_STORAGE_PASSWORD_SET_KEY, 'true');
      setPasswordHash(password);
      setSecurityQuestion(question);
      setSecurityAnswer(answer);
      setIsPasswordSet(true);
      setIsAuthenticated(true);
      toast({ title: "Password Set", description: "Your password and security question have been set up.", duration: TOAST_DURATION });
    } catch (error) {
      console.error("Error setting up password:", error);
      toast({ title: "Error", description: "Could not set up password. Please ensure localStorage is accessible.", variant: "destructive", duration: TOAST_DURATION });
    }
  }, [toast]);

  const resetPasswordWithSecurityAnswer = useCallback((answer: string, newPassword: string): boolean => {
    if (answer === securityAnswer) {
      try {
        localStorage.setItem(LOCAL_STORAGE_PASSWORD_HASH_KEY, newPassword);
        setPasswordHash(newPassword);
        setIsAuthenticated(true);
        toast({ title: "Password Reset", description: "Your password has been successfully reset.", duration: TOAST_DURATION });
        return true;
      } catch (error) {
        console.error("Error resetting password:", error);
        toast({ title: "Error", description: "Could not reset password.", variant: "destructive", duration: TOAST_DURATION });
        return false;
      }
    }
    return false;
  }, [securityAnswer, toast]);

  const changePassword = useCallback((oldPassword: string, newPassword: string): boolean => {
    if (oldPassword === passwordHash) {
      try {
        localStorage.setItem(LOCAL_STORAGE_PASSWORD_HASH_KEY, newPassword);
        setPasswordHash(newPassword);
        toast({ title: "Password Changed", description: "Your password has been successfully changed.", duration: TOAST_DURATION });
        return true;
      } catch (error) {
        console.error("Error changing password:", error);
        toast({ title: "Error", description: "Could not change password.", variant: "destructive", duration: TOAST_DURATION });
        return false;
      }
    }
    return false;
  }, [passwordHash, toast]);

  const getSecurityQuestion = useCallback((): string | null => {
    return securityQuestion;
  }, [securityQuestion]);

  const resetApp = useCallback(() => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_SINS_KEY);
      localStorage.removeItem(LOCAL_STORAGE_LAST_CONFESSION_KEY);
      localStorage.removeItem(LOCAL_STORAGE_THEME_KEY);
      localStorage.removeItem(TEMP_EXAMINATION_SINS_KEY);
      localStorage.removeItem(LOCAL_STORAGE_PASSWORD_HASH_KEY);
      localStorage.removeItem(LOCAL_STORAGE_SECURITY_QUESTION_KEY);
      localStorage.removeItem(LOCAL_STORAGE_SECURITY_ANSWER_KEY);
      localStorage.removeItem(LOCAL_STORAGE_PASSWORD_SET_KEY);
      localStorage.removeItem('securityDisclaimerShown'); // Also clear this flag

      setIsAuthenticated(false);
      setIsPasswordSet(false);
      setPasswordHash(null);
      setSecurityQuestion(null);
      setSecurityAnswer(null);

      toast({
        title: "App Reset Successful",
        description: "All app data including your password has been cleared. Please set up a new password.",
        duration: TOAST_DURATION + 2000, // Slightly longer for this important message
      });
    } catch (error) {
      console.error("Error resetting app:", error);
      toast({ title: "Error", description: "Could not reset app data.", variant: "destructive", duration: TOAST_DURATION });
    }
  }, [toast]);


  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isPasswordSet,
      isLoading,
      login,
      logout,
      setupPassword,
      resetPasswordWithSecurityAnswer,
      changePassword,
      getSecurityQuestion,
      resetApp
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
