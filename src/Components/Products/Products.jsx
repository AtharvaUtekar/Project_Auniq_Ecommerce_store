import React from 'react';
import { Grid } from '@material-ui/core';

import Product from './Product/Product';
import useStyles from './styles.js';

const products = [
  { id:1, name:'Shoes', description:'Nike Shoes', price:'$100', image:"http://i.stack.imgur.com/vhoa0.jpg" },
  { id:2, name:'Macbook', description:'Apple Laptop', price:'$12000', image:"http://i.stack.imgur.com/vhoa0.jpg" },
  { id:3, name:'iphone', description:'Apple iphone', price:'$2500', image:"http://i.stack.imgur.com/vhoa0.jpg" },
  { id:4, name:'bike', description:'Sports Bike', price:'$1500', image:"http://i.stack.imgur.com/vhoa0.jpg" },
];

const Products = () => { 
  const classes = useStyles();   
  return (
    <main className={classes.content}> 
    <div className={classes.toolbar}> </div>     
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