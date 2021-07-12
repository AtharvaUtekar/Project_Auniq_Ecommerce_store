import React, {useState} from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from './CustomTextField'

import {commerce} from '../../lib/Commerce'

const AddressForm = () => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubDivisions, setshippingSubDivisions] = useState([]);
    const [shippingSubDivision, setshippingSubDivision] = useState('');
    const [shippingOptions, setshippingOptions] = useState([]);
    const [shippingOption, setshippingOption] = useState('');
    
    const methods = useForm();

    const fetchShippingCountries = async( checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

        setShippingCountries( countries ); 
    }
     
    return (
        <>
            <Typography variant="h6" gutterbottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit=''>
                    <Grid container spacing={3}>    
                        <FormInput required name='firstName' label="First Name"/>   
                        <FormInput required name='lastName' label="Last Name"/> 
                        <FormInput required name='address1' label="Address line 1"/> 
                        <FormInput required name='email' label="Email Id"/> 
                        <FormInput required name='city' label="City"/> 
                        <FormInput required name='zip' label="Pin Code"/>     
                        {/* 
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={} fullWidth onChange={} >
                                <MenuItem key={ } value={}>
                                    Select Country
                                </MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Sub Division</InputLabel>
                            <Select value={} fullWidth onChange={} >
                                <MenuItem key={ } value={}>
                                    Select Sub Division
                                </MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={} fullWidth onChange={} >
                                <MenuItem key={ } value={}>
                                    Select Options
                                </MenuItem>
                            </Select>
                        </Grid>  

                        */}  
                           
                    </Grid>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
