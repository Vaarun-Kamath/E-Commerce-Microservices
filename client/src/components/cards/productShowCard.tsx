import Image from 'next/image';
import React, { useState } from 'react';
import StyledLink from '../atoms/StyledLink';
import { CiShoppingCart } from 'react-icons/ci';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';

import { FaHeart } from 'react-icons/fa';
import {
  addProductToCart,
  removeProductFromCart,
} from '@/app/api/cart/handler';

function ProductShowCard(props: {
  product: {
    _id: string;
    product: string;
    picture: string;
    price: number;
    quantity: number;
    addedToCart?: boolean;
  };
}) {
  const [inCart, SetInCart] = useState(props.product.addedToCart);
  const handleAddToCart = async () => {
    try {
      const res = await addProductToCart(props.product._id, 1);
      if (res.errorCode) {
        return;
      }
      if (res.status === 200) {
        console.log('Product added to cart');
        SetInCart(true);
      } else {
        console.log('Product not added to cart');
      }
    } catch (err) {
      console.log('error: ', err);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      const res = await removeProductFromCart(props.product._id);
      if (res.errorCode) {
        return;
      }
      if (res.status === 200) {
        console.log('Product removed from cart');
        SetInCart(false);
      } else {
        console.log('Product not removed from cart');
      }
    } catch (err) {
      console.log('error: ', err);
    }
  };

  return (
    <div className='flex flex-col'>
      <div key={props.product._id} className='group relative'>
        <div className='select-none aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-80 lg:h-80 duration-200 transition-all'>
          <Image
            src={props.product.picture}
            alt={props.product.product}
            width={250}
            height={500}
            className='h-full w-full object-cover object-center lg:h-full lg:w-full'
          />
        </div>
        <div className='mt-4 flex justify-between'>
          <div>
            <h3 className='text-sm text-gray-700'>
              <StyledLink href={'/home/' + props.product._id}>
                <span aria-hidden='true' className='absolute inset-0' />
                {props.product.product}
              </StyledLink>
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              {props.product.product}
            </p>
          </div>
          <p className='text-md font-medium text-gray-900'>
            ${props.product.price}
          </p>
        </div>
      </div>
      {inCart ? (
        <>
          <div className='relative flex items-center mt-6 select-none'>
          </div>
          <button
            onClick={handleRemoveFromCart}
            className='select-none flex flex-row justify-center items-center gap-2 mt-2 w-full bg-white border border-gray-300 rounded-md py-2 text-base font-medium text-gray-900 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-200'
          >
            <span className='text-xl p-1'>
              <MdOutlineRemoveShoppingCart />
            </span>
            Remove from Cart
          </button>
        </>
      ) : (
        <div className='flex flex-col'>
          <button
            onClick={handleAddToCart}
            className='select-none flex flex-row justify-center items-center gap-2 mt-6 w-full bg-gray-900 border border-transparent rounded-md py-2 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-200'
          >
            <span className='text-2xl '>
              <CiShoppingCart />
            </span>
            Add to cart
          </button>
          <button className='select-none flex flex-row justify-center items-center gap-2 mt-2 w-full bg-white border border-gray-300 rounded-md py-2 text-base font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'>
            <span className='text-xl p-1'>
              <FaHeart />
            </span>
            Wishlist
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductShowCard;
