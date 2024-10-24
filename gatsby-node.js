const sqlite3 = require('sqlite3').verbose();
const path = require('path');

exports.createPages = async ({ actions }) => {
    const { createPage } = actions;

    // Connect to the SQLite database
    const db = new sqlite3.Database('./database.sqlite');

    // Function to get data from the SQLite database
    const getData = () => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM your_table', (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    };

    // Fetch data
    const data = await getData();

    // Close the database
    db.close();

    // Create a page and pass the data to the context
    createPage({
        path: '/sqlite-data',
        component: path.resolve('./src/templates/sqliteTemplate.js'),
        context: {
            sqliteData: data,
        },
    });
};
