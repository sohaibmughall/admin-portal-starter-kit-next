export interface Order {
  id: string;
  customerName: string;
  orderNumber: string;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  items: {
    productId: string;
    quantity: number;
    price: number;
    name: string;
  }[];
  createdAt: string;
  updatedAt: string;
}
