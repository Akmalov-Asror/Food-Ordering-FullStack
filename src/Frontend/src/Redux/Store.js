import  swtcherFoods  from "./UserFood";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
    reducer:{
        Foods: swtcherFoods,
    }
})
export {store}