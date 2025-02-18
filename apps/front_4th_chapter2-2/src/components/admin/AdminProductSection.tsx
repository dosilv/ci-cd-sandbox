import React, { useState } from "react";
import { NewProduct, NewProductCard } from "./NewProductCard";
import { AdminProductCard } from "./AdminProductCard";
import { Product } from "../../types";
import { SectionHeader } from "../shared";

interface Props {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
}

const AdminProductSection = ({
  products,
  onProductUpdate,
  onProductAdd,
}: Props) => {
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const addNewProduct = (newProduct: NewProduct) => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    onProductAdd(productWithId);
    setShowNewProductForm(false);
  };
  return (
    <div>
      <SectionHeader mb={4}>상품 관리</SectionHeader>
      <button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? "취소" : "새 상품 추가"}
      </button>
      {showNewProductForm && <NewProductCard addNewProduct={addNewProduct} />}
      <div className="space-y-2">
        {products.map((product, index) => (
          <AdminProductCard
            index={index}
            key={product.id}
            product={product}
            onProductUpdate={onProductUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(AdminProductSection);
