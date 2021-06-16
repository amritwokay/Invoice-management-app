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
import EnhancedTable from './table';

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

export default function Corrospondencemodal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      
      <button id="b2" onClick={handleClickOpen}>View Correspondence</button>
      <Dialog 
      onClose={handleClose} 
      //aria-labelledby="customized-dialog-title" 
      open={open}
      maxWidth="true">
      
        <DialogTitle dividers id="dialog" onClose={handleClose}>
          View Corrospondence (2)?
        </DialogTitle>
        <DialogContent dividers id="dialog">
          <Typography style={{color:"#C0C6CA"}}>
          Subject: Order Details - 
          <br/><br/>
          Dear Sir/Madam, 
          <br/><br/>
          Gentle reminder that you have one or more open orders on your account.
          <br/>
          Please get back to us with an expected date of payment. If you have any specific issue with the order(s), please let us know so that we can address it at the earliest. 
          <br/><br/>
          Please find the details of the orders below:
          </Typography>
          <Typography>
            <EnhancedTable/>
          </Typography>
          <Typography>
          In case you have already made a payment for the above items, please send us the details to ensure the payment is posted. 
          <br/>
          Let us know if we can be of any further assistance. 
          <br/>
          Looking forward to hearing from you. 
          <br/>
          Kind Regards, 
          <br/>
          [Sender’s First Name] [Sender’s Last Name] 
          <br/>
          Phone : [Sender’s contact number] 
          <br/>
          Fax : [If any] 
          <br/>
          Email : [Sender’s Email Address] 
          <br/>
          Company Name[Sender’s Company Name]
          </Typography>
        </DialogContent>
        <DialogActions dividers id="dialog">
          <Button autoFocus onClick={handleClose} color="primary" variant="outlined"  style={{textTransform: 'none'}}>
            Cancel
          </Button>
          <Button autoFocus onClick={handleClose} color="primary" variant="contained"  style={{textTransform: 'none'}}>
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}