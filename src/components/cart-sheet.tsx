import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShoppingCart } from 'lucide-react';
import { CartItem } from '@/lib/types';
import { PhoneInput } from '@/components/ui/phone-input';
import { useToast } from '@/hooks/use-toast';

interface CartSheetProps {
  items: CartItem[];
  removeFromCart: (productId: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CartSheet({ items, removeFromCart, open, onOpenChange }: CartSheetProps) {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const clearForm = () => {
    setName('');
    setPhone('');
    items.forEach(item => removeFromCart(item.product.id));
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const handleWhatsAppOrder = () => {
    if (!name || !phone) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha seu nome e telefone",
        variant: "destructive"
      });
      return;
    }

    const signature = "\n\n---\nDesenvolvido por Elvio Scaravelli.\nAssine este catálogo e impulsione suas vendas hoje mesmo!";

    const message = `Olá! Gostaria de solicitar um orçamento:\n\nCliente: ${name}\nTelefone: ${phone}\n\nItens de Interesse:\n${items
      .map(
        (item) =>
          `- ${item.product.name} (${item.quantity}x)\n   ${item.product.description}`
      )
      .join('\n\n')}${signature}`;
    
    const whatsappUrl = `https://wa.me/5511941565335?text=${encodeURIComponent(
      message
    )}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Orçamento enviado!",
      description: "Em breve entraremos em contato."
    });
    
    clearForm();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="relative bg-[#25D366] hover:bg-[#20BD5A] text-white border-0"
        >
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[90vw] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Seus Itens Selecionados</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full">
          <ScrollArea className="flex-grow my-4">
            {items.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                Nenhum item selecionado
              </p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center space-x-4"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.product.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      Remover
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
          <div className="border-t pt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <PhoneInput
                id="phone"
                value={phone}
                onChange={setPhone}
                aria-label="Telefone"
              />
            </div>
            <Button
              className="w-full py-6 text-lg font-medium bg-[#25D366] hover:bg-[#20BD5A] text-white"
              onClick={handleWhatsAppOrder}
              disabled={items.length === 0}
            >
              Solicitar Orçamento via WhatsApp
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}