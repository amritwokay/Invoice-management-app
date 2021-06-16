import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button,CircularProgress,Grid } from '@material-ui/core';
import Deletemodal from './Deletemodal';
import Addmodal from './Addmodal';
import '../App.css';
import Editmodal from './Editmodal';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import '../utils/theme.js'
import Corrospondencemodal from './Corrospondencemodal';
 


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}



const headCells = [
  { id: 'custName', numeric: false, label: 'Customer Name'},
  { id: 'custNumber', numeric: true, label: 'Customer #' },
  { id: 'invoiceId', numeric: true, label: 'Order #' },
  { id: 'totalOpenAmount', numeric: true, label: 'Order Amount' },
  { id: 'dueInDate', numeric: false, label: 'Due Date' },
  { id: 'ppd', numeric: false, label: 'Predicted Payment Date' },
  { id: 'pab', numeric: false, label: 'Predicted Aging Bucket' },
  { id: 'notes', numeric: false, label: 'Notes' },
  
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
            style={{color: '#97A1A9'}}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? 'right' : 'left'}
            // padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{color: '#97A1A9'}}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {/* {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null} */}

            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


const useToolbarStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  // highlight:
  //   {
  //         color: '#2A5368' ,
  //         backgroundColor: '#2A5368',
  //       },
  // highlight:{
  //   backgroundColor: theme.palette.primary.main,
  // },
  title: {
    flex: '1 1 100%',
  },
}));

var newSelected = [];

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <>
    <Toolbar>
      
      <button id="b1">Predict</button>
      <Typography className={classes.title}>  
        <Corrospondencemodal/>
      </Typography> 
      
        <Tooltip><Addmodal/></Tooltip>
        <Tooltip><Editmodal/></Tooltip>
        <Tooltip><Deletemodal data={newSelected}/></Tooltip>
        <Tooltip>
        <input className="search" type="number" placeholder="Search by Order number" />
        </Tooltip>
        

    </Toolbar>
    </>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 750,
    
  },
  box2: {
    background: '#273D49CC 0% 0% no-repeat padding-box',
    overflow: 'hidden',
    opacity: '1',
    marginBottom: theme.spacing(2),
    padding: '1.563rem'
    }
   } 
  )
);

export default function EnhancedTable() {

    var [rows, setResponseData] = React.useState([]);
    let [isNext, isNextFunc] = React.useState(false);
    let [pageCount, setCount] = React.useState(1);
    const fetchData = () => {
      axios
        .get(
          `http://localhost:8080/1828131/LoadServlet?page=${pageCount}&limit=${10}`
        )
        .then((response) => {
          setResponseData([...rows, ...response.data]);
          isNextFunc(true);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    function fetchMoreData() {
      setCount(pageCount + 1);
      fetchData();
    } 

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.custName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  

  const handleClick = (event, invoiceId) => {
    const selectedIndex = selected.indexOf(invoiceId);
    //let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, invoiceId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    //console.log(newSelected);
  };

  

  const isSelected = (invoiceId) => selected.indexOf(invoiceId) !== -1;


  return (
      <div className={classes.box2}>

        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
        <Button type="button" variant="contained" onClick={fetchData}>
        Click to load Data
      </Button>
      {/* {fetchData()} */}

        <InfiniteScroll dataLength={rows.length}  next={fetchMoreData}  hasMore={isNext}
        loader={
          <div style={{ height: "100%", paddingLeft: "50%", overflow: "hidden" }} >
            <CircularProgress />
            
          </div>     }  >

          <Table
            className={classes.table}
            aria-label="enhanced table"
          >
            <EnhancedTableHead

              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              
            />
      

            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))

                .map((row, index) => {
                  const isItemSelected = isSelected(row.invoiceId);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    

                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.invoiceId)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.custName}
                      selected={isItemSelected}
                    >
                      
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          style={{color: '#97A1A9'}}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none" style={{color: '#FFFFFF'}}>
                        {row.custName}
                      </TableCell>
                      <TableCell  style={{color: '#FFFFFF'}}>{row.custNumber}</TableCell>
                      <TableCell style={{color: '#FFFFFF'}}>{row.invoiceId}</TableCell>
                      <TableCell  style={{color: '#FFFFFF'}}>{row.totalOpenAmount}</TableCell>
                      <TableCell  style={{color: '#FFFFFF'}}>{row.dueInDate}</TableCell>
                      <TableCell  style={{color: '#FFFFFF'}}>{row.clearDate}</TableCell>
                      <TableCell  style={{color: '#FFFFFF'}}>{row.pab}Days</TableCell>
                      <TableCell  style={{color: '#FFFFFF'}}>{row.notes} hehe</TableCell>
                    </TableRow>
                    // ))}
                  );
                })}
              {/* {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
          </InfiniteScroll>

        </TableContainer>

        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        /> */}

     
      {/* </div> */}
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding" 
      /> */}
    </div>
  );
}
