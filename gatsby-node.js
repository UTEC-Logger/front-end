const fs = require('fs');
const path = require('path');

exports.createPages = async ({ actions }) => {
    const { createPage } = actions;

    // Ruta de la carpeta de logs en la raíz del proyecto
    const logsDir = path.resolve(__dirname, 'logs');

    // Verifica si la carpeta de logs existe
    if (!fs.existsSync(logsDir)) {
        console.error("La carpeta de logs no existe en 'logs'");
        return;
    }

    // Leer todos los archivos `.log` en la carpeta de logs
    const logFiles = fs.readdirSync(logsDir).filter(file => file.endsWith('.log'));

    // Leer el contenido de cada archivo y parsearlo como JSON
    let allLogs = [];
    logFiles.forEach(file => {
        const filePath = path.join(logsDir, file);
        const content = fs.readFileSync(filePath, 'utf8');

        const logs = content
            .split('\n')
            .map(line => (line ? JSON.parse(line) : null)) // Parsear cada línea como JSON
            .filter(Boolean); // Filtrar líneas vacías o inválidas

        allLogs = allLogs.concat(logs);
    });

    // Crear una página y pasar los logs al contexto
    createPage({
        path: '/sqlite-data',
        component: path.resolve('./src/templates/sqliteTemplate.js'),
        context: {
            logsData: allLogs, // Pasar los logs como contexto
        },
    });
};
