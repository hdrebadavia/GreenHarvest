import React, { useEffect, useState } from 'react';
import { getProductById, getStoreById } from '../../services/api';
import { Product } from '../../interfaces/product.interface';
import SharedLayout from '../shared/shared-layout';
import { useNavigate, useParams } from 'react-router-dom';


const ViewProduct: React.FC = () => {
  const { productId } = useParams<{ productId: string }>(); // Get productId from URL
  const [product, setProduct] = useState<Product | null>(null); // Corrected state type
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState<string | null>(null); // State for error handling
  const [placeholderImage, setPlaceholderImage] = useState<string>('https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?fit=1200%2C800&ssl=1'); // Placeholder image URL
  const [quantity, setQuantity] = useState<number>(1); // State for quantity
  const navigate = useNavigate();

  useEffect(() => {
    const handleGetProduct = async () => {
      try {
        const response = await getProductById(Number(productId));
        console.log('API Response:', response);

        // Check if response.data is a single product object
        const product = response.data;

        // Fetch the store name for the product
        try {
          const storeResponse = await getStoreById(product.StoreID);
          const productWithStoreName = { ...product, StoreName: storeResponse.data.Name };
          setProduct(productWithStoreName); // Set the product with the store name
        } catch (error) {
          console.error(`Error fetching store for product ${product.ProductID}:`, error);
          setProduct({ ...product, StoreName: 'Unknown Store' }); // Fallback if store fetch fails
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    handleGetProduct();
  }, [productId]);

  const handleBack = () => {
    navigate('/products');
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <SharedLayout title="Product Details">
      <div className="container">
        {loading ? (
          <p>Loading product details...</p>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : product ? (
          <div className="container">
            <div className="row mb-2">
              <div className="col-12">
                <span className="text-muted fw-medium" onClick={handleBack} role="button"><i className="bi bi-arrow-left"></i> Products</span>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <img
                  src={product.imageUrl?
                    product.imageUrl : placeholderImage}
                  alt={product.Name}
                  style={{ maxWidth: '100%', height: 'auto', marginBottom: '20px' }}
                />
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="bg-light p-4 rounded-3 mb-2">
                  <div className="row">
                    <div className="col-9">
                      <h2>{product.Name}</h2>
                      <span className="badge bg-success-subtle text-success">{product.ProductType}</span>
                    </div>
                    <div className="col-3 text-end">
                      <span className="fw-bold h3 text-success">${product.Price}</span>
                      <span className="text-muted"> / {product.Unit}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-light p-4 rounded-3 mb-2">
                  <small className="fw-bold text-muted">Description</small>
                  <p className="mb-0">{product.Description}</p>
                </div>
                <div className="bg-light p-4 rounded-3 mb-4">
                  <div className='d-flex justify-content-between align-items-center'>
                    <div>
                      <i className="bi bi-shop-window d-inline"></i> &nbsp;
                      <p className="mb-0 d-inline fw-medium">{product.StoreName}</p>
                    </div>
                    <div>
                      <button className="btn btn-sm btn-primary">Visit Store</button>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <div className="btn-group">
                    <button
                        className="btn btn-outline-secondary"
                        onClick={handleDecreaseQuantity}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="form-control text-center rounded-0 border-black border-end-0 border-start-0"
                        value={quantity}
                      />
                      <button
                        className="btn btn-outline-secondary"
                        onClick={handleIncreaseQuantity}
                      >
                        +
                      </button>
                    </div>

                  </div>
                  <div className="col-9">
                    <button className="btn btn-outline-primary btn-block w-100">
                      <i className="bi bi-cart-plus"></i> Add to Cart
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Product not found.</p>
        )}
      </div>
    </SharedLayout>
  );
};

export default ViewProduct;