import React from 'react';
import { Grid } from '@material-ui/core';

import Product from './Product/Product';

const products = [
  { id:1, name:'Shoes', description:'Nike Shoes', price:'$100' },
  { id:2, name:'Macbook', description:'Apple Laptop', price:'$12000' },
  { id:3, name:'iphone', description:'Apple iphone', price:'$2500' },
  { id:4, name:'bike', description:'Sports Bike', price:'$1500' },
];

const Products = () => {    
  return (
    <main>      
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;