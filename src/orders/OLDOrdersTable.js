// Code from Material UI "Dense Table".
// https://material-ui.com/components/tables/#dense-table
// Replaced this with the "Sorting & Selecting" Table:
// https://material-ui.com/components/tables/#sorting-amp-selecting

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import APIURL from '../helpers/environment';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }
  
// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];
  
  

const OrdersTable = (props) => {

    const classes = useStyles();

    const deleteOrder = (order) => {
        // fetch(`http://localhost:3000/orders/${order.id}`, {
        fetch(`${APIURL}/orders/${order.id}`, {
                method: 'DELETE',
            headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': props.token
            })
        })
        .then(() => props.fetchOrders())
    }


    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell>Cust&nbsp;ID</TableCell>
                <TableCell align="right">Order&nbsp;#</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">City</TableCell>
                <TableCell align="right">Mobile&nbsp;#</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {props.orders.map((order) => (
                <TableRow key={order.id} hover={true}>
                    <TableCell component="th" scope="row">{order.id}</TableCell>
                    <TableCell align="right">{order.orderNumber}</TableCell>
                    <TableCell align="right">{order.email}</TableCell>
                    <TableCell align="right">{order.city}</TableCell>
                    <TableCell align="right">{order.mobilePhone}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    )
}

export default OrdersTable;