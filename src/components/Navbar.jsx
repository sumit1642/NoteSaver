// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";

export const Navbar = () => {
	return (
		<div>
			<nav className=" p-4 shadow-lg rounded-lg">
				<div className="flex justify-center">
					<ul className="flex space-x-4">
						<li>
							<NavLink
								to="/"
								className={({ isActive }) =>
									`${isActive ? "text-yellow-400 font-semibold" : "text-white"}
								relative inline-flex items-center justify-center px-4 py-2 
								transition duration-300 ease-in-out 
								transform hover:scale-105 hover:bg-gray-700 
								hover:text-blue-300 rounded-md`
								}>
								<span className="relative z-10">Home</span>
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/pastes"
								className={({ isActive }) =>
									`${isActive ? "text-yellow-400 font-semibold" : "text-white"}
								relative inline-flex items-center justify-center px-4 py-2 
								transition duration-300 ease-in-out 
								transform hover:scale-105 hover:bg-gray-700 
								hover:text-yellow-100 rounded-md`
								}>
								<span className="relative z-10">All pastes</span>
							</NavLink>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};
