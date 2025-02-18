import { useState } from "react";
import { Product, Discount } from "../../types";
import { useEditingProduct } from "../../hooks";
import { validateData } from "../../utils";

interface Props {
  index: number;
  product: Product;
  onProductUpdate: (updatedProduct: Product) => void;
}

export const AdminProductCard = ({
  index,
  product,
  onProductUpdate,
}: Props) => {
  const [isProductOpen, setIsProductOpen] = useState(false);

  const {
    editingProduct,
    productInputDataList,
    dicountInputDataList,
    newDiscount,
    handleEditProduct,
    handleAddDiscount,
    handleRemoveDiscount,
    clearEditingProduct,
  } = useEditingProduct();

  const handleEditComplete = () => {
    if (!editingProduct) return;

    const isValid = validateData(editingProduct, ["discounts"]);
    if (!isValid) return;

    onProductUpdate(editingProduct);
    clearEditingProduct();
  };

  return (
    <div
      key={product.id}
      data-testid={`product-${index + 1}`}
      className="bg-white p-4 rounded shadow"
    >
      <button
        data-testid="toggle-button"
        onClick={() => setIsProductOpen((prev) => !prev)}
        className="w-full text-left font-semibold"
      >
        {product.name} - {product.price}원 (재고: {product.stock})
      </button>
      {isProductOpen && (
        <div className="mt-2">
          {editingProduct && editingProduct.id === product.id ? (
            <div>
              {productInputDataList?.map((data) => (
                <div key={data.label} className="mb-4">
                  <label className="block mb-1">{data.label}</label>
                  <input
                    type={data.type}
                    value={data.value}
                    onChange={data.onChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              ))}
              {/* 할인 정보 수정 부분 */}
              <div>
                <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
                {editingProduct.discounts.map(
                  (discount: Discount, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between items-center mb-2"
                    >
                      <span>
                        {discount.quantity}개 이상 구매 시 {discount.rate * 100}
                        % 할인
                      </span>
                      <button
                        onClick={() => handleRemoveDiscount(product.id, index)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        삭제
                      </button>
                    </div>
                  ),
                )}
                <div className="flex space-x-2">
                  {dicountInputDataList?.map((data) => (
                    <input
                      key={data.placeholder}
                      type="number"
                      placeholder={data.placeholder}
                      value={data.value}
                      onChange={data.onChange}
                      className="w-1/3 p-2 border rounded"
                    />
                  ))}
                  <button
                    onClick={() => {
                      handleAddDiscount(product.id, newDiscount);
                    }}
                    className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  >
                    할인 추가
                  </button>
                </div>
              </div>
              <button
                onClick={handleEditComplete}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
              >
                수정 완료
              </button>
            </div>
          ) : (
            <div>
              {product.discounts.map((discount: Discount, index: number) => (
                <div key={index} className="mb-2">
                  <span>
                    {discount.quantity}개 이상 구매 시 {discount.rate * 100}%
                    할인
                  </span>
                </div>
              ))}
              <button
                data-testid="modify-button"
                onClick={() => handleEditProduct(product)}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
              >
                수정
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
