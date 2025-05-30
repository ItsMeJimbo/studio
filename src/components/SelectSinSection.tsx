"use client";

import React from 'react';
import type { Sin } from '@/types';
import { PREDEFINED_SINS_DATA, PREDEFINED_SINS_CATEGORIES, SinCategoryType } from '@/lib/constants';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import CustomSinDialog from './CustomSinDialog';
import { Feather, ShieldAlert, PlusCircle } from 'lucide-react';

interface SelectSinSectionProps {
  onAddSin: (sin: Omit<Sin, 'id' | 'addedAt'>) => void;
}

export default function SelectSinSection({ onAddSin }: SelectSinSectionProps) {
  const [isCustomSinDialogOpen, setIsCustomSinDialogOpen] = React.useState(false);

  const handleAddPredefinedSin = (title: string, type: SinCategoryType) => {
    onAddSin({ title, type, description: '', tags: [] });
  };

  const handleAddCustomSin = (customSin: { title: string; description?: string; tags?: string[] }) => {
    onAddSin({ ...customSin, type: 'Custom' });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Select Sin</CardTitle>
        <CardDescription>Choose from predefined sins or add your own.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={PREDEFINED_SINS_CATEGORIES.VENIAL} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value={PREDEFINED_SINS_CATEGORIES.VENIAL} className="gap-2">
              <Feather className="h-4 w-4" />
              {PREDEFINED_SINS_CATEGORIES.VENIAL}
            </TabsTrigger>
            <TabsTrigger value={PREDEFINED_SINS_CATEGORIES.MORTAL} className="gap-2">
              <ShieldAlert className="h-4 w-4" />
              {PREDEFINED_SINS_CATEGORIES.MORTAL}
            </TabsTrigger>
          </TabsList>
          
          {(Object.keys(PREDEFINED_SINS_DATA) as SinCategoryType[]).map((category) => (
            <TabsContent key={category} value={category}>
              <ScrollArea className="h-[300px] rounded-md border p-4">
                <div className="space-y-2">
                  {PREDEFINED_SINS_DATA[category].map((sin) => (
                    <Button
                      key={sin.id}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-2"
                      onClick={() => handleAddPredefinedSin(sin.title, category)}
                    >
                      {sin.title}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>

        <Button 
          className="w-full mt-6 gap-2" 
          onClick={() => setIsCustomSinDialogOpen(true)}
        >
          <PlusCircle className="h-5 w-5" />
          Add Custom Sin
        </Button>

        <CustomSinDialog
          isOpen={isCustomSinDialogOpen}
          onOpenChange={setIsCustomSinDialogOpen}
          onAddCustomSin={handleAddCustomSin}
        />
      </CardContent>
    </Card>
  );
}
