const fs = require('fs');
const path = require('path');

exports.createPages = async ({ actions }) => {
    const { createPage } = actions;

    const logsDir = path.resolve(__dirname, 'logs');

    if (!fs.existsSync(logsDir)) {
        console.error("La carpeta de logs no existe en 'logs'");
        return;
    }

    const logFiles = fs.readdirSync(logsDir).filter(file => file.endsWith('.log'));

    // Leer el contenido de cada archivo y parsearlo según el formato de los logs
    let allLogs = [];
    logFiles.forEach(file => {
        const filePath = path.join(logsDir, file);
        const content = fs.readFileSync(filePath, 'utf8');

        const logs = content
            .split('\n')
            .map(line => {
                if (!line.trim()) return null;

                const parts = line.split(' | ');
                if (parts.length < 4) return null;

                const [time, logType, fileInfo, message] = parts;
                const [fileName, lineNumber] = fileInfo.split(':');

                return {
                    time: time.trim(),
                    log_type: logType.trim(),
                    file_name: fileName.trim(),
                    log_line: parseInt(lineNumber.trim(), 10),
                    message: message.trim(),
                };
            })
            .filter(Boolean);

        allLogs = allLogs.concat(logs);
    });

    // Crear una página y pasar los logs al contexto
    createPage({
        path: '/logger',
        component: path.resolve('./src/templates/logger.js'),
        context: {
            logsData: allLogs,
        },
    });
};
