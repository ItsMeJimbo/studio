
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
import { LogIn, Eye, EyeOff, HelpCircle } from 'lucide-react';

const loginSchema = z.object({
  password: z.string().min(1, { message: "Password is required." }),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginDialogProps {
  isOpen: boolean;
  onForgotPassword: () => void;
  // onOpenChange is not used as this dialog should not be closable until login is successful
}

export default function LoginDialog({ isOpen, onForgotPassword }: LoginDialogProps) {
  const { login } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    setLoginError(null);
    if (!login(data.password)) {
      setLoginError("Incorrect password. Please try again.");
    }
    // Dialog will close automatically when isAuthenticated becomes true
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => { /* Prevent closing */ }}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LogIn className="h-6 w-6 text-primary" />
            Enter Password
          </DialogTitle>
          <DialogDescription>
            Enter your password to access ConfessEase.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Controller
                name="password"
                control={control}
                render={({ field }) => <Input id="password" type={showPassword ? "text" : "password"} {...field} placeholder="Your password" />}
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
            {loginError && <p className="text-sm text-destructive mt-1">{loginError}</p>}
          </div>
          <DialogFooter className="pt-2 flex flex-col sm:flex-row sm:justify-between items-center gap-2">
             <Button type="button" variant="link" onClick={onForgotPassword} className="p-0 h-auto text-sm">
                <HelpCircle className="mr-1 h-4 w-4" /> Forgot Password?
            </Button>
            <Button type="submit" className="w-full sm:w-auto">Login</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
