import React, {useState, useEffect} from 'react';
import MenuAppBar from './home/MenuAppBar';
import Auth from './auth/Auth';
import OrderIndex from './orders/OrderIndex';

function App() {

  const [sessionToken, setSessionToken] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  console.log('At top of App.js');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
    setAnchorEl(null);
  }

  const protectedViews = () => {
    return (
      sessionToken === localStorage.getItem('token') ? <OrderIndex token={sessionToken} /> :
    <Auth updateToken={updateToken} />)
  }

  return (
    <div>
      <MenuAppBar token={sessionToken} clickLogout={clearToken} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      {protectedViews()}
    </div>
  );
}

export default App;