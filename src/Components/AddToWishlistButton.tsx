import React, { useState } from 'react';
import { ProductInfo, Wishlist } from '../App';
import WishlistModal from './AddToWishlistModal';

interface AddToWishlistButtonProps {
    product: ProductInfo;
    wishlists: Wishlist[];
    setWishlists: React.Dispatch<React.SetStateAction<Wishlist[]>>;
}

/*
 * A button that opens a modal to add a product to a wishlist.
 * Should be presented on a product card or product details page.
*/
const AddToWishlistButton: React.FC<AddToWishlistButtonProps> = ({ product, wishlists, setWishlists }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleCancel = () => {
        setModalOpen(false);
    }

    const handleSubmit = (newWishlists: Wishlist[]) => {
        setWishlists(newWishlists);
        setModalOpen(false);
    }

    return (
        <>
            <button
                className="inline-flex justify-center mb-1 rounded-md border border-gray-300 shadow-sm px-3 py-2 bg-teal-600 text-sm font-medium text-white hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-600"
                onClick={() => setModalOpen(true)}>
                Add to Wishlist
            </button>
            <p className='text-gray-500 text-sm'>Included in {wishlists.filter((w) => w.productIds.includes(product.tcin)).length} wishlists.</p>
            {modalOpen && <WishlistModal product={product} wishlists={wishlists!} handleCancel={handleCancel} handleSubmit={handleSubmit} />}
        </>
    )
}

export default AddToWishlistButton;