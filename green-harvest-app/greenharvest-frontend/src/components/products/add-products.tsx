import React, { useEffect, useState } from 'react';
import { addProduct, getProductById } from '../../services/api';
import { Product } from '../../interfaces/product.interface'; // Import the Product interface
import { userService } from '../../services/user.service';
import { useParams } from 'react-router-dom';

interface AddProductsProps {
  onSuccess: (message: string) => void; // Callback function to handle success message
  productIdParam?: number;
  storeId: number
}

const AddProducts: React.FC<AddProductsProps> = ({ onSuccess, productIdParam }) => {
  const { productId } = useParams<{ productId: string }>(); // Get productId from URL
  const [product, setProduct] = useState<Product | null>(null); // Corrected state type
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
    if (productId) {
      handleGetProduct();
      console.log("Product ID: ", productIdParam)
      setStoreId(storeId)
    }
  }, []);

  const handleGetProduct = async () => {
    try {
      const response = await getProductById(Number(productId));
      setProduct(response.data);
      console.log(response.data);
    } catch (err) {
      console.error('Error fetching product details:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatedBy(Number(userService.getCurrentUserDetails()?.id));

    if (!storeId) {
      alert('Store ID is required.');
      return;
    }

    // Create a new product object conforming to the Product interface
    const newProduct: Product = {
      ProductID: 0, // Assuming the backend auto-generates this
      Name: productName,
      Description: description,
      Price: parseFloat(price),
      imageUrl: imageUrl || 'https://via.placeholder.com/150', // Default image if none provided
      ProductType: category,
      Quantity: parseInt(stock, 10),
      Unit: 'pcs', // Default unit, adjust as needed
      StoreID: parseInt(storeId, 10), // Ensure StoreID is a valid number
      CreatedBy: createdBy, // Set CreatedBy to the logged-in user's ID
    };
    try {
      const response = await addProduct(newProduct); // Call the API
      console.log('Product added successfully:', response.data);

      onSuccess('Product added successfully!');

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