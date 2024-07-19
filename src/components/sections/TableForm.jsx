import { useInvoiceStore } from "@/store/store";
import React, { useEffect, useState } from "react";
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
  } = useInvoiceStore();
  const [quantity, setQuantity] = useState(1);
  const [code, setCode] = useState(null);
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState(0);
  console.log(code);
  const editRow = (id) => {
    console.log(id);
    const editingRow = products.find((row) => row.id === id);
    console.log(editingRow);
    setProducts(products.filter((row) => row.id !== id));
    setIsEditing(true);
    setCode(editingRow.code);
    setQuantity(editingRow.quantity);
    setPrice(editingRow.price);
  };

  // Delete function

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code || !quantity || typeof discount == number) {
      toast.error("All the fields are required!");
      console.log(code, quantity, discount);
    }

    const unitPrice = productsData.find((p) => p.code == code).price;
    const totalBeforeDiscount = quantity * unitPrice;
    const total = totalBeforeDiscount - (discount / 100) * totalBeforeDiscount;
    console.log(total);
    const newProduct = {
      code,
      quantity,
      id: uuidv4(),
      discount,
      total,
      unitPrice,
      productName: productsData.find((p) => p.code === code).productName,
    };
    setCode(null);
    setQuantity(1);
    setDiscount(0);
    setProducts([...products, newProduct]);
    setIsEditing(false);
  };
  console.log(products);
  console.log(subTotal);
  useEffect(() => {
    const calculateTotal = () => {
      const allItems = products.map((product) => product.total);
      setSubTotal(collect(allItems).sum());
    };
    calculateTotal();
  }, [products, setSubTotal]);
  const handleDiscountChange = (e) => {
    let inputValue = e.target.value;

    // Remove the '%' symbol if it's present
    if (inputValue.endsWith("%")) {
      inputValue = inputValue.slice(0, -1);
    }

    // Ensure the input is a number and within the range 0-100
    if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 100) {
      setDiscount(inputValue);
    }
  };
  const handlePaidChange = (e) => {
    let inputValue = e.target.value;

    // Remove the '₹' symbol if it's present
    if (inputValue.startsWith("₹")) {
      inputValue = inputValue.slice(1);
    }

    // Ensure the input is a number
    if (!isNaN(inputValue) && inputValue >= 0) {
      setPaid(inputValue);
    }
  };
  const removeSymbol = (string) => {
    return string.replace(/₹/g, "");
  };
  useEffect(() => {
    const handleCalculateBalance = () => {
      const balance = subTotal - removeSymbol(paid);
      console.log(balance);
      console.log(paid);
      console.log(typeof Number(paid.slice(0, 1)));
      console.log(Number(paid.slice(0, 1)));
      if (subTotal >= paid) {
        setBalance("₹" + balance);
      } else {
        setBalance("-₹" + Math.abs(balance));
      }
    };
    handleCalculateBalance();
  }, [paid, setBalance, subTotal]);
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="my-5 flex flex-row justify-between items-center gap-2 flex-wrap"
      >
        <div className="flex flex-col items-start gap-2">
          <Label htmlFor="code">Code</Label>
          <Select onValueChange={setCode} value={code}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="code" />
            </SelectTrigger>
            <SelectContent>
              {productsData.map((product) => {
                return (
                  <SelectItem key={product.code} value={product.code}>
                    {product.code}
                  </SelectItem>
                );
              })}
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
            onChange={handleDiscountChange}
          />
        </div>
        <Button type="submit" className="-400 mt-auto">
          {isEditing ? "Finish Editing" : "Add Product"}
        </Button>
      </form>
      <div className="flex items-center justify-center gap-2 mb-4">
        {" "}
        <Label htmlFor="paid">Amount Paid:</Label>
        <Input
          id="paid"
          name="paid"
          onChange={handlePaidChange}
          value={"₹" + paid}
        />
      </div>
      {/* Table items */}

      <table width="100%" className="mb-10 overflow-auto">
        <thead>
          <tr className="bg-gray-100 p-1 text-primary">
            <td className="font-bold">Code</td>
            <td className="font-bold">Product Name</td>
            <td className="font-bold">Qty</td>
            <td className="font-bold">Unit Price</td>
            <td className="font-bold">Discount</td>
            <td className="font-bold">Total</td>
          </tr>
        </thead>
        {products?.map(
          ({ code, productName, quantity, unitPrice, total, discount, id }) => (
            <React.Fragment key={id}>
              <tbody>
                <tr className="h-10">
                  <td>{code}</td>
                  <td>{productName}</td>
                  <td>{quantity}</td>
                  <td>{unitPrice}</td>
                  <td>{discount}%</td>
                  <td className="amount">{total}</td>
                  <td>
                    <button onClick={() => editRow(id)}>
                      <AiOutlineEdit className="text-green-500 font-bold text-xl" />
                    </button>
                  </td>
                  <td>
                    <button onClick={() => setShowModal(true)}>
                      <AiOutlineDelete className="text-red-500 font-bold text-xl" />
                    </button>
                  </td>
                </tr>
              </tbody>
              {showModal && <DeleteModal id={id} />}
            </React.Fragment>
          )
        )}
      </table>

      <div className="flex items-center justify-end gap-20">
        <div>
          <div className="">SubTotal</div>
          {/* <div className="">Adjustments</div> */}
          <div className="text-primary font-medium">Paid</div>
          <div className="text-primary font-medium text-2xl">Balance</div>
        </div>
        <div className="text-right">
          {" "}
          <div>₹{subTotal}</div>
          {/* <div>{subTotal}</div> */}
          <div className="text-primary font-medium">₹{paid}</div>
          <div className="text-primary text-2xl font-medium">{balance}</div>
        </div>
      </div>
    </>
  );
};

export default TableForm;
