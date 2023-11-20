// 编写store
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const foodsStore = createSlice({
  name: "foods",
  initialState: {
    // 商品列表
    foodsList: [],
    // 分类标签
    activeTabIndex: 0,
    // 购物车列表
    cartList: [],
  },
  reducers: {
    // 更改商品列表
    setFoodsList(state, action) {
      state.foodsList = action.payload;
    },
    // 激活分类标签
    changeActiveTab(state, action) {
      state.activeTabIndex = action.payload;
    },
    // 添加购物车
    addToCart(state, action) {
      // 查找使用已经在购物车中
      const item = state.cartList.find((item) => item.id === action.payload.id);
      if (item) {
        item.count++;
      } else {
        state.cartList.push(action.payload);
      }
    },
  },
});

const { setFoodsList, changeActiveTab, addToCart } = foodsStore.actions;
// 异步获取部分
const fetchFoodsList = () => {
  return async (dispatch) => {
    // 编写异步逻辑
    const res = await axios.get("http://localhost:3004/takeaway");
    // 调用dispatch函数提交action
    dispatch(setFoodsList(res.data));
  };
};

export { fetchFoodsList, changeActiveTab, addToCart };

const foodsReducer = foodsStore.reducer;
export default foodsReducer;
