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

    // Leer el contenido de cada archivo y parsearlo como JSON
    let allLogs = [];
    logFiles.forEach(file => {
        const filePath = path.join(logsDir, file);
        const content = fs.readFileSync(filePath, 'utf8');

        const logs = content
            .split('\n')
            .map(line => (line ? JSON.parse(line) : null))
            .filter(Boolean);

        allLogs = allLogs.concat(logs);
    });

    // Crear una página y pasar los logs al contexto
    createPage({
        path: '/page',
        component: path.resolve('./src/templates/sqliteTemplate.js'),
        context: {
            logsData: allLogs,
        },
    });
};
