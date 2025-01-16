// src/App.jsx
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Paste } from "./components/Paste";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<>
				<Navbar />
				<Home />
			</>
		),
	},
	{
		path: "/pastes",
		element: (
			<>
				<Navbar />
				<Paste />
			</>
		),
	},
	{
		path: "/pastes/:id",
		element: (
			<>
				<Navbar />
				<Home />
			</>
		),
	},
]);

function App() {
	return (
		<>
			<SpeedInsights />
			<Analytics />
			<div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
				<RouterProvider router={router} />
			</div>
		</>
	);
}

export default App;
