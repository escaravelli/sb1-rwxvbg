import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const BUSINESS_HOURS = {
  1: { open: '09:00', close: '18:00' }, // Monday
  2: { open: '09:00', close: '18:00' }, // Tuesday
  3: { open: '09:00', close: '18:00' }, // Wednesday
  4: { open: '09:00', close: '18:00' }, // Thursday
  5: { open: '09:00', close: '18:00' }, // Friday
  6: { open: '09:00', close: '13:00' }, // Saturday
  0: null, // Sunday - closed
};

function isBusinessOpen(): boolean {
  const now = new Date();
  const day = now.getDay();
  const hours = BUSINESS_HOURS[day as keyof typeof BUSINESS_HOURS];

  if (!hours) return false;

  const currentTime = now.getHours() * 100 + now.getMinutes();
  const [openHour, openMinute] = hours.open.split(':').map(Number);
  const [closeHour, closeMinute] = hours.close.split(':').map(Number);
  const openTime = openHour * 100 + openMinute;
  const closeTime = closeHour * 100 + closeMinute;

  return currentTime >= openTime && currentTime < closeTime;
}

export function BusinessHours() {
  const [isOpen, setIsOpen] = useState(isBusinessOpen());

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOpen(isBusinessOpen());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <Clock className="h-4 w-4 text-muted-foreground" />
      <Badge
        variant="outline"
        className={cn(
          "font-medium",
          isOpen 
            ? "border-green-500 text-green-500" 
            : "border-red-500 text-red-500"
        )}
      >
        {isOpen ? "Aberto" : "Fechado"}
      </Badge>
      <span className="text-sm text-muted-foreground">
        Seg-Sex: 09h às 18h • Sáb: 09h às 13h
      </span>
    </div>
  );
}