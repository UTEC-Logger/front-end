"use client"

import React from "react";
import TopBar from "../components/TopBar"
import LogFilter from "../components/LogFilter"

const Logger = ({pageContext}) => {
	const {logsData} = pageContext

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			<TopBar/>

			<main className="flex-1 container mx-auto px-4 py-6 md:px-6 md:py-8 max-w-6xl">
				<LogFilter data={logsData}/>
			</main>

			<footer className="bg-white border-t border-gray-200 py-4 mt-auto">
				<div className="container mx-auto px-4 text-center text-sm text-gray-500">
					UTEC Logger &copy; {new Date().getFullYear()} - Developed by Maykol, Gino & Ian
				</div>
			</footer>
		</div>
	)
}

export default Logger

export const Head = () => (
	<>
		<title>UTEC Logger</title>
		<meta name="description" content="View and filter application logs with UTEC Logger"/>
	</>
)
