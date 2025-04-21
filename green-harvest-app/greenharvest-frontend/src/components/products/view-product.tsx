import React, { useEffect, useState } from 'react';
import { getProductById } from '../../services/api';
import { Product } from '../../interfaces/product.interface';
import SharedLayout from '../shared/shared-layout';
import { useParams } from 'react-router-dom';


const ViewProduct: React.FC = () => {
  const { productId } = useParams<{ productId: string }>(); // Get productId from URL
  const [product, setProduct] = useState<Product | null>(null); // Corrected state type
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState<string | null>(null); // State for error handling

  useEffect(() => {
    const handleGetProduct = async () => {
      try {
        const response = await getProductById(Number(productId));
        setProduct(response.data);
        console.log(response.data);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    handleGetProduct();
  }, [productId]);

  return (
    <SharedLayout title="Product Details">
      <div className="container">
        <h1>Product Details</h1>

        {loading ? (
          <p>Loading product details...</p>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : product ? (
          <div>
            <h2>{product.Name}</h2>
            <img
              src={product.imageUrl}
              alt={product.Name}
              style={{ maxWidth: '100%', height: 'auto', marginBottom: '20px' }}
            />
            <p>{product.Description}</p>
            <p>
              <strong>Price:</strong> ${product.Price}
            </p>
            <p>
              <strong>Category:</strong> {product.ProductType}
            </p>
            <p>
              <strong>Stock:</strong> {product.Quantity} {product.Unit}
            </p>
            <p>
              <strong>Store:</strong> {product.StoreName}
            </p>
          </div>
        ) : (
          <p>Product not found.</p>
        )}
      </div>
    </SharedLayout>
  );
};

export default ViewProduct;