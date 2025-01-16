// src/components/ViewPaste.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateToPastes } from "../redux/pasteSlice";

export const ViewPaste = () => {
	const { id } = useParams(); // Extract paste ID from URL
	const [paste, setPaste] = useState({ title: "", content: "" });
	const [SearchParams] = useSearchParams();
	const reset = SearchParams.get("reset");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Load paste data when the component mounts or the ID changes
	useEffect(() => {
		const pastes = JSON.parse(localStorage.getItem("pastes")) || [];
		const pasteToEdit = pastes.find((paste) => paste._id === id);
		if (pasteToEdit) {
			setPaste({
				title: pasteToEdit.title,
				content: reset === "true" ? "" : pasteToEdit.content, // Clear content if reset is true
			});
		} else {
			navigate("/pastes"); // Redirect to pastes list if paste not found
		}
	}, [id, reset, navigate]);

	// Handle paste update
	const handleUpdatePaste = () => {
		const updatedPaste = {
			...paste,
			_id: id,
			createdAt: new Date().toISOString(),
		};

		dispatch(updateToPastes(updatedPaste));

		// Redirect back to pastes list after updating
		navigate("/pastes");
	};

	// Handle content change
	const handleChange = (e) => {
		setPaste({
			...paste,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className="flex justify-center pt-8">
			<div className="w-full max-w-3xl px-4">
				{/* Title Input */}
				<div className="flex gap-4 mb-4">
					<input
						className="flex-1 p-2 border border-neutral-700 rounded-full text-center bg-neutral-900/50 text-white placeholder-neutral-400 focus:border-neutral-500 focus:outline-none"
						type="text"
						name="title"
						placeholder="Enter Title Here"
						value={paste.title}
						onChange={handleChange}
					/>
				</div>

				{/* Text Area for Content */}
				<textarea
					className="w-full h-96 p-4 border border-neutral-700 rounded-3xl resize-none bg-neutral-900/50 text-white placeholder-neutral-400 focus:border-neutral-500 focus:outline-none"
					name="content"
					value={paste.content}
					placeholder="Enter your text here..."
					onChange={handleChange}
				/>

				{/* Save Button */}
				<div className="mt-4 flex justify-end">
					<button
						className="px-6 py-2 border border-neutral-700 rounded-full text-neutral-200 hover:bg-neutral-800/50 transition-colors"
						onClick={handleUpdatePaste}
						disabled={!paste.title.trim() || !paste.content.trim()}>
						Update Paste
					</button>
				</div>
			</div>
		</div>
	);
};
