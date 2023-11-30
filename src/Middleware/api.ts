import axios from "axios";
import { getCookie, removeCookie, setCookie } from "typescript-cookie";
import { API_URI, CodeStatus, RequestStatus, UserStatus } from "./constants";
import { SignUpInterface } from "./interface/SignUp.interface";
import { LogInInterface } from "./interface/LogIn.interface";
import { UpdateUserInterface } from "./interface/UpdateUser.interface";

export const signUp = async (signUpDetails: SignUpInterface) => {
    try {
        const response = await axios.post(`${API_URI}/auth/signup`, signUpDetails);

        logOut();   

        setCookie('access_token', response.data.access_token);
        setCookie('user', JSON.stringify(response.data.user));
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

        logOut();
        
        setCookie('access_token', response.data.access_token);
        setCookie('user', JSON.stringify(response.data.user));
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

export const logOut = () => {
  removeCookie('access_token');
  removeCookie('user');
}

export const getCode = async (username: string) => {
    try {
        await axios.post(`${API_URI}/forgotpassword/code`, { username });
        return { message: UserStatus.STATUS_OK };
    } catch (error: any) {
        switch (error.response.status) {
            case 404:
                return { message: UserStatus.NOT_FOUND };
            default:
                console.log(error);
                return { message: UserStatus.ERROR };
        } 
    }
}

export const getRole = async (username: string, code: string) => {
    try {
        const response = await axios.post(`${API_URI}/forgotpassword/role`, { username, code });

        logOut();

        setCookie('access_token', response.data.access_token);
        setCookie('user', JSON.stringify(response.data.user));
        return { message: CodeStatus.STATUS_OK };
    } catch (error: any) {
        switch (error.response.status) {
            case 404:
                return { message: CodeStatus.NOT_FOUND };
            case 401: 
                return { message: CodeStatus.WRONG };
            default:
                console.log(error);
                return { message: CodeStatus.ERROR };
        } 
    }
}

export const recoveryPassword = async (newPassword: string) => {
    try {
        const access_token = getCookie('access_token');
        await axios.post(`${API_URI}/forgotpassword/changepassword`, { newPassword }, { 
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
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

export const updateUser = async (userDetails: UpdateUserInterface) => {
    try {
        const access_token = getCookie('access_token');
        const response = await axios.post(`${API_URI}/users`, userDetails,{
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        
        logOut();

        setCookie('access_token', response.data.access_token);
        setCookie('user', JSON.stringify(response.data.user));

        return { message: UserStatus.STATUS_OK };
    } catch (error: any) {
        switch (error.response.status) {
            case 404:
                return { message: UserStatus.NOT_FOUND };
            case 409: 
                return { message: UserStatus.EXIST };
            default:
                console.log(error);
                return { message: UserStatus.ERROR };
        } 
    }
}

export const findByName = async (name: string) => {
    try {
        const response = await axios.get(`${API_URI}/users/${name}`);
        return {
            message: UserStatus.STATUS_OK,
            data: {
                ...response.data
            }
        }
    } catch(error: any) {
        switch (error.response.status) {
            case 404:
                return { message: UserStatus.NOT_FOUND };
            default:
                console.log(error);
                return { message: UserStatus.ERROR };
        }
    }
}

export const findContainByName = async (name: string) => {
    try {
        const response = await axios.get(`${API_URI}/users/contain/${name}`);
        return {
            message: UserStatus.STATUS_OK,
            data: [
                ...response.data
            ]
        }
    } catch(error: any) {
        switch (error.response.status) {
            case 404:
                return { message: UserStatus.NOT_FOUND };
            default:
                console.log(error);
                return { message: UserStatus.ERROR };
        }
    }
}

export const getRelation = async (name: string) => {
    try {
        const access_token = getCookie('access_token');
        const response = await axios.get(`${API_URI}/friend-request/${name}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
}

export const createFriendRequest = async (name: string) => {
    console.log("Create");
    try {
        const access_token = getCookie('access_token');
        await axios.post(`${API_URI}/friend-request/${name}`, {}, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        return { message: RequestStatus.STATUS_OK };
    } catch (error: any) {
        console.log(error);
        return { message: RequestStatus.ERROR };
    }
}

export const deleteFriendRequest = async (name: string) => {
    try {
        const access_token = getCookie('access_token');
        await axios.delete(`${API_URI}/friend-request/${name}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        return { message: RequestStatus.STATUS_OK };
    } catch (error: any) {
        console.log(error);
        return { message: RequestStatus.ERROR };
    }
}

