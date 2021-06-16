import React from 'react';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import plus from '../assets/plus.svg';
import '../App.css';
import { DialogContentText, Grid, TextField, Toolbar, useMediaQuery } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { styles } from '@material-ui/pickers/views/Calendar/Calendar';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  root:{
    margin: 0,
    padding: theme.spacing(2),
            // '& .MuiFormControl-root':{
            //     width:"100%",
            //     margin:theme.spacing(1)
            // }
        },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding:'2rem',
    backgroundColor: '#2A3F4D 0% 0% no-repeat padding-box',
    boxShadow: '0px 8px 24px #00000029',
    borderRadius:'0px',
    Opacity:'1',
   
  },
  card: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(20),
      height: theme.spacing(20),
    }
    
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

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


export default function Addmodal() {
  const classes=useStyles();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const initialFvalues={
    customer_name:"",
    customer_number:"",
    notes:"",
    invoice_no:"",
    invoice_amount:""
}

    const [values,setValues]=React.useState(initialFvalues);

    const handleInputChange = e =>{
      
        const {name,value}= e.target
        setValues({
            ...values,
            [name]:value
        })
    }

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const fetchData = () => {
    var customer_number = document.getElementById('customer_number').value
    
    var customer_name = document.getElementById('customer_name').value
    console.log(customer_name);
    var invoice_no = document.getElementById('invoice_no').value
    var invoice_amount = document.getElementById('invoice_amount').value
    //var due_in_date = document.getElementById('due_in_date').value
    //var notes = document.getElementsByName('notes')
    axios
      .get(
        `http://localhost:8080/1828131/Add?name_customer=${customer_name}&cust_number=${customer_number}&invoice_id=${invoice_no}&total_open_amount=${invoice_amount}&due_in_date=${selectedDate}&doc_id=10`
      )
      
      .catch((error) => {
        console.log(error);
      });
  };

  return(
    <div>
      <button id="b3" onClick={handleClickOpen}><img src={plus}  alt="" /> Add </button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}
      fullWidth
            maxWidth="md"
            className={classes.paper}
            fullScreen={fullScreen}    
      >
        
      <DialogTitle dividers id="dialog" onClose={handleClose}>
          Add Order(s)
        </DialogTitle>
        <DialogContent dividers id="dialog" >
        <DialogContentText>


         <form className={classes.root}>
              <Grid container>
                  <Grid item xs={6}>

                    <Toolbar>
                    <Grid item>
                    <text style={{color:"#97A1A9"}}>Customer Name*</text>
                    </Grid>
                    <Grid item sm></Grid>
                    <Grid item>
                    <TextField style={{color:'#97A1A'}} variant="outlined"  id="customer_name" name="customer_name" value={values.customer_name}
                     onChange={handleInputChange}/>                  
                    </Grid>        
                    </Toolbar>
                   
                    <Toolbar>
                      <Grid item>
                      <text style={{color:"#97A1A9"}}>Customer No.*</text>    
                      </Grid>
                      <Grid item sm></Grid>
                      <Grid item>
                      <TextField id="customer_number" variant="outlined"  name="customer_number" value={values.customer_number} onChange={handleInputChange}/>
                      </Grid>
                    </Toolbar>
                   
                    <Toolbar>
                       <Grid item>
                       <text style={{color:"#97A1A9"}}>Order No*</text>
                         </Grid> 
                         <Grid item sm></Grid>
                         <Grid item>
                       <TextField id="invoice_no" variant="outlined"  name="invoice_no" value={values.invoice_no}
                    onChange={handleInputChange}/>
                        </Grid>
                    </Toolbar> 
                   
                   <Toolbar>
                     <Grid item>
                     <text style={{color:"#97A1A9"}}>Order Amount*</text>
                     </Grid>
                     <Grid item sm></Grid>
                     <Grid item>
                     <TextField id="invoice_amount" variant="outlined"  name="invoice_amount" value={values.invoice_amount}
                    onChange={handleInputChange}/>
                     </Grid>
                   </Toolbar>
                  
                </Grid>

                <Grid item xs={6}>

                  <Toolbar>
                    <Grid item>
                    <text style={{color:"#97A1A9"}}>Due in Date*</text>
                    </Grid>
                    <Grid item sm></Grid>
                    <Grid item>
                  
                <MuiPickersUtilsProvider utils={DateFnsUtils}  >
                <KeyboardDatePicker   disableToolbar inputVariant="outlined" id="due_in_date" 
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          //id="date-picker-inline"
          //label="Due in Date"
          value={selectedDate}
          name="due_in_date"
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
            
          
          />
                </MuiPickersUtilsProvider>
                    </Grid>
                  </Toolbar>

                <Toolbar>
                  <Grid item>
                    <text style={{color:"#97A1A9"}}>Notes</text>
                    </Grid>
                    <Grid item sm={3}></Grid>
                    <Grid item>
                    <TextField  variant="outlined"  name="notes" value={values.notes}
                onChange={handleInputChange} 
                
                rows={4}
                id="add_dialog_textField"
                />
                    </Grid>
                    
                    
                </Toolbar>
                </Grid>
            </Grid>
        </form>

          </DialogContentText>


        </DialogContent>

        <DialogActions dividers id="dialog">
          <Toolbar>
         <Button autoFocus onClick={handleClose} color="primary" variant="outlined" style={{textTransform: 'none'}}>
             Cancel
           </Button>
           </Toolbar>
           <Button autoFocus onClick={handleClose} color="primary" variant="outlined" style={{textTransform: 'none'}}>
             Clear
           </Button>
           <Button onClick={fetchData} color="primary" autoFocus variant="contained"  style={{textTransform: 'none'}}>
             Add
           </Button>

         </DialogActions>


      </Dialog>
    </div>
  );


}