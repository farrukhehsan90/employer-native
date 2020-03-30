//Configure API for production/development
const DEV = "https://jsonplaceholder.typicode.com";
const PROD = "https://jsonplaceholder.typicode.com";
export const API_URL = process.env.NODE_ENV === "production" ? PROD : DEV;
