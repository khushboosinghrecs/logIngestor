// logController.js

const Log = require('../models/log');

// Controller function to handle the creation of a new log
const createLog = async (req, res) => {
    try {
        // const logData = (req.body);
        // console.log(logData, req.query);
        // const newLog = new Log(logData);
        // await newLog.save();
        // res.status(201).json({ message: 'Log created successfully', log: newLog });

        const allowedKeys = ['commit', 'message', 'metadata.parentResourceId', 'resourceId', 'spanId', 'timestamp', 'traceId'];

        const logData = {};
        allowedKeys.forEach((key) => {
            if (req.body[key] !== undefined) {
                logData[key] = req.body[key];
            }
        });

        const newLog = new Log(logData);
        await newLog.save();

        res.status(201).json({ message: 'Log saved successfully', log: newLog });
    } catch (error) {
        console.error('Error creating log:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getLog = async (req, res) => {
    try {
        const query = {};

        // Iterate through keys in req.body and build the query
        Object.keys(req.body).forEach((key) => {
            if (req.body[key]) {
                query[key] = 1;
            }
        });

        const logs = await Log.find({}, {});



        res.status(200).json({ logs });
    } catch (error) {
        console.error('Error querying logs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getLog };
