import Image from "next/image";
import React from "react";
import StyledLink from "../atoms/StyledLink";
import { CiShoppingCart } from "react-icons/ci";
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

import { FaHeart } from "react-icons/fa";

function ProductShowCard(props: {
  product: {
    id: number;
    name: string;
    href: string;
    imageSrc: string;
    imageAlt: string;
    price: string;
    color: string;
    addedToCart?: boolean;
    cartQuantity?: number;
  };
}) {
  return (
    <div className="flex flex-col">
      <div key={props.product.id} className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-85 lg:h-80 duration-200 transition-all">
          <Image
            src={props.product.imageSrc}
            alt={props.product.imageAlt}
            width={250}
            height={500}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <StyledLink href={"/home/" + props.product.id}>
                <span aria-hidden="true" className="absolute inset-0" />
                {props.product.name}
              </StyledLink>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{props.product.color}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">
            {props.product.price}
          </p>
        </div>
      </div>
      {props.product.addedToCart ? (
        <>
          <div className="relative flex items-center mt-6">
            <button
              type="button"
              id="decrement-button"
              className="hover:bg-red-500 hover:text-white border rounded-s-lg p-3 h-11 focus:ring-green-100 focus:ring-2 focus:outline-none duration-200 transition-all"
            >
              <FiMinus />
            </button>
            <input
              type="text"
              id="bedrooms-input"
              className=" border-x-0 h-11 flex justify-center items-center font-medium text-center text-md w-full "
              placeholder=""
              value="3"
              required
              disabled
            />
            <button
              type="button"
              id="increment-button"
              className="hover:bg-green-600 hover:text-white border rounded-e-lg p-3 h-11 focus:ring-green-100 focus:ring-2 focus:outline-none duration-200 transition-all"
            >
              <FaPlus />
            </button>
          </div>
          <button className="flex flex-row justify-center items-center gap-2 mt-2 w-full bg-white border border-gray-300 rounded-md py-2 text-base font-medium text-gray-900 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-200">
            <span className="text-xl p-1">
              <MdOutlineRemoveShoppingCart />
            </span>
            Remove from Cart
          </button>
        </>
      ) : (
        <div className="flex flex-col">
          <button className="flex flex-row justify-center items-center gap-2 mt-6 w-full bg-gray-900 border border-transparent rounded-md py-2 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-200">
            <span className="text-2xl ">
              <CiShoppingCart />
            </span>
            Add to cart
          </button>
          <button className="flex flex-row justify-center items-center gap-2 mt-2 w-full bg-white border border-gray-300 rounded-md py-2 text-base font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
            <span className="text-xl p-1">
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
