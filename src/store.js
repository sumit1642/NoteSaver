// src/store.js
import { configureStore } from "@reduxjs/toolkit"
import pasteReducer from "./redux/pasteSlice"; // Corrected the import path if required

export const store = configureStore({
	reducer: {
		paste: pasteReducer, // Ensure pasteReducer is being correctly imported
	},
});
