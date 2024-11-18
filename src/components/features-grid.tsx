import { Truck, BookOpen, MessageCircle, Phone, MapPin, Phone as PhoneIcon, Home, Users, Clock } from 'lucide-react';
import { FeatureCard } from './feature-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { BusinessHours } from './business-hours';

const creationImages = [
  {
    url: "https://picsum.photos/seed/creation1/800/600",
    title: "Arranjos Especiais"
  },
  {
    url: "https://picsum.photos/seed/creation2/800/600",
    title: "Buquês Personalizados"
  },
  {
    url: "https://picsum.photos/seed/creation3/800/600",
    title: "Decorações para Eventos"
  },
  {
    url: "https://picsum.photos/seed/creation4/800/600",
    title: "Flores para Casamentos"
  },
  {
    url: "https://picsum.photos/seed/creation5/800/600",
    title: "Arranjos Corporativos"
  }
];

function CreationsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      const interval = setInterval(scrollNext, 3000);
      return () => clearInterval(interval);
    }
  }, [emblaApi, scrollNext]);

  return (
    <div className="overflow-hidden rounded-lg" ref={emblaRef}>
      <div className="flex">
        {creationImages.map((image, index) => (
          <div
            key={index}
            className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] relative"
          >
            <div className="relative aspect-[4/3] m-2">
              <img
                src={image.url}
                alt={image.title}
                className={cn(
                  "w-full h-full object-cover rounded-lg",
                  "transition-all duration-300 hover:scale-105"
                )}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
              <h4 className="absolute bottom-4 left-4 text-white font-medium">
                {image.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const features = [
  {
    icon: Truck,
    title: "Entrega em Sua Casa",
    description: "Entregamos seus pedidos com todo cuidado e carinho diretamente no endereço desejado."
  },
  {
    icon: BookOpen,
    title: "Catálogo Variado",
    description: "Conheça todos os modelos disponíveis em nosso catálogo exclusivo."
  },
  {
    icon: MessageCircle,
    title: "Pedidos via WhatsApp",
    description: "Escolha o modelo que deseja e agende a entrega sem complicações."
  },
  {
    icon: Phone,
    title: "Atendimento Especial",
    description: "Para mais informações ou orçamentos específicos, estamos à disposição."
  }
];

const aboutSections = [
  {
    icon: Home,
    title: "Sobre Nós",
    description: "Somos uma empresa especializada em criar experiências únicas através de arranjos florais excepcionais. Nossa missão é transformar momentos especiais em memórias inesquecíveis com nossas criações exclusivas."
  },
  {
    icon: Users,
    title: "Nossas Criações",
    description: "Oferecemos uma ampla variedade de arranjos florais, desde buquês delicados até decorações elaboradas para eventos. Cada peça é cuidadosamente elaborada para atender às suas necessidades específicas.",
    carousel: true
  },
  {
    icon: MapPin,
    title: "Localização",
    description: "Rua das Flores, 123\nCentro, Sua Cidade - UF",
    actions: [
      {
        label: "Ver no Mapa",
        href: "https://maps.google.com"
      }
    ]
  },
  {
    icon: Clock,
    title: "Horário de Funcionamento",
    description: "Estamos aqui para atender você nos seguintes horários:",
    businessHours: true,
    actions: [
      {
        label: "Agendar Visita",
        href: "https://wa.me/5500000000000"
      }
    ]
  }
];

export function FeaturesGrid() {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            className="animate-fade-up"
            style={{
              animationDelay: `${index * 150}ms`,
              animationFillMode: 'backwards'
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {aboutSections.map((section, index) => (
          <Card key={index} className="animate-fade-up" style={{
            animationDelay: `${(index + 4) * 150}ms`,
            animationFillMode: 'backwards'
          }}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <section.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">{section.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-line mb-4">
                {section.description}
              </p>
              {section.carousel && <CreationsCarousel />}
              {section.businessHours && <BusinessHours />}
              {section.actions && (
                <div className="flex gap-2 mt-4">
                  {section.actions.map((action, actionIndex) => (
                    <Button
                      key={actionIndex}
                      variant="outline"
                      onClick={() => window.open(action.href, '_blank')}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}