import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaRedo } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeFromPaste, resetAllPastes } from "../redux/pasteSlice";

export const Paste = () => {
	const [pastes, setPastes] = useState([]);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const storedPastes = JSON.parse(localStorage.getItem("pastes")) || [];
		setPastes(storedPastes);
	}, []);

	const handleEdit = (id) => {
		navigate(`/pastes/${id}`);
	};

	const handleDelete = (id) => {
		dispatch(removeFromPaste(id));
		// Update local state after deletion
		setPastes((prevPastes) => prevPastes.filter((paste) => paste._id !== id));
	};

	const handleReset = (id) => {
		dispatch(resetAllPastes(id));
		navigate(`/pastes/${id}?reset=true`);
	};

	return (
		<div className="flex flex-col items-center pt-8">
			<div className="w-full max-w-4xl space-y-4">
				{pastes.map((paste) => (
					<div
						key={paste._id}
						className="p-4 bg-neutral-900 border border-neutral-700 rounded-lg shadow-md">
						<div className="flex justify-between items-center mb-2">
							<h2 className="text-xl font-semibold text-yellow-400">{paste.title}</h2>
							<div className="flex gap-2">
								<FaEdit
									className="text-blue-400 cursor-pointer"
									onClick={() => handleEdit(paste._id)}
								/>
								<FaTrash
									className="text-red-400 cursor-pointer"
									onClick={() => handleDelete(paste._id)}
								/>
								<FaRedo
									className="text-yellow-400 cursor-pointer"
									onClick={() => handleReset(paste._id)}
								/>
							</div>
						</div>
						<p className="text-neutral-200">{paste.content || "No content"}</p>
					</div>
				))}
			</div>
		</div>
	);
};
