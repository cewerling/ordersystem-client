// Code from Material UI "Sorting & Selecting" table.
// https://material-ui.com/components/tables/#sorting-amp-selecting

import React, {useState} from 'react';
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
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
// import FilterListIcon from '@material-ui/icons/FilterList';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import UpdateIcon from '@material-ui/icons/Update';
import OrderCreate from './OrderCreate';
import OrderUpdate from './OrderUpdate';
import SnackbarMsg from './SnackbarMsg';
import APIURL from '../helpers/environment';


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
{ id: 'customerName', numeric: false, disablePadding: true, label: 'Cust Name' },
{ id: 'orderNumber', numeric: false, disablePadding: false, label: 'Order #' },
{ id: 'orderPlacedDateTime', numeric: false, disablePadding: false, label: 'Order Date & Time' },
{ id: 'mobilePhone', numeric: false, disablePadding: false, label: 'Mobile #' },
{ id: 'email', numeric: false, disablePadding: false, label: 'Email' },
{ id: 'hostName', numeric: false, disablePadding: false, label: 'Host' },
{ id: 'address1', numeric: false, disablePadding: false, label: 'Address' },
{ id: 'city', numeric: false, disablePadding: false, label: 'City' },
{ id: 'region', numeric: false, disablePadding: false, label: 'State' },
{ id: 'postalCode', numeric: false, disablePadding: false, label: 'Zip' },
{ id: 'orderStatus', numeric: false, disablePadding: false, label: 'Status' },
{ id: 'costSubtotal', numeric: true, disablePadding: false, label: 'Subtotal' },
];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
        <TableRow style={{
            backgroundColor: '#d9d9d9',
        }}>
            <TableCell padding="checkbox">
            <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{ 'aria-label': 'select all orders' }}
            />
            </TableCell>
            {headCells.map((headCell) => (
            <TableCell
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === headCell.id ? order : false}
            >
                <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                >
                <b>{headCell.label}</b>
                {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                ) : null}
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
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));


// ********************
// Handle Delete 
// ********************

// const handleDelete = (selected, token, fetchOrders, setDisplayMsg, setSnackBarMsg) => {
const handleDelete = (selected, token, fetchOrders, setDisplayMsg, setSnackBarStatus) => {
        console.log('IN HANDLEDELETE FUNCTION!!!!!!!!!!!');
    console.log(selected);
    console.log(token);
    console.log(fetchOrders);
    selected.map( (orderId) => {
        // fetch(`http://localhost:3000/orders/${orderId}`, {
        fetch(`${APIURL}/orders/${orderId}`, {
                method: 'DELETE',
            headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
            })
        })
        .then(() => fetchOrders())
    })
    selected.length = 0;   // Clear the selections array.
    setDisplayMsg(true);
    setSnackBarStatus('Order Deleted');
    // setSnackBarMsg('Order Deleted');

}


// ********************
// Handle Create 
// ********************

const handleCreate = (token, fetchOrders) => {
    console.log('IN HANDLECreate FUNCTION!!!!!!!!!!!');
    console.log(token);
    console.log(fetchOrders);


    // // fetch(`http://localhost:3000/orders/`, {
    // fetch(`${APIURL}/orders/`, {
    //     method: 'POST',
    //     headers: new Headers({
    //     'Content-Type': 'application/json',
    //     'Authorization': token
    //     })
    // })
    // .then(() => fetchOrders())
}


// ********************
// Handle Update 
// ********************

const handleUpdate = (selected, token, fetchOrders) => {
    console.log('IN HANDLEUpdate FUNCTION!!!!!!!!!!!');
    console.log(token);
    console.log(fetchOrders);



    let orderId = selected[0];

    // fetch(`http://localhost:3000/orders/${orderId}`, {
    fetch(`${APIURL}/orders/${orderId}`, {
            method: 'PUT',
        headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': token
        })
    })
    .then(() => fetchOrders())

    selected.length = 0;   // Clear the selections array.

}


