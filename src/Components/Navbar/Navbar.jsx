import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, Menu, MenuItem, Typography } from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';

import logo from '../../Assets/LOGO.png';
import useStyles from './styles.js';

const Navbar = ({totalItems}) => {
    const classes = useStyles();

    return (
        <div>   
            <AppBar position="fixed" className="classes.appBar" color="inherit" >
                <Toolbar>
                    <Typography variant="h6" className="classes.title" color="inherit">
                        <img src={logo} alt="Auniq" height="55px" className="classes.image"/>                     
                    </Typography>                
                
                <div className={classes.grow}></div>
                <div className={classes.button}>
                    <IconButton aria-label="Show Cart Items" color="inherit">
                        <Badge badgeContent={totalItems} color="secondary">
                            <ShoppingCart/>
                        </Badge>
                    </IconButton>
                </div>   
                </Toolbar>             
            </AppBar>            
        </div>
    );
}

export default Navbar
