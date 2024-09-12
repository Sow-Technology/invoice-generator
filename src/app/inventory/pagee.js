// src/app/inventory/page.js
'use client';
import React, { useState, useEffect } from 'react';
import { Button, Container, Typography } from '@mui/material';
import ProductTable from './ProductTable';
import ProductDialog from './ProductDialog';

const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch('/api/products');
    if (response.ok) {
      const data = await response.json();
      setProducts(data);
    } else {
      console.error('Failed to fetch products');
    }
  };

  const handleAddClick = () => {
    setCurrentProduct(null);
    setOpenDialog(true);
  };

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setOpenDialog(true);
  };

  const handleDeleteClick = async (code) => {
    const response = await fetch('/api/products', {
      method: 'DELETE',
      body: JSON.stringify({ code }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      fetchProducts();
    } else {
      console.error('Failed to delete product');
    }
  };

  const handleSaveProduct = async (product) => {
    const method = product.code ? 'PUT' : 'POST'; // Use POST if code does not exist
    const response = await fetch('/api/products', {
      method,
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      fetchProducts();
      setOpenDialog(false);
    } else {
      console.error('Failed to save product');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Inventory Management
      </Typography>
      {/* <Button variant="contained" color="primary" onClick={handleAddClick}>
        
      </Button> */}
      <ProductTable
        products={products}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
      {openDialog && (
        <ProductDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onSave={handleSaveProduct}
          product={currentProduct}
        />
      )}
    </Container>
  );
};

export default InventoryPage;
