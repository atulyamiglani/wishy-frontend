import { FaCheck } from "react-icons/fa";
import { ProductInfo, Wishlist } from "../App";
import React, { useState } from 'react';

interface WishlistModalProps {
    product: ProductInfo;
    wishlists: Wishlist[];
    handleCancel: () => void;
    handleSubmit: (wishlists: Wishlist[]) => void;
}

const WishlistModal: React.FC<WishlistModalProps> = ({ product, wishlists, handleCancel, handleSubmit }) => {
    const [updatedWishlists, setUpdatedWishlists] = useState<Wishlist[]>([...wishlists]);

    const toggleProductInWishlist = (wishlist: Wishlist, productId: string) => {
        const newWishlist = { ...wishlist };

        if (newWishlist.productIds.includes(productId)) {
            newWishlist.productIds = newWishlist.productIds.filter((id) => id !== productId);
        } else {
            newWishlist.productIds = [...newWishlist.productIds, productId];
        }
        const newWishlists = [...updatedWishlists.map((w) => w.wid === newWishlist.wid ? newWishlist : w)];
        setUpdatedWishlists(newWishlists);
    }

    const cancel = () => {
        setUpdatedWishlists([...wishlists]);
        handleCancel();
    }

    const submit = () => {
        handleSubmit(updatedWishlists);
    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start w-full">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <div className="flex items-start mb-2">
                                    <img className="mb-2 me-3 w-40 rounded-t-lg" src={product.mainImage} alt="" />
                                    <div>
                                        <h2 className="tracking-tight text-gray-900 line-clamp-3 mb-1">{product.title}</h2>
                                        <h2 className="font-normal">${product.price}</h2>
                                    </div>
                                </div>
                                <hr />
                                <h2 className="text-gray-900 mt-4">Add to Wishlists:</h2>
                                <div className="py-1 w-full" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                                    {updatedWishlists.map((w) => (
                                        <button
                                            key={w.wid}
                                            className={`flex justify-between items-center w-full rounded-lg p-2 hover:bg-teal-200 ${w.productIds.includes(product.tcin) && 'bg-teal-100'} `}
                                            onClick={() => { toggleProductInWishlist(w, product.tcin); }}
                                        >
                                            {w.title}
                                            {w.productIds.includes(product.tcin) && <FaCheck />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button onClick={submit} type="button" className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm`}>
                            Save
                        </button>
                        <button onClick={() => cancel()} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WishlistModal;