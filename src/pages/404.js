"use client"

import React from "react";
import { Link } from "gatsby"
import { AlertCircle, Home } from "lucide-react"

const NotFoundPage = () => {
	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6 text-center">
			<div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 md:p-12 border border-gray-100 animate-fade-in">
				<div className="flex justify-center mb-6">
					<div className="relative">
						<div className="absolute -inset-1 bg-gray-200 rounded-full opacity-50 animate-pulse"></div>
						<div className="relative bg-white p-4 rounded-full">
							<AlertCircle className="h-12 w-12 text-gray-400"/>
						</div>
					</div>
				</div>

				<h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Page not found</h1>

				<div className="h-1 w-16 bg-gray-200 mx-auto mb-6 rounded-full"></div>

				<p className="text-gray-600 mb-8 leading-relaxed">
					Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
				</p>

				<Link
					to="/"
					className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 group"
				>
					<Home className="h-4 w-4 group-hover:animate-bounce"/>
					<span>Back to home</span>
				</Link>
			</div>

			<style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }

                @keyframes pulse {
                    0%, 100% {
                        opacity: 0.5;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.8;
                        transform: scale(1.05);
                    }
                }

                .animate-pulse {
                    animation: pulse 2s ease-in-out infinite;
                }
			`}</style>
		</main>
	)
}

export default NotFoundPage

export const Head = () => <title>Page Not Found | 404</title>
