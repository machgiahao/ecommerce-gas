'use strict'

const mongoose = require("mongoose");
const { countConnect } = require("../helpers/check.connect");
const {mongodb: {host, name, port}} = require("../configs/config.mongodb");
const connectString = `mongodb://${host}:${port}/${name}`;
console.log("MongoDB Connect String:", connectString);

class Database {
    constructor() {
        this.connect()
    }

    connect(type = "mongodb") {
        if (process.env.NODE_ENV === 'development') {
            mongoose.set('debug', true);
            mongoose.set('debug', {color: true});
        }

        mongoose.connect(connectString, {
            maxPoolSize: 50
        }).then(() => {
            console.log("Connected to MongoDB", countConnect())
        }).catch((err) => {
            console.error("Error connecting to MongoDB", err)
        })
    }

    static getInstance() {
        if(!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }
}

const instanceMongoDB = Database.getInstance()
module.exports = instanceMongoDB;