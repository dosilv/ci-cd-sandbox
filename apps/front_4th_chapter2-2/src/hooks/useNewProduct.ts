import { ChangeEvent, useState } from "react";
import { NewProduct } from "../components";

type InputData = {
  id: string;
  label: string;
  type: "text" | "number";
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const INITIAL_PRODUCT = {
  name: "",
  price: 0,
  stock: 0,
  discounts: [],
};

export const useNewProduct = () => {
  const [newProduct, setNewProduct] = useState<NewProduct>(INITIAL_PRODUCT);

  const initializeNewProduct = () => setNewProduct(INITIAL_PRODUCT);

  const inputDataList: InputData[] = [
    {
      label: "상품명",
      id: "productName",
      type: "text",
      value: newProduct.name,
      onChange: (e) => setNewProduct({ ...newProduct, name: e.target.value }),
    },
    {
      label: "가격",
      id: "productPrice",
      type: "number",
      value: newProduct.price,
      onChange: (e) =>
        setNewProduct({
          ...newProduct,
          price: parseInt(e.target.value),
        }),
    },
    {
      label: "재고",
      id: "productStock",
      type: "number",
      value: newProduct.stock,
      onChange: (e) =>
        setNewProduct({
          ...newProduct,
          stock: parseInt(e.target.value),
        }),
    },
  ];

  return { inputDataList, newProduct, initializeNewProduct };
};
