import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from '@material-ui/core';
// import OrderCreate from './OrderCreate';
import OrdersTable from './OrdersTable';
// import OrderEdit from './OrderEdit';



const OrdersIndex = (props) => {
    const [orders, setOrders] = useState([]);
    const [updateActive, setUpdateActive] = useState(false);
    const [orderToUpdate, setOrderToUpdate] = useState({});

    const fetchOrders = () => {
        fetch('http://localhost:3000/orders', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then ( (res) => res.json())
        .then ( (ordersData) => {
            setOrders(ordersData);
        })
    }

    const editUpdateOrder = (order) => {
        setOrderToUpdate(order);
        console.log(order);
    }
        
    const updateOn = () => {
        setUpdateActive(true);
    }
        
    const updateOff = () => {
        setUpdateActive(false);
    }

    useEffect(() => {
        fetchOrders();
    }, [])

    return(
        <Container>
            {/* <Row> */}
                {/* <Col md="3"> */}
                    {/* <OrderCreate fetchOrders={fetchOrders} token={props.token} /> */}
                {/* </Col> */}
                {/* <Col md="9"> */}
                    <OrdersTable orders={orders} editUpdateOrder={editUpdateOrder} updateOn={updateOn} fetchOrders={fetchOrders} token={props.token} />
                {/* </Col> */}
                {/* {updateActive ? <OrderEdit orderToUpdate={orderToUpdate} updateOff={updateOff} token={props.token} fetchOrders={fetchOrders}/> : <></>} */}
            {/* </Row> */}
        </Container>
    )

}

export default OrdersIndex;