"use client";

import type { Sin } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from 'date-fns';
import { Feather, ShieldAlert, PenSquare, CalendarDays, Clock, Tag } from 'lucide-react';

interface SinItemCardProps {
  sin: Sin;
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

export default function SinItemCard({ sin }: SinItemCardProps) {
  const formattedDate = format(parseISO(sin.addedAt), 'MMM d, yyyy');
  const formattedTime = format(parseISO(sin.addedAt), 'p');

  return (
    <Card className="overflow-hidden shadow-md transition-all hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg leading-tight">{sin.title}</CardTitle>
          <Badge 
            variant={sin.type === 'Mortal' ? 'destructive' : sin.type === 'Venial' ? 'secondary' : 'default'}
            className="ml-2 shrink-0"
          >
             <div className="flex items-center gap-1.5">
                <TypeIcon type={sin.type} />
                {sin.type}
             </div>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="text-sm space-y-3">
        {sin.description && (
          <p className="text-muted-foreground leading-relaxed">{sin.description}</p>
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
