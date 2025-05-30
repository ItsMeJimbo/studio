
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
import { Sparkles, ListX, ListRestart } from 'lucide-react';

interface MySinsSectionProps {
  sins: Sin[];
  onSessionFinish: (action: 'confessAndClear' | 'clearOnly') => void;
  onRemoveSin: (sinId: string) => void;
}

export default function MySinsSection({ sins, onSessionFinish, onRemoveSin }: MySinsSectionProps) {
  return (
    <Card className="shadow-lg flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">My Sins</CardTitle>
        <CardDescription>This is your current list for reflection.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        {sins.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center text-muted-foreground p-8 border border-dashed rounded-md">
            <ListX className="h-16 w-16 mb-6 text-muted-foreground" />
            <p className="text-xl font-semibold text-foreground">Your list is empty.</p>
            <p className="text-sm mt-1">Select sins from the left or add custom ones to begin your reflection.</p>
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
                Finish Reflection Session
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Finish Reflection Session?</AlertDialogTitle>
                <AlertDialogDescription asChild>
                  <div className="text-sm text-muted-foreground space-y-3">
                    <p>This will clear your current list of sins. You have a few options:</p>
                    <ul className="list-disc list-outside pl-5 text-sm space-y-2">
                      <li>
                        <strong>Finish & Record Confession:</strong> Clears the list and updates your "Last Confession" date to today. Use this if you have completed sacramental confession.
                      </li>
                      <li>
                        <strong>Clear List Only:</strong> Clears the list without updating the "Last Confession" date. Use this to start a new reflection session without marking a formal confession.
                      </li>
                    </ul>
                    <p className="font-semibold mt-2">Important Reminder:</p>
                    <ul className="list-disc list-outside pl-5 text-sm space-y-1">
                      <li>This app is a tool to aid your memory and reflection. It is not a substitute for sacramental confession with a priest.</li>
                      <li>If you are unable to go to confession, consider making an Act of Perfect Contrition.</li>
                    </ul>
                    <p className="mt-3">Are you sure you want to proceed?</p>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
                <Button
                  variant="outline"
                  onClick={() => onSessionFinish('clearOnly')}
                  className="w-full"
                >
                  <ListRestart className="mr-2 h-4 w-4" />
                  Clear List Only
                </Button>
                <AlertDialogAction 
                  onClick={() => onSessionFinish('confessAndClear')} 
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Finish & Record
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      )}
    </Card>
  );
}
