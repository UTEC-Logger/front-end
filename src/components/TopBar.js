"use client"

import React from "react";
import Logo from "../images/utec.png";
import { Github } from "lucide-react"
import { Link } from "gatsby";

const TopBar = () => {
	return (
		<header className="bg-gray-600 text-white">
			<div className="container mx-auto px-4 md:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16 md:h-20">
					<Link to="/" className="flex items-center justify-center">
						<div className="flex items-center justify-center h-10 md:h-12">
							<img
								src={Logo}
								alt="Logo"
								className="h-full w-auto object-contain transition-transform duration-300 hover:scale-105"
								style={{maxHeight: "40px"}}
							/>
						</div>
					</Link>

					<a
						href="https://github.com/orgs/UTEC-Logger/"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-colors duration-200"
						aria-label="GitHub Repository"
					>
						<Github className="h-5 w-5"/>
						<span className="hidden sm:inline font-medium">GitHub</span>
					</a>
				</div>
			</div>
		</header>
	)
}

export default TopBar
