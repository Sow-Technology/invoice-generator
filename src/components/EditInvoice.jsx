"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTopicForm({
  id,
  phoneNumber,
  storeName,
  customerName,
  amountPaid,
  subTotal,
  tax,
  taxValue,
}) {
  const [newphoneNumber, setNewphoneNumber] = useState(phoneNumber);
  const [newstoreName, setNewstoreName] = useState(storeName);
  const [newCustomerName, setNewCustomerName] = useState(customerName);
  const [newAmountPaid, setNewAmountPaid] = useState(amountPaid);
  const [newSubTotal, setNewSubTotal] = useState(subTotal);
  const [newTax, setNewTax] = useState(tax);
  const [newTaxValue, setNewTaxValue] = useState(taxValue);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/invoice/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newphoneNumber,
          newstoreName,
          newCustomerName,
          newAmountPaid,
          newSubTotal,
          newTax,
          newTaxValue,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewphoneNumber(e.target.value)}
        value={newphoneNumber}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Phone Number"
      />

      <input
        onChange={(e) => setNewstoreName(e.target.value)}
        value={newstoreName}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Store Name"
      />

      <input
        onChange={(e) => setNewCustomerName(e.target.value)}
        value={newCustomerName}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Customer Name"
      />

      <input
        onChange={(e) => setNewAmountPaid(e.target.value)}
        value={newAmountPaid}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Amount Paid"
      />

      <input
        onChange={(e) => setNewSubTotal(e.target.value)}
        value={newSubTotal}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Sub Total"
      />

      <input
        onChange={(e) => setNewTax(e.target.value)}
        value={newTax}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Tax"
      />

      <input
        onChange={(e) => setNewTaxValue(e.target.value)}
        value={newTaxValue}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Tax Value"
      />

      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update Invoice
      </button>
    </form>
  );
}




// "use client";

// import { useInvoiceStore } from "@/store/store";
// import Header from "./sections/Header";
// import MainDetails from "./sections/MainDetails";
// import Notes from "./sections/Notes";
// import TableForm from "./sections/TableForm";
// import { useEffect, useRef, useState } from "react";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
// import { Textarea } from "./ui/textarea";
// import { Button } from "./ui/button";
// import ReactToPrint from "react-to-print";
// import TableContainer from "./sections/Table";
// import { Checkbox } from "./ui/checkbox";
// import Image from "next/image";
// import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
// import axios from "axios";
// import { toast } from "sonner";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import { storesData } from "@/lib/data";
// import { useLocalStorage } from "@uidotdev/usehooks";
// import { redirect, useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import { PiSpinner } from "react-icons/pi";
// import TermsConditions from "./sections/TermsConditions";

// function App({ invoiceId, existingInvoiceData }) {
//   const session = useSession();
//   const {
//     orderNumber,
//     setOrderNumber,
//     customerName,
//     setCustomerName,
//     phoneNumber,
//     setPhoneNumber,
//     emailId,
//     setEmailId,
//     notes,
//     setNotes,
//     subTotal,
//     paymentMode,
//     setTax,
//     paid,
//     setPaid,
//     tax,
//     taxValue,
//     setTaxValue,
//     setPaymentMode,
//     coupon,
//     store,
//     setStore,
//     setProducts,
//     couponDiscount,
//   } = useInvoiceStore();
  
//   const componentRef = useRef();
//   const [isInvoiceSaved, setIsInvoiceSaved] = useState(false);
//   const router = useRouter();
//   const [width] = useState(641);
//   const [items, setItems] = useState([]);
//   const [isPopoverOpen, setIsPopoverOpen] = useState(false);
//   const [existingCustomer, setExistingCustomer] = useState(false);
//   const [isPaymentDone, setIsPaymentDone] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [stores, setStores] = useState([]);
//   const [clientSource, setClientSource] = useState("WalkIn");
//   const [paymentStatus, setPaymentStatus] = useState("Unpaid");

//   useEffect(() => {
//     console.log(paymentMode);
//     if (paymentMode === "upi") {
//       setIsPopoverOpen(true);
//     } else {
//       setIsPopoverOpen(false);
//     }
//   }, [paymentMode]);

