import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const incrementAsync2 = createAsyncThunk(
  'incrementAsync2',
  async (amount, {rejectWithValue}) => {
    try {
      // Call await here get the response and return the response
      // const response = await userAPI.updateById(id, fields);
      // return response.data.user

      // throw new Error('Whoops!');
      // Remove above one line comment to trigger reject state

      return amount;
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response.data);
    }
  }
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    loader: false,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: {
    [incrementAsync2.fulfilled]: (state, action) => {
      // Add user to the state array
      state.value += action.payload;
      // Add async loader logic here to stop loader on async call
      console.log('fulfilled');
      state.loader = false;
    },
    [incrementAsync2.rejected]: (state, action) => {
      // Add failure logic here
      state.value = 0;
      // Add async loader logic here to stop loader on async call
      console.log('rejected');
      state.loader = false;
    },
    [incrementAsync2.pending]: (state, action) => {
      // Add async loader logic here to start loader on async call
      console.log('pending');
      state.loader = true;
    },
  },
});

export const {increment, decrement, incrementByAmount} = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.counter.value;

export default counterSlice.reducer;
