
"use client";

import type { Sin } from "@/types";
import { LOCAL_STORAGE_SINS_KEY, LOCAL_STORAGE_LAST_CONFESSION_KEY, TEMP_EXAMINATION_SINS_KEY } from "@/lib/constants";
import useLocalStorageState from "@/hooks/useLocalStorageState";
import SelectSinSection from "./SelectSinSection";
import MySinsSection from "./MySinsSection";
import { Church, Instagram, Twitter, Facebook, Youtube, BookOpenCheck, Heart, BookText, CalendarClock, SettingsIcon, BookMarked, LogOut, ShieldAlert, Info, BellRing, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { useAuth } from "@/context/AuthContext";
import PasswordSetupDialog from "./PasswordSetupDialog";
import LoginDialog from "./LoginDialog";
import ForgotPasswordDialog from "./ForgotPasswordDialog";
import ReflectionHelperDialog from "./ReflectionHelperDialog"; // Import the new dialog
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Firebase imports
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { firebaseConfig } from '@/lib/firebaseConfig';


const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 16 16">
    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"/>
  </svg>
);

interface ToastInfo {
  title: string;
  description: string;
  duration?: number;
}

export default function ConfessEaseApp() {
  const { isAuthenticated, isPasswordSet, isLoading, logout } = useAuth();
  const [sins, setSins] = useLocalStorageState<Sin[]>(LOCAL_STORAGE_SINS_KEY, []);
  const [lastConfessionDate, setLastConfessionDate] = useLocalStorageState<string | null>(LOCAL_STORAGE_LAST_CONFESSION_KEY, null);
  const { toast } = useToast();
  const [toastInfo, setToastInfo] = useState<ToastInfo | null>(null);

  const [showForgotPasswordDialog, setShowForgotPasswordDialog] = useState(false);
  const [showSecurityDisclaimer, setShowSecurityDisclaimer] = useState(false);
  const [isReflectionHelperOpen, setIsReflectionHelperOpen] = useState(false); // State for the new dialog


  // Initialize Firebase App
  let app: FirebaseApp | undefined; // Ensure app can be undefined initially
  if (typeof window !== 'undefined') {
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApp();
    }
  }

  // FCM Setup Effect
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.Notification && isAuthenticated && app) {
      const initFCM = async () => {
        try {
          const messaging = getMessaging(app);

          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            console.log('Notification permission granted.');
            
            const vapidKey = 'BMc79LF6g-vFCnlKurXwowdO_5JSoVj9RH_54Mvw49f7F-sN9XX4ZGShu9CZxLoweL4jC_JQ_hzxmiBpGn9ceCg'; // VAPID key is set
            if (vapidKey === 'YOUR_VAPID_KEY_HERE_PLACEHOLDER_DO_NOT_USE') { // Check for placeholder
                console.error("FCM VAPID Key is a placeholder. Please set your actual VAPID Key in ConfessEaseApp.tsx to enable push notifications.");
                toast({
                    title: "Push Notification Error",
                    description: "VAPID Key for push notifications is not configured correctly. Please contact support or check setup.",
                    variant: "destructive",
                    duration: 10000,
                });
                return; 
            }

            const currentToken = await getToken(messaging, { vapidKey }).catch(err => {
              console.error('An error occurred while retrieving FCM token. ', err);
              toast({
                  title: "FCM Token Error",
                  description: "Could not get push notification token. Check console & VAPID key setup. Error: " + (err.message || err.code || 'Unknown error'),
                  variant: "destructive",
                  duration: 10000,
              });
              return null;
            });

            if (currentToken) {
              console.log('FCM Token:', currentToken);
              // TODO: Send this token to your server to send push notifications to this device
            } else {
              console.log('No registration token available. Request permission to generate one, or check VAPID key configuration and browser console for errors.');
            }
          } else {
            console.log('Unable to get permission to notify.');
             toast({
                title: "Notifications Disabled",
                description: "You have not granted permission for notifications.",
                variant: "default",
                duration: 5000,
            });
          }

          // --- Handle Foreground Messages ---
          onMessage(messaging, (payload) => {
            console.log('Message received in foreground. ', payload);
            const notificationTitle = payload.notification?.title || "New Message";
            const notificationBody = payload.notification?.body || "You have a new message.";

            toast({
                title: notificationTitle,
                description: notificationBody,
                duration: 7000,
            });
          });

        } catch (error: any) {
          console.error('Error setting up Firebase Messaging:', error);
           toast({
              title: "Messaging Error",
              description: "Could not initialize push notifications. Error: " + (error.message || 'Unknown error'),
              variant: "destructive",
              duration: 7000,
          });
        }
      };

      const timer = setTimeout(() => {
        if (isPasswordSet && isAuthenticated) {
            initFCM();
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isPasswordSet, app]); // 'app' is added to dependency array


  useEffect(() => {
    const disclaimerShown = localStorage.getItem('securityDisclaimerShown');
    if (isPasswordSet && !disclaimerShown) {
      setShowSecurityDisclaimer(true);
    }
  }, [isPasswordSet]);

  const handleDisclaimerClose = () => {
    localStorage.setItem('securityDisclaimerShown', 'true');
    setShowSecurityDisclaimer(false);
  };


  useEffect(() => {
    if (toastInfo) {
      toast({
        title: toastInfo.title,
        description: toastInfo.description,
        duration: toastInfo.duration,
      });
      setToastInfo(null);
    }
  }, [toastInfo, toast]);

  const addSin = useCallback((sinDetails: Omit<Sin, 'id' | 'addedAt' | 'count'>) => {
    let newToastTitle = "Sin Added";
    let newToastDescription = `"${sinDetails.title.substring(0,50)}..." has been added to your list.`;

    setSins((prevSins) => {
      const existingSinIndex = prevSins.findIndex(
        (s) => s.title === sinDetails.title && s.type === sinDetails.type && s.type !== 'Custom'
      );

      let newSinsList;

      if (existingSinIndex !== -1 && sinDetails.type !== 'Custom') {
        newSinsList = prevSins.map((s, index) => {
          if (index === existingSinIndex) {
            const newCount = (s.count || 1) + 1;
            newToastTitle = "Sin Count Increased";
            newToastDescription = `Count for "${s.title.substring(0,50)}..." is now ${newCount}.`;
            return { ...s, count: newCount, addedAt: new Date().toISOString() };
          }
          return s;
        });
      } else {
        const newSinEntry: Sin = {
          ...sinDetails,
          id: crypto.randomUUID(),
          addedAt: new Date().toISOString(),
          count: 1,
        };
        newSinsList = [newSinEntry, ...prevSins];
      }

      setToastInfo({ title: newToastTitle, description: newToastDescription, duration: 5000 });
      return newSinsList.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
    });
  }, [setSins, setToastInfo]);

 useEffect(() => {
    const processPendingExaminationSins = () => {
      const pendingSinsRaw = localStorage.getItem(TEMP_EXAMINATION_SINS_KEY);
      if (!pendingSinsRaw) return;

      let pendingSinsTitles: string[] = [];
      try {
        const parsedPending = JSON.parse(pendingSinsRaw);
        if (Array.isArray(parsedPending) && parsedPending.length > 0) {
          pendingSinsTitles = parsedPending;
        } else {
          localStorage.removeItem(TEMP_EXAMINATION_SINS_KEY);
          return;
        }
      } catch (e) {
        console.error("Error parsing pending examination sins from localStorage:", e);
        localStorage.removeItem(TEMP_EXAMINATION_SINS_KEY);
        return;
      }

      const currentSinsRaw = localStorage.getItem(LOCAL_STORAGE_SINS_KEY);
      let currentSins: Sin[] = [];
      if (currentSinsRaw) {
        try {
          const parsedCurrentSins = JSON.parse(currentSinsRaw);
          if (Array.isArray(parsedCurrentSins)) {
              currentSins = parsedCurrentSins;
          }
        } catch (e) {
          console.error("Error parsing current sins from localStorage:", e);
          // Do not setSins([]) here, as it might overwrite sins loaded by useLocalStorageState
        }
      }

      let updatedSinsList = [...currentSins]; // Start with a copy of current sins
      let itemsAddedCount = 0;

      pendingSinsTitles.forEach(title => {
        const sinDetails = {
          title,
          type: 'Custom' as Sin['type'], // Explicitly type 'Custom'
          description: 'From Examination Guide',
          tags: ['examination']
        };

        // Check if a sin with the exact same title and description (from examination) already exists
        const isAlreadyAdded = updatedSinsList.some(
          s => s.title === sinDetails.title && s.description === sinDetails.description && s.type === 'Custom'
        );

        if (!isAlreadyAdded) {
          const newSinEntry: Sin = {
            ...sinDetails,
            id: crypto.randomUUID(),
            addedAt: new Date().toISOString(),
            count: 1,
          };
          updatedSinsList.unshift(newSinEntry); // Add to the beginning
          itemsAddedCount++;
        }
      });

      if (itemsAddedCount > 0) {
        updatedSinsList.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
        // Only call setSins if there were actual changes to avoid unnecessary re-renders
        // And to ensure we are setting the merged list correctly.
        setSins(updatedSinsList);
        setToastInfo({
          title: "Examination Items Added",
          description: `${itemsAddedCount} item(s) from the Examination Guide have been added to your list.`,
          duration: 4000,
        });
      }

      localStorage.removeItem(TEMP_EXAMINATION_SINS_KEY);
    };

    if(isAuthenticated){ // Only process if authenticated
        processPendingExaminationSins();

        // Also process on window focus to catch items added while tab was inactive
        const handleFocus = () => processPendingExaminationSins();
        window.addEventListener('focus', handleFocus);
        return () => {
          window.removeEventListener('focus', handleFocus);
        };
    }
  }, [isAuthenticated, setSins]); // Make sure setSins is a dependency

  const removeSin = (sinId: string) => {
    let removedSinTitle = "The item";
    setSins((prevSins) => {
      const sinToRemove = prevSins.find(sin => sin.id === sinId);
      if (sinToRemove) {
        removedSinTitle = `"${sinToRemove.title.substring(0,50)}..."`;
      }
      return prevSins.filter((sin) => sin.id !== sinId)
    });
    setToastInfo({
      title: "Sin Removed",
      description: `${removedSinTitle} has been removed from your list.`,
      duration: 5000,
    });
  };

  const handleSessionFinish = (action: 'confessAndClear' | 'clearOnly') => {
    if (action === 'confessAndClear') {
      setLastConfessionDate(new Date().toISOString());
      setSins([]);
      setToastInfo({
        title: "Confession Finished & Recorded",
        description: "Your list has been cleared and the date updated. May you find peace.",
        duration: 5000,
      });
    } else {
      setSins([]);
      setToastInfo({
        title: "List Cleared",
        description: "Your list has been cleared for a new reflection.",
        duration: 5000,
      });
    }
  };

  const formattedLastConfessionDate = lastConfessionDate
    ? format(parseISO(lastConfessionDate), 'MMM d, yyyy')
    : "Not recorded";


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <Church className="h-16 w-16 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Loading ConfessEase...</p>
        </div>
      </div>
    );
  }

  if (!isPasswordSet) {
    return <PasswordSetupDialog isOpen={true} />;
  }

  if (!isAuthenticated) {
    return <>
        <LoginDialog isOpen={true} onForgotPassword={() => setShowForgotPasswordDialog(true)} />
        {showForgotPasswordDialog &&
            <ForgotPasswordDialog
                isOpen={showForgotPasswordDialog}
                onOpenChange={setShowForgotPasswordDialog}
                onPasswordResetSuccess={() => {
                    setShowForgotPasswordDialog(false);
                }}
            />
        }
    </>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen flex flex-col font-sans">
      {showSecurityDisclaimer && (
        <AlertDialog open={showSecurityDisclaimer} onOpenChange={setShowSecurityDisclaimer}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <ShieldAlert className="h-6 w-6 text-destructive" />
                Important Security Notice
              </AlertDialogTitle>
              <AlertDialogDescription className="space-y-3 text-left">
                <p>
                  Welcome to ConfessEase! For your privacy, this app uses a local password stored directly on your device.
                </p>
                <p>
                  <strong>Please be aware:</strong> This method provides a basic layer of privacy against casual access if someone else uses your device. However, it is <strong>not a cryptographically secure system</strong> like a typical online account. A technically skilled person with access to your device's data could potentially bypass this protection.
                </p>
                <p>
                  Your password and security question answer are stored as plain text in local storage for this prototype. In a production application, this data would be securely hashed.
                </p>
                <p>
                  Do not use a highly sensitive password that you use for other critical accounts.
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={handleDisclaimerClose}>I Understand</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <header className="mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Church className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              ConfessEase
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
            <Button variant="outline" className="w-auto" onClick={() => setIsReflectionHelperOpen(true)}>
                <Wand2 className="mr-2 h-5 w-5" /> AI Helper
            </Button>
            <Link href="/examination" passHref>
              <Button variant="outline" className="w-auto">
                <BookOpenCheck className="mr-2 h-5 w-5" /> Examination
              </Button>
            </Link>
            <Link href="/prayers" passHref>
              <Button variant="outline" className="w-auto">
                <BookText className="mr-2 h-5 w-5" /> Prayers
              </Button>
            </Link>
            <Link href="/resources" passHref>
              <Button variant="outline" className="w-auto">
                <BookMarked className="mr-2 h-5 w-5" /> Resources
              </Button>
            </Link>
             <Link href="/settings" passHref>
              <Button variant="outline" className="w-auto">
                <SettingsIcon className="mr-2 h-5 w-5" /> Settings
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground hover:text-destructive w-auto">
                <LogOut className="mr-2 h-5 w-5" /> Logout
            </Button>
          </div>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground mt-4 text-center sm:text-left max-w-xl mx-auto sm:mx-0">
          A peaceful space for personal reflection and spiritual preparation. All data is stored locally on your device.
        </p>
        <div className="mt-4 text-sm text-center sm:text-left text-muted-foreground flex items-center gap-2 justify-center sm:justify-start">
            <CalendarClock className="h-4 w-4 text-primary" />
            <span>Last Confession: <strong>{formattedLastConfessionDate}</strong></span>
        </div>
      </header>

      <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <SelectSinSection onAddSin={addSin} />
        <MySinsSection sins={sins} onSessionFinish={handleSessionFinish} onRemoveSin={removeSin} />
      </main>

      <footer className="text-center py-8 mt-12 text-xs sm:text-sm text-muted-foreground border-t">
        <div className="mb-8">
          <h3 className="text-base font-semibold text-foreground mb-3">Support Our Mission</h3>
          <a
            href="https://www.patreon.com/c/MoroccanChristians"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Patreon"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 transition-colors shadow-md"
          >
            <Heart className="mr-2 h-5 w-5" />
            Support on Patreon
          </a>
          <p className="text-xs mt-3 max-w-md mx-auto">
            Your generosity helps us continue developing and maintaining ConfessEase.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Follow Us</h3>
          <div className="flex justify-center items-center space-x-4 sm:space-x-5">
            <a href="https://instagram.com/moroccanchristians" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
            <a href="https://x.com/moroccanmasihis" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100088868626501" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
            <a href="https://tiktok.com/@moroccanchristians" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-muted-foreground hover:text-primary transition-colors">
              <TikTokIcon />
            </a>
            <a href="https://www.youtube.com/@moroccanchristians" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-muted-foreground hover:text-primary transition-colors">
              <Youtube className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
          </div>
        </div>
        <p className="mt-8">&copy; 2025 ConfessEase. 100% Private and Offline.</p>
      </footer>
       <ForgotPasswordDialog
            isOpen={showForgotPasswordDialog}
            onOpenChange={setShowForgotPasswordDialog}
            onPasswordResetSuccess={() => {
                setShowForgotPasswordDialog(false);
            }}
        />
        <ReflectionHelperDialog
            isOpen={isReflectionHelperOpen}
            onOpenChange={setIsReflectionHelperOpen}
        />
    </div>
  );
}

    