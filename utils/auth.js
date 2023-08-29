import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken';


const cookies = new Cookies();


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

export function signout() {
    return cookies.remove('gamezonetoken', { path: '/', expires: 0 });
}

export async function getUserData() {
    const token = cookies.get('gamezonetoken');
    try {
        if (token) {
            const verify = await jwt.verify(token, process.env.JWT_SECRET);
            if (verify) {
                const { name, email, img } = verify;
                return { userData: { name, email, img }, status: true };
            }
            return { status: false };
        }
        return { status: false };
    } catch (error) {
        return { status: false };
    }
}

