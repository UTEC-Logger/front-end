
export const readLogs = async () => {
    const files = ["log1.log", "log2.log", "log3.log"]; // Lista de archivos en "public/logs"
    let allLogs = [];

    for (let file of files) {
        try {
            const response = await fetch(`/logs/${file}`);
            const text = await response.text();

            // Procesa cada línea del archivo como JSON
            const logs = text
                .split("\n")
                .map(line => (line ? JSON.parse(line) : null))
                .filter(Boolean);

            allLogs = allLogs.concat(logs);
        } catch (error) {
            console.error(`Error al leer el archivo ${file}:`, error);
        }
    }

    return allLogs;
};
