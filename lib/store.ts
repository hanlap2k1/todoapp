import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { listTaskSlice } from "./features/listTaskSlice";
import { taskSlice } from "./features/taskSlice";
import { listRecipient } from "./features/listRecipient";

export const store = configureStore({
  reducer: {
    listTask: listTaskSlice.reducer,
    task: taskSlice.reducer,
    listRecipient: listRecipient.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
