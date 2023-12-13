import React from "react";
import { User, WishlistProductInfo } from "../../App";
import { CurrentUserContext } from "../../App";

const OtherUserBuyingText: React.FC<{ productInfo: WishlistProductInfo }> = ({
  productInfo,
}) => {
  return (
    <p className="text-gray-500 text-sm">
      @{productInfo.buyerId} is buying this.
    </p>
  );
};

const UserBuyingButton: React.FC<{
  productInfo: WishlistProductInfo;
  removeProductBuyer: (buyerId: string) => void;
}> = ({ productInfo, removeProductBuyer }) => {
  return (
    <>
      <p className="text-gray-500 text-sm mb-1">I'm buying this!</p>
      <button
        onClick={() => removeProductBuyer(productInfo.productId)}
        className="inline-flex justify-center rounded-md shadow-sm px-3 py-2 bg-gray-400 text-sm font-medium text-white hover:bg-gray-300"
      >
        Cancel
      </button>
    </>
  );
};

const BuyableButton: React.FC<{
  productInfo: WishlistProductInfo;
  setProductBuyer: (productId: string, buyerId: string) => void;
  user: User;
}> = ({ productInfo, setProductBuyer, user }) => {
  return (
    <button
      onClick={() => setProductBuyer(productInfo.productId, user.username)}
      className="inline-flex justify-center mb-1 rounded-md shadow-sm px-3 py-2 bg-amber-600 text-sm font-medium text-white hover:bg-amber-500"
    >
      I'll buy this!
    </button>
  );
};

interface BuyingButtonProps {
  productInfo: WishlistProductInfo | null;
  setProductBuyer: (productId: string, buyerId: string) => void;
  removeProductBuyer: (productId: string) => void;
}

const BuyingButton: React.FC<BuyingButtonProps> = ({
  productInfo,
  setProductBuyer,
  removeProductBuyer,
}) => {
  enum ProductState {
    BUYABLE,
    BOUGHT_BY_OTHER,
    BOUGHT_BY_USER,
    NONE,
  }

  const { user } = React.useContext(CurrentUserContext);
  const [productState, setProductState] = React.useState<ProductState>(
    ProductState.NONE
  );

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
  }, [productInfo, user, ProductState]);

  return (
    <>
      {productState === ProductState.BUYABLE && (
        <BuyableButton
          productInfo={productInfo!}
          setProductBuyer={setProductBuyer}
          user={user!}
        />
      )}
      {productState === ProductState.BOUGHT_BY_OTHER && (
        <OtherUserBuyingText productInfo={productInfo!} />
      )}
      {productState === ProductState.BOUGHT_BY_USER && (
        <UserBuyingButton
          productInfo={productInfo!}
          removeProductBuyer={removeProductBuyer}
        />
      )}
    </>
  );
};

export default BuyingButton;
