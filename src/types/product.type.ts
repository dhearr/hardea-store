export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description?: string;
  updated_at: Date;
  created_at: Date;
  stock: [
    {
      size: string;
      qty: number;
    },
  ];
};
