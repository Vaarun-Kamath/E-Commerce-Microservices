import Image from 'next/image';
import React from 'react';
import { CartItemType } from '@/types';
import IncDecQuantityBar from '../atoms/IncDecQuantityBar';
import { RxCross2 } from 'react-icons/rx';

function CartProductCard(props: {
  order: CartItemType;
}) {
  return (
    <div className='justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start'>
      
    </div>
  );
}

export default CartProductCard;
