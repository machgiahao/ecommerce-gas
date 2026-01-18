'use strict'
const mongoose = require("mongoose");
const os = require("os");
const process = require("process");

const _SECONDS = 5000
// count number of connections
const countConnect = () => {
    const numConnection = mongoose.connections.length;
    console.log(`Number of connection: ${numConnection}`);
}

// check over load
const checkOverload = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        // Assume maximum connections per CPU core
        const maxConnections = numCores * 5;

        console.log(`Number of connections: ${numConnection}`);
        console.log(`Memory usage (RSS): ${Math.round(memoryUsage / 1024 / 1024)} MB`);

        if (numConnection > maxConnections) {
            console.warn("Connection overloaded detected!");
        }

    }, _SECONDS);
}


module.exports = { countConnect, checkOverload }; 