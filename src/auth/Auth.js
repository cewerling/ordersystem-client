import React, {useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
// import Signup from './Signup';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Auth = (props) => {

    const [signUp, setSignUp] = useState('N');  // Start with Sign-In

    console.log('At top of Auth.js');
    console.log('signUp = ' + signUp);

    const updateSignUpIn = (newToken) => {
        signUp=='N' ? setSignUp('Y') : setSignUp('N');
      }
        
    // I don't think we'll need this, since it is a simple toggle.
    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //     setSessionToken(localStorage.getItem('token'));
    //     }
    // }, [])
  
    return (
        <React.Fragment>
        <CssBaseline />
            {signUp=='N' ? <SignIn updateToken={props.updateToken}  updateSignUpIn={updateSignUpIn} /> : <SignUp updateToken={props.updateToken} updateSignUpIn={updateSignUpIn} /> }
        </React.Fragment>
    );
}

export default Auth;