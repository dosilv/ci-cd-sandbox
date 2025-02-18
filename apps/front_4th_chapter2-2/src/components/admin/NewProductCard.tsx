import { Product } from "../../types";
import { useNewProduct } from "../../hooks";
import { validateData } from "../../utils";

export type NewProduct = Omit<Product, "id">;

interface Props {
  addNewProduct: (newProduct: NewProduct) => void;
}

export const NewProductCard = ({ addNewProduct }: Props) => {
  const {
    inputDataList: inputData,
    newProduct,
    initializeNewProduct,
  } = useNewProduct();

  const handleAddNewProduct = (newProduct: NewProduct) => {
    const isValid = validateData(newProduct, ["discounts"]);
    if (!isValid) return;

    addNewProduct(newProduct);
    initializeNewProduct();
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
      {inputData.map((data) => (
        <div key={data.id} className="mb-2">
          <label
            htmlFor={data.id}
            className="block text-sm font-medium text-gray-700"
          >
            {data.label}
          </label>
          <input
            id={data.id}
            type={data.type}
            value={data.value}
            onChange={data.onChange}
            className="w-full p-2 border rounded"
          />
        </div>
      ))}

      <button
        onClick={() => handleAddNewProduct(newProduct)}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        추가
      </button>
    </div>
  );
};
