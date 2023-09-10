import Cookies from 'universal-cookie'; // for get cookies
import jwt from 'jsonwebtoken'; // to sign, verify, decode jwt


const cookies = new Cookies(); // to get cookies

// to check if user is authenticated or not
export function isAuth() {
    const token = cookies.get('gamezonetoken');
    if (token) {
        // console.log(jwt.verify(token, "helloworldhowareyouiamhossainandiliketowritecode"))
        const data = jwt.decode(token);
        if (data) return true;
        return false;
    }
    return false

}

//signout function
export function signout() {
    return cookies.remove('gamezonetoken', { path: '/', expires: 0 });
}



