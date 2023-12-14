import React from "react";
import { ProductInfo } from "../App";
import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface ProductCardProps {
  product: ProductInfo;
  bottomContent?: ReactNode;
}

/*
 * A card showing a product's details.
 */
const ProductCard: React.FC<ProductCardProps> = ({
  product,
  bottomContent,
}) => {
  return (
    <div className="w-60 border-2 bg-white border border-gray-200 rounded-lg shadow hover:border-purple-600 p-5">
      <Link to={`/details/${product.tcin}`}>
        <img className="mb-2 rounded-t-lg" src={product.mainImage} alt="" />
        <h5 className="mb-2 text-lg tracking-tight text-gray-900 line-clamp-3">
          {product.title.replace(/&#34;/g, '"')}
        </h5>
        <h2 className="mb-2">${product.price}</h2>
      </Link>
      {bottomContent}
    </div>
  );
};

export default ProductCard;
