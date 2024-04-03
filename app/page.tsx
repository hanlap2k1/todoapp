"use client";
import { store } from "../lib/store";
import { Provider } from "react-redux";
import App from "./App";

export default function Home() {
  return (
    <Provider store={store}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <App />
      </main>
    </Provider>
  );
}
