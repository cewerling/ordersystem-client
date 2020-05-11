import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import APIURL from '../helpers/environment';


const OrderUpdate = (props) => {

    const { selectedOrder } = props;
    const { orderId1 } = props;
    const { customerName1 } = props;
    const { orderNumber1 } = props;
    const { mobilePhone1 } = props;
    const { email1 } = props;
    const { hostName1 } = props;
    const { address11 } = props;
    const { city1 } = props;
    const { region1 } = props;
    const { postalCode1 } = props;
    const { orderStatus1 } = props;
    const { costSubtotal1 } = props;
    const { setUpdateActive } = props;
    const { token } = props;
    const { fetchOrders } = props;
    // 5/11/20 - setDisplayMsg MAY not be needed, especially with changing "setSnackBarMsg" to "setSnackBarStatus".
    const { setDisplayMsg } = props;
    const { setSnackBarStatus } = props;
    // const { setSnackBarMsg } = props;
    const { setSelectedLen0 } = props;

    const [open, setOpen] = useState(true);
    const [orderId, setOrderId] = useState(orderId1);
    const [customerName, setCustomerName] = useState(customerName1);
    const [orderNumber, setOrderNumber] = useState(orderNumber1);
    const [mobilePhone, setMobilePhone] = useState(mobilePhone1);
    const [email, setEmail] = useState(email1);
    const [hostName, setHostName] = useState(hostName1);
    const [address1, setAddress1] = useState(address11);
    const [city, setCity] = useState(city1);
    const [region, setRegion] = useState(region1);
    const [postalCode, setPostalCode] = useState(postalCode1);
    const [orderStatus, setOrderStatus] = useState(orderStatus1);
    const [costSubtotal, setCostSubtotal] = useState(costSubtotal1.slice(0, -2));

    const [customerNameError, setCustomerNameError] = useState(false);
    const [orderNumberError, setOrderNumberError] = useState(false);
    const [mobilePhoneError, setMobilePhoneError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [hostNameError, setHostNameError] = useState(false);
    const [address1Error, setAddress1Error] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [regionError, setRegionError] = useState(false);
    const [postalCodeError, setPostalCodeError] = useState(false);
    const [orderStatusError, setOrderStatusError] = useState(false);
    const [costSubtotalError, setCostSubtotalError] = useState(false);

    const [customerNameHelperText, setCustomerNameHelperText] = useState(false);
    const [orderNumberHelperText, setOrderNumberHelperText] = useState(false);
    const [mobilePhoneHelperText, setMobilePhoneHelperText] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState(false);
    const [hostNameHelperText, setHostNameHelperText] = useState(false);
    const [address1HelperText, setAddress1HelperText] = useState(false);
    const [cityHelperText, setCityHelperText] = useState(false);
    const [regionHelperText, setRegionHelperText] = useState(false);
    const [postalCodeHelperText, setPostalCodeHelperText] = useState(false);
    const [orderStatusHelperText, setOrderStatusHelperText] = useState(false);
    const [costSubtotalHelperText, setCostSubtotalHelperText] = useState(false);

    useEffect(() => {
        setOrderId(orderId1);
    }, [orderId1])

    useEffect(() => {
        setCustomerName(customerName1);
    }, [customerName1])

    useEffect(() => {
        setOrderNumber(orderNumber1);
    }, [orderNumber1])

    useEffect(() => {
        setMobilePhone(mobilePhone1);
    }, [mobilePhone1])

    useEffect(() => {
        setEmail(email1);
    }, [email1])

    useEffect(() => {
        setHostName(hostName1);
    }, [hostName1])

    useEffect(() => {
        setAddress1(address11);
    }, [address11])

    useEffect(() => {
        setCity(city1);
    }, [city1])

    useEffect(() => {
        setRegion(region1);
    }, [region1])

    useEffect(() => {
        setPostalCode(postalCode1);
    }, [postalCode1])

    useEffect(() => {
        setOrderStatus(orderStatus1);
    }, [orderStatus1])

    useEffect(() => {
        setCostSubtotal(costSubtotal1.slice(0, -2));
    }, [costSubtotal1])


    const handleClose = () => {
        setOpen(false);
        setUpdateActive(false);
        fetchOrders();
        setSelectedLen0();
    };

    const handleUpdate = () => {

        console.log(customerName);

        var validationError = false;
        setDisplayMsg(false);  // 5/11/20 - Probably not needed.
        setSnackBarStatus('');  // 5/11/20 - Probably not needed.
        // setSnackBarMsg('');


        // Validate Customer Name - 2-255 Characters
        let nameRegEx = /^.{2,255}$/;
        if (!nameRegEx.test(customerName)) {
            validationError = true;
            setCustomerNameError(true);
            setCustomerNameHelperText('Invalid Customer Name');
        } else {
            setCustomerNameError(false);
            setCustomerNameHelperText('');
        }

        // Validate Order # - Only digits, characters, & spaces - max 255
        let orderNumRegEx = /^[A-Za-z0-9 ]{1,255}$/;
        if (!orderNumRegEx.test(orderNumber)) {
            validationError = true;
            setOrderNumberError(true);
            setOrderNumberHelperText('Invalid Order Number');
        } else {
            setOrderNumberError(false);
            setOrderNumberHelperText('');
        }

        // Validate Mobile # - 10 digits long
        let mobileNumRegEx = /^\d{10}$/;
        if (!mobileNumRegEx.test(mobilePhone)) {
            validationError = true;
            setMobilePhoneError(true);
            setMobilePhoneHelperText('Invalid Phone # - Please enter only numbers, such as 9987654321');
        } else {
            setMobilePhoneError(false);
            setMobilePhoneHelperText('');
        }

        // Validate Email - 10 digits long
        let emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegEx.test(email)) {
            validationError = true;
            setEmailError(true);
            setEmailHelperText('Invalid Email Address');
        } else {
            setEmailError(false);
            setEmailHelperText('');
        }

        // Validate Host Name - 2-255 Characters
        if (!nameRegEx.test(hostName)) {
            validationError = true;
            setHostNameError(true);
            setHostNameHelperText('Invalid Host Name');
        } else {
            setHostNameError(false);
            setHostNameHelperText('');
        }

        // Validate Street Address - 3-255 Characters
        let address1RegEx = /^.{3,255}$/;
        if (!address1RegEx.test(address1)) {
            validationError = true;
            setAddress1Error(true);
            setAddress1HelperText('Invalid Street Address');
        } else {
            setAddress1Error(false);
            setAddress1HelperText('');
        }

        // Validate City - 2-255 Characters
        if (!nameRegEx.test(city)) {
            validationError = true;
            setCityError(true);
            setCityHelperText('Invalid City');
        } else {
            setCityError(false);
            setCityHelperText('');
        }

        // Validate Region (US State) - 2 Capital Letters
        let regionRegEx = /[A-Z]{2}$/;
        if (!regionRegEx.test(region)) {
            validationError = true;
            setRegionError(true);
            setRegionHelperText('Invalid State - example: CA, NV, NY, IN');
        } else {
            setRegionError(false);
            setRegionHelperText('');
        }

        // Validate Postal Code (US Zip) - 5-10 Characters
        let postalCodeRegEx = /^[0-9-]{5,10}$/;
        if (!postalCodeRegEx.test(postalCode)) {
            validationError = true;
            setPostalCodeError(true);
            setPostalCodeHelperText('Invalid Zip Code');
        } else {
            setPostalCodeError(false);
            setPostalCodeHelperText('');
        }

        // Validate Order Status - At least 1 character (validates they selected something)
        let orderStatusRegEx = /^.{1,255}$/;
        if (!orderStatusRegEx.test(orderStatus)) {
            validationError = true;
            setOrderStatusError(true);
        } else {
            setOrderStatusError(false);
        }

        // Validate Subtotal - In format 99 or 99.9900
        // One or more digits followed by optional . followed by 1-2 digits
        let costSubtotalRegEx = /^\d*\.?\d{2}$/;
        if (!costSubtotalRegEx.test(costSubtotal)) {
            validationError = true;
            setCostSubtotalError(true);
            setCostSubtotalHelperText('Invalid Amount - no $ and must be in format of 99 or 99.09');
        } else {
            setCostSubtotalError(false);
            setCostSubtotalHelperText('');
        }


        console.log('validationError = ' + validationError);

        // If no errors, update the order in the database.

        if (!validationError) {

            console.log('Made it inside if to do the Fetch/PUT.');

            let orderData = {
                customerName: customerName,
                orderNumber: orderNumber,
                mobilePhone: mobilePhone,
                email: email,
                hostName: hostName,
                address1: address1,
                city: city,
                region: region,
                postalCode: postalCode,
                orderStatus: orderStatus,
                costSubtotal: costSubtotal
            };

            console.log('JSON.stringify({order:orderData})');
            console.log(JSON.stringify({order:orderData}));
            console.log('token');
            console.log(token);
            console.log('********* orderId = *********');
            console.log(orderId);
            console.log(`http://localhost:3000/orders/${orderId}`);


            // Update the Database

            // fetch(`http://localhost:3000/orders/${orderId}`, {
            fetch(`${APIURL}/orders/${orderId}`, {
                    method: 'PUT',
                body: JSON.stringify({order:orderData}),
                headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token
                })
            })
            .then(
                (response) => console.log(response.json())
            )


            // Close the dialog window, display the snackbar message, and fetch the orders.
            setOpen(false);
            setUpdateActive(false);
            fetchOrders();
            setDisplayMsg(true);
            setSnackBarStatus('Order Updated');
            // setSnackBarMsg('Order Updated');
            setSelectedLen0();


        }  // End if (!validationError)


    }



    return (
        <div>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update An Order</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Go Ahead!  UPDATE the Order Already!
              </DialogContentText>
              <TextField
                autoFocus
                name="customerName"
                variant="outlined"
                required
                margin="dense"
                id="customerName"
                label="Customer Name"
                type="name"
                fullWidth
                error={customerNameError}
                helperText={customerNameHelperText}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <TextField
                name="orderNumber"
                variant="outlined"
                required
                margin="dense"
                id="orderNumber"
                label="Order Number"
                type="text"
                fullWidth
                error={orderNumberError}
                helperText={orderNumberHelperText}
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />
              <TextField
                name="mobilePhone"
                variant="outlined"
                required
                margin="dense"
                id="mobilePhone"
                label="Mobile Phone #"
                type="text"
                fullWidth
                error={mobilePhoneError}
                helperText={mobilePhoneHelperText}
                value={mobilePhone}
                onChange={(e) => setMobilePhone(e.target.value)}
              />
              <TextField
                name="email"
                variant="outlined"
                required
                margin="dense"
                id="email"
                label="Email Address"
                type="text"
                fullWidth
                error={emailError}
                helperText={emailHelperText}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                name="hostName"
                variant="outlined"
                required
                margin="dense"
                id="hostName"
                label="Host's Name"
                type="text"
                fullWidth
                error={hostNameError}
                helperText={hostNameHelperText}
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
              />
              <TextField
                name="address1"
                variant="outlined"
                required
                margin="dense"
                id="address1"
                label="Street Address"
                type="text"
                fullWidth
                error={address1Error}
                helperText={address1HelperText}
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
              <TextField
                name="city"
                variant="outlined"
                required
                margin="dense"
                id="city"
                label="City"
                type="text"
                fullWidth
                error={cityError}
                helperText={cityHelperText}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <TextField
                name="region"
                variant="outlined"
                required
                margin="dense"
                id="region"
                label="State"
                type="text"
                fullWidth
                error={regionError}
                helperText={regionHelperText}
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
              <TextField
                name="postalCode"
                variant="outlined"
                required
                margin="dense"
                id="postalCode"
                label="Zip Code"
                type="text"
                fullWidth
                error={postalCodeError}
                helperText={postalCodeHelperText}
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
              <InputLabel htmlFor="demo-dialog-native">Order Status</InputLabel>
              <Select
                native
                name="orderStatus"
                variant="outlined"
                required
                margin="dense"
                id="orderStatus"
                label="Order Status"
                type="text"
                fullWidth
                value={orderStatus}
                error={orderStatusError}
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
              >
                <option value={''}></option>
                <option value={'New'}>New</option>
                <option value={'Processed'}>Processed</option>
              </Select>
              <TextField
                name="costSubtotal"
                variant="outlined"
                required
                margin="dense"
                id="costSubtotal"
                label="Subtotal"
                type="text"
                fullWidth
                error={costSubtotalError}
                helperText={costSubtotalHelperText}
                value={costSubtotal}
                onChange={(e) => setCostSubtotal(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleUpdate} color="primary">
                Update Order
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    );
}

export default OrderUpdate;