'use client';
import { getCartItems, sendNewQuantity } from '@/app/api/cart/handler';
import CartProductCard from '@/components/cards/CartProductCard';
import { CartItemType } from '@/types';
import React, { useLayoutEffect, useState } from 'react';

function ShoppingCart() {
  const [loading, setLoading] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [cartPrice, setCartPrice] = useState<number>(0);
  const [shippingPrice, setShippingPrice] = useState<number>(4.99);

  useLayoutEffect(() => {
    setLoading(true);
    const fetchCartItems = async () => {
      try {
        const res = await getCartItems();
        if (res.errorCode) {
          return;
        }
        if (res.status === 200) {
          setCartItems(res.content.items);
          setCartPrice(res.content.price);
        }
      } catch (error) {
        console.error('Error fetching cart items', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  const setNewQuantity = async (quantity: number, itemId: string) => {
    try {
      setLoading(true);
      const res = await sendNewQuantity(itemId, quantity);
      if (res.errorCode) {
        return;
      }
      if (res.status === 200) {
        setCartItems(res.content.items);
        setCartPrice(res.content.price);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='w-screen py-24'>
      <div className='mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0'>
        <div className='rounded-lg md:w-2/3'>
          {cartItems.map((item, index) => (
            <CartProductCard
              key={index}
              item={item}
              setNewQuantity={setNewQuantity}
              loading={loading}
            />
          ))}
        </div>
        <div className='mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 sticky'>
          <div className='mb-2 flex justify-between'>
            <p className='text-gray-700'>Subtotal</p>
            <p className='text-gray-700'>${cartPrice}</p>
          </div>
          <div className='flex justify-between'>
            <p className='text-gray-700'>Shipping</p>
            <p className='text-gray-700'>${shippingPrice}</p>
          </div>
          <hr className='my-4' />
          <div className='flex justify-between'>
            <p className='text-lg font-bold'>Total</p>
            <div className=''>
              <p className='mb-1 text-lg font-bold'>
                ${cartPrice + shippingPrice} USD
              </p>
              <p className='text-sm text-gray-700'>including VAT</p>
            </div>
          </div>
          <button className='mt-6 w-full rounded-md bg-green-500 py-1.5 font-medium text-blue-50 hover:bg-green-600'>
            Check out
          </button>
        </div>
      </div>
    </section>
  );
}

export default ShoppingCart;
