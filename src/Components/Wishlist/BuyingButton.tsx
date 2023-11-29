import React from 'react';
import { WishlistProductInfo } from '../../App';
import { CurrentUserContext } from '../../App';
import { useState } from 'react';

const OtherUserBuyingText: React.FC<{ productInfo: WishlistProductInfo }> = ({ productInfo }) => {
    return (
        <p className='text-gray-500 text-sm'>@{productInfo.buyerId} is buying this.</p>
    );
}

const UserBuyingButton: React.FC<{ productInfo: WishlistProductInfo }> = ({ productInfo }) => {
    return (
        <>
            <p className='text-gray-500 text-sm mb-1'>I'm buying this!</p>
            <button
                className="inline-flex justify-center rounded-md shadow-sm px-3 py-2 bg-gray-400 text-sm font-medium text-white hover:bg-gray-300"
            >
                Cancel
            </button>
        </>
    );
}

const BuyableButton: React.FC<{ productInfo: WishlistProductInfo }> = ({ productInfo }) => {
    return (
        <button
            className="inline-flex justify-center mb-1 rounded-md shadow-sm px-3 py-2 bg-amber-600 text-sm font-medium text-white hover:bg-amber-500"
        >
            I'll buy this!
        </button>
    );
}

const BuyingButton: React.FC<{ productInfo: WishlistProductInfo | null }> = ({ productInfo }) => {
    enum ProductState {
        BUYABLE,
        BOUGHT_BY_OTHER,
        BOUGHT_BY_USER,
        NONE
    }

    const { user } = React.useContext(CurrentUserContext);
    console.log(user);
    const [productState, setProductState] = React.useState<ProductState>(ProductState.NONE);

    React.useEffect(() => {
        if (productInfo && user) {
            if (productInfo.buyerId === user.username) {
                setProductState(ProductState.BOUGHT_BY_USER);
            } else if (productInfo.buyerId) {
                setProductState(ProductState.BOUGHT_BY_OTHER);
            } else {
                setProductState(ProductState.BUYABLE);
            }
        } else {
            setProductState(ProductState.NONE);
        }
    }, [productInfo, user]);

    return (
        <>
            {productState === ProductState.BUYABLE && <BuyableButton productInfo={productInfo!} />}
            {productState === ProductState.BOUGHT_BY_OTHER && <OtherUserBuyingText productInfo={productInfo!} />}
            {productState === ProductState.BOUGHT_BY_USER && <UserBuyingButton productInfo={productInfo!} />}
        </>
    );
};

export default BuyingButton;
