import EditInvoice from "@/components/EditInvoice";

const getTopicById = async (id) => {
    console.log("Reaching here");  
    try {
      const res = await fetch(`http://localhost:3000/api/invoice/${id}`, {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch topic");
      }
  
      console.log("Response hai");
  
      // Await the JSON parsing only once
      const data = await res.json();
      console.log("Response data: ", data);
  
      console.log("Response tha");
      console.log(res);  // Logging the entire response object if needed
  
      return data;
    } catch (error) {
      console.log("Error");
      console.log(error);
    }
  };
  

export default async function EditTopic({ params }) {
  console.log(params)
  const { id } = params;
  console.log(id)
  let decodedString = decodeURIComponent(id);  // This will decode to "id=JO28"

// Now you can remove the 'id=' part to get just 'JO28'
  let ids = decodedString.replace("id=", "");
  const {invoice} = await getTopicById(ids);
  console.log("uyjvjhb")
  console.log(invoice)
  console.log("uyjvjhb")
  const {orderNumber,phoneNumber,storeName,customerName,amountPaid,subTotal,tax,taxValue } = invoice
  console.log({orderNumber,phoneNumber,storeName })
//   const { title, description } = topic;

//   return <EditInvoice id={id} title={title} description={description} />;
  return <EditInvoice id={orderNumber} phoneNumber={phoneNumber} storeName={storeName} customerName={customerName} amountPaid={amountPaid} subTotal={subTotal} tax={tax} taxValue={taxValue} />;
}
