import React from 'react';
import productLogo from '../assets/productLogo.svg';
import companyLogo from '../assets/companyLogo.svg';
import '../App.css';
import { Grid, makeStyles } from '@material-ui/core';
import EnhancedTable from './table';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
 
}));

function Header() {
  const classes = useStyles();
    return (
    <>
        <div className="root">
          <Grid container spacing={1}>
          <Grid item xs> 
            <img src={productLogo} alt="" className="App-logo1"/>
          </Grid> 
          <Grid item xs> 
            <img src={companyLogo}  alt="" className="App-logo2"/>
          </Grid>
          </Grid> 
          
            <h2 style={{color: 'white'}}>Order List</h2>
            
            <EnhancedTable/>
            
            <br/>
        </div>
    </>
    );
  }

  export default Header;