import { Home, BookOpen, Flower2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function DockMenu() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent('Olá! Gostaria de solicitar um catálogo personalizado.');
    window.open(`https://wa.me/5511941565335?text=${message}`, '_blank');
  };

  const openSubscriptions = () => {
    window.location.href = '/subscriptions';
  };

  return (
    <>
      <Alert className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50 bg-white/80 backdrop-blur-sm border-primary/20">
        <AlertDescription className="text-sm">
          Este é um catálogo de demonstração. Ao adquirir, você poderá personalizar o catálogo de acordo com suas preferências.
        </AlertDescription>
      </Alert>

      <div className={cn(
        "fixed bottom-4 left-1/2 -translate-x-1/2 z-50",
        "flex items-center gap-2 p-2 rounded-full",
        "bg-white/80 backdrop-blur-sm shadow-lg border"
      )}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={scrollToTop}
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Início</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Início</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={openWhatsApp}
              >
                <BookOpen className="h-5 w-5" />
                <span className="sr-only">Catálogo</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Solicitar Catálogo</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={openSubscriptions}
              >
                <Flower2 className="h-5 w-5" />
                <span className="sr-only">Assinatura</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Assinatura de Flores</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
}