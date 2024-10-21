"use client";
// import EditInvoice from "@/components/pages/dashboard/invoices/EditInvoice";

import EditInvoice from "@/components/pages/dashboard/invoices/EditInvoice";
import { useInvoiceStore } from "@/store/store";
import { useEffect, useState } from "react";





export default function EditTopic({ params }) {
    const [invoice, setInvoice] = useState()
    const [stores, setStores] = useState()
    const[isLoading, setIsLoading] = useState()
    const[isinvoiceloaded, setIsInvoiceLoaded] = useState()
    console.log(invoice)
    console.log("Params received:", params);
    const { id } = params;
    console.log("Invoice ID:", id);
    
    // Decode and clean the ID from params
    const decodedString = decodeURIComponent(id);
    const invoiceId = decodedString.replace("id=", ""); // This will get just the ID part
    
    // try {
    //     const { invoice } = await getTopicById(invoiceId);

    //     // Ensure invoice exists
    //     if (!invoice) {
    //         return <div>Invoice not found.</div>; // Handle missing invoice gracefully
    //     }

    //     console.log("Invoice data:", invoice);

    //     const {
    //         orderNumber,
    //         phoneNumber,
    //         storeName,
    //         customerName,
    //         amountPaid,
    //         subTotal,
    //         tax,
    //         taxValue,
    //         emailId,
    //         coupon,
    //         couponDiscount,
    //         paymentMode,
    //         notes,
    //         items = [], // Default to empty array if items is undefined
    //     } = invoice;

    //     // Create item details
    //     const itemDetails = items.map(item => ({
    //         code: item.code,
    //         quantity: item.quantity,
    //         discount: item.discount,
    //     }));

    //     // Print each item's details from itemDetails
    //     itemDetails.forEach(item => {
    //         console.log(`Code: ${item.code}, Quantity: ${item.quantity}, Discount: ${item.discount}`);
    //     });

        // Pass all relevant fields to EditInvoice
        const {
            setOrderNumber,
            setCustomerName,
            setPhoneNumber,
            setSubTotal,
            setEmailId,
            setProducts,
            setNotes,
            setPaymentMode,
            setTax,
            setTaxValue,
            setPaymentStatus,
            setPaid,
        
            setInvoiceDate,
            setStore, // Store setter
          } = useInvoiceStore();
        
          // Function to fetch all stores
          const getStores = async () => {
            setIsLoading(true);
            setIsInvoiceLoaded(false)
            try {
              const response = await axios.get("/api/getStores");
              setStores(response.data);
            } catch (error) {
              console.error("Error fetching stores:", error);
            } finally {
              setIsLoading(false);
            }
          };
        
          // Filter the store using storeName from invoice
          const findStoreDetails = (storeName) => {
            const storeDetails = stores.find((store) => store.code === storeName);
            return storeDetails || null;
          };
        
          useEffect(() => {
            const getTopicById = async  (id) => {
                setIsLoading(true)
                console.log("Fetching invoice with ID:", id);  
                try {
                    const res = await fetch(`http://localhost:3000/api/invoice/${id}`, {
                        cache: "no-store",
                    });
            
                    if (!res.ok) {
                        throw new Error("Failed to fetch invoice");
                    }
            
                    const data = await res.json();
                    setInvoice(data.invoice)
                    console.log("Fetched data:", data);
                    
                    return data; // Return the whole data object
                } catch (error) {
                    console.error("Error fetching invoice:", error);
                    throw error; // Rethrow the error for handling in the calling function
                }
                finally{
                    setIsLoading(false)
                }

            };
            getTopicById(invoiceId);
            getStores();
            getdata();
          }, []);
          const getdata = async () => {
            if ( !isLoading && stores?.length === 0)  {
              await getStores();
            }
        
            const storeDetails = findStoreDetails(invoice.storeName);
        
            setOrderNumber(invoice.orderNumber);
            setCustomerName(invoice.customerName);
            setPhoneNumber(invoice.phoneNumber);
            setSubTotal(invoice.subTotal);
            setEmailId(invoice.emailId);
            setPaymentMode(invoice.paymentMode);
            setInvoiceDate(new Date(invoice.createdAt).toLocaleDateString());
            setPaid(invoice.amountPaid);
            setTax(invoice.tax);
            setTaxValue(invoice.taxValue);
            setProducts(invoice.items); // Assuming `items` is the products list
            setNotes(invoice.notes);
        
            if (storeDetails) {
              setStore(storeDetails);
              setIsPrintInvoiceDialogOpen(true);
            } else {
              console.warn(
                `Store details not found for store name: ${invoice.storeName}`
              );
            }
          };
        
        //   const handleDeleteClick = (invoice) => {
        //     setSelectedInvoice(invoice);
        //     setIsModalOpen(true);
        //   };
        
        return (
            <>
            <EditInvoice 
            />
            </>
        );

    } 

