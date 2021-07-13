import React, {useState, useEffect} from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from './CustomTextField'
import {Link} from 'react-router-dom'
import {commerce} from '../../lib/Commerce'

const AddressForm = ({checkoutToken, next}) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubDivisions, setshippingSubDivisions] = useState([]);
    const [shippingSubDivision, setshippingSubDivision] = useState('');
    const [shippingOptions, setshippingOptions] = useState([]);
    const [shippingOption, setshippingOption] = useState('');
    
    const methods = useForm();

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }));
    
    console.log(countries); 
    const fetchShippingCountries = async( checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        
        setShippingCountries( countries ); 
        setShippingCountry(Object.keys(countries)[0]);
    }
    
    const fetchSubdivisions = async( countryCode ) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        
        setshippingSubDivisions( subdivisions ); 
        setshippingSubDivision(Object.keys( subdivisions )[0]);
    }

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region});

        setshippingOptions(options);
        setshippingOption(options[0].id);
    }
    
     
    useEffect(()=>{
        fetchShippingCountries(checkoutToken.id);
    }, []);

    useEffect(()=>{
        if(shippingCountry)  fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);

    useEffect(()=>{
        if(shippingSubDivision)  fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubDivision);
    }, [shippingSubDivision]);


    return (
        <>
            <Typography variant="h6" gutterbottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubDivision, shippingOption }))}>
                    <Grid container spacing={3}>    
                        <FormInput name='firstName' label="First Name"/>   
                        <FormInput name='lastName' label="Last Name"/> 
                        <FormInput name='address1' label="Address line 1"/> 
                        <FormInput name='email' label="Email Id"/> 
                        <FormInput name='city' label="City"/> 
                        <FormInput name='zip' label="Pin Code"/>     
                        
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                     {item.label}
                                </MenuItem>
                             ))}
                            </Select>
                        </Grid>
                         
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubDivision} fullWidth onChange={(e) => setshippingSubDivision(e.target.value)}>
                            {Object.entries(shippingSubDivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.label}
                                </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setshippingOption(e.target.value)}>
                                {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.label}
                                </MenuItem>
                                ))}
                             </Select>
                        </Grid>   
                    </Grid>

                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
                        <Button type="submit" variant="contained" color="primary">Next</Button>
                    </div>

                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
