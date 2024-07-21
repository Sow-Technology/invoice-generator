import { useInvoiceStore } from "@/store/store";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import DeleteModal from "./DeleteModal";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { productsData } from "@/lib/data";
import { toast } from "sonner";
import { number } from "zod";
import collect from "collect.js";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";

const TableForm = () => {
  const {
    products,
    setProducts,
    total,
    subTotal,
    setSubTotal,
    balance,
    setBalance,
    paid,
    setPaid,
    isEditing,
    setIsEditing,
    showModal,
    setShowModal,
    paymentMode,
    setPaymentMode,
  } = useInvoiceStore();
  const [quantity, setQuantity] = useState(1);
  const [code, setCode] = useState(null);
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState(0);

  const editRow = (id) => {
    const editingRow = products.find((row) => row.id === id);
    setProducts(products.filter((row) => row.id !== id));
    setIsEditing(true);
    setCode(editingRow.code);
    setQuantity(editingRow.quantity);
    setPrice(editingRow.price);
  };

  const calculateTotal = (code, quantity, discount) => {
    const unitPrice = productsData.find((p) => p.code === code)?.price || 0;
    const totalBeforeDiscount = quantity * unitPrice;
    const total = totalBeforeDiscount - (discount / 100) * totalBeforeDiscount;
    return total.toFixed(2); // Truncate to 2 decimal places
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code || !quantity || typeof discount !== "number") {
      toast.error("All the fields are required!");
      return;
    }

    const newTotal = calculateTotal(code, quantity, discount);
    const newProduct = {
      code,
      quantity,
      id: uuidv4(),
      discount,
      total: newTotal,
      unitPrice: productsData.find((p) => p.code === code).price,
      productName: productsData.find((p) => p.code === code).productName,
    };
    setCode(null);
    setQuantity(1);
    setDiscount(0);
    setProducts([...products, newProduct]);
    setIsEditing(false);
  };

  useEffect(() => {
    const allItems = products.map((product) => parseFloat(product.total));
    setSubTotal(collect(allItems).sum().toFixed(2));
  }, [products, setSubTotal]);

  useEffect(() => {
    const balance = subTotal - Number(paid);
    setBalance(
      subTotal >= paid
        ? "₹" + balance.toFixed(2)
        : "-₹" + Math.abs(balance).toFixed(2)
    );
  }, [paid, setBalance, subTotal]);
  const handleDiscountChange = (e, id) => {
    let inputValue = e.target.value;
    if (inputValue.endsWith("%")) {
      inputValue = inputValue.slice(0, -1);
    }
    if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 100) {
      const updatedProducts = products.map((product) => {
        if (product.id === id) {
          const newDiscount = inputValue;
          const newTotal = calculateTotal(
            product.code,
            product.quantity,
            newDiscount
          );
          return { ...product, discount: newDiscount, total: newTotal };
        }
        return product;
      });
      setProducts(updatedProducts);
    }
  };
  const handleDiscount = (e) => {
    let inputValue = e.target.value;

    // Remove the '%' symbol if it's present
    if (inputValue.endsWith("%")) {
      inputValue = inputValue.slice(0, -1);
    }
    console.log(Number(inputValue));
    console.log(typeof inputValue);

    // Ensure the input is a number and within the range 0-100
    if (
      !isNaN(Number(inputValue)) &&
      Number(inputValue) >= 0 &&
      Number(inputValue) <= 100
    ) {
      setDiscount(Number(inputValue));
    }
  };

  const handlePaidChange = (e) => {
    let inputValue = e.target.value;
    if (inputValue.startsWith("₹")) {
      inputValue = inputValue.slice(1);
    }
    if (!isNaN(inputValue) && inputValue >= 0) {
      setPaid(inputValue);
    }
  };

  const handleQuantityChange = (e, id) => {
    const updatedQuantity = e.target.value;
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        const newTotal = calculateTotal(
          product.code,
          updatedQuantity,
          product.discount
        );
        return { ...product, quantity: updatedQuantity, total: newTotal };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const handleCodeChange = (value, id) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        const newTotal = calculateTotal(
          value,
          product.quantity,
          product.discount
        );
        return { ...product, code: value, total: newTotal };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  return (
    <>
      <table width="100%" className="mb-10 overflow-auto">
        {products?.map(
          ({ code, productName, quantity, unitPrice, total, discount, id }) => (
            <React.Fragment key={id}>
              <div className="my-5 flex flex-row justify-between items-center gap-2 flex-wrap">
                <div className="flex flex-1 flex-col items-start gap-2">
                  <Label htmlFor="code">Code</Label>
                  <Select
                    onValueChange={(value) => handleCodeChange(value, id)}
                    value={code}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="code" />
                    </SelectTrigger>
                    <SelectContent>
                      {productsData.map((product) => (
                        <SelectItem key={product.code} value={product.code}>
                          {product.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-1 flex-col items-start gap-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    type="number"
                    name="quantity"
                    id="quantity"
                    placeholder="Quantity"
                    maxLength={33}
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e, id)}
                  />
                </div>

                <div className="flex flex-1 flex-col items-start gap-2">
                  <Label htmlFor="discount">Discount</Label>
                  <Input
                    type="text"
                    name="discount"
                    id="discount"
                    placeholder="Discount"
                    maxLength={33}
                    value={discount + "%"}
                    onChange={(e) => handleDiscountChange(e, id)}
                  />
                </div>
              </div>
              {showModal && <DeleteModal id={id} />}
            </React.Fragment>
          )
        )}
      </table>

      <form
        onSubmit={handleSubmit}
        className="my-5 flex flex-row justify-between items-center gap-2 flex-wrap"
      >
        <div className="flex flex-col flex-1 items-start gap-2">
          <Label htmlFor="code">Code</Label>
          <Select onValueChange={setCode} value={code}>
            <SelectTrigger className="">
              <SelectValue placeholder="code" />
            </SelectTrigger>
            <SelectContent>
              {productsData.map((product) => (
                <SelectItem key={product.code} value={product.code}>
                  {product.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col items-start gap-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            type="number"
            name="quantity"
            id="quantity"
            placeholder="Quantity"
            maxLength={33}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="flex flex-1 flex-col items-start gap-2">
          <Label htmlFor="discount">Discount</Label>
          <Input
            type="text"
            name="discount"
            id="discount"
            placeholder="Discount"
            maxLength={33}
            value={discount + "%"}
            onChange={handleDiscount}
          />
        </div>
        <Button type="submit" className="-400 mt-auto">
          {isEditing ? "Finish Editing" : "Add Product"}
        </Button>
      </form>

      <div className="flex items-center justify-center gap-2 mb-4">
        <Label htmlFor="paid">Amount Paid:</Label>
        <Input
          id="paid"
          name="paid"
          onChange={handlePaidChange}
          value={"₹" + paid}
        />
      </div>

      <div className="flex items-center justify-end gap-20">
        <div>
          <div className="">SubTotal</div>
          <div className="text-primary font-medium">Paid</div>
        </div>
        <div className="text-right">
          <div>₹{subTotal}</div>
          <div className="text-primary font-medium">₹{paid}</div>
        </div>
      </div>
    </>
  );
};

export default TableForm;
