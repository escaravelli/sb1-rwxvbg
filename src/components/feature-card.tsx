import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon: Icon, title, description, className }: FeatureCardProps) {
  return (
    <Card className={cn(
      "group relative overflow-hidden transition-all hover:shadow-lg",
      "before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-primary/5",
      className
    )}>
      <CardHeader className="relative z-10 pb-0">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="relative z-10 space-y-2">
        <h3 className="font-semibold leading-tight tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}