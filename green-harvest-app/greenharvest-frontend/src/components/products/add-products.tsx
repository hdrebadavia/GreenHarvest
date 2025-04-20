import React, { useEffect, useState } from 'react';
import { addProduct } from '../../services/api';
import { Product } from '../../interfaces/product.interface'; // Import the Product interface
import { userService } from '../../services/user.service';

const AddProducts: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [storeId, setStoreId] = useState(''); // Optional: Add store ID field if needed
  const [createdBy, setCreatedBy] = useState(0);

  // Retrieve the logged-in user's ID from the userService
  useEffect(() => {
    const currentUser = userService.getCurrentUserDetails();
    console.log(userService.getCurrentUserDetails())
    if (currentUser) {
      setCreatedBy(currentUser.UserId); // Assuming the user object has an `id` field
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    const currentUser = userService.getCurrentUserDetails();
    console.log(currentUser)
    if (currentUser) {
      setCreatedBy(currentUser.UserId); // Assuming the user object has an `id` field
    }else{
        setCreatedBy(7);
    }

    console.log(currentUser)
    e.preventDefault();

    // if (!storeId) {
    //   alert('Store ID is required.');
    //   return;
    // }
    // if (!createdBy) {
    //   alert('User is not logged in.');
    //   return;
    // }

    // Create a new product object conforming to the Product interface
    const newProduct: Product = {
      ProductId: 0, // Assuming the backend auto-generates this
      Name: productName,
      Description: description,
      Price: parseFloat(price),
      imageUrl: imageUrl || 'https://via.placeholder.com/150', // Default image if none provided
      ProductType: category,
      Quantity: parseInt(stock, 10),
      Unit: 'pcs', // Default unit, adjust as needed
      StoreId: parseInt(storeId, 10), // Ensure StoreID is a valid number
      CreatedBy: createdBy, // Set CreatedBy to the logged-in user's ID
    };

    try {
      const response = await addProduct(newProduct); // Call the API
      console.log('Product added successfully:', response.data);

      // Reset form fields
      setProductName('');
      setPrice('');
      setDescription('');
      setCategory('');
      setStock('');
      setImageUrl('');
      setStoreId('');
    } catch (error) {
      console.error('Error adding product:', error);
      if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as any).response?.data?.error?.errors === 'object'
      ) {
        const validationErrors = (error as any).response.data.error.errors;
        validationErrors.forEach((err: any) => {
          console.error(`${err.path}: ${err.message}`);
        });
      }
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Product Name:
          </label>
          <input
            type="text"
            id="productName"
            className="form-control"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price:
          </label>
          <input
            type="number"
            id="price"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category:
          </label>
          <input
            type="text"
            id="category"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="stock" className="form-label">
            Stock:
          </label>
          <input
            type="number"
            id="stock"
            className="form-control"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">
            Image URL:
          </label>
          <input
            type="text"
            id="imageUrl"
            className="form-control"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="storeId" className="form-label">
            Store ID:
          </label>
          <input
            type="number"
            id="storeId"
            className="form-control"
            value={storeId}
            onChange={(e) => setStoreId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProducts;