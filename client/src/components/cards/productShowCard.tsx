import React from "react";

function ProductShowCard(props: {
  products: {
    id: number;
    name: string;
    price: number;
  };
}) {
  
  return (
    <div className="w-32 border border-red-500 rounded-md p-5">
      Product ID: {props.products.id}
      Name: {props.products.name}
      Price: {props.products.price}
    </div>
  );
}

export default ProductShowCard;
