let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3000';
        break;
    case 'cew-my-ordersystemclient.horokuapp.com':
        APIURL = 'https://cew-my-ordersystemclient.herokuapp.com'
}

export default APIURL;