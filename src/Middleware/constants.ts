export const API_URI = "http://localhost:3000";

export enum UserStatus {
    STATUS_OK = "Successfully!",
    EXIST = "User already exist!",
    NOT_FOUND = "Not found user!",
    WRONG_PASSWORD = "Wrong password!",
    ERROR = "An error occurred!",
};

export enum CodeStatus {
    STATUS_OK = "OK",
    WRONG = "Wrong code!",
    ERROR = "An error occurred!",
    NOT_FOUND = "Not found code!"
}