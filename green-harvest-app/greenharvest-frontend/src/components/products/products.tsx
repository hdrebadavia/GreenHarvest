import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';
import SharedLayout from '../shared/shared-layout'; // Import the shared layout

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products'); // Replace with your actual API endpoint
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Typography textAlign="center" mt={5}>Loading products...</Typography>;
  }

  if (error) {
    return <Typography textAlign="center" mt={5} color="error">{error}</Typography>;
  }

  return (
    <SharedLayout title="Products">
        <Typography variant="h4" textAlign="center" mb={3}>Our Products</Typography>
        <Grid container spacing={2}>
            <Grid size={4}>
                <Typography>size=8</Typography>
            </Grid>
            <Grid size={8}>
                <Typography>size=8</Typography>
            </Grid>
        </Grid>
    </SharedLayout>
  );
};

export default ProductPage;