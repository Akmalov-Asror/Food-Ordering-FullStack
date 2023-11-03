import axios from "axios";

export const Api_Weather = 'https://api.openweathermap.org/data/2.5/weather?q=Uzbekistan&appid=536db11900849ee50bfeda23464758b1';
export const Categoriy = "https://localhost:1000/api/Category"
export const FoodsArray = "https://localhost:1000/api/Food"
export const Register = "https://localhost:1000/api/Auth/register"
export const Login = "https://localhost:1000/api/Auth/login"
const Axios = axios.create({

})

export default Axios;