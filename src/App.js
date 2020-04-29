import React, {useState, useEffect} from 'react';
import MenuAppBar from './home/MenuAppBar';
import Auth from './auth/Auth';
import OrderIndex from './orders/OrderIndex';

function App() {

  const [sessionToken, setSessionToken] = useState('');

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
  }

  const protectedViews = () => {
    return (
      sessionToken === localStorage.getItem('token') ? <OrderIndex token={sessionToken} /> :
    <Auth updateToken={updateToken} />)
  }

  return (
    <div>
      <MenuAppBar token={sessionToken} clickLogout={clearToken} />
      {protectedViews()}
    </div>
  );
}

export default App;