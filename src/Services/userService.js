import http from './httpService';
import { apiUrl } from './config.json';

const apiEndPoint = apiUrl + "/users";

export function register ( user ) {
    http.post( apiEndPoint, {
        email : user.email,
        password : user.password,
        name : user.name,
    })
}