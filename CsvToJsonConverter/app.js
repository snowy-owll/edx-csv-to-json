'use strict';

const fs = require('fs');
const path = require('path');

const in_file = 'customer-data.csv';
const out_file = 'customer-data.json';

fs.readFile(path.join(__dirname, in_file), 'utf8', (error, data) => {
    if (error) {
        console.error(`error reading file: ${error.message}`);
        return;
    }
    const lines = data.trim().split(/\r?\n/);
    const headers = lines[0].split(',');
    const json = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].split(',');
        const obj = {};
        for (let j = 0; j < lines[0].length; j++) {
            const field_name = lines[0][j];
            const value = line[j];
            obj[headers[j]] = line[j];
        }
        json.push(obj);
    }
    fs.writeFile(path.join(__dirname, out_file), JSON.stringify(json, null, 4), (error) => {
        if (error) console.error(`error writing file: ${error.message}`);
    });
});