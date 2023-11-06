import { createSlice } from '@reduxjs/toolkit'

const initialState = { foodArray: [] }

const swtcherFoods = createSlice({
  name: 'foodArray',
  initialState,
  reducers: {
    getFoodsFromLocalStorage(state) {
      state.foodArray = JSON.parse(localStorage.getItem('FoodsArray')) || []
    }
  },
})

export const { getFoodsFromLocalStorage } = swtcherFoods.actions
export default swtcherFoods.reducer