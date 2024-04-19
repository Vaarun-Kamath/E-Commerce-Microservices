export type AuthPayload = {
  username: string;
  email: string;
  user_id: string | null;
};

export type CartItemType = {
  itemId: string;
  name: string;
  description?: string;
  quantity: number;
  price: string;
  image: string;
};
