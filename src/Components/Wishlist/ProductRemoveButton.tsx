import React from "react";

interface ProductRemoveButtonProps {
  productId: string;
  onRemove: (productId: string) => void;
}

const ProductRemoveButton: React.FC<ProductRemoveButtonProps> = ({
  productId,
  onRemove,
}) => {
  const handleRemove = () => {
    onRemove(productId);
  };

  return (
    <button
      className="mb-1 rounded-md shadow-sm px-3 py-2 bg-red-600 text-sm font-medium text-white hover:bg-red-500"
      onClick={handleRemove}
    >
      Remove
    </button>
  );
};

export default ProductRemoveButton;
