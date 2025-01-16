// src/components/Home.jsx
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate, useParams, useLocation } from "react-router-dom";
import { addToPastes, updateToPastes, resetAllPastes } from "../redux/pasteSlice";

export const Home = () => {
	const [Title, setTitle] = useState("");
	const [Value, setValue] = useState("");
	const [SearchParams] = useSearchParams();
	const { id } = useParams(); // Get ID from URL params
	const location = useLocation();
	const reset = SearchParams.get("reset");
	const Dispatch = useDispatch();
	const navigate = useNavigate();

	// Determine if we're in edit mode based on the URL
	const isEditMode = location.pathname.startsWith("/pastes/");
	const pasteId = isEditMode ? id : null;

	useEffect(() => {
		// Only try to load paste data if we're in edit mode
		if (isEditMode && pasteId) {
			const pastes = JSON.parse(localStorage.getItem("pastes")) || [];
			const pasteToEdit = pastes.find((paste) => paste._id === pasteId);

			if (pasteToEdit) {
				setTitle(pasteToEdit.title);
				setValue(reset === "true" ? "" : pasteToEdit.content);
			} else {
				// If paste not found, navigate back to pastes list
				navigate("/pastes");
			}
		}
	}, [pasteId, reset, navigate, isEditMode]);

	const handleCreatePaste = () => {
		// Validate input
		if (!Title.trim()) {
			return;
		}

		const paste = {
			title: Title,
			content: Value,
			_id: pasteId || Date.now().toString(36),
			createdAt: new Date().toISOString(),
		};

		if (pasteId) {
			Dispatch(updateToPastes(paste));
		} else {
			Dispatch(addToPastes(paste));
		}

		// Clear form and navigate
		setTitle("");
		setValue("");
		navigate("/pastes");
	};

	const handleResetPaste = () => {
		if (pasteId) {
			Dispatch(resetAllPastes(pasteId));
			navigate(`/pastes/${pasteId}?reset=true`);
		}
	};

	return (
		<div className="flex justify-center pt-8">
			<div className="w-full max-w-3xl px-4">
				<div className="flex gap-4 mb-4">
					<input
						className="flex-1 p-2 border border-neutral-700 rounded-full text-center bg-neutral-900/50 text-white placeholder-neutral-400 focus:border-neutral-500 focus:outline-none"
						type="text"
						placeholder="Enter Title Here"
						value={Title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<button
						className="px-6 py-2 border border-neutral-700 rounded-full text-neutral-200 hover:bg-neutral-800/50 transition-colors"
						onClick={handleCreatePaste}
						disabled={!Title.trim()}>
						{pasteId ? "Update Paste" : "Create Paste"}
					</button>
				</div>

				{pasteId && !reset && (
					<button
						className="px-6 py-2 border border-neutral-700 rounded-full text-neutral-200 hover:bg-neutral-800/50 transition-colors mb-4"
						onClick={handleResetPaste}>
						Reset Content
					</button>
				)}

				<textarea
					className="w-full h-96 p-4 border border-neutral-700 rounded-3xl resize-none bg-neutral-900/50 text-white placeholder-neutral-400 focus:border-neutral-500 focus:outline-none"
					value={Value}
					placeholder="Enter your text here..."
					onChange={(e) => setValue(e.target.value)}
				/>
			</div>
		</div>
	);
};
