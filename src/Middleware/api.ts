import axios from "axios";
import { setCookie } from "typescript-cookie";
import { API_URI, UserStatus } from "./constants";
import { SignUpInterface } from "./interface/SignUp.interface";
import { LogInInterface } from "./interface/LogIn.interface";

export const signUp = async (signUpDetails: SignUpInterface) => {
    try {
        const response = await axios.post(`${API_URI}/auth/signup`, signUpDetails);
        setCookie('access_token', response.data.access_token, { expires: 1 });
        return { message: UserStatus.STATUS_OK };
    } catch (error: any) {
        switch (error.response.status) {
            case 409:
                return { message: UserStatus.EXIST };
            default:
                console.log(error);
                return { message: UserStatus.ERROR };
        } 
    }
};

export const logIn = async (logInDetails: LogInInterface) => {
    try {
        const response = await axios.post(`${API_URI}/auth/login`, logInDetails);
        setCookie('access_token', response.data.access_token, { expires: 1 });
        return { message: UserStatus.STATUS_OK };
    } catch (error: any) {
        switch (error.response.status) {
            case 404:
                return { message: UserStatus.NOT_FOUND };
            case 401: 
                return { message: UserStatus.WRONG_PASSWORD };
            default:
                console.log(error);
                return { message: UserStatus.ERROR };
        } 
    }
}