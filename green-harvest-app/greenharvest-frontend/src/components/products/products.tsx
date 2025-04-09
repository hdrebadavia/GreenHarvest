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
    const filtered = products.filter((product) =>
      product.Name.toLocaleLowerCase().includes(value)
    );
    setFilteredProducts(filtered)
  }
  if (loading) {
    return <Typography textAlign="center" mt={5}>Loading products...</Typography>;
  }

  if (error) {
    return <Typography textAlign="center" mt={5} color="error">{error}</Typography>;
  }

  return (
    <SharedLayout title="Products">
        {/* <Typography variant="h4" textAlign="center" mb={3}>Our Products</Typography> */}
        <Box>
          <TextField
            label="Search Products"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Box>
        <Grid container spacing={2}>
            {filteredProducts.map((product) => (
              <Grid size={4} key={product.ProductId} padding={0}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://plus.unsplash.com/premium_photo-1661322640130-f6a1e2c36653?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXBwbGV8ZW58MHx8MHx8fDA%3D"
                    alt={product.Name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.Name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.Description}
                    </Typography>
                    <Typography variant="h6" color="text.primary">
                      ${product.Price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
    </SharedLayout>
  );
};

export default ProductPage;