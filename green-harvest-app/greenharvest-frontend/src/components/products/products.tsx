import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import SharedLayout from '../shared/shared-layout'; // Import the shared layout
import { getProducts } from '../../services/api';
import AddProducts from './add-products';
import { Product } from '../../interfaces/product.interface'; // Import the Product interface

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');

  useEffect(() => {
    getProducts()
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
  if (loading) {
    return <Typography textAlign="center" mt={5}>Loading products...</Typography>;
  }

  if (error) {
    return <Typography textAlign="center" mt={5} color="error">{error}</Typography>;
  }

  return (
    <SharedLayout title="Products">
      <div className="container">
        <div className="row mb-2">
          <div className="col-lg-9 mb-sm-2">
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
          <div className="col-lg-3 col-sm-12">
            <button className="btn btn-primary w-100" type="button" data-bs-toggle="offcanvas" data-bs-target="#addProductOffCanvas" aria-controls="addProductOffCanvas">
              <i className="bi bi-plus"></i>
              Add Product
            </button>
          </div>
        </div>
        
        <div className="mb-4 text-start">
          {/* Toggler Buttons */}
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

        {/* Products List */}
        {viewMode === 'card' ? (
          <div className="row">
            {filteredProducts.map((product, index) => (
              <div className="col-12 col-sm-6 col-md-4 mb-4" key={product.ProductId || index}>
                <div className="card h-100">
                  <img
                    src={product.imageUrl}
                    className="card-img-top"
                    alt={product.Name}
                    style={{ height: '140px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.Name}</h5>
                    <p className="card-text text-muted">{product.Description}</p>
                    <h6 className="card-subtitle text-primary">${product.Price}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped">
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
                {filteredProducts.map((product, index) => (
                  <tr key={product.ProductId || index}>
                    <td className="align-middle">{index + 1}</td>
                    <td className="align-middle">{product.Name}</td>
                    <td className="align-middle">{product.ProductType}</td>
                    <td className="align-middle">${product.Price}</td>
                    <td className="align-middle">{product.Quantity} {product.Unit}</td>
                    <td className="align-middle">
                      <button className="btn btn-danger btn-sm">
                        <i className="bi bi-trash"></i>
                      </button>
                      &nbsp;
                      <button className="btn btn-warning btn-sm">
                        <i className="bi bi-pencil"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </div>

    {/* Offcanvas for Add Product */}
    <div className="offcanvas offcanvas-end" id="addProductOffCanvas" aria-labelledby="offcanvasLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasLabel">Add Product</h5>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <AddProducts></AddProducts>
      </div>
    </div>
    </SharedLayout>
    
  );
};

export default ProductPage;