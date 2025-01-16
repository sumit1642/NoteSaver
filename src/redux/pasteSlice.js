// src/redux/pasteSlice.js
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
	pastes: localStorage.getItem("pastes") ? JSON.parse(localStorage.getItem("pastes")) : [],
};

export const pasteSlice = createSlice({
	name: "paste",
	initialState,
	reducers: {
		addToPastes: (state, action) => {
			const paste = action.payload;
			toast.dismiss();

			if (paste.title.trim() !== "" && paste.content.trim() !== "") {
				const findDuplicatePaste = state.pastes.find(
					(existingPaste) =>
						existingPaste.title.toLowerCase() === paste.title.toLowerCase() &&
						existingPaste._id !== paste._id,
				);

				if (findDuplicatePaste) {
					toast.error("A paste with the same title already exists");
				} else {
					state.pastes.push(paste);
					localStorage.setItem("pastes", JSON.stringify(state.pastes));
					toast.success("Paste Created Successfully");
				}
			} else {
				if (paste.title.trim() === "") {
					toast.error("Title cannot be empty");
				} else {
					toast.error("Content cannot be empty");
				}
			}
		},

		updateToPastes: (state, action) => {
			const updatedPaste = action.payload;
			const pasteIndex = state.pastes.findIndex((paste) => paste._id === updatedPaste._id);

			if (pasteIndex !== -1) {
				state.pastes[pasteIndex] = updatedPaste;
				localStorage.setItem("pastes", JSON.stringify(state.pastes));
				toast.success("Paste Updated Successfully");
			} else {
				toast.error("Paste not found");
			}
		},

		resetAllPastes: (state, action) => {
			const pasteId = action.payload;
			const pasteIndex = state.pastes.findIndex((paste) => paste._id === pasteId);

			if (pasteIndex !== -1) {
				state.pastes[pasteIndex].content = "";
				localStorage.setItem("pastes", JSON.stringify(state.pastes));
				toast.success("Paste Content Reset");
			} else {
				toast.error("Paste not found");
			}
		},

		removeFromPaste: (state, action) => {
			const pasteId = action.payload;
			state.pastes = state.pastes.filter((paste) => paste._id !== pasteId);
			localStorage.setItem("pastes", JSON.stringify(state.pastes));
			toast.success("Paste Deleted Successfully");
		},
	},
});

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPaste } = pasteSlice.actions;
export default pasteSlice.reducer;
