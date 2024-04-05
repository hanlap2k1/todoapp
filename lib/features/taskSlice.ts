import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TypeListTask } from "./listTaskSlice";
import { RootState } from "../store";

const initialState: TypeListTask = {
  id: 0,
  content: "",
  status: 0,
  startTime: 0,
  deadline: 0,
  recipient: 0,
};
export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    changeId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    changeContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    changeStatus: (state, action: PayloadAction<number>) => {
      state.status = action.payload;
    },
    changeDeadline: (state, action: PayloadAction<number>) => {
      state.deadline = action.payload;
    },
    changeStartTime: (state, action: PayloadAction<number>) => {
      state.startTime = action.payload;
    },
    reset: () => initialState,
  },
});
export const {
  changeId,
  changeContent,
  changeStatus,
  changeDeadline,
  changeStartTime,
} = taskSlice.actions;
export const selectTask = (state: RootState) => state.task;
export default taskSlice.reducer;
