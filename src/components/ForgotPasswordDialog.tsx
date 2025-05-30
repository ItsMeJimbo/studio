
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
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/context/AuthContext';
import { KeyRound, Eye, EyeOff, ShieldCheck } from 'lucide-react';

const forgotPasswordSchema = z.object({
  securityAnswer: z.string().min(1, { message: "Security answer is required." }),
  newPassword: z.string().min(6, { message: "New password must be at least 6 characters." }),
  confirmNewPassword: z.string().min(6, { message: "Please confirm your new password." }),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: "New passwords don't match",
  path: ["confirmNewPassword"],
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onPasswordResetSuccess: () => void;
}

export default function ForgotPasswordDialog({ isOpen, onOpenChange, onPasswordResetSuccess }: ForgotPasswordDialogProps) {
  const { resetPasswordWithSecurityAnswer, getSecurityQuestion } = useAuth();
  const [resetError, setResetError] = useState<string | null>(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const securityQuestion = getSecurityQuestion();

  const { control, handleSubmit, reset, formState: { errors } } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      securityAnswer: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    setResetError(null);
    if (resetPasswordWithSecurityAnswer(data.securityAnswer, data.newPassword)) {
      reset();
      onPasswordResetSuccess(); // This should usually close the dialog via onOpenChange(false)
    } else {
      setResetError("Incorrect security answer. Please try again.");
    }
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  if (!securityQuestion) {
    // This case should ideally not happen if password is set
    return (
       <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
            <DialogDescription>Security question not found. Unable to reset password.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleClose}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <KeyRound className="h-6 w-6 text-primary" />
            Reset Password
          </DialogTitle>
          <DialogDescription>
            Answer your security question to reset your password.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div>
            <Label htmlFor="securityQuestionDisplay">Security Question</Label>
            <p id="securityQuestionDisplay" className="text-sm p-2 bg-muted rounded-md">{securityQuestion}</p>
          </div>
          <div>
            <Label htmlFor="securityAnswer">Your Answer</Label>
            <Controller
              name="securityAnswer"
              control={control}
              render={({ field }) => <Input id="securityAnswer" {...field} placeholder="Enter your secret answer" />}
            />
            {errors.securityAnswer && <p className="text-sm text-destructive mt-1">{errors.securityAnswer.message}</p>}
          </div>
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Controller
                name="newPassword"
                control={control}
                render={({ field }) => <Input id="newPassword" type={showNewPassword ? "text" : "password"} {...field} placeholder="Enter new password" />}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {errors.newPassword && <p className="text-sm text-destructive mt-1">{errors.newPassword.message}</p>}
          </div>
          <div>
            <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
            <div className="relative">
              <Controller
                name="confirmNewPassword"
                control={control}
                render={({ field }) => <Input id="confirmNewPassword" type={showConfirmNewPassword ? "text" : "password"} {...field} placeholder="Confirm new password" />}
              />
               <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
              >
                {showConfirmNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {errors.confirmNewPassword && <p className="text-sm text-destructive mt-1">{errors.confirmNewPassword.message}</p>}
          </div>
          {resetError && <p className="text-sm text-destructive mt-1">{resetError}</p>}
          <DialogFooter className="pt-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Reset Password
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
