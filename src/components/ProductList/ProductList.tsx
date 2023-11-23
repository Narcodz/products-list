import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import type { RootState } from '../../redux/store';
import { getAllItems, searchItem } from '../../services/service';
import { setError } from '../../redux/itemsSlice';
import { setLoading } from '../../redux/loadingSlice';
import { AppDispatch } from '../../redux/store';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Grid,
  TextField,
  IconButton,
  Box,
  CircularProgress,
  Container,
  Pagination,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const itemsError = useSelector((state: RootState) => state.items.error);
  const dispatch: AppDispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(setLoading(true));
    getAllRequest();
  }, []);

  const getAllRequest = () => {

    getAllItems()
      .then((res: any) => {
        setDataSource(res.data.products);
        dispatch(setError(null));
      })
      .catch((err) => {
        dispatch(setError("Failed to fetch items"));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
    setDataSource([]);
    dispatch(setLoading(true));
    searchItem(event.target.value)
      .then((res) => {
        setDataSource(res.data.products);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const handleClick = (id: number) => {
    navigate('/singleItem/' + id);
  };

  const totalPages = Math.ceil(dataSource.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = dataSource.slice(startIndex, endIndex);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (


    <Container maxWidth="lg" sx={{ marginTop: 4, padding: '0' }}>
      
      <Typography variant="h3" sx={{ mb: 4, fontWeight: '350', textAlign: 'center', lineHeight: '1.2' }}>
        Product Catalog
      </Typography>
      {itemsError && (
        <Typography variant="body1" align="center" color="error">
          Error: {itemsError}
        </Typography>
      )}
      <form>
        <Box display="flex" justifyContent="center">
          <TextField
            sx={{ marginBottom: '20px' }}
            label="Search"
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <IconButton type="submit" size="small">
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </Box>
      </form>
      {isLoading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress
            size={80}
            thickness={5}
            sx={{ color: 'primary.main' }}
          />
        </Box>
      )}
      {!isLoading && displayedItems.length === 0 && (
        <Typography variant="body1" align="center">
          No items found.
        </Typography>
      )}
      {!isLoading && displayedItems.length > 0 && (
        <Grid container spacing={2}>
          {displayedItems.map((item: any, index: any) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3} alignItems="center">
              <Card
                sx={{
                  height: '100%',
                  transition: 'transform 0.2s ease-in-out',
                  cursor: 'pointer',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
                onClick={() => handleClick(item.id)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={item.images[0]}
                  alt={item.title}
                  style={{ objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
                />
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body1">Price: ${item.price}</Typography>
                  <Typography variant="body1">Discount: {item.discountPercentage}%</Typography>
                  <Typography variant="body1">Remaining: {item.stock}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
        </Box>
      )}
    </Container>
  );
};

export default ProductList;
