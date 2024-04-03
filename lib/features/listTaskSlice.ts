import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CLOSED, DONE, INPROGRESS } from "@/components/todoapp";
import dayjs from "dayjs";

export interface TypeListTask {
  id: string;
  content: string;
  status: number;
  startTime: string;
  deadline: string;
  recipient: string;
}
interface TypeOfState {
  list: TypeListTask[];
  listCopy: TypeListTask[];
}

const initialState: TypeOfState = {
  list: [],
  listCopy: [],
};

export const listTaskSlice = createSlice({
  name: "listTask",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TypeListTask>) => {
      // state.list = [action.payload, ...state.list];
      state.listCopy = [action.payload, ...state.listCopy];
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      // state.list = state.list.filter((value) => value.id !== action.payload);
      state.listCopy = state.listCopy.filter(
        (value) => value.id !== action.payload
      );
    },
    updateTask: (
      state,
      action: PayloadAction<{
        idEdit: string;
        inputText?: string | undefined;
        deadline?: string | undefined;
        status?: number | undefined;
        recipient?: string | undefined;
      }>
    ) => {
      // state.list = state.list.map((value) =>{        
      //   return value.id !== action.payload.idEdit
      //     ? value
      //     : {
      //         id: value.id,
      //         content: action.payload.inputText || value.content,
      //         status:
      //           action.payload.status ||
      //           (dayjs().isAfter(dayjs(action.payload.deadline)) ? CLOSED : null) ||
      //           (value.status === CLOSED ? INPROGRESS : value.status),
      //         startTime: value.startTime,
      //         deadline: action.payload.deadline || value.deadline,
      //         recipient: action.payload.recipient || value.recipient,
      //       }
      //     }
      // );
      state.listCopy = state.listCopy.map((value) =>
        value.id !== action.payload.idEdit
          ? value
          : {
              id: value.id,
              content: action.payload.inputText || value.content,
              status:
                action.payload.status ||
                (dayjs().isAfter(dayjs(action.payload.deadline)) ? CLOSED : null) ||
                (value.status === CLOSED ? INPROGRESS : value.status),
              startTime: value.startTime,
              deadline: action.payload.deadline || value.deadline,
              recipient: action.payload.recipient || value.recipient,
            }
      );
    },
    search: (state, action: PayloadAction<TypeListTask[]>) => {
      state.list = action.payload;
    },
  },
});

export const { addTask, deleteTask, updateTask, search } =
  listTaskSlice.actions;
export const selectListTask = (state: RootState) => state.listTask.list;
export const selectListTaskClone = (state: RootState) =>
  state.listTask.listCopy;
export default listTaskSlice.reducer;
