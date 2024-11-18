import { useState } from 'react';
import { CartSheet } from '@/components/cart-sheet';
import { ProductCard } from '@/components/product-card';
import { FeaturesGrid } from '@/components/features-grid';
import { DockMenu } from '@/components/dock-menu';
import { SubscriptionPage } from '@/components/subscription-page';
import { products, Product } from '@/lib/products';
import { CartItem } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Flower, Heart, Crown, CircleDot, MessageCircle, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Check if we're on the subscriptions page
  const isSubscriptionsPage = window.location.pathname === '/subscriptions';

  const addToCart = (product: Product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId)
    );
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent('Olá! Gostaria de fazer um pedido.');
    window.open(`https://wa.me/5511941565335?text=${message}`, '_blank');
  };

  const categories = [
    { value: 'all', label: 'Todos', icon: CircleDot },
    { value: 'bouquet', label: 'Buquês', icon: Flower },
    { value: 'arrangement', label: 'Arranjos', icon: Heart },
    { value: 'wedding', label: 'Casamento', icon: Heart },
    { value: 'wreath', label: 'Coroas', icon: Crown },
  ];

  if (isSubscriptionsPage) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
              <Flower className="h-6 w-6" />
              Flores & Arranjos
            </h1>
            <Button variant="ghost" onClick={() => window.location.href = '/'}>
              Voltar
            </Button>
          </div>
        </header>
        <SubscriptionPage />
        <DockMenu />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <Flower className="h-6 w-6" />
            Flores & Arranjos
          </h1>
          <div className="flex items-center gap-2">
            <div className="block md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <div className="flex flex-col gap-4 mt-8">
                    {categories.map((category) => (
                      <Button
                        key={category.value}
                        variant={activeTab === category.value ? "default" : "ghost"}
                        className="justify-start"
                        onClick={() => setActiveTab(category.value)}
                      >
                        <category.icon className="h-4 w-4 mr-2" />
                        {category.label}
                      </Button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <CartSheet 
              items={cartItems} 
              removeFromCart={removeFromCart}
              open={isCartOpen}
              onOpenChange={setIsCartOpen}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <Button 
          onClick={openWhatsApp} 
          className="bg-[#25D366] hover:bg-[#20BD5A] text-white mx-auto mb-6 flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          Gostou desse catálogo? Solicite o seu aqui
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-12">
          <div className="flex flex-col items-center gap-2 p-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <span className="font-semibold">1</span>
            </div>
            <h3 className="font-medium">Escolha seus produtos</h3>
            <p className="text-sm text-muted-foreground">Adicione ao carrinho os itens que deseja orçar</p>
          </div>
          <div className="flex flex-col items-center gap-2 p-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <span className="font-semibold">2</span>
            </div>
            <h3 className="font-medium">Preencha seus dados</h3>
            <p className="text-sm text-muted-foreground">Informe seu nome e telefone para contato</p>
          </div>
          <div className="flex flex-col items-center gap-2 p-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <span className="font-semibold">3</span>
            </div>
            <h3 className="font-medium">Solicite o orçamento</h3>
            <p className="text-sm text-muted-foreground">Envie seu pedido via WhatsApp e aguarde nosso contato</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="hidden md:flex justify-center flex-wrap gap-2">
            {categories.map((category) => (
              <TabsTrigger
                key={category.value}
                value={category.value}
                className="flex items-center gap-2"
              >
                <category.icon className="h-4 w-4" />
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </TabsContent>

          {['bouquet', 'arrangement', 'wedding', 'wreath'].map((category) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {products
                  .filter((product) => product.category === category)
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={addToCart}
                    />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16">
          <FeaturesGrid />
        </div>
      </main>

      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <a
          href="https://elvio.com.br"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          elvio.com.br desenvolvimento
        </a>
      </footer>

      <DockMenu />
    </div>
  );
}

export default App;