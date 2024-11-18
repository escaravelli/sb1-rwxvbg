import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tier: {
    name: string;
    price: number;
  };
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

export function PaymentDialog({ open, onOpenChange, tier }: PaymentDialogProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real application, you would:
      // 1. Call your backend to create a Stripe payment intent
      // 2. Use the client secret to confirm the payment
      // 3. Handle the payment result
      
      // Simulating payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Pagamento processado com sucesso!",
        description: `Sua assinatura ${tier.name} foi ativada.`,
      });
      
      onOpenChange(false);
      
      const signature = "\n\n---\nDesenvolvido por Elvio Scaravelli.\nAssine este catálogo e impulsione suas vendas hoje mesmo!";
      
      // Redirect to WhatsApp for final confirmation
      const message = `Olá! Acabei de assinar o plano ${tier.name} de flores. Gostaria de confirmar os detalhes da minha assinatura.${signature}`;
      window.open(`https://wa.me/5511941565335?text=${encodeURIComponent(message)}`, '_blank');
    } catch (error) {
      toast({
        title: "Erro no processamento",
        description: "Ocorreu um erro ao processar o pagamento. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assinatura {tier.name}</DialogTitle>
          <DialogDescription>
            Complete seu pagamento para ativar sua assinatura mensal de flores.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="card-number">Número do Cartão</Label>
            <Input
              id="card-number"
              placeholder="1234 5678 9012 3456"
              required
              maxLength={19}
              className="font-mono"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Validade</Label>
              <Input
                id="expiry"
                placeholder="MM/AA"
                required
                maxLength={5}
                className="font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input
                id="cvc"
                placeholder="123"
                required
                maxLength={3}
                className="font-mono"
              />
            </div>
          </div>
          <div className="pt-4">
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando...
                </>
              ) : (
                `Pagar R$ ${tier.price},00`
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}