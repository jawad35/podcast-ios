import axios from "axios";

// export const ApiUrl = axios.create({baseURL:'http://10.0.2.2.:8000'})
// export const ApiUrl = axios.create({baseURL:'http://192.168.10.6:8000'})
export const BASE_URL = 'http://192.168.10.4:8003'
export const ApiUrl = axios.create({baseURL:BASE_URL})
export const ServerUrl = `192.168.10.4:8003`