const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;
    const { selected } = props;
    const { token } = props;
    const { fetchOrders } = props;
    const { setUpdateActive } = props;
    const { setCreateActive } = props;
    const { setSelectedOrder } = props;
    const { setCustomerName } = props;
    const { setOrderNumber } = props;
    const { setMobilePhone } = props;
    const { setEmail } = props;
    const { setHostName } = props;
    const { setAddress1 } = props;
    const { setCity } = props;
    const { setRegion } = props;
    const { setPostalCode } = props;
    const { setOrderStatus } = props;
    const { setCostSubtotal } = props;
    const { setDisplayMsg } = props;
    const { setSnackBarStatus } = props;
    // const { setSnackBarMsg } = props;


    const handleUpdateClick = () => {

        // fetch(`http://localhost:3000/orders/${selected[0]}`, {
        fetch(`${APIURL}/orders/${selected[0]}`, {
                method: 'GET',
            headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
            })
        })
        .then ( (res) => res.json())
        .then ( (orderData) => {
            setSelectedOrder(orderData);
            console.log('###################');
            console.log('selectedOrder =');
            console.log(orderData);
            console.log(orderData[0].customerName);
            setCustomerName(orderData[0].customerName)
            setOrderNumber(orderData[0].orderNumber)
            setMobilePhone(orderData[0].mobilePhone)
            setEmail(orderData[0].email)
            setHostName(orderData[0].hostName)
            setAddress1(orderData[0].address1)
            setCity(orderData[0].city)
            setRegion(orderData[0].region)
            setPostalCode(orderData[0].postalCode)
            setOrderStatus(orderData[0].orderStatus)
            setCostSubtotal(orderData[0].costSubtotal)
        })


        setUpdateActive(true)

        // selected.length = 0;   // Clear the selections array.

    };


    return (
        <Toolbar
            className={clsx(classes.root, {
            [classes.highlight]: numSelected > 0,
            })}
        >
        {numSelected > 0 ? (
            <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
            </Typography>
        ) : (
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Orders
            </Typography>
        )}
        {numSelected == 1 ? (
            <Tooltip title="Update">
                {/* <IconButton aria-label="update" onClick={() => {handleUpdate(selected, token, fetchOrders)}}> */}
                <IconButton aria-label="update" onClick={() => {handleUpdateClick()}}>
                {/* <IconButton aria-label="update" onClick={() => {setUpdateActive(true)}}> */}
                    <UpdateIcon />
                </IconButton>
            </Tooltip>
            ) : (<div></div>)}
        {numSelected > 0 ? (
            <Tooltip title="Delete">
                <IconButton aria-label="delete" onClick={() => {handleDelete(selected, token, fetchOrders, setDisplayMsg, setSnackBarStatus)}}>
                {/* <IconButton aria-label="delete" onClick={() => {handleDelete(selected, token, fetchOrders, setDisplayMsg, setSnackBarMsg)}}> */}
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        ) :
        (
            <Tooltip title="Create">
                {/* <IconButton aria-label="create" onClick={() => {handleCreate(token, fetchOrders)}}> */}
                <IconButton aria-label="create" onClick={() => {setCreateActive(true)}}>
                    <CreateIcon />
                </IconButton>
            </Tooltip>
        )
        }
        {/* } */}
        {/* ) : (
            <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
                <FilterListIcon />
            </IconButton>
            </Tooltip>
        )} */}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 1750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function OrdersTable(props) {
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [updateActive, setUpdateActive] = useState(false);
    const [createActive, setCreateActive] = useState(false);
    const [displayMsg, setDisplayMsg] = useState(false);
    // const [snackBarMsg, setSnackBarMsg] = useState('');
    const [snackBarStatus, setSnackBarStatusBase] = useState('');
    const [selectedOrder, setSelectedOrder] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [orderNumber, setOrderNumber] = useState('');
    const [mobilePhone, setMobilePhone] = useState('');
    const [email, setEmail] = useState('');
    const [hostName, setHostName] = useState('');
    const [address1, setAddress1] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [orderStatus, setOrderStatus] = useState('');
    const [costSubtotal, setCostSubtotal] = useState('');

    const { token } = props;
    const { fetchOrders } = props;

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = props.orders.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
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
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.orders.length - page * rowsPerPage);

    // Clear the selected array (rows that have been checked)
    // Pass this to the OrderUpdate component once the update has been completed.
    const setSelectedLen0 = () => {
        selected.length = 0;
    }

    // Handle the SnackBar Status/Message so that it will display every time.
    const setSnackBarStatus = msg => setSnackBarStatusBase({ msg, date: new Date() });

    return (
        <div className={classes.root}>
        <Paper className={classes.paper}>
            <EnhancedTableToolbar
            numSelected={selected.length}
            selected={selected}
            token={token}
            updateActive={updateActive}
            createActive={createActive}
            setUpdateActive={setUpdateActive}
            setCreateActive={setCreateActive}
            setSelectedOrder={setSelectedOrder}
            setCustomerName={setCustomerName}
            setOrderNumber={setOrderNumber}
            setMobilePhone={setMobilePhone}
            setEmail={setEmail}
            setHostName={setHostName}
            setAddress1={setAddress1}
            setCity={setCity}
            setRegion={setRegion}
            setPostalCode={setPostalCode}
            setOrderStatus={setOrderStatus}
            setCostSubtotal={setCostSubtotal}
            fetchOrders={fetchOrders}
            setDisplayMsg={setDisplayMsg}
            // setSnackBarMsg={setSnackBarMsg} />
            setSnackBarStatus={setSnackBarStatus} />
            <TableContainer>
            <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
                aria-label="enhanced table"
            >
                <EnhancedTableHead
                    classes={classes}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={props.orders.length}
                />
                <TableBody>
                {stableSort(props.orders, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((order, index) => {
                        const isItemSelected = isSelected(order.id);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        const dateTimeLocal = (dateTimeStr) => {
                            let dateTime = new Date(dateTimeStr);
                            return dateTime.toLocaleString('en-US', {dateStyle: 'short', timeStyle: 'short', year: '2-digit'});
                        }
                        const moneyLocal = (moneyStr) => {
                            let amount = new Number(moneyStr);
                            return amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
                        }
                        const phoneUSCanada = (phoneStr) => {
                            var match = phoneStr.match(/^(\d{3})(\d{3})(\d{4})$/);
                            if (match) {
                                return '(' + match[1] + ') ' + match[2] + '-' + match[3];
                            }
                            return null;
                        }

                    return (
                        <TableRow
                            hover
                            onClick={(event) => handleClick(event, order.id)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={order.id}
                            selected={isItemSelected}
                        >
                        <TableCell padding="checkbox">
                            <Checkbox
                                checked={isItemSelected}
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                            {order.customerName}
                        </TableCell>
                        <TableCell align="left">{order.orderNumber}</TableCell>
                        <TableCell align="left">{dateTimeLocal(order.orderPlacedDateTime)}</TableCell>
                        <TableCell align="left">{phoneUSCanada(order.mobilePhone)}</TableCell>
                        <TableCell align="left">{order.email}</TableCell>
                        <TableCell align="left">{order.hostName}</TableCell>
                        <TableCell align="left">{order.address1}</TableCell>
                        <TableCell align="left">{order.city}</TableCell>
                        <TableCell align="left">{order.region}</TableCell>
                        <TableCell align="left">{order.postalCode}</TableCell>
                        <TableCell align="left">{order.orderStatus}</TableCell>
                        <TableCell align="right">{moneyLocal(order.costSubtotal)}</TableCell>
                      </TableRow>
                      );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={props.orders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
        {/* This is the 'Dense Padding' toggle switch.  I took it out as I want it to always be dense.  Then I changed the state variable to default to Dense. */}
        {/* <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
        /> */}
        {/* { createActive ? <OrderCreate setCreateActive={setCreateActive} token={props.token} fetchOrders={fetchOrders} setDisplayMsg={setDisplayMsg} setSnackBarMsg={setSnackBarMsg}  /> : <></>} */}
        { createActive ? <OrderCreate setCreateActive={setCreateActive} token={props.token} fetchOrders={fetchOrders} setDisplayMsg={setDisplayMsg} setSnackBarStatus={setSnackBarStatus}  /> : null}
        { updateActive ? <OrderUpdate
        orderId1={selected[0]}
        customerName1={customerName}
        orderNumber1={orderNumber}
        mobilePhone1={mobilePhone}
        email1={email}
        hostName1={hostName}
        address11={address1}
        city1={city}
        region1={region}
        postalCode1={postalCode}
        orderStatus1={orderStatus}
        costSubtotal1={costSubtotal}
        setUpdateActive={setUpdateActive}
        token={props.token}
        fetchOrders={fetchOrders}
        setDisplayMsg={setDisplayMsg}
        setSnackBarStatus={setSnackBarStatus}
        // setSnackBarMsg={setSnackBarMsg}
        setSelectedLen0={setSelectedLen0} /> : null}
        {/* setSelectedLen0={setSelectedLen0} /> : <></>} */}
        { displayMsg ?
            // <SnackbarMsg msg={snackBarMsg}/>
            <SnackbarMsg key={snackBarStatus.date} msg={snackBarStatus.msg}/>
          : null}
          {/* : <div></div>} */}
        </div>
    );
}


//export default OrdersTable;