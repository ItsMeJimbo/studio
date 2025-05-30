
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, SettingsIcon, Palette, Trash2, Check } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useTheme } from '@/components/ThemeProvider';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { LOCAL_STORAGE_SINS_KEY, LOCAL_STORAGE_LAST_CONFESSION_KEY, LOCAL_STORAGE_THEME_KEY } from "@/lib/constants";
import type { Metadata } from 'next'; // Keep for potential future use if this page becomes a Server Component


// Metadata can't be exported from client components.
// If needed, set in a parent layout or via <Head> for dynamic updates.
// export const metadata: Metadata = {
//   title: 'Settings - ConfessEase',
//   description: 'Configure app settings.',
// };

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const handleClearData = () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_SINS_KEY);
      localStorage.removeItem(LOCAL_STORAGE_LAST_CONFESSION_KEY);
      localStorage.removeItem(LOCAL_STORAGE_THEME_KEY);
      // Optionally, reload the page or reset app state in memory
      // window.location.reload(); 
      toast({
        title: "App Data Cleared",
        description: "All your local data (sins, last confession, theme) has been removed.",
      });
      // Reset theme to system default in the UI if it was stored
      setTheme("system"); 
    } catch (error) {
      console.error("Error clearing app data:", error);
      toast({
        title: "Error",
        description: "Could not clear app data. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen flex flex-col font-sans">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground flex items-center gap-3 text-center sm:text-left">
            <SettingsIcon className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
            Settings
          </h1>
          <Link href="/" passHref>
            <Button variant="outline" className="w-full sm:w-auto">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Reflection
            </Button>
          </Link>
        </div>
         <p className="text-sm sm:text-base text-muted-foreground mt-3 text-center sm:text-left">
          Manage your application preferences here.
        </p>
      </header>

      <main className="flex-grow space-y-8">
        <section className="p-6 border rounded-lg shadow-sm bg-card">
            <div className="flex items-center gap-3 mb-4">
                <Palette className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Appearance</h2>
            </div>
            <p className="text-muted-foreground mb-3">
                Choose your preferred theme.
            </p>
            <RadioGroup
              value={theme}
              onValueChange={(value: string) => setTheme(value as "light" | "dark" | "system")}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="theme-light" />
                <Label htmlFor="theme-light" className="font-normal">Light</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="theme-dark" />
                <Label htmlFor="theme-dark" className="font-normal">Dark</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="theme-system" />
                <Label htmlFor="theme-system" className="font-normal">System</Label>
              </div>
            </RadioGroup>
        </section>

        <section className="p-6 border rounded-lg shadow-sm bg-card">
            <div className="flex items-center gap-3 mb-4">
                <Trash2 className="h-6 w-6 text-destructive" />
                <h2 className="text-xl font-semibold text-foreground">Data Management</h2>
            </div>
            <p className="text-muted-foreground mb-3">
                Permanently remove all your app data stored in this browser. This includes your sin list, last confession date, and theme preferences. This action cannot be undone.
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear All App Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will permanently delete all your reflection data, including your list of sins, recorded last confession date, and theme settings. This data cannot be recovered.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearData} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                    <Check className="mr-2 h-4 w-4" />
                    Yes, delete all data
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </section>
      </main>

      <footer className="text-center py-6 mt-8 text-xs sm:text-sm text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} ConfessEase. All data stored locally.</p>
      </footer>
    </div>
  );
}
