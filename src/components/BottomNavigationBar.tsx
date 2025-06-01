
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpenCheck, BookText, Info, Settings as SettingsIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Reflection', icon: Home },
  { href: '/examination', label: 'Examination', icon: BookOpenCheck },
  { href: '/prayers', label: 'Prayers', icon: BookText },
  { href: '/resources', label: 'Resources', icon: Info },
  { href: '/settings', label: 'Settings', icon: SettingsIcon },
];

export default function BottomNavigationBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg print:hidden">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center space-y-1 p-2 rounded-md text-xs transition-colors',
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
              )}
            >
              <item.icon className={cn('h-5 w-5', isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary')} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
