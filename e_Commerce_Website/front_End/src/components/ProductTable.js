import { Container } from "@mui/material";
import * as React from 'react';
import Product from "./Product"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Grid } from "@mui/material";


export default function ProductTable(props){
    const [store, setStore] = React.useState('');
    const [manufacturer, setManufacturer] = React.useState('');

    const handleStore = (event) => {
        setStore(event.target.value);
    };
    
    const handleManufacturer = (event) => {
        setManufacturer(event.target.value);
    };
    

    return (
        <Container>
            {console.log(props.storeProducts)}
            {console.log(props.manufacturersTemp)}

            <Grid container space = {12}>

            <Grid item xs ={2} >
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                <InputLabel id="Store">Store</InputLabel>
                <Select
                    labelId="store-select-label"
                    id="store-simple-select"
                    value={store}
                    label="Store"
                    onChange={handleStore}
                >
            {props.storeProducts.map(storeProduct =>
            <MenuItem key = {storeProduct.p} value = {storeProduct.p}>{storeProduct.p}</MenuItem>)}
            </Select>
            </FormControl>
            </Box>
            </Grid>

            <Grid item xs ={2}>
            <Box sx={{ minWidth: 160 }}>
                <FormControl fullWidth>
                <InputLabel id="Manufacturer">Manufacturer</InputLabel>
                <Select
                    labelId="manufacturer-select-label"
                    id="manufacturer-simple-select"
                    value={manufacturer}
                    label="Manufacturer"
                    onChange={handleManufacturer}
                >
            {props.manufacturersTemp.map(manufacturer =>
            <MenuItem key = {manufacturer.manufacturer_name} value = {manufacturer.manufacturer_name}>{manufacturer.manufacturer_name}</MenuItem>)}
            </Select>
            </FormControl>
            </Box>
            </Grid>


            </Grid>

        <Container>
            {props.storeProducts.map(storeProduct =>
                <Product
                key = {storeProduct.p}
                p_id = {storeProduct.p}
                name = {props.products.get(storeProduct.p).p_name}
                category = {props.products.get(storeProduct.p).category}
                manufacturer = {props.manufacturers.get(props.products.get(storeProduct.p).manufacturer).manufacturer_name}
                manufacturer_id = {props.products.get(storeProduct.p).manufacturer}
                price = {props.products.get(storeProduct.p).instore_price}
                quantity = {storeProduct.quantity}
                addToCart = {props.addToCart}>

                </Product>)}
        </Container>
        </Container>
      );
}
