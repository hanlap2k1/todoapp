import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { DONE, INPROGRESS } from "@/components/todoapp";
import dayjs from "dayjs";

export interface TypeListTask {
  id: number;
  content: string;
  status: number;
  startTime: number;
  deadline: number;
  recipient: number;
}
interface TypeOfState {
  list: TypeListTask[];
}

const initialState: TypeOfState = {
  list: []
};

export const listTaskSlice = createSlice({
  name: "listTask",
  initialState,
  reducers: {
    setlist: (state, action: PayloadAction<TypeListTask[]>) => {
      state.list = action.payload;
    },
    addTask: (state, action: PayloadAction<TypeListTask>) => {
      state.list = [action.payload, ...state.list];
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(
        (value) => value.id !== Number(action.payload)
      );
    },
    updateTask: (
      state,
      action: PayloadAction<{
        idEdit: number;
        inputText?: string | undefined;
        deadline?: number | undefined;
        status?: number | undefined;
        recipient?: number | undefined;
      }>
    ) => {
      state.list = state.list.map((value) =>
        value.id !== Number(action.payload.idEdit)
          ? value
          : {
              id: value.id,
              content: action.payload.inputText || value.content,
              status: action.payload.status || value.status,
              startTime: value.startTime,
              deadline: action.payload.deadline || value.deadline,
              recipient: Number(action.payload.recipient) || value.recipient,
            }
      );
    },
    search: (state, action: PayloadAction<TypeListTask[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setlist ,addTask, deleteTask, updateTask, search } =
  listTaskSlice.actions;
export const selectListTask = (state: RootState) => state.listTask.list;
export default listTaskSlice.reducer;
