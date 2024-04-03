import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface TypeRecipient {
  id: string;
  name: string;
}
export interface TypeListRecipient {
  list: TypeRecipient[];
}
const initialState: TypeListRecipient = {
  list: [
    {
      id: "1",
      name: "Nguyễn Văn A",
    },
    {
      id: "2",
      name: "Nguyễn Văn B",
    },
    {
      id: "3",
      name: "Nguyễn Văn C",
    },
    {
      id: "4",
      name: "Nguyễn Văn D",
    },
  ],
};

export const listRecipient = createSlice({
  name: "listTask",
  initialState,
  reducers: {},
});

export const {} = listRecipient.actions;
export const selectListRecipient = (state: RootState) =>
  state.listRecipient.list;
export default listRecipient.reducer;
