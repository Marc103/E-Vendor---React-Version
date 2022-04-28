
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import LoginIcon from '@mui/icons-material/Login';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import MapIcon from '@mui/icons-material/Map';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';



const drawerWidth = 240;
export default function Layout(props){
    return(
        <div>
            <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        onClick = {props.clickHomePage}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Better Buy
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
            <ListItem button key={1} onClick = {props.clickSignIn}>
              <ListItemIcon>
                <LoginIcon /> 
              </ListItemIcon>
              <ListItemText primary="Sign in" />
            </ListItem>

            <ListItem button key={2} onClick = {props.clickShoppingCart}>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Shopping Cart" />
            </ListItem>

            <ListItem button key={3} onClick = {props.clickAccountInformation}>
              <ListItemIcon>
                <DisplaySettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Account Information" />
            </ListItem>

            <ListItem button key={4} onClick = {props.clickManageCards}>
              <ListItemIcon>
                <CreditCardIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Cards" />
            </ListItem>

            <ListItem button key={5} onClick = {props.clickManageAddresses}>
              <ListItemIcon>
                <MapIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Addresses" />
            </ListItem>

            <ListItem button key={6} onClick = {props.clickOrderHistory}>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary="Order History" />
            </ListItem>

            <Divider />

            <ListItem button key={7} onClick = {props.clickLogOut}>
              <ListItemIcon>
                <LogoutIcon /> 
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItem>

        </List>
        
        
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
        </div>

    )
}