//   const PAYMENT_TOLERANCE = 10;

//   const handleReset = async () => {
//     await getInvoiceNumber();
//     setCustomerName("");
//     setPhoneNumber("");
//     setEmailId("");
//     setNotes("");
//     setItems([]);
//     setPaymentMode(null);
//     setTax(0);
//     setProducts([]);
//     setTaxValue(0);
//     setIsPaymentDone(false);
//     setIsInvoiceSaved(false);
//     setClientSource("");
//     setPaymentStatus("Unpaid");
//     setPaid(0);
//   };

//   const handleSubmit = async () => {
//     if (isInvoiceSaved) {
//       toast.error("This invoice has already been saved!");
//       return;
//     }

//     const data = {
//       orderNumber,
//       customerName,
//       phoneNumber,
//       emailId,
//       notes,
//       paymentMode,
//       items,
//       isPaymentDone,
//       subTotal,
//       taxValue,
//       tax,
//       storeName: store.code,
//       coupon,
//       couponDiscount,
//       clientSource,
//       paymentStatus,
//       amountPaid: paid,
//       balance: subTotal - paid,
//     };

//     if (!existingCustomer) {
//       await axios.post("/api/createCustomer", {
//         name: customerName,
//         phoneNumber,
//         emailId,
//       });
//     }

//     // Save or update the invoice based on whether invoiceId is provided
//     const response = invoiceId
//       ? await axios.put(`/api/invoice/${invoiceId}`, data) // Update logic
//       : await axios.post("/api/invoice", data); // Save logic

//     setIsInvoiceSaved(true);

//     getInvoiceNumber().then((res) => {
//       console.log(res);
//       setOrderNumber(res.data);
//     });

//     handleReset();
//   };

//   useEffect(() => {
//     const difference = subTotal - paid;
//     if (paid > 0 && difference > 0 && difference > PAYMENT_TOLERANCE) {
//       setPaymentStatus("Partially Paid");
//     } else if (difference <= PAYMENT_TOLERANCE) {
//       setPaymentStatus("Paid");
//     } else {
//       setPaymentStatus("Unpaid");
//     }
//   }, [paid, subTotal]);

//   useEffect(() => {
//     if (window.innerWidth < width) {
//       alert("Place your phone in landscape mode for the best experience");
//     }
//   }, [width]);

//   const getInvoiceNumber = async () => {
//     setIsLoading(true);
//     const response = await axios.get("/api/newInvoiceNumber");
//     setOrderNumber(response.data);
//     setIsLoading(false);
//     return response;
//   };

//   const getStores = async () => {
//     setIsLoading(true);
//     const response = await axios.get("/api/getStores");
//     console.log(response);
//     setStores(response.data);
//     setIsLoading(false);
//     return response;
//   };

//   useEffect(() => {
//     getInvoiceNumber();
//     getStores();
    
//     // If invoiceId is provided, fetch existing invoice data for updating
//     if (invoiceId) {
//       setCustomerName(existingInvoiceData.customerName);
//       setPhoneNumber(existingInvoiceData.phoneNumber);
//       setEmailId(existingInvoiceData.emailId);
//       setNotes(existingInvoiceData.notes);
//       setItems(existingInvoiceData.items);
//       setPaymentMode(existingInvoiceData.paymentMode);
//       setPaid(existingInvoiceData.amountPaid);
//       setTax(existingInvoiceData.tax);
//       setTaxValue(existingInvoiceData.taxValue);
//       setStore(existingInvoiceData.storeName); // Ensure store is set if relevant
//       setIsInvoiceSaved(true); // Mark as already saved
//     }
//   }, [invoiceId, existingInvoiceData]);

