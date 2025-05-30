"use client";

import React from 'react';
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const customSinSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }).max(100),
  description: z.string().max(500).optional(),
  tags: z.string().optional(), // Comma-separated tags
});

type CustomSinFormData = z.infer<typeof customSinSchema>;

interface CustomSinDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAddCustomSin: (customSin: { title: string; description?: string; tags?: string[] }) => void;
}

export default function CustomSinDialog({ isOpen, onOpenChange, onAddCustomSin }: CustomSinDialogProps) {
  const { toast } = useToast();
  const { control, handleSubmit, reset, formState: { errors } } = useForm<CustomSinFormData>({
    resolver: zodResolver(customSinSchema),
    defaultValues: {
      title: '',
      description: '',
      tags: '',
    },
  });

  const onSubmit = (data: CustomSinFormData) => {
    const tagsArray = data.tags?.split(',').map(tag => tag.trim()).filter(tag => tag !== '') || [];
    onAddCustomSin({ title: data.title, description: data.description, tags: tagsArray });
    toast({ title: "Custom Sin Created", description: `"${data.title}" is ready to be added.` });
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) reset(); // Reset form if dialog is closed without submitting
      onOpenChange(open);
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Custom Sin</DialogTitle>
          <DialogDescription>
            Add a personal sin entry with details and reflections.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => <Input id="title" {...field} placeholder="e.g., Acted selfishly" />}
            />
            {errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <Label htmlFor="description">Notes (What happened, when, why?)</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <Textarea id="description" {...field} placeholder="Optional: Add details about the sin..." />}
            />
            {errors.description && <p className="text-sm text-destructive mt-1">{errors.description.message}</p>}
          </div>
          <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => <Input id="tags" {...field} placeholder="e.g., work, family, anger" />}
            />
            {errors.tags && <p className="text-sm text-destructive mt-1">{errors.tags.message}</p>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => { reset(); onOpenChange(false); }}>Cancel</Button>
            <Button type="submit">Add Custom Sin</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
