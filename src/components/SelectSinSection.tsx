
"use client";

import React from 'react';
import type { Sin } from '@/types';
import { PREDEFINED_SINS_DATA, PREDEFINED_SINS_CATEGORIES, SinCategoryType } from '@/lib/constants';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import CustomSinDialog from './CustomSinDialog';
import { Input } from '@/components/ui/input';
import { Feather, ShieldAlert, PlusCircle, Search, Frown } from 'lucide-react';

interface SelectSinSectionProps {
  onAddSin: (sin: Omit<Sin, 'id' | 'addedAt'>) => void;
}

export default function SelectSinSection({ onAddSin }: SelectSinSectionProps) {
  const [isCustomSinDialogOpen, setIsCustomSinDialogOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleAddPredefinedSin = (title: string, type: SinCategoryType) => {
    onAddSin({ title, type, description: '', tags: [] });
  };

  const handleAddCustomSin = (customSin: { title: string; description?: string; tags?: string[] }) => {
    onAddSin({ ...customSin, type: 'Custom' });
  };

  const filteredSins = (category: SinCategoryType) => {
    if (!searchTerm.trim()) {
      return PREDEFINED_SINS_DATA[category];
    }
    return PREDEFINED_SINS_DATA[category].filter(sin =>
      sin.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Select Sin</CardTitle>
        <CardDescription>Choose from predefined sins or add your own. You can search the predefined lists below.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search predefined sins..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

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
          
          {(Object.keys(PREDEFINED_SINS_DATA) as SinCategoryType[]).map((category) => {
            const sinsToList = filteredSins(category);
            return (
              <TabsContent key={category} value={category}>
                <ScrollArea className="h-[250px] rounded-md border">
                  {sinsToList.length > 0 ? (
                    <div className="space-y-2 p-4">
                      {sinsToList.map((sin) => (
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
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
                      <Frown className="h-10 w-10 mb-3" />
                      <p className="font-medium">No sins found</p>
                      <p className="text-xs">Try a different search term or check the other category.</p>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
            );
          })}
        </Tabs>

        <Button 
          className="w-full mt-6 gap-2" 
          onClick={() => setIsCustomSinDialogOpen(true)}
        >
          <PlusCircle className="h-5 w-5" />
          Add Other Sin
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
