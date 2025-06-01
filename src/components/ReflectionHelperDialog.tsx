
"use client";

import React, { useState }
from 'react';
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { generateReflectionPrompts, type ReflectionPromptsInput } from '@/ai/flows/generate-reflection-prompts-flow';
import { Loader2, Wand2, AlertTriangleIcon, MessageSquareQuote } from 'lucide-react';

interface ReflectionHelperDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function ReflectionHelperDialog({ isOpen, onOpenChange }: ReflectionHelperDialogProps) {
  const [theme, setTheme] = useState('');
  const [prompts, setPrompts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePrompts = async () => {
    setIsLoading(true);
    setError(null);
    setPrompts([]);
    try {
      const input: ReflectionPromptsInput = { theme: theme.trim() || undefined };
      const result = await generateReflectionPrompts(input);
      setPrompts(result.prompts);
    } catch (err) {
      console.error("Error generating reflection prompts:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    // Reset state when dialog is closed
    setTheme('');
    setPrompts([]);
    setError(null);
    setIsLoading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wand2 className="h-6 w-6 text-primary" />
            AI Reflection Helper
          </DialogTitle>
          <DialogDescription>
            Get some AI-generated prompts to guide your reflection. You can specify an optional theme.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-3">
          <div>
            <Label htmlFor="theme">Theme (Optional)</Label>
            <Input
              id="theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="e.g., Patience, Gratitude, Forgiveness"
              disabled={isLoading}
            />
          </div>
          <Button onClick={handleGeneratePrompts} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Prompts
              </>
            )}
          </Button>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTriangleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {prompts.length > 0 && !isLoading && (
            <div className="mt-6">
              <h3 className="text-md font-semibold mb-2 text-foreground flex items-center gap-2">
                <MessageSquareQuote className="h-5 w-5 text-primary" />
                Reflection Prompts:
              </h3>
              <ScrollArea className="h-[200px] rounded-md border p-3 bg-muted/50">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {prompts.map((prompt, index) => (
                    <li key={index} className="pl-4 border-l-2 border-primary/50">
                      {prompt}
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