//   const handleFetchCustomerDetails = async () => {
//     toast.loading("Fetching Customer Details", {
//       id: "fetchingCustomerDetails",
//     });
//     const response = await axios.get(
//       `/api/getCustomer?phoneNumber=${phoneNumber}`
//     );
//     if (response.status !== 200) {
//       toast.error("Customer not found! Enter details to create a new customer", {
//         id: "fetchingCustomerDetails",
//       });
//     }
//     setCustomerName(response.data.name);
//     setEmailId(response.data.email);
//     setExistingCustomer(true);
//     toast.success("Customer Details Fetched", {
//       id: "fetchingCustomerDetails",
//     });
//   };

//   const handleStoreChange = (value) => {
//     const activeStore = stores.find((store) => store.code === value);
//     setStore(activeStore);
//     localStorage.setItem("selectedStore", value);
//   };

//   useEffect(() => {
//     const storedData = localStorage.getItem("selectedStore");
//     const activeStore = stores.find((store) => store.code === storedData);
//     setStore(activeStore);
//   }, [setStore, stores]);

//   if (session.status === "unauthenticated") {
//     redirect("/auth");
//   }
//   if (session.status === "authenticated" && session.data.user.role === "user") {
//     // redirect("/unauthorized");
//   }
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <PiSpinner />
//       </div>
//     );
//   }

//   return (
//     <>
//       <main
//         className="m-5 p-5 xl:grid grid-cols-2 gap-10 xl:items-start"
//         style={{ maxWidth: "1920px", margin: "auto" }}
//       >
//         <section>
//           <div className="bg-white p-5 rounded shadow">
//             <div className="flex flex-col justify-center gap-2">
//               <article>
//                 <div className="flex flex-row w-auto items-center gap-2">
//                   <Label htmlFor="" className="md:min-w-[100px]">
//                     Select Store
//                   </Label>
//                   <Select onValueChange={handleStoreChange} value={store?.code}>
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="Select a Store" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {stores?.map((store) => (
//                         <SelectItem key={store.code} value={store.code}>
//                           {store.code}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </article>
//               <article className="grid grid-cols-4 gap-4 md:mt-6 max-lg:space-y-2">
//                 <div className="flex-col gap-3 col-span-2">
//                   <Label htmlFor="phoneNumber">
//                     Enter customer phone number
//                   </Label>
//                   <Input
//                     type="text"
//                     name="phoneNumber"
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                     placeholder="Phone Number"
//                   />
//                   <Button
//                     onClick={handleFetchCustomerDetails}
//                     className="w-full"
//                   >
//                     Fetch Customer
//                   </Button>
//                 </div>
//                 <div className="flex-col gap-3">
//                   <Label htmlFor="orderNumber">Invoice Number</Label>
//                   <Input type="text" value={orderNumber} readOnly />
//                 </div>
//               </article>
//               <article>
//                 <Label htmlFor="customerName">Customer Name</Label>
//                 <Input
//                   type="text"
//                   value={customerName}
//                   onChange={(e) => setCustomerName(e.target.value)}
//                   placeholder="Enter Customer Name"
//                 />
//               </article>
//               <article>
//                 <Label htmlFor="emailId">Customer Email</Label>
//                 <Input
//                   type="text"
//                   value={emailId}
//                   onChange={(e) => setEmailId(e.target.value)}
//                   placeholder="Enter Email"
//                 />
//               </article>
//               <article>
//                 <Label htmlFor="notes">Notes</Label>
//                 <Textarea
//                   value={notes}
//                   onChange={(e) => setNotes(e.target.value)}
//                   placeholder="Additional Notes"
//                 />
//               </article>
//             </div>
//           </div>

//           <div className="flex flex-col justify-center gap-2 mt-4">
//             <div className="flex gap-2">
//               <Button onClick={handleSubmit} className="w-full">
//                 {invoiceId ? "Update Invoice" : "Create Invoice"}
//               </Button>
//               <ReactToPrint
//                 trigger={() => (
//                   <Button className="w-full">Print Invoice</Button>
//                 )}
//                 content={() => componentRef.current}
//               />
//             </div>
//           </div>
//         </section>

//         <section className="md:flex md:flex-col md:justify-between">
//           {/* <MainDetails />
//           <TableContainer />
//           <Notes />
//           <TermsConditions /> */}
//         </section>
//       </main>
//     </>
//   );
// }

// export default App;







