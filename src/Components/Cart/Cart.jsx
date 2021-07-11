import React from 'react'
import {Container, Typography, Button, Grid} from '@material-ui/core'
import { Link } from 'react-router-dom'
import useStyles from './styles';
import CartItem from './CartItem/CartItem'

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    
    const classes = useStyles();

    const EmptyCart = () => (
        <Typography variant="subtitle1">Ooops, the cart is empty
            <Link to="/" className={classes.link}>  Start adding some items to the cart !!
            </Link>
        </Typography>
    );

    const FilledCart = () => (
        <div>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id} >
                        <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails} gutterBottom>
                <Typography variant="h4">
                    SubTotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                <Button variant="contained" size="large" className={classes.emptyButton} type="button" color="secondary" 
                    onClick={handleEmptyCart} >
                    Empty Cart</Button>
                <Button variant="contained" size="large" className={classes.checkoutButton} type="button" color="primary" 
                component={Link} to="/checkout" >                   
                    Check Out</Button>
                </div>                
            </div>
        </div>
    );
    
    if(!cart.line_items)
    return  '...loading';


    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} variant="h3" gutterBottom>
                Your Shopping Cart
            </Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}

        </Container>
    )
}

export default Cart
