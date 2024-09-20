import { storesData } from "@/lib/data";
import { useInvoiceStore } from "@/store/store";
import Image from "next/image";
import React from "react";

const Header = () => {
  const { storeName } = useInvoiceStore();

  return (
    <>
      <header className="flex  items-center  mb-5 flex-row justify-between border-t-8 pt-5 border-[#283592]">
        <div>
          {" "}
          <h1 className="text-3xl text-[#6d64e8] mb-3">Jaanavi Opticals</h1>
          <p className="text-[#666666] text-sm max-w-[280px] leading-[25px]">
            {storesData.map((store) => {
              const active = store.name == storeName;
              return (
                <div key={store.name} className={active ? "block" : "hidden"}>
                  <span>{store.address}</span>
                  <span className="block"> {store.phoneNumber}</span>
                </div>
              );
            })}
          </p>
          <h2 className="font-bold text-[#283592] text-5xl mt-7">Invoice</h2>
        </div>
        <div className=" ">
          <Image
            src="/logo.webp"
            alt="Logo"
            width={200}
            height={200}
            className="p-7 pt-0"
          />
        </div>
      </header>
    </>
  );
};

export default Header;
