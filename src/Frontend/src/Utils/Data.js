import Axios, { Api_Weather, Categoriy, FoodsArray, Login, Register, PostFood, GetPurchaseFoods, DeleteFood } from "./Fetch/Axios";

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
    async GetCategoriy(){
        var array = Axios.get(Categoriy, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
        .then(response =>{
            return response.data
        })
        .catch(error =>{
                console.log(error);
        })
        return array;
    }
    async GetFoods(){
        var array = Axios.get(FoodsArray, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
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
    async PostFoods(id, data){
        var array = Axios.post(`${PostFood}?foodId=${id}`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
        })
        .then(response =>{

            return response.data
        })
        .catch(error =>{
            console.log(error);
        })
        return array;
    }
    async GetPurchaseFood(){
        var array = Axios.get(GetPurchaseFoods, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
        .then(response =>{
            return response.data
        })
        .catch(error =>{
            console.log(error);
            
        })
        return array;
    }
    async DeleteFood(id){
        console.log(id);
        var array = Axios.delete(`${DeleteFood}${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
        .then(response =>{
            console.log("zor");
            return response.data
        })
        .catch(error =>{
                console.log(error);
        })
        return array;
    }
}

export default new Data()