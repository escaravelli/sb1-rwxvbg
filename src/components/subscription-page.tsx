import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { PaymentDialog } from './payment-dialog';

const tiers = [
  {
    name: 'Bronze',
    price: 199,
    description: 'Perfeito para pequenos ambientes',
    features: [
      '4 entregas mensais',
      'Buquês pequenos (12 flores)',
      'Flores da estação',
      'Entrega em horário comercial',
      'Suporte via WhatsApp',
    ],
  },
  {
    name: 'Silver',
    price: 299,
    description: 'Ideal para decoração residencial',
    features: [
      '4 entregas mensais',
      'Buquês médios (24 flores)',
      'Mix de flores premium',
      'Escolha do horário de entrega',
      'Suporte prioritário',
      'Vaso decorativo mensal',
    ],
  },
  {
    name: 'Gold',
    price: 499,
    description: 'A melhor experiência floral',
    features: [
      '4 entregas mensais',
      'Buquês luxuosos (36 flores)',
      'Flores importadas',
      'Entrega 24/7',
      'Suporte VIP',
      'Kit de vasos premium',
      'Arranjos personalizados',
      'Consultoria de decoração',
    ],
  },
];

export function SubscriptionPage() {
  const [selectedTier, setSelectedTier] = useState<typeof tiers[0] | null>(null);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  const handleSubscribe = (tier: typeof tiers[0]) => {
    setSelectedTier(tier);
    setPaymentDialogOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Assinatura de Flores</h1>
        <p className="text-lg text-muted-foreground">
          Receba flores frescas semanalmente em sua casa ou escritório
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier, index) => (
          <Card
            key={tier.name}
            className={cn(
              "relative overflow-hidden transition-all hover:shadow-lg",
              index === 1 && "border-primary shadow-md scale-105"
            )}
          >
            {index === 1 && (
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 rotate-45">
                <div className="bg-primary text-primary-foreground text-xs py-1 px-10 text-center">
                  Popular
                </div>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-4xl font-bold">
                R$ {tier.price}
                <span className="text-base font-normal text-muted-foreground">
                  /mês
                </span>
              </div>
              <ul className="space-y-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={index === 1 ? "default" : "outline"}
                onClick={() => handleSubscribe(tier)}
              >
                Assinar {tier.name}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedTier && (
        <PaymentDialog
          open={paymentDialogOpen}
          onOpenChange={setPaymentDialogOpen}
          tier={selectedTier}
        />
      )}
    </div>
  );
}