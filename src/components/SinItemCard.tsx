
"use client";

import type { Sin } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format, parseISO } from 'date-fns';
import { Feather, ShieldAlert, PenSquare, CalendarDays, Clock, Tag, Trash2 } from 'lucide-react';

interface SinItemCardProps {
  sin: Sin;
  onRemoveSin?: (sinId: string) => void;
}

const TypeIcon = ({ type }: { type: Sin['type'] }) => {
  switch (type) {
    case 'Venial':
      return <Feather className="h-5 w-5 text-blue-500" />;
    case 'Mortal':
      return <ShieldAlert className="h-5 w-5 text-red-500" />;
    case 'Custom':
      return <PenSquare className="h-5 w-5 text-green-500" />;
    default:
      return null;
  }
};

export default function SinItemCard({ sin, onRemoveSin }: SinItemCardProps) {
  const formattedDate = format(parseISO(sin.addedAt), 'MMM d, yyyy');
  const formattedTime = format(parseISO(sin.addedAt), 'p');

  return (
    <Card className="overflow-hidden shadow-md transition-all hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-grow min-w-0"> {/* Ensure this div can grow and text wraps */}
            <CardTitle className="text-lg leading-tight break-words">{sin.title}</CardTitle>
          </div>
          <div className="flex items-center shrink-0">
            <Badge
              variant={sin.type === 'Mortal' ? 'destructive' : sin.type === 'Venial' ? 'secondary' : 'default'}
              className="ml-2 shrink-0" // Ensure badge doesn't cause overflow
            >
               <div className="flex items-center gap-1.5">
                  <TypeIcon type={sin.type} />
                  {sin.type}
               </div>
            </Badge>
            {onRemoveSin && (
              <Button
                variant="ghost"
                size="icon"
                className="ml-2 h-7 w-7 text-muted-foreground hover:text-destructive"
                onClick={() => onRemoveSin(sin.id)}
                aria-label="Remove sin"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="text-sm space-y-3">
        {sin.description && (
          <p className="text-muted-foreground leading-relaxed break-words">{sin.description}</p>
        )}
        {sin.tags && sin.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {sin.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="font-normal">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground bg-muted/50 p-3 justify-end">
        <div className="flex items-center gap-1">
          <CalendarDays className="h-3.5 w-3.5" />
          <span>{formattedDate}</span>
          <span className="mx-1">·</span>
          <Clock className="h-3.5 w-3.5" />
          <span>{formattedTime}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
