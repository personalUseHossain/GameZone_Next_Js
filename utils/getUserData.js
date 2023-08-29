//necessarey (sorry for the typo) imports
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken';

const cookies = new Cookies();


//get user data
export async function getUserData() {
    const token = cookies.get('gamezonetoken');
    if (token) {
        const decode = await jwt.decode(token, process.env.JWT_SECRET);
        if (decode) return decode;
    }
    return false;
}


