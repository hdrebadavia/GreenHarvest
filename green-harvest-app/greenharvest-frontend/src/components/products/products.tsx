import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';
import SharedLayout from '../shared/shared-layout'; // Import the shared layout
import { getProducts } from '../../services/api';
import { TextField } from '@mui/material';

interface Product {
  ProductId: number;
  Name: string;
  Description: string;
  Price: number;
  imageUrl: string;
  ProductType: string;
  Quantity: number;
  Unit: string;
  StoreId: number;

}

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getProducts()
      .then((response) => {
        setProducts(response.data);
        console.log('Products fetched successfully:', response.data);
        handleSearch({ target: { value: searchTerm } } as React.ChangeEvent<HTMLInputElement>);
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
    <div className="container mt-4">
      <h1 className="text-center mb-4">Products</h1>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search Products"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-12 col-sm-6 col-md-4 mb-4" key={product.ProductId}>
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
    </div>
  );
};

export default ProductPage;