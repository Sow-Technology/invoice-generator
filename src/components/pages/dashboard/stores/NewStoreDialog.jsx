import { createProduct, updateProduct } from "@/app/_actions/product";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { toast } from "sonner";

export default function NewStoreDialog({ isOpen, setIsOpen }) {
  const [storeData, setStoreData] = useState({
    code: "",
    storeName: "",
    phoneNumber: "",
    address: "",
  });
  const handleSubmit = async () => {
    try {
      const res = await createProduct(storeData);
      console.log(res);
      toast.success("Store created successfully!", {
        id: "create-store",
      });
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create store. Please try again later.", {
        id: "create-store",
      });
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new store</DialogTitle>
          <DialogDescription>Enter the details of the store.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="code" className="text-right">
              Store Code
            </Label>
            <Input
              id="code"
              className="col-span-3"
              value={storeData.code}
              onChange={(e) =>
                setProductData({ ...storeData, code: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="storeName" className="text-right">
              Store Name
            </Label>
            <Input
              id="storeName"
              className="col-span-3"
              value={storeData.storeName}
              onChange={(e) =>
                setProductData({ ...storeData, storeName: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phoneNumber" className="text-right">
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              type="number"
              min="0"
              className="col-span-3"
              value={storeData.phoneNumber}
              onChange={(e) =>
                setProductData({ ...storeData, phoneNumber: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Input
              id="address"
              className="col-span-3"
              value={storeData.address}
              onChange={(e) =>
                setProductData({ ...storeData, address: e.target.value })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
