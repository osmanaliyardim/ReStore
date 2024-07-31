import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const HomePage = () => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <>
      <Box sx={{width: "90%", ml: 11, mt: 2}}>
        <Slider {...carouselSettings}>
          <div>
            <img src='/images/hero1.jpg' alt='hero1' style={{display: 'block', width: '100%', maxHeight: 500}}/>
          </div>
          <div>
            <img src='/images/hero2.jpg' alt='hero2' style={{display: 'block', width: '100%', maxHeight: 500}}/>
          </div>
          <div>
            <img src='/images/hero3.jpg' alt='hero3' style={{display: 'block', width: '100%', maxHeight: 500}}/>
          </div>
        </Slider>
      </Box>

      <Box display="flex" justifyContent="center" sx={{mt: 4, mb: 2}}>
        <Typography variant="h1">
          Welcome to the <span style={{color:"#1769aa", fontWeight: "bold"}}>ReStore</span>
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center">
        <Button component={Link} to="/Catalog" variant="contained">START SHOPPING</Button>
      </Box>
    </>
  )
};

export default HomePage;