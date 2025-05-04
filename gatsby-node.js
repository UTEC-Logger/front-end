/**
 * Gatsby Node API implementation
 * This file processes log files and creates pages for the logger UI
 */

const fs = require('fs').promises;
const path = require('path');

// Get logs directory from environment variable or use default
const logsDir = process.env.LOGS_DIR
	? path.resolve(process.env.LOGS_DIR)
	: path.resolve(__dirname, 'logs');

const CONFIG = {
	logsDir,
	logExtension: '.log',
	logSeparator: ' | ',
	logPartsCount: 4,
	mainPagePath: '/',
	templatePath: './src/templates/logger.js',
	maxLogsPerFile: process.env.MAX_LOGS_PER_FILE ? parseInt(process.env.MAX_LOGS_PER_FILE, 10) : 10000,
};

console.log(`Configured logs directory: ${CONFIG.logsDir}`);

/**
 * Parse a single log line into a structured object
 * @param {string} line - The log line to parse
 * @returns {Object|null} - Parsed log entry or null if invalid
 */
function parseLogLine(line) {
	if (!line || !line.trim()) return null;

	const parts = line.trim().split(CONFIG.logSeparator);

	// Validate log format
	if (parts.length !== CONFIG.logPartsCount) {
		console.warn(`Invalid log format: "${line.substring(0, 100)}${line.length > 100 ? '...' : ''}"`);
		return null;
	}

	const [time, logType, fileInfo, message] = parts;

	// Parse file info
	const fileInfoParts = fileInfo.split(':');
	if (fileInfoParts.length !== 2) {
		console.warn(`Invalid file info format: "${fileInfo}"`);
		return null;
	}

	const [fileName, lineNumber] = fileInfoParts;
	const parsedLineNumber = parseInt(lineNumber.trim(), 10);

	if (isNaN(parsedLineNumber)) {
		console.warn(`Invalid line number: "${lineNumber}"`);
		return null;
	}

	return {
		time: time.trim(),
		log_type: logType.trim(),
		file_name: fileName.trim(),
		log_line: parsedLineNumber,
		message: message.trim(),
	};
}

/**
 * Read and parse a log file
 * @param {string} filePath - Path to the log file
 * @returns {Promise<Array>} - Array of parsed log entries
 */
async function readLogFile(filePath) {
	try {
		const content = await fs.readFile(filePath, 'utf8');
		const lines = content.split('\n');

		// Handle very large files by limiting the number of logs
		const linesToProcess = lines.length > CONFIG.maxLogsPerFile
			? lines.slice(0, CONFIG.maxLogsPerFile)
			: lines;

		if (lines.length > CONFIG.maxLogsPerFile) {
			console.warn(`File ${path.basename(filePath)} has ${lines.length} lines, processing only the first ${CONFIG.maxLogsPerFile}`);
		}

		return linesToProcess
			.map(parseLogLine)
			.filter(Boolean); // Remove null entries
	} catch (error) {
		console.error(`Error reading log file ${filePath}:`, error.message);
		return [];
	}
}

/**
 * Group logs by file name
 * @param {Array} logs - Array of log entries
 * @returns {Object} - Logs grouped by file name
 */
function groupLogsByFile(logs) {
	return logs.reduce((acc, entry) => {
		const {file_name} = entry;
		if (!acc[file_name]) {
			acc[file_name] = [];
		}
		acc[file_name].push(entry);
		return acc;
	}, {});
}

/**
 * Create pages for the Gatsby site
 */
exports.createPages = async ({actions}) => {
	const {createPage} = actions;
	console.log('Starting to process log files...');

	try {
		// Check if logs directory exists
		try {
			await fs.access(CONFIG.logsDir);
		} catch (error) {
			console.error(`Logs directory does not exist or is not accessible: ${CONFIG.logsDir}`);
			// Create an empty page to prevent build failure
			createPage({
				path: CONFIG.mainPagePath,
				component: path.resolve(CONFIG.templatePath),
				context: {logsData: []},
			});
			return;
		}

		// Get all log files
		const files = await fs.readdir(CONFIG.logsDir);
		const logFiles = files.filter(file => file.endsWith(CONFIG.logExtension));

		if (logFiles.length === 0) {
			console.warn(`No log files found in ${CONFIG.logsDir}`);
			createPage({
				path: CONFIG.mainPagePath,
				component: path.resolve(CONFIG.templatePath),
				context: {logsData: []},
			});
			return;
		}

		console.log(`Found ${logFiles.length} log files to process`);

		// Process all log files in parallel
		const logPromises = logFiles.map(file =>
			readLogFile(path.join(CONFIG.logsDir, file))
		);

		const logsArrays = await Promise.all(logPromises);

		// Combine all logs and sort by time (newest first)
		const allLogs = logsArrays
			.flat()
			.sort((a, b) => new Date(b.time) - new Date(a.time));

		console.log(`Processed ${allLogs.length} log entries`);

		// Create main page with all logs
		createPage({
			path: CONFIG.mainPagePath,
			component: path.resolve(CONFIG.templatePath),
			context: {
				logsData: allLogs,
				pageTitle: 'All Logs',
				totalCount: allLogs.length,
			},
		});

		// Create individual pages for each file
		const logsByFile = groupLogsByFile(allLogs);

		Object.entries(logsByFile).forEach(([fileName, logs]) => {
			const pagePath = `/${fileName.replace(/\./g, '-')}`;

			createPage({
				path: pagePath,
				component: path.resolve(CONFIG.templatePath),
				context: {
					logsData: logs,
					pageTitle: `Logs for ${fileName}`,
					fileName,
					totalCount: logs.length,
				},
			});

			console.log(`Created page for ${fileName} with ${logs.length} logs at path: ${pagePath}`);
		});

		console.log('Log processing complete!');
	} catch (error) {
		console.error('Error during page creation:', error);
		// Create an empty page to prevent build failure
		createPage({
			path: CONFIG.mainPagePath,
			component: path.resolve(CONFIG.templatePath),
			context: {logsData: [], error: error.message},
		});
	}
};