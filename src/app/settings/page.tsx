
"use client";

// import Link from 'next/link'; // No longer needed for back button
import { Button } from '@/components/ui/button';
// import { ChevronLeft } from 'lucide-react'; // No longer needed for back button
import { SettingsIcon, Palette, Trash2, Check, KeyRound, ShieldQuestion, Lock, LogOut } from 'lucide-react';
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
import { useAuth } from '@/context/AuthContext';
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';


const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, { message: "Old password is required." }),
  newPassword: z.string().min(6, { message: "New password must be at least 6 characters." }),
  confirmNewPassword: z.string().min(6, { message: "Please confirm your new password." }),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: "New passwords don't match",
  path: ["confirmNewPassword"],
});
type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;


export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const { changePassword, resetApp, isPasswordSet, logout } = useAuth(); // Added logout

  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);
  const [isResetAppDialogOpen, setIsResetAppDialogOpen] = useState(false);
  const [isClientMounted, setIsClientMounted] = useState(false);

  useEffect(() => {
    setIsClientMounted(true);
  }, []);

  const { control: changePasswordControl, handleSubmit: handleChangePasswordSubmit, reset: resetChangePasswordForm, formState: { errors: changePasswordErrors } } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { oldPassword: '', newPassword: '', confirmNewPassword: '' },
  });

  const handleTriggerResetAppDialog = () => {
    if (!isClientMounted) return; 
    setIsResetAppDialogOpen(true);
  };

  const onSubmitChangePassword = (data: ChangePasswordFormData) => {
    if (changePassword(data.oldPassword, data.newPassword)) {
      toast({ title: "Password Changed", description: "Your password has been successfully updated.", duration: 5000 });
      resetChangePasswordForm();
      setIsChangePasswordDialogOpen(false);
    } else {
      toast({ title: "Error", description: "Incorrect old password. Please try again.", variant: "destructive", duration: 5000 });
    }
  };

  const handleResetAppConfirm = () => {
    resetApp();
    setIsResetAppDialogOpen(false);
    setTheme("system"); 
  };

  const dataManagementDescriptionText = isClientMounted ? (isPasswordSet ? "your password settings." : "any locally stored data.") : "...";
  const resetAppButtonText = isClientMounted ? (isPasswordSet ? "Reset Entire App (Clear All Data & Password)" : "Clear All App Data") : "Loading...";


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen flex flex-col font-sans">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground flex items-center gap-3 text-center sm:text-left">
            <SettingsIcon className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
            Settings
          </h1>
          {/* Back button removed */}
        </div>
         <p className="text-sm sm:text-base text-muted-foreground mt-3 text-center sm:text-left">
          Manage your application preferences and security here.
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

        {isClientMounted && isPasswordSet && (
          <section className="p-6 border rounded-lg shadow-sm bg-card">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Security</h2>
            </div>
            <p className="text-muted-foreground mb-3">
              Manage your application password. Remember, this password is local to this browser.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={() => setIsChangePasswordDialogOpen(true)}>
                  <KeyRound className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
                 <Button variant="outline" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
                If you've forgotten your password, log out and use the "Forgot Password" option on the login screen.
            </p>
          </section>
        )}
        {!isClientMounted && ( 
            <section className="p-6 border rounded-lg shadow-sm bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">Security</h2>
                </div>
                <p className="text-muted-foreground mb-3">Loading security options...</p>
                 <Button disabled>
                    <KeyRound className="mr-2 h-4 w-4" />
                    Loading...
                </Button>
            </section>
        )}


        <section className="p-6 border rounded-lg shadow-sm bg-card">
            <div className="flex items-center gap-3 mb-4">
                <Trash2 className="h-6 w-6 text-destructive" />
                <h2 className="text-xl font-semibold text-foreground">Data Management</h2>
            </div>
             <p className="text-muted-foreground mb-3">
                Permanently remove all your app data stored in this browser. This includes your sin list, last confession date, theme preferences, and {dataManagementDescriptionText} This action cannot be undone.
            </p>
            <Button
              variant="destructive"
              onClick={handleTriggerResetAppDialog}
              className="w-full sm:w-auto h-auto py-2.5 px-4 text-center whitespace-normal leading-normal"
              disabled={!isClientMounted}
            >
                <Trash2 className="mr-2 h-4 w-4 shrink-0" />
                <span>{isClientMounted ? resetAppButtonText : "Loading..."}</span>
            </Button>
        </section>
      </main>

      {/* Change Password Dialog */}
      <AlertDialog open={isChangePasswordDialogOpen} onOpenChange={setIsChangePasswordDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Password</AlertDialogTitle>
            <AlertDialogDescription>
              Enter your old password and set a new one.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={handleChangePasswordSubmit(onSubmitChangePassword)} className="space-y-4 py-2">
            <div>
              <Label htmlFor="oldPassword">Old Password</Label>
              <Controller
                name="oldPassword"
                control={changePasswordControl}
                render={({ field }) => <Input id="oldPassword" type="password" {...field} />}
              />
              {changePasswordErrors.oldPassword && <p className="text-sm text-destructive mt-1">{changePasswordErrors.oldPassword.message}</p>}
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Controller
                name="newPassword"
                control={changePasswordControl}
                render={({ field }) => <Input id="newPassword" type="password" {...field} />}
              />
              {changePasswordErrors.newPassword && <p className="text-sm text-destructive mt-1">{changePasswordErrors.newPassword.message}</p>}
            </div>
            <div>
              <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
              <Controller
                name="confirmNewPassword"
                control={changePasswordControl}
                render={({ field }) => <Input id="confirmNewPassword" type="password" {...field} />}
              />
              {changePasswordErrors.confirmNewPassword && <p className="text-sm text-destructive mt-1">{changePasswordErrors.confirmNewPassword.message}</p>}
            </div>
            <AlertDialogFooter className="pt-2">
              <AlertDialogCancel type="button" onClick={() => { resetChangePasswordForm(); setIsChangePasswordDialogOpen(false); }}>Cancel</AlertDialogCancel>
              <AlertDialogAction type="submit">Change Password</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reset App Data Dialog */}
       <AlertDialog open={isResetAppDialogOpen} onOpenChange={setIsResetAppDialogOpen}>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                This action will permanently delete all your reflection data, including your list of sins, recorded last confession date, theme settings, and your password settings. This data cannot be recovered. You will need to set up a new password.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleResetAppConfirm} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                <Check className="mr-2 h-4 w-4" />
                Yes, reset entire app
                </AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>


      <footer className="text-center py-6 mt-8 text-xs sm:text-sm text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} ConfessEase. All data stored locally.</p>
      </footer>
    </div>
  );
}
