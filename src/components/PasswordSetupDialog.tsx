
"use client";

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, ShieldQuestion } from 'lucide-react';

const passwordSetupSchema = z.object({
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string().min(6, { message: "Please confirm your password." }),
  securityQuestion: z.string().min(10, { message: "Security question must be at least 10 characters." }),
  securityAnswer: z.string().min(3, { message: "Security answer must be at least 3 characters." }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type PasswordSetupFormData = z.infer<typeof passwordSetupSchema>;

interface PasswordSetupDialogProps {
  isOpen: boolean;
  // onOpenChange is not used as this dialog should not be closable until setup is done.
}

export default function PasswordSetupDialog({ isOpen }: PasswordSetupDialogProps) {
  const { setupPassword } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<PasswordSetupFormData>({
    resolver: zodResolver(passwordSetupSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
      securityQuestion: '',
      securityAnswer: '',
    },
  });

  const onSubmit = (data: PasswordSetupFormData) => {
    setupPassword(data.password, data.securityQuestion, data.securityAnswer);
    // Dialog will close automatically when isAuthenticated and isPasswordSet become true in AuthContext
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => { /* Prevent closing by clicking outside or Esc */ }}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldQuestion className="h-6 w-6 text-primary" />
            Set Up Your App Password
          </DialogTitle>
          <DialogDescription>
            Create a password to protect your reflections. This password is stored locally on your device.
            Also, set up a security question in case you forget your password.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div>
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Controller
                name="password"
                control={control}
                render={({ field }) => <Input id="password" type={showPassword ? "text" : "password"} {...field} placeholder="Enter your password" />}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {errors.password && <p className="text-sm text-destructive mt-1">{errors.password.message}</p>}
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
             <div className="relative">
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} {...field} placeholder="Confirm your password" />}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {errors.confirmPassword && <p className="text-sm text-destructive mt-1">{errors.confirmPassword.message}</p>}
          </div>
          <div>
            <Label htmlFor="securityQuestion">Security Question</Label>
            <Controller
              name="securityQuestion"
              control={control}
              render={({ field }) => <Input id="securityQuestion" {...field} placeholder="e.g., What was your childhood nickname?" />}
            />
            {errors.securityQuestion && <p className="text-sm text-destructive mt-1">{errors.securityQuestion.message}</p>}
          </div>
          <div>
            <Label htmlFor="securityAnswer">Answer to Security Question</Label>
            <Controller
              name="securityAnswer"
              control={control}
              render={({ field }) => <Input id="securityAnswer" {...field} placeholder="Your secret answer" />}
            />
            {errors.securityAnswer && <p className="text-sm text-destructive mt-1">{errors.securityAnswer.message}</p>}
          </div>
          <DialogFooter className="pt-2">
            <Button type="submit" className="w-full">Set Password and Continue</Button>
          </DialogFooter>
        </form>
        <p className="text-xs text-muted-foreground pt-2 text-center">
          Important: Your password and security answer are stored locally on this device. If you clear your app data or use a different device, you'll need to set them up again. For this prototype, data is not hashed.
        </p>
      </DialogContent>
    </Dialog>
  );
}
