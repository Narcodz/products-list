import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { getSingleItem } from '../../services/service';
import { useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Container,
  Rating,
  List, ListItem,
} from '@mui/material';
import { SingleProductType } from '../../types/SingleProductType';

const SingleProduct = () => {
  const theme = useTheme();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [singleProduct, setSingleProduct] = useState<SingleProductType>({});
  const [selectedImage, setSelectedImage] = useState<number>(0);

  function getItem(itemId: number | string = 5) {
    setIsLoading(true);
    getSingleItem(itemId)
      .then(async (res) => {
        await setSingleProduct(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getItem(id);
  }, [id]);

  const calculateDiscountedPrice = (originalPrice: number, discountPercentage: number): string => {
    const discountedPrice = originalPrice - (originalPrice * discountPercentage) / 100;
    return discountedPrice.toFixed(2);
  };

  const handleCarouselChange = (index: number) => {
    setSelectedImage(index);
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      {isLoading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress size={80} thickness={5} sx={{ color: 'primary.main' }} />
        </Box>
      )}
      {!isLoading && (
        <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4 }}>
          <Grid container spacing={4} alignItems="flex-start">
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                sx={{
                  height: 400,
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
                image={singleProduct && singleProduct?.images?.[selectedImage]}
                alt={singleProduct?.title}
              />
              {singleProduct?.images && singleProduct.images.length > 1 && (
                <Box
                  component="div"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 1 }} fontSize={25}>
                    View More
                  </Typography>
                  <List
                    sx={{
                      display: 'flex',
                      overflowX: 'auto',
                      padding: '8px',
                      gap: '8px',
                      justifyContent: 'center',
                      width: '100%'
                    }}
                  >
                    {singleProduct?.images?.map((image, index) => (
                      <ListItem
                        key={index}
                        style={{
                          cursor: 'pointer',
                          width: '100%',
                          height: '100px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                        }}
                      >
                        <img
                          src={image}
                          alt={`Image ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '8px',
                          }}
                          onClick={() => handleCarouselChange(index)}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

            </Grid>

            <Grid item xs={12} md={6}>
              <CardContent>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  {singleProduct.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {singleProduct.description}
                </Typography>
                <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
                  <span style={{ textDecoration: 'line-through', marginRight: '8px', color: theme.palette.text.secondary }}>
                    <strong>${singleProduct.price ?? 'N/A'}</strong>
                  </span>
                  {singleProduct.price !== undefined && singleProduct.discountPercentage !== undefined ? (
                    <span style={{ color: theme.palette.success.main }}>
                      <strong>${calculateDiscountedPrice(singleProduct.price, singleProduct.discountPercentage)}</strong>
                    </span>
                  ) : (
                    <span style={{ color: theme.palette.text.secondary }}>
                      <strong>N/A</strong>
                    </span>
                  )}
                </Typography>
                {singleProduct.rating !== undefined && (
                  <Rating
                    name="product-rating"
                    value={singleProduct.rating}
                    precision={0.5}
                    readOnly
                    sx={{ mb: 2 }}
                  />
                )}
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {singleProduct.discountPercentage}% off
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Remaining in stock: {singleProduct.stock}
                </Typography>
                <Button variant="contained" color="primary">
                  Add to Cart
                </Button>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      )}
    </Container>
  );
};

export default SingleProduct;
