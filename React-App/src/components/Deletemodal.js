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
import minus from '../assets/minus.svg';
import '../App.css';
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
    backgroundColor: '#2A3F4D 0% 0% no-repeat padding-box',
  },
}))(MuiDialogActions);

export default function Deletedialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  console.log(props.data);
  const fetchData = () => {
    axios
      .get(
        `http://localhost:8080/1829126/Delete?invoice_id=${props.data}`
      )
      
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
    
      <button id="b5" onClick={handleClickOpen}><img src={minus} width="10px" height="10px" margin="18"/> Delete</button>

      <Dialog 
      onClose={handleClose} 
      open={open}>
        
        <DialogTitle id="dialog" onClose={handleClose}>
          Delete record(s)?
        </DialogTitle>
        <DialogContent dividers id="dialog">
          <Typography gutterBottom>
          You'll lose your record(s) after this action. We can't recover them once you delete.
          </Typography>
          <Typography gutterBottom>
          Are you sure you want to <text id="tex">permanently delete</text> them?
          </Typography>
        </DialogContent>
        <DialogActions dividers id="dialog">
          <Button autoFocus onClick={handleClose} color="primary" variant="outlined"  style={{textTransform: 'none'}}>
            Cancel
          </Button>
          <Button autoFocus onClick={fetchData} color="primary" variant="contained"  style={{textTransform: 'none'}}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}