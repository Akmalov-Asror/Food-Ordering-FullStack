import Axios, { Api_Weather, Categoriy, FoodsArray, Login, Register } from "./Fetch/Axios";


class Data {
    async GetWeather(){
        var array = Axios.get(Api_Weather)
        .then(response =>{
            return response.data
        })
        .catch(error =>{
            
        })
        return array;
    }
    async GetCategoriy(data){
        var array = Axios.get(Categoriy)
        .then(response =>{
            return response.data
        })
        .catch(error =>{
            
        })
        return array;
    }
    async GetFoods(data){
        var array = Axios.get(FoodsArray)
        .then(response =>{
            return response.data
        })
        .catch(error =>{
            
        })
        return array;
    }
    async PostRegister(data){
        console.log(data);
        var array = Axios.post(`${Register}`, data)
        .then(response =>{
            return response.data
        })
        .catch(error =>{
            console.log("Неверный формат");
        })
        return array;
    }
    async PostLogin(data){
        console.log(data);
        var array = Axios.post(`${Login}`, data)
        .then(response =>{
            return response.data
        })
        .catch(error =>{
            console.log("Неверный формат");
        })
        return array;
    }
}

export default new Data()