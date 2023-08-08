export const ROUTE_NOT_FOUND = "Route not found";
export const SOMETHING_WENT_WRONG = "Something went wrong";
export const UNAUTHORIZED = "Unauthorized";
export const RESTRICTED = "Restricted";
export const USER_NOT_FOUND = "User not found";
export const USER_ALREADY_EXISTS = "User already exists";
export const USER_DOES_NOT_EXISTS = "User does not exists";
export const BAD_REQUEST = "Bad request";
export const INVALID_CREDENTIALS = "Invalid credentials";
export const FORBIDDEN = "Forbidden";
export const ALREADY_CLOCKIN = "User already clock in.";
export const CANNOT_CLOCKOUT = "User still not clock in.";

export const DEFAULT_ERROR_STATUS = 500;
export const BAD_REQUEST_STATUS = 400;
export const UNAUTHORIZED_STATUS = 401;
export const FORBIDDEN_STATUS = 403;
export const NOT_FOUND_STATUS = 404;

export function errorHandler (error, req, res, next){
    console.log(error.message || error)

    if(error?.name === "SequelizeValidationError"){
        return res.status(BAD_REQUEST_STATUS).json({message : error?.errors?.[0]?.message});
    }

    const message = error?.message || SOMETHING_WENT_WRONG;
    const status = error?.status || DEFAULT_ERROR_STATUS;
    const data = error?.data || null;
    res.status(status).json({type : "error", status, message, data});
}