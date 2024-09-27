import React from "react";
import CreateCouponsDialog from "./coupons/CreateCouponsDialog";
import CouponsTable from "./CouponsTable";

const data = [
  {
    couponCode: "JOC111",
    discount: "20",
    couponType: "Percent",
    validity: new Date("2024-nov-2"),
    status: "Active",
  },
  {
    couponCode: "JOC112",
    discount: "20",
    couponType: "Percent",
    validity: new Date("2024-nov-2"),
    status: "InActive",
  },
  {
    couponCode: "JOC113",
    discount: "200",
    couponType: "Fixed",
    validity: new Date("2025-jan-2"),
    status: "Active",
  },
  {
    couponCode: "JOC114",
    discount: "200",
    couponType: "Fixed",
    validity: new Date("2025-jan-2"),
    status: "InActive",
  },
  {
    couponCode: "JOC115",
    discount: "200",
    couponType: "Percent",
    validity: new Date("2025-jan-2"),
    status: "InActive",
  },
];
export default function Coupons() {
  return (
    <div className="w-full mx-4 py-4">
      <CouponsTable data={data} />
    </div>
  );
}
