import React from 'react';
import { ProductInfo, Wishlist } from '../App';
import { Link } from 'react-router-dom';
import AddToWishlistButton from './AddToWishlistButton';

interface ProductCardProps {
    product: ProductInfo;
    wishlists?: Wishlist[];
    setWishlists?: React.Dispatch<React.SetStateAction<Wishlist[]>>;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, wishlists, setWishlists }) => {
    return (
        <div className="w-60 border-2 bg-white border border-gray-200 rounded-lg shadow hover:border-purple-600 p-5">
            <Link to={`/${product.tcin}/details`}>
                <img className="mb-2 rounded-t-lg" src={product.mainImage} alt="" />
                <h5 className="mb-2 text-lg tracking-tight text-gray-900 line-clamp-3">{product.title}</h5>
                <h2 className='mb-2'>${product.price}</h2>
            </Link>
            {wishlists && setWishlists && (<AddToWishlistButton product={product} wishlists={wishlists} setWishlists={setWishlists} />)}
        </div>
    );
}

export default ProductCard;
