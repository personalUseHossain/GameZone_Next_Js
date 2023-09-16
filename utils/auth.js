import Cookies from 'universal-cookie'; // for get cookies
import jwt from 'jsonwebtoken'; // to sign, verify, decode jwt

const cookies = new Cookies(); // to get cookies

// to check if user is authenticated or not
export async function isAuth() {
    const token = cookies.get('gamezonetoken');
    if (!token) return false
    const req = await fetch('/api/auth', {
        method: "POST",
        body: JSON.stringify(token),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const res = await req.json();
    if (res.success) return true;
    return false
}

//signout function
export function signout() {
    return cookies.remove('gamezonetoken', { path: '/', expires: 0 });
}



