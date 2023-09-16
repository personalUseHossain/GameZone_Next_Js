//necessarey (sorry for the typo) imports
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken';

const cookies = new Cookies();


//get user data
export async function getUserData(token) {
    if (token) {
        const decode = await jwt.decode(token);
        if (decode) return decode;
    }
    return false;
}


