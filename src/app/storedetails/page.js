"use client"; // Marks this as a client component

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

const InvoiceTable = () => {
  const [invoices, setInvoices] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // Track the index of the row being edited
  const [expensesInput, setExpensesInput] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  useEffect(() => {
    const fetchInvoices = async () => {
      const response = await fetch('/api/storedata');
      const data = await response.json();
      setInvoices(data);
    };
  
    fetchInvoices();
  }, []);

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setExpensesInput(invoices[index].orderExpenses?.toString() || ''); // Load current expense value
  };

  const handleExpenseChange = (e) => {
    setExpensesInput(e.target.value); // Update input state as user types
  };

  const handleSaveClick = async (invoiceId, index) => {
    const expenses = parseInt(expensesInput, 10) || 0;

    const updatedInvoices = [...invoices];
    updatedInvoices[index].orderExpenses = expenses;
    setInvoices(updatedInvoices);
    
    await fetch(`/api/storedata/${invoiceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderExpenses: expenses }),
    });

    setEditingIndex(null); // Disable editing after save
  };

  const calculateTotalProfit = (orderValue, orderExpenses) => {
    return orderValue - (parseInt(orderExpenses, 10) || 0);
  };

  const calculateAzspire15 = (totalProfit) => {
    return (totalProfit * 15) / 100;
  };

  const calculateRemainingProfit = (totalProfit, azspire15) => {
    return totalProfit - azspire15;
  };



  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead >Store Name</TableHead>
            <TableHead >Order Date</TableHead>
            <TableHead>Month</TableHead>
            <TableHead>Year</TableHead>
            <TableHead >Order Number</TableHead>
            <TableHead >Customer Phone</TableHead>
            <TableHead >Customer Name</TableHead>
            <TableHead >Order Value</TableHead>
            <TableHead>Order Expenses</TableHead>
            <TableHead>Total Profit</TableHead>
            <TableHead>Azspire 15%</TableHead>
            <TableHead>Remaining Profit</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice, index) => {
            const orderDate = new Date(invoice.createdAt);
            const month = orderDate.toLocaleString('default', { month: 'long' });
            const year = orderDate.getFullYear();
            const orderExpenses = invoice.orderExpenses || 0;
            const totalProfit = calculateTotalProfit(invoice.subTotal, orderExpenses);
            const azspire15 = calculateAzspire15(totalProfit);
            const remainingProfit = calculateRemainingProfit(totalProfit, azspire15);

            return (
              <TableRow key={invoice._id}>
                <TableCell>{invoice.storeName}</TableCell>
                <TableCell>{orderDate.toLocaleDateString()}</TableCell>
                <TableCell>{month}</TableCell>
                <TableCell>{year}</TableCell>
                <TableCell>{invoice.orderNumber}</TableCell>
                <TableCell>{invoice.phoneNumber}</TableCell>
                <TableCell>{invoice.customerName}</TableCell>
                <TableCell>{invoice.subTotal}</TableCell>
                <TableCell>
                  {editingIndex === index ? (
                    <input
                      type="text" // Changed to text to allow string input
                      value={expensesInput} // Bind to expensesInput state
                      onChange={handleExpenseChange}
                    />
                  ) : (
                    invoice.orderExpenses
                  )}
                </TableCell>
                <TableCell>{totalProfit}</TableCell>
                <TableCell>{azspire15}</TableCell>
                <TableCell>{remainingProfit}</TableCell>
                <TableCell>
                  {editingIndex === index ? (
                    <Button onClick={() => handleSaveClick(invoice._id, index)}>
                      Save
                    </Button>
                  ) : (
                    <Button onClick={() => handleEditClick(index)} disabled={invoice.orderExpenses !== undefined}>
                      Edit
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default InvoiceTable;
