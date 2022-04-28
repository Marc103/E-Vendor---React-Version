import React, { Component } from "react";
import {Grid, ListItem, Typography, Box, Button, ButtonGroup, IconButton } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

export default class Product extends Component{
    constructor(props){
        super(props)
        this.state = {
            current : 0
        }
    }

    handleIncrement = () => {
        if(this.state.current < this.props.quantity){
            this.setState({
                current : (this.state.current + 1)
            });
        }else{
            this.setState({
                current : 0
            })
        }
    };

    handleDecrement = () => {
        

        if(this.state.current > 0 && this.state.current <= this.props.quantity){
            this.setState({
                current : (this.state.current - 1)
            })
        }else{
            this.setState({
                current : 0
            })
        }
    };

    handleAddToCart = () =>{
        this.props.addToCart(this.props.name, this.props.category, 
            this.props.manufacturer, this.state.current,this.props.price, this.props.p_id, this.props.manufacturer_id)
        this.setState({
            current : 0
        })
    }

    /* name category manufacturer price quantity
    sorting / selecting will be done at top level
    */
    render(){        

    return (
        <ListItem>
            <Grid container spacing={3} > 
                <Grid item xs = {2} >
                    <Box sx = {{width:100, height: 50}}>
                    <Typography>
                        {this.props.name}
                    </Typography>
                    </Box>
                </Grid>
                <Grid item xs = {2}>
                    <Box sx = {{width:100, height: 50}}>
                    <Typography>
                        {this.props.category}
                    </Typography>
                    </Box>
                </Grid>
                <Grid item xs = {2}>
                    <Box sx = {{width:100, height: 50}}>
                    <Typography>
                        {this.props.manufacturer}
                    </Typography>
                    </Box>
                </Grid>
                <Grid item xs = {2}>
                    <Box sx = {{width:100, height: 50}}>
                    <Typography>
                        {this.props.price}
                    </Typography>
                    </Box>
                </Grid>
                <Grid item xs = {2}>
                    <Box sx = {{width:130, height: 50}}>
                    <ButtonGroup size="small" aria-label="small outlined button group">
                        <Button startIcon = {<AddIcon/>} onClick = {this.handleIncrement}/>
                        <Button>{this.state.current}</Button>
                        <Button startIcon = {<RemoveIcon/>} onClick = {this.handleDecrement}/>
                    </ButtonGroup>
                    </Box>
                </Grid>
                <Grid item xs = {2}>
                    <Box sx = {{width:100, height: 50}}>
                    {(this.props.quantity > 0) && 
                    <IconButton onClick = {this.handleAddToCart}>
                        <AddShoppingCartIcon color="primary" />
                    </IconButton>}
                    {(this.props.quantity == 0) &&
                    <IconButton>
                        <NotInterestedIcon color ="secondary" />
                    </IconButton>
                    }

                    </Box>
                </Grid>
            </Grid>

        </ListItem>
      );
    }
}

