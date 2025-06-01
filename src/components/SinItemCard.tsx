
"use client";

import type { Sin } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
      return <Feather className="h-4 w-4 text-blue-500" />;
    case 'Mortal':
      return <ShieldAlert className="h-4 w-4 text-red-500" />;
    case 'Custom':
      return <PenSquare className="h-4 w-4 text-green-500" />;
    default:
      return null;
  }
};

export default function SinItemCard({ sin, onRemoveSin }: SinItemCardProps) {
  const formattedDate = format(parseISO(sin.addedAt), 'MMM d, yyyy');
  const formattedTime = format(parseISO(sin.addedAt), 'p');

  return (
    <Card className="overflow-hidden shadow-md transition-all hover:shadow-lg">
      <CardHeader className="px-3 pt-3 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-grow min-w-0">
            <CardTitle className="text-base leading-snug break-words">
              {sin.title}
              {sin.count && sin.count > 1 && (
                <span className="ml-1 text-xs font-normal text-muted-foreground">(x{sin.count})</span>
              )}
            </CardTitle>
          </div>
          <div className="flex items-center shrink-0">
            <Badge
              variant={sin.type === 'Mortal' ? 'destructive' : sin.type === 'Venial' ? 'secondary' : 'default'}
              className="shrink-0"
            >
               <div className="flex items-center gap-1">
                  <TypeIcon type={sin.type} />
                  <span className="text-xs">{sin.type}</span>
               </div>
            </Badge>
            {onRemoveSin && (
              <Button
                variant="ghost"
                size="icon"
                className="ml-1.5 h-7 w-7 text-muted-foreground hover:text-destructive shrink-0"
                onClick={() => onRemoveSin(sin.id)}
                aria-label="Remove sin"
              >
                <Trash2 className="h-4 w-4 shrink-0" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-3 pb-3 pt-0 text-sm space-y-3">
        {sin.description && (
          <p className="text-muted-foreground leading-relaxed break-words">{sin.description}</p>
        )}
        {sin.tags && sin.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {sin.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="font-normal text-xs px-1.5 py-0.5">{tag}</Badge>
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
