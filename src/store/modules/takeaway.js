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
  },
});

const { setFoodsList, changeActiveTab } = foodsStore.actions;
// 异步获取部分
const fetchFoodsList = () => {
  return async (dispatch) => {
    // 编写异步逻辑
    const res = await axios.get("http://localhost:3004/takeaway");
    // 调用dispatch函数提交action
    dispatch(setFoodsList(res.data));
  };
};

export { fetchFoodsList, changeActiveTab };

const foodsReducer = foodsStore.reducer;
export default foodsReducer;
