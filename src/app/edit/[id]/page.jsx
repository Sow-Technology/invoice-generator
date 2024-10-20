import EditInvoice from "@/components/EditInvoice";


const getTopicById = async (id) => {
    console.log("Fetching invoice with ID:", id);  
    try {
        const res = await fetch(`http://localhost:3000/api/invoice/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch invoice");
        }

        const data = await res.json();
        console.log("Fetched data:", data);
        
        return data; // Return the whole data object
    } catch (error) {
        console.error("Error fetching invoice:", error);
        throw error; // Rethrow the error for handling in the calling function
    }
};

export default async function EditTopic({ params }) {
    console.log("Params received:", params);
    const { id } = params;
    console.log("Invoice ID:", id);
    
    // Decode and clean the ID from params
    const decodedString = decodeURIComponent(id);
    const invoiceId = decodedString.replace("id=", ""); // This will get just the ID part
    
    try {
        const { invoice } = await getTopicById(invoiceId);

        // Ensure invoice exists
        if (!invoice) {
            return <div>Invoice not found.</div>; // Handle missing invoice gracefully
        }

        console.log("Invoice data:", invoice);

        const {
            orderNumber,
            phoneNumber,
            storeName,
            customerName,
            amountPaid,
            subTotal,
            tax,
            taxValue,
            emailId,
            coupon,
            couponDiscount,
            paymentMode,
            notes,
            items = [], // Default to empty array if items is undefined
        } = invoice;

        // Create item details
        const itemDetails = items.map(item => ({
            code: item.code,
            quantity: item.quantity,
            discount: item.discount,
        }));

        // Print each item's details from itemDetails
        itemDetails.forEach(item => {
            console.log(`Code: ${item.code}, Quantity: ${item.quantity}, Discount: ${item.discount}`);
        });

        // Pass all relevant fields to EditInvoice
        return (
            <>
            <EditInvoice 
                id={orderNumber} 
                phoneNumber={phoneNumber} 
                storeName={storeName} 
                customerName={customerName} 
                amountPaid={amountPaid} 
                subTotal={subTotal} 
                tax={tax} 
                taxValue={taxValue} 
                emailId={emailId} 
                coupon={coupon} 
                couponDiscount={couponDiscount} 
                paymentMode={paymentMode} 
                notes={notes} 
                items={itemDetails} // Pass item details directly
            />
            </>
        );

    } catch (error) {
        console.error("Error in EditTopic:", error);
        return <div>Error loading invoice. Please try again later.</div>; // Fallback UI
    }
}
