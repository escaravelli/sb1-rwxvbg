import React, { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const images = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  url: `https://picsum.photos/seed/${i + 1}/1200/600`,
  alt: `Slide ${i + 1}`
}));

export function ImageCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

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
    <Card className="overflow-hidden mb-12">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((image) => (
            <div
              key={image.id}
              className="flex-[0_0_100%] min-w-0 relative aspect-[2/1]"
            >
              <img
                src={image.url}
                alt={image.alt}
                className={cn(
                  "w-full h-full object-cover",
                  "transition-opacity duration-300"
                )}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}