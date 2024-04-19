export type AuthPayload = {
  username: string;
  email: string;
  user_id: string | null;
};

export type CartItem = {
  name: string;
  description?: string;
  quantity: number;
  price: string;
  image: string;
};
