"use client"

import React, { useState } from "react"
import { Calendar, ChevronDown, ChevronRight, Clock, ExternalLink, FileText, Filter, Search } from "lucide-react"
import { Link } from "gatsby"

const LogFilter = ({data}) => {
	const [searchTerm, setSearchTerm] = useState("")
	const [logType, setLogType] = useState("")
	const [date, setDate] = useState("")
	const [originFile, setOriginFile] = useState("")
	const [hour, setHour] = useState("")
	const [isFilterExpanded, setIsFilterExpanded] = useState(false)
	const [expandedLogId, setExpandedLogId] = useState(null)

	// Apply all filters
	const filteredData = data
		? data.filter((item) => {
			const itemHour = new Date(item.time).getHours()
			const searchHour = hour ? Number.parseInt(hour) : null

			return (
				(searchTerm === "" || item.message.toLowerCase().includes(searchTerm.toLowerCase())) &&
				(logType === "" || item.log_type === logType) &&
				(date === "" || item.time.startsWith(date)) &&
				(originFile === "" || item.file_name.includes(originFile)) &&
				(hour === "" || itemHour === searchHour)
			)
		})
		: []

	// Colors for each log type
	const getLogTypeStyles = (type) => {
		switch (type) {
			case "INFO":
				return {
					bg: "bg-blue-100",
					text: "text-blue-700",
					border: "border-blue-500",
					icon: "bg-blue-500",
				}
			case "WARNING":
				return {
					bg: "bg-amber-100",
					text: "text-amber-700",
					border: "border-amber-500",
					icon: "bg-amber-500",
				}
			case "ERROR":
				return {
					bg: "bg-red-100",
					text: "text-red-700",
					border: "border-red-500",
					icon: "bg-red-500",
				}
			case "CRITICAL":
				return {
					bg: "bg-purple-100",
					text: "text-purple-700",
					border: "border-purple-500",
					icon: "bg-purple-500",
				}
			default:
				return {
					bg: "bg-gray-100",
					text: "text-gray-700",
					border: "border-gray-500",
					icon: "bg-gray-500",
				}
		}
	}

	// Format file name for URL (replace dots with hyphens)
	const formatFileNameForUrl = (fileName) => {
		return fileName.replace(/\./g, "-")
	}

	const toggleFilters = () => {
		setIsFilterExpanded(!isFilterExpanded)
	}

	const toggleExpandLog = (id) => {
		if (expandedLogId === id) {
			setExpandedLogId(null)
		} else {
			setExpandedLogId(id)
		}
	}

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
			{/* Search bar */}
			<div className="p-4 border-b border-gray-200">
				<div className="relative">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<Search className="h-4 w-4 text-gray-400"/>
					</div>
					<input
						type="text"
						placeholder="Search by message..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
					/>
				</div>
			</div>

			{/* Filter toggle button */}
			<div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
				<button
					onClick={toggleFilters}
					className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
				>
					<Filter className="h-4 w-4 mr-2"/>
					{isFilterExpanded ? "Hide Filters" : "Show Filters"}
				</button>
			</div>

			{/* Advanced filters */}
			{isFilterExpanded && (
				<div className="p-4 bg-gray-50 border-b border-gray-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{/* Log type filter */}
					<div className="space-y-1">
						<label className="text-xs font-medium text-gray-500 flex items-center">
							<FileText className="h-3 w-3 mr-1"/> Log Type
						</label>
						<select
							value={logType}
							onChange={(e) => setLogType(e.target.value)}
							className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white transition-all"
						>
							<option value="">All Types</option>
							<option value="INFO">INFO</option>
							<option value="WARNING">WARNING</option>
							<option value="ERROR">ERROR</option>
							<option value="CRITICAL">CRITICAL</option>
						</select>
					</div>

					{/* Origin file filter */}
					<div className="space-y-1">
						<label className="text-xs font-medium text-gray-500 flex items-center">
							<FileText className="h-3 w-3 mr-1"/> Origin File
						</label>
						<input
							type="text"
							placeholder="Filter by file"
							value={originFile}
							onChange={(e) => setOriginFile(e.target.value)}
							className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
						/>
					</div>

					{/* Date filter */}
					<div className="space-y-1">
						<label className="text-xs font-medium text-gray-500 flex items-center">
							<Calendar className="h-3 w-3 mr-1"/> Date
						</label>
						<input
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
						/>
					</div>

					{/* Hour filter */}
					<div className="space-y-1">
						<label className="text-xs font-medium text-gray-500 flex items-center">
							<Clock className="h-3 w-3 mr-1"/> Hour (0-23)
						</label>
						<input
							type="number"
							min="0"
							max="23"
							placeholder="Hour"
							value={hour}
							onChange={(e) => setHour(e.target.value)}
							className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
						/>
					</div>
				</div>
			)}

			{/* Results count */}
			<div className="px-4 py-2 bg-white border-b border-gray-200 text-sm text-gray-500">
				{filteredData.length} {filteredData.length === 1 ? "result" : "results"} found
			</div>

			{/* Column Headers */}
			<div className="grid grid-cols-12 gap-2 px-4 py-2 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500">
				<div className="col-span-2 text-center">Type</div>
				<div className="col-span-3 hidden md:block text-center">Time</div>
				<div className="col-span-3 md:col-span-2 text-center">File</div>
				<div className="col-span-6 md:col-span-4">Message</div>
				<div className="col-span-1 text-right">View</div>
			</div>

			{/* Filtered results - Column-based Layout with centered content */}
			<div className="max-h-[600px] overflow-y-auto">
				{filteredData.length > 0 ? (
					filteredData.map((item, index) => {
						const styles = getLogTypeStyles(item.log_type)
						const logId = `log-${index}`
						const isExpanded = expandedLogId === logId

						return (
							<div
								key={index}
								className={`border-b border-gray-100 ${isExpanded ? styles.bg : "hover:bg-gray-50"} transition-colors`}
							>
								{/* Main log row - grid layout for columns with centered content */}
								<div
									className="grid grid-cols-12 gap-2 px-4 py-2 items-center cursor-pointer"
									onClick={() => toggleExpandLog(logId)}
								>
									{/* Type Column - Centered */}
									<div className="col-span-2 flex items-center justify-center">
										<div className="flex items-center gap-1.5">
											<div className={`${styles.icon} w-2 h-2 rounded-full flex-shrink-0`}></div>
											<span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${styles.bg} ${styles.text}`}>
                        {item.log_type}
                      </span>
										</div>
									</div>

									{/* Time Column - Centered */}
									<div className="col-span-3 hidden md:block text-xs text-gray-500 truncate text-center">
										{new Date(item.time).toLocaleString()}
									</div>

									{/* File Column - Centered */}
									<div className="col-span-3 md:col-span-2 text-xs text-gray-500 truncate text-center">
										{item.file_name}:{item.log_line}
									</div>

									{/* Message Column - Left aligned (better for readability) */}
									<div className="col-span-6 md:col-span-4 text-xs text-gray-700 truncate flex items-center gap-1">
										{isExpanded ? (
											<ChevronDown className="h-3 w-3 text-gray-400 flex-shrink-0"/>
										) : (
											<ChevronRight className="h-3 w-3 text-gray-400 flex-shrink-0"/>
										)}
										<span>{item.message}</span>
									</div>

									{/* View Column */}
									<div className="col-span-1 text-right">
										<Link
											to={`/${formatFileNameForUrl(item.file_name)}`}
											className="inline-flex items-center justify-center text-xs text-gray-600 hover:text-gray-900 transition-colors"
											onClick={(e) => e.stopPropagation()}
											title="View file logs"
										>
											<ExternalLink className="h-3 w-3"/>
										</Link>
									</div>
								</div>

								{/* Expanded message view */}
								{isExpanded && (
									<div className={`px-4 py-3 text-sm text-gray-700 ${styles.bg} bg-opacity-50`}>
										<div className="pl-6 border-l-2 border-gray-200">{item.message}</div>
									</div>
								)}
							</div>
						)
					})
				) : (
					<div className="p-8 text-center text-gray-500">No results found. Try adjusting your filters.</div>
				)}
			</div>
		</div>
	)
}

export default LogFilter
