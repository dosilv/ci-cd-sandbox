import { ChangeEvent, useMemo, useState } from "react";
import { Discount, Product } from "../types";
import { ValueOf } from "next/dist/shared/lib/constants";
import { validateData } from "../utils";

type ProductInputData = {
  label: string;
  type: "text" | "number";
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

type DiscountInputData = {
  placeholder: string;
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const useEditingProduct = () => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newDiscount, setNewDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0,
  });

  const productInputDataList: ProductInputData[] = useMemo(() => {
    if (!editingProduct) return [];

    return [
      {
        label: "상품명: ",
        type: "text",
        value: editingProduct.name,
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          updateProduct(editingProduct.id, "name", e.target.value);
        },
      },
      {
        label: "가격: ",
        type: "number",
        value: editingProduct.price,
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          updateProduct(editingProduct.id, "price", parseInt(e.target.value));
        },
      },
      {
        label: "재고: ",
        type: "number",
        value: editingProduct.stock,
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          updateProduct(editingProduct.id, "stock", parseInt(e.target.value));
        },
      },
    ];
  }, [editingProduct]);

  const dicountInputDataList: DiscountInputData[] = useMemo(
    () => [
      {
        placeholder: "수량",
        value: newDiscount.quantity,
        onChange: (e) => {
          setNewDiscount({
            ...newDiscount,
            quantity: parseInt(e.target.value),
          });
        },
      },
      {
        placeholder: "할인율 (%)",
        value: newDiscount.rate * 100,
        onChange: (e) => {
          setNewDiscount({
            ...newDiscount,
            rate: parseInt(e.target.value) / 100,
          });
        },
      },
    ],
    [newDiscount],
  );

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const getEditingProduct = (productId: string): Product | null =>
    editingProduct?.id === productId ? editingProduct : null;

  // 계산(순수함수) 추출
  const getUpdatedProduct = <K extends keyof Product>(
    product: Product,
    key: K,
    newValue: Product[K],
  ): Product => {
    return { ...product, [key]: newValue };
  };

  // 액션 공통화
  const updateProduct = (
    productId: string,
    key: keyof Product,
    newValue: ValueOf<Product>,
  ) => {
    const product = getEditingProduct(productId);
    if (!product) return;
    const updatedProduct = getUpdatedProduct(product, key, newValue);
    setEditingProduct(updatedProduct);
  };

  const handleAddDiscount = (productId: string, newDiscount: Discount) => {
    const isValid = validateData(newDiscount);
    if (!isValid) return;

    const prevDiscounts = getEditingProduct(productId)?.discounts;
    if (!prevDiscounts) return;

    updateProduct(productId, "discounts", [...prevDiscounts, newDiscount]);
    setNewDiscount({ quantity: 0, rate: 0 });
  };

  const handleRemoveDiscount = (productId: string, index: number) => {
    const prevDiscounts = getEditingProduct(productId)?.discounts;
    if (!prevDiscounts) return;

    updateProduct(
      productId,
      "discounts",
      prevDiscounts.filter((_: unknown, i: number) => i !== index),
    );
  };

  const clearEditingProduct = () => {
    setEditingProduct(null);
  };

  return {
    editingProduct,
    productInputDataList,
    dicountInputDataList,
    newDiscount,
    handleEditProduct,
    handleAddDiscount,
    handleRemoveDiscount,
    clearEditingProduct,
  };
};
