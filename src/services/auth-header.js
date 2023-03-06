export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return { 
        Authorization: 'Bearer ' + user,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      };
    } else {
      return {};
    }
  }