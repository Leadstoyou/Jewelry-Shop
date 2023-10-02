export default class Exception extends Error{
    static WRONG_DB_USERNAME_PASSWORD = "Wrong database's username or password";
    static WRONG_CONNECTION_STRING = "Wrong server name/connection string";
    static CANNOT_CONNECT_MONGODB = "Cannot connect to MongoDB";
    static USER_EXIST = "User already exists";
    static CANNOT_FIND_USER = "Cannot find user";
    static CANNOT_REGISTER_USER = "Cannot register user";
    static WRONG_EMAIL_AND_PASSWORD = "Wrong email and password";
    static INPUT_DATA_ERROR = "Input error";
    static WRONG_OLD_PASSWORD = "Old password wrong"
    static INPUT_ERROR = "Input error format";
    static PRODUCT_EXIST = "Product already exists";
    static USER_IS_NOT_ACTIVE = "User is not active";
    constructor(message,validationErrors ={}) {
        super(message)
        console.log(message)
        this.validationErrors = validationErrors
    }
}



