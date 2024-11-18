export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'bouquet' | 'arrangement' | 'wedding' | 'wreath';
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Buquê Encanto de Rosas',
    description: 'Buquê luxuoso com rosas vermelhas e acabamento especial',
    price: 0,
    image: 'https://images.unsplash.com/photo-1494336956603-39a3641efa1c?w=800&auto=format&fit=crop&q=80',
    category: 'bouquet'
  },
  {
    id: '2',
    name: 'Buquê Harmonia',
    description: 'Mix de flores do campo com gérberas e margaridas',
    price: 0,
    image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=800&auto=format&fit=crop&q=80',
    category: 'bouquet'
  },
  {
    id: '3',
    name: 'Arranjo Elegância',
    description: 'Arranjo sofisticado com orquídeas e flores nobres',
    price: 0,
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800&auto=format&fit=crop&q=80',
    category: 'arrangement'
  },
  {
    id: '4',
    name: 'Buquê Noiva Romântica',
    description: 'Buquê de noiva com rosas brancas e acabamento em pérolas',
    price: 0,
    image: 'https://images.unsplash.com/photo-1522850959516-58f958dde2c1?w=800&auto=format&fit=crop&q=80',
    category: 'wedding'
  },
  {
    id: '5',
    name: 'Arranjo Tropical',
    description: 'Arranjo exuberante com flores tropicais e folhagens',
    price: 0,
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&auto=format&fit=crop&q=80',
    category: 'arrangement'
  },
  {
    id: '6',
    name: 'Coroa de Flores Respeito',
    description: 'Coroa de flores para homenagem com rosas e lírios',
    price: 0,
    image: 'https://images.unsplash.com/photo-1602615576820-ea14cf3e476a?w=800&auto=format&fit=crop&q=80',
    category: 'wreath'
  }
];