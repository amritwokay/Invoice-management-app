import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import editicon from '../assets/edit.svg';
import '../App.css';
import { Grid, TextField, Toolbar } from '@material-ui/core';
import axios from 'axios';


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    
    
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function Editmodal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = () => {
    axios
      .get(
        `http://localhost:8080/1829126/Edit?invoice_id=45678&total_open_amount=111111`
      )
      
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      
      <button id="b4" onClick={handleClickOpen}><img src={editicon} width="14px" height="10px" margin="18"/>Edit</button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >
        <DialogTitle dividers id="dialog" onClose={handleClose}>
        Edit Invoice
        </DialogTitle>
        <DialogContent dividers id="dialog" >
        <Toolbar>
                   <Grid item>
                   <text id="add_dialog_text">Customer Name*</text>
                   </Grid>
                   <Grid item sm></Grid>
                   <Grid item>
                   <TextField id="add_dialog_text" variant="outlined"  name="customer_name" />                  
                   </Grid>        
                   </Toolbar>
                   
                   <Toolbar>
                  <Grid item>
                    <text id="add_dialog_text">Notes</text>
                    </Grid>
                    <Grid item sm={2}></Grid>
                    
                    <TextField  variant="outlined"  name="notes" 
                
                multiline
                rows={4}
                />
                    
                </Toolbar>
        </DialogContent>
        <DialogActions dividers id="dialog">
        <Button autoFocus onClick={handleClose} color="primary" id="hehe" variant="outlined" style={{textTransform: 'none'}}>
             Cancel
           </Button>
          <Button autoFocus onClick={handleClose} color="primary" variant="outlined"  style={{textTransform: 'none'}}>
            Reset
          </Button>
          <Button autoFocus onClick={fetchData} color="primary" variant="contained" style={{textTransform: 'none'}}>
           Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}