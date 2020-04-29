import React, {useState} from 'react';
// import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import {FormGroup, FormLabel, TextField, Button} from '@material-ui/core';

// ######## START: Figure out which material-ui component to use in place of "Form" above. ############

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Handle Submit function called');
        // fetch('http://localhost:3000/api/login', {
        //     method: 'POST',
        //     body: JSON.stringify({user:{username: username, password: password}}),
        //     headers: new Headers({
        //     'Content-Type': 'application/json'
        //     })
        // }) .then(
        //     (response) => response.json()
        // ) .then((data) => {
        //     props.updateToken(data.sessionToken);
        // })
    }

    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    {/* <FormLabel>Username</FormLabel> */}
                    <TextField onChange={(e) => setUsername(e.target.value)} label="Username" value={username}/>
                    </FormGroup>
                <FormGroup>
                    {/* <FormLabel>Password</FormLabel> */}
                    <TextField onChange={(e) => setPassword(e.target.value)} label="Password" type="password" value={password}/>
                </FormGroup>
                <br/>
                <Button variant="contained" color="primary" type="submit">Login</Button>
            </form>
        </div>
    )

}

export default Login;