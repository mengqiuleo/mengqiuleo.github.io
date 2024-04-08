import { createSlice, createAsyncThunk, createSelector  } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import github from "../utils/github";

const issuesSlice = createSlice({
  name: 'issues',
  initialState: {
    list: [],
    loading: false
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setIssues: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    // 处理异步操作的不同阶段
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          list: action.payload
        }
        // state.loading = false
        // state.list = action.payload
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

// 导出 actions
export const { setLoading, setIssues } = issuesSlice.actions

export const fetchIssues = createAsyncThunk('issues/fetchIssues', async () => {
  const response = await github.listIssues()

  // const res = Array.from(response).map(item => {
  //   const date = new Date(item.created_at);
  //   item['date'] = format(date, 'yyyy-MM-dd');
  //   item['htmlContent'] = mdToHtml(item.body);
  //   return item
  // });

  // console.log('res', res)
  return response
})

export const getPostList = createSelector(
  /**
   * 第一部分参数是一个或者多个输入选择器函数
   * 用户选择redux store中的一部分状态，并将其
   * 作为计算函数的参数
   * 这些输入选择器函数可以是任何具有选择状态的功能
   */
  // 所有的state,导出user模块给以下一位选手
  (state) => state.list,
  (list) => {
    /**
     * 只有当前模块的数据
     * 发生改变的时候
     * 才会触发这一系列的方法
     */
    console.log("触发了吗")
    return list
  }
)

export default issuesSlice.reducer