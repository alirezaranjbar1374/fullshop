"use client"
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import style  from './productcoli.module.css'
import { useProductSingel } from '@/Store/Productsingel/Productsingel';
import { useEffect } from 'react';
import Link from 'next/link';
 


const Productcoli:React.FC = () => {
    const dataproduct = useProductSingel(state => state);
    const { productsingelAll,fetchDatalistproductbefordetile } = dataproduct;
  
    useEffect(() => {
        fetchDatalistproductbefordetile();
    }, [fetchDatalistproductbefordetile]);

    return (
        <Container>
        <Grid>
            <Typography className={style.textchoise} variant='h3'>منتخب محصولات و تخفیف حراج</Typography>
        </Grid>
 <Grid className={style.containerbox}>
 <Grid  container spacing={0} pt={2}>
        {productsingelAll.map((product) => (
          <Grid  item key={product._id} xs={6} sm={6} md={4} lg={3}>
            <Grid className={style.boxconainer} pt={2} >
            <Link href={`/productDetil/${product.title}`}>
            <img className={style.choseimg} src={product.coverasli}/>
            </Link>
<Grid container>

    <Grid item xs={4} md={6} lg={6} >
     
   
            <Button className={style.oofred}>63%</Button>

           
       
         
     
    </Grid>
    <Grid item xs={12} md={6} lg={6}>
        <ul>
        <li>
            <Button className={style.btn}>{product.ofprice}تومان</Button>

            </li>
            <li>
            <Button className={style.btnprice}>{product.price}تومان</Button>
            </li>
         
        </ul>
    </Grid>

</Grid>
            </Grid>
          </Grid>
        ))}

        </Grid>
 </Grid>

    </Container>
    );
}
 
 
export default Productcoli;