import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';


const OrderCreate = (props) => {

    const { setCreateActive } = props;  // May not need this if doing a dialog window.
    const { token } = props;
    const { fetchOrders } = props;
    const { setDisplayMsg } = props;
    const { setSnackBarMsg } = props;

    const [open, setOpen] = useState(true);
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

    const handleClose = () => {
        setOpen(false);
        setCreateActive(false);
        fetchOrders();
    };

    const handleCreate = () => {

        var validationError = false;
        setDisplayMsg(false);
        setSnackBarMsg('');


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

        // Validate Subtotal - In format 99 or 99.99
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

        // If no errors, create the order in the database.

        if (!validationError) {

            console.log('Made it inside if to do the fetch.');

            const orderPlacedDateTimeNow = new Date();

            let orderData = {
                customerName: customerName,
                orderPlacedDateTime: orderPlacedDateTimeNow,
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

            // body: JSON.stringify({order:{firstName: firstName, lastName: lastName, email: email, password: password}}),

            console.log('JSON.stringify({order:orderData})');
            console.log(JSON.stringify({order:orderData}));
            console.log('token');
            console.log(token);


            fetch("http://localhost:3000/orders/", {
                method: 'POST',
                body: JSON.stringify({order:orderData}),
                headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token
                })
            })
            .then(
                (response) => console.log(response.json())
            )
            // .then((data) => {
            //     props.updateToken(data.sessionToken)
            // })
            

            // Close the dialog window, display the snackbar message, and fetch the orders.
            setOpen(false);
            setCreateActive(false);
            fetchOrders();
            setDisplayMsg(true);
            setSnackBarMsg('Order Created');
    

        }  // End if (!validationError)


    }


    return (
        <div>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create An Order</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Go Ahead!  Create an Order Already!
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
                // defaultValue="New"
                // value="New"
                // error={orderStatusError}
                // helperText={orderStatusHelperText}
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
                onChange={(e) => setCostSubtotal(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleCreate} color="primary">
                Create Order
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    );
}

export default OrderCreate;