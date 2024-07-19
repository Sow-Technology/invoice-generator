import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <>
      <header className="flex  items-center  mb-5 flex-row justify-between border-t-8 pt-5 border-[#283592]">
        <div>
          {" "}
          <h1 className="text-3xl text-[#6d64e8] mb-3">Jaanavi Opticals</h1>
          <p className="text-[#666666] text-sm">
            25, A Narayanapura Main Rd,
            <br />
            Near Muneshwara Temple Opposite Mahadevapura,
            <br />
            Bangalore- 560016
            <br />
            087922 82205
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
