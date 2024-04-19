'use client';

import { getProducts } from '@/app/api/home/handler';
import ProductShowCard from '@/components/cards/productShowCard';
import React, { useEffect, useState } from 'react';

function Home() {
  const [products, setProducts] = useState<
    Array<{
      _id: string;
      product: string;
      picture: string;
      price: number;
      quantity: number;
    }>
  >([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const res = await getProducts();
      if (res.errorCode) {
        return;
      }
      if (res.status === 200) {
        setProducts(res.content);
      }
    };
    getAllProducts();
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <>
      <div className='px-2 sm:px-6 sm:py-24 lg:px-8 w-full h-full'>
        <h2 className='text-5xl font-black text-gray-700 tracking-tight'>
          Trending
        </h2>
        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8 w-full justify-center px-10 py-5'>
          {products.length > 0 ? (
            products.map((product, index) => (
              <ProductShowCard key={index} product={product} />
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
    </>
  );
}

export default Home;
