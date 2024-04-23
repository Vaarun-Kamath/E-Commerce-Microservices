'use client';

import { getProducts } from '@/app/api/home/handler';
import ProductShowCard from '@/components/cards/productShowCard';
import React, { useEffect, useState } from 'react';
import { getOrders } from '@/app/api/orders/handler';
import StyledLink from '@/components/atoms/StyledLink';

function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getAllOrders = async () => {
      const res = await getOrders();
      if (res.errorCode) {
        return;
      }
      if (res.status === 200) {
        setOrders(res.content);
      }
    };
    getAllOrders();
  }, []);

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  return (
    <div className='px-2 sm:px-6 sm:py-24 lg:px-8 w-full h-full'>
      <h2 className='text-5xl font-black text-gray-700 tracking-tight mb-3'>
        Orders
      </h2>
      <div className='flex flex-col gap-10'>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <StyledLink key={index} href={"/orders/"+order['_id']} className='border-2 bg-gray-50 flex flex-col gap-2 p-5'>
              <p>OrderID: {order['_id']}</p>
              <p>Amount Paid: {order['amountPaid']}</p>
              <p>Date of Payment: {order['date_of_payment']}</p>
              </StyledLink>
          ))
        ) : (
          <>
            {[...Array(5)].map((_, index) => (
              <div key={index} className='flex flex-col gap-3'>
                <div className='text-2xl text-center h-80 bg-gray-200 animate-pulse rounded-md'></div>
                <div className='h-10 bg-gray-400 opacity-70 animate-pulse rounded-md'></div>
                <div className='h-10 bg-gray-600 opacity-70 animate-pulse rounded-md'></div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Orders;
