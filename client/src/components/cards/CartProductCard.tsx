import Image from 'next/image';
import React from 'react';
import { CartItemType } from '@/types';
import IncDecQuantityBar from '../atoms/IncDecQuantityBar';
import { RxCross2 } from 'react-icons/rx';

function CartProductCard(props: {
  item: CartItemType;
  loading: boolean;
  setNewQuantity: (quantity: number, itemId: string) => void;
  removeItemFromCart: (itemId: string) => void;
}) {
  return (
    <div className='justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start'>
      <Image
        width={350}
        height={350}
        src={props.item.image}
        alt='product-image'
        className='w-full rounded-lg sm:w-40'
      />
      <div className='sm:ml-4 sm:flex sm:w-full sm:justify-between'>
        <div className='mt-5 sm:mt-0'>
          <h2 className='text-lg font-bold text-gray-900'>{props.item.name}</h2>
          <p className='mt-1 text-xs text-gray-700'>
            {props.item.description ? props.item.description : 'No description'}
          </p>
        </div>
        <div className='mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6'>
          <IncDecQuantityBar
            item={props.item.itemId}
            setNewQuantity={props.setNewQuantity}
            loading={props.loading}
            quantity={props.item.quantity}
          />
          <button
            onClick={() => props.removeItemFromCart(props.item.itemId)}
            className='flex items-center gap-x-3'
          >
            <p className='text-sm'>${props.item.price}</p>
            <span className='text-xl hover:text-white p-1 hover:bg-red-500 rounded-full transition-all duration-200'>
              <RxCross2 />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartProductCard;
