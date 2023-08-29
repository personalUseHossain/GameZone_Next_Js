import Cookies from 'universal-cookie'; // for get cookies
import jwt from 'jsonwebtoken'; // to sign, verify, decode jwt


const cookies = new Cookies(); // to get cookies

// to check if user is authenticated or not
export async function isAuth() {
    const token = cookies.get('gamezonetoken');
    try {
        if (token) {
            const verify = await jwt.verify(token, process.env.JWT_SECRET);
            console.log(verify)
            if (verify) return true;
            return false;
        }
        return false
    } catch (error) {
        return false
    }
}

//signout function
export function signout() {
    return cookies.remove('gamezonetoken', { path: '/', expires: 0 });
}



