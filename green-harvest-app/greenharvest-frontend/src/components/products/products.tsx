import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import SharedLayout from '../shared/shared-layout'; // Import the shared layout
import { deleteProduct, getProducts, getProductsByStoreId, getStoreById } from '../../services/api';
import AddProducts from './add-products';
import { Product } from '../../interfaces/product.interface'; // Import the Product interface
import { useNavigate } from 'react-router-dom';
import Toast from '../shared/toast';
import { Store } from '../../interfaces/store.interface';

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [store, setStore] = useState<Store>();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [showToast, setShowToast] = useState(false); // State to control toast visibility
  const navigate = useNavigate();
  const [placeholderImage, setPlaceholderImage] = useState<string>('https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?fit=1200%2C800&ssl=1'); // Placeholder image URL
  const [storeId, setStoreId] = useState<number>(1)
  const [productId, setProductId] = useState<number | null>(null)

  const handleGetProducts = async () => {
    try {
      if(storeId){
        const response = await getProductsByStoreId(storeId);
        const productsWithStoreNames = await Promise.all(
          response.data.map(async (product: Product) => {
            try {
              const storeResponse = await getStoreById(product.StoreID);
              return { ...product, StoreName: storeResponse.data.Name }; // Add StoreName to the product
            } catch (error) {
              console.error(`Error fetching store for product ${product.ProductID}:`, error);
              return { ...product, StoreName: 'Unknown Store' }; // Fallback if store fetch fails
            }
          })
        );

        const storeData = await getStoreById(storeId)

        setStore(storeData.data)
        setProducts(productsWithStoreNames);
        setFilteredProducts(productsWithStoreNames);
      }else{
        const response = await getProducts();
        const productsWithStoreNames = await Promise.all(
          response.data.map(async (product: Product) => {
            try {
              const storeResponse = await getStoreById(product.StoreID);
              return { ...product, StoreName: storeResponse.data.Name }; // Add StoreName to the product
            } catch (error) {
              console.error(`Error fetching store for product ${product.ProductID}:`, error);
              return { ...product, StoreName: 'Unknown Store' }; // Fallback if store fetch fails
            }
          })
        );

        setProducts(productsWithStoreNames);
        setFilteredProducts(productsWithStoreNames);
      }

    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewProduct = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      await deleteProduct(productId);
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSuccessMessage = (message: string) => {
    const dismissButton = document.getElementById('dismissOffcanvasButton');
    if (dismissButton) {
      dismissButton.click();
    }

    setSuccessMessage(message);
    setShowToast(true); // Show the toast

    setTimeout(() => {
      setSuccessMessage('');
      setShowToast(false)
    }, 3000);

    handleGetProducts();
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    if(value === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.Name.toLocaleLowerCase().includes(value)
      );
      setFilteredProducts(filtered)
    }
  }

  const handleAddProduct = () => {
    setProductId(null); // Set productId to null for Add mode
  };

  const handleEditProduct = (productId: number) => {
    setProductId(productId); // Set productId for Edit mode
  };

  const handleCloseOffcanvas = () => {
    setProductId(null); // Reset productId when the Offcanvas is closed
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  if (loading) {
    return <Typography textAlign="center" mt={5}>Loading products...</Typography>;
  }

  if (error) {
    return <Typography textAlign="center" mt={5} color="error">{error}</Typography>;
  }

  return (
    <SharedLayout title="Products">
      <div className="container">
        {/* Toast Notification */}
        <Toast
          show={showToast}
          message={successMessage}
          type="success"
          onClose={() => setShowToast(false)}
        />

        <div className="row mb-2">
          <div className="col-lg-5 col-sm-12">
            <h3 className="text-muted fw-bolder">
              {store?.StoreId ? (<span> {store?.Name}</span>) : (<span>Store</span>)}
            </h3>
          </div>
          <div className="col-lg-7 mb-sm-2">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search Products"
                value={searchTerm}
                onChange={handleSearch}
              />
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
            </div>
          </div>
        </div>

        <div className="mb-4 text-start justify-content-end d-flex flex-wrap">
          {/* Toggler Buttons */}
          <div className="border-end">
            <button
              className={`btn ${viewMode === 'card' ? 'btn-success' : 'btn-outline-success'} me-2 btn-sm`}
              onClick={() => setViewMode('card')}
            >
              <i className="bi bi-grid"></i>&nbsp;
              Card View
            </button>
            <button
              className={`btn ${viewMode === 'table' ? 'btn-success' : 'btn-outline-success'} me-2 btn-sm`}
              onClick={() => setViewMode('table')}
            >
              <i className="bi bi-table"></i>&nbsp;
              Table View
            </button>
          </div>
          <div className="ps-1 ms-1">
            <button className="btn btn-sm btn-primary w-100" type="button" data-bs-toggle="offcanvas" data-bs-target="#addProductOffCanvas" aria-controls="addProductOffCanvas">
              <i className="bi bi-plus"></i>
              Add Product
            </button>
          </div>

        </div>

        {/* Products List */}
        {viewMode === 'card' ? (
          <div className="row">
            {filteredProducts.length === 0 ?
              (
                <div className="col-12 text-center">
                  <div className="alert alert-secondary" role="alert">
                    <span>No products found.</span>
                  </div>
                </div>
              ) :
              (
                filteredProducts.map((product, index) => (
                  <div className="col-12 col-sm-6 col-md-4 mb-4" key={product.ProductID || index}>
                    <div className="card h-100" onClick={() => handleViewProduct(product.ProductID)}>
                      <img
                        src={product.imageUrl? product.imageUrl : placeholderImage}
                        className="card-img-top"
                        alt={product.Name}
                        style={{ height: '140px', objectFit: 'cover' }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.Name}</h5>
                        <p className="card-text text-muted">{product.StoreName}</p>
                        <h6 className="card-subtitle text-primary">${product.Price}</h6>
                      </div>
                    </div>
                  </div>
                )
              )
              )}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Product Type</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center">
                          <div className="alert alert-secondary" role="alert">
                            <span>No products found.</span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((product, index) => (
                        <tr key={product.ProductID || index}>
                          <td className="align-middle">{index + 1}</td>
                          <td className="align-middle">{product.Name}</td>
                          <td className="align-middle">{product.ProductType}</td>
                          <td className="align-middle">${product.Price}</td>
                          <td className="align-middle">{product.Quantity} {product.Unit}</td>
                          <td className="align-middle">
                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProduct(product.ProductID)}>
                              <i className="bi bi-trash"></i>
                            </button>
                            &nbsp;
                            <button className="btn btn-warning btn-sm"  data-bs-toggle="offcanvas" data-bs-target="#addProductOffCanvas" aria-controls="addProductOffCanvas" onClick={() => handleEditProduct(product.ProductID)}>
                              <i className="bi bi-pencil"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    )
                }
              </tbody>
            </table>
          </div>
        )}
    </div>

    {/* Offcanvas for Add Product */}
    <div className="offcanvas offcanvas-end m-3 rounded-4 p-3" id="addProductOffCanvas" aria-labelledby="offcanvasLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasLabel">Add Product</h5>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" id="dismissOffcanvasButton" onClick={handleCloseOffcanvas}></button>
      </div>
      <div className="offcanvas-body">
      {productId !== undefined && (
            <AddProducts
              onSuccess={handleSuccessMessage}
              productIdParam={productId!}
            />
          )}
      </div>
    </div>
    </SharedLayout>

  );
};

export default ProductPage;
