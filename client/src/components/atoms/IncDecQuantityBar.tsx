import React from 'react';

function IncDecQuantityBar({
  item,
  setNewQuantity,
  loading,
  quantity,
}: {
  item: string;
  setNewQuantity: (quantity: number, itemId: string) => void;
  loading: boolean;
  quantity: number;
}) {
  return (
    <div className='flex items-center border-gray-100'>
      <button
        onClick={() => setNewQuantity(quantity - 1, item)}
        disabled={loading || quantity === 1}
        className={
          'cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-green-500 hover:text-blue-50' +
          (loading || quantity === 1 ? ' cursor-not-allowed' : '')
        }
      >
        -
      </button>
      <span className='text-sm px-3'>{quantity}</span>
      <button
        onClick={() => setNewQuantity(quantity + 1, item)}
        disabled={loading}
        className={
          'cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-green-500 hover:text-blue-50' +
          (loading ? ' cursor-not-allowed' : '')
        }
      >
        +
      </button>
    </div>
  );
}

export default IncDecQuantityBar;
