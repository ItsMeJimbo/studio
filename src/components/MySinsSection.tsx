
"use client";

import React from 'react';
import type { Sin } from '@/types';
import SinItemCard from './SinItemCard';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { Sparkles, ListX } from 'lucide-react';

interface MySinsSectionProps {
  sins: Sin[];
  onClearSins: () => void;
  onRemoveSin: (sinId: string) => void;
}

export default function MySinsSection({ sins, onClearSins, onRemoveSin }: MySinsSectionProps) {
  return (
    <Card className="shadow-lg flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">My Sins</CardTitle>
        <CardDescription>This is your current list for reflection.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {sins.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center text-muted-foreground p-8 border border-dashed rounded-md">
            <ListX className="h-12 w-12 mb-4" />
            <p className="text-lg font-medium">Your list is empty.</p>
            <p>Select sins from the left or add custom ones to begin your reflection.</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-3">
            <div className="space-y-4">
              {sins.map((sin) => (
                <SinItemCard key={sin.id} sin={sin} onRemoveSin={onRemoveSin} />
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
      {sins.length > 0 && (
        <CardFooter className="mt-auto border-t pt-6">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="default" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
                <Sparkles className="h-5 w-5" />
                Finish Confession
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Finish Confession?</AlertDialogTitle>
                <AlertDialogDescription className="space-y-3">
                  <p>This will clear your entire list of sins. This action cannot be undone.</p>
                  <p className="font-semibold">Important:</p>
                  <ul className="list-disc list-outside pl-5 text-sm space-y-1">
                    <li>This app is a tool to aid your memory and reflection. It is not a substitute for sacramental confession with a priest.</li>
                    <li>If you are unable to go to confession, consider making an Act of Perfect Contrition.</li>
                  </ul>
                   Are you sure you want to proceed?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onClearSins} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Yes, Finish Confession
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      )}
    </Card>
  );
}
